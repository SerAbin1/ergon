/**
 * Settings Screen - M3 Expressive Dark Theme
 *
 * App preferences with M3 list item styling.
 * Uses surface containers and segmented buttons.
 */
import { useFocusStore } from '@/src/stores/focusStore';
import { useSettingsStore } from '@/src/stores/settingsStore';
import { borderRadius, colors, spacing, typography } from '@/src/theme/tokens';
import { Pressable, ScrollView, StatusBar, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
    const {
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

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor={colors.surface.dim} />
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Text style={styles.title}>Settings</Text>

                {/* Timer Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>TIMER</Text>
                    <View style={styles.card}>
                        <SettingRow
                            label="Auto-start breaks"
                            description="Start break after focus session"
                            value={autoStartBreaks}
                            onToggle={toggleAutoStartBreaks}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            label="Auto-start focus"
                            description="Start focus after break"
                            value={autoStartWork}
                            onToggle={toggleAutoStartWork}
                        />
                    </View>
                </View>

                {/* Preset Info */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>CURRENT PRESET</Text>
                    <View style={styles.presetCard}>
                        <Text style={styles.presetName}>{activePreset.name}</Text>
                        <Text style={styles.presetDetails}>
                            {activePreset.workDuration}m focus · {activePreset.breakDuration}m break · {activePreset.longBreakDuration}m long break
                        </Text>
                    </View>
                </View>

                {/* Feedback Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>FEEDBACK</Text>
                    <View style={styles.card}>
                        <SettingRow
                            label="Haptic feedback"
                            value={hapticFeedback}
                            onToggle={toggleHapticFeedback}
                        />
                        <View style={styles.divider} />
                        <SettingRow
                            label="Sound effects"
                            value={soundEnabled}
                            onToggle={toggleSoundEnabled}
                        />
                    </View>
                </View>

                {/* Data Section */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>DATA</Text>
                    <Pressable style={styles.dangerButton} onPress={clearHistory}>
                        <Text style={styles.dangerButtonText}>Clear Session History</Text>
                    </Pressable>
                </View>

                {/* About */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>ABOUT</Text>
                    <View style={styles.card}>
                        <Text style={styles.aboutText}>Ergon v1.0.0</Text>
                        <Text style={styles.aboutSubtext}>Open-source digital wellbeing</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Setting row component
function SettingRow({
    label,
    description,
    value,
    onToggle,
}: {
    label: string;
    description?: string;
    value: boolean;
    onToggle: () => void;
}) {
    return (
        <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
                <Text style={styles.settingLabel}>{label}</Text>
                {description && <Text style={styles.settingDesc}>{description}</Text>}
            </View>
            <Switch
                value={value}
                onValueChange={onToggle}
                trackColor={{
                    false: colors.surface.containerHigh,
                    true: colors.primary.main,
                }}
                thumbColor={colors.text.primary}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.surface.dim,
    },
    container: {
        flex: 1,
    },
    content: {
        padding: spacing.lg,
        paddingBottom: spacing.xxxl,
    },
    title: {
        fontSize: typography.fontSize.headlineMedium,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.lg,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        fontSize: typography.fontSize.labelMedium,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.tertiary,
        letterSpacing: typography.letterSpacing.wider,
        marginBottom: spacing.sm,
        marginLeft: spacing.sm,
    },
    card: {
        backgroundColor: colors.surface.container,
        borderRadius: borderRadius.xl,
        padding: spacing.md,
    },
    divider: {
        height: 1,
        backgroundColor: colors.outline.variant,
        marginVertical: spacing.xs,
    },
    settingRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: spacing.sm,
    },
    settingInfo: {
        flex: 1,
        marginRight: spacing.md,
    },
    settingLabel: {
        fontSize: typography.fontSize.bodyLarge,
        color: colors.text.primary,
    },
    settingDesc: {
        fontSize: typography.fontSize.bodySmall,
        color: colors.text.tertiary,
        marginTop: 2,
    },
    presetCard: {
        backgroundColor: colors.primary.container,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
    },
    presetName: {
        fontSize: typography.fontSize.titleLarge,
        fontWeight: typography.fontWeight.semibold,
        color: colors.primary.onContainer,
    },
    presetDetails: {
        fontSize: typography.fontSize.bodySmall,
        color: colors.primary.onContainer,
        opacity: 0.8,
        marginTop: spacing.xs,
    },
    dangerButton: {
        backgroundColor: colors.error.container,
        borderRadius: borderRadius.xl,
        padding: spacing.md,
        alignItems: 'center',
    },
    dangerButtonText: {
        color: colors.error.onContainer,
        fontSize: typography.fontSize.labelLarge,
        fontWeight: typography.fontWeight.medium,
    },
    aboutText: {
        fontSize: typography.fontSize.bodyLarge,
        color: colors.text.primary,
        paddingHorizontal: spacing.sm,
        paddingTop: spacing.sm,
    },
    aboutSubtext: {
        fontSize: typography.fontSize.bodySmall,
        color: colors.text.tertiary,
        paddingHorizontal: spacing.sm,
        paddingBottom: spacing.sm,
    },
});
