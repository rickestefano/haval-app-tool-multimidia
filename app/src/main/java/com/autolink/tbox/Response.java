// Response.java
package com.autolink.tbox;

import android.os.Parcel;
import android.os.Parcelable;

public enum Response implements Parcelable {
    ACTION_FAILED,
    ACTION_SUCCEED,
    ACTION_NOT_ALLOWED;

    public static final Parcelable.Creator<Response> CREATOR = new Parcelable.Creator<Response>() {
        @Override
        public Response createFromParcel(Parcel in) {
            return Response.valueOf(in.readInt());
        }

        @Override
        public Response[] newArray(int size) {
            return new Response[size];
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

    public static Response valueOf(int ordinal) {
        Response[] set = values();
        if (ordinal < 0 || ordinal >= set.length) {
            return null;
        }
        return set[ordinal];
    }
}