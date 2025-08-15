package br.com.redesurftank.havalshisuku.utils;

import android.os.ParcelFileDescriptor;
import android.os.RemoteException;
import android.util.Log;

import moe.shizuku.server.IRemoteProcess;
import moe.shizuku.server.IShizukuService;
import rikka.shizuku.Shizuku;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

public class IPTablesUtils {

    public static boolean unlockInputOutputAll() {
        return unlockOutput() && unlockInput();
    }

    private static boolean unlockOutput() {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        IRemoteProcess checkProc = null;
        IRemoteProcess insertProc = null;
        try {
            checkProc = shizukuService.newProcess(new String[]{"iptables", "-C", "OUTPUT", "-j", "ACCEPT"}, null, null);
            if (checkProc == null) {
                throw new Exception("Failed to create remote process for OUTPUT check command");
            }
            checkProc.waitFor();
            int checkExit = checkProc.exitValue();
            closeStreams(checkProc);
            if (checkExit == 0) {
                Log.w("IpTablesUtils", "[IpTablesUtils]: OUTPUT chain in iptables is already unlocked");
                return true;
            }

            insertProc = shizukuService.newProcess(new String[]{"iptables", "-I", "OUTPUT", "1", "-j", "ACCEPT"}, null, null);
            if (insertProc == null) {
                throw new Exception("Failed to create remote process for OUTPUT insert command");
            }
            insertProc.waitFor();
            int insertExit = insertProc.exitValue();
            if (insertExit == 0) {
                Log.w("IpTablesUtils", "[IpTablesUtils]: OUTPUT chain in iptables unlocked successfully");
                closeStreams(insertProc);
                return true;
            }

            ParcelFileDescriptor errorPfd = insertProc.getErrorStream();
            String err = "";
            if (errorPfd != null) {
                try (ParcelFileDescriptor.AutoCloseInputStream is = new ParcelFileDescriptor.AutoCloseInputStream(errorPfd);
                     BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line).append("\n");
                    }
                    err = sb.toString().trim();
                } catch (IOException e) {
                    Log.e("IpTablesUtils", "[IpTablesUtils]: Error reading OUTPUT error stream", e);
                }
            }
            closeStreams(insertProc);

            if (!err.isEmpty()) {
                Log.e("IpTablesUtils", "[IpTablesUtils]: Failed to unlock OUTPUT chain in iptables: " + err);
                return false;
            }

            Log.e("IpTablesUtils", "[IpTablesUtils]: Failed to unlock OUTPUT chain in iptables with unknown error");
            return false;
        } catch (Exception ex) {
            Log.e("IpTablesUtils", "[IpTablesUtils]: Exception occurred while unlocking OUTPUT chain in iptables", ex);
            return false;
        } finally {
            if (checkProc != null) {
                try {
                    checkProc.destroy();
                } catch (Exception ignored) {
                }
            }
            if (insertProc != null) {
                try {
                    insertProc.destroy();
                } catch (Exception ignored) {
                }
            }
        }
    }

    private static boolean unlockInput() {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        IRemoteProcess checkProc = null;
        IRemoteProcess insertProc = null;
        try {
            checkProc = shizukuService.newProcess(new String[]{"iptables", "-C", "INPUT", "-j", "ACCEPT"}, null, null);
            if (checkProc == null) {
                throw new Exception("Failed to create remote process for INPUT check command");
            }
            checkProc.waitFor();
            int checkExit = checkProc.exitValue();
            closeStreams(checkProc);
            if (checkExit == 0) {
                Log.w("IpTablesUtils", "[IpTablesUtils]: INPUT chain in iptables is already unlocked");
                return true;
            }

            insertProc = shizukuService.newProcess(new String[]{"iptables", "-I", "INPUT", "1", "-j", "ACCEPT"}, null, null);
            if (insertProc == null) {
                throw new Exception("Failed to create remote process for INPUT insert command");
            }
            insertProc.waitFor();
            int insertExit = insertProc.exitValue();
            if (insertExit == 0) {
                Log.w("IpTablesUtils", "[IpTablesUtils]: INPUT chain in iptables unlocked successfully");
                closeStreams(insertProc);
                return true;
            }

            ParcelFileDescriptor errorPfd = insertProc.getErrorStream();
            String err = "";
            if (errorPfd != null) {
                try (ParcelFileDescriptor.AutoCloseInputStream is = new ParcelFileDescriptor.AutoCloseInputStream(errorPfd);
                     BufferedReader br = new BufferedReader(new InputStreamReader(is))) {
                    StringBuilder sb = new StringBuilder();
                    String line;
                    while ((line = br.readLine()) != null) {
                        sb.append(line).append("\n");
                    }
                    err = sb.toString().trim();
                } catch (IOException e) {
                    Log.e("IpTablesUtils", "[IpTablesUtils]: Error reading INPUT error stream", e);
                }
            }
            closeStreams(insertProc);

            if (!err.isEmpty()) {
                Log.e("IpTablesUtils", "[IpTablesUtils]: Failed to unlock INPUT chain in iptables: " + err);
                return false;
            }

            Log.e("IpTablesUtils", "[IpTablesUtils]: Failed to unlock INPUT chain in iptables with unknown error");
            return false;
        } catch (Exception ex) {
            Log.e("IpTablesUtils", "[IpTablesUtils]: Exception occurred while unlocking INPUT chain in iptables", ex);
            return false;
        } finally {
            if (checkProc != null) {
                try {
                    checkProc.destroy();
                } catch (Exception ignored) {
                }
            }
            if (insertProc != null) {
                try {
                    insertProc.destroy();
                } catch (Exception ignored) {
                }
            }
        }
    }

    private static void closeStreams(IRemoteProcess proc) throws RemoteException {
        ParcelFileDescriptor pfd;
        pfd = proc.getInputStream();
        if (pfd != null) try {
            pfd.close();
        } catch (IOException ignored) {
        }
        pfd = proc.getOutputStream();
        if (pfd != null) try {
            pfd.close();
        } catch (IOException ignored) {
        }
        pfd = proc.getErrorStream();
        if (pfd != null) try {
            pfd.close();
        } catch (IOException ignored) {
        }
    }
}