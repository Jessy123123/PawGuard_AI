import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FloatingCard } from '../components/FloatingCard';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { useDisasterMode } from '../contexts/DisasterModeContext';

// Map weather alert types to icons
const getAlertIcon = (type: string): keyof typeof Ionicons.glyphMap => {
    switch (type) {
        case 'thunderstorm': return 'thunderstorm';
        case 'flood': return 'water';
        case 'snow': return 'snow';
        case 'extreme_heat': return 'sunny';
        case 'extreme_cold': return 'snow';
        case 'high_wind': return 'leaf';
        case 'tornado': return 'warning';
        case 'dust': return 'cloud';
        default: return 'alert-circle';
    }
};

export default function DisasterModeScreen() {
    const router = useRouter();
    const {
        isDisasterModeActive,
        weatherAlert,
        weather,
        loading,
        manualOverride,
        setManualOverride,
        dismissAlert,
        refetchWeather
    } = useDisasterMode();

    const handleDisableAlert = () => {
        if (manualOverride) {
            setManualOverride(false);
        } else {
            dismissAlert();
        }
        router.back();
    };

    const handleManualActivate = () => {
        setManualOverride(true);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />

            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.white} />
                </Pressable>
                <Text style={styles.title}>Emergency Mode</Text>
                <Pressable onPress={refetchWeather} style={styles.refreshButton}>
                    <Ionicons name="refresh" size={24} color={colors.minimalist.white} />
                </Pressable>
            </View>

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {loading ? (
                    <View style={styles.loadingContainer}>
                        <ActivityIndicator size="large" color={colors.minimalist.coral} />
                        <Text style={styles.loadingText}>Checking weather conditions...</Text>
                    </View>
                ) : (
                    <>
                        {/* Alert Card */}
                        <FloatingCard shadow="large" style={styles.alertCard}>
                            <View style={styles.alertHeader}>
                                <Ionicons
                                    name={getAlertIcon(weatherAlert.type)}
                                    size={32}
                                    color={isDisasterModeActive ? colors.minimalist.errorRed : colors.minimalist.greenDark}
                                />
                                <Text style={styles.alertTitle}>
                                    {isDisasterModeActive ? weatherAlert.title : 'No Active Alerts'}
                                </Text>
                            </View>
                            <Text style={styles.alertDescription}>
                                {weatherAlert.description}
                            </Text>
                            {weather && (
                                <View style={styles.weatherDetails}>
                                    <Text style={styles.weatherLocation}>
                                        📍 {weather.cityName}
                                    </Text>
                                    <Text style={styles.weatherTemp}>
                                        🌡 {Math.round(weather.temp)}°C • {weather.description}
                                    </Text>
                                    <Text style={styles.weatherWind}>
                                        💨 Wind: {weather.windSpeed} m/s • Humidity: {weather.humidity}%
                                    </Text>
                                </View>
                            )}
                            {isDisasterModeActive && (
                                <View style={[
                                    styles.statusBadge,
                                    { borderColor: weatherAlert.severity === 'CRITICAL' ? colors.minimalist.errorRed : colors.minimalist.warningOrange }
                                ]}>
                                    <Text style={[
                                        styles.statusText,
                                        { color: weatherAlert.severity === 'CRITICAL' ? colors.minimalist.errorRed : colors.minimalist.warningOrange }
                                    ]}>
                                        {weatherAlert.severity} LEVEL
                                    </Text>
                                </View>
                            )}
                            {manualOverride && (
                                <Text style={styles.manualOverrideText}>⚠️ Manually activated</Text>
                            )}
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

                        {/* Action Buttons */}
                        {isDisasterModeActive ? (
                            <Pressable style={styles.exitButton} onPress={handleDisableAlert}>
                                <Text style={styles.exitButtonText}>Disable Active Alert</Text>
                            </Pressable>
                        ) : (
                            <Pressable style={styles.activateButton} onPress={handleManualActivate}>
                                <Text style={styles.activateButtonText}>Manually Activate Alert</Text>
                            </Pressable>
                        )}
                    </>
                )}
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
        flex: 1,
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
    // New styles for weather integration
    refreshButton: {
        marginLeft: 'auto',
        padding: spacing.sm,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.xxxl,
    },
    loadingText: {
        color: colors.minimalist.white,
        fontSize: 16,
        marginTop: spacing.md,
    },
    weatherDetails: {
        backgroundColor: colors.minimalist.bgLight,
        padding: spacing.md,
        borderRadius: 8,
        marginBottom: spacing.lg,
    },
    weatherLocation: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginBottom: 4,
    },
    weatherTemp: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
        marginBottom: 2,
    },
    weatherWind: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
    },
    manualOverrideText: {
        fontSize: 12,
        color: colors.minimalist.warningOrange,
        marginTop: spacing.sm,
        fontStyle: 'italic',
    },
    activateButton: {
        backgroundColor: colors.minimalist.warningOrange,
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    activateButtonText: {
        color: colors.minimalist.white,
        fontSize: 18,
        fontWeight: '700',
    },
});
