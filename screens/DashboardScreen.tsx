import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StatCard, AlertCard } from '../components';
import { theme } from '../theme';
import { Alert } from '../types';

const mockAlerts: Alert[] = [
    {
        id: '1',
        title: 'Food Warning',
        description: 'Rising water levels detected.',
        location: 'Area B',
        timestamp: '2m ago',
        status: 'critical',
        icon: 'warning',
    },
    {
        id: '2',
        title: 'Public Report',
        description: 'Injured Dog spotted near park.',
        location: 'Sector 4',
        timestamp: '10m ago',
        status: 'review',
        icon: 'person',
    },
    {
        id: '3',
        title: 'AI Detection',
        description: 'Multiple strays identified.',
        location: 'Sector 7',
        timestamp: '15m ago',
        status: 'active',
        icon: 'sparkles',
    },
];

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable style={styles.zoneSelector}>
                        <Text style={styles.zoneLabel}>CURRENT ZONE</Text>
                        <View style={styles.zoneValue}>
                            <Text style={styles.zoneText}>Sector 7 - Downtown</Text>
                            <Ionicons name="chevron-down" size={20} color={theme.colors.primary} />
                        </View>
                    </Pressable>
                    <Pressable style={styles.searchButton}>
                        <Ionicons name="search" size={24} color={theme.colors.textPrimary} />
                    </Pressable>
                </View>

                {/* Statistics Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Rescue Statistics</Text>
                        <Text style={styles.sectionSubtitle}>Last 24h</Text>
                    </View>

                    <View style={styles.statsGrid}>
                        <StatCard
                            icon="home"
                            label="DOGS RESCUED"
                            value={128}
                            positive={true}
                            iconBackgroundColor={theme.colors.iconGreen}
                            iconColor={theme.colors.iconGreenDark}
                        />
                        <StatCard
                            icon="alert-circle"
                            label="DOGS NOT RESCUED"
                            value={45}
                            positive={false}
                            iconBackgroundColor={theme.colors.iconRed}
                            iconColor={theme.colors.iconRedDark}
                        />
                    </View>

                    <View style={styles.statsGrid}>
                        <StatCard
                            icon="paw"
                            label="CATS RESCUED"
                            value={84}
                            positive={true}
                            iconBackgroundColor={theme.colors.iconGreen}
                            iconColor={theme.colors.iconGreenDark}
                        />
                        <StatCard
                            icon="warning"
                            label="CATS NOT RESCUED"
                            value={22}
                            positive={false}
                            iconBackgroundColor={theme.colors.iconRed}
                            iconColor={theme.colors.iconRedDark}
                        />
                    </View>
                </View>

                {/* Intelligence Feed */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Live Intelligence Feed</Text>
                        <Pressable>
                            <Text style={styles.viewAllButton}>VIEW ALL</Text>
                        </Pressable>
                    </View>

                    {mockAlerts.map((alert) => (
                        <AlertCard
                            key={alert.id}
                            alert={alert}
                            onPress={() => navigation.navigate('DogProfile')}
                        />
                    ))}
                </View>

                {/* Bottom padding for tab bar */}
                <View style={{ height: 100 }} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: theme.spacing.xxxl,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
        justifyContent: 'space-between',
    },
    zoneSelector: {
        flex: 1,
    },
    zoneLabel: {
        ...theme.textStyles.caption,
        color: theme.colors.info,
        marginBottom: 4,
        letterSpacing: 1,
    },
    zoneValue: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    zoneText: {
        ...theme.textStyles.bodyLarge,
        color: theme.colors.textPrimary,
        fontWeight: '600',
        marginRight: theme.spacing.xs,
    },
    searchButton: {
        width: 44,
        height: 44,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.surfaceDark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    section: {
        paddingHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        ...theme.textStyles.h4,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
    },
    sectionSubtitle: {
        ...theme.textStyles.body,
        color: theme.colors.textSecondary,
    },
    viewAllButton: {
        ...theme.textStyles.body,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    statsGrid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
});
