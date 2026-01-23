import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, ImageBackground, ImageSourcePropType } from 'react-native';
import { colors } from '../theme/colors';
import { minimalistShadows } from '../theme/shadows';
import { spacing } from '../theme/spacing';

interface FloatingCardProps {
    children: ReactNode;
    style?: ViewStyle;
    backgroundColor?: string;
    padding?: 'small' | 'medium' | 'large';
    shadow?: 'soft' | 'medium' | 'hover';
    imageSource?: ImageSourcePropType;
    imageHeight?: number;
}

export const FloatingCard: React.FC<FloatingCardProps> = ({
    children,
    style,
    backgroundColor = colors.minimalist.white,
    padding = 'medium',
    shadow = 'soft',
    imageSource,
    imageHeight = 200,
}) => {
    const paddingMap = {
        small: spacing.md,
        medium: spacing.lg,
        large: spacing.xl,
    };

    const shadowMap = {
        soft: minimalistShadows.cardSoft,
        medium: minimalistShadows.cardMedium,
        hover: minimalistShadows.cardHover,
    };

    const cardStyle = [
        styles.card,
        { backgroundColor },
        shadowMap[shadow],
        { padding: paddingMap[padding] },
        style,
    ];

    if (imageSource) {
        return (
            <View style={cardStyle}>
                <ImageBackground
                    source={imageSource}
                    style={[styles.image, { height: imageHeight }]}
                    imageStyle={styles.imageStyle}
                />
                {children}
            </View>
        );
    }

    return <View style={cardStyle}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        borderRadius: 20,
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        marginBottom: spacing.md,
        marginTop: -spacing.lg,
        marginHorizontal: -spacing.lg,
    },
    imageStyle: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});
