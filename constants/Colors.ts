/**
 * Color Constants - M3 Dark Theme Only
 *
 * Used by React Navigation theming.
 * Maps to our M3 design tokens.
 */
import { colors } from '@/src/theme/tokens';

// Dark theme only (no light theme)
export default {
  light: {
    // Fallback to dark colors for consistency
    text: colors.text.primary,
    background: colors.surface.dim,
    tint: colors.primary.main,
    tabIconDefault: colors.text.tertiary,
    tabIconSelected: colors.primary.main,
  },
  dark: {
    text: colors.text.primary,
    background: colors.surface.dim,
    tint: colors.primary.main,
    tabIconDefault: colors.text.tertiary,
    tabIconSelected: colors.primary.main,
  },
};
