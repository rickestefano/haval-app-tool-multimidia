package br.com.redesurftank.havalshisuku.models;

public enum VoiceFunction {
    AC("AC"),
    AC_ANION("ACAnion"),
    AC_COMFORT_CURVE("ACComfortCurve"),
    AC_COOLING("ACCooling"),
    AC_DEFROST_AUTO("ACDefrostAuto"),
    AC_DEFROST_FRONT("ACDefrostFront"),
    AC_DEFROST_REAR("ACDefrostRear"),
    AC_FRAGRANCE_SYSTEM("ACFragranceSystem"),
    AC_HEATING("ACHeating"),
    AC_LEVEL("ACLevel"),
    AC_MAX_COOLING("ACMaxCooling"),
    AC_MAX_HEATING("ACMaxHeating"),
    AC_PASSENGER("ACPassenger"),
    AC_SYNC("ACSync"),
    AMBIENT_LIGHT("AmbientLight"),
    AMBIENT_LIGHT_DYNAMIC("AmbientLightDynamic"),
    AMBIENT_LIGHT_RHYTHM("AmbientLightRhythm"),
    AMBIENT_LIGHT_STATIC("AmbientLightStatic"),
    BLUETOOTH("Bluetooth"),
    BLUETOOTH_CANCEL_BOND("BluetoothCancelBond"),
    BLUETOOTH_CREATE_BOND("BluetoothCreateBond"),
    BRIGHT_CENTRAL_AUTO("BrightCentralAuto"),
    CAR_ENGINE("CarEngine"),
    DVR("Dvr"),
    DVR_OMNI_VIEW("DvrOmniView"),
    DVR_PHOTOGRAPH_FRONT("DvrPhotographFront"),
    DVR_PHOTOGRAPH_FRONT_AND_INSIDE("DvrPhotographFrontAndInside"),
    DVR_PHOTOGRAPH_INSIDE("DvrPhotographInside"),
    DVR_SHOOT_FRONT("DvrShootFront"),
    DVR_SHOOT_FRONT_AND_INSIDE("DvrShootFrontAndInside"),
    DVR_SHOOT_INSIDE("DvrShootInside"),
    DVR_VIDEOTAPE_FRONT("DvrVideotapeFront"),
    DVR_VIDEOTAPE_FRONT_AND_INSIDE("DvrVideotapeFrontAndInside"),
    DVR_VIDEOTAPE_INSIDE("DvrVideotapeInside"),
    HOTSPOT("HotSpot"),
    HUD("Hud"),
    HUD_ANGLE("HudAngle"),
    HUD_MODULE_ADAS("HudModuleADAS"),
    HUD_MODULE_ENGINE_SPEED("HudModuleEngineSpeed"),
    HUD_MODULE_NAVIGATION("HudModuleNavigation"),
    HUD_MODULE_PHONE("HudModulePhone"),
    HUD_SNOW_MODEL("HudSnowModel"),
    IPK_SETTING("IpkSetting"),
    IPK_SETTING_CLASSICS("IpkSettingClassics"),
    IPK_SETTING_INTELLIGENCE("IpkSettingIntelligence"),
    IPK_SETTING_SIMPLE("IpkSettingSimple"),
    KID_MODE("KidMode"),
    MEDITATION_MODE("MeditationMode"),
    REAR_VIEW_MIRROR_FOLD("RearViewMirrorFold"),
    SEAT_CONTROL_DRIVER("SeatControlDriver"),
    SEAT_CONTROL_PASSENGER("SeatControlPassenger"),
    SEAT_CONTROL_SECOND("SeatControlSecond"),
    SEAT_CONTROL_THIRD("SeatControlThird"),
    SEAT_HEATING_DRIVER("SeatHeatingDriver"),
    SEAT_HEATING_LEFT_REAR("SeatHeatingLeftRear"),
    SEAT_HEATING_MIDDLE_REAR("SeatHeatingMiddleRear"),
    SEAT_HEATING_PASSENGER("SeatHeatingPassenger"),
    SEAT_HEATING_RIGHT_REAR("SeatHeatingRightRear"),
    SEAT_VENTILATION_DRIVER("SeatVentilationDriver"),
    SEAT_VENTILATION_LEFT_REAR("SeatVentilationLeftRear"),
    SEAT_VENTILATION_MIDDLE_REAR("SeatVentilationMiddleRear"),
    SEAT_VENTILATION_PASSENGER("SeatVentilationPassenger"),
    SEAT_VENTILATION_RIGHT_REAR("SeatVentilationRightRear"),
    SMS_MESSAGE_READ("ReadSmsMessage"),
    SMS_MESSAGE_SEND("SendSmsMessage"),
    STEERING_WHEEL_HEATING("SteeringWheelHeating"),
    TAILGATE("Tailgate"),
    WINDOW("Window"),
    WINDOW_DRIVER("WindowDriver"),
    WINDOW_LEFT_REAR("WindowLeftRear"),
    WINDOW_PASSENGER("WindowPassenger"),
    WINDOW_RIGHT_REAR("WindowRightRear"),
    WINDOW_SHADE_SCREENS("WindowShadeScreens"),
    WINDOW_SKYLIGHT("WindowSkylight"),
    WIPER("Wiper");

    private final String value;

    VoiceFunction(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static VoiceFunction fromValue(String value) {
        for (VoiceFunction func : values()) {
            if (func.value.equals(value)) {
                return func;
            }
        }
        throw new IllegalArgumentException("No enum constant with value " + value);
    }
}
