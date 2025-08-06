package br.com.redesurftank.havalshisuku.projectors

import android.app.Presentation
import android.content.Context
import android.graphics.Color
import android.os.Bundle
import android.view.Display
import android.view.Gravity
import android.view.WindowManager
import android.widget.TextView
import androidx.core.graphics.drawable.toDrawable

class InstrumentProjector2(outerContext: Context, display: Display) : Presentation(outerContext, display) {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        this.window?.setBackgroundDrawable(Color.TRANSPARENT.toDrawable())
        this.window?.addFlags(WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED)

        val textView = TextView(context)
        textView.text = "Instrument Projector 2"
        textView.gravity = Gravity.CENTER
        textView.textSize = 24f
        textView.setTextColor(Color.WHITE)

        setContentView(textView)
    }
}