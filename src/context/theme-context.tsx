import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ColorValue, DimensionValue } from 'react-native';
import { defaultTheme, Theme, ColorKeys } from '../theme';

// Define a more flexible version of ThemeColors that doesn't use literal string types
type FlexibleThemeColors = {
  [K in ColorKeys]: string | ColorValue;
};

// Extend the base Theme to include id and name
interface ThemeWithId extends Omit<Theme, 'colors'> {
  id: string;
  name: string;
  colors: {
    light: FlexibleThemeColors;
    dark: FlexibleThemeColors;
  };
}

type ThemeContextType = {
  themes: ThemeWithId[];
  currentThemeId: string;
  colorScheme: 'light' | 'dark';
  setColorScheme: (scheme: 'light' | 'dark') => void;
  setCurrentThemeId: (themeId: string) => void;
  getCurrentTheme: () => ThemeWithId;
  getColor: (colorKey: ColorKeys) => ColorValue;
  getColors: () => FlexibleThemeColors;
  addTheme: (theme: ThemeWithId) => void;
  removeTheme: (themeId: string) => void;
  updateTheme: (themeId: string, updatedTheme: Partial<ThemeWithId>) => void;
};

// Create a default theme with id and name
const defaultThemeWithId: ThemeWithId = {
  ...defaultTheme,
  id: 'default',
  name: 'Default Theme',
  // Cast colors to the more flexible type
  colors: {
    light: defaultTheme.colors.light as unknown as FlexibleThemeColors,
    dark: defaultTheme.colors.dark as unknown as FlexibleThemeColors
  }
};

const ThemeContext = createContext<ThemeContextType>({
  themes: [defaultThemeWithId],
  currentThemeId: defaultThemeWithId.id,
  colorScheme: 'light',
  setColorScheme: () => {},
  setCurrentThemeId: () => {},
  getCurrentTheme: () => defaultThemeWithId,
  getColor: () => '#000000',
  getColors: () => defaultTheme.colors.light as unknown as FlexibleThemeColors,
  addTheme: () => {},
  removeTheme: () => {},
  updateTheme: () => {}
});

export const ThemeProvider: React.FC<{
  children: ReactNode;
  initialColorScheme?: 'light' | 'dark';
  initialThemes?: ThemeWithId[];
  initialThemeId?: string;
}> = ({ 
  children, 
  initialColorScheme = 'light', 
  initialThemes = [defaultThemeWithId],
  initialThemeId = defaultThemeWithId.id 
}) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(initialColorScheme);
  const [themes, setThemes] = useState<ThemeWithId[]>(initialThemes);
  const [currentThemeId, setCurrentThemeId] = useState<string>(initialThemeId);

  const getCurrentTheme = () => {
    return themes.find(theme => theme.id === currentThemeId) || themes[0];
  };
  
  const getColor = (colorKey: ColorKeys): ColorValue => {
    const theme = getCurrentTheme();
    return theme.colors[colorScheme][colorKey];
  };
  
  const getColors = (): FlexibleThemeColors => {
    const theme = getCurrentTheme();
    return theme.colors[colorScheme];
  };

  const addTheme = (theme: ThemeWithId) => {
    if (!themes.some(t => t.id === theme.id)) {
      setThemes([...themes, theme]);
    }
  };

  const removeTheme = (themeId: string) => {
    // Don't remove the last theme
    if (themes.length <= 1) {
      return;
    }
    
    const newThemes = themes.filter(theme => theme.id !== themeId);
    setThemes(newThemes);
    
    // If we're removing the current theme, switch to the first available
    if (currentThemeId === themeId) {
      setCurrentThemeId(newThemes[0].id);
    }
  };

  const updateTheme = (themeId: string, updatedTheme: Partial<ThemeWithId>) => {
    setThemes(themes.map(theme => 
      theme.id === themeId 
        ? { ...theme, ...updatedTheme, id: theme.id, name: updatedTheme.name || theme.name } // Keep the original ID and name unless explicitly changed
        : theme
    ));
  };

  return (
    <ThemeContext.Provider
      value={{
        themes,
        currentThemeId,
        colorScheme,
        setColorScheme,
        setCurrentThemeId,
        getCurrentTheme,
        getColor,
        getColors,
        addTheme,
        removeTheme,
        updateTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);