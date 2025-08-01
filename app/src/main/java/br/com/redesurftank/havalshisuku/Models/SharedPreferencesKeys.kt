package br.com.redesurftank.havalshisuku.Models

enum class SharedPreferencesKeys(val key: String, val description: String) {
    DISABLE_MONITORING("disableMonitoring", "Manter desativado monitoramento de distrações"),
    CLOSE_WINDOW_ON_POWER_OFF("closeWindowOnPowerOff", "Fechar janela ao desligar o veículo"),
    SET_STARTUP_VOLUME("setStartupVolume", "Definir volume ao ligar o veículo"),
    STARTUP_VOLUME("startupVolume", "Volume ao ligar o veículo"),
    CLOSE_WINDOWS_ON_SPEED("closeWindowsOnSpeed", "Fechar janelas ao atingir velocidade"),
    SPEED_THRESHOLD("speedThreshold", "Velocidade limite para fechar janelas"),
    NIGHT_START_HOUR("nightStartHour", "Hora de início da noite"),
    NIGHT_START_MINUTE("nightStartMinute", "Minuto de início da noite"),
    NIGHT_END_HOUR("nightEndHour", "Hora de fim da noite"),
    NIGHT_END_MINUTE("nightEndMinute", "Minuto de fim da noite"),
    ENABLE_AUTO_BRIGHTNESS("enableAutoBrightness", "Habilitar ajuste automático de brilho"),
}