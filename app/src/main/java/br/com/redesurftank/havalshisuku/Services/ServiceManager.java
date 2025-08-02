package br.com.redesurftank.havalshisuku.Services;

import android.annotation.SuppressLint;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.RemoteException;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;

import com.beantechs.intelligentvehiclecontrol.sdk.IListener;
import com.beantechs.voice.adapter.IVehicle;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.IUserService;
import br.com.redesurftank.havalshisuku.Managers.AutoBrightnessManager;
import br.com.redesurftank.havalshisuku.Models.SharedPreferencesKeys;
import br.com.redesurftank.havalshisuku.Utils.FridaUtils;
import br.com.redesurftank.havalshisuku.listeners.IDataChanged;
import rikka.shizuku.Shizuku;

@SuppressLint("PrivateApi")
public class ServiceManager {

    private static final String TAG = "ServiceManager";

    private static final String[] DEFAULT_KEYS = {
            "sys.settings.display.backlight_state",
            "car.ipk_setting.brightness_config",
            "sys.settings.display.brightness_level",
            "car.basic.driving_ready_state",
            "car.frs_setting.distraction_detection_enable",
            "car.hvac.pass_temperature",
            "car.hvac.driver_temperature",
            "car.hvac.cycle_mode",
            "car.hvac.blower_mode",
            "car.hvac.fan_speed",
            "car.hvac.power_mode",
            "car.basic.door_status",
            "car.hvac.anion_enable",
            "car.basic.vehicle_speed",
            "sys.settings.audio.media_volume",
            "car.hvac.front_defrost_enable",
            "car.hvac.sync_enable",
            "car.dms.work_state",
            "car.basic.window_status",
    };

    private static ServiceManager instance;

    private IUserService userService;

    private List<IDataChanged> dataChangedListeners;

    private Map<String, String> dataCache;

    private SharedPreferences sharedPreferences;

    private Boolean closeWindowDueToeSpeed = false;

    private HandlerThread handlerThread;

    private Handler backgroundHandler;

    private IListener.Stub listener;

    private boolean servicesInitialized = false;

    private final List<Runnable> pendingTasks = new ArrayList<>();

    private long timeInitialized;

    private final Shizuku.UserServiceArgs userServiceArgs =
            new Shizuku.UserServiceArgs(new ComponentName(App.getContext().getPackageName(), UserService.class.getName()))
                    .daemon(false)
                    .processNameSuffix("service")
                    .debuggable(true) // Adjust based on BuildConfig.DEBUG
                    .version(1); // Adjust based on BuildConfig.VERSION_CODE

