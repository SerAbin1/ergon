/**
 * Design Tokens - M3 Expressive Dark Theme
 *
 * Blue & Black color scheme with M3 design system.
 * Dark mode exclusive with desaturated accents for accessibility.
 */

// M3 Dark Theme Color Palette - Blue & Black
export const colors = {
    // Surface colors - pure black to dark grey
    surface: {
        dim: '#000000',         // Pure black base
        default: '#0A0A0C',     // Near-black
        bright: '#121216',      // Subtle elevation
        container: '#1A1A1F',   // Container surface
        containerHigh: '#232329', // High container
        containerHighest: '#2D2D33', // Highest container
    },

    // Primary - Electric Blue (desaturated for dark theme)
    primary: {
        main: '#82B1FF',        // Primary color (A100 blue)
        onPrimary: '#002F6C',   // Text on primary
        container: '#004494',   // Primary container
        onContainer: '#D1E4FF', // Text on container
    },

    // Secondary - Soft blue-grey
    secondary: {
        main: '#B8C8DC',        // Secondary
        onSecondary: '#233140',
        container: '#394758',
        onContainer: '#D4E3F8',
    },

    // Tertiary - Violet accent
    tertiary: {
        main: '#CAC1FF',        // Tertiary
        onTertiary: '#312B54',
        container: '#48416C',
        onContainer: '#E6DEFF',
    },

    // Error state
    error: {
        main: '#FFB4AB',
        onError: '#690005',
        container: '#93000A',
        onContainer: '#FFDAD6',
    },

    // Text colors
    text: {
        primary: '#E4E2E6',     // High emphasis
        secondary: '#C6C5CA',   // Medium emphasis
        tertiary: '#8E8E93',    // Low emphasis / disabled
        inverse: '#1B1B1F',     // Text on light surfaces
    },

    // Outline colors
    outline: {
        default: '#8E8E93',
        variant: '#44444A',
    },

    // Semantic
    success: '#81C784',
    warning: '#FFB74D',
    info: '#64B5F6',
} as const;

// Spacing scale (4px base)
export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
    xxxl: 64,
} as const;

// Border radius - M3 expressive
export const borderRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 28,
    full: 9999,
} as const;

// Typography - Premium fonts
export const typography = {
    fontFamily: {
        display: 'Inter',
        body: 'Inter',
        mono: 'JetBrainsMono',
    },
    fontSize: {
        displayLarge: 57,
        displayMedium: 45,
        displaySmall: 36,
        headlineLarge: 32,
        headlineMedium: 28,
        headlineSmall: 24,
        titleLarge: 22,
        titleMedium: 16,
        titleSmall: 14,
        bodyLarge: 16,
        bodyMedium: 14,
        bodySmall: 12,
        labelLarge: 14,
        labelMedium: 12,
        labelSmall: 11,
    },
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },
    letterSpacing: {
        tight: -0.5,
        normal: 0,
        wide: 0.5,
        wider: 1,
    },
    lineHeight: {
        tight: 1.2,
        normal: 1.5,
        relaxed: 1.75,
    },
} as const;

// Elevation using tonal overlays (M3 style)
export const elevation = {
    level0: 'transparent',
    level1: 'rgba(130, 177, 255, 0.05)',  // Blue tint
    level2: 'rgba(130, 177, 255, 0.08)',
    level3: 'rgba(130, 177, 255, 0.11)',
    level4: 'rgba(130, 177, 255, 0.12)',
    level5: 'rgba(130, 177, 255, 0.14)',
} as const;

// Single theme export (dark only)
export const theme = {
    colors,
    spacing,
    borderRadius,
    typography,
    elevation,
} as const;

export type Theme = typeof theme;
