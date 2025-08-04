package br.com.redesurftank.havalshisuku.broadcastReceivers;

import android.annotation.SuppressLint;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.SystemClock;
import android.util.Log;

import br.com.redesurftank.havalshisuku.services.ForegroundService;
import br.com.redesurftank.havalshisuku.services.ServiceManager;

public class BootReceiver extends BroadcastReceiver {

    private static final String TAG = "BootReceiver";

    @SuppressLint("UnsafeProtectedBroadcastReceiver")
    @Override
    public void onReceive(Context context, Intent intent) {
        ServiceManager.getInstance().setTimeBootReceived(SystemClock.uptimeMillis());
        Log.w(TAG, "Boot completed received, starting service...");
        // Start the BackgroundService
        Intent serviceIntent = new Intent(context, ForegroundService.class);
        context.startForegroundService(serviceIntent);
    }
}