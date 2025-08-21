// CallOperation.java
package com.autolink.tbox;

import android.os.Parcel;
import android.os.Parcelable;

public enum CallOperation implements Parcelable {
    RESUME,
    PAUSE,
    ACCEPT,
    REJECT,
    HANGUP,
    NOT_AUTHORIZED;

    public static final Parcelable.Creator<CallOperation> CREATOR = new Parcelable.Creator<CallOperation>() {
        @Override
        public CallOperation createFromParcel(Parcel in) {
            return CallOperation.valueOf(in.readInt());
        }

        @Override
        public CallOperation[] newArray(int size) {
            return new CallOperation[size];
        }
    };

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i3) {
        parcel.writeInt(ordinal());
    }

    public static CallOperation valueOf(int ordinal) {
        CallOperation[] set = values();
        if (ordinal < 0 || ordinal >= set.length) {
            return null;
        }
        return set[ordinal];
    }
}