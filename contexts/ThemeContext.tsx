/**
 * Combined theme context and provider
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'nativewind';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import { GluestackUIProvider } from '../components/ui/gluestack-ui-provider';

type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';

interface ThemeContextType {
  theme: ResolvedTheme;
  preference: ThemePreference;
  setThemePreference: (preference: ThemePreference) => Promise<void>;
  toggleTheme: () => void;
  isLoaded: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const THEME_STORAGE_KEY = 'theme-preference';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useSystemColorScheme();
  const [preference, setPreference] = useState<ThemePreference>('system');
  const [isLoaded, setIsLoaded] = useState(false);
  const { setColorScheme } = useColorScheme();

  // Resolve the actual theme based on preference and system
  const resolvedTheme: ResolvedTheme =
    preference === 'system'
      ? (systemColorScheme ?? 'light')
      : preference;

  // Load saved preference on mount
  useEffect(() => {
    loadThemePreference();
  }, []);

  // Update NativeWind color scheme when theme changes
  useEffect(() => {
    if (isLoaded) {
      setColorScheme(resolvedTheme);
    }
  }, [resolvedTheme, isLoaded, setColorScheme]);

  const loadThemePreference = async () => {
    try {
      const saved = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (saved && ['system', 'light', 'dark'].includes(saved)) {
        setPreference(saved as ThemePreference);
      }
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
    } finally {
      setIsLoaded(true);
    }
  };

  const setThemePreference = async (newPreference: ThemePreference) => {
    try {
      setPreference(newPreference);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, newPreference);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }
  };

  const toggleTheme = () => {
    const newTheme = resolvedTheme === 'light' ? 'dark' : 'light';
    setThemePreference(newTheme);
  };

  const value: ThemeContextType = {
    theme: resolvedTheme,
    preference,
    setThemePreference,
    toggleTheme,
    isLoaded,
  };

  // Don't render until theme is loaded to prevent flash
  if (!isLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      <GluestackUIProvider mode={resolvedTheme}>
        {children}
      </GluestackUIProvider>
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}