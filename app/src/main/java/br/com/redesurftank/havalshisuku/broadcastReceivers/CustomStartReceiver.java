package br.com.redesurftank.havalshisuku.broadcastReceivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.util.Log;

import br.com.redesurftank.havalshisuku.services.ForegroundService;

public class CustomStartReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        Log.w("CustomStartReceiver", "Received intent: " + intent.getAction());
        if (intent.getAction() != null && intent.getAction().equals("br.com.redesurftank.havalshisuku.ACTION_START_SERVICE")) {
            Intent serviceIntent = new Intent(context, ForegroundService.class);
            context.startForegroundService(serviceIntent);
        }
    }
}
