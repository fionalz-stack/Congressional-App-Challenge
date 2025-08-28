import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6B46C1',
        tabBarInactiveTintColor: theme === 'dark' ? '#9CA3AF' : '#6B7280',
        tabBarStyle: {
          backgroundColor: theme === 'dark' ? '#1F2937' : '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: theme === 'dark' ? '#374151' : '#E5E7EB',
          paddingBottom: 8,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="map"
        options={{
          title: 'Maps',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="guide"
        options={{
          title: 'Guide',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="book" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="navigate" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="taxi"
        options={{
          title: 'Taxi',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
        }}
      />

    </Tabs>
  );
}