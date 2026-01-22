// PawGuard AI Color Palette (Forest Theme)
export const colors = {
  // Primary colors (Neon Green Accent)
  primary: '#00E07C',        // Vibrant Neon Green
  primaryDark: '#00B363',    // Darker Green
  primaryLight: '#4ADE80',   // Light Green

  // Background colors
  background: '#042F24',     // Deep Forest Green
  backgroundLight: '#064E3B', // Slightly lighter forest green
  surface: '#FFFFFF',        // Pure White (for light cards)
  surfaceDark: '#064E3B',    // Dark Green (for dark cards)

  // Card & surface colors
  cardBackground: '#FFFFFF',
  overlay: 'rgba(0, 0, 0, 0.5)',

  // Text colors
  textPrimary: '#FFFFFF',    // White for dark backgrounds
  textSecondary: '#A1A1AA',  // Light Gray
  textTertiary: '#D1D5DB',   // Gray
  textDark: '#042F24',       // Dark Green (for light backgrounds)
  textLight: '#F3F4F6',      // Light gray

  // Status colors
  success: '#00E07C',        // Matching primary
  warning: '#FBBF24',
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
  iconGreen: '#DCFCE7',
  iconGreenDark: '#166534',
  iconPink: '#FCE7F3',
  iconPinkDark: '#DB2777',

  // Transparent overlays
  blackOverlay: 'rgba(0, 0, 0, 0.6)',
  whiteOverlay: 'rgba(255, 255, 255, 0.9)',
};

export type ColorKey = keyof typeof colors;
