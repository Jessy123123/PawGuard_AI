import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { Alert, AlertStatus } from '../types';

interface AlertCardProps {
    alert: Alert;
    onPress?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onPress }) => {
    const getStatusColor = (status: AlertStatus) => {
        switch (status) {
            case 'critical':
                return theme.colors.critical;
            case 'review':
                return theme.colors.warning;
            case 'active':
                return theme.colors.info;
        }
    };

    const getStatusBg = (status: AlertStatus) => {
        switch (status) {
            case 'critical':
                return theme.colors.iconRed;
            case 'review':
                return theme.colors.iconYellow;
            case 'active':
                return theme.colors.iconBlue;
        }
    };

    const getIconColor = (status: AlertStatus) => {
        switch (status) {
            case 'critical':
                return theme.colors.iconRedDark;
            case 'review':
                return theme.colors.iconYellowDark;
            case 'active':
                return theme.colors.iconBlueDark;
        }
    };

    return (
        <Pressable
            style={({ pressed }) => [styles.container, { opacity: pressed ? 0.7 : 1 }]}
            onPress={onPress}
        >
            <View style={[styles.iconContainer, { backgroundColor: getStatusBg(alert.status) }]}>
                <Ionicons name={alert.icon as any} size={24} color={getIconColor(alert.status)} />
            </View>

            <View style={styles.content}>
                <View style={styles.header}>
                    <Text style={styles.title}>{alert.title}</Text>
                    <View style={[styles.badge, { borderColor: getStatusColor(alert.status) }]}>
                        <Text style={[styles.badgeText, { color: getStatusColor(alert.status) }]}>
                            {alert.status.toUpperCase()}
                        </Text>
                    </View>
                </View>
                <Text style={styles.description}>{alert.description}</Text>
                <Text style={styles.metadata}>
                    {alert.location} • {alert.timestamp}
                </Text>
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surfaceDark,
        borderRadius: theme.borderRadius.card,
        padding: theme.spacing.md,
        marginBottom: theme.spacing.md,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: theme.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: theme.spacing.md,
    },
    content: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.xs,
    },
    title: {
        ...theme.textStyles.bodyLarge,
        color: theme.colors.textPrimary,
        fontWeight: '600',
        flex: 1,
        marginRight: theme.spacing.sm,
    },
    badge: {
        borderWidth: 1,
        borderRadius: theme.radius.sm,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 2,
    },
    badgeText: {
        ...theme.textStyles.small,
        fontWeight: '600',
    },
    description: {
        ...theme.textStyles.body,
        color: theme.colors.textLight,
        marginBottom: theme.spacing.xs,
    },
    metadata: {
        ...theme.textStyles.caption,
        color: theme.colors.textSecondary,
    },
});
