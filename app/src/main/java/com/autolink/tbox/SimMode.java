package com.autolink.tbox;

import android.os.Parcel;
import android.os.Parcelable;

/* loaded from: classes.dex */
public enum SimMode implements Parcelable {
    OUT_OF_COVERAGE,
    SEARCHING,
    FLIGHT_MODE,
    LIMITED_SERVICE,
    FULL_SERVICE;

    public static final Parcelable.Creator<SimMode> CREATOR = new Parcelable.Creator<SimMode>() { // from class: com.autolink.tbox.SimMode.1
        /* JADX WARN: Can't rename method to resolve collision */
        @Override // android.os.Parcelable.Creator
        public SimMode createFromParcel(Parcel in) {
            return SimMode.valueOf(in.readInt());
        }

        /* JADX WARN: Can't rename method to resolve collision */
        @Override // android.os.Parcelable.Creator
        public SimMode[] newArray(int size) {
            return new SimMode[size];
        }
    };

    @Override // android.os.Parcelable
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeInt(ordinal());
    }

    @Override // android.os.Parcelable
    public int describeContents() {
        return 0;
    }

    public static SimMode valueOf(int ordinal) {
        SimMode[] set = values();
        if (ordinal < 0 || ordinal >= set.length) {
            return null;
        }
        return set[ordinal];
    }
}