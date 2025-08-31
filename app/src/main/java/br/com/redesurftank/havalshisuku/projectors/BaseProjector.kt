package br.com.redesurftank.havalshisuku.projectors

import android.app.Presentation
import android.content.Context
import android.os.Handler
import android.os.Looper
import android.view.Display

abstract class BaseProjector(outerContext: Context, display: Display) : Presentation(outerContext, display) {
    protected val handler = Handler(Looper.getMainLooper())
    fun ensureUi(block: () -> Unit) {
        if (Looper.myLooper() == Looper.getMainLooper()) block() else handler.post(block)
    }
    abstract fun carMainScreenOff();
    abstract fun carMainScreenOn();
}