import { CNMICard } from '@/components/ui/CNMICard';
import { Ionicons } from '@expo/vector-icons';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useCallback, useMemo, useRef, useState } from 'react';
import {
    Dimensions,
    Image,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDarkMode } from '../../contexts/DarkModeContext';

// Constants
const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');
const SEARCH_BAR_HEIGHT = 33;
const SEARCH_BAR_MARGIN_PERCENT = 0.046; // 4.6% margin from edges
const SEARCH_BAR_TOP_OFFSET = 50; // Additional offset from top
const SEARCH_RESULTS_MAX_HEIGHT_RATIO = 0.4; // 40% of screen height

// Types
type TransitMode = 'fixed' | 'ride';

interface BusLocation {
    id: string;
    latitude: number;
    longitude: number;
    route: string;
    heading: number;
}

interface Destination {
    id: string;
    name: string;
    type: 'airport' | 'district' | 'school' | 'hospital' | 'park' | 'shopping' | 'beach';
}

interface RouteOption {
    id: string;
    route: string;
    destination: string;
    duration: string;
    nextBus: string;
}

interface Arrival {
    id: string;
    route: string;
    time: string;
    type: string;
}

interface Taxi {
    id: string;
    driver: string;
    price: string;
    time: string;
}

export default function MapScreen() {
    // State
    const insets = useSafeAreaInsets();
    const { isDarkMode } = useDarkMode();
    const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showSearchResults, setShowSearchResults] = useState(false);
    const [selectedDestination, setSelectedDestination] = useState<string | null>(null);
    const [trackingBus, setTrackingBus] = useState<string | null>(null);
    const [transitMode, setTransitMode] = useState<TransitMode>('fixed');
    const [headerHeight, setHeaderHeight] = useState(0);
    
    // Refs
    const bottomSheetRef = useRef<BottomSheet>(null);

    // Mock data
    const busLocations: BusLocation[] = [
        { id: '1', latitude: 15.2100, longitude: 145.7500, route: '16', heading: 45 },
        { id: '2', latitude: 15.2200, longitude: 145.7600, route: '8', heading: 180 },
        { id: '3', latitude: 15.2050, longitude: 145.7450, route: '12', heading: 270 },
    ];

    const destinations: Destination[] = [
        { id: '1', name: 'Saipan International Airport', type: 'airport' },
        { id: '2', name: 'Garapan Tourist District', type: 'district' },
        { id: '3', name: 'Northern Marianas College', type: 'school' },
        { id: '4', name: 'Commonwealth Health Center', type: 'hospital' },
        { id: '5', name: 'American Memorial Park', type: 'park' },
        { id: '6', name: 'DFS Galleria', type: 'shopping' },
        { id: '7', name: 'Micro Beach', type: 'beach' },
        { id: '8', name: 'Susupe', type: 'district' },
    ];

    const routeOptions: RouteOption[] = [
        { id: '1', route: 'Route 16', destination: 'Saipan International Airport', duration: '25 min', nextBus: '3 min' },
        { id: '2', route: 'Route 8', destination: 'Garapan Tourist District', duration: '15 min', nextBus: '7 min' },
        { id: '3', route: 'Route 12', destination: 'Northern Marianas College', duration: '20 min', nextBus: '5 min' },
    ];

    const nextArrivals: Arrival[] = [
        { id: '1', route: '16 routes High School', time: '2 min', type: 'bus' },
        { id: '2', route: 'Ada Gym Track & Field', time: '5 min', type: 'bus' },
        { id: '3', route: 'Saipan International Airport', time: '8 min', type: 'bus' },
        { id: '4', route: 'First Hawaiian Bank', time: '12 min', type: 'bus' },
    ];

    const nearbyTaxis: Taxi[] = [
        { id: '1', driver: 'Ms. Cab', price: '$3.00 Per', time: '3 min' },
        { id: '2', driver: 'Saipan Pickup', price: '$4.50', time: '5 min' },
        { id: '3', driver: 'Staying Lit', price: '$3.75', time: '7 min' },
    ];

    // Map configuration
    const initialRegion = {
        latitude: 15.2137,
        longitude: 145.7546,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    // Computed values
    const getSearchBarTopPosition = useCallback(() => {
        const baseTop = insets.top;
        const inchOffset = -96; // Move up by approximately 1 inch (96px)
        const screenHeightRatio = SCREEN_HEIGHT / 800; // 800px as baseline
        const dynamicOffset = inchOffset * screenHeightRatio;
        
        return Math.max(0, baseTop + dynamicOffset + SEARCH_BAR_TOP_OFFSET);
    }, [insets.top]);

    const snapPoints = useMemo(() => {
        const margin = 8;
        const maxHeight = Math.max(300, SCREEN_HEIGHT - headerHeight - margin);
        return ['15%', '60%', maxHeight];
    }, [headerHeight]);

    // Event handlers
    const handleCheckIn = useCallback(() => {
        console.log('Check in pressed');
        // TODO: Implement check-in functionality
    }, []);

    const handleSearch = useCallback((text: string) => {
        setSearchQuery(text);
        setShowSearchResults(text.length > 0);
    }, []);

    const handleClearSearch = useCallback(() => {
        setSearchQuery('');
        setShowSearchResults(false);
        setSelectedDestination(null);
        setTrackingBus(null);
        setSelectedRoute(null);
    }, []);

    const handleDestinationSelect = useCallback((destination: string) => {
        setSelectedDestination(destination);
        setSearchQuery(destination);
        setShowSearchResults(false);
        bottomSheetRef.current?.snapToIndex(1);
    }, []);

    const handleRouteSelect = useCallback((routeId: string) => {
        setTrackingBus(routeId);
        setSelectedRoute(routeId);
        bottomSheetRef.current?.snapToIndex(0);
    }, []);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    const getDestinationIcon = useCallback((type: Destination['type']) => {
        const iconMap: Record<Destination['type'], keyof typeof Ionicons.glyphMap> = {
            airport: 'airplane',
            school: 'school',
            hospital: 'medical',
            park: 'leaf',
            shopping: 'storefront',
            beach: 'water',
            district: 'location'
        };
        return iconMap[type] || 'location';
    }, []);

    const filteredDestinations = useMemo(() => {
        return destinations
            .filter(dest => dest.name.toLowerCase().includes(searchQuery.toLowerCase()))
            .slice(0, 8);
    }, [searchQuery]);

    return (
        <GestureHandlerRootView className="flex-1">
            <SafeAreaView 
                className="flex-1" 
                style={{ 
                    paddingTop: insets.top,
                    backgroundColor: isDarkMode ? '#111827' : '#F9FAFB'
                }}
            >
                {/* Header */}
                <View 
                    className="px-4 py-1 border-b z-10" 
                    style={{
                        backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                        borderColor: isDarkMode ? '#374151' : '#E5E7EB'
                    }}
                    onLayout={(e) => setHeaderHeight(e.nativeEvent.layout.height)}
                >
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Image 
                                source={require('@/assets/images/transit.png')} 
                                className="w-12 h-12"
                                resizeMode="contain"
                            />
                        </View>
                        <View className="flex-row items-center space-x-2">
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

                    {/* Search Overlay */}
                    {!selectedDestination && (
                        <View 
                            className="absolute z-20" 
                            style={{ 
                                top: getSearchBarTopPosition(),
                                left: Math.max(16, SCREEN_WIDTH * SEARCH_BAR_MARGIN_PERCENT),
                                right: Math.max(16, SCREEN_WIDTH * SEARCH_BAR_MARGIN_PERCENT),
                                height: SEARCH_BAR_HEIGHT
                            }}
                        >
                            <CNMICard variant="elevated">
                                <View className="flex-row items-center" style={{ minHeight: SEARCH_BAR_HEIGHT, height: SEARCH_BAR_HEIGHT }}>
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
                                            height: SEARCH_BAR_HEIGHT,
                                            lineHeight: 20
                                        }}
                                        multiline={false}
                                    />
                                    {searchQuery.length > 0 && (
                                        <TouchableOpacity onPress={handleClearSearch}>
                                            <Ionicons name="close" size={20} color="#6B7280" />
                                        </TouchableOpacity>
                                    )}
                                </View>
                            </CNMICard>

                            {/* Search Results */}
                            {showSearchResults && (
                                <View 
                                    className="mt-2"
                                    style={{ maxHeight: SCREEN_HEIGHT * SEARCH_RESULTS_MAX_HEIGHT_RATIO }}
                                >
                                    <CNMICard variant="elevated">
                                        <ScrollView 
                                            showsVerticalScrollIndicator={false}
                                            nestedScrollEnabled={true}
                                        >
                                            {filteredDestinations.map((destination) => (
                                                <TouchableOpacity
                                                    key={destination.id}
                                                    onPress={() => handleDestinationSelect(destination.name)}
                                                    className="flex-row items-center py-3 border-b border-cnmi-gray-100 last:border-b-0"
                                                >
                                                    <Ionicons
                                                        name={getDestinationIcon(destination.type)}
                                                        size={20}
                                                        color="#6B46C1"
                                                        style={{ marginRight: 12 }}
                                                    />
                                                    <Text className="flex-1 text-cnmi-gray-900">{destination.name}</Text>
                                                </TouchableOpacity>
                                            ))}
                                        </ScrollView>
                                    </CNMICard>
                                </View>
                            )}
                        </View>
                    )}

                    {/* Bus Tracking */}
                    {trackingBus && (
                        <View 
                            className="absolute z-20"
                            style={{
                                top: getSearchBarTopPosition() + 60,
                                left: Math.max(16, SCREEN_WIDTH * 0.04),
                                right: Math.max(16, SCREEN_WIDTH * 0.04)
                            }}
                        >
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
                    topInset={headerHeight + 8}
                    backgroundStyle={{ backgroundColor: isDarkMode ? '#1F2937' : 'white' }}
                    handleIndicatorStyle={{ backgroundColor: isDarkMode ? '#6B7280' : '#D1D5DB' }}
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
                                        handleClearSearch();
                                        bottomSheetRef.current?.close();
                                    }}>
                                        <Ionicons name="close" size={20} color="#6B7280" />
                                    </TouchableOpacity>
                                </View>
                            </CNMICard>
                        </View>
                    )}

                    <View className="px-4 pb-4">
                        <Text 
                            className="text-lg font-semibold mb-4"
                            style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                        >
                            {selectedDestination && !trackingBus ? `Routes to ${selectedDestination}` : 'Transit Info'}
                        </Text>
                    </View>

                    <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 16 }}>
                        {/* Destination Summary */}
                        {selectedDestination && (
                            <View className="my-5">
                                <Text 
                                    className="text-base font-semibold"
                                    style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                >
                                    {selectedDestination}
                                </Text>
                                <View className="flex-row items-center mt-1">
                                    <Ionicons name="navigate" size={20} color={isDarkMode ? '#9CA3AF' : '#6B7280'} />
                                    <Text 
                                        className="ml-2"
                                        style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                    >
                                        Approx. distance shown on map
                                    </Text>
                                </View>
                            </View>
                        )}
                                        
                        {/* Route Options for Selected Destination */}
                        {selectedDestination && !trackingBus && (
                            <View className="mb-6">
                                {/* Transit Mode Selector */}
                                <View className="flex-row rounded-full overflow-hidden border border-cnmi-primary mb-4">
                                    <TouchableOpacity
                                        onPress={() => setTransitMode('fixed')}
                                        className="flex-1"
                                        accessibilityRole="button"
                                        accessibilityState={{ selected: transitMode === 'fixed' }}
                                    >
                                        <View className={`${transitMode === 'fixed' ? 'bg-cnmi-primary' : 'bg-transparent'} py-3 items-center`}> 
                                            <Text className={`${transitMode === 'fixed' ? 'text-white' : 'text-cnmi-primary'} font-semibold`}>
                                                Fixed Bus Route
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => setTransitMode('ride')}
                                        className="flex-1"
                                        accessibilityRole="button"
                                        accessibilityState={{ selected: transitMode === 'ride' }}
                                    >
                                        <View className={`${transitMode === 'ride' ? 'bg-cnmi-primary' : 'bg-transparent'} py-3 items-center`}>
                                            <Text className={`${transitMode === 'ride' ? 'text-white' : 'text-cnmi-primary'} font-semibold`}>
                                                Call-A-Ride
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>

                                {transitMode === 'fixed' && (
                                    <View>
                                        <Text 
                                            className="text-lg font-bold mb-3"
                                            style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                        >
                                            Choose your route
                                        </Text>
                                        {routeOptions.map((route) => (
                                            <TouchableOpacity
                                                key={route.id}
                                                onPress={() => handleRouteSelect(route.id)}
                                                className="flex-row items-center justify-between py-3 border-b"
                                                style={{ borderColor: isDarkMode ? '#374151' : '#F3F4F6' }}
                                            >
                                                <View className="flex-row items-center flex-1">
                                                    <View className="w-10 h-10 bg-cnmi-primary rounded-full items-center justify-center mr-3">
                                                        <Ionicons name="bus" size={20} color="white" />
                                                    </View>
                                                    <View className="flex-1">
                                                        <Text 
                                                            className="font-medium"
                                                            style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                                        >
                                                            {route.route}
                                                        </Text>
                                                        <Text 
                                                            className="text-sm"
                                                            style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                                        >
                                                            {route.duration} journey
                                                        </Text>
                                                    </View>
                                                </View>
                                                <View className="items-end">
                                                    <Text className="font-semibold text-cnmi-primary">{route.nextBus}</Text>
                                                    <Text 
                                                        className="text-xs"
                                                        style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                                    >
                                                        Next bus
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </View>
                                )}

                                {transitMode === 'ride' && (
                                    <View>
                                        <Text 
                                            className="text-lg font-bold mb-3"
                                            style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                        >
                                            Nearby drivers
                                        </Text>
                                        {nearbyTaxis.map((taxi) => (
                                            <TouchableOpacity
                                                key={taxi.id}
                                                className="flex-row items-center justify-between py-3 border-b"
                                                style={{ borderColor: isDarkMode ? '#374151' : '#F3F4F6' }}
                                            >
                                                <View className="flex-row items-center flex-1">
                                                    <View className="w-10 h-10 bg-cnmi-secondary rounded-full items-center justify-center mr-3">
                                                        <Ionicons name="car" size={20} color="white" />
                                                    </View>
                                                    <View className="flex-1">
                                                        <Text 
                                                            className="font-medium"
                                                            style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                                        >
                                                            {taxi.driver}
                                                        </Text>
                                                        <Text 
                                                            className="text-sm"
                                                            style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                                        >
                                                            {taxi.price}
                                                        </Text>
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
                                )}
                            </View>
                        )}

                        {/* Default Transit Info */}
                        {!selectedDestination && (
                            <>
                                {/* Next Arrivals */}
                                <View className="mb-6">
                                    <Text 
                                        className="text-lg font-semibold mb-3"
                                        style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                    >
                                        Next Arrivals
                                    </Text>
                                    {nextArrivals.map((arrival) => (
                                        <TouchableOpacity
                                            key={arrival.id}
                                            onPress={() => setSelectedRoute(arrival.id)}
                                            className="flex-row items-center justify-between py-3 border-b"
                                            style={{ borderColor: isDarkMode ? '#374151' : '#F3F4F6' }}
                                        >
                                            <View className="flex-row items-center flex-1">
                                                <View className="w-10 h-10 bg-cnmi-primary rounded-full items-center justify-center mr-3">
                                                    <Ionicons name="bus" size={20} color="white" />
                                                </View>
                                                <View className="flex-1">
                                                    <Text 
                                                        className="font-medium"
                                                        style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                                    >
                                                        {arrival.route}
                                                    </Text>
                                                    <Text 
                                                        className="text-sm"
                                                        style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                                    >
                                                        Bus Route
                                                    </Text>
                                                </View>
                                            </View>
                                            <View className="items-end">
                                                <Text className="font-semibold text-cnmi-primary">{arrival.time}</Text>
                                                <Text 
                                                    className="text-xs"
                                                    style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                                >
                                                    Arrival
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))}
                                </View>

                                {/* Nearby Taxis */}
                                <View className="mb-8">
                                    <Text 
                                        className="text-lg font-semibold mb-3"
                                        style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                    >
                                        Call a Taxi
                                    </Text>
                                    {nearbyTaxis.map((taxi) => (
                                        <TouchableOpacity
                                            key={taxi.id}
                                            className="flex-row items-center justify-between py-3 border-b"
                                            style={{ borderColor: isDarkMode ? '#374151' : '#F3F4F6' }}
                                        >
                                            <View className="flex-row items-center flex-1">
                                                <View className="w-10 h-10 bg-cnmi-secondary rounded-full items-center justify-center mr-3">
                                                    <Ionicons name="car" size={20} color="white" />
                                                </View>
                                                <View className="flex-1">
                                                    <Text 
                                                        className="font-medium"
                                                        style={{ color: isDarkMode ? '#F9FAFB' : '#111827' }}
                                                    >
                                                        {taxi.driver}
                                                    </Text>
                                                    <Text 
                                                        className="text-sm"
                                                        style={{ color: isDarkMode ? '#9CA3AF' : '#6B7280' }}
                                                    >
                                                        {taxi.price}
                                                    </Text>
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