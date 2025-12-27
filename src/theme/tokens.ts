/**
 * Design Tokens - Material 3 Expressive Dark Theme
 *
 * Dark mode exclusive with M3 color system and premium typography.
 * Uses desaturated accent colors for accessibility (WCAG AA).
 */

// M3 Dark Theme Color Palette
export const colors = {
    // Surface colors - dark greys with subtle elevation
    surface: {
        dim: '#0E0E11',        // Lowest surface
        default: '#141417',     // Base surface (#121212 equivalent)
        bright: '#1A1A1F',      // Elevated surface
        container: '#1F1F24',   // Container surface
        containerHigh: '#29292E', // High container
        containerHighest: '#333338', // Highest container
    },

    // Primary - Teal/Cyan (desaturated for dark theme)
    primary: {
        main: '#80CBC4',        // Primary color (tonal 200)
        onPrimary: '#003731',   // Text on primary
        container: '#004D43',   // Primary container
        onContainer: '#A7F3EC', // Text on container
    },

    // Secondary - Soft violet
    secondary: {
        main: '#CCC2DC',        // Secondary (tonal 200)
        onSecondary: '#332D41',
        container: '#4A4458',
        onContainer: '#E8DEF8',
    },

    // Tertiary - Warm rose
    tertiary: {
        main: '#EFB8C8',        // Tertiary (tonal 200)
        onTertiary: '#492532',
        container: '#633B48',
        onContainer: '#FFD8E4',
    },

    // Error state
    error: {
        main: '#F2B8B5',
        onError: '#601410',
        container: '#8C1D18',
        onContainer: '#F9DEDC',
    },

    // Text colors
    text: {
        primary: '#E6E1E5',     // High emphasis
        secondary: '#CAC4D0',   // Medium emphasis
        tertiary: '#938F99',    // Low emphasis / disabled
        inverse: '#1C1B1F',     // Text on light surfaces
    },

    // Outline colors
    outline: {
        default: '#938F99',
        variant: '#49454F',
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

// Border radius - M3 uses larger radii for expressive feel
export const borderRadius = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 28,
    full: 9999,
} as const;

// Typography - Premium fonts for expressive design
export const typography = {
    fontFamily: {
        display: 'Inter',       // Headlines & display text
        body: 'Inter',          // Body text
        mono: 'JetBrainsMono',  // Code & timer
    },
    fontSize: {
        // Display sizes
        displayLarge: 57,
        displayMedium: 45,
        displaySmall: 36,
        // Headline sizes
        headlineLarge: 32,
        headlineMedium: 28,
        headlineSmall: 24,
        // Title sizes
        titleLarge: 22,
        titleMedium: 16,
        titleSmall: 14,
        // Body sizes
        bodyLarge: 16,
        bodyMedium: 14,
        bodySmall: 12,
        // Label sizes
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
    level1: 'rgba(208, 188, 255, 0.05)',  // Subtle primary tint
    level2: 'rgba(208, 188, 255, 0.08)',
    level3: 'rgba(208, 188, 255, 0.11)',
    level4: 'rgba(208, 188, 255, 0.12)',
    level5: 'rgba(208, 188, 255, 0.14)',
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
