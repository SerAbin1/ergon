// Design tokens for Ergon app
export const colors = {
    // Primary palette
    primary: {
        50: '#E8F5E9',
        100: '#C8E6C9',
        200: '#A5D6A7',
        300: '#81C784',
        400: '#66BB6A',
        500: '#4CAF50', // Main brand color - Growth/Focus green
        600: '#43A047',
        700: '#388E3C',
        800: '#2E7D32',
        900: '#1B5E20',
    },

    // Accent for highlights
    accent: {
        50: '#E3F2FD',
        100: '#BBDEFB',
        200: '#90CAF9',
        300: '#64B5F6',
        400: '#42A5F5',
        500: '#2196F3',
        600: '#1E88E5',
        700: '#1976D2',
        800: '#1565C0',
        900: '#0D47A1',
    },

    // Semantic colors
    success: '#4CAF50',
    warning: '#FF9800',
    error: '#F44336',
    info: '#2196F3',

    // Neutral palette
    neutral: {
        0: '#FFFFFF',
        50: '#FAFAFA',
        100: '#F5F5F5',
        200: '#EEEEEE',
        300: '#E0E0E0',
        400: '#BDBDBD',
        500: '#9E9E9E',
        600: '#757575',
        700: '#616161',
        800: '#424242',
        900: '#212121',
        1000: '#000000',
    },
} as const;

export const spacing = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
} as const;

export const borderRadius = {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999,
} as const;

export const typography = {
    fontFamily: {
        regular: 'SpaceMono',
        mono: 'SpaceMono',
    },
    fontSize: {
        xs: 12,
        sm: 14,
        md: 16,
        lg: 18,
        xl: 24,
        xxl: 32,
        display: 48,
    },
    fontWeight: {
        regular: '400' as const,
        medium: '500' as const,
        semibold: '600' as const,
        bold: '700' as const,
    },
} as const;

// Theme definitions
export const lightTheme = {
    colors: {
        background: colors.neutral[0],
        surface: colors.neutral[50],
        surfaceElevated: colors.neutral[0],
        text: colors.neutral[900],
        textSecondary: colors.neutral[600],
        textTertiary: colors.neutral[500],
        border: colors.neutral[200],
        primary: colors.primary[500],
        primaryText: colors.neutral[0],
        accent: colors.accent[500],
    },
};

export const darkTheme = {
    colors: {
        background: colors.neutral[900],
        surface: colors.neutral[800],
        surfaceElevated: colors.neutral[700],
        text: colors.neutral[50],
        textSecondary: colors.neutral[400],
        textTertiary: colors.neutral[500],
        border: colors.neutral[700],
        primary: colors.primary[400],
        primaryText: colors.neutral[900],
        accent: colors.accent[400],
    },
};

export type Theme = typeof lightTheme;
