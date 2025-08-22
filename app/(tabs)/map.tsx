import { CNMICard } from '@/components/ui/CNMICard';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    SafeAreaView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function MapScreen() {
    const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
    const [trackingBus, setTrackingBus] = useState<string | null>(null);
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Bottom sheet snap points - initially hidden, then show when destination selected
    const snapPoints = useMemo(() => ['15%', '60%'], []);

    // Saipan coordinates
    const initialRegion = {
        latitude: 15.2137,
        longitude: 145.7546,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    // Mock bus locations
    const busLocations = [
        { id: '1', latitude: 15.2100, longitude: 145.7500, route: '16', heading: 45 },
        { id: '2', latitude: 15.2200, longitude: 145.7600, route: '8', heading: 180 },
        { id: '3', latitude: 15.2050, longitude: 145.7450, route: '12', heading: 270 },
    ];

    // Mock data
    const nextArrivals = [
        { id: '1', route: '16 routes High School', time: '2 min', type: 'bus' },
        { id: '2', route: 'Ada Gym Track & Field', time: '5 min', type: 'bus' },
        { id: '3', route: 'Saipan International Airport', time: '8 min', type: 'bus' },
        { id: '4', route: 'First Hawaiian Bank', time: '12 min', type: 'bus' },
    ];

    const nearbyTaxis = [
        { id: '1', driver: 'Ms. Cab', price: '$3.00 Per', time: '3 min' },
        { id: '2', driver: 'Saipan Pickup', price: '$4.50', time: '5 min' },
        { id: '3', driver: 'Staying Lit', price: '$3.75', time: '7 min' },
    ];

    // Mock destinations for search
    const destinations = [
        { id: '1', name: 'Saipan International Airport', type: 'airport' },
        { id: '2', name: 'Garapan Tourist District', type: 'district' },
        { id: '3', name: 'Northern Marianas College', type: 'school' },
        { id: '4', name: 'Commonwealth Health Center', type: 'hospital' },
        { id: '5', name: 'American Memorial Park', type: 'park' },
        { id: '6', name: 'DFS Galleria', type: 'shopping' },
        { id: '7', name: 'Micro Beach', type: 'beach' },
        { id: '8', name: 'Susupe', type: 'district' },
    ];

    // Mock route options for destinations
    const routeOptions = [
        { id: '1', route: 'Route 16', destination: 'Saipan International Airport', duration: '25 min', nextBus: '3 min' },
        { id: '2', route: 'Route 8', destination: 'Garapan Tourist District', duration: '15 min', nextBus: '7 min' },
        { id: '3', route: 'Route 12', destination: 'Northern Marianas College', duration: '20 min', nextBus: '5 min' },
    ];

    const handleCheckIn = () => {
        // TODO: Implement check-in functionality
        console.log('Check in pressed');
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
        setShowSearchResults(text.length > 0);
    };

    const handleDestinationSelect = (destination: string) => {
        setSelectedDestination(destination);
        setSearchQuery(destination);
        setShowSearchResults(false);
        // Open bottom sheet to show route options
        bottomSheetRef.current?.snapToIndex(1);
    };

    const handleRouteSelect = (routeId: string) => {
        setTrackingBus(routeId);
        setSelectedRoute(routeId);
        // Minimize bottom sheet after selecting route
        bottomSheetRef.current?.snapToIndex(0);
    };

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    return (
        <GestureHandlerRootView className="flex-1">
            <SafeAreaView className="flex-1 bg-cnmi-gray-50">
                {/* Header */}
                <View className="bg-white px-4 py-3 border-b border-cnmi-gray-200 z-10">
                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text className="text-lg font-semibold text-cnmi-gray-900">Transit CNMI</Text>
                            <Text className="text-sm text-cnmi-gray-600">Saipan, CNMI</Text>
                        </View>
                        <View className="flex-row items-center space-x-2">
                            {/* Check In Button */}
                            <TouchableOpacity
                                onPress={handleCheckIn}
                                className="w-10 h-10 bg-cnmi-primary rounded-full items-center justify-center shadow-lg"
                            >
                                <Ionicons name="checkmark-circle" size={20} color="white" />
                            </TouchableOpacity>
                            <TouchableOpacity className="p-2">
                                <Ionicons name="person-circle" size={32} color="#6B46C1" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {/* Map */}
                <View className="flex-1 relative">
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        style={{ flex: 1 }}
                        initialRegion={initialRegion}
                        showsUserLocation={true}
                        showsMyLocationButton={false}
                        showsCompass={false}
                        toolbarEnabled={false}
                    >
                        {/* Bus Markers */}
                        {busLocations.map((bus) => (
                            <Marker
                                key={bus.id}
                                coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
                                anchor={{ x: 0.5, y: 0.5 }}
                            >
                                <View className="bg-cnmi-primary rounded-full p-2 shadow-lg">
                                    <Ionicons name="bus" size={20} color="white" />
                                </View>
                            </Marker>
                        ))}
                    </MapView>

                    {/* Search Overlay - Only show when no destination selected */}
                    {!selectedDestination && (
                        <View className="absolute top-4 left-4 right-4 z-20">
                            <CNMICard variant="elevated">
                                <View className="flex-row items-center" style={{ minHeight: 44 }}>
                                    <Ionicons name="search" size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                    <TextInput
                                        placeholder="Where do you want to go?"
                                        value={searchQuery}
                                        onChangeText={handleSearch}
                                        className="flex-1 text-cnmi-gray-900 text-base"
                                        placeholderTextColor="#9CA3AF"
                                        style={{
                                            textAlignVertical: 'center',
                                            paddingVertical: 0,
                                            height: 44,
                                            lineHeight: 20
                                        }}
                                        multiline={false}
                                    />
                                    {searchQuery.length > 0 && (
                                        <TouchableOpacity onPress={() => {
                                            setSearchQuery('');
                                            setShowSearchResults(false);
                                            setSelectedDestination(null);
                                            setTrackingBus(null);
                                            setSelectedRoute(null);
                                        }}>
                                            <Ionicons name="close" size={20} color="#6B7280" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </CNMICard>

                            {/* Search Results */}
                            {showSearchResults && (
                                <View className="mt-2">
                                    <CNMICard variant="elevated">
                                        {destinations
                                            .filter(dest => dest.name.toLowerCase().includes(searchQuery.toLowerCase()))
                                            .slice(0, 5)
                                            .map((destination) => (
                                                <TouchableOpacity
                                                    key={destination.id}
                                                    onPress={() => handleDestinationSelect(destination.name)}
                                                    className="flex-row items-center py-3 border-b border-cnmi-gray-100 last:border-b-0"
                                                >
                                                    <Ionicons
                                                        name={destination.type === 'airport' ? 'airplane' :
                                                            destination.type === 'school' ? 'school' :
                                                                destination.type === 'hospital' ? 'medical' :
                                                                    destination.type === 'park' ? 'leaf' :
                                                                        destination.type === 'shopping' ? 'storefront' :
                                                                            destination.type === 'beach' ? 'water' : 'location'}
                                                        size={20}
                                                        color="#6B46C1"
                                                        style={{ marginRight: 12 }}
                                                    />
                                                    <Text className="flex-1 text-cnmi-gray-900">{destination.name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                    </CNMICard>
                                </View>
                            )}
                        </View>
                    )}



                    {/* Bus Tracking */}
                    {trackingBus && (
                        <View className="absolute top-4 left-4 right-4 z-20">
                            <CNMICard variant="elevated">
                                <View className="flex-row items-center justify-between">
                                    <View className="flex-1">
                                        <Text className="font-semibold text-cnmi-gray-900">Tracking Route 16</Text>
                                        <Text className="text-sm text-cnmi-gray-600">Next arrival: 2 min • To {selectedDestination}</Text>
                                    </View>
                                    <TouchableOpacity onPress={() => {
                                        setTrackingBus(null);
                                        setSelectedRoute(null);
                                    }}>
                                        <Ionicons name="close" size={24} color="#6B7280" />
                                    </TouchableOpacity>
                                </View>
                            </CNMICard>
                        </View>
                    )}
                </View>

                {/* Bottom Sheet */}
                <BottomSheet
                    ref={bottomSheetRef}
                    index={-1}
                    snapPoints={snapPoints}
                    onChange={handleSheetChanges}
                    backgroundStyle={{ backgroundColor: 'white' }}
                    handleIndicatorStyle={{ backgroundColor: '#D1D5DB' }}
                    enablePanDownToClose={false}
                >
                    {/* Search Bar in Bottom Sheet */}
                    {selectedDestination && (
                        <View className="px-4 pb-4 border-b border-cnmi-gray-200">
                            <CNMICard variant="elevated">
                                <View className="flex-row items-center" style={{ minHeight: 44 }}>
                                    <Ionicons name="search" size={20} color="#6B7280" style={{ marginRight: 12 }} />
                                    <TextInput
                                        placeholder="Where do you want to go?"
                                        value={searchQuery}
                                        onChangeText={handleSearch}
                                        className="flex-1 text-cnmi-gray-900 text-base"
                                        placeholderTextColor="#9CA3AF"
                                        style={{
                                            textAlignVertical: 'center',
                                            paddingVertical: 0,
                                            height: 44,
                                            lineHeight: 20
                                        }}
                                        multiline={false}
                                    />
                                    <TouchableOpacity onPress={() => {
                                        setSearchQuery('');
                                        setShowSearchResults(false);
                                        setSelectedDestination(null);
                                        setTrackingBus(null);
                                        setSelectedRoute(null);
                                        bottomSheetRef.current?.close();
                                    }}>
                                        <Ionicons name="close" size={20} color="#6B7280" />
                                    </TouchableOpacity>
                                </View>
                            </CNMICard>
                        </View>
                    )}

                    <View className="px-4 pb-4">
                        <Text className="text-lg font-semibold text-cnmi-gray-900 mb-4">
                            {selectedDestination && !trackingBus ? `Routes to ${selectedDestination}` : 'Transit Info'}
                        </Text>
                    </View>

                    <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                        {/* Route Options for Selected Destination */}
                        {selectedDestination && !trackingBus && (
                            <View className="mb-6">
                                <Text className="text-lg font-semibold text-cnmi-gray-900 mb-3">Choose your route</Text>
                                {routeOptions.map((route) => (
                                    <TouchableOpacity
                                        key={route.id}
                                        onPress={() => handleRouteSelect(route.id)}
                                        className="flex-row items-center justify-between py-3 border-b border-cnmi-gray-100"
                                    >
                                        <View className="flex-row items-center flex-1">
                                            <View className="w-10 h-10 bg-cnmi-primary rounded-full items-center justify-center mr-3">
                                                <Ionicons name="bus" size={20} color="white" />
                                            </View>
                                            <View className="flex-1">
                                                <Text className="font-medium text-cnmi-gray-900">{route.route}</Text>
                                                <Text className="text-sm text-cnmi-gray-600">{route.duration} journey</Text>
                                            </View>
                                        </View>
                                        <View className="items-end">
                                            <Text className="font-semibold text-cnmi-primary">{route.nextBus}</Text>
                                            <Text className="text-xs text-cnmi-gray-500">Next bus</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}

                        {/* Default Transit Info when no destination selected */}
                        {!selectedDestination && (
                            <>
                                {/* Next Arrivals */}
                                <View className="mb-6">
                                    <Text className="text-lg font-semibold text-cnmi-gray-900 mb-3">Next Arrivals</Text>
                                    {nextArrivals.map((arrival) => (
                                        <TouchableOpacity
                                            key={arrival.id}
                                            onPress={() => setSelectedRoute(arrival.id)}
                                            className="flex-row items-center justify-between py-3 border-b border-cnmi-gray-100"
                                        >
                                            <View className="flex-row items-center flex-1">
                                                <View className="w-10 h-10 bg-cnmi-primary rounded-full items-center justify-center mr-3">
                                                    <Ionicons name="bus" size={20} color="white" />
                                                </View>
                                                <View className="flex-1">
                                                    <Text className="font-medium text-cnmi-gray-900">{arrival.route}</Text>
                                                    <Text className="text-sm text-cnmi-gray-600">Bus Route</Text>
                                                </View>
                                            </View>
                                            <View className="items-end">
                                                <Text className="font-semibold text-cnmi-primary">{arrival.time}</Text>
                                                <Text className="text-xs text-cnmi-gray-500">Arrival</Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* Nearby Taxis */}
                                <View className="mb-8">
                                    <Text className="text-lg font-semibold text-cnmi-gray-900 mb-3">Call a Taxi</Text>
                                    {nearbyTaxis.map((taxi) => (
                                        <TouchableOpacity
                                            key={taxi.id}
                                            className="flex-row items-center justify-between py-3 border-b border-cnmi-gray-100"
                                        >
                                            <View className="flex-row items-center flex-1">
                                                <View className="w-10 h-10 bg-cnmi-secondary rounded-full items-center justify-center mr-3">
                                                    <Ionicons name="car" size={20} color="white" />
                                                </View>
                                                <View className="flex-1">
                                                    <Text className="font-medium text-cnmi-gray-900">{taxi.driver}</Text>
                                                    <Text className="text-sm text-cnmi-gray-600">{taxi.price}</Text>
                                                </View>
                                            </View>
                                            <View className="items-end">
                                                <Text className="font-semibold text-cnmi-accent">{taxi.time}</Text>
                                                <TouchableOpacity className="bg-cnmi-accent px-3 py-1 rounded-full mt-1">
                                                    <Text className="text-white text-xs font-medium">CALL</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </>
                        )}
                    </BottomSheetScrollView>
                </BottomSheet>
            </SafeAreaView>
        </GestureHandlerRootView>
    );
}