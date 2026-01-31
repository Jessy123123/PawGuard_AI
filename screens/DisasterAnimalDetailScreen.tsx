import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Pressable, Alert, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { AnimalImageCarousel } from '../components/disaster';
import { FloatingCard } from '../components/FloatingCard';
import type { DisasterAnimal } from '../types/disaster';
import { getConditionLabel, getConditionBadgeColor, getPinColor } from '../types/disaster';

interface DisasterAnimalDetailScreenProps {
    navigation: any;
    route: {
        params: {
            animalId: string;
        };
    };
}

// Mock data - in real app, fetch from API using animalId
const MOCK_ANIMAL: DisasterAnimal = {
    id: '1',
    animalType: 'cat',
    condition: 'injured',
    photos: [
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800',
        'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=800',
        'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=800',
    ],
    locationName: 'Ipoh - Taman Cempaka',
    latitude: 4.5980,
    longitude: 101.0910,
    description: 'Orange tabby cat found near collapsed structure. Appears to have leg injury.',
    reporterNotes: 'Cat is scared but approachable. Needs immediate medical attention. Last seen hiding under a blue tarp near the main road. Responds to gentle calling.',
    reporter: {
        id: '1',
        name: 'Ahmad Razak',
        phone: '+60123456789',
        email: 'ahmad.razak@email.com',
        isVerified: true
    },
    reportedAt: new Date(Date.now() - 30 * 60000),
    lastUpdated: new Date(),
    isAssigned: false,
};

