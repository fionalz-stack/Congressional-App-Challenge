import { Ionicons } from '@expo/vector-icons';
import { Tabs, useLocalSearchParams } from 'expo-router';

import { useTheme } from '@/contexts/ThemeContext';

export default function TabLayout() {
  const { theme } = useTheme();
  const params = useLocalSearchParams();
  const isDriver = params.role === 'driver';
  
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
          href: isDriver ? null : undefined, // Hide for drivers
        }}
      />
      
      <Tabs.Screen
        name="routes"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="navigate" size={size} color={color} />
          ),
          href: isDriver ? null : undefined, // Hide for drivers
        }}
      />
      
      <Tabs.Screen
        name="stops"
        options={{
          title: 'Stops',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="location" size={size} color={color} />
          ),
          href: isDriver ? null : undefined, // Hide for drivers
        }}
      />
      
      <Tabs.Screen
        name="taxi"
        options={{
          title: 'CARS/Paratransit',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car" size={size} color={color} />
          ),
          href: isDriver ? null : undefined, // Hide for drivers
        }}
      />
      
      <Tabs.Screen
        name="driverRoute"
        options={{
          title: 'Driver Route',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bus" size={size} color={color} />
          ),
          href: isDriver ? undefined : null, // Hide for users
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