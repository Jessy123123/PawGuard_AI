<<<<<<< HEAD
import React, { useState, useRef, useEffect } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 9cfb1f6 (adoption and report)
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    RefreshControl,
<<<<<<< HEAD
    Animated,
    Dimensions,
    Platform,
    Linking,
=======
>>>>>>> 9cfb1f6 (adoption and report)
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
<<<<<<< HEAD
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptics from 'expo-haptics';
=======
>>>>>>> 9cfb1f6 (adoption and report)
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { FloatingCard } from '../components/FloatingCard';
<<<<<<< HEAD
import { NGOReport, ReportStatus, InjurySeverity } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data
=======
import { ReportStatusBadge } from '../components/ReportStatusBadge';
import { SeverityIndicator } from '../components/SeverityIndicator';
import { NGOReport, ReportStatus } from '../types';

// Mock data for demonstration
>>>>>>> 9cfb1f6 (adoption and report)
const mockReports: NGOReport[] = [
    {
        id: '1',
        reportId: 'RPT-2026-0001',
        animalType: 'dog',
<<<<<<< HEAD
        animalBreed: 'Golden Retriever',
        animalColor: 'Golden',
        injurySeverity: 'high',
        injuryDescription: 'Injured leg, limping badly',
        photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600'],
        location: 'Marina Bay Sands',
        coordinates: { lat: 1.2838, lng: 103.8591 },
        reporterName: 'Sarah Chen',
        reporterPhone: '+65 9123 4567',
        reporterEmail: 'sarah@email.com',
        status: 'new',
        reportedAt: new Date(Date.now() - 900000).toISOString(),
=======
        animalBreed: 'Mixed Breed',
        animalColor: 'Brown',
        injurySeverity: 'high',
        injuryDescription: 'Injured leg, limping heavily. Found near the park.',
        photos: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400'],
        location: 'Central Park, Main Entrance',
        coordinates: { lat: 3.1390, lng: 101.6869 },
        reporterName: 'John Doe',
        reporterPhone: '+60123456789',
        reporterEmail: 'john@example.com',
        status: 'new',
        reportedAt: new Date().toISOString(),
>>>>>>> 9cfb1f6 (adoption and report)
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        reportId: 'RPT-2026-0002',
        animalType: 'cat',
<<<<<<< HEAD
        animalBreed: 'Persian',
        animalColor: 'White',
        injurySeverity: 'critical',
        injuryDescription: 'Hit by vehicle, needs immediate care',
        photos: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600'],
        location: 'Orchard Road',
        coordinates: { lat: 1.3048, lng: 103.8318 },
        reporterName: 'James Wong',
        reporterPhone: '+65 9876 5432',
        status: 'in_progress',
        reportedAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date().toISOString(),
        assignedVolunteer: 'John',
=======
        animalBreed: 'Tabby',
        animalColor: 'Orange',
        injurySeverity: 'critical',
        injuryDescription: 'Hit by vehicle. Needs immediate medical attention.',
        photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400'],
        location: 'Jalan Bukit Bintang',
        coordinates: { lat: 3.1466, lng: 101.7108 },
        reporterName: 'Jane Smith',
        reporterPhone: '+60198765432',
        status: 'in_progress',
        reportedAt: new Date(Date.now() - 3600000).toISOString(),
        updatedAt: new Date().toISOString(),
        assignedVolunteer: 'Rescue Team A',
>>>>>>> 9cfb1f6 (adoption and report)
    },
    {
        id: '3',
        reportId: 'RPT-2026-0003',
        animalType: 'dog',
<<<<<<< HEAD
        animalBreed: 'Mixed Breed',
        animalColor: 'Brown',
        injurySeverity: 'medium',
        injuryDescription: 'Appears malnourished',
        photos: ['https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?w=600'],
        location: 'Tampines Mall',
        coordinates: { lat: 1.3525, lng: 103.9447 },
        reporterName: 'Mary Tan',
        status: 'new',
        reportedAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: '4',
        reportId: 'RPT-2026-0004',
        animalType: 'cat',
        animalBreed: 'Tabby',
        animalColor: 'Orange',
        injurySeverity: 'low',
        injuryDescription: 'Stray cat, appears healthy but needing shelter',
        photos: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600'],
        location: 'Sentosa Island',
        reporterName: 'Alex Lim',
=======
        animalBreed: 'Shih Tzu',
        animalColor: 'White',
        injurySeverity: 'low',
        injuryDescription: 'Minor scratches, appears malnourished.',
        photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'],
        location: 'Taman Tun Dr Ismail',
        coordinates: { lat: 3.1319, lng: 101.6319 },
        reporterName: 'Ahmad Hassan',
        reporterPhone: '+60112233445',
>>>>>>> 9cfb1f6 (adoption and report)
        status: 'resolved',
        reportedAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
        resolvedAt: new Date().toISOString(),
    },
<<<<<<< HEAD
];

