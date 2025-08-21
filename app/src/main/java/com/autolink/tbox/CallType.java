// CallType.java
package com.autolink.tbox;

import android.os.Parcel;
import android.os.Parcelable;

public enum CallType implements Parcelable {
    I_CALL,
    B_CALL,
    AUTO_E_CALL,
    MANUAL_E_CALL,
    VOICE_CALL,
    VIDEO_CALL,
    E_CALLBACK,
    INCOMING_CALL;

    public static final Parcelable.Creator<CallType> CREATOR = new Parcelable.Creator<CallType>() {
        @Override
        public CallType createFromParcel(Parcel in) {
            return CallType.valueOf(in.readInt());
        }

        @Override
        public CallType[] newArray(int size) {
            return new CallType[size];
        }
    };

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(ordinal());
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public static CallType valueOf(int ordinal) {
        CallType[] set = values();
        if (ordinal < 0 || ordinal >= set.length) {
            return null;
        }
        return set[ordinal];
    }
}