export const DisasterAnimalDetailScreen: React.FC<DisasterAnimalDetailScreenProps> = ({
    navigation,
    route
}) => {
    const [animal] = useState<DisasterAnimal>(MOCK_ANIMAL);
    const conditionColors = getConditionBadgeColor(animal.condition);

    const handleContactReporter = () => {
        if (animal.reporter.phone) {
            Linking.openURL(`tel:${animal.reporter.phone}`);
        } else {
            Alert.alert('Contact Info', 'No phone number available for this reporter.');
        }
    };

    const handleMarkAsRescued = () => {
        Alert.alert(
            'Mark as Rescued',
            'Are you sure you want to mark this animal as rescued?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        // Update status in backend
                        Alert.alert('Success', 'Animal status updated to Rescued');
                        navigation.goBack();
                    }
                },
            ]
        );
    };

    const handleAssignTeam = () => {
        Alert.alert(
            'Assign NGO Team',
            'Select a team to assign to this rescue:',
            [
                { text: 'Rescue Team Alpha', onPress: () => Alert.alert('Assigned to Team Alpha') },
                { text: 'Rescue Team Beta', onPress: () => Alert.alert('Assigned to Team Beta') },
                { text: 'Cancel', style: 'cancel' },
            ]
        );
    };

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleString('en-MY', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="light" />

            {/* Image Carousel */}
            <View style={styles.carouselContainer}>
                <AnimalImageCarousel images={animal.photos} />

                {/* Back Button Overlay */}
                <Pressable
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.white} />
                </Pressable>

                {/* Condition Badge Overlay */}
                <View style={[
                    styles.conditionOverlay,
                    { backgroundColor: conditionColors.bg }
                ]}>
                    <Text style={[styles.conditionOverlayText, { color: conditionColors.text }]}>
                        {getConditionLabel(animal.condition)}
                    </Text>
                </View>
            </View>

            <ScrollView
                style={styles.content}
                contentContainerStyle={styles.contentContainer}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Info */}
                <View style={styles.headerInfo}>
                    <View style={styles.animalTypeContainer}>
                        <Ionicons
                            name={animal.animalType === 'cat' ? 'logo-octocat' : 'paw'}
                            size={24}
                            color={getPinColor(animal.condition)}
                        />
                        <Text style={styles.animalType}>
                            {animal.animalType === 'cat' ? 'Cat' : 'Dog'}
                        </Text>
                    </View>
                    <Text style={styles.reportedTime}>
                        Reported {formatDate(animal.reportedAt)}
                    </Text>
                </View>

                {/* Condition Card */}
                <FloatingCard shadow="soft" style={styles.infoCard}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="pulse" size={20} color={conditionColors.text} />
                        <Text style={styles.cardTitle}>Condition</Text>
                    </View>
                    <View style={styles.conditionRow}>
                        <View style={[styles.statusBadge, { backgroundColor: conditionColors.bg }]}>
                            <Text style={[styles.statusBadgeText, { color: conditionColors.text }]}>
                                {getConditionLabel(animal.condition)}
                            </Text>
                        </View>
                        {animal.isAssigned && (
                            <View style={styles.assignedBadge}>
                                <Ionicons name="checkmark-circle" size={14} color={colors.minimalist.greenDark} />
                                <Text style={styles.assignedText}>Assigned: {animal.assignedTeam}</Text>
                            </View>
                        )}
                    </View>
                    {animal.description && (
                        <Text style={styles.description}>{animal.description}</Text>
                    )}
                </FloatingCard>

                {/* Location Card */}
                <FloatingCard shadow="soft" style={styles.infoCard}>
                    <View style={styles.cardHeader}>
                        <Ionicons name="location" size={20} color={colors.minimalist.disasterOrange} />
                        <Text style={styles.cardTitle}>Location</Text>
                    </View>
                    <Text style={styles.locationName}>{animal.locationName}</Text>
                    <View style={styles.miniMapContainer}>
                        <MapView
                            style={styles.miniMap}
                            scrollEnabled={false}
                            zoomEnabled={false}
                            initialRegion={{
                                latitude: animal.latitude,
                                longitude: animal.longitude,
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                            }}
                        >
                            <Marker
                                coordinate={{ latitude: animal.latitude, longitude: animal.longitude }}
                                pinColor={getPinColor(animal.condition)}
                            />
                        </MapView>
                    </View>
                    <Pressable style={styles.viewMapButton}>
                        <Ionicons name="navigate" size={16} color={colors.minimalist.disasterOrange} />
                        <Text style={styles.viewMapText}>Open in Maps</Text>
                    </Pressable>
                </FloatingCard>

                {/* Reporter Notes Card */}
                {animal.reporterNotes && (
                    <FloatingCard shadow="soft" style={styles.infoCard}>
                        <View style={styles.cardHeader}>
                            <Ionicons name="document-text" size={20} color={colors.minimalist.textMedium} />
                            <Text style={styles.cardTitle}>Reporter Notes</Text>
                        </View>
                        <Text style={styles.notesText}>{animal.reporterNotes}</Text>
                        <View style={styles.reporterRow}>
                            <Text style={styles.reporterName}>— {animal.reporter.name}</Text>
                            {animal.reporter.isVerified && (
                                <View style={styles.verifiedBadge}>
                                    <Ionicons name="shield-checkmark" size={12} color={colors.minimalist.greenDark} />
                                    <Text style={styles.verifiedText}>Verified</Text>
                                </View>
                            )}
                        </View>
                    </FloatingCard>
                )}

                {/* Spacer for sticky buttons */}
                <View style={styles.bottomSpacer} />
            </ScrollView>

            {/* Sticky Action Buttons */}
            <View style={styles.actionBar}>
                <Pressable style={styles.contactButton} onPress={handleContactReporter}>
                    <Ionicons name="call" size={20} color={colors.minimalist.textDark} />
                    <Text style={styles.contactButtonText}>Contact Reporter</Text>
                </Pressable>

                <Pressable style={styles.rescuedButton} onPress={handleMarkAsRescued}>
                    <Ionicons name="checkmark-circle" size={20} color={colors.minimalist.white} />
                    <Text style={styles.rescuedButtonText}>Mark as Rescued</Text>
                </Pressable>

                <Pressable style={styles.assignButton} onPress={handleAssignTeam}>
                    <Ionicons name="people" size={20} color={colors.minimalist.disasterOrange} />
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.minimalist.bgLight,
    },
    carouselContainer: {
        position: 'relative',
    },
    backButton: {
        position: 'absolute',
        top: spacing.lg,
        left: spacing.lg,
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    conditionOverlay: {
        position: 'absolute',
        top: spacing.lg,
        right: spacing.lg,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 8,
    },
    conditionOverlayText: {
        fontSize: 13,
        fontWeight: '700',
    },
    content: {
        flex: 1,
    },
    contentContainer: {
        padding: spacing.lg,
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    animalTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    animalType: {
        ...serifTextStyles.serifHeading,
        fontSize: 24,
        color: colors.minimalist.textDark,
    },
    reportedTime: {
        fontSize: 12,
        color: colors.minimalist.textMedium,
    },
    infoCard: {
        padding: spacing.lg,
        marginBottom: spacing.md,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    conditionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
    },
    statusBadge: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 6,
    },
    statusBadgeText: {
        fontSize: 13,
        fontWeight: '600',
    },
    assignedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    assignedText: {
        fontSize: 12,
        color: colors.minimalist.greenDark,
    },
    description: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
        lineHeight: 22,
        marginTop: spacing.sm,
    },
    locationName: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.minimalist.textDark,
        marginBottom: spacing.md,
    },
    miniMapContainer: {
        height: 140,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: spacing.md,
    },
    miniMap: {
        width: '100%',
        height: '100%',
    },
    viewMapButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: spacing.sm,
    },
    viewMapText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.disasterOrange,
    },
    notesText: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
        lineHeight: 22,
        fontStyle: 'italic',
        marginBottom: spacing.md,
    },
    reporterRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    reporterName: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
    },
    verifiedBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },
    verifiedText: {
        fontSize: 11,
        color: colors.minimalist.greenDark,
    },
    bottomSpacer: {
        height: 100,
    },
    actionBar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        padding: spacing.lg,
        paddingBottom: spacing.xl,
        backgroundColor: colors.minimalist.white,
        borderTopWidth: 1,
        borderTopColor: colors.minimalist.border,
        gap: spacing.sm,
    },
    contactButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: colors.minimalist.bgLight,
        borderWidth: 1,
        borderColor: colors.minimalist.border,
    },
    contactButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    rescuedButton: {
        flex: 1.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: colors.minimalist.successGreen,
    },
    rescuedButtonText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.white,
    },
    assignButton: {
        width: 52,
        height: 52,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.minimalist.disasterOrangeLight,
        borderWidth: 1,
        borderColor: colors.minimalist.disasterOrange,
    },
});
