// Fintech-style Dark Theme Color Palette
export const colors = {
  // Base colors - Deep charcoal and dark green
  background: '#065645',        // Dark green from HTML
  backgroundAlt: '#05483A',     // Slightly darker
  surface: '#FFFFFF',           // White cards
  surfaceAlt: '#F9FBF9',        // Light background from HTML
  surfaceDark: '#0B3B2D',       // Dark green surface for dark mode equivalents

  // Glassmorphism overlays
  glassLight: 'rgba(26, 47, 42, 0.6)',
  glassDark: 'rgba(15, 20, 25, 0.8)',
  glassAccent: 'rgba(255, 180, 162, 0.1)',

  // Gradient colors
  peach: '#FFB4A2',
  coral: '#FF8882',
  softOrange: '#FFA07A',
  lightTeal: '#6DD5D5',
  mint: '#89E4D2',
  roseGold: '#FFB6C1',
  sunset: '#FF8A95',

  // Primary gradient (warm)
  gradientStart: '#FFB4A2',
  gradientMid: '#FF8882',
  gradientEnd: '#FFA07A',

  // Secondary gradient (cool)
  gradientCoolStart: '#6DD5D5',
  gradientCoolEnd: '#89E4D2',

  // Text colors - High contrast
  textPrimary: '#FFFFFF',       // Pure white
  textSecondary: '#B8C5D0',     // Light gray
  textMuted: '#6B7A8F',         // Soft gray
  textAccent: '#FFB4A2',        // Warm accent
  textInverse: '#FFFFFF',
  textDark: '#0F1419',          // Dark text for light backgrounds

  // Green accent colors (for feature cards and highlights)
  greenPrimary: '#2D7A5E',      // Primary green
  greenLight: '#3D9A7E',        // Lighter green
  greenDark: '#1A4D3E',         // Dark green
  greenSurface: '#1E5545',      // Green surface

  // Glass borders
  borderGlass: 'rgba(255, 255, 255, 0.1)',
  borderGlassHover: 'rgba(255, 255, 255, 0.2)',
  borderGradient: 'rgba(255, 180, 162, 0.3)',

  // Status colors
  primary: '#40bf75',
  success: '#4ECDC4',
  warning: '#FFB347',
  danger: '#FF6B9D',
  info: '#6DD5D5',

  // Overlay & backdrop
  overlay: 'rgba(0, 0, 0, 0.7)',
  backdropBlur: 'rgba(15, 20, 25, 0.95)',

  // Accent colors for icons
  iconPeach: '#FFB4A2',
  iconCoral: '#FF8882',
  iconTeal: '#6DD5D5',
  iconMint: '#89E4D2',
  iconRose: '#FFB6C1',

  // Neutral grays
  gray50: '#F9FAFB',
  gray100: '#F3F4F6',
  gray200: '#E5E7EB',
  gray300: '#D1D5DB',
  gray400: '#9CA3AF',
  gray500: '#6B7280',
  gray600: '#4B5563',
  gray700: '#374151',
  gray800: '#1F2937',
  gray900: '#111827',

  // Minimalist Theme Colors (for new UI redesign)
  minimalist: {
    white: '#FFFFFF',
    offWhite: '#FAFAF9',
    bgLight: '#F9FAFB',

    // Warm accents
    coral: '#F5A491',
    orange: '#E89B6D',
    yellow: '#F4D79B',
    peachLight: '#FFE5DB',

    // Neutral tones
    textDark: '#1F2937',
    textMedium: '#4B5563',
    textLight: '#9CA3AF',

    // Status colors (muted)
    green: '#86EFAC',
    greenDark: '#4ADE80',
    blue: '#93C5FD',
    blueDark: '#60A5FA',
    red: '#FCA5A5',
    redDark: '#F87171',
  },
};

// Gradient definitions
export const gradients = {
  primary: [colors.peach, colors.coral, colors.softOrange],
  secondary: [colors.lightTeal, colors.mint],
  tertiary: [colors.roseGold, colors.sunset],
  warm: [colors.peach, colors.softOrange],
  cool: [colors.lightTeal, colors.mint],
  accent: [colors.coral, colors.sunset],
  glass: ['rgba(255, 180, 162, 0.15)', 'rgba(109, 213, 213, 0.15)'],
};

// Gradient positions for LinearGradient
export const gradientPositions = {
  horizontal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
  diagonalAlt: { start: { x: 1, y: 0 }, end: { x: 0, y: 1 } },
  radial: { start: { x: 0.5, y: 0.5 }, end: { x: 1, y: 1 } },
};

export type ColorKey = keyof typeof colors;
export type GradientKey = keyof typeof gradients;
