import { useThemeContext } from '../context/theme-context';
import { Theme } from '../theme';

export const useTheme = (): Theme => {
  const { theme } = useThemeContext();
  return theme;
};
