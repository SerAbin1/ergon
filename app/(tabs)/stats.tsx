import { Text, View } from '@/components/Themed';
import { useFocusStore } from '@/src/stores/focusStore';
import { borderRadius, colors, spacing, typography } from '@/src/theme/tokens';
import { ScrollView, StyleSheet } from 'react-native';

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

    // Calculate stats
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
        <ScrollView style={styles.container} contentContainerStyle={styles.content}>
            <Text style={styles.title}>Your Focus Stats</Text>

            <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{formatTime(todaysTotalFocusTime)}</Text>
                    <Text style={styles.statLabel}>Today's Focus</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{todaysSessions.length}</Text>
                    <Text style={styles.statLabel}>Sessions Today</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{formatTime(weeklyTotal)}</Text>
                    <Text style={styles.statLabel}>This Week</Text>
                </View>
                <View style={styles.statCard}>
                    <Text style={styles.statValue}>{formatTime(Math.round(avgDaily))}</Text>
                    <Text style={styles.statLabel}>Daily Average</Text>
                </View>
            </View>

            <View style={styles.placeholder}>
                <Text style={styles.placeholderText}>
                    📊 Detailed charts coming soon
                </Text>
                <Text style={styles.placeholderSubtext}>
                    Track your focus patterns over time
                </Text>
            </View>
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
    },
    title: {
        fontSize: typography.fontSize.xl,
        fontWeight: typography.fontWeight.bold,
        marginBottom: spacing.lg,
        color: colors.neutral[900],
    },
    statsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    statCard: {
        flex: 1,
        minWidth: '45%',
        padding: spacing.lg,
        backgroundColor: colors.neutral[50],
        borderRadius: borderRadius.lg,
        alignItems: 'center',
    },
    statValue: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.bold,
        color: colors.primary[600],
    },
    statLabel: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral[600],
        marginTop: spacing.xs,
    },
    placeholder: {
        marginTop: spacing.xxl,
        padding: spacing.xl,
        backgroundColor: colors.neutral[100],
        borderRadius: borderRadius.lg,
        alignItems: 'center',
    },
    placeholderText: {
        fontSize: typography.fontSize.lg,
        color: colors.neutral[600],
    },
    placeholderSubtext: {
        fontSize: typography.fontSize.sm,
        color: colors.neutral[500],
        marginTop: spacing.xs,
    },
});
