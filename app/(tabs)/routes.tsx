import { CNMICard } from '@/components/ui/CNMICard';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';

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
      status: 'On Time'
    },
    {
      id: '8',
      name: 'Route 8 Southbound',
      description: 'Capitol Hill → San Jose → Chalan Kanoa',
      color: '#3B82F6',
      nextArrival: '5 min',
      frequency: 'Every 20 min',
      status: 'Delayed'
    },
    {
      id: '12',
      name: 'Route 12 Express',
      description: 'Airport → Garapan → Capitol Hill',
      color: '#10B981',
      nextArrival: '8 min',
      frequency: 'Every 30 min',
      status: 'On Time'
    },
    {
      id: '4',
      name: 'Route 4 Local',
      description: 'San Antonio → Susupe → Garapan',
      color: '#F59E0B',
      nextArrival: '12 min',
      frequency: 'Every 25 min',
      status: 'On Time'
    }
  ];

  const categories = [
    { id: 'all', name: 'All Routes', icon: 'bus' },
    { id: 'express', name: 'Express', icon: 'flash' },
    { id: 'local', name: 'Local', icon: 'location' },
    { id: 'airport', name: 'Airport', icon: 'airplane' },
  ];

  const handleViewRoute = () => {
    router.push('/map');
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
            {routes.map((route) => (
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
                    onPress={handleViewRoute}
                  >
                    <Ionicons name="map" size={16} color="#6B46C1" />
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
            ))}
          </ScrollView>
        </View>

        {/* Check-in Confirmation Modal */}
        <Modal
          visible={showCheckInModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowCheckInModal(false)}
        >
          <View 
            className="flex-1 justify-center items-center px-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <View className="bg-cnmi-primary rounded-3xl p-6 w-full max-w-sm">
              <Text className="text-white text-2xl font-bold mb-2 text-center">Check-in confirmed!</Text>
              <Text className="text-white text-lg mb-1 text-center">Your bus driver is on</Text>
              <Text className="text-white text-lg mb-6 text-center">the way.</Text>

              <TouchableOpacity
                className="bg-purple-700 rounded-full py-3 px-8 self-center"
                onPress={() => setShowCheckInModal(false)}
              >
                <Text className="text-white font-medium text-lg">Got It!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}