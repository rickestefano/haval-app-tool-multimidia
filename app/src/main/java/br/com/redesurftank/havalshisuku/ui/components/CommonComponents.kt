package br.com.redesurftank.havalshisuku.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextOverflow
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

// Data class compartilhado para settings
data class SettingItem(
    val title: String,
    val description: String,
    val checked: Boolean,
    val onCheckedChange: (Boolean) -> Unit,
    val enabled: Boolean = true,
    val sliderValue: Int? = null,
    val sliderRange: IntRange? = null,
    val onSliderChange: ((Int) -> Unit)? = null,
    val sliderLabel: String? = null,
    val customContent: (@Composable () -> Unit)? = null
)

// Cores do tema
object AppColors {
    val Background = Color(0xFF0A0A0A)
    val CardBackground = Color(0xFF13151A)
    val BorderColor = Color(0xFF1D2430)
    val Primary = Color(0xFF4A9EFF)
    val TextPrimary = Color.White
    val TextSecondary = Color(0xFFB0B8C4)
    val TextDisabled = Color(0xFF808080)
    val SurfaceVariant = Color(0xFF2A2F37)
    val ButtonSecondary = Color(0xFF3A3F47)
    val MenuSelectedIcon = Color(0xFF4A9EFF)
    val MenuUnselectedIcon = Color(0xFF8A93A6)
    val MenuUnselectedText = Color(0xFFB0B8C4)
}

// Dimensões padrão
object AppDimensions {
    val CardPadding = 20.dp
    val CardSpacing = 8.dp
    val BorderWidth = 1.dp
    val CardCornerRadius = 12.dp
    val BorderCornerRadius = 8.dp
    val ButtonCornerRadius = 8.dp
    val IconSize = 26.dp
    val MenuWidth = 280.dp
    val MenuItemHeight = 90.dp
    val ContentPadding = 16.dp
}

// Componente de Card reutilizável
@Composable
fun SettingCard(
    title: String,
    description: String,
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    sliderValue: Int? = null,
    sliderRange: IntRange? = null,
    onSliderChange: ((Int) -> Unit)? = null,
    sliderLabel: String? = null,
    customContent: (@Composable () -> Unit)? = null
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .then(
                if (checked && sliderValue != null) Modifier else Modifier.heightIn(min = 110.dp)
            )
            .padding(vertical = AppDimensions.CardSpacing, horizontal = AppDimensions.CardSpacing)
            .border(
                width = AppDimensions.BorderWidth,
                color = AppColors.BorderColor,
                shape = RoundedCornerShape(AppDimensions.BorderCornerRadius)
            )
            .clickable(enabled = enabled && sliderValue == null) { onCheckedChange(!checked) },
        colors = CardDefaults.cardColors(
            containerColor = AppColors.CardBackground
        ),
        shape = RoundedCornerShape(AppDimensions.CardCornerRadius),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp)
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(AppDimensions.CardPadding)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.Top
            ) {
                Text(
                    text = title,
                    fontSize = 18.sp,
                    fontWeight = FontWeight.Medium,
                    color = if (enabled) AppColors.TextPrimary else AppColors.TextDisabled,
                    modifier = Modifier.weight(1f).padding(end = 12.dp),
                    maxLines = 2,
                    overflow = TextOverflow.Ellipsis
                )
                Switch(
                    checked = checked,
                    onCheckedChange = if (sliderValue == null) null else onCheckedChange,
                    enabled = enabled,
                    modifier = Modifier.scale(0.9f),
                    colors = SwitchDefaults.colors(
                        checkedThumbColor = AppColors.TextPrimary,
                        checkedTrackColor = AppColors.Primary,
                        uncheckedThumbColor = AppColors.TextSecondary,
                        uncheckedTrackColor = AppColors.ButtonSecondary,
                        uncheckedBorderColor = Color.Transparent,
                        checkedBorderColor = Color.Transparent
                    )
                )
            }
            Spacer(modifier = Modifier.height(10.dp))
            Text(
                text = description,
                fontSize = 12.sp,
                color = if (enabled) AppColors.TextSecondary else Color(0xFF606060),
                lineHeight = 14.sp,
                maxLines = 3,
                overflow = TextOverflow.Ellipsis
            )
            
            // Mostrar slider se a opção estiver ativada e tiver valores de slider
            if (checked && sliderValue != null && sliderRange != null && onSliderChange != null) {
                Spacer(modifier = Modifier.height(16.dp))
                Column {
                    if (sliderLabel != null) {
                        Text(
                            text = sliderLabel,
                            fontSize = 14.sp,
                            color = AppColors.TextPrimary,
                            modifier = Modifier.padding(bottom = 8.dp)
                        )
                    }
                    val steps = if (title.contains("volume", ignoreCase = true)) {
                        sliderRange.last - sliderRange.first - 1
                    } else {
                        ((sliderRange.last - sliderRange.first) / 5) - 1
                    }
                    val roundedValue = if (title.contains("volume", ignoreCase = true)) {
                        sliderValue.toFloat()
                    } else {
                        ((sliderValue / 5) * 5).toFloat()
                    }
                    Box(
                        modifier = Modifier
                            .fillMaxWidth()
                            .height(40.dp),
                        contentAlignment = Alignment.CenterStart
                    ) {
                        Slider(
                            value = roundedValue,
                            onValueChange = { newValue ->
                                val finalValue = if (title.contains("volume", ignoreCase = true)) {
                                    newValue.toInt()
                                } else {
                                    ((newValue / 5).toInt() * 5)
                                }
                                onSliderChange(finalValue)
                            },
                            valueRange = sliderRange.first.toFloat()..sliderRange.last.toFloat(),
                            steps = steps,
                            modifier = Modifier.fillMaxWidth(),
                            colors = SliderDefaults.colors(
                                thumbColor = AppColors.Primary,
                                activeTrackColor = AppColors.Primary,
                                inactiveTrackColor = Color(0xFF2C3139),
                                activeTickColor = Color.Transparent,
                                inactiveTickColor = Color.Transparent,
                                disabledThumbColor = AppColors.Primary,
                                disabledActiveTrackColor = AppColors.Primary,
                                disabledInactiveTrackColor = Color(0xFF2C3139)
                            )
                        )
                    }
                }
            }
            
            // Mostrar conteúdo customizado se estiver ativado
            if (checked && customContent != null) {
                Spacer(modifier = Modifier.height(16.dp))
                customContent()
            }
        }
    }
}

