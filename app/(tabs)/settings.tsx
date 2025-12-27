import { Text, View } from '@/components/Themed';
import { useFocusStore } from '@/src/stores/focusStore';
import { ThemeMode, useSettingsStore } from '@/src/stores/settingsStore';
import { borderRadius, colors, spacing, typography } from '@/src/theme/tokens';
import { Pressable, ScrollView, StyleSheet, Switch } from 'react-native';

export default function SettingsScreen() {
    const {
        themeMode,
        setThemeMode,
        hapticFeedback,
        toggleHapticFeedback,
        soundEnabled,
        toggleSoundEnabled,
        autoStartBreaks,
        toggleAutoStartBreaks,
        autoStartWork,
        toggleAutoStartWork,
    } = useSettingsStore();

    const { activePreset, clearHistory } = useFocusStore();

    const themeModes: { value: ThemeMode; label: string }[] = [
        { value: 'system', label: 'System' },
        { value: 'light', label: 'Light' },
        { value: 'dark', label: 'Dark' },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Settings</Text>

            {/* Appearance Section */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Appearance</Text>
                <View style={styles.themeSelector}>
                    {themeModes.map((mode) => (
                        <Pressable
                            key={mode.value}
                            style={[
                                styles.themeOption,
                                themeMode === mode.value && styles.themeOptionActive,
                            ]}
                            onPress={() => setThemeMode(mode.value)}
                        >
                            <Text
                                style={[
                                    styles.themeOptionText,
                                    themeMode === mode.value && styles.themeOptionTextActive,
                                ]}
                            >
                                {mode.label}
                            </Text>
                        </Pressable>
                    ))}
                </View>
            </View>

            {/* Timer Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Timer</Text>
                <View style={styles.settingRow}>
                    <View>
                        <Text style={styles.settingLabel}>Auto-start breaks</Text>
                        <Text style={styles.settingDescription}>
                            Automatically start break after focus session
                        </Text>
                    </View>
                    <Switch
                        value={autoStartBreaks}
                        onValueChange={toggleAutoStartBreaks}
                        trackColor={{ true: colors.primary[500] }}
                    />
                </View>
                <View style={styles.settingRow}>
                    <View>
                        <Text style={styles.settingLabel}>Auto-start work</Text>
                        <Text style={styles.settingDescription}>
                            Automatically start focus after break
                        </Text>
                    </View>
                    <Switch
                        value={autoStartWork}
                        onValueChange={toggleAutoStartWork}
                        trackColor={{ true: colors.primary[500] }}
                    />
                </View>
            </View>

            {/* Current Preset Info */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Current Preset</Text>
                <View style={styles.presetInfo}>
                    <Text style={styles.presetName}>{activePreset.name}</Text>
                    <Text style={styles.presetDetails}>
                        {activePreset.workDuration}min work • {activePreset.breakDuration}min break
                    </Text>
                </View>
            </View>

            {/* Feedback */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Feedback</Text>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Haptic feedback</Text>
                    <Switch
                        value={hapticFeedback}
                        onValueChange={toggleHapticFeedback}
                        trackColor={{ true: colors.primary[500] }}
                    />
                </View>
                <View style={styles.settingRow}>
                    <Text style={styles.settingLabel}>Sound effects</Text>
                    <Switch
                        value={soundEnabled}
                        onValueChange={toggleSoundEnabled}
                        trackColor={{ true: colors.primary[500] }}
                    />
                </View>
            </View>

            {/* Data */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Data</Text>
                <Pressable style={styles.dangerButton} onPress={clearHistory}>
                    <Text style={styles.dangerButtonText}>Clear Session History</Text>
                </Pressable>
            </View>

            {/* About */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>About</Text>
                <Text style={styles.aboutText}>Ergon v1.0.0</Text>
                <Text style={styles.aboutSubtext}>An open-source digital wellbeing app</Text>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral[0],
    },
    content: {
        padding: spacing.lg,
    },
    title: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.lg,
        color: colors.neutral[900],
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.semibold,
        color: colors.neutral[500],
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: spacing.md,
    },
    themeSelector: {
        flexDirection: 'row',
        backgroundColor: colors.neutral[100],
        borderRadius: borderRadius.lg,
        padding: spacing.xs,
    },
    themeOption: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: borderRadius.md,
    },
    themeOptionActive: {
        backgroundColor: colors.neutral[0],
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    themeOptionText: {
        color: colors.neutral[600],
        fontWeight: typography.fontWeight.medium,
    },
    themeOptionTextActive: {
        color: colors.neutral[900],
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral[100],
    },
    settingLabel: {
        fontSize: typography.fontSize.md,
        color: colors.neutral[800],
    },
    settingDescription: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral[500],
        marginTop: 2,
    },
    presetInfo: {
        padding: spacing.md,
        backgroundColor: colors.neutral[50],
        borderRadius: borderRadius.lg,
    },
    presetName: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        color: colors.neutral[900],
    },
    presetDetails: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral[600],
        marginTop: spacing.xs,
    },
    dangerButton: {
        padding: spacing.md,
        backgroundColor: colors.error + '15',
        borderRadius: borderRadius.md,
        alignItems: 'center',
    },
    dangerButtonText: {
        color: colors.error,
        fontWeight: typography.fontWeight.medium,
    },
    aboutText: {
        fontSize: typography.fontSize.md,
        color: colors.neutral[800],
    },
    aboutSubtext: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral[500],
        marginTop: spacing.xs,
    },
});
