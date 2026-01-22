import React from 'react';
import { Pressable, Text, StyleSheet, ViewStyle, PressableProps, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface CustomButtonProps extends Omit<PressableProps, 'style'> {
    title: string;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'small' | 'medium' | 'large';
    icon?: keyof typeof Ionicons.glyphMap;
    iconPosition?: 'left' | 'right';
    loading?: boolean;
    style?: ViewStyle;
}

export const CustomButton: React.FC<CustomButtonProps> = ({
    title,
    variant = 'primary',
    size = 'medium',
    icon,
    iconPosition = 'right',
    loading = false,
    style,
    disabled,
    ...pressableProps
}) => {
    const sizeStyles = {
        small: styles.buttonSmall,
        medium: styles.buttonMedium,
        large: styles.buttonLarge,
    };

    const getButtonStyle = () => {
        const baseStyle = [styles.button, sizeStyles[size]];

        switch (variant) {
            case 'primary':
                return [...baseStyle, styles.buttonPrimary];
            case 'secondary':
                return [...baseStyle, styles.buttonSecondary];
            case 'outline':
                return [...baseStyle, styles.buttonOutline];
            case 'ghost':
                return [...baseStyle, styles.buttonGhost];
            case 'danger':
                return [...baseStyle, styles.buttonDanger];
            default:
                return [...baseStyle, styles.buttonPrimary];
        }
    };

    const getTextStyle = () => {
        const baseStyle = [styles.text];

        switch (variant) {
            case 'primary':
                return [...baseStyle, styles.textDark];
            case 'danger':
                return [...baseStyle, styles.textPrimary];
            case 'secondary':
                return [...baseStyle, styles.textDark];
            case 'outline':
            case 'ghost':
                return [...baseStyle, styles.textOutline];
            default:
                return [...baseStyle, styles.textPrimary];
        }
    };

    return (
        <Pressable
            {...pressableProps}
            disabled={disabled || loading}
            style={({ pressed }) => [
                ...getButtonStyle(),
                { opacity: pressed || disabled ? 0.6 : 1 },
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={variant === 'primary' ? theme.colors.textPrimary : theme.colors.primary} />
            ) : (
                <>
                    {icon && iconPosition === 'left' && (
                        <Ionicons
                            name={icon}
                            size={24}
                            color={variant === 'primary' ? theme.colors.textDark : (variant === 'danger' ? theme.colors.textPrimary : theme.colors.primary)}
                            style={styles.iconLeft}
                        />
                    )}
                    <Text style={getTextStyle()}>{title}</Text>
                    {icon && iconPosition === 'right' && (
                        <Ionicons
                            name={icon}
                            size={24}
                            color={variant === 'primary' ? theme.colors.textDark : (variant === 'danger' ? theme.colors.textPrimary : theme.colors.primary)}
                            style={styles.iconRight}
                        />
                    )}
                </>
            )}
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: theme.borderRadius.button,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        ...theme.shadows.sm,
    },
    buttonSmall: {
        paddingHorizontal: theme.spacing.lg,
        height: 40,
    },
    buttonMedium: {
        paddingHorizontal: theme.spacing.xl,
        height: 52,
    },
    buttonLarge: {
        paddingHorizontal: theme.spacing.xxl,
        height: 64,
    },
    buttonPrimary: {
        backgroundColor: theme.colors.primary,
    },
    buttonSecondary: {
        backgroundColor: theme.colors.primaryLight,
    },
    buttonOutline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
    },
    buttonGhost: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.textPrimary,
    },
    buttonDanger: {
        backgroundColor: theme.colors.danger,
    },
    text: {
        ...theme.textStyles.button,
    },
    textPrimary: {
        color: theme.colors.textPrimary,
    },
    textDark: {
        color: theme.colors.textDark,
    },
    textOutline: {
        color: theme.colors.primary,
    },
    iconLeft: {
        marginRight: theme.spacing.sm,
    },
    iconRight: {
        marginLeft: theme.spacing.sm,
    },
});
