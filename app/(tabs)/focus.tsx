/**
 * Focus Screen - M3 Expressive Dark Theme
 *
 * Main Pomodoro timer screen with circular progress and controls.
 * Core feature of the Ergon digital wellbeing app.
 */
import { CircularTimer } from '@/components/Timer/CircularTimer';
import { SessionHistory } from '@/components/Timer/SessionHistory';
import { TimerControls } from '@/components/Timer/TimerControls';
import { useFocusStore } from '@/src/stores/focusStore';
import { colors, spacing } from '@/src/theme/tokens';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StatusBar, StyleSheet, View } from 'react-native';

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
    } = useFocusStore();

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

    // Filter today's sessions
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todaysSessions = sessions.filter(
        (s) => s.startTime >= todayStart.getTime()
    );

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={colors.surface.dim} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.content}
            >
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
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.surface.dim,
    },
    content: {
        padding: spacing.lg,
        paddingTop: spacing.xxl,
    },
    timerSection: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
    },
});
