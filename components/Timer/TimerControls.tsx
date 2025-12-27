import { Text } from '@/components/Themed';
import { borderRadius, colors, spacing } from '@/src/theme/tokens';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

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
    const renderMainButton = () => {
        switch (timerState) {
            case 'idle':
                return (
                    <Pressable
                        style={[styles.mainButton, styles.startButton]}
                        onPress={onStart}
                    >
                        <Text style={styles.mainButtonText}>Start Focus</Text>
                    </Pressable>
                );
            case 'running':
                return (
                    <Pressable
                        style={[styles.mainButton, styles.pauseButton]}
                        onPress={onPause}
                    >
                        <Text style={styles.mainButtonText}>Pause</Text>
                    </Pressable>
                );
            case 'paused':
                return (
                    <View style={styles.pausedButtons}>
                        <Pressable
                            style={[styles.mainButton, styles.startButton]}
                            onPress={onResume}
                        >
                            <Text style={styles.mainButtonText}>Resume</Text>
                        </Pressable>
                    </View>
                );
            case 'completed':
                return (
                    <Pressable
                        style={[styles.mainButton, styles.startButton]}
                        onPress={onStart}
                    >
                        <Text style={styles.mainButtonText}>Start Next</Text>
                    </Pressable>
                );
            default:
                return null;
        }
    };

    return (
        <View style={styles.container}>
            {renderMainButton()}
            <View style={styles.secondaryButtons}>
                {(timerState === 'paused' || timerState === 'running') && (
                    <Pressable style={styles.secondaryButton} onPress={onReset}>
                        <Text style={styles.secondaryButtonText}>Reset</Text>
                    </Pressable>
                )}
                {timerState !== 'idle' && (
                    <Pressable style={styles.secondaryButton} onPress={onSkip}>
                        <Text style={styles.secondaryButtonText}>Skip</Text>
                    </Pressable>
                )}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingVertical: spacing.lg,
    },
    mainButton: {
        paddingHorizontal: spacing.xxl,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.full,
        minWidth: 180,
        alignItems: 'center',
    },
    startButton: {
        backgroundColor: colors.primary[500],
    },
    pauseButton: {
        backgroundColor: colors.neutral[700],
    },
    mainButtonText: {
        color: colors.neutral[0],
        fontSize: 18,
        fontWeight: '600',
    },
    pausedButtons: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    secondaryButtons: {
        flexDirection: 'row',
        marginTop: spacing.md,
        gap: spacing.lg,
    },
    secondaryButton: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
    },
    secondaryButtonText: {
        color: colors.neutral[600],
        fontSize: 16,
    },
});
