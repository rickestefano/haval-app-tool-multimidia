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

import com.beantechs.intelligentvehiclecontrol.IIntelligentVehicleControlService;
import com.beantechs.intelligentvehiclecontrol.sdk.IListener;
import com.beantechs.voice.adapter.IBinderPool;
import com.beantechs.voice.adapter.IDvr;
import com.beantechs.voice.adapter.IVehicle;
import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.listeners.IDataChanged;
import br.com.redesurftank.havalshisuku.models.CarConstants;
import br.com.redesurftank.havalshisuku.models.SharedPreferencesKeys;
import br.com.redesurftank.havalshisuku.utils.FridaUtils;
import rikka.shizuku.Shizuku;
import rikka.shizuku.ShizukuBinderWrapper;

@SuppressLint("PrivateApi")
public class ServiceManager {
    private static final String TAG = "ServiceManager";
    public static final CarConstants[] DEFAULT_KEYS = {
            CarConstants.CAR_BASIC_ACCUMULATED_DIRVETIME,
            CarConstants.CAR_BASIC_GEAR_STATUS,
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
            CarConstants.SYS_SETTINGS_DISPLAY_BRIGHTNESS_LEVEL,
            CarConstants.CAR_DRIVE_SETTING_OUTSIDE_VIEW_MIRROR_FOLD_STATE
    };
    /**
     * allData = new String[]{"sys.settings.audio.volume_adaptation_enable", "sys.settings.audio.navi_tts_mix_media_enable", "sys.settings.audio.system_acoustics_enable", "sys.settings.audio.vehicle_alarm_enable", "sys.settings.audio.volume_adjust_by_speed_state", "car.ev.setting.avas_enable", "car.ev.setting.avas_config", "sys.settings.audio.sound_effect_dts_state", "sys.settings.audio.external_amp_enable", "car.ev.setting.vsg_config", "sys.settings.audio.sound_field_value", "sys.settings.audio.eq_bass_value", "sys.settings.audio.eq_alto_value", "sys.settings.audio.eq_treble_value", CAR_IPK_SETTING_BRIGHTNESS_CONFIG, CAR_SETTING_DISPLAY_BRIGHTNESS_LEVEL, CAR_DASHBOARD_SETTING_BRIGHTNESS_CONFIG};
     * allDataCar = new String[]{"car.drive_setting.esp_enable", "car.drive_setting.dst_enable", "car.drive_setting.ass_state", "car.drive_setting.drive_mode", "car.drive.setting.drive_mode_memory", CAR_DRIVE_SETTING_WHEEL_ASSIST_MODE, "car.drive_setting.fatigue_monitor_state", "car.light_setting.ambient_light.enable", "car.light_setting.ambient_light.rhythmic_switch", "car.light_setting.ambient_light.brightness", "car.light_setting.ambient_light.multicolor_color_config", "car.light_setting.ambient_light.multicolor_static_config", "car.light_setting.ambient_light.multicolor_dynamic_config", "car.light_setting.ambient_light.rhythmic_switch", "car.light_setting.ambient_light.dynamic_mode", "car.light_setting.ambient_light.Intelligent_linkage", "car.wireless_charge_setting.configure_enable", "car.light_setting.freight_light_enable", "car.hud_setting.enable_state", "car.hud_setting.brightness_config", "car.hud_setting.height_config", "car.hud_setting.rotation_direction", "car.hud_setting.rotation_angle", "car.hud_setting.adas_display_enable", "car.hud_setting.navigation_display_enable", "car.hud_setting.btphone_display_enable", "car.hud_setting.vibration_corrn_enable", "car.hud_setting.snow_mode_enable", "car.door_lock_setting.unlock_mode", "car.door_lock_setting.locked_by_speed", "car.door_lock_setting.unlock_by_flameout", "car.door_lock_setting.super_lock_enable", "car.comfort_setting.rearview_mirror_folding_mode", "car.comfort_setting.rearview_mirror_folding_config", "car.drive.setting.outside_view_mirror_astern_mode", "car.comfort_setting.front_wiper_work_interval", "car.comfort_setting.auto_open_back_door", "car.comfort_setting.electric_side_pedal.enable", "car.comfort_setting.electric_side_pedal.roof_mode_enable", "car.comfort_setting.electric_side_pedal.special_mode_enable", "car.intelligent_driving_setting.fas.pps_state", "car.intelligent_driving_setting.fas.pcs_state", "car.intelligent_driving_setting.fas.intersection_assist_state", "car.intelligent_driving_setting.fas.front_cross_lateral_wraning", "car.intelligent_driving_setting.fas.front_cross_lateral_brake", "car.intelligent_driving_setting.fas.early_warning_sensitivity", "car.intelligent_driving_setting.fas.auto_emergency_turn", "car.intelligent_driving_setting.las.enable", "car.intelligent_driving_setting.las.lka_state", "car.intelligent_driving_setting.las.ldw_state", "car.intelligent_driving_setting.las.lca_state", "car.intelligent_driving_setting.las.elk_state", "car.intelligent_driving_setting.smart_dodge_state", "car.intelligent_driving_setting.fas.early_warning_mode", "car.intelligent_driving_setting.las.early_warning_sensitivity", "car.intelligent_driving_setting.sras.ala_state", "car.intelligent_driving_setting.sras.door_open_warning", "car.intelligent_driving_setting.sras.rcw_state", "car.intelligent_driving_setting.sras.rsa_rsb_warning_state", "car.intelligent_driving_setting.sras.rsa_rsb_state", "car.intelligent_driving_setting.las.tsi_state", "car.intelligent_driving_setting.over_speed_warning_state", "car.intelligent_driving_setting.cruising_speed_limit", "car.intelligent_driving_setting.over_speed_alarm_sensitivity", "car.intelligent_driving_setting.eas.highway_assist_system_state", "car.intelligent_driving_setting.eas.change_lane_assist_state", "car.intelligent_driving_setting.eas.warning_way", "car.intelligent_driving_setting.eas.assist_sensitivity", "car.light_setting.welcome_light_delay_time", "car.light_setting.follow_home_delay_time", "car.light_setting.sport_mode_light", "car.light_setting.parking_light_config", "car.light_setting.find_car_mode_light", "car.light_setting.welcome_light_config", "car.parking_setting.fpas_enable", "car.parking_setting.radar_setting.meb_state", "car.parking_setting.radar_alarm_sound_enable", "car.parking_setting.apa.flanking_protection", "car.parking_setting.auto_steering_enable", "car.parking_setting.avm_auto_exit_speed_config", "sys.avm.auto_preview_enable", "car.hvac.setting.comfort_curve", "car.hvac.setting.auto_defrost_enable", "car.ev_setting.energy_recovery_level", "car.ev.setting.wash_mode_enable", "car.ev.setting.pedal_control_enable", "car.comfort_setting.reduce_seat_belt_slack", "car.comfort_setting.seat_belt_vibration_warning", "car.comfort_setting.seat_welcome_config", "car.comfort_setting.chair_memory.auto_enable", "car.frs_setting.dms_enable", "car.frs_setting.fatigue_monitoring_enable", "car.frs_setting.distraction_detection_enable", "car.frs_setting.driver_behavior_detect", "car.frs_setting.screen_control_enable", "car.frs_setting.occupant_identification_system", "car.light_setting.power_saved_mode", "car.light_setting.driver_ambient_light.enable", "car.light_setting.passenger_ambient_light.enable", "car.light_setting.rear_row_ambient_light.enable", "car.light_setting.ambient_light_ole.multicolor_color_config", "car.light_setting.ambient_light_ole.multicolor_static_config", "car.light_setting.ambient_light_ole.multicolor_dynamic_config", "car.light_setting.ambient_light_ole.rhythmic_switch", "car.light_setting.ambient_light.breathing_mode_switch", "car.light_setting.ole_ambient_light.breathing_mode_switch", "car.light_setting.ole_ambient_light.flow_mode_switch", "car.light_setting.ole_ambient_light.dynamic_mode", "car.light_setting.ambient_light_ole.flow_water_light", "car.light_setting.abs_light_enable", "car.basic.steering_reset_remind_enable", "car.basic.window_close_by_speed"};
     */
    private static final CarConstants[] KEYS_TO_SAVE = {
            CarConstants.CAR_DRIVE_SETTING_DRIVE_MODE,
            CarConstants.CAR_DRIVE_SETTING_DRIVE_MODE_MEMORY,
            CarConstants.CAR_DRIVE_SETTING_DST_ENABLE,
            CarConstants.CAR_DRIVE_SETTING_ESP_ENABLE,
            CarConstants.CAR_DRIVE_SETTING_FATIGUE_MONITOR_STATE,
            CarConstants.CAR_DRIVE_SETTING_OUTSIDE_VIEW_MIRROR_ASTERN_MODE,
            CarConstants.CAR_DRIVE_SETTING_STEERING_WHEEL_ASSIST_MODE,
            CarConstants.CAR_EV_SETTING_ENERGY_RECOVERY_LEVEL,
            CarConstants.CAR_CONFIGURE_PEDAL_CONTROL_ENABLE,
            CarConstants.CAR_HUD_SETTING_ADAS_DISPLAY_ENABLE,
            CarConstants.CAR_HUD_SETTING_ENABLE_STATE,
            CarConstants.CAR_HUD_SETTING_HEIGHT_CONFIG,
            CarConstants.CAR_HUD_SETTING_NAVIGATION_DISPLAY_ENABLE,
            CarConstants.CAR_HUD_SETTING_ROTATION_ANGLE,
            CarConstants.CAR_HUD_SETTING_ROTATION_DIRECTION,
            CarConstants.CAR_HUD_SETTING_SNOW_MODE_ENABLE,
            CarConstants.CAR_HUD_SETTING_VIBRATION_CORRN_ENABLE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_CRUISING_SPEED_LIMIT,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_EAS_ASSIST_SENSITIVITY,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_EAS_CHANGE_LANE_ASSIST_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_EAS_HIGHWAY_ASSIST_SYSTEM_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_EAS_WARNING_WAY,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_FAS_AUTO_EMERGENCY_TURN,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_FAS_EARLY_WARNING_MODE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_FAS_EARLY_WARNING_SENSITIVITY,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_FAS_FRONT_CROSS_LATERAL_BRAKE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_FAS_FRONT_CROSS_LATERAL_WRANING,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_FAS_INTERSECTION_ASSIST_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_FAS_PCS_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_FAS_PPS_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_LAS_EARLY_WARNING_SENSITIVITY,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_LAS_ELK_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_LAS_ENABLE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_LAS_LCA_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_LAS_LDW_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_LAS_LKA_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_LAS_TSI_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_OVER_SPEED_ALARM_SENSITIVITY,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_OVER_SPEED_WARNING_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_SMART_DODGE_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_SRAS_ALA_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_SRAS_DOOR_OPEN_WARNING,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_SRAS_RCW_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_SRAS_RSA_RSB_STATE,
            CarConstants.CAR_INTELLIGENT_DRIVING_SETTING_SRAS_RSA_RSB_WARNING_STATE,
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
            if (!controlBinder.pingBinder()) {
                Log.e(TAG, "IntelligentVehicleControlService binder not alive");
                return false;
            }
            controlService = IIntelligentVehicleControlService.Stub.asInterface(controlBinder);
            IBinder poolBinder = new ShizukuBinderWrapper(getSystemService("com.beantechs.voice.adapter.VoiceAdapterService"));
            if (!poolBinder.pingBinder()) {
                Log.e(TAG, "IBinderPool binder not alive");
                return false;
            }
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

    public String getUpdatedData(String key) {
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

    private void OnDataChanged(String key, String value) {
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
            } else if ((key.equals(CarConstants.CAR_DMS_WORK_STATE.getValue()) && value.equals("0"))) {
                boolean closeWindowOnPowerOff = sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.getKey(), false);
                if (closeWindowOnPowerOff) {
                    closeAllWindow();
                }
            } else if ((key.equals(CarConstants.CAR_DRIVE_SETTING_OUTSIDE_VIEW_MIRROR_FOLD_STATE.getValue()) && value.equals("0"))) {
                boolean closeWindowOnPowerOff = sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_FOLD_MIRROR.getKey(), false);
                if (closeWindowOnPowerOff) {
                    closeAllWindow();
                }
            } else if (key.equals(CarConstants.CAR_BASIC_VEHICLE_SPEED.getValue()) && sharedPreferences.getBoolean(SharedPreferencesKeys.CLOSE_WINDOWS_ON_SPEED.getKey(), false)) {
                float currentSpeed = Float.parseFloat(value);
                if (currentSpeed > sharedPreferences.getFloat(SharedPreferencesKeys.SPEED_THRESHOLD.getKey(), 0)) {
                    if (!closeWindowDueToeSpeed) {
                        closeAllWindow();
                        closeWindowDueToeSpeed = true;
                    }
                } else if (currentSpeed <= 10 && closeWindowDueToeSpeed) {
                    closeWindowDueToeSpeed = false;
                    Log.w(TAG, "Speed is below 10, resetting closeWindowDueToeSpeed");
                }
            } else if (key.equals(CarConstants.SYS_AVM_PREVIEW_STATUS.getValue()) && sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_AVM_CAR_STOPPED.getKey(), false) && value.equals("1") && Float.parseFloat(getData(CarConstants.CAR_BASIC_VEHICLE_SPEED.getValue())) <= 0f && !getData(CarConstants.CAR_BASIC_GEAR_STATUS.getValue()).equals("4")) {
                dvr.setAVM(0);
            } else if (key.equals(CarConstants.CAR_BASIC_VEHICLE_SPEED.getValue()) && Float.parseFloat(value) <= 0f && sharedPreferences.getBoolean(SharedPreferencesKeys.DISABLE_AVM_CAR_STOPPED.getKey(), false) && !getData(CarConstants.CAR_BASIC_GEAR_STATUS.getValue()).equals("4")) {
                dvr.setAVM(0);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error in OnDataChanged", e);
        }
    }

    public boolean closeAllWindow() {
        try {
            int[] windowsStatus = vehicle.getWindowsStatus(0);
            for (int i = 0; i < windowsStatus.length; i++) {
                if (windowsStatus[i] != 1) {
                    vehicle.setWindowStatus(i, 1);
                }
            }
            return true;
        } catch (Exception e) {
            Log.e(TAG, "Error closing all windows", e);
            return false;
        }
    }

    public boolean isTurnLightOn() {
        var leftTurnLight = getData(CarConstants.CAR_BASIC_LEFT_TURN_SWITCH_STATUS.getValue());
        var rightTurnLight = getData(CarConstants.CAR_BASIC_RIGHT_TURN_SWITCH_STATUS.getValue());
        return (leftTurnLight != null && leftTurnLight.equals("1")) || (rightTurnLight != null && rightTurnLight.equals("1"));
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
        if (userId == null || userId.isEmpty()) {
            Log.e(TAG, "Invalid user ID provided for switchUser");
            return;
        }
        executeWithServicesRunning(() -> {
            var currentUser = sharedPreferences.getString(SharedPreferencesKeys.CURRENT_USER.getKey(), "");
            if (currentUser.equals(userId)) {
                Log.w(TAG, "Current user is already: " + userId);
                return;
            }

            Log.w(TAG, "Switching user to: " + userId);

            try {
                saveCarSettingsForUser(currentUser);
            } catch (Exception e) {
                Log.e(TAG, "Error saving settings for user: " + currentUser, e);
            }

            try {
                restoreCarSettingsForUser(userId);
            } catch (Exception e) {
                Log.e(TAG, "Error restoring settings for user: " + userId, e);
            }

            sharedPreferences.edit()
                    .putString(SharedPreferencesKeys.CURRENT_USER.getKey(), userId)
                    .apply();
        });
    }

    private void restoreCarSettingsForUser(String userId) {
        File file = new File(App.getContext().getFilesDir(), userId + ".settings.json");
        if (!file.exists()) {
            Log.w(TAG, "No saved settings found for user: " + userId);
            return;
        }
        Gson gson = new Gson();
        try (FileReader reader = new FileReader(file)) {
            JsonElement userSettingsMap = gson.fromJson(reader, JsonElement.class);
            if (!(userSettingsMap instanceof JsonObject)) {
                Log.e(TAG, "Error parsing user settings JSON for user: " + userId);
                return;
            }

            JsonObject userSettings = (JsonObject) userSettingsMap;
            for (Map.Entry<String, JsonElement> entry : userSettings.entrySet()) {
                String key = entry.getKey();
                if (Arrays.stream(KEYS_TO_SAVE).noneMatch(k -> k.getValue().equals(key))) {
                    continue;
                }
                String value = entry.getValue().getAsString();
                if (value.isEmpty()) {
                    Log.w(TAG, "Skipping empty value for key: " + key);
                    continue;
                }
                try {
                    updateData(key, value);
                    Log.w(TAG, "Restored setting for user " + userId + ": " + key + " = " + value);
                } catch (Exception e) {
                    Log.e(TAG, "Error restoring setting for user " + userId + ": " + key, e);
                }
            }
        } catch (Exception e) {
            Log.e(TAG, "Error reading settings file for user: " + userId, e);
        }
    }

    private void saveCarSettingsForUser(String userId) {
        Map<String, String> settingsToSave = new HashMap<>();

        for (CarConstants key : KEYS_TO_SAVE) {
            String value = getUpdatedData(key.getValue());
            settingsToSave.put(key.getValue(), value);
        }

        if (settingsToSave.isEmpty()) {
            Log.w(TAG, "No settings to save for user: " + userId);
            return;
        }

        Gson gson = new Gson();
        JsonObject jsonObject = new com.google.gson.JsonObject();
        for (Map.Entry<String, String> entry : settingsToSave.entrySet()) {
            jsonObject.addProperty(entry.getKey(), entry.getValue());
        }

        File file = new File(App.getContext().getFilesDir(), userId + ".settings.json");
        try (FileWriter writer = new FileWriter(file)) {
            gson.toJson(jsonObject, writer);
            Log.w(TAG, "Saved settings for user: " + userId);
        } catch (Exception e) {
            Log.e(TAG, "Error writing settings file for user: " + userId, e);
        }
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
            if (sharedPreferences.getBoolean(SharedPreferencesKeys.ENABLE_FRIDA_HOOK_SYSTEM_SERVER.getKey(), false)) {
                backgroundHandler.postDelayed(() -> {
                    try {
                        FridaUtils.injectSystemServer();
                    } catch (Exception e) {
                        Log.e(TAG, "Error injecting into system_server", e);
                    }
                }, 10000);
            }
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