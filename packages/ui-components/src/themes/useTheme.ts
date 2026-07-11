import { useContext } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  isDark: boolean;
}

// Re-export the context from ThemeProvider
import { ThemeContext } from './ThemeProvider';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext as any);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
