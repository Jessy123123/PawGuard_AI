import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { PhotoUploadBox } from '../components';
import { colors } from '../theme/colors';
import { serifTextStyles } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { FloatingCard } from '../components/FloatingCard';

interface ReportSightingScreenProps {
    navigation: any;
}

export const ReportSightingScreen: React.FC<ReportSightingScreenProps> = ({ navigation }) => {
    const [photoUri, setPhotoUri] = useState<string>('');
    const [animalType, setAnimalType] = useState<string>('dog');
    const [condition, setCondition] = useState<string>('not_injured');
    const [temperament, setTemperament] = useState<string>('calm');
    const [vaccinationStatus, setVaccinationStatus] = useState<'unknown' | 'yes' | 'no'>('unknown');
    const [neuteringStatus, setNeuteringStatus] = useState<'unknown' | 'yes' | 'no'>('unknown');
    const [additionalDetails, setAdditionalDetails] = useState<string>('');
    const [isDetectingLocation, setIsDetectingLocation] = useState(true);
    const [location, setLocation] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDetectingLocation(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const reportId = 'REPORT_08';

    const handleSubmit = () => {
        console.log('Submitting report');
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.textDark} />
                </Pressable>
                <Text style={styles.headerTitle}>Report a Sighting</Text>
                <View style={styles.reportIdBadge}>
                    <Text style={styles.reportIdText}>{reportId}</Text>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Photo Upload */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionLabel}>Photo Evidence</Text>
                    <PhotoUploadBox onImageSelected={setPhotoUri} imageUri={photoUri} required />
                </FloatingCard>

                {/* Animal Type */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Animal Type</Text>
                    <FloatingCard shadow="soft">
                        <View style={styles.animalTypeContainer}>
                            <Ionicons name="paw" size={20} color={colors.minimalist.coral} />
                            <Text style={styles.animalTypeText}>
                                {animalType === 'dog' ? 'Dog' : 'Cat'}
                            </Text>
                            <Ionicons name="lock-closed" size={16} color={colors.minimalist.textLight} />
                        </View>
                    </FloatingCard>
                </View>

                {/* Location Detection */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Detection Location</Text>
                    <FloatingCard shadow="soft">
                        <View style={styles.mapContainer}>
                            <MapView
                                style={styles.map}
                                initialRegion={{
                                    ...location,
                                    latitudeDelta: 0.1,
                                    longitudeDelta: 0.1,
                                }}
                                scrollEnabled={false}
                                zoomEnabled={false}
                            >
                                <Marker coordinate={location} />
                            </MapView>
                        </View>
                        <View style={styles.locationRow}>
                            <View style={styles.locationStatus}>
                                <View
                                    style={[
                                        styles.statusDot,
                                        {
                                            backgroundColor: isDetectingLocation
                                                ? colors.minimalist.yellow
                                                : colors.minimalist.greenDark,
                                        },
                                    ]}
                                />
                                <Text style={styles.locationText}>
                                    {isDetectingLocation ? 'Detecting location...' : 'Location detected'}
                                </Text>
                            </View>
                            <Pressable>
                                <Text style={styles.editAddressText}>Edit Address</Text>
                            </Pressable>
                        </View>
                    </FloatingCard>
                </View>

                {/* Condition & Temperament */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Condition & Temperament</Text>
                    <View style={styles.toggleRow}>
                        <Pressable
                            style={[styles.toggleButton, condition === 'injured' && styles.toggleButtonActive]}
                            onPress={() => setCondition('injured')}
                        >
                            <Ionicons
                                name="medical"
                                size={20}
                                color={
                                    condition === 'injured' ? colors.minimalist.white : colors.minimalist.textMedium
                                }
                            />
                            <Text
                                style={[styles.toggleText, condition === 'injured' && styles.toggleTextActive]}
                            >
                                Injured
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.toggleButton,
                                condition === 'not_injured' && styles.toggleButtonActive,
                            ]}
                            onPress={() => setCondition('not_injured')}
                        >
                            <Ionicons
                                name="checkmark-circle"
                                size={20}
                                color={
                                    condition === 'not_injured'
                                        ? colors.minimalist.white
                                        : colors.minimalist.textMedium
                                }
                            />
                            <Text
                                style={[
                                    styles.toggleText,
                                    condition === 'not_injured' && styles.toggleTextActive,
                                ]}
                            >
                                Not Injured
                            </Text>
                        </Pressable>
                    </View>

                    <View style={styles.toggleRow}>
                        <Pressable
                            style={[styles.toggleButton, temperament === 'calm' && styles.toggleButtonActive]}
                            onPress={() => setTemperament('calm')}
                        >
                            <Ionicons
                                name="happy"
                                size={20}
                                color={
                                    temperament === 'calm' ? colors.minimalist.white : colors.minimalist.textMedium
                                }
                            />
                            <Text style={[styles.toggleText, temperament === 'calm' && styles.toggleTextActive]}>
                                Calm
                            </Text>
                        </Pressable>
                        <Pressable
                            style={[
                                styles.toggleButton,
                                temperament === 'aggressive' && styles.toggleButtonActive,
                            ]}
                            onPress={() => setTemperament('aggressive')}
                        >
                            <Ionicons
                                name="warning"
                                size={20}
                                color={
                                    temperament === 'aggressive'
                                        ? colors.minimalist.white
                                        : colors.minimalist.textMedium
                                }
                            />
                            <Text
                                style={[
                                    styles.toggleText,
                                    temperament === 'aggressive' && styles.toggleTextActive,
                                ]}
                            >
                                Aggressive
                            </Text>
                        </Pressable>
                    </View>
                </View>

                {/* Vaccination Status */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Vaccination Status</Text>
                    <Text style={styles.sectionHint}>Visible tags or marks</Text>
                    <View style={styles.triStateRow}>
                        {(['unknown', 'yes', 'no'] as const).map((value) => (
                            <Pressable
                                key={value}
                                style={[
                                    styles.triStateButton,
                                    vaccinationStatus === value && styles.triStateButtonActive,
                                ]}
                                onPress={() => setVaccinationStatus(value)}
                            >
                                <Text
                                    style={[
                                        styles.triStateText,
                                        vaccinationStatus === value && styles.triStateTextActive,
                                    ]}
                                >
                                    {value === 'unknown' ? 'Unknown' : value === 'yes' ? 'Yes' : 'No'}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </View>

                {/* Neutering / Spaying */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Neutering / Spaying</Text>
                    <Text style={styles.sectionHint}>Ear-tip notch or scar</Text>
                    <View style={styles.triStateRow}>
                        {(['unknown', 'yes', 'no'] as const).map((value) => (
                            <Pressable
                                key={value}
                                style={[
                                    styles.triStateButton,
                                    neuteringStatus === value && styles.triStateButtonActive,
                                ]}
                                onPress={() => setNeuteringStatus(value)}
                            >
                                <Text
                                    style={[
                                        styles.triStateText,
                                        neuteringStatus === value && styles.triStateTextActive,
                                    ]}
                                >
                                    {value === 'unknown' ? 'Unknown' : value === 'yes' ? 'Yes' : 'No'}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                    <View style={styles.hintRow}>
                        <Ionicons
                            name="information-circle-outline"
                            size={14}
                            color={colors.minimalist.textLight}
                        />
                        <Text style={styles.hintText}>If unsure, select Unknown</Text>
                    </View>
                </View>

                {/* Additional Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>Additional Details</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Distinctive marks, specific behavior, collar color..."
                        placeholderTextColor={colors.minimalist.textLight}
                        multiline
                        numberOfLines={4}
                        value={additionalDetails}
                        onChangeText={setAdditionalDetails}
                        textAlignVertical="top"
                    />
                </View>

                {/* Info Disclaimer */}
                <View style={styles.disclaimerRow}>
                    <Ionicons name="information-circle" size={16} color={colors.minimalist.textMedium} />
                    <Text style={styles.disclaimerText}>
                        Information will be reviewed by verified rescue NGOs
                    </Text>
                </View>
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.submitContainer}>
                <Pressable onPress={handleSubmit}>
                    <LinearGradient
                        colors={[colors.minimalist.coral, colors.minimalist.orange]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.submitButton}
                    >
                        <Ionicons name="send" size={20} color={colors.minimalist.white} />
                        <Text style={styles.submitButtonText}>Submit Report</Text>
                    </LinearGradient>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.minimalist.white,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
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
        paddingVertical: 6,
        borderRadius: 8,
    },
    reportIdText: {
        fontSize: 11,
        color: colors.minimalist.coral,
        fontWeight: '600',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.lg,
        paddingTop: spacing.lg,
        paddingBottom: 120,
    },
    section: {
        marginBottom: spacing.xl,
    },
    sectionLabel: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: spacing.sm,
    },
    sectionHint: {
        fontSize: 12,
        color: colors.minimalist.textLight,
        marginBottom: spacing.sm,
    },
    animalTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    animalTypeText: {
        fontSize: 16,
        color: colors.minimalist.textDark,
        flex: 1,
        fontWeight: '500',
    },
    mapContainer: {
        height: 120,
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: spacing.sm,
    },
    map: {
        flex: 1,
    },
    locationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    locationStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    locationText: {
        fontSize: 14,
        color: colors.minimalist.textDark,
        fontWeight: '500',
    },
    editAddressText: {
        fontSize: 14,
        color: colors.minimalist.coral,
        fontWeight: '600',
    },
    toggleRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        backgroundColor: colors.minimalist.white,
        paddingVertical: spacing.md,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.gray200,
    },
    toggleButtonActive: {
        backgroundColor: colors.minimalist.coral,
        borderColor: colors.minimalist.coral,
    },
    toggleText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
    },
    toggleTextActive: {
        color: colors.minimalist.white,
    },
    triStateRow: {
        flexDirection: 'row',
        gap: spacing.sm,
        marginBottom: spacing.sm,
    },
    triStateButton: {
        flex: 1,
        backgroundColor: colors.minimalist.white,
        paddingVertical: spacing.md,
        borderRadius: 12,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.gray200,
    },
    triStateButtonActive: {
        backgroundColor: colors.minimalist.peachLight,
        borderColor: colors.minimalist.coral,
    },
    triStateText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
    },
    triStateTextActive: {
        color: colors.minimalist.coral,
    },
    hintRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
    },
    hintText: {
        fontSize: 12,
        color: colors.minimalist.textLight,
    },
    textArea: {
        backgroundColor: colors.minimalist.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.gray200,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        minHeight: 100,
        color: colors.minimalist.textDark,
        fontSize: 16,
    },
    disclaimerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.xs,
        marginBottom: spacing.md,
    },
    disclaimerText: {
        fontSize: 12,
        color: colors.minimalist.textMedium,
        flex: 1,
    },
    submitContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.lg,
        backgroundColor: colors.minimalist.white,
        borderTopWidth: 1,
        borderTopColor: colors.gray200,
    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: spacing.lg,
        borderRadius: 16,
        gap: spacing.sm,
    },
    submitButtonText: {
        fontSize: 18,
        color: colors.minimalist.white,
        fontWeight: '600',
    },
});