type StatusFilter = 'all' | ReportStatus;

const statusFilters: { key: StatusFilter; label: string; color: string; bg: string }[] = [
    { key: 'all', label: 'All', color: colors.minimalist.textDark, bg: '#F3F4F6' },
    { key: 'new', label: 'New', color: '#0369A1', bg: '#E0F2FE' },
    { key: 'in_progress', label: 'In Progress', color: '#D97706', bg: '#FEF3C7' },
    { key: 'resolved', label: 'Resolved', color: '#059669', bg: '#D1FAE5' },
];

// Skeleton Card
const SkeletonCard: React.FC = () => {
    const shimmerAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(shimmerAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
                Animated.timing(shimmerAnim, { toValue: 0, duration: 1000, useNativeDriver: true }),
            ])
        ).start();
    }, []);

    const opacity = shimmerAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0.3, 0.6],
    });

    return (
        <Animated.View style={[styles.skeletonCard, { opacity }]}>
            <View style={styles.skeletonImage} />
            <View style={styles.skeletonContent}>
                <View style={styles.skeletonTitle} />
                <View style={styles.skeletonMeta} />
            </View>
        </Animated.View>
    );
};

// Report Story Card
const ReportStoryCard: React.FC<{
    report: NGOReport;
    index: number;
    onPress: () => void;
}> = ({ report, index, onPress }) => {
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
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start();
    }, []);

    const handlePress = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Animated.sequence([
            Animated.timing(scaleAnim, { toValue: 0.97, duration: 100, useNativeDriver: true }),
            Animated.spring(scaleAnim, { toValue: 1, friction: 5, useNativeDriver: true }),
        ]).start();
        onPress();
    };

    const getSeverityConfig = (severity: InjurySeverity) => {
        switch (severity) {
            case 'critical': return { label: 'Critical', color: '#DC2626', bg: '#FEE2E2' };
            case 'high': return { label: 'High', color: '#EA580C', bg: '#FFEDD5' };
            case 'medium': return { label: 'Medium', color: '#D97706', bg: '#FEF3C7' };
            case 'low': return { label: 'Low', color: '#059669', bg: '#D1FAE5' };
            default: return { label: 'Unknown', color: '#6B7280', bg: '#F3F4F6' };
        }
    };

    const getStatusConfig = (status: ReportStatus) => {
        switch (status) {
            case 'new': return { label: 'New', color: '#0891B2', bg: '#A5E5ED' };
            case 'in_progress': return { label: 'In Progress', color: '#92400E', bg: '#F9F8D9' };
            case 'resolved': return { label: 'Resolved', color: '#166534', bg: '#BBF3DE' };
            default: return { label: 'Unknown', color: '#6B7280', bg: '#F3F4F6' };
        }
    };

    const severityConfig = getSeverityConfig(report.injurySeverity);
    const statusConfig = getStatusConfig(report.status);

