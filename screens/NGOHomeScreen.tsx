import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    Dimensions,
    Animated,
    Platform,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { useAuth } from '../contexts/AuthContext';
import { useData } from '../contexts/DataContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data for NGO home
const rescueStories = [
    {
        id: '1',
        title: 'Bella\'s Journey Home',
        subtitle: 'From streets to safety',
        image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800',
        tag: 'Success Story',
        color: '#0891B2',
    },
    {
        id: '2',
        title: 'Max\'s Recovery',
        subtitle: 'Healing with love',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=800',
        tag: 'In Progress',
        color: '#A5E5ED',
    },
];

const urgentReports = [
    {
        id: '1',
        animal: 'Injured Cat',
        location: 'Marina Bay',
        time: '15 min ago',
        severity: 'critical',
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
    },
    {
        id: '2',
        animal: 'Lost Dog',
        location: 'Orchard Road',
        time: '1 hour ago',
        severity: 'high',
        image: 'https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600',
    },
];

const adoptionSpotlights = [
    {
        id: '1',
        name: 'Luna',
        breed: 'Persian Cat',
        age: '2 years',
        image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600',
        interested: 8,
    },
    {
        id: '2',
        name: 'Buddy',
        breed: 'Golden Retriever',
        age: '1 year',
        image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600',
        interested: 12,
    },
    {
        id: '3',
        name: 'Whiskers',
        breed: 'Tabby',
        age: '6 months',
        image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600',
        interested: 5,
    },
];

// Animated Story Card
const StoryCard: React.FC<{
    story: typeof rescueStories[0];
    index: number;
}> = ({ story, index }) => {
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                delay: index * 100,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                delay: index * 100,
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.96, duration: 100, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
        ]).start();
    };

    return (
        <Animated.View
            style={[
                styles.storyCard,
                {
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <Pressable onPress={handlePress}>
                <Image source={{ uri: story.image }} style={styles.storyImage} resizeMode="cover" />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={styles.storyGradient}
                />
                <View style={[styles.storyTag, { backgroundColor: story.color }]}>
                    <Text style={styles.storyTagText}>{story.tag}</Text>
                </View>
                <View style={styles.storyContent}>
                    <Text style={styles.storyTitle}>{story.title}</Text>
                    <Text style={styles.storySubtitle}>{story.subtitle}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

// Urgent Report Card
const UrgentReportCard: React.FC<{
    report: typeof urgentReports[0];
    onPress: () => void;
}> = ({ report, onPress }) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.97, duration: 100, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
        ]).start();
        onPress();
    };

    const getSeverityColor = () => {
        return report.severity === 'critical' ? '#0891B2' : '#A5E5ED';
    };

    return (
        <Animated.View style={[styles.urgentCard, { transform: [{ scale: scaleAnim }] }]}>
            <Pressable onPress={handlePress} style={styles.urgentCardInner}>
                <Image source={{ uri: report.image }} style={styles.urgentImage} resizeMode="cover" />
                <View style={styles.urgentContent}>
                    <View style={styles.urgentHeader}>
                        <Text style={styles.urgentTitle}>{report.animal}</Text>
                        <View style={[styles.severityDot, { backgroundColor: getSeverityColor() }]}>
                            <View style={[styles.severityPulse, { backgroundColor: getSeverityColor() }]} />
                        </View>
                    </View>
                    <View style={styles.urgentMeta}>
                        <Ionicons name="location" size={12} color={colors.minimalist.textLight} />
                        <Text style={styles.urgentLocation}>{report.location}</Text>
                    </View>
                    <Text style={styles.urgentTime}>{report.time}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.minimalist.textLight} />
            </Pressable>
        </Animated.View>
    );
};

