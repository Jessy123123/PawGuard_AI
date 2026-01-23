import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FloatingCard } from '../components/FloatingCard';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';

const mockReports = [
    {
        id: '1',
        animalType: 'Dog',
        breed: 'Labrador Mix',
        status: 'verified',
        date: 'Oct 12, 2023',
        location: 'Marina Bay Sands',
        image: null,
    },
    {
        id: '2',
        animalType: 'Cat',
        breed: 'Tabby',
        status: 'resolved',
        date: 'Sept 28, 2023',
        location: 'Orchard Road',
        image: null,
    },
    {
        id: '3',
        animalType: 'Dog',
        breed: 'Golden Retriever',
        status: 'atRisk',
        date: 'Sept 15, 2023',
        location: 'Jurong East',
        image: null,
    },
];

export default function ReportHistoryScreen() {
    const router = useRouter();

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
                {mockReports.length > 0 ? (
                    mockReports.map((report) => (
                        <Pressable
                            key={report.id}
                            onPress={() => router.push({
                                pathname: '/animal-profile',
                                params: { id: report.id }
                            })}
                        >
                            {({ pressed }) => (
                                <FloatingCard shadow="soft" style={[styles.reportCard, pressed && styles.pressed]}>
                                    <View style={styles.cardHeader}>
                                        <View style={styles.animalInfo}>
                                            <Text style={styles.animalName}>{report.animalType}: {report.breed}</Text>
                                            <Text style={styles.reportDate}>{report.date} • {report.location}</Text>
                                        </View>
                                        <StatusBadge status={report.status as any} />
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
                            onPress={() => router.push('/(tabs)/report')}
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
});
