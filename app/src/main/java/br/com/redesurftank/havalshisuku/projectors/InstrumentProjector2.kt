package br.com.redesurftank.havalshisuku.projectors

import android.app.Presentation
import android.content.Context
import android.graphics.Canvas
import android.graphics.Color
import android.graphics.Outline
import android.graphics.Paint
import android.graphics.drawable.ShapeDrawable
import android.graphics.drawable.shapes.RectShape
import android.os.Bundle
import android.view.Display
import android.view.Gravity
import android.view.View
import android.view.ViewOutlineProvider
import android.view.WindowManager
import android.widget.FrameLayout
import android.widget.LinearLayout
import android.widget.TextView
import androidx.core.graphics.drawable.toDrawable
import androidx.core.view.isVisible
import br.com.redesurftank.havalshisuku.managers.ServiceManager
import br.com.redesurftank.havalshisuku.models.CarConstants
import br.com.redesurftank.havalshisuku.models.ServiceManagerEventType
import br.com.redesurftank.havalshisuku.models.SteeringWheelAcControlType

class InstrumentProjector2(outerContext: Context, display: Display) : Presentation(outerContext, display) {
    private var currentTemp: String? = null
    private var currentFanSpeed: String? = null
    private var tempText: TextView? = null
    private var fanText: TextView? = null
    private var tempContainer: View? = null
    private var fanContainer: View? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        window?.setBackgroundDrawable(Color.TRANSPARENT.toDrawable())
        window?.addFlags(WindowManager.LayoutParams.FLAG_HARDWARE_ACCELERATED)
        window?.addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION)

        val root = FrameLayout(context)
        setContentView(root)

        val radius = 226
        val centerX = 1630
        val centerY = 430

        val circularView = FrameLayout(context)
        val params = FrameLayout.LayoutParams(radius * 2, radius * 2)
        params.leftMargin = centerX - radius
        params.topMargin = centerY - radius
        circularView.layoutParams = params
        circularView.setBackgroundColor(Color.TRANSPARENT)
        circularView.clipToOutline = true
        circularView.outlineProvider = object : ViewOutlineProvider() {
            override fun getOutline(view: View, outline: Outline) {
                outline.setOval(0, 0, view.width, view.height)
            }
        }
        root.addView(circularView)
        circularView.isVisible = false

        ServiceManager.getInstance().addDataChangedListener { key, value ->
            circularView.post {
                when (key) {
                    CarConstants.CAR_HVAC_FAN_SPEED.value -> {
                        currentFanSpeed = value.toString()
                        fanText?.text = currentFanSpeed ?: "??"
                    }
                    CarConstants.CAR_HVAC_DRIVER_TEMPERATURE.value -> {
                        currentTemp = value.toString()
                        tempText?.text = "${currentTemp ?: "??"}°C"
                    }
                    else -> {}
                }
            }
        }

        ServiceManager.getInstance().addServiceManagerEventListener { event, args ->
            circularView.post {
                when (event) {
                    ServiceManagerEventType.CLUSTER_CARD_CHANGED -> {
                        val card = args[0] as Int
                        circularView.isVisible = card != 0
                        circularView.removeAllViews()
                        if (card == 1) {
                            setupAcControlView(circularView)
                        } else if (card == 2) {
                            // Future view
                        }
                    }
                    ServiceManagerEventType.STEERING_WHEEL_AC_CONTROL -> {
                        highlight(tempContainer, false)
                        highlight(fanContainer, false)
                        when (args[0] as SteeringWheelAcControlType) {
                            SteeringWheelAcControlType.FAN_SPEED -> {
                                highlight(fanContainer, true)
                            }
                            SteeringWheelAcControlType.TEMPERATURE -> {
                                highlight(tempContainer, true)
                            }
                        }
                    }
                }
            }
        }
    }

    private fun setupAcControlView(circularView: FrameLayout) {
        currentTemp = ServiceManager.getInstance().getData(CarConstants.CAR_HVAC_DRIVER_TEMPERATURE.value)
        currentFanSpeed = ServiceManager.getInstance().getData(CarConstants.CAR_HVAC_FAN_SPEED.value)
        val verticalLayout = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            setPadding(32, 32, 32, 32) // Added padding for better spacing
        }
        circularView.addView(verticalLayout, FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT))

        val title = TextView(context).apply {
            text = "Ar Condicionado"
            gravity = Gravity.CENTER
            textSize = 28f // Increased size
            setTypeface(typeface, android.graphics.Typeface.BOLD) // Bold for emphasis
            setTextColor(Color.WHITE)
            setPadding(0, 0, 0, 16) // Bottom padding
        }
        verticalLayout.addView(title, LinearLayout.LayoutParams(FrameLayout.LayoutParams.WRAP_CONTENT, FrameLayout.LayoutParams.WRAP_CONTENT).apply { gravity = Gravity.CENTER })

        val horizontalLayout = LinearLayout(context).apply {
            orientation = LinearLayout.HORIZONTAL
            gravity = Gravity.CENTER
            setPadding(16, 16, 16, 16) // Padding around
        }
        verticalLayout.addView(horizontalLayout, LinearLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.WRAP_CONTENT).apply { gravity = Gravity.CENTER })

        tempContainer = FrameLayout(context).apply {
            setBackground(createRoundedBackground(Color.argb(128, 0, 0, 0))) // Semi-transparent black rounded bg
            setPadding(16, 16, 16, 16)
        }
        val tempLabel = TextView(context).apply {
            text = "Temp"
            textSize = 18f
            setTextColor(Color.LTGRAY)
        }
        tempText = TextView(context).apply {
            text = "${currentTemp ?: "??"}°C"
            textSize = 24f // Larger
            setTextColor(Color.WHITE)
            setPadding(0, 8, 0, 0) // Top padding
        }
        val tempVertical = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            addView(tempLabel)
            addView(tempText)
        }
        (tempContainer as FrameLayout).addView(tempVertical)

        horizontalLayout.addView(tempContainer, LinearLayout.LayoutParams(0, FrameLayout.LayoutParams.WRAP_CONTENT, 1f).apply {
            gravity = Gravity.CENTER
            setMargins(16, 0, 8, 0) // Margins for separation
        })

        fanContainer = FrameLayout(context).apply {
            setBackground(createRoundedBackground(Color.argb(128, 0, 0, 0))) // Semi-transparent black rounded bg
            setPadding(16, 16, 16, 16)
        }
        val fanLabel = TextView(context).apply {
            text = "Fan"
            textSize = 18f
            setTextColor(Color.LTGRAY)
        }
        fanText = TextView(context).apply {
            text = currentFanSpeed ?: "??"
            textSize = 24f // Larger
            setTextColor(Color.WHITE)
            setPadding(0, 8, 0, 0) // Top padding
        }
        val fanVertical = LinearLayout(context).apply {
            orientation = LinearLayout.VERTICAL
            gravity = Gravity.CENTER
            addView(fanLabel)
            addView(fanText)
        }
        (fanContainer as FrameLayout).addView(fanVertical)

        horizontalLayout.addView(fanContainer, LinearLayout.LayoutParams(0, FrameLayout.LayoutParams.WRAP_CONTENT, 1f).apply {
            gravity = Gravity.CENTER
            setMargins(8, 0, 16, 0) // Margins for separation
        })
    }

    private fun highlight(view: View?, on: Boolean) {
        view?.background = if (on) createBorderDrawable() else createRoundedBackground(Color.argb(128, 0, 0, 0))
    }

    private fun createBorderDrawable(): ShapeDrawable {
        val drawable = ShapeDrawable(RectShape())
        drawable.paint.color = Color.WHITE
        drawable.paint.style = Paint.Style.STROKE
        drawable.paint.strokeWidth = 4f
        return drawable
    }

    private fun createRoundedBackground(color: Int): ShapeDrawable {
        val drawable = ShapeDrawable(android.graphics.drawable.shapes.RoundRectShape(floatArrayOf(16f, 16f, 16f, 16f, 16f, 16f, 16f, 16f), null, null))
        drawable.paint.color = color
        drawable.paint.style = Paint.Style.FILL
        return drawable
    }
}