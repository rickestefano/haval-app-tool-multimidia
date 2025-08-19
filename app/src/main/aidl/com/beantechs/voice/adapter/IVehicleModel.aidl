package com.beantechs.voice.adapter;

interface IVehicleModel {
    String getVehicleModel();
    int getDrivePosition();
    boolean isSupportAble(in String str);
    String getCarBrand();
    String getVehicleType();
}