import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

type StatusType = 'vaccinated' | 'neutered' | 'at-risk' | 'lost' | 'found' | 'rescued';

interface StatusBadgeProps {
    status: StatusType;
    style?: ViewStyle;
}

const statusConfig: Record<StatusType, { label: string; color: string; icon?: keyof typeof Ionicons.glyphMap }> = {
    vaccinated: { label: 'Vaccinated', color: colors.minimalist.vaccinated, icon: 'shield-checkmark' },
    neutered: { label: 'Neutered', color: colors.minimalist.neutered, icon: 'checkmark-circle' },
    'at-risk': { label: 'At Risk', color: colors.minimalist.atRisk, icon: 'alert-circle' },
    lost: { label: 'Lost', color: colors.minimalist.lost, icon: 'location' },
    found: { label: 'Found', color: colors.minimalist.found, icon: 'checkmark-circle' },
    rescued: { label: 'Rescued', color: colors.minimalist.successGreen, icon: 'heart' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, style }) => {
    const config = statusConfig[status];

    return (
        <View style={[styles.badge, { backgroundColor: `${config.color}20` }, style]}>
            {config.icon && (
                <Ionicons name={config.icon} size={14} color={config.color} />
            )}
            <Text style={[styles.label, { color: config.color }]}>{config.label}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    badge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
    },
});
