package br.com.redesurftank.havalshisuku.utils;

import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.atomic.AtomicInteger;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.models.CommandListener;
import br.com.redesurftank.havalshisuku.R;
import moe.shizuku.server.IShizukuService;
import rikka.shizuku.Shizuku;

public class FridaUtils {
    private static final String TAG = "FridaUtils";
    public static final String FRIDA_SERVER_PATH = "/data/local/tmp/fridaserver";
    public static final String FRIDA_INJECTOR_PATH = "/data/local/tmp/fridainjector";
    private static final String SCRIPT_DIR = "/data/local/tmp/";

    public enum InjectMode {
        NECESSARY,
        OPTIONAL,
        MANUAL
    }

    public enum ScriptProcess {
        INTELLIGENT_VEHICLE_CONTROL("com.beantechs.accountservice:remote", R.raw.com_beantechs_accountservice, InjectMode.OPTIONAL),
        SYSTEM_SERVER("system_server", R.raw.system_server, InjectMode.OPTIONAL),
        TS_CAR_POWER_CONTROLLER("com.ts.car.power.controller.core", R.raw.com_ts_car_power_controller_core, InjectMode.OPTIONAL),
        ;// Add more processes as needed

        private final String process;
        private final int resourceId;
        private final String baseName;
        private final String fileName;
        private final String scriptPath;
        private final InjectMode injectMode;

        ScriptProcess(String process, int resourceId, InjectMode injectMode) {
            this.process = process;
            this.resourceId = resourceId;
            this.baseName = process.substring(process.lastIndexOf('.') + 1);
            this.fileName = baseName + ".js";
            this.scriptPath = SCRIPT_DIR + fileName;
            this.injectMode = injectMode;
        }

        public String getFileName() {
            return fileName;
        }

        public String getScriptPath() {
            return scriptPath;
        }

        public String getProcess() {
            return process;
        }

        public int getResourceId() {
            return resourceId;
        }

        public InjectMode getInjectMode() {
            return injectMode;
        }
    }

    public static boolean ensureFridaServerRunning() {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        try {
            if (!extractFridaFiles())
                return false;
            shizukuService.newProcess(new String[] {"setenforce", "0"}, null, null).waitFor();
            shizukuService.newProcess(new String[]{"chmod", "755", FRIDA_SERVER_PATH}, null, null).waitFor();
            shizukuService.newProcess(new String[]{"chmod", "755", FRIDA_INJECTOR_PATH}, null, null).waitFor();
            var isRunning = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", "fridaserver"}).trim();
            if (!isRunning.isEmpty()) {
                Log.w(TAG, "Frida server is running with pid: " + isRunning + ". Killing it to restart.");
                ShizukuUtils.runCommandAndGetOutput(new String[]{"pkill", "-f", "fridaserver"});
            }
            shizukuService.newProcess(new String[]{FRIDA_SERVER_PATH}, null, null);
        } catch (Exception e) {
            Log.e(TAG, "Error ensuring Frida server is running", e);
            return false;
        }

        return true;
    }

    public static boolean injectAllScripts() {
        if (!extractFridaScripts())
            return false;
        for (ScriptProcess sp : ScriptProcess.values()) {
            switch (sp.getInjectMode()) {
                case NECESSARY:
                    if (!injectScript(sp.getScriptPath(), sp.getProcess(), true))
                        return false;
                    break;
                case OPTIONAL:
                    injectScript(sp.getScriptPath(), sp.getProcess(), false);
                    break;
                case MANUAL:
                    // Do nothing
                    break;
            }
        }
        return true;
    }

    public static boolean injectScript(ScriptProcess scriptProcess, boolean synchronous) {
        return injectScript(scriptProcess.getScriptPath(), scriptProcess.getProcess(), synchronous);
    }

