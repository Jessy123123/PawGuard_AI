import React from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { UserRole } from '../types';

interface RoleSelectorProps {
    selectedRole: UserRole;
    onSelectRole: (role: UserRole) => void;
}

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onSelectRole }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>SELECT YOUR ROLE</Text>

            <View style={styles.cardsContainer}>
                {/* Citizen Card */}
                <Pressable
                    style={({ pressed }) => [
                        styles.card,
                        pressed && styles.cardPressed,
                    ]}
                    onPress={() => onSelectRole('citizen')}
                >
                    {selectedRole === 'citizen' ? (
                        <LinearGradient
                            colors={theme.gradients.primary}
                            start={theme.gradientPositions.diagonal.start}
                            end={theme.gradientPositions.diagonal.end}
                            style={styles.gradientCard}
                        >
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="person" size={40} color={theme.colors.textPrimary} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>Citizen</Text>
                                    <Text style={styles.cardSubtitle}>Report and track animals</Text>
                                </View>
                                <View style={styles.checkmark}>
                                    <Ionicons name="checkmark-circle" size={28} color={theme.colors.textPrimary} />
                                </View>
                            </View>
                        </LinearGradient>
                    ) : (
                        <View style={[styles.glassCard, theme.glassEffect]}>
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="person-outline" size={40} color={theme.colors.textSecondary} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitleInactive}>Citizen</Text>
                                    <Text style={styles.cardSubtitleInactive}>Report and track animals</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </Pressable>

                {/* NGO Card */}
                <Pressable
                    style={({ pressed }) => [
                        styles.card,
                        pressed && styles.cardPressed,
                    ]}
                    onPress={() => onSelectRole('ngo')}
                >
                    {selectedRole === 'ngo' ? (
                        <LinearGradient
                            colors={theme.gradients.secondary}
                            start={theme.gradientPositions.diagonal.start}
                            end={theme.gradientPositions.diagonal.end}
                            style={styles.gradientCard}
                        >
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="medical" size={40} color={theme.colors.textPrimary} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitle}>NGO</Text>
                                    <Text style={styles.cardSubtitle}>Manage rescue operations</Text>
                                </View>
                                <View style={styles.checkmark}>
                                    <Ionicons name="checkmark-circle" size={28} color={theme.colors.textPrimary} />
                                </View>
                            </View>
                        </LinearGradient>
                    ) : (
                        <View style={[styles.glassCard, theme.glassEffect]}>
                            <View style={styles.cardContent}>
                                <View style={styles.iconContainer}>
                                    <Ionicons name="medical-outline" size={40} color={theme.colors.textSecondary} />
                                </View>
                                <View style={styles.textContainer}>
                                    <Text style={styles.cardTitleInactive}>NGO</Text>
                                    <Text style={styles.cardSubtitleInactive}>Manage rescue operations</Text>
                                </View>
                            </View>
                        </View>
                    )}
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.xxl,
    },
    label: {
        ...theme.textStyles.label,
        color: theme.colors.textAccent,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
        letterSpacing: 2,
        fontSize: 11,
    },
    cardsContainer: {
        gap: theme.spacing.lg,
    },
    card: {
        width: '100%',
        minHeight: theme.layout.minTouchTarget * 2,
    },
    cardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    gradientCard: {
        borderRadius: theme.borderRadius.roleCard,
        padding: theme.spacing.lg,
        ...theme.shadows.lg,
    },
    glassCard: {
        borderRadius: theme.borderRadius.roleCard,
        padding: theme.spacing.lg,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.md,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: theme.radius.xl,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        flex: 1,
    },
    cardTitle: {
        ...theme.textStyles.h4,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    cardSubtitle: {
        ...theme.textStyles.body,
        color: theme.colors.textPrimary,
        opacity: 0.9,
        fontSize: 13,
    },
    cardTitleInactive: {
        ...theme.textStyles.h4,
        color: theme.colors.textSecondary,
        fontWeight: '600',
        marginBottom: 4,
    },
    cardSubtitleInactive: {
        ...theme.textStyles.body,
        color: theme.colors.textMuted,
        fontSize: 13,
    },
    checkmark: {
        marginLeft: theme.spacing.sm,
    },
});
