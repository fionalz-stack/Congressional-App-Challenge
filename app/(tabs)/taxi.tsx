import { CNMIButton } from '@/components/ui/CNMIButton';
import { CNMICard } from '@/components/ui/CNMICard';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaxiScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedTaxi, setSelectedTaxi] = useState<string | null>(null);
  const [showTaxiRequestModal, setShowTaxiRequestModal] = useState(false);

  const availableTaxis = [
    {
      id: '1',
      driver: 'Ms. Cab',
      rating: 4.8,
      price: '$3.00',
      estimatedTime: '3 min',
      distance: '0.5 mi',
      vehicle: 'Toyota Camry',
      plateNumber: 'ABC-123'
    },
    {
      id: '2', 
      driver: 'Ms. Lin',
      rating: 4.6,
      price: '$4.50',
      estimatedTime: '5 min',
      distance: '0.8 mi',
      vehicle: 'Honda Civic',
      plateNumber: 'XYZ-789'
    },
    {
      id: '3',
      driver: 'Ms. Paraiso',
      rating: 4.9,
      price: '$3.75',
      estimatedTime: '7 min',
      distance: '1.2 mi',
      vehicle: 'Nissan Altima',
      plateNumber: 'DEF-456'
    }
  ];

  const quickDestinations = [
    { name: 'Saipan International Airport', icon: 'airplane' },
    { name: 'Garapan Tourist District', icon: 'storefront' },
    { name: 'American Memorial Park', icon: 'leaf' },
    { name: 'DFS Galleria', icon: 'bag' },
  ];

  const handleTaxiRequest = () => {
    setShowTaxiRequestModal(true);
  };

  const handleGotIt = () => {
    setShowTaxiRequestModal(false);
    router.push('/map');
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50 dark:bg-background-0">
      <View className="flex-1 bg-background-50 dark:bg-background-0">
        {/* Header */}
        <View className="px-4 py-3 border-b border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
          <Text className="text-xl font-bold text-typography-900 dark:text-typography-900">
            Call a Taxi
          </Text>
          <Text className="text-sm text-typography-600 dark:text-typography-400">
            Quick and reliable rides across CNMI
          </Text>
        </View>

        <ScrollView className="flex-1 bg-background-50 dark:bg-background-0">
          {/* Location Input */}
          <CNMICard variant="elevated" className="m-4">
            <View className="space-y-4">
              <View>
                <Text className="text-sm font-medium mb-2 text-typography-600 dark:text-typography-400">
                  Pickup Location
                </Text>
                <View className="flex-row items-center rounded-lg px-3 py-3 bg-background-100 dark:bg-background-200">
                  <Ionicons name="location" size={20} color="#6B46C1" />
                  <TextInput
                    value={pickupLocation}
                    onChangeText={setPickupLocation}
                    placeholder="Current location"
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
                  <TouchableOpacity>
                    <Ionicons name="locate" size={20} color={theme === 'dark' ? '#FFFFFF' : '#6B7280'} />
                  </TouchableOpacity>
                </View>
              </View>

              <View>
                <Text className="text-sm font-medium mb-2 text-typography-600 dark:text-typography-400">
                  Destination
                </Text>
                <View className="flex-row items-center rounded-lg px-3 py-3 bg-background-100 dark:bg-background-200">
                  <Ionicons name="flag" size={20} color="#F59E0B" />
                  <TextInput
                    value={destination}
                    onChangeText={setDestination}
                    placeholder="Where to?"
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
            </View>
          </CNMICard>

          {/* Quick Destinations */}
          <View className="px-4 mb-4">
            <Text 
              className="text-lg font-semibold mb-3 text-typography-900"
              style={{ color: theme === 'dark' ? '#FFFFFF' : undefined }}
            >
              Popular Destinations
            </Text>
            <View className="flex-row flex-wrap">
              {quickDestinations.map((dest, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => setDestination(dest.name)}
                  className="rounded-lg p-3 mr-3 mb-3 flex-row items-center shadow-sm bg-background-0 dark:bg-background-50"
                  style={{ 
                    minWidth: '45%'
                  }}
                >
                  <Ionicons name={dest.icon as any} size={20} color="#6B46C1" />
                  <Text 
                    className="text-sm ml-2 flex-1 text-typography-900"
                    style={{ color: theme === 'dark' ? '#FFFFFF' : undefined }}
                  >
                    {dest.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Available Taxis */}
          <View className="px-4">
            <Text className="text-lg font-semibold mb-3 text-typography-900 dark:text-typography-900">
              Available Taxis
            </Text>
            {availableTaxis.map((taxi) => (
              <CNMICard 
                key={taxi.id} 
                variant={selectedTaxi === taxi.id ? "elevated" : "default"}
                className={`mb-3 ${selectedTaxi === taxi.id ? 'border-2 border-cnmi-primary' : ''}`}
              >
                <TouchableOpacity onPress={() => setSelectedTaxi(taxi.id)}>
                  <View className="flex-row items-center">
                    {/* Driver Avatar */}
                    <View className="w-12 h-12 bg-cnmi-secondary rounded-full items-center justify-center mr-4">
                      <Ionicons name="person" size={24} color="white" />
                    </View>

                    {/* Driver Info */}
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900">
                          {taxi.driver}
                        </Text>
                        <Text className="text-lg font-bold text-cnmi-primary">
                          {taxi.price}
                        </Text>
                      </View>

                      <View className="flex-row items-center mb-2">
                        <Ionicons name="star" size={14} color="#EAB308" />
                        <Text className="text-sm ml-1 text-typography-500 dark:text-typography-400">
                          {taxi.rating} • {taxi.vehicle}
                        </Text>
                      </View>

                      <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                          <Ionicons name="time" size={14} color={theme === 'dark' ? '#FFFFFF' : '#6B7280'} />
                          <Text className="text-sm ml-1 text-typography-500 dark:text-typography-400">
                            {taxi.estimatedTime} away
                          </Text>
                        </View>
                        <View className="flex-row items-center">
                          <Ionicons name="car" size={14} color={theme === 'dark' ? '#FFFFFF' : '#6B7280'} />
                          <Text className="text-sm ml-1 text-typography-500 dark:text-typography-400">
                            {taxi.plateNumber}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {selectedTaxi === taxi.id && (
                    <View className="mt-4 pt-4 border-t border-outline-200 dark:border-outline-700">
                      <CNMIButton
                        title="Request This Taxi"
                        onPress={handleTaxiRequest}
                        icon={<Ionicons name="call" size={20} color="white" />}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              </CNMICard>
            ))}
          </View>

          {/* Emergency Contact */}
          <CNMICard variant="outlined" className="m-4 mb-8">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-red-100 dark:bg-red-900 rounded-full items-center justify-center mr-3">
                <Ionicons name="call" size={20} color={theme === 'dark' ? '#F87171' : '#DC2626'} />
              </View>
              <View className="flex-1">
                <Text 
                  className="font-semibold text-typography-900"
                  style={{ color: theme === 'dark' ? '#FFFFFF' : undefined }}
                >
                  Emergency Taxi
                </Text>
                <Text className="text-sm text-typography-500 dark:text-typography-400">
                  24/7 emergency taxi service
                </Text>
              </View>
              <TouchableOpacity className="bg-red-600 px-4 py-2 rounded-lg">
                <Text className="text-white font-medium">CALL</Text>
              </TouchableOpacity>
            </View>
          </CNMICard>
        </ScrollView>

        {/* Taxi Request Confirmation Modal */}
        <Modal
          visible={showTaxiRequestModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowTaxiRequestModal(false)}
        >
          <BlurView 
            intensity={70} 
            tint="light" 
            className="flex-1 justify-center items-center px-4 z-50"
          >
            <View className="bg-cnmi-primary rounded-3xl p-6 w-full max-w-sm">
              <Text className="text-white text-2xl font-bold mb-2 text-center">Taxi requested!</Text>
              <Text className="text-white text-lg mb-1 text-center">Your taxi driver is on</Text>
              <Text className="text-white text-lg mb-6 text-center">the way.</Text>
              
              <TouchableOpacity 
                className="bg-purple-700 rounded-full py-3 px-8 self-center"
                onPress={handleGotIt}
              >
                <Text className="text-white font-medium text-lg">Got It!</Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}