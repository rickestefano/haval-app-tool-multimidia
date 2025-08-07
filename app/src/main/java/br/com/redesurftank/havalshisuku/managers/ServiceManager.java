package br.com.redesurftank.havalshisuku.managers;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.RemoteException;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;

import com.beantechs.intelligentvehiclecontrol.sdk.IListener;
import com.beantechs.intelligentvehiclecontrol.IIntelligentVehicleControlService;
import com.beantechs.voice.adapter.IBinderPool;
import com.beantechs.voice.adapter.IVehicle;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.models.SharedPreferencesKeys;
import br.com.redesurftank.havalshisuku.utils.FridaUtils;
import br.com.redesurftank.havalshisuku.listeners.IDataChanged;
import rikka.shizuku.Shizuku;
import rikka.shizuku.ShizukuBinderWrapper;
import rikka.shizuku.SystemServiceHelper;

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
            "car.basic.total_odometer",
            "car.basic.battery_voltage",
            "car.ev_info.power_battery_voltage",
            "car.ev_info.power_battery_current",
            "car.ev_info.cur_battery_power_percentage",
            "car.ev_info.energy_output_percentage",
            "car.basic.accumulated_drivetime",
            "car.ev.setting.avas_enable",
            "car.ev.setting.avas_config",
            "sys.avm.preview_status",
            "car.basic.maintenance_warning",
            "car.basic.maintenance_warning_mileage",
            "car.basic.inside_temp",
            "car.basic.outside_temp",
            "car.basic.steering_wheel_angle",
            "car.basic.steering_reset_remind_enable",
    };
    private static ServiceManager instance;
    private final List<IDataChanged> dataChangedListeners;
    private final Map<String, String> dataCache;
    private SharedPreferences sharedPreferences;
    private Boolean closeWindowDueToeSpeed = false;
    private HandlerThread handlerThread;
    private Handler backgroundHandler;
    private IListener.Stub listener;
    private boolean servicesInitialized = false;
    private boolean isFridaInitialized = false;
    private final List<Runnable> pendingTasks = new ArrayList<>();
    private static long timeBootReceived;
    private long timeStartInitialization;
    private long timeInitialized;
    private IIntelligentVehicleControlService controlService;
    private IVehicle vehicle;

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

    public synchronized boolean initializeServices(Context context) {
        try {
            if (controlService != null) {
                if (controlService.asBinder().isBinderAlive()) {
                    try {
                        controlService.unRegisterDataChangedListener(context.getPackageName(), listener);
                        controlService = null;  // Disconnect binder
                    } catch (Exception e) {
                        // ignore
                    }
                }
            }
            if (vehicle != null) {
                vehicle = null;  // Disconnect binder
            }
            if (handlerThread != null && handlerThread.isAlive()) {
                handlerThread.quitSafely();
                handlerThread = null;
                backgroundHandler = null;
            }
        } catch (Exception e) {
            Log.e(TAG, "Error during service cleanup", e);
        }
        timeStartInitialization = SystemClock.uptimeMillis();
        Log.w(TAG, "Initializing services with Shizuku");
        sharedPreferences = context.getSharedPreferences("haval_prefs", Context.MODE_PRIVATE);
        handlerThread = new HandlerThread("ServiceManagerHandlerThread");
        handlerThread.start();
        backgroundHandler = new Handler(handlerThread.getLooper());
        if (!Shizuku.pingBinder()) {
            Log.e(TAG, "Shizuku not available");
            return false;
        }

        try {
            IBinder controlBinder = new ShizukuBinderWrapper(getSystemService("com.beantechs.intelligentvehiclecontrol"));
            controlService = IIntelligentVehicleControlService.Stub.asInterface(controlBinder);
            IBinder poolBinder = new ShizukuBinderWrapper(getSystemService("com.beantechs.voice.adapter.VoiceAdapterService"));
            IBinderPool pool = IBinderPool.Stub.asInterface(poolBinder);
            IBinder vehicleBinder = pool.queryBinder(6);
            vehicle = IVehicle.Stub.asInterface(new ShizukuBinderWrapper(vehicleBinder));
            Log.w(TAG, "Services bound successfully");
            listener = new IListener.Stub() {
                @Override
                public void onDataChanged(String key, String value) {
                    OnDataChanged(context, key, value);
                }
            };
            controlService.registerDataChangedListener(context.getPackageName(), listener);
            Log.w(TAG, "Listener registered successfully");
            controlService.addListenerKey(context.getPackageName(), DEFAULT_KEYS);
            Log.w(TAG, "Listener keys added successfully");
            dispatchAllData(context);
            if (sharedPreferences.getBoolean(SharedPreferencesKeys.SET_STARTUP_VOLUME.getKey(), false)) {
                int startupVolume = sharedPreferences.getInt(SharedPreferencesKeys.STARTUP_VOLUME.getKey(), -1);
                if (startupVolume != -1) {
                    controlService.request("cmd.common.request.set", "sys.settings.audio.media_volume", String.valueOf(startupVolume));
                    Log.w(TAG, "Startup volume set to: " + startupVolume);
                }
            }
            boolean isForceDisableMonitoring = sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_MONITORING.getKey(), false);
            if (isForceDisableMonitoring) {
                setMonitoringEnabled(false);
                Log.w(TAG, "Distraction detection monitoring disabled by user preference");
            }
            boolean isForceDisableAVAS = sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_AVAS.getKey(), false);
            if (isForceDisableAVAS) {
                setAvasEnabled(false);
                Log.w(TAG, "AVAS disabled by user preference");
            }
            if (sharedPreferences.getBoolean(SharedPreferencesKeys.ENABLE_AUTO_BRIGHTNESS.getKey(), false)) {
                AutoBrightnessManager.Companion.getInstance().setEnabled(true);
            }

            if (sharedPreferences.getBoolean(SharedPreferencesKeys.ENABLE_FRIDA_HOOKS.getKey(), false)) {
                pendingTasks.add(this::initializeFrida);
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
            ProjectorManager.getInstance().initialize();
            return true;
        } catch (RemoteException e) {
            Log.e(TAG, "Error during initialization", e);
            return false;
        }
    }

    public void dispatchAllData(Context context) {
        if (controlService == null) return;
        try {
            String[] currentValues = controlService.fetchDatas(DEFAULT_KEYS);
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
        if (controlService == null) {
            Log.e(TAG, "ControlService not initialized");
            return null;
        }
        try {
            String value = controlService.fetchData(key);
            dataCache.put(key, value);
            return value;
        } catch (RemoteException e) {
            Log.e(TAG, "Error fetching data", e);
            return null;
        }
    }

    public void updateData(String key, String value) {
        if (controlService == null) {
            Log.e(TAG, "ControlService not initialized");
            return;
        }
        try {
            controlService.request("cmd.common.request.set", key, value);
        } catch (RemoteException e) {
            Log.e(TAG, "Error updating data", e);
        }
    }

    public Map<String, String> getAllCurrentCachedData() {
        return new HashMap<>(dataCache);
    }

    private void OnDataChanged(Context context, String key, String value) {
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
                    setMonitoringEnabled(false);
                    Log.w(TAG, "Distraction detection monitoring disabled by user preference");
                }
            }
            if (key.equals("car.ev.setting.avas_enable") && value.equals("1")) {
                boolean isForceDisableAVAS = sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_AVAS.getKey(), false);
                if (isForceDisableAVAS) {
                    setAvasEnabled(false);
                    Log.w(TAG, "AVAS disabled by user preference");
                }
            } else if (key.equals("car.dms.work_state") && value.equals("0")) {
                boolean closeWindowOnPowerOff = sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.getKey(), false);
                if (closeWindowOnPowerOff) {
                    int[] windowsStatus = vehicle.getWindowsStatus(0);
                    for (int i = 0; i < windowsStatus.length; i++) {
                        Log.w(TAG, "Window " + i + " status: " + windowsStatus[i]);
                        if (windowsStatus[i] != 1) {
                            vehicle.setWindowStatus(i, 1);
                            Log.w(TAG, "Window " + i + " closed due to poweroff");
                        }
                    }
                }
            } else if (key.equals("car.basic.vehicle_speed") && sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOWS_ON_SPEED.getKey(), false)) {
                float currentSpeed = Float.parseFloat(value);
                if (currentSpeed > sharedPreferences.getFloat(SharedPreferencesKeys.SPEED_THRESHOLD.getKey(), 0)) {
                    if (!closeWindowDueToeSpeed) {
                        int[] windowsStatus = vehicle.getWindowsStatus(0);
                        for (int i = 0; i < windowsStatus.length; i++) {
                            if (windowsStatus[i] != 1) {
                                vehicle.setWindowStatus(i, 1);
                                Log.w(TAG, "Window " + i + " closed due to speed threshold exceeded: " + currentSpeed);
                            }
                        }
                        closeWindowDueToeSpeed = true;
                    }
                } else if (currentSpeed <= 10 && closeWindowDueToeSpeed) {
                    closeWindowDueToeSpeed = false;
                    Log.w(TAG, "Speed is below 10, resetting closeWindowDueToeSpeed");
                }
            } else if (key.equals("sys.avm.preview_status") && sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_AVM_CAR_STOPPED.getKey(), false) && value.equals("1") && Integer.parseInt(getData("car.basic.vehicle_speed")) <= 0) {
                controlService.request("cmd.common.request.set", "sys.avm.preview_status", "0");
            }
        } catch (Exception e) {
            Log.e(TAG, "Error in OnDataChanged", e);
        }
    }

    public void setMonitoringEnabled(boolean b) {
        if (controlService == null) {
            Log.e(TAG, "ControlService not initialized");
            return;
        }
        try {
            controlService.request("cmd.common.request.set", "car.frs_setting.distraction_detection_enable", b ? "1" : "0");
            Log.w(TAG, "Distraction detection monitoring set to: " + b);
        } catch (RemoteException e) {
            Log.e(TAG, "Error setting monitoring", e);
        }
    }

    public void setAvasEnabled(boolean b) {
        if (controlService == null) {
            Log.e(TAG, "ControlService not initialized");
            return;
        }
        try {
            controlService.request("cmd.common.request.set", "car.ev.setting.avas_enable", b ? "1" : "0");
            Log.w(TAG, "AVAS enabled: " + b);
        } catch (RemoteException e) {
            Log.e(TAG, "Error setting AVAS", e);
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

    public void switchUser(String userId) {
        executeWithServicesRunning(() -> {
            if (sharedPreferences.getString(SharedPreferencesKeys.CURRENT_USER.getKey(), "").equals(userId)) {
                Log.w(TAG, "Current user is already: " + userId);
                return;
            }
            Log.w(TAG, "Switching user to: " + userId);
            sharedPreferences.edit()
                    .putString(SharedPreferencesKeys.CURRENT_USER.getKey(), userId)
                    .apply();
        });
    }

    public int getTotalOdometer() {
        var totalOdometer = getData("car.basic.total_odometer");
        if (totalOdometer == null || totalOdometer.isEmpty()) {
            Log.w(TAG, "Total odometer data is not available");
            return 0;
        }
        try {
            return Integer.parseInt(totalOdometer);
        } catch (NumberFormatException e) {
            Log.e(TAG, "Error parsing total odometer value: " + totalOdometer, e);
            return 0;
        }
    }

    public void initializeFrida() {
        if (isFridaInitialized)
            return;
        isFridaInitialized = true;

        if (!tryInitializeFrida()) {
            sharedPreferences.edit()
                    .putBoolean(SharedPreferencesKeys.ENABLE_FRIDA_HOOKS.getKey(), false)
                    .apply();
            Log.e(TAG, "Frida initialization failed, disabling Frida hooks");
        }
    }

    private boolean tryInitializeFrida() {
        try {
            if (!FridaUtils.ensureFridaServerRunning()) {
                Log.e(TAG, "Failed to ensure Frida server is running");
                return false;
            }
            Log.w(TAG, "Frida server is running, injecting scripts...");
            if (!FridaUtils.injectAllScripts())
                return false;
        } catch (Exception e) {
            Log.e(TAG, "Error during Frida script injection", e);
            return false;
        }

        Log.w(TAG, "Frida initialization completed successfully");
        return true;
    }

    public boolean isServicesInitialized() {
        return servicesInitialized;
    }

    public void setTimeBootReceived(long l) {
        if (timeBootReceived != 0)
            return;
        timeBootReceived = l;
    }

    public long getTimeInitialized() {
        return timeInitialized;
    }

    public long getTimeBootReceived() {
        return timeBootReceived;
    }

    public long getTimeStartInitialization() {
        return timeStartInitialization;
    }

    private static IBinder getSystemService(String serviceName) {
        try {
            return (IBinder) Objects.requireNonNull(getService.invoke(null, serviceName));
        } catch (IllegalAccessException | InvocationTargetException e) {
            Log.e(TAG, "Error getting system service: " + serviceName, e);
            throw new RuntimeException(e);
        }
    }

    private static Method getService;

    static {
        try {
            Class<?> sm = Class.forName("android.os.ServiceManager");
            getService = sm.getMethod("getService", String.class);
        } catch (ClassNotFoundException | NoSuchMethodException e) {
            Log.w(TAG, Log.getStackTraceString(e));
        }
    }
}