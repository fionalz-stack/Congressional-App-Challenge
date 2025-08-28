import { OverlayProvider } from '@gluestack-ui/overlay';
import { ToastProvider } from '@gluestack-ui/toast';
import React from 'react';
import { View, ViewProps, useColorScheme } from 'react-native';
import { config } from './config';

export function GluestackUIProvider({
  mode,
  ...props
}: {
  children?: React.ReactNode;
  style?: ViewProps['style'];
  mode?: 'light' | 'dark';
}) {
  const systemColorScheme = useColorScheme();
  const theme = mode || systemColorScheme || 'light';

  return (
    <View
      style={[
        config[theme],
        { flex: 1, height: '100%', width: '100%' },
        props.style,
      ]}
    >
      <OverlayProvider>
        <ToastProvider>{props.children}</ToastProvider>
      </OverlayProvider>
    </View>
  );
}
