import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface StatCardProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value: number;
    positive?: boolean;
    iconBackgroundColor?: string;
    iconColor?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
    icon,
    label,
    value,
    positive = true,
    iconBackgroundColor,
    iconColor,
}) => {
    const bgColor = iconBackgroundColor || (positive ? theme.colors.iconGreen : theme.colors.iconRed);
    const color = iconColor || (positive ? theme.colors.iconGreenDark : theme.colors.iconRedDark);

    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: bgColor }]}>
                <Ionicons name={icon} size={28} color={color} />
            </View>
            <Text style={styles.label}>{label}</Text>
            <Text style={[styles.value, { color }]}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.card,
        padding: theme.spacing.lg,
        alignItems: 'flex-start',
        ...theme.shadows.base,
        flex: 1,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.lg,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    label: {
        ...theme.textStyles.caption,
        color: theme.colors.gray500,
        marginBottom: theme.spacing.xs,
        textTransform: 'uppercase',
        fontWeight: '600',
    },
    value: {
        ...theme.textStyles.h2,
        fontWeight: 'bold',
    },
});
