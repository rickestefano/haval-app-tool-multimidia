package br.com.redesurftank.havalshisuku.Utils;

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
    public static void unlockOutputAll() {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        IRemoteProcess checkProc = null;
        IRemoteProcess insertProc = null;
        try {
            checkProc = shizukuService.newProcess(new String[]{"iptables", "-C", "OUTPUT", "-j", "ACCEPT"}, null, null);
            if (checkProc == null) {
                throw new Exception("Failed to create remote process for check command");
            }
            checkProc.waitFor();
            int checkExit = checkProc.exitValue();
            closeStreams(checkProc);
            if (checkExit == 0) {
                Log.w("IpTablesUtils", "[IpTablesUtils]: OUTPUT chain in iptables is already unlocked");
                return;
            }

            insertProc = shizukuService.newProcess(new String[]{"iptables", "-I", "OUTPUT", "1", "-j", "ACCEPT"}, null, null);
            if (insertProc == null) {
                throw new Exception("Failed to create remote process for insert command");
            }
            insertProc.waitFor();
            int insertExit = insertProc.exitValue();
            if (insertExit == 0) {
                Log.w("IpTablesUtils", "[IpTablesUtils]: OUTPUT chain in iptables unlocked successfully");
                closeStreams(insertProc);
                return;
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
                    Log.e("IpTablesUtils", "[IpTablesUtils]: Error reading error stream", e);
                }
            }
            closeStreams(insertProc);

            if (!err.isEmpty()) {
                Log.e("IpTablesUtils", "[IpTablesUtils]: Failed to unlock OUTPUT chain in iptables: " + err);
                throw new Exception("Failed to unlock OUTPUT chain in iptables: " + err);
            }

            Log.e("IpTablesUtils", "[IpTablesUtils]: Failed to unlock OUTPUT chain in iptables with unknown error");
            throw new Exception("Unknown error occurred while unlocking OUTPUT chain in iptables");
        } catch (Exception ex) {
            Log.e("IpTablesUtils", "[IpTablesUtils]: Exception occurred while unlocking OUTPUT chain in iptables", ex);
        } finally {
            if (checkProc != null) {
                try {
                    checkProc.destroy();
                } catch (RemoteException ignored) {}
            }
            if (insertProc != null) {
                try {
                    insertProc.destroy();
                } catch (RemoteException ignored) {}
            }
        }
    }

    private static void closeStreams(IRemoteProcess proc) throws RemoteException {
        ParcelFileDescriptor pfd;
        pfd = proc.getInputStream();
        if (pfd != null) try { pfd.close(); } catch (IOException ignored) {}
        pfd = proc.getOutputStream();
        if (pfd != null) try { pfd.close(); } catch (IOException ignored) {}
        pfd = proc.getErrorStream();
        if (pfd != null) try { pfd.close(); } catch (IOException ignored) {}
    }
}