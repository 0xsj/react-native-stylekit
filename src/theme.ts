import { ColorValue, DimensionValue } from 'react-native';

export const defaultTheme = {
  colors: {
    light: {
      background: "#FFFFFF",
      foreground: "#000000",
      surface: "#f4f4f5",
      surfaceHover: "#e4e4e7",
      border: "#d4d4d8",
      borderHover: "#a1a1aa",
      muted: "#71717a",
      primary: "#2563eb",
      primaryHover: "#1d4ed8",
      success: "#16a34a",
      warning: "#ca8a04",
      error: "#dc2626",
      info: "#0891b2",
    },
    dark: {
      background: "#000000",
      foreground: "#FFFFFF",
      surface: "#27272a",
      surfaceHover: "#3f3f46",
      border: "#52525b",
      borderHover: "#71717a",
      muted: "#a1a1aa",
      primary: "#3b82f6",
      primaryHover: "#60a5fa",
      success: "#22c55e",
      warning: "#eab308",
      error: "#ef4444",
      info: "#06b6d4",
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  radii: {
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },
  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 20,
      xxl: 40,
    },
    weights: {
      regular: "400",
      medium: "500",
      semibold: "600",
      bold: "700",
    },
  },
} as const;

export type Theme = typeof defaultTheme;
export type ColorKeys = keyof typeof defaultTheme.colors.light;
export type ThemeColors = typeof defaultTheme.colors.light;
export type SpacingKeys = keyof typeof defaultTheme.spacing;
export type RadiiKeys = keyof typeof defaultTheme.radii;
export type FontSizeKeys = keyof typeof defaultTheme.typography.sizes;
export type FontWeightKeys = keyof typeof defaultTheme.typography.weights;

// Style token types
export interface StyleTokens {
  w?: DimensionValue;
  h?: DimensionValue;
  minW?: DimensionValue;
  maxW?: DimensionValue;
  minH?: DimensionValue;
  maxH?: DimensionValue;
  pos?: "relative" | "absolute";
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
  z?: number;
  m?: SpacingKeys | number;
  mt?: SpacingKeys | number;
  mr?: SpacingKeys | number;
  mb?: SpacingKeys | number;
  ml?: SpacingKeys | number;
  mx?: SpacingKeys | number;
  my?: SpacingKeys | number;
  p?: SpacingKeys | number;
  pt?: SpacingKeys | number;
  pr?: SpacingKeys | number;
  pb?: SpacingKeys | number;
  pl?: SpacingKeys | number;
  px?: SpacingKeys | number;
  py?: SpacingKeys | number;
  bg?: ColorKeys | string;
  borderRadius?: RadiiKeys | number;
  lightBg?: string;
  darkBg?: string;
}

export interface FlexboxTokens {
  flex?: number;
  flexDir?: "row" | "column" | "row-reverse" | "column-reverse";
  align?: "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
  justify?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
  wrap?: "wrap" | "nowrap" | "wrap-reverse";
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: DimensionValue;
  alignSelf?: "auto" | "flex-start" | "flex-end" | "center" | "stretch" | "baseline";
}

export interface VisualTokens {
  opacity?: number;
  bg?: ColorValue;
  display?: "flex" | "none";
  borderRadius?: RadiiKeys | number;
}

export interface TypographyTokens {
  fontSize?: FontSizeKeys;
  fontWeight?: FontWeightKeys;
  textAlign?: "auto" | "left" | "right" | "center" | "justify";
  textTransform?: "none" | "capitalize" | "uppercase" | "lowercase";
  letterSpacing?: number;
  lineHeight?: number;
}