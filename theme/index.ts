// Export all theme modules
import { colors } from './colors';
import type { ColorKey } from './colors';

import { spacing, layout } from './spacing';
import type { SpacingKey } from './spacing';

import { typography, textStyles, normalize } from './typography';
import type { TextStyleKey } from './typography';

import { radius, borderRadius } from './radius';
import type { RadiusKey } from './radius';

import { shadows, coloredShadows } from './shadows';
import type { ShadowKey, ColoredShadowKey } from './shadows';

// Re-export all modules
export { colors };
export type { ColorKey };

export { spacing, layout };
export type { SpacingKey };

export { typography, textStyles, normalize };
export type { TextStyleKey };

export { radius, borderRadius };
export type { RadiusKey };

export { shadows, coloredShadows };
export type { ShadowKey, ColoredShadowKey };

// Unified theme object
export const theme = {
    colors: colors,
    spacing: spacing,
    layout: layout,
    typography: typography,
    textStyles: textStyles,
    normalize: normalize,
    radius: radius,
    borderRadius: borderRadius,
    shadows: shadows,
    coloredShadows: coloredShadows,
} as const;

export type Theme = typeof theme;
