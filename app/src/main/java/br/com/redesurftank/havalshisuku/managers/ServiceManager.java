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
import com.beantechs.voice.adapter.IDvr;
import com.beantechs.voice.adapter.IVehicle;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.models.CarConstants;
import br.com.redesurftank.havalshisuku.models.SharedPreferencesKeys;
import br.com.redesurftank.havalshisuku.utils.FridaUtils;
import br.com.redesurftank.havalshisuku.listeners.IDataChanged;
import rikka.shizuku.Shizuku;
import rikka.shizuku.ShizukuBinderWrapper;
import rikka.shizuku.SystemServiceHelper;

@SuppressLint("PrivateApi")
public class ServiceManager {
    private static final String TAG = "ServiceManager";
    public static final CarConstants[] DEFAULT_KEYS = {
            CarConstants.CAR_BASIC_ACCUMULATED_DIRVETIME,
            CarConstants.CAR_BASIC_DOOR_STATUS,
            CarConstants.CAR_BASIC_DRIVING_READY_STATE,
            CarConstants.CAR_BASIC_INSIDE_TEMP,
            CarConstants.CAR_BASIC_MAINTENANCE_WARNING,
            CarConstants.CAR_BASIC_MAINTENANCE_WARNING_MILEAGE,
            CarConstants.CAR_BASIC_OUTSIDE_TEMP,
            CarConstants.CAR_BASIC_STEERING_RESET_REMIND_ENABLE,
            CarConstants.CAR_BASIC_STEERING_WHEEL_ANGLE,
            CarConstants.CAR_BASIC_TOTAL_ODOMETER,
            CarConstants.CAR_BASIC_VEHICLE_SPEED,
            CarConstants.CAR_BASIC_WINDOW_STATUS,
            CarConstants.CAR_DMS_WORK_STATE,
            CarConstants.CAR_EV_SETTING_AVAS_CONFIG,
            CarConstants.CAR_EV_SETTING_AVAS_ENABLE,
            CarConstants.CAR_EV_INFO_CUR_BATTERY_POWER_PERCENTAGE,
            CarConstants.CAR_EV_INFO_ENERGY_OUTPUT_PERCENTAGE,
            CarConstants.CAR_EV_INFO_POWER_BATTERY_VOLTAGE,
            CarConstants.CAR_FRS_SETTING_DISTRACTION_DETECTION_ENABLE,
            CarConstants.CAR_HVAC_ANION_ENABLE,
            CarConstants.CAR_HVAC_BLOWER_MODE,
            CarConstants.CAR_HVAC_CYCLE_MODE,
            CarConstants.CAR_HVAC_DRIVER_TEMPERATURE,
            CarConstants.CAR_HVAC_FAN_SPEED,
            CarConstants.CAR_HVAC_FRONT_DEFROST_ENABLE,
            CarConstants.CAR_HVAC_PASS_TEMPERATURE,
            CarConstants.CAR_HVAC_POWER_MODE,
            CarConstants.CAR_HVAC_SYNC_ENABLE,
            CarConstants.CAR_IPK_SETTING_BRIGHTNESS_CONFIG,
            CarConstants.SYS_AVM_AUTO_PREVIEW_ENABLE,
            CarConstants.SYS_AVM_PREVIEW_STATUS,
            CarConstants.SYS_SETTINGS_AUDIO_MEDIA_VOLUME,
            CarConstants.SYS_SETTINGS_DISPLAY_BACKLIGHT_STATE,
            CarConstants.SYS_SETTINGS_DISPLAY_BRIGHTNESS_LEVEL
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
    private IDvr dvr;

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
            if (dvr != null) {
                dvr = null;  // Disconnect binder
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
        sharedPreferences = App.getDeviceProtectedContext().getSharedPreferences("haval_prefs", Context.MODE_PRIVATE);
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
            IBinder dvrBinder = pool.queryBinder(8);
            dvr = IDvr.Stub.asInterface(new ShizukuBinderWrapper(dvrBinder));
            Log.w(TAG, "Services bound successfully");
            listener = new IListener.Stub() {
                @Override
                public void onDataChanged(String key, String value) {
                    OnDataChanged(key, value);
                }
            };
            controlService.registerDataChangedListener(context.getPackageName(), listener);
            Log.w(TAG, "Listener registered successfully");
            controlService.addListenerKey(App.getContext().getPackageName(), getCombinedKeys());
            Log.w(TAG, "Listener keys added successfully");
            dispatchAllData();
            if (sharedPreferences.getBoolean(SharedPreferencesKeys.SET_STARTUP_VOLUME.getKey(), false)) {
                int startupVolume = sharedPreferences.getInt(SharedPreferencesKeys.STARTUP_VOLUME.getKey(), -1);
                if (startupVolume != -1) {
                    controlService.request("cmd.common.request.set", CarConstants.SYS_SETTINGS_AUDIO_MEDIA_VOLUME.getValue(), String.valueOf(startupVolume));
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

    public void dispatchAllData() {
        if (controlService == null) return;
        try {
            var allKeys = getCombinedKeys();
            String[] currentValues = controlService.fetchDatas(allKeys);
            for (int i = 0; i < currentValues.length; i++) {
                OnDataChanged(allKeys[i], currentValues[i]);
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

    private void OnDataChanged( String key, String value) {
        Intent broadcastIntent = new Intent("android.intent.haval." + key);
        broadcastIntent.putExtra("value", value);
        App.getContext().sendBroadcast(broadcastIntent);
        broadcastIntent = new Intent("android.intent.haval." + key + "_" + value);
        App.getContext().sendBroadcast(broadcastIntent);
        for (IDataChanged listener : new ArrayList<>(dataChangedListeners)) {
            try {
                listener.onDataChanged(key, value);
            } catch (Exception e) {
                Log.e(TAG, "Error notifying listener", e);
            }
        }
        dataCache.put(key, value);
        try {
            if (key.equals(CarConstants.CAR_FRS_SETTING_DISTRACTION_DETECTION_ENABLE.getValue()) && value.equals("1")) {
                boolean isForceDisableMonitoring = sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_MONITORING.getKey(), false);
                if (isForceDisableMonitoring) {
                    setMonitoringEnabled(false);
                    Log.w(TAG, "Distraction detection monitoring disabled by user preference");
                }
            }
            if (key.equals(CarConstants.CAR_EV_SETTING_AVAS_ENABLE.getValue()) && value.equals("1")) {
                boolean isForceDisableAVAS = sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_AVAS.getKey(), false);
                if (isForceDisableAVAS) {
                    setAvasEnabled(false);
                    Log.w(TAG, "AVAS disabled by user preference");
                }
            } else if (key.equals(CarConstants.CAR_DMS_WORK_STATE.getValue()) && value.equals("0")) {
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
            } else if (key.equals(CarConstants.CAR_BASIC_VEHICLE_SPEED.getValue()) && sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOWS_ON_SPEED.getKey(), false)) {
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
            } else if (key.equals(CarConstants.SYS_AVM_PREVIEW_STATUS.getValue()) && sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_AVM_CAR_STOPPED.getKey(), false) && value.equals("1") && Float.parseFloat(getData(CarConstants.CAR_BASIC_VEHICLE_SPEED.getValue())) <= 0f) {
                dvr.setAVM(0);
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
            controlService.request("cmd.common.request.set", CarConstants.CAR_FRS_SETTING_DISTRACTION_DETECTION_ENABLE.getValue(), b ? "1" : "0");
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
            controlService.request("cmd.common.request.set", CarConstants.CAR_EV_SETTING_AVAS_ENABLE.getValue(), b ? "1" : "0");
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
        var totalOdometer = getData(CarConstants.CAR_BASIC_TOTAL_ODOMETER.getValue());
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

    public void updateMonitoringProperties() {
        executeWithServicesRunning(() -> {
            try {
                var allKeys = getCombinedKeys();
                controlService.addListenerKey(App.getContext().getPackageName(), allKeys);
                for (String s : new HashSet<>(dataCache.keySet())) {
                    dataCache.remove(s);
                }
            } catch (RemoteException e) {
                Log.e(TAG, "Error updating monitoring properties", e);
            }
            dispatchAllData();
        });
    }

    public String[] getCombinedKeys() {
        List<String> keys = new ArrayList<>();
        keys.addAll(List.of(CarConstants.FromArray(DEFAULT_KEYS)));
        keys.addAll(sharedPreferences.getStringSet(SharedPreferencesKeys.CAR_MONITOR_PROPERTIES.getKey(), new HashSet<>()));
        return keys.toArray(new String[0]);
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