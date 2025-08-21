// ITBoxService.aidl
package com.autolink.tbox.service;

import com.autolink.tbox.CallOperation;
import com.autolink.tbox.CallType;
import com.autolink.tbox.TelephoneResponse;

interface ITBoxService {
    TelephoneResponse requestStartCall(String str, in CallType callType, long j3) = 10;
    TelephoneResponse requestCallOperation(String str, in CallType callType, in CallOperation callOperation, long j3) = 11;
}