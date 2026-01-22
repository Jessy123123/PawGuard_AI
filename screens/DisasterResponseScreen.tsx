import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FilterChip, CustomButton, CustomInput } from '../components';
import { theme } from '../theme';

export const DisasterResponseScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
            <StatusBar style="light" />
            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
                    </Pressable>
                    <View style={styles.headerContent}>
                        <Text style={styles.headerTitle}>Disaster Response</Text>
                        <Text style={styles.headerSubtitle}>● FLOOD ZONE ACTIVE</Text>
                    </View>
                    <Pressable style={styles.layersButton}>
                        <Ionicons name="layers" size={24} color={theme.colors.textPrimary} />
                    </Pressable>
                </View>

                {/* Filters */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={styles.filters}
                    contentContainerStyle={styles.filtersContent}
                >
                    <FilterChip label="Species" dropdown onPress={() => { }} />
                    <FilterChip label="Health Status" dropdown onPress={() => { }} />
                    <FilterChip label="High Risk Only" selected onPress={() => { }} />
                </ScrollView>

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <View style={styles.searchBar}>
                        <Ionicons name="search" size={20} color={theme.colors.primary} />
                        <Text style={styles.searchPlaceholder}>Search animal ID or coordinates...</Text>
                    </View>
                </View>

                {/* Map Placeholder */}
                <View style={styles.mapContainer}>
                    <View style={styles.mapPlaceholder}>
                        <Text style={styles.mapText}>🗺️ Interactive Map</Text>
                        <Text style={styles.mapSubtext}>
                            Map markers would appear here{'\n'}
                            showing animal locations
                        </Text>
                    </View>

                    {/* Map Controls */}
                    <View style={styles.mapControls}>
                        <Pressable style={styles.mapButton}>
                            <Ionicons name="add" size={24} color={theme.colors.textPrimary} />
                        </Pressable>
                        <Pressable style={styles.mapButton}>
                            <Ionicons name="remove" size={24} color={theme.colors.textPrimary} />
                        </Pressable>
                        <Pressable style={[styles.mapButton, { backgroundColor: theme.colors.primary }]}>
                            <Ionicons name="locate" size={24} color={theme.colors.textDark} />
                        </Pressable>
                    </View>
                </View>

                {/* Bottom Sheet */}
                <View style={styles.bottomSheet}>
                    <View style={styles.handle} />

                    <View style={styles.bottomContent}>
                        <View style={styles.bottomHeader}>
                            <View>
                                <Text style={styles.areaLabel}>ACTIVE SEARCH AREA</Text>
                                <Text style={styles.areaName}>East River Basin</Text>
                            </View>
                            <View style={styles.targetBadge}>
                                <Text style={styles.targetCount}>12</Text>
                                <Text style={styles.targetLabel}>TARGETS</Text>
                            </View>
                        </View>

                        <CustomButton
                            title="BROADCAST ALERT"
                            icon="megaphone"
                            iconPosition="left"
                            onPress={() => { }}
                            style={styles.broadcastButton}
                        />
                    </View>
                </View>
            </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerContent: {
        flex: 1,
        marginLeft: theme.spacing.sm,
    },
    headerTitle: {
        ...theme.textStyles.h4,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        ...theme.textStyles.caption,
        color: theme.colors.danger,
        fontWeight: '600',
    },
    layersButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filters: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.md,
    },
    filtersContent: {
        gap: theme.spacing.sm,
    },
    searchContainer: {
        paddingHorizontal: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surfaceDark,
        borderRadius: theme.borderRadius.input,
        paddingHorizontal: theme.spacing.md,
        height: 48,
    },
    searchPlaceholder: {
        ...theme.textStyles.body,
        color: theme.colors.textSecondary,
        marginLeft: theme.spacing.sm,
    },
    mapContainer: {
        flex: 1,
        position: 'relative',
    },
    mapPlaceholder: {
        flex: 1,
        backgroundColor: theme.colors.gray200,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.5,
    },
    mapText: {
        fontSize: theme.normalize(48),
        marginBottom: theme.spacing.md,
    },
    mapSubtext: {
        ...theme.textStyles.body,
        color: theme.colors.textDark,
        textAlign: 'center',
        lineHeight: 22,
    },
    mapControls: {
        position: 'absolute',
        right: theme.spacing.lg,
        top: theme.spacing.xl,
        gap: theme.spacing.sm,
    },
    mapButton: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.surfaceDark,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.base,
    },
    bottomSheet: {
        backgroundColor: theme.colors.surfaceDark,
        borderTopLeftRadius: theme.borderRadius.card,
        borderTopRightRadius: theme.borderRadius.card,
        paddingTop: theme.spacing.sm,
    },
    handle: {
        width: 40,
        height: 4,
        backgroundColor: theme.colors.gray400,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: theme.spacing.md,
    },
    bottomContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.spacing.xl,
    },
    bottomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    areaLabel: {
        ...theme.textStyles.caption,
        color: theme.colors.primary,
        marginBottom: 4,
        letterSpacing: 1,
    },
    areaName: {
        ...theme.textStyles.h3,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
    },
    targetBadge: {
        backgroundColor: theme.colors.surfaceDark,
        borderWidth: 2,
        borderColor: theme.colors.primary,
        borderRadius: theme.radius.md,
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        alignItems: 'center',
    },
    targetCount: {
        ...theme.textStyles.h2,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
    },
    targetLabel: {
        ...theme.textStyles.caption,
        color: theme.colors.textSecondary,
    },
    broadcastButton: {
        backgroundColor: theme.colors.primary,
    },
});
