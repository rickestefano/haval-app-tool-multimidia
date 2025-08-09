package br.com.redesurftank.havalshisuku.broadcastReceivers;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.util.Log;

import androidx.core.content.ContextCompat;

import br.com.redesurftank.havalshisuku.managers.ServiceManager;

public class DispatchAllDatasReceiver extends BroadcastReceiver {

    private static final String TAG = "DispatchAllDatasReceiver";
    public static final String ACTION_DISPATCH_ALL_DATA = "br.com.redesurftank.havalshisuku.ACTION_DISPATCH_ALL_DATAS";

    @Override
    public void onReceive(Context context, Intent intent) {
        long startTime = System.currentTimeMillis();
        Log.w(TAG, "Starting to dispatch all data");
        ServiceManager.getInstance().dispatchAllData();
        long endTime = System.currentTimeMillis();
        Log.w(TAG, "Finished dispatching all data in " + (endTime - startTime) + " ms");
    }

    public static void registerToBroadcast(Context context) {
        var intentFilter = new IntentFilter(ACTION_DISPATCH_ALL_DATA);
        ContextCompat.registerReceiver(context, new DispatchAllDatasReceiver(), intentFilter, ContextCompat.RECEIVER_EXPORTED);
        Log.w(TAG, "DispatchAllDatasReceiver registered to broadcast");
    }
}
