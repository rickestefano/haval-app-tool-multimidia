-keep class com.autolink.** { *; }
-keepnames class com.autolink.**
-keepclassmembers class com.autolink.** { *; }
-keepclassmembers enum com.autolink.** {
    public static **[] values();
    public static ** valueOf(java.lang.String);
    public *;
}
-keepclassmembers class com.autolink.** implements android.os.Parcelable {
    public static final android.os.Parcelable$Creator CREATOR;
}