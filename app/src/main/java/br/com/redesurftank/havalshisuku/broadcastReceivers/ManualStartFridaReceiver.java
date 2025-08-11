package br.com.redesurftank.havalshisuku.broadcastReceivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import br.com.redesurftank.havalshisuku.managers.ServiceManager;
import br.com.redesurftank.havalshisuku.services.ForegroundService;
import br.com.redesurftank.havalshisuku.utils.FridaUtils;

public class ManualStartFridaReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.w("ManualStartFridaReceiver", "Received intent: " + intent.getAction());
        if (intent.getAction() != null && intent.getAction().equals("br.com.redesurftank.havalshisuku.FRIDA_START")) {
            ServiceManager.getInstance().initializeFrida();
        }
    }
}
