import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { PetCard, FilterChip } from '../components';
import { theme } from '../theme';

// Mock data for pets
const MOCK_PETS = [
    {
        id: '1',
        name: 'Buddy',
        age: '2y',
        type: 'dog' as const,
        imageUri: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400&h=300&fit=crop',
        isNeutered: true,
        isVaccinated: true,
        shelterName: 'Happy Paws NGO',
        shelterLocation: 'Austin',
        isFavorite: false,
    },
    {
        id: '2',
        name: 'Luna',
        age: '1y',
        type: 'cat' as const,
        imageUri: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=300&fit=crop',
        isNeutered: false,
        isVaccinated: true,
        shelterName: 'Austin Pet Rescue',
        shelterLocation: 'Austin',
        isFavorite: false,
    },
    {
        id: '3',
        name: 'Cooper',
        age: '4y',
        type: 'dog' as const,
        imageUri: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=300&fit=crop',
        isNeutered: true,
        isVaccinated: true,
        shelterName: 'Furry Friends NGO',
        shelterLocation: 'Dallas',
        isFavorite: false,
    },
];

interface AdoptionListScreenProps {
    navigation: any;
}

export const AdoptionListScreen: React.FC<AdoptionListScreenProps> = ({ navigation }) => {
    const [selectedFilter, setSelectedFilter] = useState<string>('all');
    const [pets, setPets] = useState(MOCK_PETS);
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = () => {
        setIsRefreshing(true);
        setTimeout(() => setIsRefreshing(false), 1500);
    };

    const handleFavorite = (petId: string) => {
        setPets(pets.map(pet =>
            pet.id === petId ? { ...pet, isFavorite: !pet.isFavorite } : pet
        ));
    };

    const filteredPets = pets.filter(pet => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'dogs') return pet.type === 'dog';
        if (selectedFilter === 'cats') return pet.type === 'cat';
        return true;
    });

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTitleContainer}>
                    <Text style={styles.headerTitle}>Adopt a Friend</Text>
                    <Text style={styles.headerSubtitle}>From trusted animal welfare NGOs</Text>
                </View>
                <Pressable style={styles.searchButton}>
                    <Ionicons name="search" size={22} color={theme.colors.textPrimary} />
                </Pressable>
            </View>

            {/* Filter Chips */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScroll}
                >
                    <FilterChip
                        label="Dogs"
                        icon="paw"
                        selected={selectedFilter === 'dogs'}
                        onPress={() => setSelectedFilter(selectedFilter === 'dogs' ? 'all' : 'dogs')}
                    />
                    <FilterChip
                        label="Cats"
                        icon="paw"
                        selected={selectedFilter === 'cats'}
                        onPress={() => setSelectedFilter(selectedFilter === 'cats' ? 'all' : 'cats')}
                    />
                    <FilterChip
                        label="Location"
                        dropdown
                        onPress={() => console.log('Open location picker')}
                    />
                </ScrollView>
            </View>

            {/* Pet List */}
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={isRefreshing}
                        onRefresh={handleRefresh}
                        tintColor={theme.colors.greenPrimary}
                    />
                }
            >
                {filteredPets.map(pet => (
                    <PetCard
                        key={pet.id}
                        name={pet.name}
                        age={pet.age}
                        type={pet.type}
                        imageUri={pet.imageUri}
                        isNeutered={pet.isNeutered}
                        isVaccinated={pet.isVaccinated}
                        shelterName={pet.shelterName}
                        shelterLocation={pet.shelterLocation}
                        isFavorite={pet.isFavorite}
                        onPress={() => navigation.navigate('AdoptionExit', { petId: pet.id })}
                        onFavoritePress={() => handleFavorite(pet.id)}
                    />
                ))}

                {/* Disclaimer */}
                <Text style={styles.disclaimer}>
                    All adoptions are reviewed and approved by the respective NGO.
                    PawGuard AI ensures verification of all listed organizations.
                </Text>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
    },
    headerTitleContainer: {
        flex: 1,
    },
    headerTitle: {
        ...theme.textStyles.h3,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        ...theme.textStyles.body,
        color: theme.colors.textSecondary,
        fontSize: 13,
        marginTop: 2,
    },
    searchButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        ...theme.glassEffect,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterContainer: {
        paddingBottom: theme.spacing.md,
    },
    filterScroll: {
        paddingHorizontal: theme.spacing.xl,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: theme.layout.tabBarHeight + theme.spacing.xl,
    },
    disclaimer: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        textAlign: 'center',
        fontSize: 11,
        lineHeight: 16,
        marginTop: theme.spacing.lg,
        paddingHorizontal: theme.spacing.md,
    },
});
