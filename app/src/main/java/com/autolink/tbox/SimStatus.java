package com.autolink.tbox;

import android.os.Parcel;
import android.os.Parcelable;

public class SimStatus implements Parcelable {
    public static final Parcelable.Creator<SimStatus> CREATOR = new Parcelable.Creator<SimStatus>() {
        @Override
        public SimStatus createFromParcel(Parcel in) {
            SimStatus status = new SimStatus();
            status.readFromParcel(in);
            return status;
        }

        @Override
        public SimStatus[] newArray(int size) {
            return new SimStatus[size];
        }
    };
    private SimMode mode;
    private SimState state;

    @Override
    public int describeContents() {
        return 0;
    }

    @Override
    public void writeToParcel(Parcel parcel, int i3) {
        parcel.writeParcelable(this.state, i3);
        parcel.writeParcelable(this.mode, i3);
    }

    public void readFromParcel(Parcel in) {
        this.state = (SimState) in.readParcelable(SimState.class.getClassLoader());
        this.mode = (SimMode) in.readParcelable(SimMode.class.getClassLoader());
    }

    public SimState getSimState() {
        return this.state;
    }

    public void setSimState(SimState state) {
        this.state = state;
    }

    public SimMode getSimMode() {
        return this.mode;
    }

    public void setSimMode(SimMode mode) {
        this.mode = mode;
    }

    public String toString() {
        return "SimStatus{state=" + ((Object) this.state) + ", mode=" + ((Object) this.mode) + '}';
    }
}