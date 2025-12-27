import { colors, spacing, typography } from '@/src/theme/tokens';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CircularTimerProps {
    timeRemaining: number; // in seconds
    totalTime: number; // in seconds
    size?: number;
    strokeWidth?: number;
    isRunning?: boolean;
    sessionType: 'work' | 'break' | 'longBreak';
    onPress?: () => void;
}

export function CircularTimer({
    timeRemaining,
    totalTime,
    size = 280,
    strokeWidth = 12,
    isRunning = false,
    sessionType,
    onPress,
}: CircularTimerProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = totalTime > 0 ? timeRemaining / totalTime : 1;

    const getColor = () => {
        switch (sessionType) {
            case 'work':
                return colors.primary[500];
            case 'break':
                return colors.accent[500];
            case 'longBreak':
                return colors.accent[700];
            default:
                return colors.primary[500];
        }
    };

    const strokeDashoffset = circumference * (1 - progress);

    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const getSessionLabel = (): string => {
        switch (sessionType) {
            case 'work':
                return 'Focus Time';
            case 'break':
                return 'Short Break';
            case 'longBreak':
                return 'Long Break';
            default:
                return 'Focus Time';
        }
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Svg width={size} height={size} style={styles.svg}>
                {/* Background circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={colors.neutral[200]}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress circle */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>
            <View style={styles.timeContainer}>
                <Animated.Text style={styles.sessionLabel}>
                    {getSessionLabel()}
                </Animated.Text>
                <Animated.Text style={styles.timeText}>
                    {formatTime(timeRemaining)}
                </Animated.Text>
                <Animated.Text style={styles.tapHint}>
                    {isRunning ? 'Tap to pause' : 'Tap to start'}
                </Animated.Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    svg: {
        position: 'absolute',
    },
    timeContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    sessionLabel: {
        fontSize: typography.fontSize.md,
        color: colors.neutral[600],
        marginBottom: spacing.sm,
        fontWeight: typography.fontWeight.medium,
    },
    timeText: {
        fontSize: typography.fontSize.display,
        fontWeight: typography.fontWeight.bold,
        color: colors.neutral[900],
        fontFamily: typography.fontFamily.mono,
    },
    tapHint: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral[400],
        marginTop: spacing.sm,
    },
});
