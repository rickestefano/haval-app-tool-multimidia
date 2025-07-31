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
        INTELLIGENT_VEHICLE_CONTROL("com.beantechs.intelligentvehiclecontrol", R.raw.intelligentvehiclecontrolnew);
        // Add more: OTHER("com.example.otherprocess", R.raw.otherprocess);

        private final String process;
        private final int resourceId;
        private final String baseName;
        private final String fileName;
        private final String scriptPath;

        ScriptProcess(String process, int resourceId) {
            this.process = process;
            this.resourceId = resourceId;
            this.baseName = process.substring(process.lastIndexOf('.') + 1);
            this.fileName = baseName + ".js";
            this.scriptPath = SCRIPT_DIR + fileName;
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
    }

    public static boolean ensureFridaServerRunning() {
        IShizukuService shizukuService = IShizukuService.Stub.asInterface(Shizuku.getBinder());
        try {
            extractFridaFiles();
            shizukuService.newProcess(new String[]{"pkill", "fridaserver"}, null, null).waitFor();
            shizukuService.newProcess(new String[]{"chmod", "755", FRIDA_SERVER_PATH}, null, null).waitFor();
            shizukuService.newProcess(new String[]{"chmod", "755", FRIDA_INJECTOR_PATH}, null, null).waitFor();
            shizukuService.newProcess(new String[]{FRIDA_SERVER_PATH}, null, null);
        } catch (Exception e) {
            Log.e(TAG, "Error ensuring Frida server is running", e);
        }

        return false;
    }

    public static boolean injectScript(String scriptPath, String targetProcess) {
        String pid = ShizukuUtils.runCommandAndGetOutput(new String[]{"pidof", targetProcess}).trim();
        String result = ShizukuUtils.runCommandAndWaitForString(new String[]{FRIDA_INJECTOR_PATH, "-p", pid, "-e", "-s", scriptPath}, "Script injected");
        Log.w(TAG, "Frida script injection result: " + result);
        return true;
    }

    public static void injectAllScripts() {
        extractFridaScripts();
        for (ScriptProcess sp : ScriptProcess.values()) {
            injectScript(sp.getScriptPath(), sp.getProcess());
        }
    }

    public static void extractFridaScripts() {
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
        }
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