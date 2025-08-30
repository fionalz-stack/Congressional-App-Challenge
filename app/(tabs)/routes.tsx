import { CNMICard } from '@/components/ui/CNMICard';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoutesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  
  const iconColor = theme === 'dark' ? '#FFFFFF' : '#6B7280';


  const routes = [
    {
      id: '16',
      name: 'Route 16 Northbound',
      description: 'Garapan → Airport → Susupe',
      color: '#6B46C1',
      nextArrival: '2 min',
      frequency: 'Every 15 min',
      status: 'On Time',
      express: false,
      local: false,
      airport: true
    },
    {
      id: '8',
      name: 'Route 8 Southbound',
      description: 'Capitol Hill → San Jose → Chalan Kanoa',
      color: '#3B82F6',
      nextArrival: '5 min',
      frequency: 'Every 20 min',
      status: 'Delayed',
      express: false,
      local: false,
      airport: false
    },
    {
      id: '12',
      name: 'Route 12 Express',
      description: 'Airport → Garapan → Capitol Hill',
      color: '#10B981',
      nextArrival: '8 min',
      frequency: 'Every 30 min',
      status: 'On Time',
      express: true,
      local: false,
      airport: true
    },
    {
      id: '4',
      name: 'Route 4 Local',
      description: 'San Antonio → Susupe → Garapan',
      color: '#F59E0B',
      nextArrival: '12 min',
      frequency: 'Every 25 min',
      status: 'On Time',
      express: false,
      local: true,
      airport: false
    }
  ];

  const categories = [
    { id: 'all', name: 'All Routes', icon: 'bus' },
    { id: 'express', name: 'Express', icon: 'flash' },
    { id: 'local', name: 'Local', icon: 'location' },
    { id: 'airport', name: 'Airport', icon: 'airplane' },
  ];

  const handleViewRoute = (route: any) => {
    // Navigate to stops screen with route information
    router.push({
      pathname: '/stops',
      params: { 
        routeId: route.id,
        routeName: route.name,
        routeDescription: route.description
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50 dark:bg-background-0">
      <View className="flex-1 bg-background-50 dark:bg-background-0">

        {/* Header */}
        <View className="px-4 py-3 border-b border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
          <Text className="text-xl font-bold text-typography-900 dark:text-typography-900">
            Bus Routes
          </Text>
          <Text className="text-sm text-typography-600 dark:text-typography-400">
            Find your route across CNMI
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-4 py-3 border-b border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
          <View className="flex-row items-center rounded-lg px-3 py-2 bg-background-100 dark:bg-background-200">
            <Ionicons name="search" size={20} color={iconColor} />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Search routes or destinations..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-2"
              style={{ 
                color: theme === 'dark' ? '#F9FAFB' : '#111827',
                textAlignVertical: 'center',
                paddingVertical: 0,
                margin: 0,
                height: 40,
                fontSize: 16
              }}
            />
          </View>
        </View>

        {/* Category Filters */}
        <View className="border-b border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                onPress={() => setSelectedCategory(category.id)}
                className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${selectedCategory === category.id
                  ? 'bg-cnmi-primary'
                  : 'bg-background-100 dark:bg-background-200'
                  }`}
              >
                <Ionicons
                  name={category.icon as any}
                  size={16}
                  color={selectedCategory === category.id ? 'white' : iconColor}
                />
                <Text className={`ml-2 font-medium ${selectedCategory === category.id
                  ? 'text-white'
                  : 'text-typography-700 dark:text-typography-300'
                  }`}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Routes List */}
        <View className="flex-1">
          <ScrollView className="px-4 py-4 bg-background-50 dark:bg-background-0">
            {(() => {
              const query = searchQuery.trim().toLowerCase();
              const matchesQuery = (r: typeof routes[number]) =>
                !query || r.name.toLowerCase().includes(query) || r.description.toLowerCase().includes(query);

              const matchesCategory = (r: typeof routes[number]) => {
                if (selectedCategory === 'all') return true;
                if (selectedCategory === 'express') return r.express || r.name.toLowerCase().includes('express');
                if (selectedCategory === 'local') return r.local || r.name.toLowerCase().includes('local');
                if (selectedCategory === 'airport') return r.airport || r.description.toLowerCase().includes('airport');
                return true;
              };

              const filteredRoutes = routes.filter((r) => matchesQuery(r) && matchesCategory(r));

              if (filteredRoutes.length === 0) {
                return (
                  <CNMICard variant="default" className="mb-4">
                    <Text className="text-typography-700 dark:text-typography-300">No routes found.</Text>
                  </CNMICard>
                );
              }

              return filteredRoutes.map((route) => (
              <CNMICard key={route.id} variant="elevated" className="mb-4">
                <View className="flex-row items-start">
                  {/* Route Number */}
                  <View
                    className="w-12 h-12 rounded-lg items-center justify-center mr-4"
                    style={{ backgroundColor: route.color }}
                  >
                    <Text className="text-white font-bold text-lg">{route.id}</Text>
                  </View>

                  {/* Route Info */}
                  <View className="flex-1">
                    <View className="flex-row items-center justify-between mb-1">
                      <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900">
                        {route.name}
                      </Text>
                      <View className={`px-2 py-1 rounded-full ${route.status === 'On Time' ? 'bg-green-100 dark:bg-green-900' : 'bg-yellow-100 dark:bg-yellow-900'
                        }`}>
                        <Text className={`text-xs font-medium ${route.status === 'On Time' ? 'text-green-800 dark:text-green-200' : 'text-yellow-800 dark:text-yellow-200'
                          }`}>
                          {route.status}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-typography-600 dark:text-typography-400 mb-3">{route.description}</Text>

                    <View className="flex-row items-center justify-between">
                      <View className="flex-row items-center">
                        <Ionicons name="time" size={16} color={iconColor} />
                        <Text className="text-sm text-typography-600 dark:text-typography-400 ml-1">
                          Next: {route.nextArrival}
                        </Text>
                      </View>
                      <View className="flex-row items-center">
                        <Ionicons name="refresh" size={16} color={iconColor} />
                        <Text className="text-sm text-typography-600 dark:text-typography-400 ml-1">
                          {route.frequency}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row mt-4 pt-4 border-t border-outline-200 dark:border-outline-700">
                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center py-2 mr-2 bg-cnmi-light rounded-lg"
                    onPress={() => handleViewRoute(route)}
                  >
                    <Ionicons name="map" size="16" color="#6B46C1" />
                    <Text className="text-cnmi-primary font-medium ml-2">View Route</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    className="flex-1 flex-row items-center justify-center py-2 ml-2 bg-cnmi-primary rounded-lg"
                    onPress={() => setShowCheckInModal(true)}
                  >
                    <Ionicons name="checkmark-circle" size={16} color="white" />
                    <Text className="text-white font-medium ml-2">Check In</Text>
                  </TouchableOpacity>
                </View>
              </CNMICard>
              ));
            })()}
          </ScrollView>
        </View>

        {/* Floating Action Button */}
        <TouchableOpacity
          className="absolute bottom-6 right-6 w-14 h-14 bg-cnmi-primary rounded-full items-center justify-center shadow-lg"
          onPress={() => setShowCheckInModal(true)}
        >
          <Ionicons name="add" size={28} color="white" />
        </TouchableOpacity>

        {/* Check-in Confirmation Modal */}
        <Modal
          visible={showCheckInModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowCheckInModal(false)}
        >
          <BlurView 
            intensity={80} 
            tint={theme === 'dark' ? 'dark' : 'light'} 
            className="flex-1 justify-end"
          >
            <View className="bg-background-0 dark:bg-background-50 rounded-t-3xl px-6 pt-8 pb-10 mx-0 shadow-2xl border-t border-outline-200 dark:border-outline-700">
              {/* Success Indicator */}
              <View className="items-center mb-6">
                <View className="w-20 h-20 bg-green-100 dark:bg-green-900 rounded-full items-center justify-center mb-4 shadow-lg">
                  <View className="w-16 h-16 bg-green-500 rounded-full items-center justify-center">
                    <Ionicons name="checkmark" size={32} color="white" />
                  </View>
                </View>
                
                <Text className="text-2xl font-bold text-center mb-2 text-typography-900 dark:text-typography-900">
                  Check-in confirmed!
                </Text>
                <Text className="text-base text-center text-typography-600 dark:text-typography-400 leading-5">
                  Your bus driver is on the way
                </Text>
              </View>

              {/* Route Info Card */}
              <View className="bg-background-50 dark:bg-background-100 rounded-2xl p-4 mb-6 border border-outline-200 dark:border-outline-700">
                <View className="flex-row items-center">
                  <View className="w-14 h-14 rounded-lg items-center justify-center mr-4" style={{ backgroundColor: '#6B46C1' }}>
                    <Text className="text-white font-bold text-lg">16</Text>
                  </View>
                  
                  <View className="flex-1">
                    <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900 mb-1">
                      Route 16 Northbound
                    </Text>
                    <Text className="text-sm text-typography-600 dark:text-typography-400 mb-1">
                      Garapan → Airport → Susupe
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons name="time" size={14} color="#6B46C1" />
                      <Text className="text-sm ml-1 text-typography-500 dark:text-typography-400">
                        Next arrival: 2 min
                      </Text>
                    </View>
                  </View>
                  
                  <View className="items-end">
                    <View className="px-2 py-1 rounded-full bg-green-100 dark:bg-green-900">
                      <Text className="text-xs font-medium text-green-800 dark:text-green-200">
                        On Time
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Action Buttons */}
              <View>
                <TouchableOpacity 
                  className="bg-cnmi-primary rounded-2xl py-4 px-6 flex-row items-center justify-center mb-3"
                  onPress={() => {
                    setShowCheckInModal(false);
                    handleViewRoute();
                  }}
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 }}
                >
                  <Text className="text-white font-semibold text-lg mr-2">View on Map</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="bg-background-100 dark:bg-background-200 rounded-2xl py-4 px-6 border border-outline-200 dark:border-outline-700"
                  onPress={() => setShowCheckInModal(false)}
                >
                  <Text className="text-typography-700 dark:text-typography-300 font-medium text-center text-lg">
                    Stay Here
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Cancel Option */}
              <TouchableOpacity 
                className="mt-4 py-2"
                onPress={() => {
                  setShowCheckInModal(false);
                  // You can add cancel check-in logic here
                }}
              >
                <Text className="text-center text-sm text-typography-500 dark:text-typography-400 underline">
                  Cancel check-in
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}