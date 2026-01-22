import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
    RoleSelector,
    CustomButton,
    CustomInput,
    StatCard,
    AlertCard,
    FilterChip,
    StatusBadge,
    InfoCard,
    ActivityItem,
} from '../components';
import { theme } from '../theme';
import { UserRole, Alert, ActivityItem as ActivityItemType } from '../types';

export const ExampleScreen: React.FC = () => {
    const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');

    const mockAlert: Alert = {
        id: '1',
        title: 'Design System',
        description: 'Fintech-style components with glassmorphism',
        location: 'Component Library',
        timestamp: 'Now',
        status: 'active',
        icon: 'sparkles',
    };

    const mockActivity: ActivityItemType = {
        id: '1',
        type: 'location',
        title: 'Component Showcase',
        description: 'All redesigned fintech components in one place',
        timestamp: 'UPDATED • NOW',
        icon: 'grid',
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
            <StatusBar style="light" />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Gradient Header */}
                <LinearGradient
                    colors={theme.gradients.primary as any}
                    start={theme.gradientPositions.diagonal.start}
                    end={theme.gradientPositions.diagonal.end}
                    style={styles.header}
                >
                    <Text style={styles.headerTitle}>Fintech Design System</Text>
                    <Text style={styles.headerSubtitle}>Component Showcase</Text>
                </LinearGradient>

                <View style={styles.content}>
                    {/* Role Selector */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Role Selector</Text>
                        <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />
                    </View>

                    {/* Buttons */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Buttons</Text>
                        <CustomButton title="Primary Gradient" variant="primary" icon="arrow-forward" />
                        <View style={styles.spacer} />
                        <CustomButton title="Secondary Gradient" variant="secondary" icon="checkmark" />
                        <View style={styles.spacer} />
                        <CustomButton title="Glass Effect" variant="glass" icon="sparkles" iconPosition="left" />
                        <View style={styles.spacer} />
                        <CustomButton title="Outline" variant="outline" icon="heart" iconPosition="left" />
                    </View>

                    {/* Inputs */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Input Fields</Text>
                        <CustomInput
                            label="EMAIL ADDRESS"
                            placeholder="user@example.com"
                            value=""
                            onChangeText={() => { }}
                        />
                        <CustomInput
                            label="PASSWORD"
                            placeholder="••••••••"
                            value=""
                            onChangeText={() => { }}
                            secureTextEntry
                        />
                        <CustomInput
                            label="ERROR STATE"
                            placeholder="Invalid input"
                            value=""
                            onChangeText={() => { }}
                            error="This field is required"
                        />
                    </View>

                    {/* Stat Cards */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Stat Cards</Text>
                        <View style={styles.grid}>
                            <StatCard
                                icon="trending-up"
                                label="POSITIVE METRIC"
                                value={1234}
                                positive={true}
                            />
                            <StatCard
                                icon="trending-down"
                                label="NEGATIVE METRIC"
                                value={567}
                                positive={false}
                            />
                        </View>
                    </View>

                    {/* Alert Card */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Alert Card</Text>
                        <AlertCard alert={mockAlert} />
                    </View>

                    {/* Filter Chips */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Filter Chips</Text>
                        <View style={styles.row}>
                            <FilterChip label="Selected" selected />
                            <FilterChip label="Unselected" />
                            <FilterChip label="Dropdown" dropdown />
                        </View>
                    </View>

                    {/* Status Badges */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Status Badges</Text>
                        <View style={styles.row}>
                            <StatusBadge label="Success" variant="success" icon="checkmark-circle" />
                            <StatusBadge label="Warning" variant="warning" icon="warning" />
                            <StatusBadge label="Danger" variant="danger" icon="alert-circle" />
                            <StatusBadge label="Info" variant="info" icon="information-circle" />
                        </View>
                    </View>

                    {/* Info Cards */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Info Cards</Text>
                        <View style={styles.infoGrid}>
                            <InfoCard label="BREED" value="Labrador" subtitle="94% Match" />
                            <InfoCard label="SIZE" value="Medium" subtitle="~18kg" />
                            <InfoCard label="COLOR" value="Golden" />
                        </View>
                    </View>

                    {/* Activity Item */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Activity Item</Text>
                        <ActivityItem activity={mockActivity} />
                    </View>

                    {/* Color Palette */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Color Palette</Text>
                        <View style={styles.colorGrid}>
                            <View style={styles.colorItem}>
                                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.peach }]} />
                                <Text style={styles.colorLabel}>Peach</Text>
                            </View>
                            <View style={styles.colorItem}>
                                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.coral }]} />
                                <Text style={styles.colorLabel}>Coral</Text>
                            </View>
                            <View style={styles.colorItem}>
                                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.lightTeal }]} />
                                <Text style={styles.colorLabel}>Teal</Text>
                            </View>
                            <View style={styles.colorItem}>
                                <View style={[styles.colorSwatch, { backgroundColor: theme.colors.mint }]} />
                                <Text style={styles.colorLabel}>Mint</Text>
                            </View>
                        </View>
                    </View>

                    {/* Bottom Spacing */}
                    <View style={{ height: theme.spacing.mega }} />
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
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: theme.spacing.xxxl,
    },
    header: {
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.xxxl,
        marginBottom: theme.spacing.xl,
    },
    headerTitle: {
        ...theme.textStyles.h1,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        marginBottom: theme.spacing.xs,
    },
    headerSubtitle: {
        ...theme.textStyles.body,
        color: theme.colors.textPrimary,
        opacity: 0.9,
    },
    content: {
        paddingHorizontal: theme.spacing.xl,
    },
    section: {
        marginBottom: theme.spacing.xxxl,
    },
    sectionTitle: {
        ...theme.textStyles.h4,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        marginBottom: theme.spacing.lg,
    },
    spacer: {
        height: theme.spacing.md,
    },
    grid: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.sm,
    },
    infoGrid: {
        flexDirection: 'row',
        marginHorizontal: -theme.spacing.xs,
    },
    colorGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: theme.spacing.lg,
    },
    colorItem: {
        alignItems: 'center',
    },
    colorSwatch: {
        width: 60,
        height: 60,
        borderRadius: theme.radius.lg,
        marginBottom: theme.spacing.xs,
        ...theme.shadows.base,
    },
    colorLabel: {
        ...theme.textStyles.caption,
        color: theme.colors.textSecondary,
        fontSize: 11,
    },
});
