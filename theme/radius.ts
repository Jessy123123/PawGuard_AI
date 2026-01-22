// Border radius scale
export const radius = {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    full: 9999,  // For circular elements
};

// Common usage patterns
export const borderRadius = {
    button: radius.xl,
    card: radius.xxl,
    input: radius.lg,
    badge: radius.full,
    modal: radius.xxl,
    small: radius.md,
};

export type RadiusKey = keyof typeof radius;
