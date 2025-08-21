// TelephoneResponse.java
package com.autolink.tbox;

import android.os.Parcel;
import android.os.Parcelable;

public class TelephoneResponse implements Parcelable {
    public static final Parcelable.Creator<TelephoneResponse> CREATOR = new Parcelable.Creator<TelephoneResponse>() {
        @Override
        public TelephoneResponse createFromParcel(Parcel in) {
            TelephoneResponse response = new TelephoneResponse();
            response.readFromParcel(in);
            return response;
        }

        @Override
        public TelephoneResponse[] newArray(int size) {
            return new TelephoneResponse[size];
        }
    };
    private long callID;
    private Response response;

    public void readFromParcel(Parcel in) {
        this.response = in.readParcelable(Response.class.getClassLoader());
        this.callID = in.readLong();
    }

    @Override
    public void writeToParcel(Parcel dest, int flags) {
        dest.writeParcelable(this.response, flags);
        dest.writeLong(this.callID);
    }

    @Override
    public int describeContents() {
        return 0;
    }

    public Response getResponse() {
        return this.response;
    }

    public void setResponse(Response response) {
        this.response = response;
    }

    public long getCallID() {
        return this.callID;
    }

    public void setCallID(long callID) {
        this.callID = callID;
    }
}