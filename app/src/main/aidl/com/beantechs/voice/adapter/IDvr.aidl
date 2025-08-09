// IDvr.aidl
package com.beantechs.voice.adapter;

// Declare any non-default types here with import statements

interface IDvr {
    boolean isInDvrApp();
    int getCaptureStatus();
    boolean isInPreviewView();
    int getAVMSupport(int param1, int param2);
    int getCurrentMode();
    boolean isDvrSupported();
    int getAvmAutoExitSpeed();
    void startBeanDvr();
    void closeBeanDvr();
    void capturePhoto(int param1, int param2);
    void captureVideo(int param1, int param2);
    void setAVM(int param);
    int getAvmPreviewStatus();
}