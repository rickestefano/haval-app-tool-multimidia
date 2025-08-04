package br.com.redesurftank.havalshisuku.services;

import android.app.AlarmManager;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.content.pm.PackageManager;
import android.os.Handler;
import android.os.HandlerThread;
import android.os.IBinder;
import android.os.SystemClock;
import android.util.Log;
import android.widget.Toast;

import androidx.core.app.NotificationCompat;
import androidx.core.content.ContextCompat;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.broadcastReceivers.DispatchAllDatasReceiver;
import br.com.redesurftank.havalshisuku.broadcastReceivers.RestartReceiver;
import br.com.redesurftank.havalshisuku.models.CommandListener;
import br.com.redesurftank.havalshisuku.utils.IPTablesUtils;
import br.com.redesurftank.havalshisuku.utils.ShizukuUtils;
import br.com.redesurftank.havalshisuku.utils.TelnetClientWrapper;
import br.com.redesurftank.havalshisuku.utils.TermuxUtils;
import rikka.shizuku.Shizuku;

public class ForegroundService extends Service implements Shizuku.OnBinderDeadListener {

    private static final String TAG = "ForegroundService";
    private static final String CHANNEL_ID = "ForegroundServiceChannel";
    private static final int NOTIFICATION_ID = 1;

    private HandlerThread handlerThread;
    private Handler backgroundHandler;
    private Boolean isShizukuInitialized = false;
    private Boolean isServiceRunning = false;

    @Override
    public void onCreate() {
        super.onCreate();
        createNotificationChannel();
        handlerThread = new HandlerThread("BackgroundThread");
        handlerThread.start();
        backgroundHandler = new Handler(handlerThread.getLooper());
    }

    @Override
    public synchronized int onStartCommand(Intent intent, int flags, int startId) {
        if (isServiceRunning) {
            Log.w(TAG, "Service is already running, skipping start.");
            return START_STICKY; // Retorna imediatamente se o serviço já estiver rodando
        }
        isServiceRunning = true; // Marca o serviço como rodando
        Log.w(TAG, "Service started");
        var context = getApplicationContext();
        // Criar notificação para o Foreground Service
        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID).setContentTitle("Aplicação em execução").setContentText("Seu app está rodando em segundo plano").setSmallIcon(android.R.drawable.ic_notification_overlay) // Ícone de notificação
                .build();

        startForeground(NOTIFICATION_ID, notification);

        try {
            var selfPackageInfo = context.getPackageManager().getApplicationInfo(context.getPackageName(), 0);
            if (selfPackageInfo.uid > 10999) {
                // Se o UID for maior que 10999, significa que o aplicativo não tem acesso direto a conectar via telnet. O que impossibilita o start automatizado do Shizuku.
                Log.w(TAG, "Application UID is greater than 10999, Shizuku cannot be started automatically.");
                //show a toast to inform the user
                Toast.makeText(context, "O aplicativo não foi instalado utilizando o exploit corretamente, por favor, reinstale o aplicativo utilizando o exploit correto para que o Shizuku possa ser iniciado automaticamente.", Toast.LENGTH_LONG).show();
                return START_NOT_STICKY;
            }
        } catch (Exception e) {
            Log.e(TAG, "Failed to get application info: " + e.getMessage(), e);
        }

        backgroundHandler.post(() -> {
            while (true) {
                try {
                    var telnetClient = new TelnetClientWrapper();
                    telnetClient.connect("127.0.0.1", 23);
                    String findCommand = "find /data/app -name libshizuku.so";
                    String filePath = telnetClient.executeCommand(findCommand);

                    if (filePath.isEmpty()) {
                        throw new RuntimeException("libshizuku.so not found");
                    }

                    Log.w(TAG, "libshizuku.so found at: " + filePath);

                    String executeCommand = filePath;
                    Log.w(TAG, "Executing command: " + executeCommand);
                    String result = telnetClient.executeCommand(executeCommand);
                    if (result.contains("killing old process")) {
                        Log.w(TAG, "Old process killed, statically waiting 5 seconds to avoid bind on an already dead Shizuku process");
                        // Espera o Shizuku reiniciar
                        Thread.sleep(5000);
                    }
                    Log.w(TAG, "Command executed successfully: " + result);

                    telnetClient.disconnect();
                    Shizuku.addBinderReceivedListenerSticky(this::shizukuBinderReceived);
                    break;
                } catch (Exception e) {
                    Log.e(TAG, "Error executing shell commands: " + e.getMessage(), e);
                    try {
                        Thread.sleep(1000); // Espera 1 segundo antes de tentar novamente
                    } catch (InterruptedException ex) {
                        throw new RuntimeException(ex);
                    }
                }
            }
        });

