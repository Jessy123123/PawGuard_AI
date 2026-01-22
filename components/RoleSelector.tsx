import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
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
                <Pressable
                    style={[styles.card, selectedRole === 'citizen' && styles.cardSelected]}
                    onPress={() => onSelectRole('citizen')}
                >
                    {selectedRole === 'citizen' && (
                        <View style={styles.checkmark}>
                            <Ionicons name="checkmark-circle" size={28} color={theme.colors.primary} />
                        </View>
                    )}
                    <Ionicons name="person" size={40} color={theme.colors.textPrimary} />
                    <Text style={styles.cardText}>Citizen</Text>
                </Pressable>

                <Pressable
                    style={[styles.card, selectedRole === 'ngo' && styles.cardSelected]}
                    onPress={() => onSelectRole('ngo')}
                >
                    {selectedRole === 'ngo' && (
                        <View style={styles.checkmark}>
                            <Ionicons name="checkmark-circle" size={28} color={theme.colors.primary} />
                        </View>
                    )}
                    <Ionicons name="medical" size={40} color={theme.colors.textPrimary} />
                    <Text style={styles.cardText}>NGO</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.xl,
    },
    label: {
        ...theme.textStyles.label,
        color: theme.colors.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.md,
        letterSpacing: 1,
    },
    cardsContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    card: {
        flex: 1,
        aspectRatio: 1,
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primaryDark,
        borderRadius: theme.borderRadius.card,
        justifyContent: 'center',
        alignItems: 'center',
        padding: theme.spacing.lg,
        position: 'relative',
    },
    cardSelected: {
        borderColor: theme.colors.primary,
        borderWidth: 2,
    },
    cardText: {
        ...theme.textStyles.body,
        color: theme.colors.textPrimary,
        marginTop: theme.spacing.sm,
    },
    checkmark: {
        position: 'absolute',
        top: theme.spacing.sm,
        right: theme.spacing.sm,
    },
});
