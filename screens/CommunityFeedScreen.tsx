import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { serifTextStyles } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { FloatingCard } from '../components/FloatingCard';
import { MinimalistStatusBadge } from '../components/MinimalistStatusBadge';

interface CommunityFeedScreenProps {
    navigation: any;
}

const communityPosts = [
    {
        id: '1',
        type: 'lost',
        animal: 'Golden Retriever, "Buddy", 2 yrs',
        description: 'Red collar. Last seen near Elm Park, Boston, MA.',
        location: 'Oct 26, 10:30 AM',
        image: 'https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=300&h=300&fit=crop',
        verified: false
    },
    {
        id: '2',
        type: 'found',
        animal: 'Calico cat, female',
        description: 'Found without collar. Now safe at Pet Haven Shelter, Cambridge, MA.',
        location: 'Oct 25, 4:15 PM',
        image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop',
        verified: true
    },
    {
        id: '3',
        type: 'lost',
        animal: 'Black Labrador, "Daisy", 5 yrs',
        description: 'Purple harness. Last seen near Charles River Esplanade, Boston, MA.',
        location: 'Oct 24, 2:50 AM',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=300&fit=crop',
        verified: false
    },
];

export const CommunityFeedScreen: React.FC<CommunityFeedScreenProps> = ({ navigation }) => {
    const [activeFilter, setActiveFilter] = useState('Lost');

    const filters = ['Lost', 'Found', 'Nearby'];

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <Text style={styles.headerTitle}>Community & Lost Pets</Text>

                {/* Filter Tabs */}
                <View style={styles.filterRow}>
                    {filters.map((filter) => (
                        <Pressable
                            key={filter}
                            style={[
                                styles.filterTab,
                                activeFilter === filter && styles.filterTabActive,
                                filter === 'Lost' && activeFilter === filter && { backgroundColor: colors.minimalist.coral },
                                filter === 'Found' && activeFilter === filter && { backgroundColor: colors.minimalist.greenDark },
                                filter === 'Nearby' && activeFilter === filter && { backgroundColor: colors.gray400 },
                            ]}
                            onPress={() => setActiveFilter(filter)}
                        >
                            <Text style={[
                                styles.filterText,
                                activeFilter === filter && styles.filterTextActive
                            ]}>
                                {filter}
                            </Text>
                        </Pressable>
                    ))}
                </View>

                {/* Community Feed */}
                {communityPosts.map((post) => (
                    <FloatingCard
                        key={post.id}
                        style={styles.postCard}
                        backgroundColor={post.verified ? colors.minimalist.peachLight : colors.minimalist.white}
                        shadow="soft"
                    >
                        <View style={styles.postContent}>
                            {/* Post Image */}
                            <Image
                                source={{ uri: post.image }}
                                style={styles.postImage}
                                resizeMode="cover"
                            />

                            {/* Post Details */}
                            <View style={styles.postDetails}>
                                {/* Badge Row */}
                                <View style={styles.badgeRow}>
                                    <MinimalistStatusBadge
                                        label={post.type.toUpperCase()}
                                        variant={post.type as 'lost' | 'found'}
                                    />
                                    {post.verified && (
                                        <MinimalistStatusBadge
                                            label="Verified"
                                            variant="verified"
                                            icon="checkmark-circle"
                                        />
                                    )}
                                </View>

                                {/* Animal Description */}
                                <Text style={styles.animalText}>{post.animal}</Text>
                                <Text style={styles.descriptionText}>{post.description}</Text>

                                {/* Location and Time */}
                                <View style={styles.metaRow}>
                                    <Ionicons name="location-outline" size={16} color={colors.minimalist.textLight} />
                                    <Text style={styles.metaText}>{post.location}</Text>
                                </View>

                                {/* Contact Button */}
                                <Pressable style={styles.contactButton}>
                                    <Ionicons name="mail-outline" size={18} color={colors.minimalist.white} />
                                    <Text style={styles.contactButtonText}>
                                        {post.verified ? 'Contact Shelter' : 'Contact Reporter'}
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                    </FloatingCard>
                ))}

                {/* Footer Spacing */}
                <View style={styles.footer} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.minimalist.bgLight,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.xl,
    },
    headerTitle: {
        ...serifTextStyles.serifHeading,
        color: colors.minimalist.textDark,
        marginBottom: spacing.lg,
    },
    filterRow: {
        flexDirection: 'row',
        marginBottom: spacing.xl,
        gap: spacing.sm,
    },
    filterTab: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: colors.gray200,
    },
    filterTabActive: {
        backgroundColor: colors.minimalist.coral,
    },
    filterText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
    },
    filterTextActive: {
        color: colors.minimalist.white,
    },
    postCard: {
        marginBottom: spacing.lg,
        padding: 0,
        overflow: 'hidden',
    },
    postContent: {
        flexDirection: 'row',
    },
    postImage: {
        width: 100,
        height: 100,
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    postDetails: {
        flex: 1,
        padding: spacing.md,
    },
    badgeRow: {
        flexDirection: 'row',
        marginBottom: spacing.sm,
    },
    animalText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginBottom: 4,
    },
    descriptionText: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
        lineHeight: 20,
        marginBottom: spacing.sm,
    },
    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    metaText: {
        fontSize: 13,
        color: colors.minimalist.textLight,
        marginLeft: 4,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.minimalist.coral,
        paddingVertical: spacing.sm,
        borderRadius: 12,
    },
    contactButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.white,
        marginLeft: 6,
    },
    footer: {
        height: spacing.xxl,
    },
});