=======
    {
        id: '4',
        reportId: 'RPT-2026-0004',
        animalType: 'cat',
        animalBreed: 'Persian',
        animalColor: 'Grey',
        injurySeverity: 'medium',
        injuryDescription: 'Eye infection, needs veterinary care.',
        photos: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400'],
        location: 'Bangsar South',
        coordinates: { lat: 3.1114, lng: 101.6656 },
        reporterName: 'Lisa Tan',
        reporterEmail: 'lisa@example.com',
        status: 'new',
        reportedAt: new Date(Date.now() - 7200000).toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

type FilterType = 'all' | ReportStatus;

export const NGOReportListScreen: React.FC = () => {
    const router = useRouter();
    const [activeFilter, setActiveFilter] = useState<FilterType>('all');
    const [refreshing, setRefreshing] = useState(false);
    const [reports, setReports] = useState(mockReports);

    const filters: { key: FilterType; label: string }[] = [
        { key: 'all', label: 'All' },
        { key: 'new', label: 'New' },
        { key: 'in_progress', label: 'In Progress' },
        { key: 'resolved', label: 'Resolved' },
    ];

    const filteredReports = activeFilter === 'all'
        ? reports
        : reports.filter(r => r.status === activeFilter);

    const onRefresh = async () => {
        setRefreshing(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
    };

    const getAnimalIcon = (type: string) => {
        return type === 'cat' ? '🐱' : '🐕';
    };

>>>>>>> 9cfb1f6 (adoption and report)
    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
<<<<<<< HEAD
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (minutes < 60) return `${minutes}m ago`;
        if (hours < 24) return `${hours}h ago`;
        return `${days}d ago`;
    };

    const animalEmoji = report.animalType === 'cat' ? '🐱' : '🐕';

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
            <Pressable onPress={handlePress} style={styles.storyCardInner}>
                {/* Large Image */}
                {/* Progress Bar */}
                <View style={styles.cardProgressBarContainer}>
                    <View
                        style={[
                            styles.cardProgressBar,
                            {
                                width: report.status === 'new' ? '33%' : report.status === 'in_progress' ? '66%' : '100%',
                                backgroundColor: statusConfig.color
                            }
                        ]}
                    />
                </View>

                <View style={styles.storyImageContainer}>
                    <Image source={{ uri: report.photos[0] }} style={styles.storyImage} resizeMode="cover" />
                    <LinearGradient
                        colors={['transparent', 'rgba(0,0,0,0.7)']}
                        style={styles.storyGradient}
                    />

                    {/* Severity Tag */}
                    <View style={[styles.severityTag, { backgroundColor: severityConfig.bg }]}>
                        <View style={[styles.severityDot, { backgroundColor: severityConfig.color }]} />
                        <Text style={[styles.severityText, { color: severityConfig.color }]}>
                            {severityConfig.label}
                        </Text>
                    </View>

                    {/* Status Badge */}
                    <View style={[styles.statusBadge, { backgroundColor: statusConfig.bg }]}>
                        <Text style={[styles.statusText, { color: statusConfig.color }]}>
                            {statusConfig.label}
                        </Text>
                    </View>

                    {/* Overlay Info */}
                    <View style={styles.storyOverlay}>
                        <Text style={styles.storyAnimal}>
                            {animalEmoji} {report.animalBreed || report.animalType}
                        </Text>
                        <View style={styles.storyMeta}>
                            <Ionicons name="location" size={12} color="rgba(255,255,255,0.9)" />
                            <Text style={styles.storyLocation}>{report.location}</Text>
                        </View>
                    </View>
                </View>

                {/* Card Footer */}
                <View style={styles.storyFooter}>
                    <View style={styles.reporterInfo}>
                        <View style={styles.reporterAvatar}>
                            <Ionicons name="person" size={14} color={colors.minimalist.textLight} />
                        </View>
                        <View>
                            <Text style={styles.reporterName}>{report.reporterName}</Text>
                            <Text style={styles.reportTime}>{formatTime(report.reportedAt)}</Text>
                        </View>
                    </View>

                    {/* Contact Action Buttons */}
                    <View style={styles.contactActions}>
                        {/* Call Button */}
                        <Pressable
                            style={[
                                styles.contactActionBtn,
                                styles.contactActionCall,
                                !report.reporterPhone && styles.contactActionDisabled,
                            ]}
                            disabled={!report.reporterPhone}
                            onPress={() => {
                                if (report.reporterPhone) {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    const phone = report.reporterPhone.replace(/\s/g, '');
                                    Linking.openURL(`tel:${phone}`);
                                }
                            }}
                        >
                            <Ionicons
                                name="call"
                                size={16}
                                color={report.reporterPhone ? '#059669' : 'rgba(0,0,0,0.2)'}
                            />
                        </Pressable>

                        {/* SMS Button */}
                        <Pressable
                            style={[
                                styles.contactActionBtn,
                                styles.contactActionSms,
                                !report.reporterPhone && styles.contactActionDisabled,
                            ]}
                            disabled={!report.reporterPhone}
                            onPress={() => {
                                if (report.reporterPhone) {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    const phone = report.reporterPhone.replace(/\s/g, '');
                                    Linking.openURL(`sms:${phone}`);
                                }
                            }}
                        >
                            <Ionicons
                                name="chatbubble"
                                size={16}
                                color={report.reporterPhone ? '#0EA5E9' : 'rgba(0,0,0,0.2)'}
                            />
                        </Pressable>

                        {/* Email Button */}
                        <Pressable
                            style={[
                                styles.contactActionBtn,
                                styles.contactActionEmail,
                                !report.reporterEmail && styles.contactActionDisabled,
                            ]}
                            disabled={!report.reporterEmail}
                            onPress={() => {
                                if (report.reporterEmail) {
                                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                                    Linking.openURL(`mailto:${report.reporterEmail}?subject=Regarding Report ${report.reportId}`);
                                }
                            }}
                        >
                            <Ionicons
                                name="mail"
                                size={16}
                                color={report.reporterEmail ? '#F59E0B' : 'rgba(0,0,0,0.2)'}
                            />
                        </Pressable>
                    </View>
                </View>
            </Pressable>
        </Animated.View >
    );
};

