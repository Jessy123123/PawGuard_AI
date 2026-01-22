import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { StatCard, AlertCard, SkeletonLoader, OfflineBanner } from '../components';
import { theme } from '../theme';
import { useData } from '../contexts/DataContext';

export const DashboardScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const { alerts, stats, isLoading, refreshData } = useData();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="light" />
            <OfflineBanner />

            {/* Gradient Header */}
            <LinearGradient
                colors={[theme.colors.surface, theme.colors.background]}
                style={styles.header}
            >
                <View style={styles.headerContent}>
                    <View>
                        <Text style={styles.greeting}>Welcome Back</Text>
                        <View style={styles.locationRow}>
                            <Ionicons name="location" size={14} color={theme.colors.textAccent} />
                            <Text style={styles.location}>Sector 7 • Downtown</Text>
                        </View>
                    </View>
                    <Pressable style={styles.searchButton}>
                        <Ionicons name="search" size={22} color={theme.colors.textPrimary} />
                    </Pressable>
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isLoading}
                        onRefresh={refreshData}
                        tintColor={theme.colors.textAccent}
                    />
                }
            >
                {/* Statistics Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Rescue Statistics</Text>
                        <Text style={styles.sectionSubtitle}>Last 24h</Text>
                    </View>

                    {isLoading ? (
                        <>
                            <View style={styles.statsGrid}>
                                <SkeletonLoader variant="stat" />
                                <SkeletonLoader variant="stat" />
                            </View>
                            <View style={styles.statsGrid}>
                                <SkeletonLoader variant="stat" />
                                <SkeletonLoader variant="stat" />
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.statsGrid}>
                                <StatCard
                                    icon="home"
                                    label="DOGS RESCUED"
                                    value={stats.dogsRescued}
                                    positive={true}
                                />
                                <StatCard
                                    icon="alert-circle"
                                    label="DOGS AT RISK"
                                    value={stats.dogsNotRescued}
                                    positive={false}
                                />
                            </View>

                            <View style={styles.statsGrid}>
                                <StatCard
                                    icon="paw"
                                    label="CATS RESCUED"
                                    value={stats.catsRescued}
                                    positive={true}
                                />
                                <StatCard
                                    icon="warning"
                                    label="CATS AT RISK"
                                    value={stats.catsNotRescued}
                                    positive={false}
                                />
                            </View>
                        </>
                    )}
                </View>

                {/* Intelligence Feed */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Live Intelligence Feed</Text>
                        <Pressable>
                            <Text style={styles.viewAllButton}>VIEW ALL</Text>
                        </Pressable>
                    </View>

                    {isLoading ? (
                        <>
                            <SkeletonLoader variant="list" />
                            <SkeletonLoader variant="list" />
                            <SkeletonLoader variant="list" />
                        </>
                    ) : (
                        alerts.map((alert) => (
                            <AlertCard
                                key={alert.id}
                                alert={alert}
                                onPress={() => navigation.navigate('DogProfile')}
                            />
                        ))
                    )}
                </View>


            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: theme.spacing.lg,
        paddingBottom: theme.spacing.xl,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.xl,
    },
    greeting: {
        ...theme.textStyles.h3,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        marginBottom: theme.spacing.xs,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    location: {
        ...theme.textStyles.body,
        color: theme.colors.textSecondary,
        fontSize: 13,
    },
    searchButton: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.full,
        ...theme.glassEffect,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: theme.layout.tabBarHeight + theme.spacing.xl,
    },
    section: {
        paddingHorizontal: theme.spacing.xl,
        marginBottom: theme.spacing.xxl,
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
        color: theme.colors.textMuted,
        fontSize: 13,
    },
    viewAllButton: {
        ...theme.textStyles.body,
        color: theme.colors.textAccent,
        fontWeight: '700',
        fontSize: 12,
        letterSpacing: 0.5,
    },
    statsGrid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
});
