import { cn } from '@/lib/utils';
import React from 'react';
import { Text, View } from 'react-native';

interface CNMICardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  variant?: 'default' | 'elevated' | 'outlined';
}

export function CNMICard({ 
  children, 
  className, 
  title, 
  subtitle, 
  variant = 'default' 
}: CNMICardProps) {
  const baseClasses = 'rounded-xl p-4';
  
  const variantClasses = {
    default: 'bg-background-0 dark:bg-background-50 shadow-sm',
    elevated: 'bg-background-0 dark:bg-background-50 shadow-lg',
    outlined: 'bg-background-0 dark:bg-background-50 border border-outline-200 dark:border-outline-700',
  };

  return (
    <View className={cn(baseClasses, variantClasses[variant], className)}>
      {title && (
        <View className="mb-3">
          <Text className="text-lg font-semibold text-typography-900 dark:text-typography-100">{title}</Text>
          {subtitle && (
            <Text className="text-sm text-typography-600 dark:text-typography-400 mt-1">{subtitle}</Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}