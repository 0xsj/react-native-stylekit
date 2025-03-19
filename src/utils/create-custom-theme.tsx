import { defaultTheme, Theme } from '../theme';

/**
 * Helper function to create a custom theme with proper type structure
 * This avoids TypeScript literal type issues by properly handling the theme structure
 */
export function createCustomTheme({
  id,
  name,
  colors = {},
  spacing = {},
  radii = {},
  typography = {}
}: {
  id: string;
  name: string;
  colors?: {
    light?: Partial<typeof defaultTheme.colors.light>;
    dark?: Partial<typeof defaultTheme.colors.dark>;
  };
  spacing?: Partial<typeof defaultTheme.spacing>;
  radii?: Partial<typeof defaultTheme.radii>;
  typography?: {
    sizes?: Partial<typeof defaultTheme.typography.sizes>;
    weights?: Partial<typeof defaultTheme.typography.weights>;
  };
}) {
  return {
    ...defaultTheme,
    id,
    name,
    colors: {
      light: {
        ...defaultTheme.colors.light,
        ...(colors.light || {})
      },
      dark: {
        ...defaultTheme.colors.dark,
        ...(colors.dark || {})
      }
    },
    spacing: {
      ...defaultTheme.spacing,
      ...spacing
    },
    radii: {
      ...defaultTheme.radii,
      ...radii
    },
    typography: {
      sizes: {
        ...defaultTheme.typography.sizes,
        ...(typography.sizes || {})
      },
      weights: {
        ...defaultTheme.typography.weights,
        ...(typography.weights || {})
      }
    }
  };
}
