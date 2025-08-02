package br.com.redesurftank.havalshisuku.broadcastReceivers

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import br.com.redesurftank.havalshisuku.managers.AutoBrightnessManager

class AutoBrightnessReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        val isNight = intent.getBooleanExtra("isNight", false)
        if (isNight) {
            AutoBrightnessManager.getInstance().adjustBrightnessForNight()
        } else {
            AutoBrightnessManager.getInstance().adjustBrightnessForDay()
        }
    }
}