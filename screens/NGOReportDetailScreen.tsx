import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    Image,
    TextInput,
    Alert,
    Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import MapView, { Marker } from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { FloatingCard } from '../components/FloatingCard';
import { ReportStatusBadge } from '../components/ReportStatusBadge';
import { SeverityIndicator } from '../components/SeverityIndicator';
import { ContactModal } from '../components/ContactModal';
import { NGOReport, ReportStatus } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

// Mock data - in real app, fetch by reportId
const mockReport: NGOReport = {
    id: '1',
    reportId: 'RPT-2026-0001',
    animalType: 'dog',
    animalBreed: 'Mixed Breed',
    animalColor: 'Brown with white patches',
    injurySeverity: 'high',
    injuryDescription: 'The dog appears to have an injured hind leg and is limping heavily. Found near the park entrance, seems to be in pain when moving. May need immediate veterinary attention.',
    photos: [
        'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600',
        'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600',
        'https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600',
    ],
    location: 'Central Park, Main Entrance, Near the Fountain',
    coordinates: { lat: 3.1390, lng: 101.6869 },
    reporterName: 'John Doe',
    reporterPhone: '+60123456789',
    reporterEmail: 'john.doe@example.com',
    status: 'new',
    reportedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    internalNotes: '',
};

export const NGOReportDetailScreen: React.FC = () => {
    const router = useRouter();
    const params = useLocalSearchParams<{ reportId: string }>();

    const [report, setReport] = useState<NGOReport>(mockReport);
    const [showContactModal, setShowContactModal] = useState(false);
    const [internalNotes, setInternalNotes] = useState(report.internalNotes || '');
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);
    const [isSaving, setIsSaving] = useState(false);

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const handleStatusUpdate = async (newStatus: ReportStatus) => {
        Alert.alert(
            'Update Status',
            `Mark this report as "${newStatus.replace('_', ' ')}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        setReport(prev => ({
                            ...prev,
                            status: newStatus,
                            updatedAt: new Date().toISOString(),
                            ...(newStatus === 'resolved' && { resolvedAt: new Date().toISOString() }),
                        }));
                        Alert.alert('Success', 'Report status updated!');
                    },
                },
            ]
        );
    };

    const handleSaveNotes = async () => {
        setIsSaving(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setReport(prev => ({
            ...prev,
            internalNotes,
            updatedAt: new Date().toISOString(),
        }));
        setIsSaving(false);
        Alert.alert('Notes Saved', 'Internal notes have been updated.');
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.textDark} />
                </Pressable>
                <Text style={styles.headerTitle}>Report Details</Text>
                <View style={styles.reportIdBadge}>
                    <Text style={styles.reportIdText}>{report.reportId}</Text>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Photo Gallery */}
                <View style={styles.galleryContainer}>
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onMomentumScrollEnd={(e) => {
                            const index = Math.round(e.nativeEvent.contentOffset.x / SCREEN_WIDTH);
                            setActivePhotoIndex(index);
                        }}
                    >
                        {report.photos.map((photo, index) => (
                            <Image
                                key={index}
                                source={{ uri: photo }}
                                style={styles.galleryImage}
                                resizeMode="cover"
                            />
                        ))}
                    </ScrollView>
                    {/* Photo Indicators */}
                    <View style={styles.photoIndicators}>
                        {report.photos.map((_, index) => (
                            <View
                                key={index}
                                style={[
                                    styles.indicator,
                                    activePhotoIndex === index && styles.indicatorActive
                                ]}
                            />
                        ))}
                    </View>
                    {/* Photo Counter */}
                    <View style={styles.photoCounter}>
                        <Text style={styles.photoCounterText}>
                            {activePhotoIndex + 1}/{report.photos.length}
                        </Text>
                    </View>
                </View>

                {/* Status & Severity Row */}
                <View style={styles.statusRow}>
                    <ReportStatusBadge status={report.status} />
                    <SeverityIndicator severity={report.injurySeverity} size="medium" />
                </View>

                {/* Animal Information */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionTitle}>Animal Information</Text>
                    <View style={styles.infoGrid}>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Type</Text>
                            <Text style={styles.infoValue}>
                                {report.animalType === 'dog' ? '🐕' : '🐱'} {report.animalType.charAt(0).toUpperCase() + report.animalType.slice(1)}
                            </Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Breed</Text>
                            <Text style={styles.infoValue}>{report.animalBreed || 'Unknown'}</Text>
                        </View>
                        <View style={styles.infoItem}>
                            <Text style={styles.infoLabel}>Color</Text>
                            <Text style={styles.infoValue}>{report.animalColor || 'Unknown'}</Text>
                        </View>
                    </View>
                </FloatingCard>

                {/* Injury Description */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionTitle}>Injury Description</Text>
                    <Text style={styles.descriptionText}>{report.injuryDescription}</Text>
                </FloatingCard>

                {/* Location */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionTitle}>Location</Text>
                    {report.coordinates && (
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    latitude: report.coordinates.lat,
                                    longitude: report.coordinates.lng,
                                    latitudeDelta: 0.01,
                                    longitudeDelta: 0.01,
                                }}
                                scrollEnabled={false}
                                zoomEnabled={false}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: report.coordinates.lat,
                                        longitude: report.coordinates.lng,
                                    }}
                                />
                            </MapView>
                        </View>
                    )}
                    <View style={styles.addressRow}>
<<<<<<< HEAD
                        <Ionicons name="location" size={18} color="#0891B2" />
=======
                        <Ionicons name="location" size={18} color={colors.minimalist.coral} />
>>>>>>> 9cfb1f6 (adoption and report)
                        <Text style={styles.addressText}>{report.location}</Text>
                    </View>
                </FloatingCard>

                {/* Reporter Information */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionTitle}>Reporter Information</Text>
                    <View style={styles.reporterCard}>
                        <View style={styles.reporterAvatar}>
<<<<<<< HEAD
                            <Ionicons name="person" size={24} color="#0891B2" />
=======
                            <Ionicons name="person" size={24} color={colors.minimalist.coral} />
>>>>>>> 9cfb1f6 (adoption and report)
                        </View>
                        <View style={styles.reporterInfo}>
                            <Text style={styles.reporterName}>{report.reporterName}</Text>
                            <Text style={styles.reportTime}>
                                Reported on {formatDateTime(report.reportedAt)}
                            </Text>
                        </View>
                    </View>
                    <Pressable
                        style={styles.contactButton}
                        onPress={() => setShowContactModal(true)}
                    >
                        <Ionicons name="chatbubble-ellipses" size={20} color={colors.minimalist.white} />
                        <Text style={styles.contactButtonText}>Contact Reporter</Text>
                    </Pressable>
                </FloatingCard>

                {/* NGO Actions */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionTitle}>Update Status</Text>
                    <View style={styles.actionsRow}>
                        {report.status !== 'in_progress' && (
                            <Pressable
                                style={[styles.actionButton, styles.inProgressButton]}
                                onPress={() => handleStatusUpdate('in_progress')}
                            >
                                <Ionicons name="time" size={18} color="#D97706" />
                                <Text style={[styles.actionButtonText, { color: '#D97706' }]}>
                                    Mark In Progress
                                </Text>
                            </Pressable>
                        )}
                        {report.status !== 'resolved' && (
                            <Pressable
                                style={[styles.actionButton, styles.resolvedButton]}
                                onPress={() => handleStatusUpdate('resolved')}
                            >
                                <Ionicons name="checkmark-circle" size={18} color="#059669" />
                                <Text style={[styles.actionButtonText, { color: '#059669' }]}>
                                    Mark Resolved
                                </Text>
                            </Pressable>
                        )}
                    </View>
                </FloatingCard>

                {/* Internal Notes */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <View style={styles.notesHeader}>
                        <Text style={styles.sectionTitle}>Internal Notes</Text>
                        <View style={styles.privateTag}>
                            <Ionicons name="lock-closed" size={12} color={colors.minimalist.textMedium} />
                            <Text style={styles.privateText}>Private</Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.notesInput}
                        placeholder="Add notes for volunteers..."
                        placeholderTextColor={colors.minimalist.textLight}
                        multiline
                        numberOfLines={4}
                        value={internalNotes}
                        onChangeText={setInternalNotes}
                        textAlignVertical="top"
                    />
                    <Pressable
                        style={[styles.saveButton, isSaving && styles.saveButtonDisabled]}
                        onPress={handleSaveNotes}
                        disabled={isSaving}
                    >
                        <Text style={styles.saveButtonText}>
                            {isSaving ? 'Saving...' : 'Save Notes'}
                        </Text>
                    </Pressable>
                </FloatingCard>

                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* Contact Modal */}
            <ContactModal
                visible={showContactModal}
                onClose={() => setShowContactModal(false)}
                contactName={report.reporterName}
                phone={report.reporterPhone}
                email={report.reporterEmail}
            />
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
    reportIdBadge: {
        backgroundColor: colors.minimalist.peachLight,
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 8,
    },
    reportIdText: {
        fontSize: 10,
        fontWeight: '700',
<<<<<<< HEAD
        color: '#0891B2',
=======
        color: colors.minimalist.coral,
>>>>>>> 9cfb1f6 (adoption and report)
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    galleryContainer: {
        position: 'relative',
        height: 280,
    },
    galleryImage: {
        width: SCREEN_WIDTH,
        height: 280,
    },
    photoIndicators: {
        position: 'absolute',
        bottom: spacing.md,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 6,
    },
    indicator: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    indicatorActive: {
        backgroundColor: colors.minimalist.white,
        width: 20,
    },
    photoCounter: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    photoCounterText: {
        color: colors.minimalist.white,
        fontSize: 12,
        fontWeight: '600',
    },
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: spacing.md,
        paddingVertical: spacing.lg,
        paddingHorizontal: spacing.lg,
    },
    section: {
        marginHorizontal: spacing.lg,
        marginBottom: spacing.md,
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        marginBottom: spacing.md,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    infoGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.md,
    },
    infoItem: {
        flex: 1,
        minWidth: '30%',
    },
    infoLabel: {
        fontSize: 12,
        color: colors.minimalist.textLight,
        marginBottom: 4,
    },
    infoValue: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    descriptionText: {
        fontSize: 15,
        lineHeight: 24,
        color: colors.minimalist.textMedium,
    },
    mapContainer: {
        height: 150,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: spacing.sm,
    },
    map: {
        flex: 1,
    },
    addressRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: spacing.xs,
    },
    addressText: {
        flex: 1,
        fontSize: 14,
        color: colors.minimalist.textMedium,
        lineHeight: 20,
    },
    reporterCard: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    reporterAvatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: colors.minimalist.peachLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    reporterInfo: {
        flex: 1,
    },
    reporterName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    reportTime: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
        marginTop: 2,
    },
    contactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
<<<<<<< HEAD
        backgroundColor: '#A5E5ED',
=======
        backgroundColor: colors.minimalist.coral,
>>>>>>> 9cfb1f6 (adoption and report)
        paddingVertical: spacing.md,
        borderRadius: 12,
        gap: spacing.sm,
    },
    contactButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.white,
    },
    actionsRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        borderRadius: 12,
        gap: spacing.xs,
    },
    inProgressButton: {
        backgroundColor: '#FEF3C7',
    },
    resolvedButton: {
        backgroundColor: '#D1FAE5',
    },
    actionButtonText: {
        fontSize: 13,
        fontWeight: '600',
    },
    notesHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.sm,
    },
    privateTag: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: colors.minimalist.bgLight,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
    },
    privateText: {
        fontSize: 11,
        color: colors.minimalist.textMedium,
    },
    notesInput: {
        backgroundColor: colors.minimalist.bgLight,
        borderRadius: 12,
        padding: spacing.md,
        minHeight: 100,
        fontSize: 15,
        color: colors.minimalist.textDark,
        marginBottom: spacing.md,
    },
    saveButton: {
<<<<<<< HEAD
        backgroundColor: '#A5E5ED',
=======
        backgroundColor: colors.minimalist.coral,
>>>>>>> 9cfb1f6 (adoption and report)
        paddingVertical: spacing.md,
        borderRadius: 12,
        alignItems: 'center',
    },
    saveButtonDisabled: {
        opacity: 0.6,
    },
    saveButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.white,
    },
    bottomSpacing: {
        height: 40,
    },
});

export default NGOReportDetailScreen;
