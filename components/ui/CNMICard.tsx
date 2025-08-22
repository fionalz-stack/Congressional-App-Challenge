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
    default: 'bg-white shadow-sm',
    elevated: 'bg-white shadow-lg',
    outlined: 'bg-white border border-cnmi-gray-200',
  };

  return (
    <View className={cn(baseClasses, variantClasses[variant], className)}>
      {title && (
        <View className="mb-3">
          <Text className="text-lg font-semibold text-cnmi-gray-900">{title}</Text>
          {subtitle && (
            <Text className="text-sm text-cnmi-gray-600 mt-1">{subtitle}</Text>
          )}
        </View>
      )}
      {children}
    </View>
  );
}