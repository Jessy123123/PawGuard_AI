import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

interface HeaderContainerProps {
    children: ReactNode;
    variant?: 'gradient' | 'solid';
    style?: ViewStyle;
}

export const HeaderContainer: React.FC<HeaderContainerProps> = ({
    children,
    variant = 'gradient',
    style,
}) => {
    if (variant === 'gradient') {
        return (
            <LinearGradient
                colors={theme.gradients.primary}
                start={theme.gradientPositions.diagonal.start}
                end={theme.gradientPositions.diagonal.end}
                style={[styles.container, style]}
            >
                {children}
            </LinearGradient>
        );
    }

    return (
        <View style={[styles.container, { backgroundColor: theme.colors.surface }, style]}>
            {children}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: theme.spacing.massive,
        paddingBottom: theme.spacing.xl,
        paddingHorizontal: theme.spacing.xl,
    },
});
