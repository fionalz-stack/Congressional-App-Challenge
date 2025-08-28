import { cn } from '@/lib/utils';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
  text?: string;
  className?: string;
}

export function LoadingSpinner({ 
  size = 'large', 
  color = '#6B46C1', 
  text,
  className 
}: LoadingSpinnerProps) {
  return (
    <View className={cn('items-center justify-center py-8', className)}>
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text className="text-typography-600 dark:text-typography-400 mt-3 text-center">{text}</Text>
      )}
    </View>
  );
}

export function FullScreenLoader({ text = 'Loading...' }: { text?: string }) {
  return (
    <View className="flex-1 items-center justify-center bg-cnmi-light">
      <View className="items-center">
        <View className="w-20 h-20 bg-cnmi-primary rounded-2xl items-center justify-center mb-4">
          <Text className="text-white text-2xl">🚌</Text>
        </View>
        <ActivityIndicator size="large" color="#6B46C1" />
        <Text className="text-typography-600 dark:text-typography-400 mt-4 text-lg">{text}</Text>
        <Text className="text-typography-500 dark:text-typography-400 mt-2 text-center">
          Connecting the islands...
        </Text>
      </View>
    </View>
  );
}