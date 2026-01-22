import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface StatusBadgeProps {
    label: string;
    variant?: 'danger' | 'success' | 'info' | 'warning';
    icon?: keyof typeof Ionicons.glyphMap;
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
    label,
    variant = 'info',
    icon,
}) => {
    const getColors = () => {
        switch (variant) {
            case 'danger':
                return {
                    bg: theme.colors.danger,
                    text: theme.colors.textPrimary,
                };
            case 'success':
                return {
                    bg: theme.colors.success,
                    text: theme.colors.textPrimary,
                };
            case 'info':
                return {
                    bg: theme.colors.info,
                    text: theme.colors.textPrimary,
                };
            case 'warning':
                return {
                    bg: theme.colors.warning,
                    text: theme.colors.textDark,
                };
        }
    };

    const colors = getColors();

    return (
        <View style={[styles.badge, { backgroundColor: colors.bg }]}>
            {icon && (
                <Ionicons name={icon} size={14} color={colors.text} style={styles.icon} />
            )}
            <Text style={[styles.text, { color: colors.text }]}>{label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
        borderRadius: theme.radius.sm,
        marginRight: theme.spacing.xs,
    },
    icon: {
        marginRight: 4,
    },
    text: {
        ...theme.textStyles.caption,
        fontWeight: '600',
        fontSize: 10,
        textTransform: 'uppercase',
    },
});
