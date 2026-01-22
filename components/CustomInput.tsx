import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface CustomInputProps extends TextInputProps {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
    error?: string;
}

export const CustomInput: React.FC<CustomInputProps> = ({
    label,
    icon,
    error,
    secureTextEntry,
    ...props
}) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const isPassword = secureTextEntry;

    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <View style={[styles.inputContainer, error && styles.inputContainerError]}>
                {icon && (
                    <Ionicons
                        name={icon}
                        size={24}
                        color={theme.colors.textTertiary}
                        style={styles.icon}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholderTextColor={theme.colors.textTertiary}
                    secureTextEntry={isPassword && !isPasswordVisible}
                    {...props}
                />
                {isPassword && (
                    <Pressable
                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                        style={styles.eyeIcon}
                    >
                        <Ionicons
                            name={isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                            size={24}
                            color={theme.colors.textTertiary}
                        />
                    </Pressable>
                )}
            </View>
            {error && <Text style={styles.error}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: theme.spacing.lg,
    },
    label: {
        ...theme.textStyles.label,
        color: theme.colors.textPrimary,
        marginBottom: theme.spacing.xs,
        textTransform: 'uppercase',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.input,
        paddingHorizontal: theme.spacing.md,
        height: 52,
    },
    inputContainerError: {
        borderWidth: 1,
        borderColor: theme.colors.error,
    },
    icon: {
        marginRight: theme.spacing.sm,
    },
    input: {
        flex: 1,
        ...theme.textStyles.body,
        color: theme.colors.textDark,
    },
    eyeIcon: {
        padding: theme.spacing.xs,
    },
    error: {
        ...theme.textStyles.caption,
        color: theme.colors.error,
        marginTop: theme.spacing.xs,
    },
});
