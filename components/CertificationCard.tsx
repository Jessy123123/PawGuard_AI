import React from 'react';
import { View, Text, StyleSheet, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface CertificationCardProps {
    title: string;
    subtitle: string;
    signedBy?: string;
    style?: ViewStyle;
}

export const CertificationCard: React.FC<CertificationCardProps> = ({
    title,
    subtitle,
    signedBy,
    style,
}) => {
    return (
        <View style={[styles.container, theme.shadows.sm, style]}>
            <View style={styles.textContent}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.subtitle}>{subtitle}</Text>
                {signedBy && (
                    <Text style={styles.signedBy}>Digitally signed by {signedBy}</Text>
                )}
            </View>
            <View style={styles.stampContainer}>
                <View style={styles.stamp}>
                    <Ionicons name="checkmark" size={32} color={theme.colors.greenPrimary} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.card,
        padding: theme.spacing.lg,
        borderWidth: 1,
        borderColor: theme.colors.borderGlass,
        alignItems: 'center',
    },
    textContent: {
        flex: 1,
    },
    title: {
        ...theme.textStyles.caption,
        color: theme.colors.greenPrimary,
        fontWeight: '600',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        ...theme.textStyles.h4,
        color: theme.colors.textPrimary,
        fontWeight: '600',
    },
    signedBy: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        marginTop: theme.spacing.xs,
        fontSize: 11,
    },
    stampContainer: {
        marginLeft: theme.spacing.md,
    },
    stamp: {
        width: 56,
        height: 56,
        borderRadius: theme.radius.md,
        backgroundColor: 'rgba(45, 122, 94, 0.15)',
        borderWidth: 2,
        borderColor: theme.colors.greenPrimary,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
