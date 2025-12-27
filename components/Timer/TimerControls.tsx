/**
 * TimerControls - M3 Expressive Dark Theme
 *
 * Control buttons for the focus timer.
 * Uses M3 filled/tonal button styles.
 */
import { borderRadius, colors, spacing, typography } from '@/src/theme/tokens';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

interface TimerControlsProps {
    timerState: 'idle' | 'running' | 'paused' | 'completed';
    onStart: () => void;
    onPause: () => void;
    onResume: () => void;
    onReset: () => void;
    onSkip: () => void;
}

export function TimerControls({
    timerState,
    onStart,
    onPause,
    onResume,
    onReset,
    onSkip,
}: TimerControlsProps) {
    // Main action button (M3 filled style)
    const renderMainButton = () => {
        switch (timerState) {
            case 'idle':
                return (
                    <Pressable style={[styles.mainButton, styles.filledButton]} onPress={onStart}>
                        <Text style={styles.filledButtonText}>Start Focus</Text>
                    </Pressable>
                );
            case 'running':
                return (
                    <Pressable style={[styles.mainButton, styles.tonalButton]} onPress={onPause}>
                        <Text style={styles.tonalButtonText}>Pause</Text>
                    </Pressable>
                );
            case 'paused':
                return (
                    <Pressable style={[styles.mainButton, styles.filledButton]} onPress={onResume}>
                        <Text style={styles.filledButtonText}>Resume</Text>
                    </Pressable>
                );
            case 'completed':
                return (
                    <Pressable style={[styles.mainButton, styles.filledButton]} onPress={onStart}>
                        <Text style={styles.filledButtonText}>Start Next</Text>
                    </Pressable>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {renderMainButton()}

            {/* Secondary actions (M3 text button style) */}
            <View style={styles.secondaryRow}>
                {(timerState === 'paused' || timerState === 'running') && (
                    <Pressable style={styles.textButton} onPress={onReset}>
                        <Text style={styles.textButtonLabel}>Reset</Text>
                    </Pressable>
                )}
                {timerState !== 'idle' && (
                    <Pressable style={styles.textButton} onPress={onSkip}>
                        <Text style={styles.textButtonLabel}>Skip</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: spacing.xl,
    },
    mainButton: {
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.full,
        minWidth: 200,
        alignItems: 'center',
    },
    // M3 Filled button
    filledButton: {
        backgroundColor: colors.primary.main,
    },
    filledButtonText: {
        color: colors.primary.onPrimary,
        fontSize: typography.fontSize.labelLarge,
        fontWeight: typography.fontWeight.semibold,
        letterSpacing: typography.letterSpacing.wide,
    },
    // M3 Tonal button
    tonalButton: {
        backgroundColor: colors.surface.containerHigh,
    },
    tonalButtonText: {
        color: colors.primary.main,
        fontSize: typography.fontSize.labelLarge,
        fontWeight: typography.fontWeight.semibold,
        letterSpacing: typography.letterSpacing.wide,
    },
    secondaryRow: {
        flexDirection: 'row',
        marginTop: spacing.md,
        gap: spacing.xl,
    },
    // M3 Text button
    textButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    textButtonLabel: {
        color: colors.primary.main,
        fontSize: typography.fontSize.labelLarge,
        fontWeight: typography.fontWeight.medium,
    },
});
