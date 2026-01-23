import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FloatingCard } from '../../components/FloatingCard';
import { StatusBadge } from '../../components/StatusBadge';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type FilterStatus = 'all' | 'lost' | 'found' | 'nearby';

export default function CommunityScreen() {
    const router = useRouter();
    const [selectedFilter, setSelectedFilter] = useState<FilterStatus>('all');

    const filters: { key: FilterStatus; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'lost', label: 'Lost' },
        { key: 'found', label: 'Found' },
        { key: 'nearby', label: 'Nearby' },
    ];

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Community Feed</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterBar}>
                {filters.map((filter) => (
                    <Pressable
                        key={filter.key}
                        onPress={() => setSelectedFilter(filter.key)}
                    >
                        {({ pressed }) => (
                            <View style={[
                                styles.filterTab,
                                selectedFilter === filter.key && styles.filterTabActive,
                                pressed && styles.filterTabPressed,
                            ]}>
                                <Text style={[
                                    styles.filterText,
                                    selectedFilter === filter.key && styles.filterTextActive,
                                ]}>
                                    {filter.label}
                                </Text>
                            </View>
                        )}
                    </Pressable>
                ))}
            </View>

            {/* Feed */}
            <ScrollView
                style={styles.feed}
                contentContainerStyle={styles.feedContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Post Card 1 - Lost Pet */}
                <Pressable onPress={() => router.push({
                    pathname: '/animal-profile',
                    params: { id: '1' }
                })}>
                    {({ pressed }) => (
                        <FloatingCard shadow="soft" style={[styles.postCard, pressed && styles.cardPressed]}>
                            <View style={styles.postHeader}>
                                <View style={styles.posterInfo}>
                                    <View style={styles.avatarSmall}>
                                        <Ionicons name="person" size={16} color={colors.minimalist.textMedium} />
                                    </View>
                                    <View>
                                        <Text style={styles.posterName}>Sarah Chen</Text>
                                        <Text style={styles.posterType}>Citizen</Text>
                                    </View>
                                </View>
                                <StatusBadge status="lost" />
                            </View>

                            <View style={styles.petImageContainer}>
                                <View style={styles.petImagePlaceholder}>
                                    <Text style={styles.petEmoji}>🐕</Text>
                                </View>
                            </View>

                            <Text style={styles.postTitle}>Golden Retriever Missing</Text>
                            <Text style={styles.postDescription}>
                                Last seen near Marina Bay. Wearing red collar. Very friendly.
                            </Text>

                            <View style={styles.postFooter}>
                                <View style={styles.locationInfo}>
                                    <Ionicons name="location" size={14} color={colors.minimalist.textMedium} />
                                    <Text style={styles.locationText}>Marina Bay • 3km away</Text>
                                </View>
                                <Text style={styles.timeText}>2h ago</Text>
                            </View>

                            <Pressable
                                style={styles.contactButton}
                                onPress={() => router.push({
                                    pathname: '/contact-reporter',
                                    params: { name: 'Sarah Chen', animalName: 'Golden Retriever' }
                                })}
                            >
                                {({ pressed }) => (
                                    <View style={[styles.contactButtonInner, pressed && styles.buttonPressed]}>
                                        <Ionicons name="call" size={18} color={colors.minimalist.coral} />
                                        <Text style={styles.contactButtonText}>Contact Reporter</Text>
                                    </View>
                                )}
                            </Pressable>
                        </FloatingCard>
                    )}
                </Pressable>

                {/* Post Card 2 - Found Pet */}
                <Pressable onPress={() => router.push({
                    pathname: '/animal-profile',
                    params: { id: '2' }
                })}>
                    {({ pressed }) => (
                        <FloatingCard shadow="soft" style={[styles.postCard, pressed && styles.cardPressed]}>
                            <View style={styles.postHeader}>
                                <View style={styles.posterInfo}>
                                    <View style={[styles.avatarSmall, styles.avatarShelter]}>
                                        <Ionicons name="business" size={16} color={colors.minimalist.white} />
                                    </View>
                                    <View>
                                        <Text style={styles.posterName}>SPCA Shelter</Text>
                                        <Text style={styles.posterType}>Shelter</Text>
                                    </View>
                                </View>
                                <StatusBadge status="found" />
                            </View>

                            <View style={styles.petImageContainer}>
                                <View style={styles.petImagePlaceholder}>
                                    <Text style={styles.petEmoji}>😺</Text>
                                </View>
                            </View>

                            <Text style={styles.postTitle}>Orange Tabby Cat Found</Text>
                            <Text style={styles.postDescription}>
                                Friendly cat rescued from Orchard Road area. Now safe at our facility.
                            </Text>

                            <View style={styles.postFooter}>
                                <View style={styles.locationInfo}>
                                    <Ionicons name="location" size={14} color={colors.minimalist.textMedium} />
                                    <Text style={styles.locationText}>SPCA Orchard • 5km away</Text>
                                </View>
                                <Text style={styles.timeText}>5h ago</Text>
                            </View>

                            <Pressable
                                style={styles.contactButton}
                                onPress={() => router.push({
                                    pathname: '/contact-shelter',
                                    params: { name: 'SPCA Shelter' }
                                })}
                            >
                                {({ pressed }) => (
                                    <View style={[styles.contactButtonInner, pressed && styles.buttonPressed]}>
                                        <Ionicons name="business" size={18} color={colors.minimalist.coral} />
                                        <Text style={styles.contactButtonText}>Contact Shelter</Text>
                                    </View>
                                )}
                            </Pressable>
                        </FloatingCard>
                    )}
                </Pressable>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
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
        padding: spacing.xl,
        paddingBottom: spacing.md,
    },
    title: {
        fontFamily: 'PlayfairDisplay_700Bold',
        fontSize: 28,
        fontWeight: '700',
        color: colors.minimalist.textDark,
    },
    filterBar: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.md,
        gap: spacing.sm,
    },
    filterTab: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: colors.minimalist.white,
    },
    filterTabActive: {
        backgroundColor: colors.minimalist.coral,
    },
    filterTabPressed: {
        opacity: 0.7,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
    },
    filterTextActive: {
        color: colors.minimalist.white,
    },
    feed: {
        flex: 1,
    },
    feedContent: {
        padding: spacing.xl,
    },
    postCard: {
        padding: spacing.lg,
        marginBottom: spacing.lg,
    },
    cardPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    postHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    posterInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    avatarSmall: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: colors.minimalist.warmGray,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarShelter: {
        backgroundColor: colors.minimalist.coral,
    },
    posterName: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    posterType: {
        fontSize: 12,
        color: colors.minimalist.textMedium,
    },
    petImageContainer: {
        marginBottom: spacing.md,
    },
    petImagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: colors.minimalist.warmGray,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    petEmoji: {
        fontSize: 64,
    },
    postTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        marginBottom: spacing.xs,
    },
    postDescription: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
        lineHeight: 20,
        marginBottom: spacing.md,
    },
    postFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    locationInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
    },
    timeText: {
        fontSize: 13,
        color: colors.minimalist.textLight,
    },
    contactButton: {
        marginTop: spacing.sm,
    },
    contactButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: 12,
        borderRadius: 10,
        backgroundColor: `${colors.minimalist.coral}15`,
    },
    buttonPressed: {
        opacity: 0.5,
        backgroundColor: `${colors.minimalist.coral}30`,
    },
    contactButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.coral,
    },
    bottomSpacing: {
        height: spacing.xxl,
    },
});
