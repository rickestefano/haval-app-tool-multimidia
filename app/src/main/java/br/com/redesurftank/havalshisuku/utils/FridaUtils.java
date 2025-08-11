package br.com.redesurftank.havalshisuku.utils;

import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.R;
import br.com.redesurftank.havalshisuku.models.CommandListener;
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
        SYSTEM_SERVER("system_server", R.raw.system_server, InjectMode.MANUAL),
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
            this.baseName = process.substring(process.lastIndexOf('.') + 1).replace(":", "_");
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

        public String getBaseName() {
            return baseName;
        }
    }

    public static boolean ensureFridaServerRunning() {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        try {
            if (!extractFridaFiles())
                return false;
            shizukuService.newProcess(new String[]{"setenforce", "0"}, null, null).waitFor();
            shizukuService.newProcess(new String[]{"chmod", "755", FRIDA_SERVER_PATH}, null, null).waitFor();
            shizukuService.newProcess(new String[]{"chmod", "755", FRIDA_INJECTOR_PATH}, null, null).waitFor();
            String isRunning = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", "fridaserver"}).trim();
            if (!isRunning.isEmpty()) {
                Log.w(TAG, "Frida server is already running with pid: " + isRunning);
                return true;
            }
            String shellCmd = "setsid " + FRIDA_SERVER_PATH + " >/dev/null 2>&1 < /dev/null &";
            shizukuService.newProcess(new String[]{"/bin/sh", "-c", shellCmd}, null, null).waitFor();
            Thread.sleep(1000);
            String after = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", "fridaserver"}).trim();
            if (!after.isEmpty()) {
                return true;
            } else {
                Log.e(TAG, "Failed to start Frida server");
                return false;
            }
        } catch (Exception e) {
            Log.e(TAG, "Error ensuring Frida server is running", e);
            return false;
        }
    }

    public static boolean injectAllScripts() {
        if (!extractFridaScripts())
            return false;
        for (ScriptProcess sp : ScriptProcess.values()) {
            switch (sp.getInjectMode()) {
                case NECESSARY:
                    if (!injectScript(sp.getScriptPath(), sp.getProcess(), sp.getBaseName(), true))
                        return false;
                    break;
                case OPTIONAL:
                    injectScript(sp.getScriptPath(), sp.getProcess(), sp.getBaseName(), false);
                    break;
                case MANUAL:
                    // Do nothing
                    break;
            }
        }
        return true;
    }

    public static boolean injectScript(ScriptProcess scriptProcess, boolean synchronous) {
        return injectScript(scriptProcess.getScriptPath(), scriptProcess.getProcess(), scriptProcess.getBaseName(), synchronous);
    }

    public static void injectSystemServer() {
        injectScript(ScriptProcess.SYSTEM_SERVER.getScriptPath(), ScriptProcess.SYSTEM_SERVER.getProcess(), ScriptProcess.SYSTEM_SERVER.getBaseName(), false);
    }

    private static boolean injectScript(String scriptPath, String targetProcess, String baseName, boolean synchronous) {
        Log.w(TAG, "Handling Frida script injection for: " + scriptPath + " into process: " + targetProcess);
        String pid = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", targetProcess}).trim();
        if (pid.isEmpty()) {
            Log.e(TAG, "Target process not found: " + targetProcess);
            if (synchronous) {
                return false;
            } else {
                startPoller(scriptPath, targetProcess, baseName);
                return true;
            }
        }
        Log.w(TAG, "Target process PID: " + pid);
        String logFile = SCRIPT_DIR + baseName + ".log";
        String injectorCmd = FRIDA_INJECTOR_PATH + " -p " + pid + " -s " + scriptPath;
        String injectorPattern = "[f]ridainjector -p " + pid + " -s " + scriptPath;
        String grepOutput = ShizukuUtils.runCommandAndGetOutput(new String[]{"sh", "-c", "ps -A -f | grep '" + injectorPattern + "'"});
        boolean isInjected = !grepOutput.trim().isEmpty();
        if (!isInjected) {
            Log.w(TAG, "InjectorPattern: " + injectorPattern);
            Log.w(TAG, "Injecting Frida script into " + targetProcess + " with command: " + injectorCmd);
            String shellCmd = "setsid " + injectorCmd + " > " + logFile + " 2>&1 < /dev/null &";
            ShizukuUtils.runCommandAndGetOutput(new String[]{"/bin/sh", "-c", shellCmd});
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Log.e(TAG, "Interrupted during sleep", e);
                if (synchronous) return false;
            }
            grepOutput = ShizukuUtils.runCommandAndGetOutput(new String[]{"sh", "-c", "ps -A -f | grep '" + injectorPattern + "'"});
            isInjected = !grepOutput.trim().isEmpty();
            if (!isInjected) {
                Log.e(TAG, "Failed to start Frida injection into " + targetProcess);
                if (synchronous) return false;
            }
        } else {
            Log.w(TAG, "Frida script already injected into " + targetProcess);
        }
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
                Log.w(TAG, "[Target: " + targetProcess + "] Tail finished with exit code: " + exitCode);
            }
        };
        ShizukuUtils.runCommandOnBackground(new String[]{"tail", "-f", logFile}, listener);
        Log.w(TAG, "Started tail for " + logFile);
        return true;
    }

    private static void startPoller(String scriptPath, String targetProcess, String baseName) {
        new Thread(() -> {
            while (true) {
                String pid = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", targetProcess}).trim();
                if (!pid.isEmpty()) {
                    injectScript(scriptPath, targetProcess, baseName, false);
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

    private static boolean extractFridaScripts() {
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

    private static boolean extractFridaFiles() {
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