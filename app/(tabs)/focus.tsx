import { View } from '@/components/Themed';
import { CircularTimer } from '@/components/Timer/CircularTimer';
import { SessionHistory } from '@/components/Timer/SessionHistory';
import { TimerControls } from '@/components/Timer/TimerControls';
import { useFocusStore } from '@/src/stores/focusStore';
import { colors, spacing } from '@/src/theme/tokens';
import React, { useEffect, useRef } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

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

    // Timer interval ref
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Get total time based on session type
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

    // Handle timer ticking
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

    const handleTimerPress = () => {
        if (timerState === 'idle' || timerState === 'completed') {
            startTimer();
        } else if (timerState === 'running') {
            pauseTimer();
        } else if (timerState === 'paused') {
            resumeTimer();
        }
    };

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
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <View style={styles.timerSection}>
                <CircularTimer
                    timeRemaining={timeRemaining}
                    totalTime={getTotalTime()}
                    isRunning={timerState === 'running'}
                    sessionType={currentSessionType}
                    onPress={handleTimerPress}
                />
            </View>

            <TimerControls
                timerState={timerState}
                onStart={startTimer}
                onPause={pauseTimer}
                onResume={resumeTimer}
                onReset={resetTimer}
                onSkip={handleSkip}
            />

            <SessionHistory sessions={todaysSessions} />
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
        paddingTop: spacing.xl,
    },
    timerSection: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.xxl,
    },
});
