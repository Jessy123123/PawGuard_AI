import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';
import { Alert, AlertStatus } from '../types';

interface AlertCardProps {
    alert: Alert;
    onPress?: () => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onPress }) => {
    const getStatusGradient = (status: AlertStatus) => {
        switch (status) {
            case 'critical':
                return [theme.colors.danger, theme.colors.sunset];
            case 'review':
                return [theme.colors.warning, theme.colors.softOrange];
            case 'active':
                return [theme.colors.lightTeal, theme.colors.mint];
        }
    };

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                theme.glassEffect,
                { opacity: pressed ? 0.9 : 1, transform: [{ scale: pressed ? 0.98 : 1 }] },
            ]}
            onPress={onPress}
        >
            <LinearGradient
                colors={getStatusGradient(alert.status)}
                start={theme.gradientPositions.vertical.start}
                end={theme.gradientPositions.vertical.end}
                style={styles.gradientBar}
            />

            <View style={styles.content}>
                <View style={styles.header}>
                    <View style={styles.titleRow}>
                        <Ionicons name={alert.icon as any} size={20} color={theme.colors.textAccent} />
                        <Text style={styles.title}>{alert.title}</Text>
                    </View>
                    <View style={[styles.badge, { borderColor: getStatusGradient(alert.status)[0] }]}>
                        <Text style={[styles.badgeText, { color: getStatusGradient(alert.status)[0] }]}>
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
        borderRadius: theme.borderRadius.card,
        marginBottom: theme.spacing.md,
        overflow: 'hidden',
    },
    gradientBar: {
        width: 4,
    },
    content: {
        flex: 1,
        padding: theme.spacing.md,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: theme.spacing.sm,
    },
    titleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        flex: 1,
    },
    title: {
        ...theme.textStyles.bodyLarge,
        color: theme.colors.textPrimary,
        fontWeight: '700',
        flex: 1,
    },
    badge: {
        borderWidth: 1.5,
        borderRadius: theme.radius.sm,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: 4,
    },
    badgeText: {
        ...theme.textStyles.small,
        fontWeight: '700',
        fontSize: 9,
        letterSpacing: 0.5,
    },
    description: {
        ...theme.textStyles.body,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.sm,
        lineHeight: 20,
    },
    metadata: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        fontSize: 12,
    },
});
