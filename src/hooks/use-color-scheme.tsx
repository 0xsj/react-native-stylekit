import { useState, useEffect } from 'react';
import { Appearance, ColorSchemeName } from 'react-native';
import { useThemeContext } from '../context/theme-context';

export const useColorScheme = (): 'light' | 'dark' => {
  const { colorScheme: themeColorScheme } = useThemeContext();
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>(themeColorScheme);
  
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: deviceColorScheme }) => {
      const newColorScheme = deviceColorScheme === 'dark' ? 'dark' : 'light';
      setColorScheme(newColorScheme);
    });
    
    return () => {
      subscription.remove();
    };
  }, []);
  
  return colorScheme;
};
