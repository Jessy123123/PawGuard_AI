import React, { useState, useRef, useCallback } from 'react';
import { View, ScrollView, StyleSheet, Dimensions, Pressable, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import {
    DisasterLocationTabs,
    DisasterStatusBanner,
    AnimalQuickViewSheet,
    AnimalListCard,
    DisasterFilterChips,
} from '../components/disaster';
import { AnimalPinIcon } from '../components/disaster/AnimalMapPin';
import type {
    DisasterLocation,
    DisasterAnimal,
    FilterOption,
    SortOption,
    AnimalCondition
} from '../types/disaster';
import { getPinColor } from '../types/disaster';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MAP_HEIGHT = SCREEN_HEIGHT * 0.45;

interface DisasterModeScreenProps {
    navigation: any;
}

// Mock data for demonstration
const MOCK_LOCATIONS: DisasterLocation[] = [
    { id: '1', name: 'Ipoh', latitude: 4.5975, longitude: 101.0901, isActive: true, animalCount: 12, lastUpdated: new Date() },
    { id: '2', name: 'Sri Iskandar', latitude: 4.3830, longitude: 100.9626, isActive: false, animalCount: 3, lastUpdated: new Date() },
    { id: '3', name: 'Taiping', latitude: 4.8512, longitude: 100.7369, isActive: false, animalCount: 0, lastUpdated: new Date() },
];

const MOCK_ANIMALS: DisasterAnimal[] = [
    {
        id: '1',
        animalType: 'cat',
        condition: 'injured',
        photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'],
        locationName: 'Ipoh - Taman Cempaka',
        latitude: 4.5980,
        longitude: 101.0910,
        description: 'Orange tabby cat found near collapsed structure. Appears to have leg injury.',
        reporterNotes: 'Cat is scared but approachable. Needs immediate medical attention.',
        reporter: { id: '1', name: 'Ahmad Razak', phone: '+60123456789', isVerified: true },
        reportedAt: new Date(Date.now() - 30 * 60000),
        lastUpdated: new Date(),
        isAssigned: false,
    },
    {
        id: '2',
        animalType: 'dog',
        condition: 'critical',
        photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
        locationName: 'Ipoh - Jalan Sultan',
        latitude: 4.5965,
        longitude: 101.0895,
        description: 'Golden retriever trapped under debris. Critical condition.',
        reporter: { id: '2', name: 'Sarah Lee', phone: '+60198765432', isVerified: true },
        reportedAt: new Date(Date.now() - 15 * 60000),
        lastUpdated: new Date(),
        isAssigned: true,
        assignedTeam: 'Rescue Team Alpha',
    },
    {
        id: '3',
        animalType: 'cat',
        condition: 'missing',
        photos: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400'],
        locationName: 'Ipoh - Taman Kledang',
        latitude: 4.5995,
        longitude: 101.0880,
        description: 'Grey Persian cat reported missing from flood zone.',
        reporter: { id: '3', name: 'Mei Ling', isVerified: false },
        reportedAt: new Date(Date.now() - 120 * 60000),
        lastUpdated: new Date(),
        isAssigned: false,
    },
    {
        id: '4',
        animalType: 'dog',
        condition: 'rescued',
        photos: ['https://images.unsplash.com/photo-1552053831-71594a27632d?w=400'],
        locationName: 'Ipoh - Pasir Pinji',
        latitude: 4.5950,
        longitude: 101.0920,
        description: 'Mixed breed dog successfully rescued from flooded area.',
        reporter: { id: '4', name: 'Kumar', isVerified: true },
        reportedAt: new Date(Date.now() - 180 * 60000),
        lastUpdated: new Date(),
        isAssigned: false,
    },
];

export const DisasterModeScreen: React.FC<DisasterModeScreenProps> = ({ navigation }) => {
    const [activeLocationId, setActiveLocationId] = useState('1');
    const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
    const [sortOption, setSortOption] = useState<SortOption>('latest');
    const [selectedAnimal, setSelectedAnimal] = useState<DisasterAnimal | null>(null);
    const [hasNotification, setHasNotification] = useState(true);

    const bottomSheetRef = useRef<BottomSheet>(null);
    const mapRef = useRef<MapView>(null);

    const activeLocation = MOCK_LOCATIONS.find(l => l.id === activeLocationId);

    // Filter and sort animals
    const filteredAnimals = MOCK_ANIMALS.filter(animal => {
        if (activeFilter === 'all') return true;
        if (activeFilter === 'cats') return animal.animalType === 'cat';
        if (activeFilter === 'dogs') return animal.animalType === 'dog';
        if (activeFilter === 'critical') return animal.condition === 'critical' || animal.condition === 'injured';
        return true;
    }).sort((a, b) => {
        if (sortOption === 'latest') {
            return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
        }
        if (sortOption === 'mostCritical') {
            const priority: Record<AnimalCondition, number> = {
                critical: 0, injured: 1, missing: 2, safe: 3, rescued: 4
            };
            return priority[a.condition] - priority[b.condition];
        }
        return 0;
    });

    const handlePinPress = useCallback((animalId: string) => {
        const animal = MOCK_ANIMALS.find(a => a.id === animalId);
        if (animal) {
            setSelectedAnimal(animal);
            bottomSheetRef.current?.snapToIndex(0);
        }
    }, []);

    const handleViewDetails = useCallback((animal: DisasterAnimal) => {
        bottomSheetRef.current?.close();
        navigation.navigate('DisasterAnimalDetail', { animalId: animal.id });
    }, [navigation]);

    const handleContactReporter = useCallback((animal: DisasterAnimal) => {
        navigation.navigate('contact-reporter', {
            reporterId: animal.reporter.id,
            name: animal.reporter.name,
            phone: animal.reporter.phone
        });
    }, [navigation]);

    const handleSheetClose = useCallback(() => {
        setSelectedAnimal(null);
    }, []);

    return (
        <GestureHandlerRootView style={styles.rootView}>
            <SafeAreaView style={styles.safeArea} edges={['top']}>
                <StatusBar style="dark" />

                {/* Header */}
                <View style={styles.header}>
                    <Pressable style={styles.headerButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="warning" size={22} color={colors.minimalist.disasterOrange} />
                    </Pressable>

                    <Text style={styles.headerTitle}>Disaster Mode</Text>

                    <Pressable style={styles.headerButton}>
                        <Ionicons name="notifications-outline" size={22} color={colors.minimalist.textDark} />
                        {hasNotification && <View style={styles.notificationBadge} />}
                    </Pressable>
                </View>

                {/* Location Tabs */}
                <DisasterLocationTabs
                    locations={MOCK_LOCATIONS}
                    activeLocationId={activeLocationId}
                    onLocationChange={setActiveLocationId}
                />

                {/* Status Banner */}
                {activeLocation?.isActive && (
                    <DisasterStatusBanner
                        locationName={activeLocation.name}
                        animalCount={activeLocation.animalCount}
                        status="active"
                    />
                )}

                {/* Map */}
                <View style={styles.mapContainer}>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        initialRegion={{
                            latitude: activeLocation?.latitude || 4.5975,
                            longitude: activeLocation?.longitude || 101.0901,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                    >
                        {filteredAnimals.map((animal) => (
                            <Marker
                                key={animal.id}
                                coordinate={{
                                    latitude: animal.latitude,
                                    longitude: animal.longitude
                                }}
                                onPress={() => handlePinPress(animal.id)}
                            >
                                <View style={styles.pinContainer}>
                                    <View style={[
                                        styles.pin,
                                        { backgroundColor: getPinColor(animal.condition) }
                                    ]}>
                                        <Ionicons
                                            name={animal.animalType === 'cat' ? 'logo-octocat' : 'paw'}
                                            size={14}
                                            color={colors.minimalist.white}
                                        />
                                    </View>
                                    <View style={[
                                        styles.pinTip,
                                        { borderTopColor: getPinColor(animal.condition) }
                                    ]} />
                                </View>
                            </Marker>
                        ))}
                    </MapView>

                    {/* Map Legend */}
                    <View style={styles.legend}>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.minimalist.disasterRed }]} />
                            <Text style={styles.legendText}>Injured</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.minimalist.disasterOrange }]} />
                            <Text style={styles.legendText}>Missing</Text>
                        </View>
                        <View style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: colors.minimalist.disasterGray }]} />
                            <Text style={styles.legendText}>Rescued</Text>
                        </View>
                    </View>
                </View>

                {/* Filters */}
                <DisasterFilterChips
                    activeFilter={activeFilter}
                    activeSort={sortOption}
                    onFilterChange={setActiveFilter}
                    onSortChange={setSortOption}
                />

                {/* Animal List */}
                <ScrollView
                    style={styles.animalList}
                    contentContainerStyle={styles.animalListContent}
                    showsVerticalScrollIndicator={false}
                >
                    {filteredAnimals.map((animal) => (
                        <AnimalListCard
                            key={animal.id}
                            animal={animal}
                            onPress={handleViewDetails}
                        />
                    ))}
                </ScrollView>

                {/* Bottom Sheet */}
                <AnimalQuickViewSheet
                    ref={bottomSheetRef}
                    animal={selectedAnimal}
                    onViewDetails={handleViewDetails}
                    onContactReporter={handleContactReporter}
                    onClose={handleSheetClose}
                />
            </SafeAreaView>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    rootView: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.minimalist.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.minimalist.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.minimalist.border,
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.minimalist.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    headerTitle: {
        ...serifTextStyles.serifSubheading,
        color: colors.minimalist.textDark,
    },
    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: colors.minimalist.disasterRed,
    },
    mapContainer: {
        height: MAP_HEIGHT,
        position: 'relative',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    pinContainer: {
        alignItems: 'center',
    },
    pin: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    pinTip: {
        width: 0,
        height: 0,
        borderLeftWidth: 6,
        borderRightWidth: 6,
        borderTopWidth: 8,
        borderLeftColor: 'transparent',
        borderRightColor: 'transparent',
        marginTop: -2,
    },
    legend: {
        position: 'absolute',
        bottom: spacing.md,
        left: spacing.md,
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 8,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        flexDirection: 'row',
        gap: spacing.md,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    legendText: {
        fontSize: 11,
        color: colors.minimalist.textMedium,
    },
    animalList: {
        flex: 1,
    },
    animalListContent: {
        padding: spacing.lg,
        paddingBottom: spacing.xxxl,
    },
});
