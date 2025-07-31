package br.com.redesurftank.havalshisuku.Utils;

import android.os.ParcelFileDescriptor;
import android.os.RemoteException;
import android.util.Log;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.concurrent.CountDownLatch;

import moe.shizuku.server.IRemoteProcess;
import moe.shizuku.server.IShizukuService;
import rikka.shizuku.Shizuku;

public class ShizukuUtils {

    private static final String TAG = "ShizukuUtils";

    public static String runCommandAndGetOutput(String[] command) {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        IRemoteProcess process = null;
        try {
            process = shizukuService.newProcess(command, null, null);
            if (process == null) {
                throw new Exception("Failed to create remote process for command: " + String.join(" ", command));
            }

            ParcelFileDescriptor pfd = process.getInputStream();
            StringBuilder output = new StringBuilder();
            if (pfd != null) {
                FileInputStream fis = new FileInputStream(pfd.getFileDescriptor());
                BufferedReader reader = new BufferedReader(new InputStreamReader(fis));
                String line;
                while ((line = reader.readLine()) != null) {
                    output.append(line).append("\n");
                }
                reader.close();
            }

            // Optionally handle stderr similarly

            int exitCode = process.waitFor();
            if (exitCode != 0) {
                Log.e(TAG, "Command exited with code: " + exitCode);
            }

            return output.toString().trim();

        } catch (Exception e) {
            Log.e(TAG, "Error running command: " + command, e);
            return "";
        } finally {
            if (process != null) {
                try {
                    process.destroy();
                } catch (RemoteException e) {
                    // ignore
                }
            }
        }
    }

    public static String runCommandAndWaitForString(String[] command, String... targetStrings) {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        IRemoteProcess process = null;
        try {
            process = shizukuService.newProcess(command, null, null);
            if (process == null) {
                throw new Exception("Failed to create remote process for command: " + String.join(" ", command));
            }

            IRemoteProcess finalProcess = process;
            final StringBuilder output = new StringBuilder();
            final CountDownLatch latch = new CountDownLatch(1);
            final Object lock = new Object();
            final boolean[] found = {false};

            // Thread for monitoring output
            new Thread(() -> {
                ParcelFileDescriptor pfd = null;
                BufferedReader reader = null;
                try {
                    pfd = finalProcess.getInputStream();
                    if (pfd != null) {
                        FileInputStream fis = new FileInputStream(pfd.getFileDescriptor());
                        reader = new BufferedReader(new InputStreamReader(fis));
                        String line;
                        boolean continueAppending = true;
                        while ((line = reader.readLine()) != null) {
                            synchronized (lock) {
                                if (continueAppending) {
                                    output.append(line).append("\n");
                                    for (String target : targetStrings) {
                                        if (line.contains(target)) {
                                            found[0] = true;
                                            latch.countDown();
                                            continueAppending = false;
                                            break;
                                        }
                                    }
                                }
                            }
                            // Continue reading to drain the stream even after found
                        }
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error monitoring output for command: " + command, e);
                } finally {
                    if (reader != null) {
                        try {
                            reader.close();
                        } catch (Exception ignored) {}
                    }
                    // If reached end without finding, unblock and return whatever
                    synchronized (lock) {
                        if (!found[0]) {
                            latch.countDown();
                        }
                    }
                }
            }).start();

            // Thread for waiting process to finish and cleanup
            new Thread(() -> {
                try {
                    int exitCode = finalProcess.waitFor();
                    Log.d(TAG, "Process finished with code: " + exitCode);
                } catch (Exception e) {
                    Log.e(TAG, "Error waiting for process: " + command, e);
                } finally {
                    try {
                        finalProcess.destroy();
                    } catch (RemoteException ignored) {}
                }
            }).start();

            // Block until found or end
            latch.await();

            synchronized (lock) {
                if (found[0]) {
                    return output.toString().trim();
                } else {
                    Log.e(TAG, "String not found for command: " + command);
                    return "";
                }
            }

        } catch (Exception e) {
            Log.e(TAG, "Error starting command: " + command, e);
            if (process != null) {
                try {
                    process.destroy();
                } catch (Exception ignored) {}
            }
            return "";
        }
    }

}
