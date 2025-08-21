// IDataChangedListener.aidl
package com.beantechs.inputservice;

interface IInputListener {
    void dispatchKeyEvent(in KeyEvent keyEvent);
}