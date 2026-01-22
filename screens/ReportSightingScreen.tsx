import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import MapView, { Marker } from 'react-native-maps';
import { PhotoUploadBox, ToggleButtonGroup, TriStateSelector, CustomButton } from '../components';
import { theme } from '../theme';

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

    // Simulate location detection
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsDetectingLocation(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    const reportId = 'REPORT_08';

    const handleSubmit = () => {
        console.log('Submitting report:', {
            photoUri,
            animalType,
            condition,
            temperament,
            vaccinationStatus,
            neuteringStatus,
            additionalDetails,
            location,
        });
        // Navigate back or show success
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={theme.colors.textPrimary} />
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
                <PhotoUploadBox
                    onImageSelected={setPhotoUri}
                    imageUri={photoUri}
                    required
                />

                {/* Animal Type */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>ANIMAL TYPE</Text>
                    <View style={styles.animalTypeContainer}>
                        <Ionicons name="paw" size={20} color={theme.colors.greenPrimary} />
                        <Text style={styles.animalTypeText}>
                            {animalType === 'dog' ? 'Dog' : 'Cat'}
                        </Text>
                        <Ionicons name="lock-closed" size={16} color={theme.colors.textMuted} />
                    </View>
                </View>

                {/* Detection Status with Map */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>DETECTION STATUS</Text>
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
                            <View style={[
                                styles.statusDot,
                                { backgroundColor: isDetectingLocation ? theme.colors.warning : theme.colors.success }
                            ]} />
                            <Text style={styles.locationText}>
                                {isDetectingLocation ? 'Detecting location...' : 'Location detected'}
                            </Text>
                        </View>
                        <Pressable>
                            <Text style={styles.editAddressText}>Edit Address</Text>
                        </Pressable>
                    </View>
                    <Text style={styles.locationSubtext}>GPS coordinates being fetched</Text>
                </View>

                {/* Condition & Temperament */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>CONDITION & TEMPERAMENT</Text>
                    <ToggleButtonGroup
                        options={[
                            { label: 'Injured', value: 'injured', icon: 'medical' },
                            { label: 'Not Injured', value: 'not_injured', icon: 'checkmark-circle' },
                        ]}
                        selectedValue={condition}
                        onSelect={setCondition}
                        style={styles.toggleRow}
                    />
                    <ToggleButtonGroup
                        options={[
                            { label: 'Calm', value: 'calm', icon: 'happy' },
                            { label: 'Aggressive', value: 'aggressive', icon: 'warning' },
                        ]}
                        selectedValue={temperament}
                        onSelect={setTemperament}
                        style={styles.toggleRow}
                    />
                </View>

                {/* Vaccination Status */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionLabel}>VACCINATION STATUS</Text>
                        <Text style={styles.sectionHint}>Visible tags or marks</Text>
                    </View>
                    <TriStateSelector
                        value={vaccinationStatus}
                        onChange={setVaccinationStatus}
                    />
                </View>

                {/* Neutering / Spaying */}
                <View style={styles.section}>
                    <View style={styles.sectionHeaderRow}>
                        <Text style={styles.sectionLabel}>NEUTERING / SPAYING</Text>
                        <Text style={styles.sectionHint}>Ear-tip notch or scar</Text>
                    </View>
                    <TriStateSelector
                        value={neuteringStatus}
                        onChange={setNeuteringStatus}
                    />
                    <View style={styles.hintRow}>
                        <Ionicons name="information-circle-outline" size={14} color={theme.colors.textMuted} />
                        <Text style={styles.hintText}>If unsure, select Unknown</Text>
                    </View>
                </View>

                {/* Additional Details */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>ADDITIONAL DETAILS</Text>
                    <TextInput
                        style={styles.textArea}
                        placeholder="Distinctive marks, specific behavior, collar color..."
                        placeholderTextColor={theme.colors.textMuted}
                        multiline
                        numberOfLines={4}
                        value={additionalDetails}
                        onChangeText={setAdditionalDetails}
                        textAlignVertical="top"
                    />
                </View>

                {/* Info Disclaimer */}
                <View style={styles.disclaimerRow}>
                    <Ionicons name="information-circle" size={16} color={theme.colors.textMuted} />
                    <Text style={styles.disclaimerText}>
                        Information will be reviewed by verified rescue NGOs
                    </Text>
                </View>
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.submitContainer}>
                <Pressable onPress={handleSubmit} style={({ pressed }) => [{ opacity: pressed ? 0.9 : 1 }]}>
                    <LinearGradient
                        colors={[theme.colors.greenPrimary, theme.colors.greenLight]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.submitButton}
                    >
                        <Ionicons name="send" size={20} color={theme.colors.textPrimary} />
                        <Text style={styles.submitButtonText}>SUBMIT REPORT</Text>
                    </LinearGradient>
                </Pressable>
            </View>
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
        paddingHorizontal: theme.spacing.lg,
        paddingVertical: theme.spacing.md,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        ...theme.textStyles.h4,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        flex: 1,
        textAlign: 'center',
    },
    reportIdBadge: {
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.sm,
        paddingVertical: theme.spacing.xs,
        borderRadius: theme.radius.sm,
        borderWidth: 1,
        borderColor: theme.colors.greenPrimary,
    },
    reportIdText: {
        ...theme.textStyles.caption,
        color: theme.colors.greenPrimary,
        fontWeight: '600',
        fontSize: 10,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingBottom: 120,
    },
    section: {
        marginTop: theme.spacing.xl,
    },
    sectionLabel: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        fontWeight: '600',
        fontSize: 11,
        letterSpacing: 1,
        textTransform: 'uppercase',
        marginBottom: theme.spacing.sm,
    },
    sectionHeaderRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: theme.spacing.sm,
    },
    sectionHint: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        fontSize: 11,
    },
    animalTypeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.colors.surface,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.input,
        gap: theme.spacing.sm,
        borderWidth: 1,
        borderColor: theme.colors.borderGlass,
    },
    animalTypeText: {
        ...theme.textStyles.body,
        color: theme.colors.textPrimary,
        flex: 1,
    },
    mapContainer: {
        height: 120,
        borderRadius: theme.radius.md,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: theme.colors.borderGlass,
    },
    map: {
        flex: 1,
    },
    locationRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: theme.spacing.sm,
    },
    locationStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
    },
    statusDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    locationText: {
        ...theme.textStyles.body,
        color: theme.colors.textPrimary,
        fontWeight: '500',
        fontSize: 14,
    },
    editAddressText: {
        ...theme.textStyles.body,
        color: theme.colors.greenPrimary,
        fontWeight: '500',
        fontSize: 13,
    },
    locationSubtext: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        marginTop: 2,
        fontSize: 12,
    },
    toggleRow: {
        marginBottom: theme.spacing.sm,
    },
    hintRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        marginTop: theme.spacing.sm,
    },
    hintText: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        fontSize: 12,
    },
    textArea: {
        backgroundColor: theme.colors.surface,
        borderRadius: theme.borderRadius.input,
        borderWidth: 1,
        borderColor: theme.colors.borderGlass,
        paddingHorizontal: theme.spacing.md,
        paddingVertical: theme.spacing.md,
        minHeight: 100,
        color: theme.colors.textPrimary,
        ...theme.textStyles.body,
    },
    disclaimerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: theme.spacing.xs,
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.md,
    },
    disclaimerText: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        fontSize: 12,
        flex: 1,
    },
    submitContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: theme.spacing.xl,
        paddingVertical: theme.spacing.lg,
        backgroundColor: theme.colors.background,
        borderTopWidth: 1,
        borderTopColor: theme.colors.borderGlass,
    },
    submitButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: theme.spacing.lg,
        borderRadius: theme.borderRadius.button,
        gap: theme.spacing.sm,
    },
    submitButtonText: {
        ...theme.textStyles.button,
        color: theme.colors.textPrimary,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
});
