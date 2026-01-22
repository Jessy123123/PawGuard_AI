// PawGuard AI Color Palette
export const colors = {
  // Primary colors (green theme)
  primary: '#10B981',        // Emerald green
  primaryDark: '#047857',    // Dark teal
  primaryLight: '#34D399',   // Light green

  // Background colors
  background: '#064E3B',     // Deep teal background
  backgroundLight: '#065F46', // Lighter teal
  surface: '#FFFFFF',
  surfaceDark: '#0F766E',    // Teal surface

  // Card & surface colors
  cardBackground: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text colors
  textPrimary: '#FFFFFF',    // White for dark backgrounds
  textSecondary: '#9CA3AF',  // Gray
  textTertiary: '#6B7280',   // Darker gray
  textDark: '#1F2937',       // For light backgrounds
  textLight: '#F3F4F6',      // Light gray

  // Status colors
  success: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  error: '#EF4444',
  info: '#3B82F6',

  // Specific use colors
  critical: '#EF4444',
  review: '#F59E0B',
  active: '#3B82F6',

  // Neutral tones
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

  // Icon backgrounds
  iconRed: '#FEE2E2',
  iconRedDark: '#DC2626',
  iconYellow: '#FEF3C7',
  iconYellowDark: '#D97706',
  iconBlue: '#DBEAFE',
  iconBlueDark: '#2563EB',
  iconGreen: '#D1FAE5',
  iconGreenDark: '#059669',
  iconPink: '#FCE7F3',
  iconPinkDark: '#DB2777',

  // Transparent overlays
  blackOverlay: 'rgba(0, 0, 0, 0.6)',
  whiteOverlay: 'rgba(255, 255, 255, 0.9)',
};

export type ColorKey = keyof typeof colors;
