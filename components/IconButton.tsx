import React from 'react';
import { Pressable, StyleSheet, ViewStyle, PressableProps } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../theme';

interface IconButtonProps extends Omit<PressableProps, 'style'> {
    icon: React.ReactNode;
    variant?: 'gradient' | 'white' | 'dark';
    size?: 'small' | 'medium' | 'large';
    style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
    icon,
    variant = 'gradient',
    size = 'medium',
    style,
    ...pressableProps
}) => {
    const getSize = () => {
        switch (size) {
            case 'small':
                return 36;
            case 'medium':
                return 48;
            case 'large':
                return 64;
            default:
                return 48;
        }
    };

    const buttonSize = getSize();

    if (variant === 'gradient') {
        return (
            <Pressable
                {...pressableProps}
                style={({ pressed }) => [
                    { opacity: pressed ? 0.7 : 1 },
                    style,
                ]}
            >
                <LinearGradient
                    colors={theme.gradients.primary}
                    start={theme.gradientPositions.diagonal.start}
                    end={theme.gradientPositions.diagonal.end}
                    style={[
                        styles.container,
                        { width: buttonSize, height: buttonSize },
                    ]}
                >
                    {icon}
                </LinearGradient>
            </Pressable>
        );
    }

    return (
        <Pressable
            {...pressableProps}
            style={({ pressed }) => [
                styles.container,
                {
                    width: buttonSize,
                    height: buttonSize,
                    backgroundColor: variant === 'white' ? theme.colors.surface : theme.colors.dark,
                    opacity: pressed ? 0.7 : 1,
                },
                style,
            ]}
        >
            {icon}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: theme.radius.full,
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.base,
    },
});
