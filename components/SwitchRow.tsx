import React from 'react';
import { View, Text, StyleSheet, Switch, ViewStyle } from 'react-native';
import { theme } from '../theme';

interface SwitchRowProps {
    title: string;
    description?: string;
    value: boolean;
    onValueChange: (value: boolean) => void;
    style?: ViewStyle;
}

export const SwitchRow: React.FC<SwitchRowProps> = ({
    title,
    description,
    value,
    onValueChange,
    style,
}) => {
    return (
        <View style={[styles.container, style]}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{title}</Text>
                {description && <Text style={styles.description}>{description}</Text>}
            </View>
            <Switch
                value={value}
                onValueChange={onValueChange}
                trackColor={{
                    false: theme.colors.gray700,
                    true: theme.colors.greenPrimary,
                }}
                thumbColor={value ? theme.colors.textPrimary : theme.colors.gray400}
                ios_backgroundColor={theme.colors.gray700}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.borderGlass,
    },
    textContainer: {
        flex: 1,
        marginRight: theme.spacing.md,
    },
    title: {
        ...theme.textStyles.body,
        color: theme.colors.textPrimary,
        fontWeight: '500',
        fontSize: 15,
    },
    description: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        marginTop: 2,
        fontSize: 12,
    },
});
