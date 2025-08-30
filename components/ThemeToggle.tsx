/**
 * Simple theme toggle component
 */

import React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, preference, setThemePreference } = useTheme();

  const options = [
    { value: 'light' as const, label: 'Light' },
    { value: 'dark' as const, label: 'Dark' },
  ];

  return (
    <View className="flex-row bg-background-50 dark:bg-background-100 rounded-lg p-1">
      {options.map((option) => (
        <TouchableOpacity
          key={option.value}
          onPress={() => setThemePreference(option.value)}
          className={`py-2 px-4 rounded-md ${
            preference === option.value
              ? 'bg-primary-500'
              : 'bg-transparent'
          }`}
          style={{
            minWidth: Platform.OS === 'android' ? 80 : undefined,
            maxWidth: Platform.OS === 'android' ? 120 : undefined,
          }}
        >
          <Text
            className={`text-center text-sm font-medium ${
              preference === option.value
                ? 'text-white'
                : 'text-typography-700 dark:text-typography-300'
            }`}
          >
            {option.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

export function SimpleThemeToggle() {
  const { toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      className="bg-background-50 dark:bg-background-100 p-3 rounded-lg"
      style={{
        alignSelf: 'flex-start',
        minWidth: Platform.OS === 'android' ? 120 : undefined,
        maxWidth: Platform.OS === 'android' ? 200 : undefined,
      }}
    >
      <Text className="text-typography-900 dark:text-typography-100 font-medium">
        {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
      </Text>
    </TouchableOpacity>
  );
}