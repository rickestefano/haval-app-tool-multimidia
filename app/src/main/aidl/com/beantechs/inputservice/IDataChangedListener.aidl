// IDataChangedListener.aidl
package com.beantechs.inputservice;

interface IDataChangedListener {
    void onDataChanged(in String key, in String value);
}