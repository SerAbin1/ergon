/**
 * Focus Screen - M3 Expressive Dark Theme
 *
 * Main Pomodoro timer screen with circular progress and controls.
 * Includes timer duration adjustment and SafeAreaView for proper padding.
 */
import { CircularTimer } from '@/components/Timer/CircularTimer';
import { SessionHistory } from '@/components/Timer/SessionHistory';
import { TimerControls } from '@/components/Timer/TimerControls';
import { useFocusStore } from '@/src/stores/focusStore';
import { borderRadius, colors, spacing, typography } from '@/src/theme/tokens';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Pressable, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FocusScreen() {
    const {
        timerState,
        timeRemaining,
        currentSessionType,
        activePreset,
        sessions,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        skipToBreak,
        skipToWork,
        tick,
        setActivePreset,
    } = useFocusStore();

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const [showDurationPicker, setShowDurationPicker] = useState(false);

    // Duration options in minutes
    const durationOptions = [5, 10, 15, 20, 25, 30, 45, 60, 90];

    // Calculate total time for current session type
    const getTotalTime = (): number => {
        switch (currentSessionType) {
            case 'work':
                return activePreset.workDuration * 60;
            case 'break':
                return activePreset.breakDuration * 60;
            case 'longBreak':
                return activePreset.longBreakDuration * 60;
            default:
                return activePreset.workDuration * 60;
        }
    };

    // Timer tick effect
    useEffect(() => {
        if (timerState === 'running') {
            intervalRef.current = setInterval(() => {
                tick();
            }, 1000);
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [timerState, tick]);

    // Handle timer tap
    const handleTimerPress = () => {
        if (timerState === 'idle' || timerState === 'completed') {
            startTimer();
        } else if (timerState === 'running') {
            pauseTimer();
        } else if (timerState === 'paused') {
            resumeTimer();
        }
    };

    // Handle skip
    const handleSkip = () => {
        if (currentSessionType === 'work') {
            skipToBreak();
        } else {
            skipToWork();
        }
    };

    // Handle duration change
    const handleDurationChange = (minutes: number) => {
        setActivePreset({
            ...activePreset,
            workDuration: minutes,
        });
        setShowDurationPicker(false);
    };

    // Filter today's sessions
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todaysSessions = sessions.filter(
        (s) => s.startTime >= todayStart.getTime()
    );

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar barStyle="light-content" backgroundColor={colors.surface.dim} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
            >
                {/* Duration selector - only show when idle */}
                {timerState === 'idle' && (
                    <Pressable style={styles.durationSelector} onPress={() => setShowDurationPicker(true)}>
                        <Text style={styles.durationLabel}>Duration</Text>
                        <Text style={styles.durationValue}>{activePreset.workDuration} min ▼</Text>
                    </Pressable>
                )}

                {/* Timer */}
                <View style={styles.timerSection}>
                    <CircularTimer
                        timeRemaining={timeRemaining}
                        totalTime={getTotalTime()}
                        isRunning={timerState === 'running'}
                        sessionType={currentSessionType}
                        onPress={handleTimerPress}
                    />
                </View>

                {/* Controls */}
                <TimerControls
                    timerState={timerState}
                    onStart={startTimer}
                    onPause={pauseTimer}
                    onResume={resumeTimer}
                    onReset={resetTimer}
                    onSkip={handleSkip}
                />

                {/* Session history */}
                <SessionHistory sessions={todaysSessions} />
            </ScrollView>

            {/* Duration Picker Modal */}
            <Modal
                visible={showDurationPicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDurationPicker(false)}
            >
                <Pressable style={styles.modalOverlay} onPress={() => setShowDurationPicker(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Select Duration</Text>
                        <View style={styles.durationGrid}>
                            {durationOptions.map((mins) => (
                                <Pressable
                                    key={mins}
                                    style={[
                                        styles.durationOption,
                                        activePreset.workDuration === mins && styles.durationOptionActive,
                                    ]}
                                    onPress={() => handleDurationChange(mins)}
                                >
                                    <Text style={[
                                        styles.durationOptionText,
                                        activePreset.workDuration === mins && styles.durationOptionTextActive,
                                    ]}>
                                        {mins}m
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                </Pressable>
            </Modal>
        </SafeAreaView>
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
    },
    durationSelector: {
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: colors.surface.container,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: borderRadius.full,
        marginBottom: spacing.md,
    },
    durationLabel: {
        fontSize: typography.fontSize.labelSmall,
        color: colors.text.tertiary,
    },
    durationValue: {
        fontSize: typography.fontSize.titleMedium,
        fontWeight: typography.fontWeight.semibold,
        color: colors.primary.main,
    },
    timerSection: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xl,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: colors.surface.container,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        width: '80%',
        maxWidth: 320,
    },
    modalTitle: {
        fontSize: typography.fontSize.titleLarge,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
        textAlign: 'center',
        marginBottom: spacing.lg,
    },
    durationGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    durationOption: {
        backgroundColor: colors.surface.containerHigh,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        borderRadius: borderRadius.lg,
        minWidth: 70,
        alignItems: 'center',
    },
    durationOptionActive: {
        backgroundColor: colors.primary.main,
    },
    durationOptionText: {
        fontSize: typography.fontSize.titleMedium,
        fontWeight: typography.fontWeight.medium,
        color: colors.text.secondary,
    },
    durationOptionTextActive: {
        color: colors.primary.onPrimary,
    },
});