        return START_STICKY; // Garante que o serviço seja reiniciado se for morto
    }

    private synchronized void shizukuBinderReceived() {
        Shizuku.removeBinderReceivedListener(this::shizukuBinderReceived);
        Log.w(TAG, "Shizuku binder received");
        isShizukuInitialized = true;
        checkService();
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null; // Não é necessário para um serviço não vinculado
    }

    private void checkService() {
        if (!isShizukuInitialized) {
            Log.w(TAG, "Shizuku not initialized yet, retrying...");
            return;
        }

        if (Shizuku.checkSelfPermission() != PackageManager.PERMISSION_GRANTED) {
            Log.w(TAG, "Shizuku permission not granted, requesting permission...");
            Shizuku.addRequestPermissionResultListener((requestCode, grantResult) -> {
                if (requestCode == 0 && grantResult == PackageManager.PERMISSION_GRANTED) {
                    Log.w(TAG, "Shizuku permission granted");
                    checkService();
                } else {
                    Log.e(TAG, "Shizuku permission denied");
                }
            });
            Shizuku.requestPermission(0);
            return;
        }

        Log.w(TAG, "Shizuku initialized and permission granted, starting services...");

        //check if Termux is installed
        var isTermuxInstalled = !ShizukuUtils.runCommandAndGetOutput(new String[]{"pm", "list", "packages", "com.termux"}).trim().isEmpty();
        if (isTermuxInstalled) {
            var isSSHRunning = !TermuxUtils.runCommandAndGetOutput("pgrep sshd").trim().isEmpty();
            if (!isSSHRunning) {
                Log.w(TAG, "SSHD is not running, starting it now...");
                TermuxUtils.runCommandOnBackground("sshd", new CommandListener() {
                    @Override
                    public void onStdout(String line) {
                        Log.w(TAG, "SSHD Output: " + line);
                    }

                    @Override
                    public void onStderr(String line) {
                        Log.e(TAG, "SSHD Error: " + line);
                    }

                    @Override
                    public void onFinished(int exitCode) {
                        Log.w(TAG, "SSHD finished with exit code: " + exitCode);
                    }
                });
            } else {
                Log.w(TAG, "SSHD is already running");
            }
        }

        var isADBRunning = !ShizukuUtils.runCommandAndGetOutput(new String[]{"pgrep", "adbd"}).trim().isEmpty();
        if (!isADBRunning) {
            Log.w(TAG, "ADB is not running, starting it now...");
            ShizukuUtils.runCommandOnBackground(new String[]{"start", "adbd"}, new CommandListener() {
                @Override
                public void onStdout(String line) {
                    Log.w(TAG, "ADB Output: " + line);
                }

                @Override
                public void onStderr(String line) {
                    Log.e(TAG, "ADB Error: " + line);
                }

                @Override
                public void onFinished(int exitCode) {
                    Log.w(TAG, "ADB finished with exit code: " + exitCode);
                }
            });
        } else {
            Log.w(TAG, "ADB is already running");
        }
        IPTablesUtils.unlockOutputAll();
        boolean initSuccess = ServiceManager.getInstance().initializeServices(getApplicationContext());
        if (!initSuccess) {
            Log.e(TAG, "Service initialization failed, restarting...");
            restart();
            return;
        }

        IntentFilter intentFilter = new IntentFilter();
        intentFilter.addAction("com.beantechs.intelligentvehiclecontrol.INIT_COMPLETED");

        ContextCompat.registerReceiver(App.getContext(), new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (isServiceRunning) {
                    // service already running bug intelligentvehiclecontrol restarted
                    // restart self
                    Log.w(TAG, "Received com.beantechs.intelligentvehiclecontrol.INIT_COMPLETED after service started, restarting service...");
                    restart();
                    return;
                }
                checkService();
            }
        }, intentFilter, ContextCompat.RECEIVER_NOT_EXPORTED);

        DispatchAllDatasReceiver.registerToBroadcast(App.getContext());
    }

    private void createNotificationChannel() {
        NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Background Service Channel", NotificationManager.IMPORTANCE_LOW);
        NotificationManager manager = getSystemService(NotificationManager.class);
        manager.createNotificationChannel(channel);
    }

    @Override
    public void onDestroy() {
        if (handlerThread != null) {
            handlerThread.quitSafely();
        }
        isServiceRunning = false;
        Shizuku.removeBinderReceivedListener(this::shizukuBinderReceived);
        Shizuku.removeBinderDeadListener(this);
        Log.w(TAG, "Service is stopping");
        ServiceManager.CleanInstance();
        super.onDestroy();
        Log.w(TAG, "Service destroyed");
    }

    @Override
    public void onBinderDead() {
        Shizuku.removeBinderReceivedListener(this::shizukuBinderReceived);
        Shizuku.removeBinderDeadListener(this);
        isShizukuInitialized = false;
        isServiceRunning = false;
        Log.w(TAG, "Shizuku binder is dead, stopping service");
        restart();
    }

    private void restart() {
        Log.w(TAG, "Restarting service...");
        Intent broadcastIntent = new Intent(this, RestartReceiver.class);
        PendingIntent pendingIntent = PendingIntent.getBroadcast(this, 0, broadcastIntent, PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE);
        AlarmManager alarmManager = (AlarmManager) getSystemService(Context.ALARM_SERVICE);
        long triggerTime = SystemClock.elapsedRealtime() + 1000; // 1 segundo
        alarmManager.set(AlarmManager.ELAPSED_REALTIME_WAKEUP, triggerTime, pendingIntent);
        stopSelf();
    }
}