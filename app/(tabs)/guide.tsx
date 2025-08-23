import { CNMICard } from '@/components/ui/CNMICard';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function GuideScreen() {
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('attractions');

  const categories = [
    { id: 'attractions', name: 'Attractions', icon: 'camera' },
    { id: 'dining', name: 'Dining', icon: 'restaurant' },
    { id: 'shopping', name: 'Shopping', icon: 'bag' },
    { id: 'culture', name: 'Culture', icon: 'library' },
  ];

  const attractions = [
    {
      id: '1',
      name: 'American Memorial Park',
      description: 'Beautiful park commemorating WWII battles',
      category: 'Park',
      rating: 4.8,
      transitInfo: 'Route 8, 12 - Stop: Memorial Park',
      image: '🌳',
      tips: 'Best visited in the morning. Free entry.'
    },
    {
      id: '2',
      name: 'Managaha Island',
      description: 'Pristine island paradise with crystal clear waters',
      category: 'Beach',
      rating: 4.9,
      transitInfo: 'Route 16 to Smiling Cove Marina',
      image: '🏝️',
      tips: 'Take ferry from Smiling Cove. Bring snorkel gear.'
    },
    {
      id: '3',
      name: 'Last Command Post',
      description: 'Historic WWII site with panoramic island views',
      category: 'Historical',
      rating: 4.6,
      transitInfo: 'Route 4 to Capitol Hill, then taxi',
      image: '🏛️',
      tips: 'Wear comfortable shoes. Great for sunset views.'
    },
    {
      id: '4',
      name: 'Grotto',
      description: 'World-famous diving and snorkeling spot',
      category: 'Diving',
      rating: 4.7,
      transitInfo: 'Route 12 Express to Grotto Road',
      image: '🤿',
      tips: 'Best for experienced swimmers. Bring underwater camera.'
    }
  ];

  const transitTips = [
    {
      icon: 'time',
      title: 'Bus Schedule',
      description: 'Buses run every 15-30 minutes during peak hours (7-9 AM, 5-7 PM)'
    },
    {
      icon: 'card',
      title: 'Payment',
      description: 'Exact change required. $1.50 for regular routes, $2.00 for express'
    },
    {
      icon: 'location',
      title: 'Bus Stops',
      description: 'Look for purple CNMI Transit signs. Most stops have benches and shade'
    },
    {
      icon: 'people',
      title: 'Local Etiquette',
      description: 'Offer seats to elderly and pregnant passengers. Say "Hafa Adai!" to drivers'
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-cnmi-gray-50" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-cnmi-gray-200">
        <Text className="text-xl font-bold text-cnmi-gray-900">Visitor Guide</Text>
        <Text className="text-sm text-cnmi-gray-600">Discover CNMI with local insights</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Welcome Card */}
        <CNMICard variant="elevated" className="m-4 bg-gradient-to-r from-cnmi-primary to-cnmi-secondary">
          <View className="items-center py-4">
            <Text className="text-2xl mb-2">🌺</Text>
            <Text className="text-xl font-bold text-white text-center mb-2">
              Hafa Adai! Welcome to CNMI
            </Text>
            <Text className="text-cnmi-light text-center">
              Your island adventure starts here. Let us help you explore the beauty of the Northern Mariana Islands.
            </Text>
          </View>
        </CNMICard>

        {/* Transit Tips */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-semibold text-cnmi-gray-900 mb-3">Transit Tips for Visitors</Text>
          {transitTips.map((tip, index) => (
            <CNMICard key={index} variant="default" className="mb-3">
              <View className="flex-row items-start">
                <View className="w-10 h-10 bg-cnmi-light rounded-full items-center justify-center mr-3">
                  <Ionicons name={tip.icon as any} size={20} color="#6B46C1" />
                </View>
                <View className="flex-1">
                  <Text className="font-semibold text-cnmi-gray-900 mb-1">{tip.title}</Text>
                  <Text className="text-sm text-cnmi-gray-600">{tip.description}</Text>
                </View>
              </View>
            </CNMICard>
          ))}
        </View>

        {/* Category Filters */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-4"
          contentContainerStyle={{ paddingHorizontal: 16 }}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => setSelectedCategory(category.id)}
              className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${
                selectedCategory === category.id 
                  ? 'bg-cnmi-primary' 
                  : 'bg-white border border-cnmi-gray-200'
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

        {/* Attractions */}
        <View className="px-4 mb-6">
          <Text className="text-lg font-semibold text-cnmi-gray-900 mb-3">Must-Visit Attractions</Text>
          {attractions.map((attraction) => (
            <CNMICard key={attraction.id} variant="elevated" className="mb-4">
              <View className="flex-row">
                {/* Image Placeholder */}
                <View className="w-16 h-16 bg-cnmi-light rounded-lg items-center justify-center mr-4">
                  <Text className="text-2xl">{attraction.image}</Text>
                </View>

                {/* Content */}
                <View className="flex-1">
                  <View className="flex-row items-center justify-between mb-1">
                    <Text className="text-lg font-semibold text-cnmi-gray-900">
                      {attraction.name}
                    </Text>
                    <View className="flex-row items-center">
                      <Ionicons name="star" size={14} color="#F59E0B" />
                      <Text className="text-sm text-cnmi-gray-600 ml-1">
                        {attraction.rating}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-sm text-cnmi-gray-600 mb-2">
                    {attraction.description}
                  </Text>

                  <View className="bg-cnmi-light rounded-lg p-2 mb-2">
                    <View className="flex-row items-center">
                      <Ionicons name="bus" size={14} color="#6B46C1" />
                      <Text className="text-xs text-cnmi-primary ml-1 font-medium">
                        {attraction.transitInfo}
                      </Text>
                    </View>
                  </View>

                  <Text className="text-xs text-cnmi-gray-500 italic">
                    💡 {attraction.tips}
                  </Text>
                </View>
              </View>

              {/* Action Buttons */}
              <View className="flex-row mt-4 pt-4 border-t border-cnmi-gray-100">
                <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 mr-2 bg-cnmi-light rounded-lg">
                  <Ionicons name="map" size={16} color="#6B46C1" />
                  <Text className="text-cnmi-primary font-medium ml-2">Directions</Text>
                </TouchableOpacity>
                <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 ml-2 bg-cnmi-primary rounded-lg">
                  <Ionicons name="bus" size={16} color="white" />
                  <Text className="text-white font-medium ml-2">Plan Trip</Text>
                </TouchableOpacity>
              </View>
            </CNMICard>
          ))}
        </View>

        {/* Emergency Contacts */}
        <CNMICard variant="outlined" className="m-4 mb-8">
          <Text className="text-lg font-semibold text-cnmi-gray-900 mb-3">Emergency Contacts</Text>
          <View className="space-y-3">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="call" size={20} color="#DC2626" />
                <Text className="ml-3 text-cnmi-gray-900">Emergency Services</Text>
              </View>
              <Text className="font-bold text-cnmi-gray-900">911</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="medical" size={20} color="#059669" />
                <Text className="ml-3 text-cnmi-gray-900">Tourist Assistance</Text>
              </View>
              <Text className="font-bold text-cnmi-gray-900">(670) 664-3200</Text>
            </View>
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center">
                <Ionicons name="bus" size={20} color="#6B46C1" />
                <Text className="ml-3 text-cnmi-gray-900">Transit Info</Text>
              </View>
              <Text className="font-bold text-cnmi-gray-900">(670) 664-4287</Text>
            </View>
          </View>
        </CNMICard>
      </ScrollView>
    </SafeAreaView>
  );
}