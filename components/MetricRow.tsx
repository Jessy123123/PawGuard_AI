import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { theme } from '../theme';

interface MetricRowProps {
    icon: ReactNode;
    label: string;
    value: string | number;
    subtitle?: string;
    iconBackgroundColor?: string;
}

export const MetricRow: React.FC<MetricRowProps> = ({
    icon,
    label,
    value,
    subtitle,
    iconBackgroundColor = theme.colors.accentLight,
}) => {
    return (
        <View style={styles.container}>
            <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColor }]}>
                {icon}
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.label}>{label}</Text>
                {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
            </View>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.card,
        padding: theme.spacing.lg,
        ...theme.shadows.sm,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: theme.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    textContainer: {
        flex: 1,
    },
    label: {
        ...theme.textStyles.body,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xxs,
    },
    subtitle: {
        ...theme.textStyles.caption,
        color: theme.colors.textTertiary,
    },
    value: {
        ...theme.textStyles.h3,
        color: theme.colors.textPrimary,
    },
});
