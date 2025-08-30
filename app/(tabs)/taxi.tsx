import { CNMIButton } from '@/components/ui/CNMIButton';
import { CNMICard } from '@/components/ui/CNMICard';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Alert, Linking, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TaxiScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [selectedTaxi, setSelectedTaxi] = useState<string | null>(null);
  const [showTaxiRequestModal, setShowTaxiRequestModal] = useState(false);
  const [showEmergencyConfirmModal, setShowEmergencyConfirmModal] = useState(false);

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
    { name: 'I Love Saipan', icon: 'bag' },
  ];

  const handleTaxiRequest = () => {
    setShowTaxiRequestModal(true);
  };

  const handleGotIt = () => {
    setShowTaxiRequestModal(false);
    router.push('/map');
  };

  const handleEmergencyCall = () => {
    setShowEmergencyConfirmModal(true);
  };

  const handleConfirmEmergencyCall = async () => {
    setShowEmergencyConfirmModal(false);
    try {
      const url = 'tel:911';
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Phone calls are not supported on this device');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to make emergency call');
    }
  };

  const handleCancelEmergencyCall = () => {
    setShowEmergencyConfirmModal(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50 dark:bg-background-0">
      <View className="flex-1 bg-background-50 dark:bg-background-0">
        {/* Header */}
        <View className="px-4 py-3 border-b border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
          <Text className="text-xl font-bold text-typography-900 dark:text-typography-900">
            Call-A-Ride Saipan/Paratransit
          </Text>
          <Text className="text-sm text-typography-600 dark:text-typography-400">
            Accessible transportation services across CNMI
          </Text>
        </View>

        <ScrollView className="flex-1 bg-background-50 dark:bg-background-0">
          {/* CARS/Paratransit Notice */}
          <CNMICard variant="outlined" className="m-4 border-cnmi-primary/30">
            <View className="flex-row items-start">
              <View className="w-10 h-10 bg-cnmi-primary/10 rounded-full items-center justify-center mr-3">
                <Ionicons name="car" size={20} color="#6B46C1" />
              </View>
              <View className="flex-1">
                <Text className="font-semibold text-typography-900 dark:text-typography-900 mb-1">CARS/Paratransit Service</Text>
                <Text className="text-sm text-typography-600 dark:text-typography-400 mb-2">
                  Accessible transportation requires advance reservation. Book your trip at least 2 days in advance.
                </Text>
                <View className="flex-row items-center">
                  <Ionicons name="call" size={16} color="#6B46C1" />
                  <Text className="text-cnmi-primary font-medium ml-2 text-sm">(670) 664-4287</Text>
                </View>
              </View>
            </View>
          </CNMICard>

          {/* Location Input */}
          <CNMICard variant="elevated" className="m-4">
  <View className="space-y-4">
    {/* Pickup */}
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
          className="flex-1 ml-2 text-base text-typography-900 dark:text-typography-900"
          style={{ height: 40 }}
          multiline={false}
          numberOfLines={1}
          scrollEnabled={false}
        />
        <TouchableOpacity>
          <Ionicons
            name="locate"
            size={20}
            color={theme === 'dark' ? '#FFFFFF' : '#6B7280'}
          />
        </TouchableOpacity>
      </View>
    </View>

    {/* Destination */}
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
          className="flex-1 ml-2 text-base text-typography-900 dark:text-typography-900"
          style={{ height: 40 }}
          multiline={false}
          numberOfLines={1}
          scrollEnabled={false}
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

          {/* Available Vehicles */}
          <View className="px-4">
            <Text className="text-lg font-semibold mb-3 text-typography-900 dark:text-typography-900">
              Available Vehicles
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
                        title="Request This Vehicle"
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
                  Emergency 
                </Text>
                <Text className="text-sm text-typography-500 dark:text-typography-400">
                  24/7 emergency services
                </Text>
              </View>
              <TouchableOpacity 
                className="bg-red-600 px-4 py-2 rounded-lg"
                onPress={handleEmergencyCall}
              >
                <Text className="text-white font-medium">CALL</Text>
              </TouchableOpacity>
            </View>
          </CNMICard>
        </ScrollView>

        {/* Taxi Request Confirmation Modal */}
        <Modal
          visible={showTaxiRequestModal}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShowTaxiRequestModal(false)}
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
                  Ride confirmed
                </Text>
                <Text className="text-base text-center text-typography-600 dark:text-typography-400 leading-5">
                  Your driver is on the way
                </Text>
              </View>

              {/* Driver Info Card */}
              {selectedTaxi && (
                <View className="bg-background-50 dark:bg-background-100 rounded-2xl p-4 mb-6 border border-outline-200 dark:border-outline-700">
                  <View className="flex-row items-center">
                    <View className="w-14 h-14 bg-cnmi-primary rounded-full items-center justify-center mr-4">
                      <Ionicons name="person" size={24} color="white" />
                    </View>
                    
                    <View className="flex-1">
                      <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900 mb-1">
                        {availableTaxis.find(t => t.id === selectedTaxi)?.driver}
                      </Text>
                      <View className="flex-row items-center">
                        <Ionicons name="star" size={14} color="#EAB308" />
                        <Text className="text-sm ml-1 text-typography-600 dark:text-typography-400">
                          {availableTaxis.find(t => t.id === selectedTaxi)?.rating} • {availableTaxis.find(t => t.id === selectedTaxi)?.vehicle}
                        </Text>
                      </View>
                      <Text className="text-sm text-typography-500 dark:text-typography-400 mt-1">
                        {availableTaxis.find(t => t.id === selectedTaxi)?.plateNumber}
                      </Text>
                    </View>
                    
                    <View className="items-end">
                      <Text className="text-lg font-bold text-cnmi-primary mb-1">
                        {availableTaxis.find(t => t.id === selectedTaxi)?.estimatedTime}
                      </Text>
                      <Text className="text-sm text-typography-500 dark:text-typography-400">
                        away
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              {/* Action Buttons */}
              <View>
                <TouchableOpacity 
                  className="bg-cnmi-primary rounded-2xl py-4 px-6 flex-row items-center justify-center mb-3"
                  onPress={handleGotIt}
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 4 }}
                >
                  <Text className="text-white font-semibold text-lg mr-2">View on Map</Text>
                  <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="bg-background-100 dark:bg-background-200 rounded-2xl py-4 px-6 border border-outline-200 dark:border-outline-700"
                  onPress={() => setShowTaxiRequestModal(false)}
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
                  setShowTaxiRequestModal(false);
                  // You can add cancel ride logic here
                }}
              >
                <Text className="text-center text-sm text-typography-500 dark:text-typography-400 underline">
                  Cancel ride
                </Text>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Modal>

        {/* Emergency Call Confirmation Modal */}
        <Modal
          visible={showEmergencyConfirmModal}
          transparent={true}
          animationType="fade"
          onRequestClose={handleCancelEmergencyCall}
        >
          <BlurView 
            intensity={80} 
            tint="dark" 
            className="flex-1 justify-center items-center px-4 z-50"
          >
            <View className="bg-background-0 dark:bg-background-50 rounded-3xl p-6 w-full max-w-sm border border-outline-200 dark:border-outline-700">
              <View className="items-center mb-6">
                <View className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full items-center justify-center mb-4">
                  <Ionicons name="warning" size={32} color="#DC2626" />
                </View>
                <Text className="text-xl font-bold text-center mb-2 text-typography-900 dark:text-typography-900">
                  Emergency Call
                </Text>
                <Text className="text-base text-center text-typography-600 dark:text-typography-400">
                  Are you sure you want to call 911 emergency services?
                </Text>
              </View>
              
              <View className="flex-row">
                <TouchableOpacity 
                  className="flex-1 bg-background-100 dark:bg-background-200 rounded-lg py-3 px-4 border border-outline-200 dark:border-outline-700 mr-3"
                  onPress={handleCancelEmergencyCall}
                >
                  <Text className="text-center font-medium text-typography-700 dark:text-typography-300">
                    Cancel
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  className="flex-1 bg-red-600 rounded-lg py-3 px-4"
                  onPress={handleConfirmEmergencyCall}
                >
                  <Text className="text-center font-medium text-white">
                    Call 911
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </Modal>
      </View>
    </SafeAreaView>
  );
}