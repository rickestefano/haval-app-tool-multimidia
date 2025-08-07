package br.com.redesurftank.havalshisuku

import android.app.DatePickerDialog
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
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import br.com.redesurftank.havalshisuku.managers.ServiceManager
import br.com.redesurftank.havalshisuku.listeners.IDataChanged
import br.com.redesurftank.havalshisuku.ui.theme.HavalShisukuTheme
import androidx.core.content.edit
import br.com.redesurftank.havalshisuku.managers.AutoBrightnessManager
import br.com.redesurftank.havalshisuku.models.SharedPreferencesKeys
import kotlinx.coroutines.delay
import java.text.SimpleDateFormat
import java.util.Calendar
import java.util.Locale

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
    val tabs = listOf("Configurações Básicas", "Telas", "Valores Atuais", "Informações")
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
            1 -> TelasTab()
            2 -> CurrentValuesTab()
            3 -> InformacoesTab()
        }
    }
}

@Composable
fun BasicSettingsTab() {
    val context = LocalContext.current
    val prefs = context.getSharedPreferences("haval_prefs", Context.MODE_PRIVATE)
    var disableMonitoring by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.DISABLE_MONITORING.key, false)) }
    var disableAvas by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.DISABLE_AVAS.key, false)) }
    var disableAvmCarStopped by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.DISABLE_AVM_CAR_STOPPED.key, false)) }
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
    var enableFridaHooks by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.ENABLE_FRIDA_HOOKS.key, false)) }
    var showFridaDialog by remember { mutableStateOf(false) }
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
                checked = disableAvas,
                onCheckedChange = {
                    disableAvas = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.DISABLE_AVAS.key, it) }
                    ServiceManager.getInstance().setAvasEnabled(!it)
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.DISABLE_AVAS.description)
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = disableAvmCarStopped,
                onCheckedChange = {
                    disableAvmCarStopped = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.DISABLE_AVM_CAR_STOPPED.key, it) }
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.DISABLE_AVM_CAR_STOPPED.description)
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
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = enableFridaHooks,
                onCheckedChange = { newValue ->
                    if (!newValue) {
                        enableFridaHooks = false
                        prefs.edit { putBoolean(SharedPreferencesKeys.ENABLE_FRIDA_HOOKS.key, false) }
                    } else {
                        showFridaDialog = true
                    }
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.ENABLE_FRIDA_HOOKS.description)
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
    if (showFridaDialog) {
        AlertDialog(
            onDismissRequest = { showFridaDialog = false },
            title = { Text("Confirmação") },
            text = { Text("Ativar scripts fridas é uma função experimental que pode causar instabilidades, utilize por conta e risco. Caso não saiba o que é essa função é melhor manter desativada") },
            confirmButton = {
                TextButton(onClick = {
                    showFridaDialog = false
                    enableFridaHooks = true
                    prefs.edit { putBoolean(SharedPreferencesKeys.ENABLE_FRIDA_HOOKS.key, true) }
                    ServiceManager.getInstance().initializeFrida()
                }) {
                    Text("Ativar")
                }
            },
            dismissButton = {
                TextButton(onClick = { showFridaDialog = false }) {
                    Text("Cancelar")
                }
            }
        )
    }
}

