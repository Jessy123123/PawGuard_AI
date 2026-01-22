import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { ActivityItem } from '../components';
import { theme } from '../theme';
import { ActivityItem as ActivityItemType } from '../types';

const mockActivities: ActivityItemType[] = [
    {
        id: '1',
        type: 'rescue',
        title: 'Dog spotted in Flood Zone B',
        description: 'Reported via Citizen App • High Priority',
        timestamp: '2M AGO',
        icon: 'alert-circle',
    },
    {
        id: '2',
        type: 'rescue',
        title: 'Rescue Team Alpha deployed',
        description: 'Assigned to Sector 4 (Animal Shelter 12)',
        timestamp: '15M AGO',
        icon: 'people',
    },
    {
        id: '3',
        type: 'location',
        title: 'Identity Match: Buddy',
        description: 'Golden Retriever match found in Database',
        timestamp: '45M AGO',
        icon: 'finger-print',
    },
];

export const MissionControlScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
            <StatusBar style="light" />
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.headerIcon}>
                            <Ionicons name="shield-checkmark" size={24} color={theme.colors.primary} />
                        </View>
                        <Text style={styles.headerTitle}>Mission Control</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <Pressable style={styles.iconButton}>
                            <Ionicons name="notifications" size={24} color={theme.colors.textPrimary} />
                            <View style={styles.notificationBadge} />
                        </Pressable>
                        <Pressable style={styles.iconButton}>
                            <Ionicons name="menu" size={24} color={theme.colors.textPrimary} />
                        </Pressable>
                    </View>
                </View>

                {/* System Status Banner */}
                <View style={styles.statusBanner}>
                    <Ionicons name="warning" size={20} color={theme.colors.textDark} />
                    <Text style={styles.statusText}>SYSTEM STATUS: DISASTER MODE ACTIVE</Text>
                </View>

                {/* Disaster Heatmap */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>DISASTER HEATMAP</Text>
                        <Pressable>
                            <Text style={styles.liveFeed}>Live Feed</Text>
                        </Pressable>
                    </View>

                    <View style={styles.mapCard}>
                        <View style={styles.mapPlaceholder}>
                            <Ionicons name="map" size={40} color={theme.colors.primary} />
                            <Text style={styles.mapDensityLabel}>● HIGH DENSITY</Text>
                        </View>

                        {/* Map controls */}
                        <View style={styles.mapControls}>
                            <Pressable style={styles.mapButton}>
                                <Ionicons name="add" size={20} color={theme.colors.textPrimary} />
                            </Pressable>
                            <Pressable style={styles.mapButton}>
                                <Ionicons name="remove" size={20} color={theme.colors.textPrimary} />
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* Metrics */}
                <View style={styles.metricsRow}>
                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>AT RISK</Text>
                        <Text style={[styles.metricValue, { color: theme.colors.danger }]}>1,240</Text>
                        <View style={[styles.metricBar, { backgroundColor: theme.colors.danger }]}>
                            <View style={[styles.metricProgress, { width: '80%' }]} />
                        </View>
                        <Text style={styles.metricChange}>-12%</Text>
                    </View>

                    <View style={styles.metricCard}>
                        <Text style={styles.metricLabel}>URGENT</Text>
                        <Text style={[styles.metricValue, { color: theme.colors.success }]}>18</Text>
                        <View style={[styles.metricBar, { backgroundColor: theme.colors.success }]}>
                            <View style={[styles.metricProgress, { width: '20%' }]} />
                        </View>
                        <Text style={styles.metricChange}>-2%</Text>
                    </View>
                </View>

                {/* Recent Activity */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Recent Activity</Text>
                        <Pressable>
                            <Text style={styles.viewAll}>View All</Text>
                        </Pressable>
                    </View>

                    {mockActivities.map((activity) => (
                        <ActivityItem key={activity.id} activity={activity} />
                    ))}
                </View>

                {/* Bottom padding for FAB */}
                <View style={{ height: 100 }} />
            </ScrollView>

            {/* Floating Action Button */}
            <Pressable style={styles.fab}>
                <Ionicons name="qr-code" size={28} color={theme.colors.textDark} />
            </Pressable>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerIcon: {
        width: 40,
        height: 40,
        borderRadius: theme.radius.md,
        backgroundColor: theme.colors.surfaceDark,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    headerTitle: {
        ...theme.textStyles.h3,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
    },
    headerRight: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
    },
    iconButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.danger,
    },
    statusBanner: {
        backgroundColor: theme.colors.danger,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: theme.spacing.sm,
        gap: theme.spacing.sm,
    },
    statusText: {
        ...theme.textStyles.body,
        color: theme.colors.textDark,
        fontWeight: '600',
    },
    section: {
        padding: theme.spacing.xl,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        ...theme.textStyles.bodyLarge,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    liveFeed: {
        ...theme.textStyles.body,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    viewAll: {
        ...theme.textStyles.body,
        color: theme.colors.primary,
        fontWeight: '600',
    },
    mapCard: {
        backgroundColor: theme.colors.surfaceDark,
        borderRadius: theme.borderRadius.card,
        height: 200,
        position: 'relative',
        overflow: 'hidden',
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: theme.colors.gray200,
        opacity: 0.5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapDensityLabel: {
        ...theme.textStyles.caption,
        color: theme.colors.danger,
        marginTop: theme.spacing.sm,
        fontWeight: '600',
    },
    mapControls: {
        position: 'absolute',
        right: theme.spacing.md,
        top: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    mapButton: {
        width: 36,
        height: 36,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.surfaceDark,
        justifyContent: 'center',
        alignItems: 'center',
    },
    metricsRow: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        paddingHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.xl,
    },
    metricCard: {
        flex: 1,
        backgroundColor: theme.colors.surfaceDark,
        borderRadius: theme.borderRadius.card,
        padding: theme.spacing.lg,
    },
    metricLabel: {
        ...theme.textStyles.caption,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.xs,
        fontWeight: '600',
    },
    metricValue: {
        ...theme.textStyles.h1,
        fontWeight: 'bold',
        marginBottom: theme.spacing.sm,
    },
    metricBar: {
        height: 4,
        borderRadius: 2,
        marginBottom: theme.spacing.xs,
    },
    metricProgress: {
        height: '100%',
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 2,
    },
    metricChange: {
        ...theme.textStyles.caption,
        color: theme.colors.textSecondary,
    },
    fab: {
        position: 'absolute',
        bottom: 90,
        alignSelf: 'center',
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.lg,
    },
});
