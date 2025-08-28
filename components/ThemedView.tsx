import { View, type ViewProps } from 'react-native';

export type ThemedViewProps = ViewProps & {
  lightColor?: string;
  darkColor?: string;
};

export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // Use NativeWind classes for theming instead of custom hook
  return <View className="bg-background-0 dark:bg-background-0" style={style} {...otherProps} />;
}