// Layout de duas colunas reutilizável
@Composable
fun TwoColumnSettingsLayout(
    settingsList: List<SettingItem>,
    modifier: Modifier = Modifier,
    bottomContent: @Composable (() -> Unit)? = null
) {
    // Organiza os items em duas colunas (ordem por coluna)
    val midPoint = (settingsList.size + 1) / 2
    val leftColumnItems = settingsList.take(midPoint)
    val rightColumnItems = settingsList.drop(midPoint)
    
    // Usa um scroll único com colunas que permitem alturas independentes
    Box(
        modifier = modifier
            .fillMaxSize()
    ) {
        val scrollState = rememberScrollState()
        
        if (bottomContent != null) {
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(scrollState)
            ) {
                Row(
                    horizontalArrangement = Arrangement.spacedBy(4.dp)
                ) {
                    // Coluna esquerda
                    Column(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth(),
                        verticalArrangement = Arrangement.Top
                    ) {
                        leftColumnItems.forEach { setting ->
                            SettingCard(
                                title = setting.title,
                                description = setting.description,
                                checked = setting.checked,
                                onCheckedChange = setting.onCheckedChange,
                                enabled = setting.enabled,
                                sliderValue = setting.sliderValue,
                                sliderRange = setting.sliderRange,
                                onSliderChange = setting.onSliderChange,
                                sliderLabel = setting.sliderLabel,
                                customContent = setting.customContent
                            )
                        }
                    }
                    
                    // Coluna direita
                    Column(
                        modifier = Modifier
                            .weight(1f)
                            .fillMaxWidth(),
                        verticalArrangement = Arrangement.Top
                    ) {
                        rightColumnItems.forEach { setting ->
                            SettingCard(
                                title = setting.title,
                                description = setting.description,
                                checked = setting.checked,
                                onCheckedChange = setting.onCheckedChange,
                                enabled = setting.enabled,
                                sliderValue = setting.sliderValue,
                                sliderRange = setting.sliderRange,
                                onSliderChange = setting.onSliderChange,
                                sliderLabel = setting.sliderLabel,
                                customContent = setting.customContent
                            )
                        }
                    }
                }
                
                bottomContent()
            }
        } else {
            Row(
                modifier = Modifier
                    .fillMaxSize()
                    .verticalScroll(scrollState),
                horizontalArrangement = Arrangement.spacedBy(4.dp)
            ) {
                // Coluna esquerda
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth(),
                    verticalArrangement = Arrangement.Top
                ) {
                    leftColumnItems.forEach { setting ->
                        SettingCard(
                            title = setting.title,
                            description = setting.description,
                            checked = setting.checked,
                            onCheckedChange = setting.onCheckedChange,
                            enabled = setting.enabled,
                            sliderValue = setting.sliderValue,
                            sliderRange = setting.sliderRange,
                            onSliderChange = setting.onSliderChange,
                            sliderLabel = setting.sliderLabel,
                            customContent = setting.customContent
                        )
                    }
                }
                
                // Coluna direita
                Column(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxWidth(),
                    verticalArrangement = Arrangement.Top
                ) {
                    rightColumnItems.forEach { setting ->
                        SettingCard(
                            title = setting.title,
                            description = setting.description,
                            checked = setting.checked,
                            onCheckedChange = setting.onCheckedChange,
                            enabled = setting.enabled,
                            sliderValue = setting.sliderValue,
                            sliderRange = setting.sliderRange,
                            onSliderChange = setting.onSliderChange,
                            sliderLabel = setting.sliderLabel,
                            customContent = setting.customContent
                        )
                    }
                }
            }
        }
    }
}

