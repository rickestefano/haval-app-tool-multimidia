package br.com.redesurftank.havalshisuku

import android.app.TimePickerDialog
import android.content.Context
import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.activity.enableEdgeToEdge
import androidx.compose.foundation.*
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.lazy.*
import androidx.compose.foundation.lazy.items
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import br.com.redesurftank.havalshisuku.Services.ServiceManager
import br.com.redesurftank.havalshisuku.listeners.IDataChanged
import br.com.redesurftank.havalshisuku.ui.theme.HavalShisukuTheme
import androidx.core.content.edit
import br.com.redesurftank.havalshisuku.Managers.AutoBrightnessManager
import br.com.redesurftank.havalshisuku.Models.SharedPreferencesKeys
import kotlinx.coroutines.delay

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContent {
            HavalShisukuTheme {
                Scaffold(modifier = Modifier.fillMaxSize()) { innerPadding ->
                    MainScreen(modifier = Modifier.padding(innerPadding))
                }
            }
        }
    }
}

@Composable
fun MainScreen(modifier: Modifier = Modifier) {
    var selectedTab by remember { mutableStateOf(0) }
    val tabs = listOf("Configurações Básicas", "Valores Atuais", "Informações")
    Column(modifier = modifier) {
        TabRow(selectedTabIndex = selectedTab) {
            tabs.forEachIndexed { index, title ->
                Tab(selected = selectedTab == index, onClick = { selectedTab = index }) {
                    Text(title, modifier = Modifier.padding(16.dp))
                }
            }
        }
        when (selectedTab) {
            0 -> BasicSettingsTab()
            1 -> CurrentValuesTab()
            2 -> InformacoesTab()
        }
    }
}

@Composable
fun BasicSettingsTab() {
    val context = LocalContext.current
    val prefs = context.getSharedPreferences("haval_prefs", Context.MODE_PRIVATE)
    var disableMonitoring by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.DISABLE_MONITORING.key, false)) }
    var closeWindowOnPowerOff by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.key, false)) }
    var setStartupVolume by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.SET_STARTUP_VOLUME.key, false)) }
    var volume by remember { mutableIntStateOf(prefs.getInt(SharedPreferencesKeys.STARTUP_VOLUME.key, 1)) }
    var closeWindowsOnSpeed by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.CLOSE_WINDOWS_ON_SPEED.key, false)) }
    var speedThreshold by remember { mutableFloatStateOf(prefs.getFloat(SharedPreferencesKeys.SPEED_THRESHOLD.key, 5f)) }
    var enableAutoBrightness by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.ENABLE_AUTO_BRIGHTNESS.key, false)) }
    var nightStartHour by remember { mutableIntStateOf(prefs.getInt(SharedPreferencesKeys.NIGHT_START_HOUR.key, 20)) }
    var nightStartMinute by remember { mutableIntStateOf(prefs.getInt(SharedPreferencesKeys.NIGHT_START_MINUTE.key, 0)) }
    var nightEndHour by remember { mutableIntStateOf(prefs.getInt(SharedPreferencesKeys.NIGHT_END_HOUR.key, 6)) }
    var nightEndMinute by remember { mutableIntStateOf(prefs.getInt(SharedPreferencesKeys.NIGHT_END_MINUTE.key, 0)) }
    var showStartPicker by remember { mutableStateOf(false) }
    var showEndPicker by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = disableMonitoring,
                onCheckedChange = {
                    disableMonitoring = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.DISABLE_MONITORING.key, it) }
                    ServiceManager.getInstance().setMonitoringEnabled(!it)
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.DISABLE_MONITORING.description)
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = closeWindowOnPowerOff,
                onCheckedChange = {
                    closeWindowOnPowerOff = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.key, it) }
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.CLOSE_WINDOW_ON_POWER_OFF.description)
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = setStartupVolume,
                onCheckedChange = {
                    setStartupVolume = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.SET_STARTUP_VOLUME.key, it) }
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.SET_STARTUP_VOLUME.description)
        }
        if (setStartupVolume) {
            Column {
                Text("Volume: ${volume}")
                Slider(
                    value = volume.toFloat(),
                    onValueChange = {
                        volume = it.toInt()
                        prefs.edit { putInt(SharedPreferencesKeys.STARTUP_VOLUME.key, it.toInt()) }
                    },
                    valueRange = 1f..39f,
                    steps = 37
                )
            }
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = closeWindowsOnSpeed,
                onCheckedChange = {
                    closeWindowsOnSpeed = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.CLOSE_WINDOWS_ON_SPEED.key, it) }
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.CLOSE_WINDOWS_ON_SPEED.description)
        }
        if (closeWindowsOnSpeed) {
            Column {
                Text("Velocidade: ${speedThreshold.toInt()} km/h")
                Slider(
                    value = speedThreshold,
                    onValueChange = {
                        speedThreshold = it
                        prefs.edit { putFloat(SharedPreferencesKeys.SPEED_THRESHOLD.key, it) }
                    },
                    valueRange = 15f..120f,
                    steps = 21
                )
            }
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = enableAutoBrightness,
                onCheckedChange = {
                    enableAutoBrightness = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.ENABLE_AUTO_BRIGHTNESS.key, it) }
                    AutoBrightnessManager.getInstance().setEnabled(it)
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.ENABLE_AUTO_BRIGHTNESS.description)
        }
        if (enableAutoBrightness) {
            Column {
                Text("Período noturno: de ${String.format("%02d:%02d", nightStartHour, nightStartMinute)} até ${String.format("%02d:%02d", nightEndHour, nightEndMinute)}")
                Row {
                    Button(onClick = { showStartPicker = true }) { Text("Escolher início") }
                    Spacer(Modifier.width(8.dp))
                    Button(onClick = { showEndPicker = true }) { Text("Escolher fim") }
                }
            }
        }
    }
    if (showStartPicker) {
        LaunchedEffect(Unit) {
            val dialog = TimePickerDialog(
                context,
                { _, h, m ->
                    nightStartHour = h
                    nightStartMinute = m
                    prefs.edit {
                        putInt(SharedPreferencesKeys.NIGHT_START_HOUR.key, h)
                        putInt(SharedPreferencesKeys.NIGHT_START_MINUTE.key, m)
                    }
                    AutoBrightnessManager.getInstance().updateSchedule()
                },
                nightStartHour,
                nightStartMinute,
                true
            )
            dialog.setOnDismissListener { showStartPicker = false }
            dialog.show()
        }
    }
    if (showEndPicker) {
        LaunchedEffect(Unit) {
            val dialog = TimePickerDialog(
                context,
                { _, h, m ->
                    nightEndHour = h
                    nightEndMinute = m
                    prefs.edit {
                        putInt(SharedPreferencesKeys.NIGHT_END_HOUR.key, h)
                        putInt(SharedPreferencesKeys.NIGHT_END_MINUTE.key, m)
                    }
                    AutoBrightnessManager.getInstance().updateSchedule()
                },
                nightEndHour,
                nightEndMinute,
                true
            )
            dialog.setOnDismissListener { showEndPicker = false }
            dialog.show()
        }
    }
}