    private static boolean injectScript(String scriptPath, String targetProcess, boolean synchronous) {
        Log.w(TAG, "Injecting Frida script: " + scriptPath + " into process: " + targetProcess);
        String pid = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", targetProcess}).trim();
        if (pid.isEmpty()) {
            Log.e(TAG, "Target process not found: " + targetProcess);
            if (synchronous) {
                return false;
            } else {
                startPoller(scriptPath, targetProcess);
                return true;
            }
        }
        Log.w(TAG, "Injecting Frida script: " + scriptPath + " into PID: " + pid);

        CountDownLatch latch = synchronous ? new CountDownLatch(1) : null;
        AtomicInteger exitCodeAtomic = synchronous ? new AtomicInteger(-1) : null;

        CommandListener listener = new CommandListener() {
            @Override
            public void onStdout(String line) {
                Log.w(TAG, "[Target: " + targetProcess + "] Frida script output: " + line);
            }

            @Override
            public void onStderr(String line) {
                Log.e(TAG, "[Target: " + targetProcess + "] Frida script error: " + line);
            }

            @Override
            public void onFinished(int exitCode) {
                Log.w(TAG, "[Target: " + targetProcess + "] Frida script finished with exit code: " + exitCode);
                if (synchronous) {
                    exitCodeAtomic.set(exitCode);
                    latch.countDown();
                }
            }
        };
        ShizukuUtils.runCommandOnBackground(new String[]{FRIDA_INJECTOR_PATH, "-p", pid, "-s", scriptPath}, listener);

        if (synchronous) {
            try {
                latch.await();
                return exitCodeAtomic.get() == 0;
            } catch (InterruptedException e) {
                Log.e(TAG, "Interrupted while waiting for injection", e);
                return false;
            }
        }
        return true;
    }

    private static void startPoller(String scriptPath, String targetProcess) {
        new Thread(() -> {
            while (true) {
                String pid = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", targetProcess}).trim();
                if (!pid.isEmpty()) {
                    injectScript(scriptPath, targetProcess, false);
                    break;
                }
                try {
                    Thread.sleep(1000);
                } catch (InterruptedException e) {
                    // Ignore
                }
            }
        }).start();
    }

    public static boolean extractFridaScripts() {
        try {
            String destDir = App.getContext().getCacheDir().getAbsolutePath();

            for (ScriptProcess sp : ScriptProcess.values()) {
                InputStream in = App.getContext().getResources().openRawResource(sp.getResourceId());
                File outFile = new File(destDir, sp.getFileName());
                FileOutputStream out = new FileOutputStream(outFile);

                byte[] buffer = new byte[1024];
                int read;
                while ((read = in.read(buffer)) != -1) {
                    out.write(buffer, 0, read);
                }
                in.close();
                out.flush();
                out.close();
                ShizukuUtils.runCommandAndGetOutput(new String[]{"cp", outFile.getAbsolutePath(), sp.getScriptPath()});
                Log.w(TAG, "Extracted Frida script: " + sp.getFileName() + " to " + SCRIPT_DIR);
            }
        } catch (IOException e) {
            Log.e(TAG, "Error extracting Frida files", e);
            return false;
        }

        return true;
    }

    public static boolean extractFridaFiles() {
        try {
            String destDir = App.getContext().getCacheDir().getAbsolutePath();
            InputStream in = App.getContext().getResources().openRawResource(R.raw.fridaserver);
            File outFile = new File(destDir, "fridaserver");
            FileOutputStream out = new FileOutputStream(outFile);

            byte[] buffer = new byte[1024];
            int read;
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            in.close();
            out.flush();
            out.close();
            ShizukuUtils.runCommandAndGetOutput(new String[]{"cp", outFile.getAbsolutePath(), FRIDA_SERVER_PATH});

            in = App.getContext().getResources().openRawResource(R.raw.fridainject);
            outFile = new File(destDir, "fridainjector");
            out = new FileOutputStream(outFile);
            while ((read = in.read(buffer)) != -1) {
                out.write(buffer, 0, read);
            }
            in.close();
            out.flush();
            out.close();
            ShizukuUtils.runCommandAndGetOutput(new String[]{"cp", outFile.getAbsolutePath(), FRIDA_INJECTOR_PATH});
            return true;
        } catch (IOException e) {
            Log.e(TAG, "Error extracting Frida files", e);
        }

        return false;
    }
}