package br.com.redesurftank.havalshisuku.utils;

import android.util.Log;

import org.apache.commons.net.telnet.TelnetClient;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;

public class TelnetClientWrapper {

    private static final String TAG = "TelnetClientWrapper";

    private TelnetClient telnetClient;
    private InputStream in;
    private OutputStream out;

    public void connect(String host, int port) throws IOException {
        telnetClient = new TelnetClient();
        telnetClient.setConnectTimeout(1000);
        telnetClient.connect(host, port);
        in = telnetClient.getInputStream();
        out = telnetClient.getOutputStream();
    }

    private String stripAnsi(String s) {
        return s.replaceAll("\\u001B\\[[;\\d]*[ -/]*[@-~]", "");
    }

    public String executeCommand(String command) throws IOException, InterruptedException {
        if (telnetClient == null) {
            throw new IllegalStateException("Connection not established");
        }
        out.write((command + "\r\n").getBytes());
        out.flush();

        byte[] bufferBytes = new byte[1024];
        StringBuilder buffer = new StringBuilder();
        StringBuilder clean = new StringBuilder();
        boolean promptFound = false;

        while (true) {
            if (in.available() > 0) {
                int bytesRead = in.read(bufferBytes);
                if (bytesRead == -1) break;
                String chunk = new String(bufferBytes, 0, bytesRead);
                Log.w(TAG, "Received: " + chunk);
                buffer.append(chunk);

                int nlIndex;
                while ((nlIndex = buffer.indexOf("\n")) != -1) {
                    String line = buffer.substring(0, nlIndex);
                    buffer.delete(0, nlIndex + 1);
                    if (line.endsWith("\r")) {
                        line = line.substring(0, line.length() - 1);
                    }
                    String trimmed = stripAnsi(line).trim();
                    if (trimmed.isEmpty()) continue;
                    if (trimmed.equals(command.trim())) continue;
                    if (trimmed.endsWith(command.trim())) continue;
                    if (trimmed.matches("^.*[#\\$]\\s*$")) {
                        promptFound = true;
                        continue;
                    }
                    clean.append(line).append("\n");
                }

                // Check remaining for prompt
                String remaining = buffer.toString();
                String trimmedRemaining = stripAnsi(remaining).trim();
                if (!trimmedRemaining.isEmpty() && trimmedRemaining.matches("^.*[#\\$]\\s*$")) {
                    promptFound = true;
                    buffer.setLength(0);
                }
            }
            if (promptFound) break;
        }
        return clean.toString().trim();
    }

    public void disconnect() throws IOException {
        if (telnetClient != null) {
            telnetClient.disconnect();
        }
    }
}