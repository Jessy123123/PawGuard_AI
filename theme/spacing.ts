// Increased spacing for mobile-first, touch-optimized design
export const spacing = {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 16,
    lg: 20,
    xl: 24,
    xxl: 32,
    xxxl: 40,
    giant: 48,
    mega: 64,
} as const;

// Layout constants - increased for better mobile UX
export const layout = {
    screenPadding: spacing.xl,      // 24px
    cardPadding: spacing.lg,        // 20px
    sectionSpacing: spacing.xxxl,   // 40px
    iconSize: 24,
    iconSizeLarge: 32,
    minTouchTarget: 48,             // Minimum touch target size
    headerHeight: 60,
    tabBarHeight: 70,
} as const;

export type SpacingKey = keyof typeof spacing;