@Composable
fun TelasTab() {
    val context = LocalContext.current
    val prefs = context.getSharedPreferences("haval_prefs", Context.MODE_PRIVATE)
    var enableProjector by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.ENABLE_INSTRUMENT_PROJECTOR.key, false)) }
    var enableWarning by remember { mutableStateOf(prefs.getBoolean(SharedPreferencesKeys.ENABLE_INSTRUMENT_REVISION_WARNING.key, false)) }
    var nextKmText by remember { mutableStateOf(prefs.getInt(SharedPreferencesKeys.INSTRUMENT_REVISION_KM.key, 12000).toString()) }
    var nextDateMillis by remember { mutableLongStateOf(prefs.getLong(SharedPreferencesKeys.INSTRUMENT_REVISION_NEXT_DATE.key, 0L)) }
    var showDatePicker by remember { mutableStateOf(false) }
    val dateFormatter = SimpleDateFormat("dd/MM/yyyy", Locale.getDefault())

    val formattedNextDate = if (nextDateMillis > 0) dateFormatter.format(nextDateMillis) else "Não definido"

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(rememberScrollState())
            .padding(16.dp),
        verticalArrangement = Arrangement.spacedBy(24.dp)
    ) {
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = enableProjector,
                onCheckedChange = {
                    enableProjector = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.ENABLE_INSTRUMENT_PROJECTOR.key, it) }
                    if (!it) {
                        enableWarning = false
                        prefs.edit { putBoolean(SharedPreferencesKeys.ENABLE_INSTRUMENT_REVISION_WARNING.key, false) }
                    }
                }
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.ENABLE_INSTRUMENT_PROJECTOR.description)
        }
        Row(verticalAlignment = Alignment.CenterVertically) {
            Checkbox(
                checked = enableWarning,
                onCheckedChange = {
                    enableWarning = it
                    prefs.edit { putBoolean(SharedPreferencesKeys.ENABLE_INSTRUMENT_REVISION_WARNING.key, it) }
                },
                enabled = enableProjector
            )
            Spacer(Modifier.width(8.dp))
            Text(SharedPreferencesKeys.ENABLE_INSTRUMENT_REVISION_WARNING.description)
        }
        if (enableWarning) {
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Próxima KM:")
                Row {
                    TextField(
                        value = nextKmText,
                        onValueChange = { newValue ->
                            if (newValue.isEmpty() || newValue.toIntOrNull() != null) {
                                nextKmText = newValue
                                newValue.toIntOrNull()?.let {
                                    prefs.edit { putInt(SharedPreferencesKeys.INSTRUMENT_REVISION_KM.key, it) }
                                }
                            }
                        },
                        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Number),
                        modifier = Modifier.weight(1f)
                    )
                    Spacer(Modifier.width(8.dp))
                    Button(onClick = {
                        val currentKm = ServiceManager.getInstance().totalOdometer
                        val newNextKm = currentKm + 12000
                        nextKmText = newNextKm.toString()
                        prefs.edit { putInt(SharedPreferencesKeys.INSTRUMENT_REVISION_KM.key, newNextKm) }
                    }) {
                        Text("Resetar")
                    }
                }
            }
            Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                Text("Próxima data: $formattedNextDate")
                Row {
                    Button(onClick = { showDatePicker = true }) {
                        Text("Informar manual")
                    }
                    Spacer(Modifier.width(8.dp))
                    Button(onClick = {
                        val cal = Calendar.getInstance()
                        cal.add(Calendar.YEAR, 1)
                        nextDateMillis = cal.timeInMillis
                        prefs.edit { putLong(SharedPreferencesKeys.INSTRUMENT_REVISION_NEXT_DATE.key, nextDateMillis) }
                    }) {
                        Text("Resetar")
                    }
                }
            }
        }
    }

    if (showDatePicker) {
        val calendar = Calendar.getInstance()
        if (nextDateMillis > 0) calendar.timeInMillis = nextDateMillis

        LaunchedEffect(Unit) {
            val dialog = DatePickerDialog(
                context,
                { _, year, month, day ->
                    val cal = Calendar.getInstance()
                    cal.set(year, month, day)
                    nextDateMillis = cal.timeInMillis
                    prefs.edit { putLong(SharedPreferencesKeys.INSTRUMENT_REVISION_NEXT_DATE.key, nextDateMillis) }
                },
                calendar.get(Calendar.YEAR),
                calendar.get(Calendar.MONTH),
                calendar.get(Calendar.DAY_OF_MONTH)
            )
            dialog.setOnDismissListener { showDatePicker = false }
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
    var formattedTime2 by remember { mutableStateOf("Não inicializado") }
    var formattedTime3 by remember { mutableStateOf("Não inicializado") }
    LaunchedEffect(Unit) {
        while (true) {
            isActive = ServiceManager.getInstance().isServicesInitialized
            val timeBoot = ServiceManager.getInstance().timeBootReceived
            formattedTime = if (isActive && timeBoot > 0) {
                val minutes = timeBoot / 60000
                val seconds = (timeBoot / 1000) % 60
                val millis = timeBoot % 1000
                String.format("%02d:%02d.%03d", minutes, seconds, millis)
            } else {
                "Não inicializado"
            }
            val timeStart = ServiceManager.getInstance().timeStartInitialization
            formattedTime2 = if (isActive && timeStart > 0) {
                val minutes = timeStart / 60000
                val seconds = (timeStart / 1000) % 60
                val millis = timeStart % 1000
                String.format("%02d:%02d.%03d", minutes, seconds, millis)
            } else {
                "Não inicializado"
            }
            val timeInit = ServiceManager.getInstance().timeInitialized
            formattedTime3 = if (isActive && timeInit > 0) {
                val minutes = timeInit / 60000
                val seconds = (timeInit / 1000) % 60
                val millis = timeInit % 1000
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
            Text("Tempo para receber BOOT_COMPLETED: $formattedTime")
            Text("Tempo para começar a inicializar: $formattedTime2")
            Text("Tempo para inicializar: $formattedTime3")
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