@Composable
fun CurrentValuesTab() {
    val dataMap = remember {
        mutableStateMapOf<String, String>().apply {
            putAll(ServiceManager.getInstance().getAllCurrentCachedData())
        }
    }
    DisposableEffect(Unit) {
        val listener = object : IDataChanged {
            override fun onDataChanged(key: String, value: String) {
                dataMap[key] = value
            }
        }
        ServiceManager.getInstance().addDataChangedListener(listener)
        onDispose {
            ServiceManager.getInstance().removeDataChangedListener(listener)
        }
    }
    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(8.dp)
    ) {
        items(dataMap.toList()) { (key, value) ->
            Text("$key: $value")
        }
    }
}

@Composable
fun InformacoesTab() {
    var isActive by remember { mutableStateOf(ServiceManager.getInstance().isServicesInitialized) }
    var formattedTime by remember { mutableStateOf("Não inicializado") }

    LaunchedEffect(Unit) {
        while (true) {
            isActive = ServiceManager.getInstance().isServicesInitialized
            val timeMillis = ServiceManager.getInstance().timeInitialized
            formattedTime = if (timeMillis > 0) {
                val minutes = timeMillis / 60000
                val seconds = (timeMillis / 1000) % 60
                val millis = timeMillis % 1000
                String.format("%02d:%02d.%03d", minutes, seconds, millis)
            } else {
                "Não inicializado"
            }
            delay(100)
        }
    }

    Column(
        modifier = Modifier
            .fillMaxSize()
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(16.dp)
    ) {
        Text("Estado: ${if (isActive) "Ativo" else "Inativo"}")
        if (isActive) {
            Text("Tempo de inicialização: $formattedTime")
        }
    }
}

@Preview(showBackground = true)
@Composable
fun MainScreenPreview() {
    HavalShisukuTheme {
        MainScreen()
    }
}