// Adoption Spotlight Card
const SpotlightCard: React.FC<{
    pet: typeof adoptionSpotlights[0];
    index: number;
}> = ({ pet, index }) => {
    const scaleAnim = useRef(new Animated.Value(0.9)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.spring(scaleAnim, {
                toValue: 1,
                delay: index * 80,
                friction: 8,
                useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
                toValue: 1,
                delay: index * 80,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    };

    return (
        <Animated.View
            style={[
                styles.spotlightCard,
                {
                    transform: [{ scale: scaleAnim }],
                    opacity: opacityAnim,
                },
            ]}
        >
            <Pressable onPress={handlePress}>
                <Image source={{ uri: pet.image }} style={styles.spotlightImage} resizeMode="cover" />
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                    style={styles.spotlightGradient}
                />
                <View style={styles.spotlightBadge}>
                    <Ionicons name="heart" size={10} color="#fff" />
                    <Text style={styles.spotlightBadgeText}>{pet.interested}</Text>
                </View>
                <View style={styles.spotlightContent}>
                    <Text style={styles.spotlightName}>{pet.name}</Text>
                    <Text style={styles.spotlightBreed}>{pet.breed}</Text>
                </View>
            </Pressable>
        </Animated.View>
    );
};

// Quick Stats Card
const QuickStats: React.FC = () => {
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 600,
            delay: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    return (
        <Animated.View style={[styles.statsContainer, { opacity: fadeAnim }]}>
            <View style={styles.statBox}>
                <LinearGradient colors={['#F9F8D9', '#A5E5ED']} style={styles.statGradient}>
                    <Text style={styles.statNumber}>12</Text>
                    <Text style={styles.statLabel}>Pending Reports</Text>
                </LinearGradient>
            </View>
            <View style={styles.statBox}>
                <LinearGradient colors={['#BBF3DE', '#A2CEA9']} style={styles.statGradient}>
                    <Text style={styles.statNumber}>28</Text>
                    <Text style={styles.statLabel}>Animals Rescued</Text>
                </LinearGradient>
            </View>
            <View style={styles.statBox}>
                <LinearGradient colors={['#A5E5ED', '#BBF3DE']} style={styles.statGradient}>
                    <Text style={styles.statNumber}>15</Text>
                    <Text style={styles.statLabel}>Adoptions</Text>
                </LinearGradient>
            </View>
        </Animated.View>
    );
};

export const NGOHomeScreen: React.FC = () => {
    const router = useRouter();
    const { user } = useAuth();
    const { isDisasterModeActive, activeAlert } = useData();
    const [refreshing, setRefreshing] = useState(false);
    const scrollY = useRef(new Animated.Value(0)).current;

    const onRefresh = async () => {
        setRefreshing(true);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
    };

    const headerOpacity = scrollY.interpolate({
        inputRange: [0, 100],
        outputRange: [1, 0.9],
        extrapolate: 'clamp',
    });

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            {/* Animated Header */}
            <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
                <View>
                    <Text style={styles.greeting}>Welcome</Text>
                    <Text style={styles.orgName}>{user?.name || 'Happy Paws Shelter'}</Text>
                </View>
            </Animated.View>

            <Animated.ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], {
                    useNativeDriver: true,
                })}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#0891B2" />
                }
            >
                {/* Disaster Banner (Conditional) */}
                {isDisasterModeActive && (
                    <Pressable
                        style={styles.disasterBanner}
                        onPress={() => router.push('/disaster-mode')}
                    >
                        <LinearGradient
                            colors={[colors.minimalist.errorRed, '#991B1B']}
                            style={styles.disasterGradient}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        >
                            <View style={styles.disasterIconRow}>
                                <Ionicons name="alert-circle" size={24} color="white" />
                                <View style={styles.disasterTextContent}>
                                    <Text style={styles.disasterTitle}>ACTIVE EMERGENCY: {activeAlert?.title}</Text>
                                    <Text style={styles.disasterSubtitle}>Disaster Mode is currently enabled</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="white" />
                            </View>
                        </LinearGradient>
                    </Pressable>
                )}

                {/* Quick Stats */}
                <QuickStats />

                {/* Rescue Stories Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Rescue Stories</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.storiesScroll}
                    >
                        {rescueStories.map((story, index) => (
                            <StoryCard key={story.id} story={story} index={index} />
                        ))}
                    </ScrollView>
                </View>

                {/* Urgent Reports Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Needs Attention</Text>
                    </View>
                    {urgentReports.map(report => (
                        <UrgentReportCard
                            key={report.id}
                            report={report}
                            onPress={() => router.push({ pathname: '/ngo-report-detail', params: { reportId: report.id } })}
                        />
                    ))}
                </View>

                {/* Adoption Spotlights Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Adoption Spotlight</Text>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.spotlightsScroll}
                    >
                        {adoptionSpotlights.map((pet, index) => (
                            <SpotlightCard key={pet.id} pet={pet} index={index} />
                        ))}
                    </ScrollView>
                </View>

                {/* Disaster Mode Action (Only if not active) */}
                {!isDisasterModeActive && (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Emergency Readiness</Text>
                        </View>
                        <Pressable
                            style={styles.disasterEntryCard}
                            onPress={() => router.push('/disaster-mode')}
                        >
                            <View style={styles.disasterEntryIcon}>
                                <Ionicons name="warning" size={24} color={colors.minimalist.errorRed} />
                            </View>
                            <View style={styles.disasterEntryContent}>
                                <Text style={styles.disasterEntryTitle}>Prepare Disaster Mode</Text>
                                <Text style={styles.disasterEntryDesc}>Configure emergency protocols and alert levels</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={colors.minimalist.textLight} />
                        </Pressable>
                    </View>
                )}

                {/* Motivational Card */}
                <View style={styles.motivationCard}>
                    <LinearGradient
                        colors={['#F9F8D9', '#BBF3DE']}
                        style={styles.motivationGradient}
                    >
                        <Text style={styles.motivationEmoji}>🐾</Text>
                        <Text style={styles.motivationText}>
                            Every animal deserves a chance at happiness.{'\n'}Thank you for being their hope.
                        </Text>
                    </LinearGradient>
                </View>

                <View style={styles.bottomSpacing} />
            </Animated.ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#FAFCFA',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: '#FAFCFA',
    },
    greeting: {
        fontSize: 14,
        color: colors.minimalist.textLight,
        marginBottom: 2,
    },
    orgName: {
        ...serifTextStyles.serifSubheading,
        fontSize: 22,
        color: colors.minimalist.textDark,
    },
    notificationBtn: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.06, shadowRadius: 8 },
            android: { elevation: 2 },
        }),
    },
    notificationDot: {
        position: 'absolute',
        top: 10,
        right: 10,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#0891B2',
    },
    scrollView: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 100,
    },
    // Stats
    statsContainer: {
        flexDirection: 'row',
        paddingHorizontal: spacing.xl,
        gap: spacing.md,
        marginTop: spacing.lg,
        marginBottom: spacing.xxl,
    },
    statBox: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    statGradient: {
        padding: spacing.md,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.minimalist.textDark,
    },
    statLabel: {
        fontSize: 11,
        color: colors.minimalist.textMedium,
        marginTop: 2,
        textAlign: 'center',
    },
    // Section
    section: {
        marginBottom: spacing.xxl + spacing.md,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: spacing.xl,
        marginBottom: spacing.xl,
    },
    sectionTitle: {
        ...serifTextStyles.serifSubheading,
        fontSize: 18,
        color: colors.minimalist.textDark,
    },
    seeAll: {
        fontSize: 13,
        fontWeight: '600',
        color: '#0891B2',
    },
    // Story Cards
    storiesScroll: {
        paddingHorizontal: spacing.xl,
        gap: spacing.lg,
    },
    storyCard: {
        width: SCREEN_WIDTH * 0.7,
        height: 200,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#fff',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.12, shadowRadius: 16 },
            android: { elevation: 6 },
        }),
    },
    storyImage: {
        width: '100%',
        height: '100%',
    },
    storyGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
    },
    storyTag: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.md,
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    storyTagText: {
        fontSize: 11,
        fontWeight: '700',
        color: '#fff',
    },
    storyContent: {
        position: 'absolute',
        bottom: spacing.md,
        left: spacing.md,
        right: spacing.md,
    },
    storyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#fff',
    },
    storySubtitle: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.85)',
        marginTop: 2,
    },
    // Urgent Cards
    urgentCard: {
        marginHorizontal: spacing.xl,
        marginBottom: spacing.md,
        backgroundColor: '#fff',
        borderRadius: 16,
        overflow: 'hidden',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.06, shadowRadius: 8 },
            android: { elevation: 2 },
        }),
    },
    urgentCardInner: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.sm,
    },
    urgentImage: {
        width: 56,
        height: 56,
        borderRadius: 12,
    },
    urgentContent: {
        flex: 1,
        marginLeft: spacing.md,
    },
    urgentHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    urgentTitle: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    severityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        position: 'relative',
    },
    severityPulse: {
        position: 'absolute',
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'inherit',
        opacity: 0.4,
    },
    urgentMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 2,
    },
    urgentLocation: {
        fontSize: 12,
        color: colors.minimalist.textLight,
    },
    urgentTime: {
        fontSize: 11,
        color: '#0891B2',
        marginTop: 2,
    },
    // Spotlight Cards
    spotlightsScroll: {
        paddingHorizontal: spacing.xl,
        gap: spacing.lg,
    },
    spotlightCard: {
        width: 130,
        height: 170,
        borderRadius: 16,
        overflow: 'hidden',
        backgroundColor: '#fff',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
            android: { elevation: 3 },
        }),
    },
    spotlightImage: {
        width: '100%',
        height: '100%',
    },
    spotlightGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
    },
    spotlightBadge: {
        position: 'absolute',
        top: spacing.sm,
        right: spacing.sm,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        backgroundColor: '#A5E5ED',
        paddingHorizontal: 6,
        paddingVertical: 3,
        borderRadius: 10,
    },
    spotlightBadgeText: {
        fontSize: 10,
        fontWeight: '700',
        color: '#fff',
    },
    spotlightContent: {
        position: 'absolute',
        bottom: spacing.sm,
        left: spacing.sm,
    },
    spotlightName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#fff',
    },
    spotlightBreed: {
        fontSize: 11,
        color: 'rgba(255,255,255,0.85)',
    },
    // Motivation Card
    motivationCard: {
        marginHorizontal: spacing.xl,
        marginTop: spacing.lg,
        borderRadius: 24,
        overflow: 'hidden',
    },
    motivationGradient: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    motivationEmoji: {
        fontSize: 32,
        marginBottom: spacing.sm,
    },
    motivationText: {
        fontSize: 15,
        color: colors.minimalist.textMedium,
        textAlign: 'center',
        lineHeight: 22,
    },
    bottomSpacing: {
        height: 40,
    },
    // Disaster Mode Styles
    disasterBanner: {
        marginHorizontal: spacing.xl,
        marginTop: spacing.lg,
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 8,
        shadowColor: colors.minimalist.errorRed,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
    },
    disasterGradient: {
        padding: spacing.md,
    },
    disasterIconRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    disasterTextContent: {
        flex: 1,
    },
    disasterTitle: {
        color: 'white',
        fontSize: 14,
        fontWeight: '800',
        letterSpacing: 1,
    },
    disasterSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 12,
        fontWeight: '500',
    },
    disasterEntryCard: {
        marginHorizontal: spacing.xl,
        backgroundColor: 'white',
        borderRadius: 16,
        padding: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        borderWidth: 1,
        borderColor: 'rgba(239, 68, 68, 0.1)',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 5 },
            android: { elevation: 1 },
        }),
    },
    disasterEntryIcon: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: 'rgba(239, 68, 68, 0.08)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    disasterEntryContent: {
        flex: 1,
    },
    disasterEntryTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.minimalist.textDark,
    },
    disasterEntryDesc: {
        fontSize: 12,
        color: colors.minimalist.textLight,
        marginTop: 2,
    },
});

export default NGOHomeScreen;
