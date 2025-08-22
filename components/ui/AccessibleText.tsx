import { cn } from '@/lib/utils';
import React from 'react';
import { Text, TextProps } from 'react-native';

interface AccessibleTextProps extends TextProps {
  variant?: 'heading' | 'subheading' | 'body' | 'caption' | 'button';
  children: React.ReactNode;
  className?: string;
}

export function AccessibleText({ 
  variant = 'body', 
  children, 
  className,
  ...props 
}: AccessibleTextProps) {
  const variantClasses = {
    heading: 'text-2xl font-bold text-cnmi-gray-900',
    subheading: 'text-lg font-semibold text-cnmi-gray-900',
    body: 'text-base text-cnmi-gray-700',
    caption: 'text-sm text-cnmi-gray-600',
    button: 'text-base font-semibold',
  };

  return (
    <Text
      className={cn(variantClasses[variant], className)}
      accessible={true}
      accessibilityRole="text"
      {...props}
    >
      {children}
    </Text>
  );
}