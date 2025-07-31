package br.com.redesurftank.havalshisuku.Models;

public interface CommandListener {
    void onStdout(String line);

    void onStderr(String line);

    void onFinished(int exitCode);
}
