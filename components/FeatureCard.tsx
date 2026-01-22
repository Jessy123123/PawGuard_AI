import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ViewStyle, ImageSourcePropType } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

interface FeatureCardProps {
    title: string;
    description: string;
    buttonText: string;
    icon: keyof typeof Ionicons.glyphMap;
    iconColor?: string;
    image?: ImageSourcePropType;
    imageUri?: string;
    onPress?: () => void;
    style?: ViewStyle;
    variant?: 'light' | 'dark';
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
    title,
    description,
    buttonText,
    icon,
    iconColor = theme.colors.greenPrimary,
    image,
    imageUri,
    onPress,
    style,
    variant = 'light',
}) => {
    const isLight = variant === 'light';

    return (
        <View style={[
            styles.container,
            isLight ? styles.containerLight : styles.containerDark,
            theme.shadows.md,
            style,
        ]}>
            <View style={styles.content}>
                {/* Icon Badge */}
                <View style={[
                    styles.iconBadge,
                    { backgroundColor: isLight ? 'rgba(45, 122, 94, 0.1)' : theme.colors.glassLight }
                ]}>
                    <Ionicons name={icon} size={20} color={iconColor} />
                </View>

                {/* Text Content */}
                <Text style={[
                    styles.title,
                    { color: isLight ? theme.colors.textDark : theme.colors.textPrimary }
                ]}>
                    {title}
                </Text>
                <Text style={[
                    styles.description,
                    { color: isLight ? theme.colors.textMuted : theme.colors.textSecondary }
                ]}>
                    {description}
                </Text>

                {/* Action Button */}
                <Pressable onPress={onPress} style={({ pressed }) => [{ opacity: pressed ? 0.8 : 1 }]}>
                    <LinearGradient
                        colors={[theme.colors.greenPrimary, theme.colors.greenLight]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </LinearGradient>
                </Pressable>
            </View>

            {/* Image */}
            {(image || imageUri) && (
                <View style={styles.imageContainer}>
                    <Image
                        source={image || { uri: imageUri }}
                        style={styles.image}
                        resizeMode="cover"
                    />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderRadius: theme.borderRadius.card,
        padding: theme.spacing.lg,
        marginBottom: theme.spacing.md,
        overflow: 'hidden',
    },
    containerLight: {
        backgroundColor: '#F5F5F0',
    },
    containerDark: {
        backgroundColor: theme.colors.surface,
        borderWidth: 1,
        borderColor: theme.colors.borderGlass,
    },
    content: {
        flex: 1,
        paddingRight: theme.spacing.md,
    },
    iconBadge: {
        width: 40,
        height: 40,
        borderRadius: theme.radius.md,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    title: {
        ...theme.textStyles.h4,
        fontWeight: 'bold',
        marginBottom: theme.spacing.xs,
    },
    description: {
        ...theme.textStyles.body,
        fontSize: 13,
        lineHeight: 18,
        marginBottom: theme.spacing.md,
    },
    button: {
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.sm,
        borderRadius: theme.radius.full,
        alignSelf: 'flex-start',
    },
    buttonText: {
        ...theme.textStyles.button,
        color: theme.colors.textPrimary,
        fontSize: 13,
        fontWeight: '600',
    },
    imageContainer: {
        width: 120,
        height: 140,
        borderRadius: theme.radius.lg,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
