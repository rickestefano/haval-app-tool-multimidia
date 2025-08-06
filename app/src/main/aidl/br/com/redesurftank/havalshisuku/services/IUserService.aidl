// IUserService.aidl
package br.com.redesurftank.havalshisuku.services;

// Declare any non-default types here with import statements

import android.os.IBinder;
import com.beantechs.intelligentvehiclecontrol.sdk.IListener;
import com.beantechs.voice.adapter.IVehicle;

interface IUserService {
    String fetchData(String key);
    String[] fetchDatas(in String[] keys);
    void request(String cmd, String key, String value);
    void registerDataChangedListener(String packageName, IListener listener);
    void unRegisterDataChangedListener(String packageName, IListener listener);
    void addListenerKey(String packageName, in String[] keys);
    int[] getWindowsStatus(int arg);
    void setWindowStatus(int window, int status);
    int getTotalOdometer();
}