package br.com.redesurftank.havalshisuku.broadcastReceivers

import android.content.BroadcastReceiver
import android.content.Context
import android.content.Intent
import android.util.Log
import br.com.redesurftank.havalshisuku.managers.AutoBrightnessManager

class AutoBrightnessReceiver : BroadcastReceiver() {
    override fun onReceive(context: Context, intent: Intent) {
        Log.w("AutoBrightnessReceiver", "onReceive called with intent: $intent")
        AutoBrightnessManager.getInstance().updateSchedule();
    }
}