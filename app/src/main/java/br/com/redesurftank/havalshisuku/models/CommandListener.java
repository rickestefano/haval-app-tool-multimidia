package br.com.redesurftank.havalshisuku.models;

public interface CommandListener {
    void onStdout(String line);

    void onStderr(String line);

    void onFinished(int exitCode);
}
