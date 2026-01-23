import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FloatingCard } from '../components/FloatingCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';

export default function DisasterModeScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.white} />
                </Pressable>
                <Text style={styles.title}>Emergency Mode</Text>
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <FloatingCard shadow="large" style={styles.alertCard}>
                    <View style={styles.alertHeader}>
                        <Ionicons name="warning" size={32} color={colors.minimalist.errorRed} />
                        <Text style={styles.alertTitle}>Active Alert: Flood Warning</Text>
                    </View>
                    <Text style={styles.alertDescription}>
                        High risk of flash floods in the Northern Districts. Multiple shelters are evacuating animals.
                    </Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>CRITICAL LEVEL</Text>
                    </View>
                </FloatingCard>

                <Text style={styles.sectionTitle}>NGO Action Center</Text>

                <View style={styles.actionsGrid}>
                    <Pressable style={styles.actionItem}>
                        <FloatingCard shadow="soft" style={styles.actionCard}>
                            <Ionicons name="bus" size={32} color={colors.minimalist.coral} />
                            <Text style={styles.actionLabel}>Evacuation Protocol</Text>
                        </FloatingCard>
                    </Pressable>

                    <Pressable style={styles.actionItem}>
                        <FloatingCard shadow="soft" style={styles.actionCard}>
                            <Ionicons name="medkit" size={32} color={colors.minimalist.coral} />
                            <Text style={styles.actionLabel}>Field Triage</Text>
                        </FloatingCard>
                    </Pressable>
                </View>

                <View style={styles.actionsGrid}>
                    <Pressable style={styles.actionItem}>
                        <FloatingCard shadow="soft" style={styles.actionCard}>
                            <Ionicons name="people" size={32} color={colors.minimalist.coral} />
                            <Text style={styles.actionLabel}>Assign Teams</Text>
                        </FloatingCard>
                    </Pressable>

                    <Pressable style={styles.actionItem}>
                        <FloatingCard shadow="soft" style={styles.actionCard}>
                            <Ionicons name="radio" size={32} color={colors.minimalist.coral} />
                            <Text style={styles.actionLabel}>Broadcasting</Text>
                        </FloatingCard>
                    </Pressable>
                </View>

                <FloatingCard shadow="soft" style={styles.infoCard}>
                    <Text style={styles.infoTitle}>Resource Tracking</Text>
                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabel}>Shelter Capacity</Text>
                            <Text style={styles.progressValue}>85%</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '85%', backgroundColor: colors.minimalist.errorRed }]} />
                        </View>
                    </View>

                    <View style={styles.progressBarContainer}>
                        <View style={styles.progressHeader}>
                            <Text style={styles.progressLabel}>Food Supplies</Text>
                            <Text style={styles.progressValue}>42%</Text>
                        </View>
                        <View style={styles.progressBar}>
                            <View style={[styles.progressFill, { width: '42%', backgroundColor: colors.minimalist.warningOrange }]} />
                        </View>
                    </View>
                </FloatingCard>

                <Pressable style={styles.exitButton} onPress={() => router.back()}>
                    <Text style={styles.exitButtonText}>Disable Active Alert</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#1C1917', // Darker background for disaster mode
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: '#1C1917',
    },
    backButton: {
        marginRight: spacing.md,
    },
    title: {
        ...serifTextStyles.serifHeading,
        fontSize: 22,
        color: colors.minimalist.white,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.xl,
    },
    alertCard: {
        padding: spacing.xl,
        marginBottom: spacing.xxl,
        backgroundColor: colors.minimalist.white,
    },
    alertHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
        gap: spacing.md,
    },
    alertTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        flex: 1,
    },
    alertDescription: {
        fontSize: 16,
        color: colors.minimalist.textMedium,
        lineHeight: 24,
        marginBottom: spacing.lg,
    },
    statusBadge: {
        alignSelf: 'flex-start',
        backgroundColor: `${colors.minimalist.errorRed}15`,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: colors.minimalist.errorRed,
    },
    statusText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.minimalist.errorRed,
    },
    sectionTitle: {
        ...serifTextStyles.serifHeading,
        fontSize: 18,
        color: colors.minimalist.white,
        marginBottom: spacing.lg,
    },
    actionsGrid: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    actionItem: {
        flex: 1,
    },
    actionCard: {
        alignItems: 'center',
        padding: spacing.lg,
        height: 120,
        justifyContent: 'center',
    },
    actionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
    infoCard: {
        padding: spacing.lg,
        marginTop: spacing.lg,
        marginBottom: spacing.xxxl,
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        marginBottom: spacing.lg,
    },
    progressBarContainer: {
        marginBottom: spacing.lg,
    },
    progressHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 6,
    },
    progressLabel: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
    },
    progressValue: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.minimalist.textDark,
    },
    progressBar: {
        height: 8,
        backgroundColor: colors.minimalist.bgLight,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    exitButton: {
        backgroundColor: colors.minimalist.errorRed,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    exitButtonText: {
        color: colors.minimalist.white,
        fontSize: 18,
        fontWeight: '700',
    },
});
