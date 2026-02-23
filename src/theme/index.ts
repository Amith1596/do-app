import { MD3LightTheme, configureFonts } from 'react-native-paper';

// "Warm Confidence" — Headspace calm + Nike bold
// Single typeface: Satoshi (Indian Type Foundry / Fontshare)
//
// Why Satoshi: Closest free alternative to Graphik (Commercial Type).
// Warm geometric with humanist touches — "calm confidence" energy.
// ADHD-friendly: clear letterforms, good x-height, rounded terminals.
// One family reduces visual noise — itself an anti-overwhelm design choice.

const palette = {
  // Primary action — warm orange (Headspace energy, used sparingly)
  sage: '#F97316',
  sageDark: '#EA580C',
  sageLight: '#FED7AA',
  sageSurface: '#FFF7ED',

  // Secondary accent — rose (electric)
  terracotta: '#F43F5E',
  terracottaLight: '#FFE4E6',

  // Warm foundations
  cream: '#FAF5EF',
  warmWhite: '#FFFBF7',
  sand: '#F3EDE5',
  sandDark: '#E7E5E4',

  // Text — Nike-bold hierarchy (near-black to barely-there)
  inkDark: '#1C1917',
  inkMedium: '#57534E',
  inkLight: '#A8A29E',
  inkFaint: '#D6D3D1',

  // Functional
  golden: '#F59E0B',
  goldenLight: '#FFFBEB',
  roseError: '#EF4444',
  roseErrorLight: '#FEF2F2',
  successGreen: '#22C55E',

  // === Extended tokens ===

  // Energy states
  energyLow: '#818CF8',
  energyLowBg: '#EEF2FF',
  energyLowText: '#4338CA',
  energySteady: '#F97316',
  energySteadyBg: '#FFF7ED',
  energySteadyText: '#C2410C',
  energyWired: '#F43F5E',
  energyWiredBg: '#FFF1F2',
  energyWiredText: '#BE123C',

  // Energy-reactive screen backgrounds (very diluted — atmospheric, not distracting)
  // Low: soft lavender — calming, "it's okay to go slow"
  energyScreenLow: '#EEEDF5',
  // Steady: warm cream — balanced, productive focus (matches default)
  energyScreenSteady: '#FAF5EF',
  // Wired: subtle warm rose — channels high energy into action
  energyScreenWired: '#F9EDEB',

  // Difficulty badges
  diffEasy: '#BBF7D0',
  diffEasyText: '#166534',
  diffMedium: '#FDE68A',
  diffMediumText: '#92400E',
  diffHard: '#FECACA',
  diffHardText: '#991B1B',

  // Borders
  border: 'rgba(28, 25, 23, 0.08)',
  borderStrong: 'rgba(28, 25, 23, 0.15)',
};

// Satoshi — single typeface family, all weights
export const fonts = {
  light: 'Satoshi-Light',
  regular: 'Satoshi-Regular',
  medium: 'Satoshi-Medium',
  bold: 'Satoshi-Bold',
  black: 'Satoshi-Black',
};

// Spacing scale (8px base)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

// Border radius scale
export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 999,
};

// Shadow presets — warm-tinted shadows for depth without coldness
export const shadows = {
  soft: {
    shadowColor: '#78716C',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 1,
  },
  medium: {
    shadowColor: '#78716C',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  lifted: {
    shadowColor: '#78716C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 5,
  },
};

// Typography config for React Native Paper MD3
// Satoshi everywhere — weight contrast creates hierarchy, not font-switching
const fontConfig = {
  // Display — Black/Bold (the big dramatic numbers and titles)
  displayLarge: {
    fontFamily: fonts.black,
    fontWeight: '900' as const,
  },
  displayMedium: {
    fontFamily: fonts.bold,
    fontWeight: '700' as const,
  },
  displaySmall: {
    fontFamily: fonts.bold,
    fontWeight: '700' as const,
  },

  // Headlines — Bold
  headlineLarge: {
    fontFamily: fonts.bold,
    fontWeight: '700' as const,
  },
  headlineMedium: {
    fontFamily: fonts.bold,
    fontWeight: '700' as const,
  },
  headlineSmall: {
    fontFamily: fonts.medium,
    fontWeight: '500' as const,
  },

  // Titles — Medium/Bold
  titleLarge: {
    fontFamily: fonts.bold,
    fontWeight: '700' as const,
  },
  titleMedium: {
    fontFamily: fonts.medium,
    fontWeight: '500' as const,
  },
  titleSmall: {
    fontFamily: fonts.medium,
    fontWeight: '500' as const,
  },

  // Body — Regular
  bodyLarge: {
    fontFamily: fonts.regular,
    fontWeight: '400' as const,
  },
  bodyMedium: {
    fontFamily: fonts.regular,
    fontWeight: '400' as const,
  },
  bodySmall: {
    fontFamily: fonts.regular,
    fontWeight: '400' as const,
  },

  // Labels — Medium
  labelLarge: {
    fontFamily: fonts.medium,
    fontWeight: '500' as const,
  },
  labelMedium: {
    fontFamily: fonts.medium,
    fontWeight: '500' as const,
  },
  labelSmall: {
    fontFamily: fonts.medium,
    fontWeight: '500' as const,
  },
};

export const lightTheme = {
  ...MD3LightTheme,
  roundness: 12,
  fonts: configureFonts({ config: fontConfig }),
  colors: {
    ...MD3LightTheme.colors,
    // Core — orange primary for CTAs
    primary: palette.sage,
    onPrimary: '#FFFFFF',
    primaryContainer: palette.sageLight,
    onPrimaryContainer: palette.sageDark,

    // Secondary — rose accent
    secondary: palette.terracotta,
    onSecondary: '#FFFFFF',
    secondaryContainer: palette.terracottaLight,
    onSecondaryContainer: '#9F1239',

    // Tertiary — amber
    tertiary: palette.golden,
    onTertiary: '#FFFFFF',
    tertiaryContainer: palette.goldenLight,
    onTertiaryContainer: '#78350F',

    // Background & Surface
    background: palette.cream,
    onBackground: palette.inkDark,
    surface: palette.warmWhite,
    onSurface: palette.inkDark,
    surfaceVariant: palette.sand,
    onSurfaceVariant: palette.inkMedium,
    surfaceDisabled: palette.sandDark,
    onSurfaceDisabled: palette.inkFaint,

    // Elevation overlays
    elevation: {
      level0: 'transparent',
      level1: palette.warmWhite,
      level2: palette.cream,
      level3: palette.sand,
      level4: palette.sandDark,
      level5: palette.sandDark,
    },

    // Outline
    outline: palette.borderStrong,
    outlineVariant: palette.border,

    // Error
    error: palette.roseError,
    onError: '#FFFFFF',
    errorContainer: palette.roseErrorLight,
    onErrorContainer: '#7F1D1D',

    // Inverse
    inverseSurface: palette.inkDark,
    inverseOnSurface: '#FAFAF9',
    inversePrimary: palette.sageLight,
  },
};

// Export palette for direct use in components
export { palette };
