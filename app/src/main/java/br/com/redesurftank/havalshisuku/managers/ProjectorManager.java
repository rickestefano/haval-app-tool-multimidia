package br.com.redesurftank.havalshisuku.managers;

import android.hardware.display.DisplayManager;
import android.util.Log;

import br.com.redesurftank.App;
import br.com.redesurftank.havalshisuku.projectors.InstrumentProjector2;
import br.com.redesurftank.havalshisuku.projectors.InstrumentProjector;

public class ProjectorManager {
    private static final String TAG = "ProjectorManager";

    private static ProjectorManager instance;

    private DisplayManager displayManager;
    private InstrumentProjector instrumentProjector;

    public static synchronized ProjectorManager getInstance() {
        if (instance == null) {
            instance = new ProjectorManager();
        }
        return instance;
    }

    private ProjectorManager() {
    }

    public void initialize() {
        Log.w(TAG, "Initializing ProjectorManager");
        try {
            displayManager = App.getContext().getSystemService(DisplayManager.class);

            //1 Instrument
            //2 Not Know
            //3 Instrument

            var displayForInstrument = displayManager.getDisplays()[1];
            instrumentProjector = new InstrumentProjector(App.getContext(), displayForInstrument);
            instrumentProjector.show();
            Log.w(TAG, "InstrumentProjector initialized and displayed successfully");

            /*var displayForHud = displayManager.getDisplays()[3];
            var instrumentProjector2 = new InstrumentProjector2(App.getContext(), displayForHud);
            instrumentProjector2.show();*/

            Log.w(TAG, "HudProjector initialized and displayed successfully");

        } catch (Exception e) {
            Log.e(TAG, "Failed to initialize ProjectorManager", e);
        }
    }

}
