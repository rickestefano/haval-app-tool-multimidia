package com.autolink.tbox;

import android.os.Parcel;
import android.os.Parcelable;

/* loaded from: classes.dex */
public enum SimState implements Parcelable {
    NORMAL,
    LOCKED,
    NOT_EXISTS,
    ERROR;

    public static final Parcelable.Creator<SimState> CREATOR = new Parcelable.Creator<SimState>() { // from class: com.autolink.tbox.SimState.1
        /* JADX WARN: Can't rename method to resolve collision */
        @Override // android.os.Parcelable.Creator
        public SimState createFromParcel(Parcel in) {
            return SimState.valueOf(in.readInt());
        }

        /* JADX WARN: Can't rename method to resolve collision */
        @Override // android.os.Parcelable.Creator
        public SimState[] newArray(int size) {
            return new SimState[size];
        }
    };

    @Override // android.os.Parcelable
    public int describeContents() {
        return 0;
    }

    @Override // android.os.Parcelable
    public void writeToParcel(Parcel parcel, int i) {
        parcel.writeInt(ordinal());
    }

    public static SimState valueOf(int ordinal) {
        SimState[] set = values();
        if (ordinal < 0 || ordinal >= set.length) {
            return null;
        }
        return set[ordinal];
    }
}