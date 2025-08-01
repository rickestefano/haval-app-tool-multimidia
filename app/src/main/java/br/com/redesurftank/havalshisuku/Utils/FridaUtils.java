package br.com.redesurftank.havalshisuku.Utils;

import android.util.Log;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.R;
import moe.shizuku.server.IShizukuService;
import rikka.shizuku.Shizuku;

public class FridaUtils {
    private static final String TAG = "FridaUtils";
    public static final String FRIDA_SERVER_PATH = "/data/local/tmp/fridaserver";
    public static final String FRIDA_INJECTOR_PATH = "/data/local/tmp/fridainjector";
    private static final String SCRIPT_DIR = "/data/local/tmp/";

    public enum ScriptProcess {
        INTELLIGENT_VEHICLE_CONTROL("com.beantechs.intelligentvehiclecontrol", R.raw.com_beantechs_intelligentvehiclecontrol, true),
        ;// Add more processes as needed

        private final String process;
        private final int resourceId;
        private final String baseName;
        private final String fileName;
        private final String scriptPath;
        private final Boolean injectOnStart;

        ScriptProcess(String process, int resourceId, Boolean injectOnStart) {
            this.process = process;
            this.resourceId = resourceId;
            this.baseName = process.substring(process.lastIndexOf('.') + 1);
            this.fileName = baseName + ".js";
            this.scriptPath = SCRIPT_DIR + fileName;
            this.injectOnStart = injectOnStart;
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

        public Boolean isInjectOnStart() {
            return injectOnStart;
        }
    }

    public static boolean ensureFridaServerRunning() {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        try {
            extractFridaFiles();
            shizukuService.newProcess(new String[]{"chmod", "755", FRIDA_SERVER_PATH}, null, null).waitFor();
            shizukuService.newProcess(new String[]{"chmod", "755", FRIDA_INJECTOR_PATH}, null, null).waitFor();
            var isRunning = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", "fridaserver"}).trim();
            if (isRunning.isEmpty()) {
                Log.w(TAG, "Frida server is not running, starting it now...");
                shizukuService.newProcess(new String[]{FRIDA_SERVER_PATH}, null, null);
            } else {
                Log.w(TAG, "Frida server is already running with PID: " + isRunning);
            }
        } catch (Exception e) {
            Log.e(TAG, "Error ensuring Frida server is running", e);
            return false;
        }

        return true;
    }

    public static boolean injectScript(String scriptPath, String targetProcess) {
        String pid = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", targetProcess}).trim();
        if (pid.isEmpty()) {
            Log.e(TAG, "Target process not found: " + targetProcess);
            return false;
        }
        String result = ShizukuUtils.runCommandAndWaitForString(new String[]{FRIDA_INJECTOR_PATH, "-p", pid, "-s", scriptPath}, "Script injected");
        Log.w(TAG, "Frida script injection result: " + result);
        return true;
    }

    public static boolean injectAllScripts() {
        if (!extractFridaScripts())
            return false;
        for (ScriptProcess sp : ScriptProcess.values()) {
            if (!sp.isInjectOnStart())
                continue;
            if (!injectScript(sp.getScriptPath(), sp.getProcess()))
                return false;
        }

        return true;
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

    public static void extractFridaFiles() {
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
        } catch (IOException e) {
            Log.e(TAG, "Error extracting Frida files", e);
        }
    }
}