import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import {
    GradientButton,
    GradientCard,
    IconButton,
    StatCard,
    MetricRow,
    HeaderContainer,
} from '../components';
import { theme } from '../theme';

export const ExampleScreen: React.FC = () => {
    // Mock icon components (replace with actual icons from @expo/vector-icons)
    const MockIcon = ({ color = theme.colors.accent }: { color?: string }) => (
        <View style={{ width: 24, height: 24, backgroundColor: color, borderRadius: 12 }} />
    );

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/* Header with Gradient */}
                <HeaderContainer variant="gradient">
                    <Text style={styles.headerTitle}>Theme Showcase</Text>
                    <Text style={styles.headerSubtitle}>Generic React Native Framework</Text>
                </HeaderContainer>

                {/* Content Section */}
                <View style={styles.content}>
                    {/* Section: Gradient Buttons */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Gradient Buttons</Text>
                        <GradientButton title="Primary Button" variant="primary" />
                        <View style={styles.spacer} />
                        <GradientButton title="Secondary Button" variant="secondary" />
                        <View style={styles.spacer} />
                        <GradientButton title="Dark Button" variant="dark" size="small" />
                    </View>

                    {/* Section: Gradient Cards */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Gradient Cards</Text>
                        <GradientCard variant="primary">
                            <Text style={styles.cardText}>Primary Gradient</Text>
                            <Text style={styles.cardSubtext}>Orange → Pink → Purple</Text>
                        </GradientCard>
                        <View style={styles.spacer} />
                        <GradientCard variant="warm">
                            <Text style={styles.cardText}>Warm Gradient</Text>
                            <Text style={styles.cardSubtext}>Yellow → Orange → Pink</Text>
                        </GradientCard>
                    </View>

                    {/* Section: Icon Buttons */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Icon Buttons</Text>
                        <View style={styles.row}>
                            <IconButton icon={<MockIcon color={theme.colors.textInverse} />} variant="gradient" />
                            <View style={styles.spacerHorizontal} />
                            <IconButton icon={<MockIcon color={theme.colors.textPrimary} />} variant="white" />
                            <View style={styles.spacerHorizontal} />
                            <IconButton icon={<MockIcon color={theme.colors.textInverse} />} variant="dark" size="small" />
                        </View>
                    </View>

                    {/* Section: Stat Cards */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Stat Cards</Text>
                        <View style={styles.grid}>
                            <View style={styles.gridItem}>
                                <StatCard
                                    icon={<MockIcon color={theme.colors.accent} />}
                                    label="Total Count"
                                    value="1,234"
                                />
                            </View>
                            <View style={styles.gridItem}>
                                <StatCard
                                    icon={<MockIcon color={theme.colors.info} />}
                                    label="Active Items"
                                    value="567"
                                    iconBackgroundColor="#E0F2FE"
                                />
                            </View>
                        </View>
                    </View>

                    {/* Section: Metric Rows */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Metric Rows</Text>
                        <MetricRow
                            icon={<MockIcon color={theme.colors.success} />}
                            label="Success Rate"
                            value="92%"
                            subtitle="Last 30 days"
                            iconBackgroundColor="#D1FAE5"
                        />
                        <View style={styles.spacer} />
                        <MetricRow
                            icon={<MockIcon color={theme.colors.warning} />}
                            label="Completion"
                            value="78%"
                            subtitle="Current period"
                            iconBackgroundColor="#FEF3C7"
                        />
                    </View>

                    {/* Bottom Spacing */}
                    <View style={{ height: theme.spacing.xxxl }} />
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
    },
    headerTitle: {
        ...theme.textStyles.h2,
        color: theme.colors.textInverse,
        marginBottom: theme.spacing.xs,
    },
    headerSubtitle: {
        ...theme.textStyles.body,
        color: theme.colors.textInverse,
        opacity: 0.9,
    },
    content: {
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.xl,
    },
    section: {
        marginBottom: theme.spacing.xxxl,
    },
    sectionTitle: {
        ...theme.textStyles.h4,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.lg,
    },
    spacer: {
        height: theme.spacing.md,
    },
    spacerHorizontal: {
        width: theme.spacing.md,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    grid: {
        flexDirection: 'row',
        marginHorizontal: -theme.spacing.sm,
    },
    gridItem: {
        flex: 1,
        marginHorizontal: theme.spacing.sm,
    },
    cardText: {
        ...theme.textStyles.h3,
        color: theme.colors.textInverse,
        marginBottom: theme.spacing.xs,
    },
    cardSubtext: {
        ...theme.textStyles.body,
        color: theme.colors.textInverse,
        opacity: 0.9,
    },
});
