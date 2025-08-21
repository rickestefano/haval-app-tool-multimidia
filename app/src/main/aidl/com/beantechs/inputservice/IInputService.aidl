// IInputService.aidl
package com.beantechs.inputservice;

import android.view.KeyEvent;
import android.content.ComponentName;
import com.beantechs.inputservice.IDataChangedListener;
import com.beantechs.inputservice.IInputListener;

interface IInputService {
    void registerKeyEventListener(in int[] keyCodes, in IInputListener listener);
    void unregisterKeyEventListener(in int[] keyCodes, in IInputListener listener);
    void registerGlobalButtonListener(in int[] buttonCodes, in ComponentName component);
    void unregisterGlobalButtonListener(in int[] buttonCodes, in ComponentName component);
    void registerDataListener(in String[] dataTypes, in IDataChangedListener listener);
    void unregisterDataListener(in String[] dataTypes, in IDataChangedListener listener);
    void injectKeyEvent(in KeyEvent event, int injectMode);
    void enterScene(int sceneId);
    void exitScene(int sceneId);
}