package br.com.redesurftank.havalshisuku.services;

import android.app.Service;
import android.content.Intent;
import android.os.IBinder;
import android.os.RemoteException;

import androidx.annotation.Nullable;

import br.com.redesurftank.havalshisuku.managers.ServiceManager;

public class FridaTakeActionService extends Service {

    private final IBinder binder = new IFridaTakeActionService.Stub() {
        @Override
        public void switchUser(String userId) throws RemoteException {
            ServiceManager.getInstance().switchUser(userId);
        }
    };

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return binder;
    }
}
