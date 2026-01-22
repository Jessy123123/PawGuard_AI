import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, TextStyle, PressableProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

interface GradientButtonProps extends Omit<PressableProps, 'style'> {
    title: string;
    variant?: 'primary' | 'secondary' | 'dark';
    size?: 'small' | 'medium' | 'large';
    style?: ViewStyle;
}

export const GradientButton: React.FC<GradientButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
    style,
    ...pressableProps
}) => {
    const getGradientColors = () => {
        switch (variant) {
            case 'primary':
                return theme.gradients.primary;
            case 'secondary':
                return theme.gradients.warm;
            case 'dark':
                return [theme.colors.dark, theme.colors.darkSurface];
            default:
                return theme.gradients.primary;
        }
    };

    const getButtonHeight = () => {
        switch (size) {
            case 'small':
                return 40;
            case 'medium':
                return 52;
            case 'large':
                return 64;
            default:
                return 52;
        }
    };

    return (
        <Pressable
            {...pressableProps}
            style={({ pressed }) => [
                styles.container,
                { height: getButtonHeight() },
                { opacity: pressed ? 0.8 : 1 },
                style,
            ]}
        >
            <LinearGradient
                colors={getGradientColors()}
                start={theme.gradientPositions.horizontal.start}
                end={theme.gradientPositions.horizontal.end}
                style={styles.gradient}
            >
                <Text style={styles.text}>{title}</Text>
            </LinearGradient>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.borderRadius.button,
        overflow: 'hidden',
        ...theme.shadows.md,
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xxl,
    },
    text: {
        ...theme.textStyles.button,
        color: theme.colors.textInverse,
    },
});
