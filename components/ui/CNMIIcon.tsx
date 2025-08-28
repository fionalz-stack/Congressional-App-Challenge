import { cn } from '@/lib/utils';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';
import React from 'react';
import { View } from 'react-native';

interface CNMIIconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'stone';
  className?: string;
}

export function CNMIIcon({ 
  name, 
  size = 24, 
  color,
  variant = 'default',
  className 
}: CNMIIconProps) {
  const { theme } = useTheme();
  
  const variantColors = {
    default: theme === 'dark' ? '#FFFFFF' : '#6B7280',
    primary: '#6B46C1',
    secondary: '#8B5CF6',
    accent: '#3B82F6',
    stone: theme === 'dark' ? '#D1D5DB' : '#737373',
  };

  const iconColor = color || variantColors[variant];

  return (
    <Ionicons 
      name={name} 
      size={size} 
      color={iconColor}
      style={{ opacity: 1 }}
    />
  );
}

export function CNMIIconButton({ 
  name, 
  size = 24, 
  variant = 'primary',
  className,
  onPress 
}: CNMIIconProps & { onPress?: () => void }) {
  const variantClasses = {
    default: 'bg-cnmi-gray-100',
    primary: 'bg-cnmi-primary',
    secondary: 'bg-cnmi-secondary', 
    accent: 'bg-cnmi-accent',
    stone: 'bg-cnmi-gray-300',
  };

  const iconColor = variant === 'default' || variant === 'stone' ? '#6B7280' : '#FFFFFF';

  return (
    <View className={cn(
      'w-10 h-10 rounded-full items-center justify-center',
      variantClasses[variant],
      className
    )}>
      <CNMIIcon name={name} size={size} color={iconColor} />
    </View>
  );
}