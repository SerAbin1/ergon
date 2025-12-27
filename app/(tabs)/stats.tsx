/**
 * Stats Screen - M3 Expressive Dark Theme
 *
 * Focus statistics dashboard with summary cards.
 * Shows daily, weekly totals and session counts.
 */
import { useFocusStore } from '@/src/stores/focusStore';
import { borderRadius, colors, spacing, typography } from '@/src/theme/tokens';
import { ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native';

export default function StatsScreen() {
    const { sessions, todaysTotalFocusTime } = useFocusStore();

    const formatTime = (seconds: number): string => {
        const hours = Math.floor(seconds / 3600);
        const mins = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}h ${mins}m`;
        }
        return `${mins}m`;
    };

    // Calculate statistics
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todaysSessions = sessions.filter(
        (s) => s.startTime >= todayStart.getTime()
    );

    const weekStart = new Date();
    weekStart.setDate(weekStart.getDate() - 7);
    const weeksSessions = sessions.filter(
        (s) => s.startTime >= weekStart.getTime()
    );

    const weeklyTotal = weeksSessions.reduce((acc, s) => acc + s.duration, 0);
    const avgDaily = weeksSessions.length > 0 ? weeklyTotal / 7 : 0;

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor={colors.surface.dim} />
            <ScrollView style={styles.container} contentContainerStyle={styles.content}>
                <Text style={styles.title}>Your Stats</Text>

                {/* Stats grid */}
                <View style={styles.grid}>
                    <View style={[styles.card, styles.cardPrimary]}>
                        <Text style={styles.cardValue}>{formatTime(todaysTotalFocusTime)}</Text>
                        <Text style={styles.cardLabel}>Today's Focus</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardValue}>{todaysSessions.length}</Text>
                        <Text style={styles.cardLabel}>Sessions</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardValue}>{formatTime(weeklyTotal)}</Text>
                        <Text style={styles.cardLabel}>This Week</Text>
                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardValue}>{formatTime(Math.round(avgDaily))}</Text>
                        <Text style={styles.cardLabel}>Daily Avg</Text>
                    </View>
                </View>

                {/* Placeholder for charts */}
                <View style={styles.chartPlaceholder}>
                    <Text style={styles.chartIcon}>📊</Text>
                    <Text style={styles.chartTitle}>Insights coming soon</Text>
                    <Text style={styles.chartSubtitle}>
                        Track your focus patterns over time
                    </Text>
                </View>
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
    },
    title: {
        fontSize: typography.fontSize.headlineMedium,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
        marginBottom: spacing.lg,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    card: {
        flex: 1,
        minWidth: '45%',
        backgroundColor: colors.surface.container,
        borderRadius: borderRadius.xl,
        padding: spacing.lg,
        alignItems: 'center',
    },
    cardPrimary: {
        backgroundColor: colors.primary.container,
    },
    cardValue: {
        fontSize: typography.fontSize.headlineLarge,
        fontWeight: typography.fontWeight.bold,
        color: colors.text.primary,
    },
    cardLabel: {
        fontSize: typography.fontSize.bodySmall,
        color: colors.text.secondary,
        marginTop: spacing.xs,
    },
    chartPlaceholder: {
        marginTop: spacing.xxl,
        padding: spacing.xxl,
        backgroundColor: colors.surface.bright,
        borderRadius: borderRadius.xl,
        alignItems: 'center',
    },
    chartIcon: {
        fontSize: 56,
        marginBottom: spacing.md,
    },
    chartTitle: {
        fontSize: typography.fontSize.titleMedium,
        fontWeight: typography.fontWeight.semibold,
        color: colors.text.secondary,
    },
    chartSubtitle: {
        fontSize: typography.fontSize.bodySmall,
        color: colors.text.tertiary,
        marginTop: spacing.xs,
    },
});
