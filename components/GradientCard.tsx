import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

interface GradientCardProps {
    children: ReactNode;
    variant?: 'primary' | 'secondary' | 'warm' | 'cool' | 'accent';
    style?: ViewStyle;
}

export const GradientCard: React.FC<GradientCardProps> = ({
    children,
    variant = 'primary',
    style,
}) => {
    const getGradientColors = () => {
        switch (variant) {
            case 'primary':
                return theme.gradients.primary;
            case 'secondary':
                return theme.gradients.secondary;
            case 'warm':
                return theme.gradients.warm;
            case 'cool':
                return theme.gradients.cool;
            case 'accent':
                return theme.gradients.accent;
            default:
                return theme.gradients.primary;
        }
    };

    return (
        <LinearGradient
            colors={getGradientColors()}
            start={theme.gradientPositions.diagonal.start}
            end={theme.gradientPositions.diagonal.end}
            style={[styles.container, style]}
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.card,
        padding: theme.spacing.xl,
        ...theme.shadows.lg,
    },
});
