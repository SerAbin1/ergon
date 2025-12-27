/**
 * CircularTimer - M3 Expressive Dark Theme
 *
 * Animated circular progress timer with SVG ring.
 * Uses teal primary color and monospace font for timer display.
 */
import { colors, spacing, typography } from '@/src/theme/tokens';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Svg, { Circle } from 'react-native-svg';

interface CircularTimerProps {
    timeRemaining: number;  // Current time in seconds
    totalTime: number;      // Total duration in seconds
    size?: number;          // Diameter of the timer
    strokeWidth?: number;   // Thickness of the progress ring
    isRunning?: boolean;    // Animation state
    sessionType: 'work' | 'break' | 'longBreak';
    onPress?: () => void;
}

export function CircularTimer({
    timeRemaining,
    totalTime,
    size = 300,
    strokeWidth = 8,
    isRunning = false,
    sessionType,
    onPress,
}: CircularTimerProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const progress = totalTime > 0 ? timeRemaining / totalTime : 1;
    const strokeDashoffset = circumference * (1 - progress);

    // M3 color mapping for session types
    const getAccentColor = () => {
        switch (sessionType) {
            case 'work':
                return colors.primary.main;
            case 'break':
                return colors.secondary.main;
            case 'longBreak':
                return colors.tertiary.main;
            default:
                return colors.primary.main;
        }
    };

    // Format time as MM:SS
    const formatTime = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Session label
    const getSessionLabel = (): string => {
        switch (sessionType) {
            case 'work':
                return 'FOCUS';
            case 'break':
                return 'SHORT BREAK';
            case 'longBreak':
                return 'LONG BREAK';
            default:
                return 'FOCUS';
        }
    };

    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Svg width={size} height={size} style={styles.svg}>
                {/* Background track */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={colors.surface.containerHigh}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                />
                {/* Progress arc */}
                <Circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke={getAccentColor()}
                    strokeWidth={strokeWidth}
                    fill="transparent"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
            </Svg>

            {/* Timer content */}
            <View style={styles.content}>
                <Animated.Text style={[styles.label, { color: getAccentColor() }]}>
                    {getSessionLabel()}
                </Animated.Text>
                <Animated.Text style={styles.time}>
                    {formatTime(timeRemaining)}
                </Animated.Text>
                <Animated.Text style={styles.hint}>
                    {isRunning ? 'tap to pause' : 'tap to start'}
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
    content: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    label: {
        fontSize: typography.fontSize.labelLarge,
        fontWeight: typography.fontWeight.semibold,
        letterSpacing: typography.letterSpacing.wider,
        marginBottom: spacing.sm,
    },
    time: {
        fontSize: typography.fontSize.displayLarge,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        fontFamily: typography.fontFamily.mono,
        letterSpacing: typography.letterSpacing.tight,
    },
    hint: {
        fontSize: typography.fontSize.bodySmall,
        color: colors.text.tertiary,
        marginTop: spacing.md,
        letterSpacing: typography.letterSpacing.wide,
    },
});
