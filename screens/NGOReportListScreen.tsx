import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    RefreshControl,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { FloatingCard } from '../components/FloatingCard';
import { ReportStatusBadge } from '../components/ReportStatusBadge';
import { SeverityIndicator } from '../components/SeverityIndicator';
import { NGOReport, ReportStatus } from '../types';

// Mock data for demonstration
const mockReports: NGOReport[] = [
    {
        id: '1',
        reportId: 'RPT-2026-0001',
        animalType: 'dog',
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
        updatedAt: new Date().toISOString(),
    },
    {
        id: '2',
        reportId: 'RPT-2026-0002',
        animalType: 'cat',
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
    },
    {
        id: '3',
        reportId: 'RPT-2026-0003',
        animalType: 'dog',
        animalBreed: 'Shih Tzu',
        animalColor: 'White',
        injurySeverity: 'low',
        injuryDescription: 'Minor scratches, appears malnourished.',
        photos: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400'],
        location: 'Taman Tun Dr Ismail',
        coordinates: { lat: 3.1319, lng: 101.6319 },
        reporterName: 'Ahmad Hassan',
        reporterPhone: '+60112233445',
        status: 'resolved',
        reportedAt: new Date(Date.now() - 86400000).toISOString(),
        updatedAt: new Date().toISOString(),
        resolvedAt: new Date().toISOString(),
    },
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

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const hours = Math.floor(diff / 3600000);
        const days = Math.floor(diff / 86400000);

        if (hours < 1) return 'Just now';
        if (hours < 24) return `${hours}h ago`;
        if (days < 7) return `${days}d ago`;
        return date.toLocaleDateString();
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
            </View>

            {/* Reports List */}
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
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
    },
    container: {
        flex: 1,
    },
    scrollContent: {
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
    },
    emptyText: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
        marginTop: spacing.xs,
        textAlign: 'center',
    },
    bottomSpacing: {
        height: 40,
    },
});

export default NGOReportListScreen;
