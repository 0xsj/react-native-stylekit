import { useMemo } from "react";
import { StyleSheet, ViewStyle, DimensionValue } from "react-native";
import { useTheme } from "./use-theme";
import { useColorScheme } from "./use-color-scheme";

import {
  StyleTokens,
  SpacingKeys,
  RadiiKeys,
  ColorKeys,
  FlexboxTokens,
  VisualTokens,
} from "../theme";

type StyleTokenProps = Omit<StyleTokens, "borderRadius" | "flexBasis"> &
  Omit<FlexboxTokens, "flexBasis"> &
  Omit<VisualTokens, "borderRadius"> & {
    style?: ViewStyle;
    borderRadius?: RadiiKeys | number;
    flexBasis?: DimensionValue;
    color?: ColorKeys;
  };

export const useStyleTokens = (props: StyleTokenProps): ViewStyle => {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return useMemo(() => {
    const {
      // Layout props
      w,
      h,
      minW,
      maxW,
      minH,
      maxH,
      pos,
      top,
      right,
      bottom,
      left,
      z,

      // Spacing props
      m,
      mt,
      mr,
      mb,
      ml,
      mx,
      my,
      p,
      pt,
      pr,
      pb,
      pl,
      px,
      py,

      // Flexbox props
      flex,
      flexDir,
      align,
      justify,
      wrap,
      flexGrow,
      flexShrink,
      flexBasis,
      alignSelf,

      // Visual props
      opacity,
      display,
      bg,
      lightBg,
      darkBg,
      color,
      borderRadius,

      // Additional styles
      style,
      ...rest
    } = props;

    const getColor = (value: ColorKeys | undefined): string | undefined => {
      if (!value) return undefined;
      return value in theme.colors[colorScheme]
        ? theme.colors[colorScheme][value]
        : undefined;
    };

    // Theme value resolver functions
    const getSpacing = (
      value: SpacingKeys | number | undefined,
    ): number | undefined => {
      if (value === undefined) return undefined;
      return typeof value === "string" ? theme.spacing[value] : value;
    };

    const getRadius = (
      value: RadiiKeys | number | undefined,
    ): number | undefined => {
      if (value === undefined) return undefined;
      return typeof value === "string" ? theme.radii[value] : value;
    };

    const getBackgroundColor = (
      value: ColorKeys | string | undefined,
    ): string | undefined => {
      if (!value) return undefined;
      if (colorScheme === "light" && lightBg) return lightBg;
      if (colorScheme === "dark" && darkBg) return darkBg;
      return typeof value === "string" && value in theme.colors[colorScheme]
        ? theme.colors[colorScheme][value as ColorKeys]
        : value;
    };

    const baseStyle = StyleSheet.flatten([
      // Layout styles
      w !== undefined && { width: w },
      h !== undefined && { height: h },
      minW !== undefined && { minWidth: minW },
      maxW !== undefined && { maxWidth: maxW },
      minH !== undefined && { minHeight: minH },
      maxH !== undefined && { maxHeight: maxH },
      pos && { position: pos },
      top !== undefined && { top },
      right !== undefined && { right },
      bottom !== undefined && { bottom },
      left !== undefined && { left },
      z !== undefined && { zIndex: z },

      // Spacing styles
      m !== undefined && { margin: getSpacing(m) },
      mt !== undefined && { marginTop: getSpacing(mt) },
      mr !== undefined && { marginRight: getSpacing(mr) },
      mb !== undefined && { marginBottom: getSpacing(mb) },
      ml !== undefined && { marginLeft: getSpacing(ml) },
      mx !== undefined && { marginHorizontal: getSpacing(mx) },
      my !== undefined && { marginVertical: getSpacing(my) },
      p !== undefined && { padding: getSpacing(p) },
      pt !== undefined && { paddingTop: getSpacing(pt) },
      pr !== undefined && { paddingRight: getSpacing(pr) },
      pb !== undefined && { paddingBottom: getSpacing(pb) },
      pl !== undefined && { paddingLeft: getSpacing(pl) },
      px !== undefined && { paddingHorizontal: getSpacing(px) },
      py !== undefined && { paddingVertical: getSpacing(py) },

      // Flexbox styles
      flex !== undefined && { flex },
      flexDir !== undefined && { flexDirection: flexDir },
      align !== undefined && { alignItems: align },
      justify !== undefined && { justifyContent: justify },
      wrap !== undefined && { flexWrap: wrap },
      flexGrow !== undefined && { flexGrow },
      flexShrink !== undefined && { flexShrink },
      flexBasis !== undefined && { flexBasis },
      alignSelf !== undefined && { alignSelf },

      // Visual styles
      opacity !== undefined && { opacity },
      display !== undefined && { display },
      bg && { backgroundColor: getBackgroundColor(bg) },
      color !== undefined && { color: getColor(color) },
      borderRadius !== undefined && { borderRadius: getRadius(borderRadius) },

      // Additional styles
      style,
    ]) as ViewStyle;

    return baseStyle;
  }, [props, colorScheme, theme]);
};