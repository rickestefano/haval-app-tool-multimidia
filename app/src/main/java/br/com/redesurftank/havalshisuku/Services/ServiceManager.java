package br.com.redesurftank.havalshisuku.Services;

import android.content.Context;
import android.content.SharedPreferences;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.RemoteException;
import android.util.Log;

import com.beantechs.intelligentvehiclecontrol.IIntelligentVehicleControlService;
import com.beantechs.intelligentvehiclecontrol.sdk.IListener;
import com.beantechs.voice.adapter.IVehicle;
import com.beantechs.voice.adapter.IBinderPool;

import java.util.List;
import java.util.Map;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.Models.SharedPreferencesKeys;
import br.com.redesurftank.havalshisuku.Utils.FridaUtils;
import br.com.redesurftank.havalshisuku.listeners.IDataChanged;
import rikka.shizuku.SystemServiceHelper;

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
    private IIntelligentVehicleControlService intelligentVehicleControlService;
    private IBinderPool binderPool;
    private IVehicle vehicleService;
    private List<IDataChanged> dataChangedListeners;
    private Map<String, String> dataCache;
    private SharedPreferences sharedPreferences;
    private Boolean closeWindowDueToeSpeed = false;
    private HandlerThread handlerThread;
    private Handler backgroundHandler;
    private IListener.Stub listener;

    private ServiceManager() {
        dataChangedListeners = new java.util.ArrayList<>();
        dataCache = new java.util.HashMap<>();
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
            if (instance.intelligentVehicleControlService != null) {
                try {
                    instance.intelligentVehicleControlService.unRegisterDataChangedListener(App.getContext().getPackageName(), instance.listener);
                } catch (RemoteException e) {
                    Log.e(TAG, "RemoteException while unregistering listener: " + e.getMessage(), e);
                }
            }
            instance.intelligentVehicleControlService = null;
            instance.binderPool = null;
            instance.vehicleService = null;
            instance.dataChangedListeners.clear();
            instance.dataCache.clear();
            instance.sharedPreferences = null;
            instance.closeWindowDueToeSpeed = false;
            instance.listener = null;
            Log.w(TAG, "ServiceManager instance cleaned");
            instance = null;
            Log.w(TAG, "ServiceManager instance discarded");
        }
    }

    public boolean initializeServices(Context context) {
        Log.w(TAG, "Initializing IntelligentVehicleControlService");
        sharedPreferences = context.getSharedPreferences("haval_prefs", Context.MODE_PRIVATE);
        handlerThread = new HandlerThread("ServiceManagerHandlerThread");
        handlerThread.start();
        backgroundHandler = new Handler(handlerThread.getLooper());
        if (!FridaUtils.ensureFridaServerRunning())
            return false;
        if (!FridaUtils.injectAllScripts())
            return false;
        if (!initializeIntelligentVehicleControlService(context))
            return false;
        if (!initializeBinderPool(context))
            return false;
        return true;
    }

    private boolean initializeIntelligentVehicleControlService(Context context) {
        if (intelligentVehicleControlService != null) {
            return true;
        }
        var binder = SystemServiceHelper.getSystemService("com.beantechs.intelligentvehiclecontrol");
        if (binder == null) {
            Log.e(TAG, "Failed to get IntelligentVehicleControlService binder");
            return false;
        }
        intelligentVehicleControlService = IIntelligentVehicleControlService.Stub.asInterface(binder);
        if (intelligentVehicleControlService == null) {
            Log.e(TAG, "Failed to get IntelligentVehicleControlService instance");
            return false;
        }
        Log.w(TAG, "IntelligentVehicleControlService is available");
        try {
            var sampleData = intelligentVehicleControlService.fetchData("car.basic.driving_ready_state");
            Log.e(TAG, "Fetched data: " + sampleData);
        } catch (RemoteException e) {
            Log.e(TAG, "RemoteException while fetching data: " + e.getMessage(), e);
            return false;
        }
        listener = new IListener.Stub() {
            @Override
            public void onDataChanged(String key, String value) {
                OnDataChanged(context, key, value);
            }
        };

        try {
            intelligentVehicleControlService.registerDataChangedListener(context.getPackageName(), listener);
        } catch (RemoteException e) {
            Log.e(TAG, "RemoteException while registering listener: " + e.getMessage(), e);
            return false;
        }

        Log.w(TAG, "Listener registered successfully");

        try {
            var currentValues = intelligentVehicleControlService.fetchDatas(DEFAULT_KEYS);
            for (int i = 0; i < currentValues.length; i++) {
                OnDataChanged(context, DEFAULT_KEYS[i], currentValues[i]);
            }
        } catch (RemoteException e) {
            Log.e(TAG, "RemoteException while fetching initial values: " + e.getMessage(), e);
            return false;
        }

        try {
            intelligentVehicleControlService.addListenerKey(context.getPackageName(), DEFAULT_KEYS);
        } catch (RemoteException e) {
            Log.e(TAG, "RemoteException while adding listener keys: " + e.getMessage(), e);
            return false;
        }

        Log.w(TAG, "Listener keys added successfully");

        if (sharedPreferences.getBoolean(SharedPreferencesKeys.SET_STARTUP_VOLUME.getKey(), false)) {
            try {
                var startupVolume = sharedPreferences.getInt(SharedPreferencesKeys.STARTUP_VOLUME.getKey(), -1);
                if (startupVolume != -1) {
                    intelligentVehicleControlService.request("cmd.common.request.set", "sys.settings.audio.media_volume", String.valueOf(startupVolume));
                    Log.w(TAG, "Startup volume set to: " + startupVolume);
                }
            } catch (RemoteException e) {
                Log.e(TAG, "RemoteException while setting startup volume: " + e.getMessage(), e);
            }
        }

        try {
            var isForceDisableMonitoring = sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.getKey(), false);
            if (isForceDisableMonitoring) {
                intelligentVehicleControlService.request("cmd.common.request.set", "car.frs_setting.distraction_detection_enable", "0");
                Log.w(TAG, "Distraction detection monitoring disabled by user preference");
            }
        } catch (RemoteException e) {
            Log.e(TAG, "RemoteException while disabling distraction detection: " + e.getMessage(), e);
        }

        Log.w(TAG, "IntelligentVehicleControlService initialized successfully");
        return true;
    }

    private boolean initializeBinderPool(Context context) {
        if (binderPool != null) {
            return true;
        }
        try {
            binderPool = IBinderPool.Stub.asInterface(SystemServiceHelper.getSystemService("com.beantechs.voice.adapter.VoiceAdapterService"));
            if (binderPool == null) {
                Log.e(TAG, "Failed to get BinderPool instance");
                return false;
            }

            Log.w(TAG, "BinderPool is available");

            vehicleService = IVehicle.Stub.asInterface(binderPool.queryBinder(6));
            if (vehicleService == null) {
                Log.e(TAG, "Failed to get IVehicle instance from BinderPool");
                return false;
            }

            backgroundHandler.post(new Runnable() {
                @Override
                public void run() {
                    try {

                    } finally {
                        backgroundHandler.postDelayed(this, 1000 * 10); // Check every 10 seconds
                    }
                }
            });

            Log.w(TAG, "IVehicle service initialized successfully");
            return true;
        } catch (Exception e) {
            Log.e(TAG, "Exception while initializing BinderPool: " + e.getMessage(), e);
            return false;
        }
    }

    public IIntelligentVehicleControlService getIntelligentVehicleControlService() {
        return intelligentVehicleControlService;
    }

    public IVehicle getVehicleService() {
        if (vehicleService == null) {
            Log.e(TAG, "IVehicle service is not initialized");
            return null;
        }
        return vehicleService;
    }

    public void dispatchAllData(Context context) {
        var currentValues = fetchAllKeys();
        for (int i = 0; i < currentValues.length; i++) {
            OnDataChanged(context, DEFAULT_KEYS[i], currentValues[i]);
        }
    }

    private String[] fetchAllKeys() {
        if (intelligentVehicleControlService == null) {
            Log.e(TAG, "IntelligentVehicleControlService is not initialized");
            return new String[0];
        }
        try {
            return intelligentVehicleControlService.fetchDatas(DEFAULT_KEYS);
        } catch (RemoteException e) {
            Log.e(TAG, "RemoteException while fetching all keys: " + e.getMessage(), e);
            return new String[0];
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
        if (intelligentVehicleControlService == null) {
            Log.e(TAG, "IntelligentVehicleControlService is not initialized");
            return null;
        }
        try {
            var value = intelligentVehicleControlService.fetchData(key);
            dataCache.put(key, value);
            return value;
        } catch (RemoteException e) {
            Log.e(TAG, "RemoteException while fetching data: " + e.getMessage(), e);
            return null;
        }
    }

    public Map<String, String> getAllCurrentCachedData() {
        return new java.util.HashMap<>(dataCache);
    }

    private void OnDataChanged(Context context, String key, String value) {
        Log.w(TAG, "Data changed: " + key + " = " + value);
        var broadcastIntent = new android.content.Intent("android.intent.haval." + key);
        broadcastIntent.putExtra("value", value);
        context.sendBroadcast(broadcastIntent);
        broadcastIntent = new android.content.Intent("android.intent.haval." + key + "_" + value);
        context.sendBroadcast(broadcastIntent);
        for (IDataChanged listener : new java.util.ArrayList<>(dataChangedListeners)) {
            try {
                listener.onDataChanged(key, value);
            } catch (Exception e) {
                Log.e(TAG, "Error notifying listener: " + e.getMessage(), e);
            }
        }
        dataCache.put(key, value);
        try {
            if (key.equals("car.frs_setting.distraction_detection_enable") && value.equals("1")) {
                try {
                    var isForceDisableMonitoring = sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_MONITORING.getKey(), false);
                    if (isForceDisableMonitoring) {
                        intelligentVehicleControlService.request("cmd.common.request.set", "car.frs_setting.distraction_detection_enable", "0");
                        Log.w(TAG, "Distraction detection monitoring disabled by user preference");
                    }
                } catch (RemoteException e) {
                    Log.e(TAG, "RemoteException while disabling distraction detection: " + e.getMessage(), e);
                }
            } else if (key.equals("car.dms.work_state") && value.equals("0")) {
                try {
                    var closeWindowOnPowerOff = sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.getKey(), false);
                    if (closeWindowOnPowerOff) {
                        var vehicleService = getVehicleService();
                        if (vehicleService != null) {
                            var windowsStatus = getVehicleService().getWindowsStatus(0);
                            for (int i = 0; i < windowsStatus.length; i++) {
                                Log.w(TAG, "Window " + i + " status: " + windowsStatus[i]);
                                if (windowsStatus[i] != 1) {
                                    getVehicleService().setWindowStatus(i, 1);
                                    Log.w(TAG, "Window " + i + " closed due to poweroff");
                                }
                            }
                        } else {
                            Log.e(TAG, "Vehicle service is not initialized, cannot close windows");
                        }
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error while checking closeWindowOnPowerOff preference: " + e.getMessage(), e);
                }
            } else if (key.equals("car.basic.vehicle_speed") && sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOWS_ON_SPEED.getKey(), false)) {
                var currentSpeed = Float.parseFloat(value);
                if (currentSpeed > sharedPreferences.getFloat(SharedPreferencesKeys.SPEED_THRESHOLD.getKey(), 0)) {
                    if (!closeWindowDueToeSpeed) {
                        var windowsStatus = getVehicleService().getWindowsStatus(0);
                        for (int i = 0; i < windowsStatus.length; i++) {
                            if (windowsStatus[i] != 1) {
                                getVehicleService().setWindowStatus(i, 1);
                                Log.w(TAG, "Window " + i + " closed due to speed threshold exceeded: " + currentSpeed);
                            }
                        }
                    }
                } else if (currentSpeed <= 10 && closeWindowDueToeSpeed) {
                    closeWindowDueToeSpeed = false;
                    Log.w(TAG, "Speed is below 10, resetting closeWindowDueToeSpeed to auto close when speed exceeds threshold");
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error in OnDataChanged: " + e.getMessage(), e);
        }
    }

    public void setMonitoringEnabled(boolean b) {
        if (intelligentVehicleControlService == null) {
            Log.e(TAG, "IntelligentVehicleControlService is not initialized");
            return;
        }
        try {
            intelligentVehicleControlService.request("cmd.common.request.set", "car.frs_setting.distraction_detection_enable", b ? "1" : "0");
            Log.w(TAG, "Distraction detection monitoring set to: " + b);
        } catch (RemoteException e) {
            Log.e(TAG, "RemoteException while setting distraction detection: " + e.getMessage(), e);
        }
    }
}