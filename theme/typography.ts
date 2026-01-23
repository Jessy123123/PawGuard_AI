import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Based on standard ~5" screen mobile device
const bScale = SCREEN_WIDTH / 375;

export function normalize(size: number) {
    const newSize = size * bScale;
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
}

// Typography scale (Dynamically Scaled)
export const typography = {
    // Font sizes (optimized for mobile)
    fontSize: {
        xs: normalize(14),
        sm: normalize(16),
        base: normalize(18),
        lg: normalize(20),
        xl: normalize(24),
        xxl: normalize(26),
        xxxl: normalize(30),
        huge: normalize(36),
        massive: normalize(40),
        giant: normalize(48),
    },

    // Font weights
    fontWeight: {
        light: '300' as const,
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
        extrabold: '800' as const,
    },

    // Line heights
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
};

// Predefined text styles
export const textStyles = {
    h1: {
        fontSize: typography.fontSize.giant,
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
    },
    h2: {
        fontSize: typography.fontSize.massive,
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight,
    },
    h3: {
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.tight,
    },
    h4: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal,
    },
    body: {
        fontSize: typography.fontSize.base,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },
    bodyLarge: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },
    caption: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },
    small: {
        fontSize: typography.fontSize.xs,
        fontWeight: typography.fontWeight.regular,
        lineHeight: typography.lineHeight.normal,
    },
    button: {
        fontSize: typography.fontSize.lg,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.tight,
    },
    label: {
        fontSize: typography.fontSize.sm,
        fontWeight: typography.fontWeight.medium,
        lineHeight: typography.lineHeight.normal,
    },
};

// Minimalist serif typography (Playfair Display)
export const serifTextStyles = {
    serifHero: {
        fontSize: typography.fontSize.giant,
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight * typography.fontSize.giant,
    },
    serifHeading: {
        fontSize: typography.fontSize.xxxl,
        fontWeight: typography.fontWeight.bold,
        lineHeight: typography.lineHeight.tight * typography.fontSize.xxxl,
    },
    serifSubheading: {
        fontSize: typography.fontSize.xxl,
        fontWeight: typography.fontWeight.semibold,
        lineHeight: typography.lineHeight.normal * typography.fontSize.xxl,
    },
};

export type TextStyleKey = keyof typeof textStyles;
export type SerifStyleKey = keyof typeof serifTextStyles;
