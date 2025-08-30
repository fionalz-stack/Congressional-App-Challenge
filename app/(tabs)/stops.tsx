import { CNMICard } from '@/components/ui/CNMICard';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StopsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const [selectedStop, setSelectedStop] = useState<string | null>(null);
  
  // Get route information from navigation params
  const params = useLocalSearchParams();
  const routeId = params.routeId as string || '16';
  const routeName = params.routeName as string || 'Route 16 Northbound';
  const routeDescription = params.routeDescription as string || 'Garapan → Airport → Susupe';

  // Mock bus stops data - in a real app, this would come from the route selection
  const busStops = [
    {
      id: '1',
      name: 'Garapan Central',
      description: 'Main shopping district',
      time: '8:00 AM',
      checkedIn: 12,
      status: 'active'
    },
    {
      id: '2',
      name: 'Airport Terminal',
      description: 'Francisco C. Ada International Airport',
      time: '8:15 AM',
      checkedIn: 8,
      status: 'active'
    },
    {
      id: '3',
      name: 'Susupe Village',
      description: 'Residential area',
      time: '8:30 AM',
      checkedIn: 5,
      status: 'pending'
    },
    {
      id: '4',
      name: 'Capitol Hill',
      description: 'Government center',
      time: '8:45 AM',
      checkedIn: 15,
      status: 'pending'
    }
  ];

  const handleStopPress = (stopId: string) => {
    setSelectedStop(stopId);
  };

  const handleStartRoute = () => {
    // Navigate to map view with route information
    router.push({
      pathname: '/map',
      params: { 
        routeId,
        routeName,
        routeDescription,
        mode: 'driver'
      }
    });
  };



  const getStatusColor = (status: string) => {
    if (status === 'active') return 'bg-green-100 dark:bg-green-900';
    return 'bg-gray-100 dark:bg-gray-800';
  };

  const getStatusTextColor = (status: string) => {
    if (status === 'active') return 'text-green-800 dark:text-green-200';
    return 'text-gray-600 dark:text-gray-400';
  };

  const getStatusText = (status: string) => {
    if (status === 'active') return 'Current Stop';
    return 'Upcoming';
  };

  return (
    <SafeAreaView className="flex-1 bg-background-50 dark:bg-background-0">
      <View className="flex-1 bg-background-50 dark:bg-background-0">
                 {/* Header */}
         <View className="px-4 py-3 border-b border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
           <View className="flex-row items-center">
             <TouchableOpacity 
               onPress={() => router.push('/driverRoute')}
               className="mr-3 p-1"
             >
               <Ionicons 
                 name="arrow-back" 
                 size={24} 
                 color={theme === 'dark' ? '#FFFFFF' : '#6B7280'} 
               />
             </TouchableOpacity>
             <Text className="text-xl font-bold text-typography-900 dark:text-typography-900">
               Bus Stops
             </Text>
           </View>
           <Text className="text-sm text-typography-600 dark:text-typography-400 mt-1">
             {routeName}
           </Text>
         </View>

         {/* Route Status Bar */}
         <View className="px-4 py-2 bg-cnmi-light border-b border-outline-200 dark:border-outline-700">
           <View className="flex-row items-center justify-between">
             <View className="flex-row items-center">
               <View className="w-2 h-2 bg-green-500 rounded-full mr-2"></View>
               <Text className="text-sm font-medium text-cnmi-primary">
                 Route Active
               </Text>
             </View>
             <View className="flex-row items-center">
               <Ionicons name="time" size={16} color="#6B46C1" />
               <Text className="text-sm text-cnmi-primary ml-1 font-medium">
                 Next Stop: 8:00 AM
               </Text>
             </View>
           </View>
         </View>

        {/* Stops List */}
        <View className="flex-1">
          <ScrollView className="px-4 py-4 bg-background-50 dark:bg-background-0">
            {busStops.map((stop, index) => (
              <CNMICard 
                key={stop.id} 
                variant="elevated" 
                className={`mb-4 ${selectedStop === stop.id ? 'ring-2 ring-cnmi-primary' : ''}`}
              >
                <TouchableOpacity onPress={() => handleStopPress(stop.id)}>
                  <View className="flex-row items-start">
                    {/* Stop Number */}
                    <View className="w-12 h-12 rounded-full bg-cnmi-light items-center justify-center mr-4">
                      <Text className="text-cnmi-primary font-bold text-lg">{index + 1}</Text>
                    </View>

                    {/* Stop Info */}
                    <View className="flex-1">
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900">
                          {stop.name}
                        </Text>
                        <View className={`px-3 py-1 rounded-full ${getStatusColor(stop.status)}`}>
                          <Text className={`text-xs font-medium ${getStatusTextColor(stop.status)}`}>
                            {getStatusText(stop.status)}
                          </Text>
                        </View>
                      </View>

                      <Text className="text-typography-600 dark:text-typography-400 mb-2">
                        {stop.description}
                      </Text>

                                             <View className="flex-row items-center justify-between">
                         <View className="flex-row items-center">
                           <Ionicons 
                             name="time" 
                             size={16} 
                             color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                           />
                           <Text className="text-sm text-typography-600 dark:text-typography-400 ml-1">
                             {stop.time}
                           </Text>
                         </View>
                         <View className="flex-row items-center">
                           <Ionicons 
                             name="people" 
                             size={16} 
                             color={theme === 'dark' ? '#9CA3AF' : '#6B7280'} 
                           />
                           <Text className="text-sm text-typography-600 dark:text-typography-400 ml-1">
                             <Text className="text-lg font-bold text-cnmi-primary">{stop.checkedIn}</Text> checked in
                           </Text>
                         </View>
                       </View>
                       
                       
                    </View>
                  </View>
                </TouchableOpacity>
              </CNMICard>
            ))}
          </ScrollView>
        </View>

                 {/* Passenger Summary */}
         <View className="px-4 py-3 border-t border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
           <View className="flex-row items-center justify-between mb-3">
             <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900">
               Passenger Summary
             </Text>
             <View className="bg-cnmi-primary rounded-full px-3 py-1">
               <Text className="text-white font-bold text-lg">
                 {busStops.reduce((total, stop) => total + stop.checkedIn, 0)}
               </Text>
             </View>
           </View>
           <Text className="text-sm text-typography-600 dark:text-typography-400">
             Total passengers checked in across all stops
           </Text>
         </View>

         {/* Action Bar */}
         <View className="px-4 py-4 border-t border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
           <TouchableOpacity 
             className="bg-cnmi-primary rounded-full py-3 px-6"
             onPress={handleStartRoute}
           >
             <Text className="text-white font-semibold text-center text-lg">
               Start Route
             </Text>
           </TouchableOpacity>
         </View>
      </View>
    </SafeAreaView>
  );
}