// Card estilizado padrão
@Composable
fun StyledCard(
    modifier: Modifier = Modifier,
    content: @Composable ColumnScope.() -> Unit
) {
    Card(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = AppDimensions.CardSpacing, horizontal = AppDimensions.CardSpacing)
            .border(
                width = AppDimensions.BorderWidth,
                color = AppColors.BorderColor,
                shape = RoundedCornerShape(AppDimensions.BorderCornerRadius)
            ),
        colors = CardDefaults.cardColors(
            containerColor = AppColors.CardBackground
        ),
        shape = RoundedCornerShape(AppDimensions.CardCornerRadius),
        elevation = CardDefaults.cardElevation(defaultElevation = 1.dp),
        content = content
    )
}

// Botão primário estilizado
@Composable
fun PrimaryButton(
    onClick: () -> Unit,
    text: String,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled,
        colors = ButtonDefaults.buttonColors(
            containerColor = AppColors.Primary
        ),
        shape = RoundedCornerShape(AppDimensions.ButtonCornerRadius)
    ) {
        Text(text, color = AppColors.TextPrimary)
    }
}

// Botão secundário estilizado
@Composable
fun SecondaryButton(
    onClick: () -> Unit,
    text: String,
    modifier: Modifier = Modifier,
    enabled: Boolean = true
) {
    Button(
        onClick = onClick,
        modifier = modifier,
        enabled = enabled,
        colors = ButtonDefaults.buttonColors(
            containerColor = AppColors.ButtonSecondary
        ),
        shape = RoundedCornerShape(AppDimensions.ButtonCornerRadius)
    ) {
        Text(text, color = AppColors.TextPrimary)
    }
}

// TextField estilizado
@Composable
fun StyledTextField(
    value: String,
    onValueChange: (String) -> Unit,
    label: @Composable (() -> Unit)? = null,
    modifier: Modifier = Modifier,
    enabled: Boolean = true,
    singleLine: Boolean = true
) {
    TextField(
        value = value,
        onValueChange = onValueChange,
        label = label,
        modifier = modifier,
        enabled = enabled,
        singleLine = singleLine,
        colors = TextFieldDefaults.colors(
            focusedContainerColor = AppColors.SurfaceVariant,
            unfocusedContainerColor = AppColors.SurfaceVariant,
            focusedTextColor = AppColors.TextPrimary,
            unfocusedTextColor = AppColors.TextSecondary,
            focusedIndicatorColor = AppColors.Primary,
            unfocusedIndicatorColor = AppColors.ButtonSecondary,
            focusedLabelColor = AppColors.Primary,
            unfocusedLabelColor = AppColors.TextSecondary
        )
    )
}
