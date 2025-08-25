import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

interface DarkModeContextType {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (enabled: boolean) => void;
}

const DarkModeContext = createContext<DarkModeContextType | undefined>(undefined);

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === undefined) {
    throw new Error('useDarkMode must be used within a DarkModeProvider');
  }
  return context;
};

interface DarkModeProviderProps {
  children: React.ReactNode;
}

export const DarkModeProvider: React.FC<DarkModeProviderProps> = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    // Load saved dark mode preference
    loadDarkModePreference();
  }, []);

  useEffect(() => {
    // Update when system color scheme changes (if no manual preference is set)
    const loadPreference = async () => {
      const savedPreference = await AsyncStorage.getItem('darkModePreference');
      if (savedPreference === null) {
        // No saved preference, use system setting
        setIsDarkMode(systemColorScheme === 'dark');
      }
    };
    loadPreference();
  }, [systemColorScheme]);

  const loadDarkModePreference = async () => {
    try {
      const savedPreference = await AsyncStorage.getItem('darkModePreference');
      if (savedPreference !== null) {
        setIsDarkMode(JSON.parse(savedPreference));
      }
    } catch (error) {
      console.error('Error loading dark mode preference:', error);
    }
  };

  const saveDarkModePreference = async (enabled: boolean) => {
    try {
      await AsyncStorage.setItem('darkModePreference', JSON.stringify(enabled));
    } catch (error) {
      console.error('Error saving dark mode preference:', error);
    }
  };

  const toggleDarkMode = () => {
    const newValue = !isDarkMode;
    setIsDarkMode(newValue);
    saveDarkModePreference(newValue);
  };

  const setDarkMode = (enabled: boolean) => {
    setIsDarkMode(enabled);
    saveDarkModePreference(enabled);
  };

  const value: DarkModeContextType = {
    isDarkMode,
    toggleDarkMode,
    setDarkMode,
  };

  return (
    <DarkModeContext.Provider value={value}>
      {children}
    </DarkModeContext.Provider>
  );
};
