import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FloatingCard } from '../components/FloatingCard';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { useReports } from '../contexts/ReportContext';

export default function ReportHistoryScreen() {
    const router = useRouter();
    const { reports } = useReports();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.textDark} />
                </Pressable>
                <Text style={styles.title}>Report History</Text>
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {reports.length > 0 ? (
                    reports.map((report) => (
                        <Pressable
                            key={report.id}
                            onPress={() => router.push({
                                pathname: '/animal-profile',
                                params: { id: report.id }
                            })}
                        >
                            {({ pressed }) => (
                                <FloatingCard shadow="soft" style={[styles.reportCard, pressed && styles.pressed]}>
                                    <View style={styles.cardContent}>
                                        {report.imageUri && (
                                            <Image
                                                source={{ uri: report.imageUri }}
                                                style={styles.thumbnail}
                                            />
                                        )}
                                        <View style={styles.cardInfo}>
                                            <View style={styles.cardHeader}>
                                                <View style={styles.animalInfo}>
                                                    <Text style={styles.animalName}>
                                                        {report.animalType === 'dog' ? '🐕' : '🐈'} {report.breed}
                                                    </Text>
                                                    <Text style={styles.reportDate}>
                                                        {report.date} • {report.location || 'Unknown Location'}
                                                    </Text>
                                                </View>
                                                <StatusBadge status={report.status} />
                                            </View>

                                            {report.color && (
                                                <Text style={styles.colorText}>Color: {report.color}</Text>
                                            )}
                                        </View>
                                    </View>

                                    <View style={styles.divider} />

                                    <View style={styles.cardFooter}>
                                        <Text style={styles.viewDetails}>View Details</Text>
                                        <Ionicons name="chevron-forward" size={16} color={colors.minimalist.coral} />
                                    </View>
                                </FloatingCard>
                            )}
                        </Pressable>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={64} color={colors.minimalist.textLight} />
                        <Text style={styles.emptyText}>No reports yet</Text>
                        <Pressable
                            style={styles.ctaButton}
                            onPress={() => router.push('/AIReportCamera')}
                        >
                            <Text style={styles.ctaText}>Create Your First Report</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.minimalist.bgLight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: colors.minimalist.white,
    },
    backButton: {
        marginRight: spacing.md,
    },
    title: {
        ...serifTextStyles.serifHeading,
        fontSize: 22,
        color: colors.minimalist.textDark,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
    },
    reportCard: {
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    pressed: {
        opacity: 0.9,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    animalInfo: {
        flex: 1,
        marginRight: spacing.sm,
    },
    animalName: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginBottom: 4,
    },
    reportDate: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
    },
    divider: {
        height: 1,
        backgroundColor: colors.minimalist.border,
        marginVertical: spacing.md,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    viewDetails: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.coral,
        marginRight: 4,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        color: colors.minimalist.textMedium,
        marginTop: spacing.md,
        marginBottom: spacing.xl,
    },
    ctaButton: {
        backgroundColor: colors.minimalist.coral,
        paddingHorizontal: spacing.xl,
        paddingVertical: 12,
        borderRadius: 25,
    },
    ctaText: {
        color: colors.minimalist.white,
        fontWeight: '600',
        fontSize: 16,
    },
    cardContent: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: colors.gray200,
    },
    cardInfo: {
        flex: 1,
    },
    colorText: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
        marginTop: 4,
    },
});
