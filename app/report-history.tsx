import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FloatingCard } from '../components/FloatingCard';
import { StatusBadge } from '../components/StatusBadge';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { getAnimalsByUser } from '../services/animalService';
import { useAuth } from '../contexts/AuthContext';
import { AnimalIdentity } from '../types';

export default function ReportHistoryScreen() {
    const router = useRouter();
    const { user } = useAuth();
    const isNGO = user?.role === 'ngo';
    const accentColor = isNGO ? '#0891B2' : colors.minimalist.coral;
    const [animals, setAnimals] = useState<AnimalIdentity[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadUserAnimals();
    }, [user]);

    const loadUserAnimals = async () => {
        if (!user) {
            setAnimals([]);
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            console.log('📥 Loading animals for user:', user.id);
            const userAnimals = await getAnimalsByUser(user.id);
            console.log('✅ Loaded', userAnimals.length, 'animals');

            // Debug: Check if images are loaded
            userAnimals.forEach((animal, index) => {
                console.log(`Animal ${index + 1}:`, {
                    id: animal.systemId,
                    species: animal.species,
                    breed: animal.breed,
                    imageUrl: animal.primaryImageUrl ? 'Has image ✅' : 'No image ❌',
                    embedding: animal.embedding ? 'Has embedding ✅' : 'No embedding ❌'
                });
            });

            setAnimals(userAnimals);
        } catch (error) {
            console.error('❌ Error loading animals:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.textDark} />
                </Pressable>
                <Text style={styles.title}>Report History</Text>
            </View>


            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {isLoading ? (
                    <View style={styles.loadingState}>
                        <ActivityIndicator size="large" color={accentColor} />
                        <Text style={styles.loadingText}>Loading your animals...</Text>
                    </View>
                ) : animals.length > 0 ? (
                    animals.map((animal) => (
                        <Pressable
                            key={animal.id}
                            onPress={() => router.push({
                                pathname: '/animal-profile',
                                params: { id: animal.id }
                            })}
                        >
                            {({ pressed }) => (
                                <FloatingCard shadow="soft" style={[styles.reportCard, pressed && styles.pressed]}>
                                    <View style={styles.cardContent}>
                                        {animal.primaryImageUrl && (
                                            <Image
                                                source={{ uri: animal.primaryImageUrl }}
                                                style={styles.thumbnail}
                                            />
                                        )}
                                        <View style={styles.cardInfo}>
                                            <View style={styles.cardHeader}>
                                                <View style={styles.animalInfo}>
                                                    <Text style={styles.animalName}>
                                                        {animal.species === 'dog' ? '🐕' : '🐈'} {animal.breed}
                                                    </Text>
                                                    <Text style={[styles.animalId, { color: accentColor }]}>
                                                        ID: {animal.systemId}
                                                    </Text>
                                                    <Text style={styles.reportDate}>
                                                        {new Date(animal.lastSeenAt).toLocaleDateString()} • {animal.lastSeenLocation}
                                                    </Text>
                                                </View>
                                                <StatusBadge status={animal.status as any} />
                                            </View>

                                            {animal.color && (
                                                <Text style={styles.colorText}>Color: {animal.color}</Text>
                                            )}
                                            {animal.embedding && (
                                                <View style={[styles.embeddingBadge, { backgroundColor: isNGO ? 'rgba(165, 229, 237, 0.25)' : colors.minimalist.peachLight }]}>
                                                    <Ionicons name="finger-print" size={12} color={accentColor} />
                                                    <Text style={[styles.embeddingText, { color: accentColor }]}>Identity Saved</Text>
                                                </View>
                                            )}
                                        </View>
                                    </View>

                                    <View style={styles.divider} />

                                    <View style={styles.cardFooter}>
                                        <Text style={[styles.viewDetails, { color: accentColor }]}>View Details</Text>
                                        <Ionicons name="chevron-forward" size={16} color={accentColor} />
                                    </View>
                                </FloatingCard>
                            )}
                        </Pressable>
                    ))
                ) : (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={64} color={colors.minimalist.textLight} />
                        <Text style={styles.emptyText}>No animals scanned yet</Text>
                        <Pressable
                            style={[styles.ctaButton, { backgroundColor: accentColor }]}
                            onPress={() => router.push('/AIReportCamera')}
                        >
                            <Text style={styles.ctaText}>Scan Your First Animal</Text>
                        </Pressable>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.minimalist.bgLight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.lg,
        backgroundColor: colors.minimalist.white,
    },
    backButton: {
        marginRight: spacing.md,
    },
    title: {
        ...serifTextStyles.serifHeading,
        fontSize: 22,
        color: colors.minimalist.textDark,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
    },
    reportCard: {
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    pressed: {
        opacity: 0.9,
    },
    cardHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    animalInfo: {
        flex: 1,
        marginRight: spacing.sm,
    },
    animalName: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginBottom: 4,
    },
    reportDate: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
    },
    divider: {
        height: 1,
        backgroundColor: colors.minimalist.border,
        marginVertical: spacing.md,
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    viewDetails: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.coral,
        marginRight: 4,
    },
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    emptyText: {
        fontSize: 18,
        color: colors.minimalist.textMedium,
        marginTop: spacing.md,
        marginBottom: spacing.xl,
    },
    ctaButton: {
        backgroundColor: colors.minimalist.coral,
        paddingHorizontal: spacing.xl,
        paddingVertical: 12,
        borderRadius: 25,
    },
    ctaText: {
        color: colors.minimalist.white,
        fontWeight: '600',
        fontSize: 16,
    },
    cardContent: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    thumbnail: {
        width: 60,
        height: 60,
        borderRadius: 12,
        backgroundColor: colors.gray200,
    },
    cardInfo: {
        flex: 1,
    },
    colorText: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
        marginTop: 4,
    },
    loadingState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    loadingText: {
        fontSize: 16,
        color: colors.minimalist.textMedium,
        marginTop: spacing.md,
    },
    animalId: {
        fontSize: 12,
        color: colors.minimalist.coral,
        fontWeight: '600',
        marginBottom: 2,
    },
    embeddingBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 6,
        backgroundColor: colors.minimalist.peachLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    embeddingText: {
        fontSize: 11,
        color: colors.minimalist.coral,
        fontWeight: '600',
    },
});
