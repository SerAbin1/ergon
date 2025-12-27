import { Text } from '@/components/Themed';
import { borderRadius, colors, spacing, typography } from '@/src/theme/tokens';
import type { FocusSession } from '@/src/types/focus';
import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

interface SessionHistoryProps {
    sessions: FocusSession[];
    maxItems?: number;
}

export function SessionHistory({ sessions, maxItems = 5 }: SessionHistoryProps) {
    const recentSessions = sessions.slice(-maxItems).reverse();

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        return `${mins} min`;
    };

    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (recentSessions.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No sessions yet today</Text>
                <Text style={styles.emptySubtext}>Complete a focus session to see it here</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Today's Sessions</Text>
            <FlatList
                data={recentSessions}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.sessionItem}>
                        <View style={styles.sessionInfo}>
                            <View style={[styles.indicator, item.completed && styles.completedIndicator]} />
                            <View>
                                <Text style={styles.sessionDuration}>{formatDuration(item.duration)}</Text>
                                <Text style={styles.sessionTime}>{formatTime(item.startTime)}</Text>
                            </View>
                        </View>
                        <Text style={styles.sessionType}>{item.type}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: spacing.md,
        backgroundColor: colors.neutral[50],
        borderRadius: borderRadius.lg,
        marginTop: spacing.lg,
    },
    title: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        marginBottom: spacing.md,
        color: colors.neutral[800],
    },
    sessionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.sm,
        borderBottomWidth: 1,
        borderBottomColor: colors.neutral[200],
    },
    sessionInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.neutral[400],
    },
    completedIndicator: {
        backgroundColor: colors.success,
    },
    sessionDuration: {
        fontSize: typography.fontSize.md,
        fontWeight: typography.fontWeight.medium,
        color: colors.neutral[900],
    },
    sessionTime: {
        fontSize: typography.fontSize.xs,
        color: colors.neutral[500],
    },
    sessionType: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral[600],
        textTransform: 'capitalize',
    },
    emptyContainer: {
        padding: spacing.xl,
        alignItems: 'center',
        backgroundColor: colors.neutral[50],
        borderRadius: borderRadius.lg,
        marginTop: spacing.lg,
    },
    emptyText: {
        fontSize: typography.fontSize.md,
        color: colors.neutral[600],
        fontWeight: typography.fontWeight.medium,
    },
    emptySubtext: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral[400],
        marginTop: spacing.xs,
    },
});
