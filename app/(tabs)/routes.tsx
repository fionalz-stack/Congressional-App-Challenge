import { CNMICard } from '@/components/ui/CNMICard';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RoutesScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

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

  return (
    <SafeAreaView className="flex-1 bg-cnmi-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-cnmi-gray-200">
        <Text className="text-xl font-bold text-cnmi-gray-900">Bus Routes</Text>
        <Text className="text-sm text-cnmi-gray-600">Find your route across CNMI</Text>
      </View>

      {/* Search Bar */}
      <View className="bg-white px-4 py-3 border-b border-cnmi-gray-200">
        <View className="flex-row items-center bg-cnmi-gray-100 rounded-lg px-3 py-2">
          <Ionicons name="search" size={20} color="#6B7280" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search routes or destinations..."
            className="flex-1 ml-2 text-base"
          />
        </View>
      </View>

      {/* Category Filters */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-cnmi-gray-200"
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

      {/* Routes List */}
      <ScrollView className="flex-1 px-4 py-4">
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
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 mr-2 bg-cnmi-light rounded-lg">
                <Ionicons name="map" size={16} color="#6B46C1" />
                <Text className="text-cnmi-primary font-medium ml-2">View Route</Text>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 ml-2 bg-cnmi-primary rounded-lg">
                <Ionicons name="checkmark-circle" size={16} color="white" />
                <Text className="text-white font-medium ml-2">Check In</Text>
              </TouchableOpacity>
            </View>
          </CNMICard>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}