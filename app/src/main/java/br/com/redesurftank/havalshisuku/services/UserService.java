package br.com.redesurftank.havalshisuku.services;

import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;

import com.beantechs.intelligentvehiclecontrol.IIntelligentVehicleControlService;
import com.beantechs.intelligentvehiclecontrol.sdk.IListener;
import com.beantechs.voice.adapter.IBinderPool;
import com.beantechs.voice.adapter.IVehicle;

import br.com.redesurftank.havalshisuku.IUserService;
import rikka.shizuku.SystemServiceHelper;

public class UserService extends IUserService.Stub {
    private static final String TAG = "UserService";
    private IIntelligentVehicleControlService controlService;
    private IVehicle vehicle;

    public UserService() {
        IBinder controlBinder = getSystemBinder("com.beantechs.intelligentvehiclecontrol");
        if (controlBinder != null) {
            controlService = IIntelligentVehicleControlService.Stub.asInterface(controlBinder);
        }

        IBinder poolBinder = getSystemBinder("com.beantechs.voice.adapter.VoiceAdapterService");
        if (poolBinder != null) {
            IBinderPool pool = IBinderPool.Stub.asInterface(poolBinder);
            try {
                IBinder vehicleBinder = pool.queryBinder(6);
                vehicle = IVehicle.Stub.asInterface(vehicleBinder);
            } catch (RemoteException e) {
                Log.e(TAG, "Failed to query vehicle binder", e);
            }
        }
    }

    private IBinder getSystemBinder(String name) {
        return SystemServiceHelper.getSystemService(name);
    }

    @Override
    public String fetchData(String key) throws RemoteException {
        if (controlService == null) throw new RemoteException("Service not initialized");
        return controlService.fetchData(key);
    }

    @Override
    public String[] fetchDatas(String[] keys) throws RemoteException {
        if (controlService == null) throw new RemoteException("Service not initialized");
        return controlService.fetchDatas(keys);
    }

    @Override
    public void request(String cmd, String key, String value) throws RemoteException {
        if (controlService == null) throw new RemoteException("Service not initialized");
        controlService.request(cmd, key, value);
    }

    @Override
    public void registerDataChangedListener(String packageName, IListener listener) throws RemoteException {
        if (controlService == null) throw new RemoteException("Service not initialized");
        controlService.registerDataChangedListener(packageName, listener);
    }

    @Override
    public void unRegisterDataChangedListener(String packageName, IListener listener) throws RemoteException {
        if (controlService == null) throw new RemoteException("Service not initialized");
        controlService.unRegisterDataChangedListener(packageName, listener);
    }

    @Override
    public void addListenerKey(String packageName, String[] keys) throws RemoteException {
        if (controlService == null) throw new RemoteException("Service not initialized");
        controlService.addListenerKey(packageName, keys);
    }

    @Override
    public int[] getWindowsStatus(int arg) throws RemoteException {
        if (vehicle == null) throw new RemoteException("Vehicle not initialized");
        return vehicle.getWindowsStatus(arg);
    }

    @Override
    public void setWindowStatus(int window, int status) throws RemoteException {
        if (vehicle == null) throw new RemoteException("Vehicle not initialized");
        vehicle.setWindowStatus(window, status);
    }
}