export const NGOReportListScreen: React.FC = () => {
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);
    const [reports, setReports] = useState(mockReports);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

    // Filter indicator animation
    const indicatorPosition = useRef(new Animated.Value(0)).current;

    const filteredReports = reports.filter(report =>
        statusFilter === 'all' || report.status === statusFilter
    );

    const handleFilterChange = (filter: StatusFilter, index: number) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        setStatusFilter(filter);

        Animated.spring(indicatorPosition, {
            toValue: index * (SCREEN_WIDTH - spacing.lg * 2) / 4,
            friction: 8,
            tension: 80,
            useNativeDriver: true,
        }).start();
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setRefreshing(false);
=======
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
>>>>>>> 9cfb1f6 (adoption and report)
    };

    const handleReportPress = (report: NGOReport) => {
        router.push({
            pathname: '/ngo-report-detail',
            params: { reportId: report.id }
        });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
<<<<<<< HEAD
                <Text style={styles.headerTitle}>Reports</Text>
                <Text style={styles.headerSubtitle}>{filteredReports.length} reports need attention</Text>
            </View>

            {/* Status Filter Tabs */}
            <View style={styles.filterContainer}>
                <View style={styles.filterTabs}>
                    <Animated.View
                        style={[
                            styles.filterIndicator,
                            { transform: [{ translateX: indicatorPosition }] },
                        ]}
                    />
                    {statusFilters.map((filter, index) => (
                        <Pressable
                            key={filter.key}
                            style={styles.filterTab}
                            onPress={() => handleFilterChange(filter.key, index)}
                        >
                            <Text
                                style={[
                                    styles.filterTabText,
                                    statusFilter === filter.key && styles.filterTabTextActive,
                                ]}
                            >
                                {filter.label}
                            </Text>
                            {filter.key !== 'all' && (
                                <View style={[styles.filterDot, { backgroundColor: filter.color }]} />
                            )}
                        </Pressable>
                    ))}
                </View>
=======
                <Text style={styles.headerTitle}>Report Management</Text>
            </View>

            {/* Filter Tabs */}
            <View style={styles.filterContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterScroll}
                >
                    {filters.map((filter) => (
                        <Pressable
                            key={filter.key}
                            style={[
                                styles.filterTab,
                                activeFilter === filter.key && styles.filterTabActive
                            ]}
                            onPress={() => setActiveFilter(filter.key)}
                        >
                            <Text style={[
                                styles.filterText,
                                activeFilter === filter.key && styles.filterTextActive
                            ]}>
                                {filter.label}
                            </Text>
                            {filter.key !== 'all' && (
                                <View style={[
                                    styles.filterCount,
                                    activeFilter === filter.key && styles.filterCountActive
                                ]}>
                                    <Text style={[
                                        styles.filterCountText,
                                        activeFilter === filter.key && styles.filterCountTextActive
                                    ]}>
                                        {reports.filter(r => r.status === filter.key).length}
                                    </Text>
                                </View>
                            )}
                        </Pressable>
                    ))}
                </ScrollView>
>>>>>>> 9cfb1f6 (adoption and report)
            </View>

            {/* Reports List */}
            <ScrollView
<<<<<<< HEAD
                ref={scrollViewRef}
=======
>>>>>>> 9cfb1f6 (adoption and report)
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
<<<<<<< HEAD
                        tintColor="#0891B2"
                    />
                }
            >
                {isLoading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                ) : filteredReports.length === 0 ? (
                    <View style={styles.emptyState}>
                        <View style={styles.emptyIllustration}>
                            <Text style={styles.emptyEmoji}>📋</Text>
                        </View>
                        <Text style={styles.emptyTitle}>No reports found</Text>
                        <Text style={styles.emptyText}>
                            {statusFilter === 'all'
                                ? 'No reports have been submitted yet.'
                                : `No ${statusFilter.replace('_', ' ')} reports at the moment.`}
                        </Text>
                    </View>
                ) : (
                    filteredReports.map((report, index) => (
                        <ReportStoryCard
                            key={report.id}
                            report={report}
                            index={index}
                            onPress={() => handleReportPress(report)}
                        />
=======
                        tintColor={colors.minimalist.coral}
                    />
                }
            >
                {filteredReports.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Ionicons name="document-text-outline" size={64} color={colors.gray300} />
                        <Text style={styles.emptyTitle}>No Reports</Text>
                        <Text style={styles.emptyText}>
                            {activeFilter === 'all'
                                ? 'No reports have been submitted yet.'
                                : `No ${activeFilter.replace('_', ' ')} reports.`}
                        </Text>
                    </View>
                ) : (
                    filteredReports.map((report) => (
                        <Pressable
                            key={report.id}
                            onPress={() => handleReportPress(report)}
                        >
                            {({ pressed }) => (
                                <FloatingCard
                                    shadow="soft"
                                    style={[styles.reportCard, pressed && styles.reportCardPressed]}
                                >
                                    <View style={styles.cardContent}>
                                        {/* Image */}
                                        <Image
                                            source={{ uri: report.photos[0] }}
                                            style={styles.reportImage}
                                            resizeMode="cover"
                                        />

                                        {/* Details */}
                                        <View style={styles.reportDetails}>
                                            {/* Header Row */}
                                            <View style={styles.reportHeader}>
                                                <View style={styles.animalInfo}>
                                                    <Text style={styles.animalType}>
                                                        {getAnimalIcon(report.animalType)} {report.animalBreed || report.animalType}
                                                    </Text>
                                                    <Text style={styles.reportId}>{report.reportId}</Text>
                                                </View>
                                                <SeverityIndicator
                                                    severity={report.injurySeverity}
                                                    size="small"
                                                    showLabel={false}
                                                />
                                            </View>

                                            {/* Location */}
                                            <View style={styles.locationRow}>
                                                <Ionicons
                                                    name="location-outline"
                                                    size={14}
                                                    color={colors.minimalist.textMedium}
                                                />
                                                <Text style={styles.locationText} numberOfLines={1}>
                                                    {report.location}
                                                </Text>
                                            </View>

                                            {/* Footer */}
                                            <View style={styles.reportFooter}>
                                                <ReportStatusBadge status={report.status} size="small" />
                                                <Text style={styles.timeText}>
                                                    {formatTime(report.reportedAt)}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </FloatingCard>
                            )}
                        </Pressable>
>>>>>>> 9cfb1f6 (adoption and report)
                    ))
                )}

                <View style={styles.bottomSpacing} />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
<<<<<<< HEAD
        backgroundColor: '#FAFBFC',
    },
    header: {
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: '#fff',
    },
    headerTitle: {
        ...serifTextStyles.serifSubheading,
        fontSize: 24,
        color: colors.minimalist.textDark,
    },
    headerSubtitle: {
        fontSize: 13,
        color: colors.minimalist.textLight,
        marginTop: 2,
    },
    filterContainer: {
        backgroundColor: '#fff',
        paddingHorizontal: spacing.xl,
        paddingBottom: spacing.lg,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,0.05)',
    },
    filterTabs: {
        flexDirection: 'row',
        backgroundColor: 'rgba(165, 229, 237, 0.4)',
        borderRadius: 12,
        padding: 4,
        position: 'relative',
    },
    filterIndicator: {
        position: 'absolute',
        top: 2,
        left: 2,
        width: (SCREEN_WIDTH - spacing.xl * 2 - 8) / 4,
        height: 40,
        backgroundColor: '#fff',
        borderRadius: 10,
        ...Platform.select({
            ios: {
                shadowColor: '#0891B2',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 8
            },
            android: { elevation: 4 },
        }),
    },
    filterTab: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        gap: 4,
    },
    filterTabText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.minimalist.textLight,
    },
    filterTabTextActive: {
        color: colors.minimalist.textDark,
    },
    filterDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
