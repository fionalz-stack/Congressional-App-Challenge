import { CNMICard } from '@/components/ui/CNMICard';
import { useTheme } from '@/contexts/ThemeContext';

import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RoutesScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showRouteConfirmation, setShowRouteConfirmation] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<any>(null);
  
  const iconColor = theme === 'dark' ? '#FFFFFF' : '#6B7280';


  const routes = [
    {
      id: '16',
      name: 'Route 16 Northbound',
      description: 'Garapan → Airport → Susupe',
      color: '#6B46C1',
    },
    {
      id: '8',
      name: 'Route 8 Southbound',
      description: 'Capitol Hill → San Jose → Chalan Kanoa',
      color: '#3B82F6',
    },
    {
      id: '12',
      name: 'Route 12 Express',
      description: 'Airport → Garapan → Capitol Hill',
      color: '#10B981',
    },
    {
      id: '4',
      name: 'Route 4 Local',
      description: 'San Antonio → Susupe → Garapan',
      color: '#F59E0B',
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

  const handleRoutePress = (route: any) => {
    setSelectedRoute(route);
    setShowRouteConfirmation(true);
  };

  const handleConfirmRoute = () => {
    setShowRouteConfirmation(false);
    // Navigate to driver stops screen with route info
    router.push({
      pathname: '/driverStops',
      params: { 
        routeId: selectedRoute.id,
        routeName: selectedRoute.name,
        routeDescription: selectedRoute.description
      }
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50 dark:bg-background-0">
      <View className="flex-1 bg-background-50 dark:bg-background-0">

        {/* Header */}
        <View className="px-4 py-3 border-b border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
          <Text className="text-xl font-bold text-typography-900 dark:text-typography-900">
             Routes
          </Text>
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
              <TouchableOpacity 
                key={route.id} 
                onPress={() => handleRoutePress(route)}
                activeOpacity={0.7}
              >
                <CNMICard variant="elevated" className="mb-4">
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
                      <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900 mb-1">
                        {route.name}
                      </Text>
                    </View>
                  </View>
                </CNMICard>
              </TouchableOpacity>
              ));
            })()}
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
            <View className="bg-background-0 dark:bg-background-50 rounded-3xl p-6 w-full max-w-sm items-center">
              <View className="w-20 h-20 rounded-full bg-cnmi-light items-center justify-center mb-4">
                <Text className="text-4xl">😊</Text>
              </View>

              <Text className="text-xl font-bold text-typography-900 dark:text-typography-900 mb-2 text-center">Check-in confirmed!</Text>
              <Text className="text-base text-typography-700 dark:text-typography-300 text-center">Your bus driver is on</Text>
              <Text className="text-base text-typography-700 dark:text-typography-300 mb-6 text-center">the way.</Text>

              <TouchableOpacity
                className="bg-cnmi-primary rounded-full py-3 px-8 w-full"
                onPress={() => setShowCheckInModal(false)}
              >
                <Text className="text-white font-semibold text-center">Got It!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Route Confirmation Modal */}
        <Modal
          visible={showRouteConfirmation}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowRouteConfirmation(false)}
        >
          <View 
            className="flex-1 justify-center items-center px-4"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            <View className="bg-background-0 dark:bg-background-50 rounded-3xl p-6 w-full max-w-sm items-center">
              <View className="w-20 h-20 rounded-full bg-cnmi-light items-center justify-center mb-4">
                <Text className="text-4xl">🚌</Text>
              </View>

              <Text className="text-xl font-bold text-typography-900 dark:text-typography-900 mb-2 text-center">
                Confirm Route
              </Text>
              <Text className="text-base text-typography-700 dark:text-typography-300 text-center mb-6">
                Are you driving {selectedRoute?.name}?
              </Text>

              <View className="flex-row w-full space-x-4">
                <TouchableOpacity
                  className="flex-1 py-3 px-6 rounded-full border border-outline-200 dark:border-outline-700 mr-2"
                  onPress={() => setShowRouteConfirmation(false)}
                >
                  <Text className="text-typography-700 dark:text-typography-300 font-medium text-center">Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="flex-1 bg-cnmi-primary py-3 px-6 rounded-full ml-2"
                  onPress={handleConfirmRoute}
                >
                  <Text className="text-white font-semibold text-center">Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </SafeAreaView>
  );
}