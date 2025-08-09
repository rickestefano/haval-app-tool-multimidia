package br.com.redesurftank.havalshisuku.managers

import android.app.AlarmManager
import android.app.PendingIntent
import android.content.Context
import android.content.Intent
import android.icu.util.Calendar
import android.util.Log
import br.com.redesurftank.App
import br.com.redesurftank.havalshisuku.broadcastReceivers.AutoBrightnessReceiver
import br.com.redesurftank.havalshisuku.models.CarConstants
import br.com.redesurftank.havalshisuku.models.SharedPreferencesKeys

class AutoBrightnessManager private constructor() {
    companion object {
        @Volatile
        private var INSTANCE: AutoBrightnessManager? = null
        fun getInstance(): AutoBrightnessManager {
            return INSTANCE ?: synchronized(this) {
                INSTANCE ?: AutoBrightnessManager().also { INSTANCE = it }
            }
        }
    }

    private val prefs = App.getContext().getSharedPreferences("haval_prefs", Context.MODE_PRIVATE)
    private val alarmManager = App.getContext().getSystemService(Context.ALARM_SERVICE) as AlarmManager

    fun setEnabled(enabled: Boolean) {
        if (enabled) {
            updateSchedule()
        } else {
            cancelSchedules()
        }
    }

    fun updateSchedule() {
        cancelSchedules()
        if (isNightTime()) {
            adjustBrightnessForNight()
        } else {
            adjustBrightnessForDay()
        }
        scheduleNextStart()
        scheduleNextEnd()
    }

    private fun isNightTime(): Boolean {
        val now = Calendar.getInstance()
        val currentTime = now.get(Calendar.HOUR_OF_DAY) * 60 + now.get(Calendar.MINUTE)
        val startHour = prefs.getInt(SharedPreferencesKeys.NIGHT_START_HOUR.key, 20)
        val startMin = prefs.getInt(SharedPreferencesKeys.NIGHT_START_MINUTE.key, 0)
        val startTime = startHour * 60 + startMin
        val endHour = prefs.getInt(SharedPreferencesKeys.NIGHT_END_HOUR.key, 6)
        val endMin = prefs.getInt(SharedPreferencesKeys.NIGHT_END_MINUTE.key, 0)
        val endTime = endHour * 60 + endMin
        return if (startTime < endTime) {
            currentTime >= startTime && currentTime < endTime
        } else {
            currentTime >= startTime || currentTime < endTime
        }
    }

    fun adjustBrightnessForNight() {
        ServiceManager.getInstance().executeWithServicesRunning {
            ServiceManager.getInstance().updateData(CarConstants.SYS_SETTINGS_DISPLAY_BRIGHTNESS_LEVEL.value, "1");
            ServiceManager.getInstance().updateData(CarConstants.CAR_IPK_SETTING_BRIGHTNESS_CONFIG.value, "1");
        };
    }

    fun adjustBrightnessForDay() {
        ServiceManager.getInstance().executeWithServicesRunning {
            ServiceManager.getInstance().updateData(CarConstants.SYS_SETTINGS_DISPLAY_BRIGHTNESS_LEVEL.value, "10");
            ServiceManager.getInstance().updateData(CarConstants.CAR_IPK_SETTING_BRIGHTNESS_CONFIG.value, "10");
        };
    }

    private fun scheduleNextStart() {
        val calendar = Calendar.getInstance()
        val startHour = prefs.getInt(SharedPreferencesKeys.NIGHT_START_HOUR.key, 20)
        val startMin = prefs.getInt(SharedPreferencesKeys.NIGHT_START_MINUTE.key, 0)
        calendar.set(Calendar.HOUR_OF_DAY, startHour)
        calendar.set(Calendar.MINUTE, startMin)
        calendar.set(Calendar.SECOND, 0)
        if (calendar.timeInMillis <= System.currentTimeMillis()) {
            calendar.add(Calendar.DAY_OF_YEAR, 1)
        }
        val intent = Intent(App.getContext(), AutoBrightnessReceiver::class.java).apply {
            putExtra("isNight", true)
        }
        val pendingIntent = PendingIntent.getBroadcast(App.getContext(), 0, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, calendar.timeInMillis, pendingIntent)
        Log.w("AutoBrightnessManager", "Scheduled next start at: ${calendar.time}")
    }

    private fun scheduleNextEnd() {
        val calendar = Calendar.getInstance()
        val endHour = prefs.getInt(SharedPreferencesKeys.NIGHT_END_HOUR.key, 6)
        val endMin = prefs.getInt(SharedPreferencesKeys.NIGHT_END_MINUTE.key, 0)
        calendar.set(Calendar.HOUR_OF_DAY, endHour)
        calendar.set(Calendar.MINUTE, endMin)
        calendar.set(Calendar.SECOND, 0)
        if (calendar.timeInMillis <= System.currentTimeMillis()) {
            calendar.add(Calendar.DAY_OF_YEAR, 1)
        }
        val intent = Intent(App.getContext(), AutoBrightnessReceiver::class.java).apply {
            putExtra("isNight", false)
        }
        val pendingIntent = PendingIntent.getBroadcast(App.getContext(), 1, intent, PendingIntent.FLAG_UPDATE_CURRENT or PendingIntent.FLAG_IMMUTABLE)
        alarmManager.setExact(AlarmManager.RTC_WAKEUP, calendar.timeInMillis, pendingIntent)
        Log.w("AutoBrightnessManager", "Scheduled next end at: ${calendar.time}")
    }

    private fun cancelSchedules() {
        val intentStart = Intent(App.getContext(), AutoBrightnessReceiver::class.java)
        val pendingStart = PendingIntent.getBroadcast(App.getContext(), 0, intentStart, PendingIntent.FLAG_IMMUTABLE)
        alarmManager.cancel(pendingStart)
        val intentEnd = Intent(App.getContext(), AutoBrightnessReceiver::class.java)
        val pendingEnd = PendingIntent.getBroadcast(App.getContext(), 1, intentEnd, PendingIntent.FLAG_IMMUTABLE)
        alarmManager.cancel(pendingEnd)
    }
}