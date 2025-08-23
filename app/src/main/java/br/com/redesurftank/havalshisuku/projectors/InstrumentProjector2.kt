package br.com.redesurftank.havalshisuku.projectors

import android.annotation.SuppressLint
import android.app.Presentation
import android.content.Context
import android.graphics.Color
import android.graphics.Outline
import android.os.Bundle
import android.view.Display
import android.view.View
import android.view.ViewOutlineProvider
import android.view.WindowManager
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.FrameLayout
import androidx.core.graphics.drawable.toDrawable
import androidx.core.view.isVisible
import br.com.redesurftank.havalshisuku.R
import br.com.redesurftank.havalshisuku.managers.ServiceManager
import br.com.redesurftank.havalshisuku.models.CarConstants
import br.com.redesurftank.havalshisuku.models.ServiceManagerEventType
import br.com.redesurftank.havalshisuku.models.SteeringWheelAcControlType

class InstrumentProjector2(outerContext: Context, display: Display) : Presentation(outerContext, display) {
    private var webViewAc: WebView? = null
    private val webViewsLoaded = mutableMapOf<WebView, Boolean>()
    private val pendingJsQueues = mutableMapOf<WebView, MutableList<String>>()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        WebView.setWebContentsDebuggingEnabled(true)
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
                        evaluateJsIfReady(webViewAc, "control('fan', $value)")
                    }

                    CarConstants.CAR_HVAC_DRIVER_TEMPERATURE.value -> {
                        evaluateJsIfReady(webViewAc, "control('temp', $value)")
                    }

                    CarConstants.CAR_HVAC_POWER_MODE.value -> {
                        evaluateJsIfReady(webViewAc, "control('power', $value)")
                    }

                    CarConstants.CAR_HVAC_CYCLE_MODE.value -> {
                        evaluateJsIfReady(webViewAc, "control('recycle', $value)")
                    }

                    CarConstants.CAR_HVAC_AUTO_ENABLE.value -> {
                        evaluateJsIfReady(webViewAc, "control('auto', $value)")
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
                        webViewAc?.isVisible = false;
                        when (card) {
                            1 -> {
                                setupAcControlView(circularView)
                            }

                            else -> {

                            }
                        }
                    }

                    ServiceManagerEventType.STEERING_WHEEL_AC_CONTROL -> {
                        when (args[0] as SteeringWheelAcControlType) {
                            SteeringWheelAcControlType.FAN_SPEED -> {
                                evaluateJsIfReady(webViewAc, "focus('fan')")
                            }

                            SteeringWheelAcControlType.TEMPERATURE -> {
                                evaluateJsIfReady(webViewAc, "focus('temp')")
                            }

                            SteeringWheelAcControlType.POWER -> {
                                evaluateJsIfReady(webViewAc, "focus('power')")
                            }
                        }
                    }
                }
            }
        }

        ServiceManager.getInstance().addDataChangedListener { key: String?, value: String? ->
            circularView.post {
                if (key == CarConstants.CAR_BASIC_ENGINE_STATE.value) {
                    if (value == "-1" || value == "15") {
                        circularView.isVisible = false;
                    } else {
                        circularView.isVisible = true;
                    }
                }
            }
        }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupAcControlView(circularView: FrameLayout) {
        if (webViewAc == null) {
            webViewAc = WebView(context).apply {
                layoutParams = FrameLayout.LayoutParams(FrameLayout.LayoutParams.MATCH_PARENT, FrameLayout.LayoutParams.MATCH_PARENT)
                settings.javaScriptEnabled = true
                settings.domStorageEnabled = true
                settings.allowContentAccess = true
                webViewClient = object : WebViewClient() {
                    override fun onPageFinished(view: WebView?, url: String?) {
                        super.onPageFinished(view, url)
                        view?.let {
                            webViewsLoaded[it] = true
                            updateValuesWebViewAc()
                            val queue = pendingJsQueues[it] ?: return
                            queue.forEach { js -> it.evaluateJavascript(js, null) }
                            pendingJsQueues.remove(it)
                        }
                    }
                }
                loadDataWithBaseURL(null, readRawHtml(context), "text/html", "UTF-8", null)
            }
            circularView.addView(webViewAc)
        } else {
            webViewAc?.isVisible = true
            webViewAc?.let {
                if (webViewsLoaded[it] == true) {
                    updateValuesWebViewAc()
                }
            }
        }
    }

    private fun updateValuesWebViewAc() {
        val currentTemp = ServiceManager.getInstance().getData(CarConstants.CAR_HVAC_DRIVER_TEMPERATURE.value)
        val currentFanSpeed = ServiceManager.getInstance().getData(CarConstants.CAR_HVAC_FAN_SPEED.value)
        val currentAcState = ServiceManager.getInstance().getData(CarConstants.CAR_HVAC_POWER_MODE.value)
        val currentRecycleMode = ServiceManager.getInstance().getData(CarConstants.CAR_HVAC_CYCLE_MODE.value)
        val currentAutoMode = ServiceManager.getInstance().getData(CarConstants.CAR_HVAC_AUTO_ENABLE.value)

        evaluateJsIfReady(webViewAc, "control('temp', $currentTemp)")
        evaluateJsIfReady(webViewAc, "control('fan', $currentFanSpeed)")
        evaluateJsIfReady(webViewAc, "control('power', $currentAcState)")
        evaluateJsIfReady(webViewAc, "control('recycle', $currentRecycleMode)")
        evaluateJsIfReady(webViewAc, "control('auto', $currentAutoMode)")
        evaluateJsIfReady(webViewAc, "focus('fan')")
    }

    private fun evaluateJsIfReady(webView: WebView?, js: String) {
        if (webView == null) return
        val loaded = webViewsLoaded.getOrDefault(webView, false)
        if (loaded) {
            webView.evaluateJavascript(js, null)
        } else {
            pendingJsQueues.getOrPut(webView) { mutableListOf() }.add(js)
        }
    }

    fun readRawHtml(context: Context): String {
        return context.resources.openRawResource(R.raw.app).bufferedReader().use { it.readText() }
    }
}