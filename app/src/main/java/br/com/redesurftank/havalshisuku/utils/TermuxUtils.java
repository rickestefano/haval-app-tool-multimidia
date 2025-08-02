package br.com.redesurftank.havalshisuku.utils;

import android.os.ParcelFileDescriptor;
import android.util.Log;

import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.InputStreamReader;
import java.util.concurrent.CountDownLatch;

import br.com.redesurftank.havalshisuku.models.CommandListener;
import moe.shizuku.server.IRemoteProcess;
import moe.shizuku.server.IShizukuService;
import rikka.shizuku.Shizuku;

public class TermuxUtils {
    private static final String TAG = "TermuxUtils";

    public static String runCommandAndGetOutput(String command) {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        IRemoteProcess process = null;
        try {
            String prefix = "/data/data/com.termux/files/usr";
            String home = "/data/data/com.termux/files/home";
            String[] env = new String[]{
                    "PREFIX=" + prefix,
                    "HOME=" + home,
                    "LD_LIBRARY_PATH=/system/lib64:" + prefix + "/lib",
                    "PATH=" + prefix + "/bin:" + prefix + "/bin/applets",
                    "LANG=en_US.UTF-8"
            };
            process = shizukuService.newProcess(new String[]{"sh", "-c", command}, env, home);
            if (process == null) {
                throw new Exception("Failed to create remote process for command: " + command);
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
                } catch (Exception e) {
                    // ignore
                }
            }
        }
    }

    public static void runCommandOnBackground(String command, CommandListener listener) {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        IRemoteProcess process = null;
        try {
            String prefix = "/data/data/com.termux/files/usr";
            String home = "/data/data/com.termux/files/home";
            String[] env = new String[]{
                    "PREFIX=" + prefix,
                    "HOME=" + home,
                    "LD_LIBRARY_PATH=/system/lib64:" + prefix + "/lib",
                    "PATH=" + prefix + "/bin:" + prefix + "/bin/applets",
                    "LANG=en_US.UTF-8"
            };
            process = shizukuService.newProcess(new String[]{"sh", "-c", command}, env, home);
            if (process == null) {
                throw new Exception("Failed to create remote process for command: " + command);
            }

            IRemoteProcess finalProcess = process;

            // Thread for stdout
            new Thread(() -> {
                ParcelFileDescriptor pfd = null;
                BufferedReader reader = null;
                try {
                    pfd = finalProcess.getInputStream();
                    if (pfd != null) {
                        FileInputStream fis = new FileInputStream(pfd.getFileDescriptor());
                        reader = new BufferedReader(new InputStreamReader(fis));
                        String line;
                        while ((line = reader.readLine()) != null) {
                            if (listener != null) {
                                listener.onStdout(line);
                            }
                        }
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error reading stdout for command: " + command, e);
                } finally {
                    if (reader != null) {
                        try {
                            reader.close();
                        } catch (Exception ignored) {}
                    }
                }
            }).start();

            // Thread for stderr
            new Thread(() -> {
                ParcelFileDescriptor pfd = null;
                BufferedReader reader = null;
                try {
                    pfd = finalProcess.getErrorStream();
                    if (pfd != null) {
                        FileInputStream fis = new FileInputStream(pfd.getFileDescriptor());
                        reader = new BufferedReader(new InputStreamReader(fis));
                        String line;
                        while ((line = reader.readLine()) != null) {
                            if (listener != null) {
                                listener.onStderr(line);
                            }
                        }
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error reading stderr for command: " + command, e);
                } finally {
                    if (reader != null) {
                        try {
                            reader.close();
                        } catch (Exception ignored) {}
                    }
                }
            }).start();

            // Thread for waitFor and cleanup
            new Thread(() -> {
                try {
                    int exitCode = finalProcess.waitFor();
                    if (listener != null) {
                        listener.onFinished(exitCode);
                    }
                } catch (Exception e) {
                    Log.e(TAG, "Error waiting for command: " + command, e);
                } finally {
                    try {
                        finalProcess.destroy();
                    } catch (Exception ignored) {}
                }
            }).start();

        } catch (Exception e) {
            Log.e(TAG, "Error starting command: " + command, e);
            if (process != null) {
                try {
                    process.destroy();
                } catch (Exception ignored) {}
            }
        }
    }

    public static String runCommandAndWaitForString(String command, String... targetStrings) {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        IRemoteProcess process = null;
        try {
            String prefix = "/data/data/com.termux/files/usr";
            String home = "/data/data/com.termux/files/home";
            String[] env = new String[]{
                    "PREFIX=" + prefix,
                    "HOME=" + home,
                    "LD_LIBRARY_PATH=/system/lib64:" + prefix + "/lib",
                    "PATH=" + prefix + "/bin:" + prefix + "/bin/applets",
                    "LANG=en_US.UTF-8"
            };
            process = shizukuService.newProcess(new String[]{"sh", "-c", command}, env, home);
            if (process == null) {
                throw new Exception("Failed to create remote process for command: " + command);
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
                    } catch (Exception ignored) {}
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