    private final ServiceConnection userServiceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName name, IBinder service) {
            userService = IUserService.Stub.asInterface(service);
            Log.w(TAG, "UserService connected");
            initializeAfterBinding(App.getContext());
        }

        @Override
        public void onServiceDisconnected(ComponentName name) {
            userService = null;
            Log.w(TAG, "UserService disconnected");
        }
    };

    private ServiceManager() {
        dataChangedListeners = new ArrayList<>();
        dataCache = new HashMap<>();
    }

    public static synchronized ServiceManager getInstance() {
        if (instance == null) {
            instance = new ServiceManager();
        }
        return instance;
    }

    public static synchronized void CleanInstance() {
        if (instance != null) {
            Log.w(TAG, "Discarding ServiceManager instance");

            if (instance.handlerThread != null) {
                instance.handlerThread.quitSafely();
                instance.backgroundHandler = null;
                instance.handlerThread = null;
            }

            if (instance.userService != null) {
                try {
                    instance.userService.unRegisterDataChangedListener(App.getContext().getPackageName(), instance.listener);
                } catch (RemoteException e) {
                    Log.e(TAG, "Error unregistering listener", e);
                }
            }

            Shizuku.unbindUserService(instance.userServiceArgs, instance.userServiceConnection, true);

            instance.userService = null;
            instance.dataChangedListeners.clear();
            instance.dataCache.clear();
            instance.sharedPreferences = null;
            instance.closeWindowDueToeSpeed = false;
            instance.listener = null;
            instance.servicesInitialized = false;
            instance.pendingTasks.clear();

            Log.w(TAG, "ServiceManager instance cleaned");
            instance = null;
            Log.w(TAG, "ServiceManager instance discarded");
        }
    }

    public boolean initializeServices(Context context) {
        Log.w(TAG, "Initializing services with Shizuku");

        sharedPreferences = context.getSharedPreferences("haval_prefs", Context.MODE_PRIVATE);

        handlerThread = new HandlerThread("ServiceManagerHandlerThread");
        handlerThread.start();
        backgroundHandler = new Handler(handlerThread.getLooper());

        if (!Shizuku.pingBinder()) {
            Log.e(TAG, "Shizuku not available");
            return false;
        }

        if (!FridaUtils.ensureFridaServerRunning())
            return false;
        if (!FridaUtils.injectAllScripts())
            return false;

        // Assume permission is already granted; handle request if needed
        Shizuku.bindUserService(userServiceArgs, userServiceConnection);

        return true;
    }

    private void initializeAfterBinding(Context context) {
        if (userService == null) {
            Log.e(TAG, "UserService not bound");
            return;
        }

        Log.w(TAG, "UserService is available");

        listener = new IListener.Stub() {
            @Override
            public void onDataChanged(String key, String value) {
                OnDataChanged(context, key, value);
            }
        };

        try {
            userService.registerDataChangedListener(context.getPackageName(), listener);
            Log.w(TAG, "Listener registered successfully");

            String[] currentValues = userService.fetchDatas(DEFAULT_KEYS);
            for (int i = 0; i < currentValues.length; i++) {
                OnDataChanged(context, DEFAULT_KEYS[i], currentValues[i]);
            }

            userService.addListenerKey(context.getPackageName(), DEFAULT_KEYS);
            Log.w(TAG, "Listener keys added successfully");

            if (sharedPreferences.getBoolean(SharedPreferencesKeys.SET_STARTUP_VOLUME.getKey(), false)) {
                int startupVolume = sharedPreferences.getInt(SharedPreferencesKeys.STARTUP_VOLUME.getKey(), -1);
                if (startupVolume != -1) {
                    userService.request("cmd.common.request.set", "sys.settings.audio.media_volume", String.valueOf(startupVolume));
                    Log.w(TAG, "Startup volume set to: " + startupVolume);
                }
            }

            boolean isForceDisableMonitoring = sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.getKey(), false);
            if (isForceDisableMonitoring) {
                userService.request("cmd.common.request.set", "car.frs_setting.distraction_detection_enable", "0");
                Log.w(TAG, "Distraction detection monitoring disabled by user preference");
            }

            if (sharedPreferences.getBoolean(SharedPreferencesKeys.ENABLE_AUTO_BRIGHTNESS.getKey(), false)) {
                AutoBrightnessManager.Companion.getInstance().setEnabled(true);
            }

            servicesInitialized = true;

            synchronized (pendingTasks) {
                for (Runnable task : pendingTasks) {
                    backgroundHandler.post(task);
                }
                pendingTasks.clear();
            }

            timeInitialized = SystemClock.uptimeMillis();
            Log.w(TAG, "Services initialized successfully");

        } catch (RemoteException e) {
            Log.e(TAG, "Error during initialization", e);
        }
    }

    public void dispatchAllData(Context context) {
        if (userService == null) return;

        try {
            String[] currentValues = userService.fetchDatas(DEFAULT_KEYS);
            for (int i = 0; i < currentValues.length; i++) {
                OnDataChanged(context, DEFAULT_KEYS[i], currentValues[i]);
            }
        } catch (RemoteException e) {
            Log.e(TAG, "Error dispatching data", e);
        }
    }

    public void addDataChangedListener(IDataChanged listener) {
        if (listener == null) {
            Log.e(TAG, "Cannot add null listener");
            return;
        }
        if (!dataChangedListeners.contains(listener)) {
            dataChangedListeners.add(listener);
            Log.w(TAG, "Listener added: " + listener.getClass().getName());
        } else {
            Log.w(TAG, "Listener already exists: " + listener.getClass().getName());
        }
    }

    public void removeDataChangedListener(IDataChanged listener) {
        if (listener == null) {
            Log.e(TAG, "Cannot remove null listener");
            return;
        }
        if (dataChangedListeners.remove(listener)) {
            Log.w(TAG, "Listener removed: " + listener.getClass().getName());
        } else {
            Log.w(TAG, "Listener not found: " + listener.getClass().getName());
        }
    }

    public String getData(String key) {
        if (dataCache.containsKey(key)) {
            return dataCache.get(key);
        }
        if (userService == null) {
            Log.e(TAG, "UserService not initialized");
            return null;
        }
        try {
            String value = userService.fetchData(key);
            dataCache.put(key, value);
            return value;
        } catch (RemoteException e) {
            Log.e(TAG, "Error fetching data", e);
            return null;
        }
    }

    public void updateData(String key, String value) {
        if (userService == null) {
            Log.e(TAG, "UserService not initialized");
            return;
        }
        try {
            userService.request("cmd.common.request.set", key, value);
        } catch (RemoteException e) {
            Log.e(TAG, "Error updating data", e);
        }
    }

    public Map<String, String> getAllCurrentCachedData() {
        return new HashMap<>(dataCache);
    }

    private void OnDataChanged(Context context, String key, String value) {
        Log.w(TAG, "Data changed: " + key + " = " + value);

        Intent broadcastIntent = new Intent("android.intent.haval." + key);
        broadcastIntent.putExtra("value", value);
        context.sendBroadcast(broadcastIntent);

        broadcastIntent = new Intent("android.intent.haval." + key + "_" + value);
        context.sendBroadcast(broadcastIntent);

        for (IDataChanged listener : new ArrayList<>(dataChangedListeners)) {
            try {
                listener.onDataChanged(key, value);
            } catch (Exception e) {
                Log.e(TAG, "Error notifying listener", e);
            }
        }

        dataCache.put(key, value);

        try {
            if (key.equals("car.frs_setting.distraction_detection_enable") && value.equals("1")) {
                boolean isForceDisableMonitoring = sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_MONITORING.getKey(), false);
                if (isForceDisableMonitoring) {
                    userService.request("cmd.common.request.set", "car.frs_setting.distraction_detection_enable", "0");
                    Log.w(TAG, "Distraction detection monitoring disabled by user preference");
                }
            } else if (key.equals("car.dms.work_state") && value.equals("0")) {
                boolean closeWindowOnPowerOff = sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.getKey(), false);
                if (closeWindowOnPowerOff) {
                    int[] windowsStatus = userService.getWindowsStatus(0);
                    for (int i = 0; i < windowsStatus.length; i++) {
                        Log.w(TAG, "Window " + i + " status: " + windowsStatus[i]);
                        if (windowsStatus[i] != 1) {
                            userService.setWindowStatus(i, 1);
                            Log.w(TAG, "Window " + i + " closed due to poweroff");
                        }
                    }
                }
            } else if (key.equals("car.basic.vehicle_speed") && sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOWS_ON_SPEED.getKey(), false)) {
                float currentSpeed = Float.parseFloat(value);
                if (currentSpeed > sharedPreferences.getFloat(SharedPreferencesKeys.SPEED_THRESHOLD.getKey(), 0)) {
                    if (!closeWindowDueToeSpeed) {
                        int[] windowsStatus = userService.getWindowsStatus(0);
                        for (int i = 0; i < windowsStatus.length; i++) {
                            if (windowsStatus[i] != 1) {
                                userService.setWindowStatus(i, 1);
                                Log.w(TAG, "Window " + i + " closed due to speed threshold exceeded: " + currentSpeed);
                            }
                        }
                        closeWindowDueToeSpeed = true;
                    }
                } else if (currentSpeed <= 10 && closeWindowDueToeSpeed) {
                    closeWindowDueToeSpeed = false;
                    Log.w(TAG, "Speed is below 10, resetting closeWindowDueToeSpeed");
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error in OnDataChanged", e);
        }
    }

    public void setMonitoringEnabled(boolean b) {
        if (userService == null) {
            Log.e(TAG, "UserService not initialized");
            return;
        }
        try {
            userService.request("cmd.common.request.set", "car.frs_setting.distraction_detection_enable", b ? "1" : "0");
            Log.w(TAG, "Distraction detection monitoring set to: " + b);
        } catch (RemoteException e) {
            Log.e(TAG, "Error setting monitoring", e);
        }
    }

    public void executeWithServicesRunning(Runnable task) {
        Runnable wrapperWithCatch = () -> {
            try {
                task.run();
            } catch (Exception e) {
                Log.e(TAG, "Error executing task", e);
            }
        };

        if (servicesInitialized) {
            wrapperWithCatch.run();
        } else {
            synchronized (pendingTasks) {
                pendingTasks.add(wrapperWithCatch);
            }
        }
    }

    public boolean isServicesInitialized() {
        return servicesInitialized;
    }

    public long getTimeInitialized() {
        return timeInitialized;
    }
}