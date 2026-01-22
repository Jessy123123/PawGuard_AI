import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { StatusBadge, InfoCard, CustomButton, ActivityItem } from '../components';
import { theme } from '../theme';
import { ActivityItem as ActivityItemType } from '../types';

const mockActivities: ActivityItemType[] = [
    {
        id: '1',
        type: 'location',
        title: 'Downtown Metro - Gate 4',
        description: 'Spotted by Volunteer Sarah near the west entrance. Appeared calm but slightly dehydrated.',
        timestamp: 'LAST SEEN • 2 HOURS AGO',
        icon: 'location',
    },
    {
        id: '2',
        type: 'medical',
        title: 'Rabies Vaccination',
        description: 'Administered at PawGuard Field Clinic #2. Batch: RX-9921',
        timestamp: 'MEDICAL LOG • SEPT 15',
        icon: 'medical',
    },
    {
        id: '3',
        type: 'intake',
        title: 'Profile Created via AI Scan',
        description: 'Initial recognition profile generated from mobile upload.',
        timestamp: 'INITIAL INTAKE • SEPT 10',
        icon: 'camera',
    },
];

export const DogProfileScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/* Header with Image */}
                <View style={styles.imageContainer}>
                    <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
                    </Pressable>
                    <Pressable style={styles.shareButton}>
                        <Ionicons name="share-social" size={24} color={theme.colors.textPrimary} />
                    </Pressable>

                    {/* Image Placeholder */}
                    <View style={styles.imagePlaceholder}>
                        <Ionicons name="paw" size={80} color={theme.colors.textTertiary} />
                    </View>
                </View>

                {/* Profile Info */}
                <View style={styles.content}>
                    {/* Priority Badge */}
                    <StatusBadge label="HIGH PRIORITY" variant="danger" />

                    {/* Name & ID */}
                    <Text style={styles.name}>Buddy</Text>
                    <Text style={styles.id}>
                        ID: <Text style={styles.idValue}>#PG-8821</Text> •
                        <Text style={styles.spotted}> Spotted 2h ago</Text>
                    </Text>

                    {/* Status Badges */}
                    <View style={styles.statusRow}>
                        <StatusBadge label="AT RISK" variant="danger" icon="alert-circle" />
                        <StatusBadge label="VACCINATED" variant="success" icon="checkmark-circle" />
                        <StatusBadge label="NEUTERED" variant="info" icon="information-circle" />
                    </View>

                    {/* AI Identity Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="sparkles" size={20} color={theme.colors.primary} />
                            <Text style={styles.sectionTitle}>AI-Generated Identity</Text>
                        </View>

                        <View style={styles.infoGrid}>
                            <InfoCard label="BREED" value="Labrador Mix" subtitle="94% Match" />
                            <InfoCard label="SIZE" value="Medium" subtitle="~18.5 kg" />
                            <InfoCard label="COLOR" value="Golden Tan" />
                        </View>
                    </View>

                    {/* Activity History */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Activity & Medical History</Text>
                        {mockActivities.map((activity) => (
                            <ActivityItem key={activity.id} activity={activity} />
                        ))}
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <CustomButton
                            title="Initiate Rescue"
                            icon="shield-checkmark"
                            iconPosition="left"
                            onPress={() => { }}
                            style={styles.actionButton}
                        />
                        <CustomButton
                            title="Adoption"
                            variant="outline"
                            icon="heart"
                            iconPosition="left"
                            onPress={() => { }}
                            style={styles.actionButton}
                        />
                    </View>
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
        paddingBottom: theme.spacing.xxxl,
    },
    imageContainer: {
        height: 300,
        backgroundColor: theme.colors.surfaceDark,
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: theme.spacing.lg,
        left: theme.spacing.lg,
        width: 40,
        height: 40,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.blackOverlay,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    shareButton: {
        position: 'absolute',
        top: theme.spacing.lg,
        right: theme.spacing.lg,
        width: 40,
        height: 40,
        borderRadius: theme.radius.full,
        backgroundColor: theme.colors.blackOverlay,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.colors.gray300,
    },
    content: {
        padding: theme.spacing.xl,
    },
    name: {
        ...theme.textStyles.h1,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        marginTop: theme.spacing.md,
    },
    id: {
        ...theme.textStyles.body,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.xs,
        marginBottom: theme.spacing.lg,
    },
    idValue: {
        color: theme.colors.primary,
        fontWeight: '600',
    },
    spotted: {
        color: theme.colors.primary,
    },
    statusRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: theme.spacing.xl,
    },
    section: {
        marginBottom: theme.spacing.xxxl,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: theme.spacing.lg,
    },
    sectionTitle: {
        ...theme.textStyles.h4,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        marginLeft: theme.spacing.sm,
    },
    infoGrid: {
        flexDirection: 'row',
        marginHorizontal: -theme.spacing.xs,
    },
    actionButtons: {
        gap: theme.spacing.md,
    },
    actionButton: {
        width: '100%',
    },
});
