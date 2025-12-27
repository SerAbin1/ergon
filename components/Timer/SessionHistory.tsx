/**
 * SessionHistory - M3 Expressive Dark Theme
 *
 * Displays list of completed focus sessions.
 * Uses M3 list item styling with surface containers.
 */
import { borderRadius, colors, spacing, typography } from '@/src/theme/tokens';
import type { FocusSession } from '@/src/types/focus';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

interface SessionHistoryProps {
    sessions: FocusSession[];
    maxItems?: number;
}

export function SessionHistory({ sessions, maxItems = 5 }: SessionHistoryProps) {
    const recentSessions = sessions.slice(-maxItems).reverse();

    const formatDuration = (seconds: number): string => {
        const mins = Math.floor(seconds / 60);
        return `${mins}m`;
    };

    const formatTime = (timestamp: number): string => {
        const date = new Date(timestamp);
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    if (recentSessions.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyIcon}>🎯</Text>
                <Text style={styles.emptyText}>No sessions yet</Text>
                <Text style={styles.emptySubtext}>Complete a focus session to track progress</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>TODAY'S SESSIONS</Text>
            <FlatList
                data={recentSessions}
                keyExtractor={(item) => item.id}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.sessionItem}>
                        <View style={styles.sessionLeft}>
                            <View style={[
                                styles.indicator,
                                item.completed && styles.indicatorComplete
                            ]} />
                            <View>
                                <Text style={styles.sessionDuration}>{formatDuration(item.duration)}</Text>
                                <Text style={styles.sessionTime}>{formatTime(item.startTime)}</Text>
                            </View>
                        </View>
                        <View style={styles.sessionBadge}>
                            <Text style={styles.sessionBadgeText}>{item.type}</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.surface.container,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        marginTop: spacing.xl,
    },
    sectionTitle: {
        fontSize: typography.fontSize.labelMedium,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.tertiary,
        letterSpacing: typography.letterSpacing.wider,
        marginBottom: spacing.md,
    },
    sessionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: colors.outline.variant,
    },
    sessionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    indicator: {
        width: 10,
        height: 10,
        borderRadius: borderRadius.full,
        backgroundColor: colors.outline.default,
    },
    indicatorComplete: {
        backgroundColor: colors.primary.main,
    },
    sessionDuration: {
        fontSize: typography.fontSize.titleMedium,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.primary,
    },
    sessionTime: {
        fontSize: typography.fontSize.bodySmall,
        color: colors.text.tertiary,
        marginTop: 2,
    },
    sessionBadge: {
        backgroundColor: colors.surface.containerHigh,
        paddingHorizontal: spacing.sm,
        paddingVertical: spacing.xs,
        borderRadius: borderRadius.sm,
    },
    sessionBadgeText: {
        fontSize: typography.fontSize.labelSmall,
        color: colors.text.secondary,
        textTransform: 'capitalize',
    },
    emptyContainer: {
        alignItems: 'center',
        backgroundColor: colors.surface.container,
        borderRadius: borderRadius.xl,
        padding: spacing.xxl,
        marginTop: spacing.xl,
    },
    emptyIcon: {
        fontSize: 48,
        marginBottom: spacing.md,
    },
    emptyText: {
        fontSize: typography.fontSize.titleMedium,
        fontWeight: typography.fontWeight.medium,
        color: colors.text.secondary,
    },
    emptySubtext: {
        fontSize: typography.fontSize.bodySmall,
        color: colors.text.tertiary,
        marginTop: spacing.xs,
    },
});
