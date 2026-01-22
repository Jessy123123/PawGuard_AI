// Consistent spacing scale
export const spacing = {
    xxs: 2,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    huge: 40,
    massive: 48,
    giant: 64,
};

// Common layout values
export const layout = {
    screenPadding: spacing.xl,
    cardPadding: spacing.lg,
    buttonPadding: spacing.md,
    iconSize: spacing.xxl,
    iconSizeLarge: spacing.xxxl,
    iconSizeSmall: spacing.lg,
};

export type SpacingKey = keyof typeof spacing;
