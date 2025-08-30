import { CNMICard } from '@/components/ui/CNMICard';
import { useTheme } from '@/contexts/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function GuideScreen() {
  const { theme } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('attractions');

  const iconColor = theme === 'dark' ? '#FFFFFF' : '#6B7280';

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
      transitInfo: 'Route 8, 12 - Stop: Memorial Park',
      image: '🌳',
      tips: 'Best visited in the morning. Free entry.'
    },
    {
      id: '2',
      name: 'Managaha Island',
      description: 'Pristine island paradise with crystal clear waters',
      category: 'Beach',
      transitInfo: 'Route 16 to Smiling Cove Marina',
      image: '🏝️',
      tips: 'Take ferry from Smiling Cove. Bring snorkel gear.'
    },
    {
      id: '3',
      name: 'Last Command Post',
      description: 'Historic WWII site with panoramic island views',
      category: 'Historical',
      transitInfo: 'Route 4 to Capitol Hill, then taxi',
      image: '🏛️',
      tips: 'Wear comfortable shoes. Great for sunset views.'
    },
    {
      id: '4',
      name: 'Grotto',
      description: 'World-famous diving and snorkeling spot',
      category: 'Diving',
      transitInfo: 'Route 12 Express to Grotto Road',
      image: '🤿',
      tips: 'Best for experienced swimmers. Bring underwater camera.'
    }
  ];

  const dining = [
    {
      id: 'd1',
      name: 'Himawari Restaurant',
      description: 'Popular Japanese and local fusion spot',
      category: 'Restaurant',
      transitInfo: 'Route 12 - Garapan Center',
      image: '🍣',
      tips: 'Try the bento and fresh sashimi.'
    },
    {
      id: 'd2',
      name: 'J’s Restaurant',
      description: 'Local comfort food and BBQ',
      category: 'Local',
      transitInfo: 'Route 8 - Middle Road',
      image: '🍗',
      tips: 'Lunchtime gets busy; arrive early.'
    },
    {
      id: 'd3',
      name: 'Shirley’s Coffee Shop',
      description: 'All-day breakfast and island classics',
      category: 'Cafe',
      transitInfo: 'Route 16 - Beach Road',
      image: '☕',
      tips: 'Great pancakes; portions are generous.'
    }
  ];

  const shopping = [
    {
      id: 's2',
      name: 'Joeten Shopping Center',
      description: 'Groceries and essentials in one place',
      category: 'Center',
      transitInfo: 'Route 8 - Susupe',
      image: '🛒',
      tips: 'Best spot to stock up on snacks and water.'
    },
    {
      id: 's3',
      name: 'I Love Saipan',
      description: 'Iconic souvenir shop with local gifts and apparel',
      category: 'Shopping',
      transitInfo: 'Route 10 - Garapan Shopping District',
      image: '🎁',
      tips: 'Check bundle deals and local-made crafts near checkout.'
    },
    {
      id: 's4',
      name: 'ABC Stores',
      description: 'Convenience chain with snacks, drinks, and souvenirs',
      category: 'Convenience',
      transitInfo: 'Route 10 - Multiple locations around Garapan',
      image: '🛍️',
      tips: 'Open late—grab water and sunscreen before beach trips.'
    }
  ];

  const culture = [
    {
      id: 'c1',
      name: 'Saipan Katori Shrine',
      description: 'Historic Shinto shrine with tranquil grounds',
      category: 'Heritage',
      transitInfo: 'Route 4 - Capitol Hill',
      image: '⛩️',
      tips: 'Be respectful; photography may be restricted in some areas.'
    },
    {
      id: 'c2',
      name: 'CNMI Museum of History & Culture',
      description: 'Exhibits on Chamorro and Carolinian heritage',
      category: 'Museum',
      transitInfo: 'Route 12 - Capitol Hill',
      image: '🏺',
      tips: 'Check hours; some galleries rotate.'
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
    <SafeAreaView className="flex-1 bg-background-50 dark:bg-background-0">
      <View className="flex-1 bg-background-50 dark:bg-background-0">
        {/* Header */}
        <View className="px-4 py-3 border-b border-outline-200 dark:border-outline-700 bg-background-0 dark:bg-background-50">
          <Text className="text-xl font-bold text-typography-900 dark:text-typography-900">
            Visitor Guide
          </Text>
          <Text className="text-sm text-typography-600 dark:text-typography-400">
            Discover CNMI with local insights
          </Text>
        </View>

        <ScrollView className="flex-1 bg-background-50 dark:bg-background-0">
          {/* Welcome Card */}
          <View className="mx-4 mt-4 mb-6 bg-white dark:bg-background-50 rounded-3xl shadow-sm border border-outline-100 dark:border-outline-800"
                style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.04, shadowRadius: 8 }}>
            <View className="px-6 py-8">
              <View className="items-center mb-6">
                <View className="w-16 h-16 bg-cnmi-primary/10 dark:bg-cnmi-primary/20 rounded-full items-center justify-center mb-4">
                  <Text className="text-3xl">🌺</Text>
                </View>
                <Text className="text-2xl font-bold text-typography-900 dark:text-typography-900 text-center mb-2">
                  Hafa Adai!
                </Text>
                <Text className="text-lg font-medium text-cnmi-primary dark:text-cnmi-primary text-center mb-3">
                  Welcome to CNMI
                </Text>
                <Text className="text-typography-600 dark:text-typography-400 text-center text-base leading-6 max-w-sm">
                  Your island adventure starts here. Let us help you explore the beauty of the Northern Mariana Islands.
                </Text>
              </View>
            </View>
          </View>

          {/* Transit Tips */}
          <View className="px-4 mb-6">
            <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900 mb-3">Transit Tips for Visitors</Text>
            {transitTips.map((tip, index) => (
              <CNMICard key={index} variant="default" className="mb-3">
                <View className="flex-row items-start">
                  <View className="w-10 h-10 bg-cnmi-light rounded-full items-center justify-center mr-3">
                    <Ionicons name={tip.icon as any} size={20} color="#6B46C1" />
                  </View>
                  <View className="flex-1">
                    <Text className="font-semibold text-typography-900 dark:text-typography-900 mb-1">{tip.title}</Text>
                    <Text className="text-sm text-typography-600 dark:text-typography-400">{tip.description}</Text>
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
                className={`flex-row items-center px-4 py-2 rounded-full mr-3 ${selectedCategory === category.id
                  ? 'bg-cnmi-primary'
                  : 'bg-background-0 dark:bg-background-50 border border-outline-200 dark:border-outline-700'
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

          {/* Category Items */}
          <View className="px-4 mb-6">
            <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900 mb-3">
              {selectedCategory === 'attractions' && 'Must-Visit Attractions'}
              {selectedCategory === 'dining' && 'Great Places to Eat'}
              {selectedCategory === 'shopping' && 'Where to Shop'}
              {selectedCategory === 'culture' && 'Culture & Heritage'}
            </Text>
            {(selectedCategory === 'attractions' ? attractions
              : selectedCategory === 'dining' ? dining
              : selectedCategory === 'shopping' ? shopping
              : culture).map((item) => (
              <CNMICard key={item.id} variant="elevated" className="mb-4">
                <View className="flex-row">
                  {/* Image Placeholder */}
                  <View className="w-16 h-16 bg-cnmi-light rounded-lg items-center justify-center mr-4">
                    <Text className="text-2xl">{item.image}</Text>
                  </View>

                  {/* Content */}
                  <View className="flex-1">
                    <View className="flex-row items-center mb-1">
                      <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900">
                        {item.name}
                      </Text>
                    </View>

                    <Text className="text-sm text-typography-600 dark:text-typography-400 mb-2">
                      {item.description}
                    </Text>

                    <View className="bg-cnmi-light rounded-lg p-2 mb-2">
                      <View className="flex-row items-center">
                        <Ionicons name="bus" size={14} color="#6B46C1" />
                        <Text className="text-xs text-cnmi-primary ml-1 font-medium">
                          {item.transitInfo}
                        </Text>
                      </View>
                    </View>

                    <Text className="text-xs text-typography-500 dark:text-typography-400 italic">
                      💡 {item.tips}
                    </Text>
                  </View>
                </View>

                {/* Action Buttons */}
                <View className="flex-row mt-4 pt-4 border-t border-outline-200 dark:border-outline-700">
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 mr-2 bg-cnmi-light rounded-lg">
                    <Ionicons name="map" size={16} color="#6B46C1" />
                    <Text className="text-cnmi-primary font-medium ml-2">Directions</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="flex-1 flex-row items-center justify-center py-2 ml-2 bg-cnmi-primary rounded-lg">
                    <Ionicons name={selectedCategory === 'dining' ? 'calendar' : 'bus'} size={16} color="white" />
                    <Text className="text-white font-medium ml-2">{selectedCategory === 'dining' ? 'Reserve' : 'Plan Trip'}</Text>
                  </TouchableOpacity>
                </View>
              </CNMICard>
            ))}
          </View>

          {/* Emergency Contacts */}
          <CNMICard variant="outlined" className="m-4 mb-8">
            <Text className="text-lg font-semibold text-typography-900 dark:text-typography-900 mb-3">Emergency Contacts</Text>
            <View className="space-y-3">
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="call" size={20} color="#DC2626" />
                  <Text className="ml-3 text-typography-900 dark:text-typography-900">Emergency Services</Text>
                </View>
                <Text className="font-bold text-typography-900 dark:text-typography-900">911</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="medical" size={20} color="#16A34A" />
                  <Text className="ml-3 text-typography-900 dark:text-typography-900">Tourist Assistance</Text>
                </View>
                <Text className="font-bold text-typography-900 dark:text-typography-900">(670) 664-3200</Text>
              </View>
              <View className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Ionicons name="bus" size={20} color="#6B46C1" />
                  <Text className="ml-3 text-typography-900 dark:text-typography-900">Transit Info</Text>
                </View>
                <Text className="font-bold text-typography-900 dark:text-typography-900">(670) 664-4287</Text>
              </View>
            </View>
          </CNMICard>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}