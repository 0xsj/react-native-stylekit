import React, { createContext, useContext, useState, ReactNode } from 'react';
import { defaultTheme, Theme } from '../theme';

type ThemeContextType = {
  theme: Theme;
  colorScheme: 'light' | 'dark';
  setColorScheme: (scheme: 'light' | 'dark') => void;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  colorScheme: 'light',
  setColorScheme: () => {},
  setTheme: () => {}
});

export const ThemeProvider: React.FC<{
  children: ReactNode;
  initialColorScheme?: 'light' | 'dark';
  theme?: Theme;
}> = ({ children, initialColorScheme = 'light', theme = defaultTheme }) => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(initialColorScheme);
  const [currentTheme, setCurrentTheme] = useState<Theme>(theme);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme: currentTheme, 
        colorScheme, 
        setColorScheme,
        setTheme: setCurrentTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = () => useContext(ThemeContext);
