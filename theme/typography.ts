// Typography scale
export const typography = {
    // Font sizes
    fontSize: {
        xs: 10,
        sm: 12,
        base: 14,
        lg: 16,
        xl: 18,
        xxl: 20,
        xxxl: 24,
        huge: 28,
        massive: 32,
        giant: 40,
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

export type TextStyleKey = keyof typeof textStyles;