=======
        backgroundColor: colors.minimalist.bgLight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.minimalist.white,
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: colors.minimalist.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        ...serifTextStyles.serifSubheading,
        color: colors.minimalist.textDark,
        flex: 1,
        textAlign: 'center',
    },
    headerBadge: {
        backgroundColor: colors.minimalist.peachLight,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 8,
    },
    headerBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.minimalist.coral,
    },
    filterContainer: {
        backgroundColor: colors.minimalist.white,
        borderBottomWidth: 1,
        borderBottomColor: colors.minimalist.border,
    },
    filterScroll: {
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        gap: spacing.sm,
    },
    filterTab: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: colors.minimalist.bgLight,
        marginRight: spacing.sm,
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
    filterCount: {
        marginLeft: 6,
        minWidth: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: colors.minimalist.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterCountActive: {
        backgroundColor: 'rgba(255,255,255,0.3)',
    },
    filterCountText: {
        fontSize: 11,
        fontWeight: '700',
        color: colors.minimalist.textMedium,
    },
    filterCountTextActive: {
        color: colors.minimalist.white,
>>>>>>> 9cfb1f6 (adoption and report)
    },
    container: {
        flex: 1,
    },
    scrollContent: {
<<<<<<< HEAD
        padding: spacing.xl,
    },
    // Story Card
    storyCard: {
        marginBottom: spacing.xl,
        borderRadius: 20,
        backgroundColor: '#fff',
        overflow: 'hidden',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 8 }, shadowOpacity: 0.1, shadowRadius: 16 },
            android: { elevation: 5 },
        }),
    },
    storyCardInner: {
        overflow: 'hidden',
    },
    storyImageContainer: {
        position: 'relative',
        height: 220,
    },
    cardProgressBarContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        backgroundColor: 'rgba(255,255,255,0.2)',
        zIndex: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        overflow: 'hidden',
    },
    cardProgressBar: {
        height: '100%',
        borderRadius: 2,
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
        height: 120,
    },
    severityTag: {
        position: 'absolute',
        top: spacing.md,
        left: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    severityDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
    },
    severityText: {
        fontSize: 11,
        fontWeight: '700',
    },
    statusBadge: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 11,
        fontWeight: '700',
    },
    storyOverlay: {
        position: 'absolute',
        bottom: spacing.md,
        left: spacing.md,
        right: spacing.md,
    },
    storyAnimal: {
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        textShadowColor: 'rgba(0,0,0,0.3)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 4,
    },
    storyMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 4,
    },
    storyLocation: {
        fontSize: 13,
        color: 'rgba(255,255,255,0.9)',
    },
    storyFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: spacing.lg,
    },
    reporterInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    reporterAvatar: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    reporterName: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    reportTime: {
        fontSize: 12,
        color: colors.minimalist.textLight,
    },
    contactBtn: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(245, 158, 131, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Contact Action Buttons
    contactActions: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    contactActionBtn: {
        width: 38,
        height: 38,
        borderRadius: 19,
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.08, shadowRadius: 6 },
            android: { elevation: 2 },
        }),
    },
    contactActionCall: {
        backgroundColor: '#BBF3DE',
    },
    contactActionSms: {
        backgroundColor: '#A5E5ED',
    },
    contactActionEmail: {
        backgroundColor: '#F9F8D9',
    },
    contactActionDisabled: {
        backgroundColor: '#F3F4F6',
        opacity: 0.5,
    },
    // Skeleton
    skeletonCard: {
        height: 300,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        marginBottom: spacing.lg,
    },
    skeletonImage: {
        height: 220,
        backgroundColor: '#E5E7EB',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    skeletonContent: {
        padding: spacing.md,
        gap: spacing.sm,
    },
    skeletonTitle: {
        height: 16,
        width: '60%',
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
    },
    skeletonMeta: {
        height: 12,
        width: '40%',
        backgroundColor: '#E5E7EB',
        borderRadius: 4,
    },
    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },
    emptyIllustration: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#E0F2FE',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    emptyEmoji: {
        fontSize: 36,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.minimalist.textDark,
=======
        padding: spacing.lg,
    },
    reportCard: {
        padding: 0,
        overflow: 'hidden',
        marginBottom: spacing.md,
    },
    reportCardPressed: {
        opacity: 0.9,
        transform: [{ scale: 0.98 }],
    },
    cardContent: {
        flexDirection: 'row',
    },
    reportImage: {
        width: 90,
        height: 90,
    },
    reportDetails: {
        flex: 1,
        padding: spacing.md,
    },
    reportHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 6,
    },
    animalInfo: {
        flex: 1,
    },
    animalType: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    reportId: {
        fontSize: 11,
        color: colors.minimalist.coral,
        fontWeight: '600',
        marginTop: 2,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    locationText: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
        marginLeft: 4,
        flex: 1,
    },
    reportFooter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 12,
        color: colors.minimalist.textLight,
    },
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 80,
    },
    emptyTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginTop: spacing.md,
>>>>>>> 9cfb1f6 (adoption and report)
    },
    emptyText: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
<<<<<<< HEAD
        marginTop: 4,
=======
        marginTop: spacing.xs,
>>>>>>> 9cfb1f6 (adoption and report)
        textAlign: 'center',
    },
    bottomSpacing: {
        height: 40,
    },
});

export default NGOReportListScreen;
