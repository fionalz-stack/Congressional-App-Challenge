import { CNMICard } from '@/components/ui/CNMICard';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { useDarkMode } from '../../contexts/DarkModeContext';

export default function RoutesScreen() {
  const router = useRouter();
  const { isDarkMode } = useDarkMode();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showCheckInModal, setShowCheckInModal] = useState(false);

  // Saipan coordinates for the map background
  const initialRegion = {
    latitude: 15.2137,
    longitude: 145.7546,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
  };

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
    <View className="flex-1">
      {/* Google Maps Background */}
      <View className="absolute inset-0 z-0" style={{ width: '100%', height: '100%' }}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{ flex: 1 }}
          initialRegion={initialRegion}
          showsUserLocation={false}
          showsMyLocationButton={false}
          showsCompass={false}
          toolbarEnabled={false}
          zoomEnabled={false}
          rotateEnabled={false}
          scrollEnabled={false}
          pitchEnabled={false}
          mapType="standard"
        />
      </View>

      {/* Header */}
      <BlurView 
        intensity={70} 
        tint={isDarkMode ? "dark" : "light"} 
        className="px-4 py-3 border-b z-10"
        style={{ borderColor: isDarkMode ? '#374151' : '#E5E7EB' }}
      >
        <Text 
          className="text-xl font-bold"
          style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
        >
          Bus Routes
        </Text>
        <Text 
          className="text-sm"
          style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
        >
          Find your route across CNMI
        </Text>
      </BlurView>

      {/* Search Bar */}
      <BlurView intensity={70} tint="light" className="px-4 py-3 border-b border-cnmi-gray-200 z-10">
        <View className="flex-row items-center bg-white bg-opacity-80 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search routes or destinations..."
            className="flex-1 ml-2 text-base"
          />
        </View>
      </BlurView>

      {/* Category Filters */}
      <BlurView intensity={70} tint="light" className="border-b border-cnmi-gray-200 z-10">
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
        >
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            onPress={() => setSelectedCategory(category.id)}
            className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${
              selectedCategory === category.id 
                ? 'bg-cnmi-primary' 
                : 'bg-cnmi-gray-100'
            }`}
          >
            <Ionicons 
              name={category.icon as any} 
              size={16} 
              color={selectedCategory === category.id ? 'white' : '#6B7280'} 
            />
            <Text className={`ml-2 font-medium ${
              selectedCategory === category.id 
                ? 'text-white' 
                : 'text-cnmi-gray-700'
            }`}>
              {category.name}
            </Text>
          </TouchableOpacity>
        ))}
        </ScrollView>
      </BlurView>

      {/* Routes List */}
      <BlurView intensity={70} tint="light" className="flex-1 z-10">
        <ScrollView className="px-4 py-4">
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
                  <Text className="text-lg font-semibold text-cnmi-gray-900">
                    {route.name}
                  </Text>
                  <View className={`px-2 py-1 rounded-full ${
                    route.status === 'On Time' ? 'bg-green-100' : 'bg-yellow-100'
                  }`}>
                    <Text className={`text-xs font-medium ${
                      route.status === 'On Time' ? 'text-green-800' : 'text-yellow-800'
                    }`}>
                      {route.status}
                    </Text>
                  </View>
                </View>

                <Text className="text-cnmi-gray-600 mb-3">{route.description}</Text>

                <View className="flex-row items-center justify-between">
                  <View className="flex-row items-center">
                    <Ionicons name="time" size={16} color="#6B7280" />
                    <Text className="text-sm text-cnmi-gray-600 ml-1">
                      Next: {route.nextArrival}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Ionicons name="refresh" size={16} color="#6B7280" />
                    <Text className="text-sm text-cnmi-gray-600 ml-1">
                      {route.frequency}
                    </Text>
                  </View>
                </View>
              </View>
            </View>

            {/* Action Buttons */}
            <View className="flex-row mt-4 pt-4 border-t border-cnmi-gray-100">
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
      </BlurView>

      {/* Check-in Confirmation Modal */}
      <Modal
        visible={showCheckInModal}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setShowCheckInModal(false)}
      >
        <BlurView intensity={80} tint="light" className="flex-1 justify-center items-center px-4 z-50">
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
        </BlurView>
      </Modal>
    </View>
  );
}