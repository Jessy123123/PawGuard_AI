import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    Pressable,
    TextInput,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { FloatingCard } from '../components/FloatingCard';
import { PhotoUploadBox } from '../components/PhotoUploadBox';
import { PersonalityTrait } from '../types';

const personalityOptions: PersonalityTrait[] = [
    'friendly', 'calm', 'active', 'shy', 'playful', 'independent', 'affectionate', 'protective'
];

export const NGOCreateAdoptionScreen: React.FC = () => {
    const router = useRouter();

    // Form state
    const [photos, setPhotos] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [color, setColor] = useState('');
    const [isVaccinated, setIsVaccinated] = useState(false);
    const [isNeutered, setIsNeutered] = useState(false);
    const [isHealthy, setIsHealthy] = useState(true);
    const [healthNotes, setHealthNotes] = useState('');
    const [selectedTraits, setSelectedTraits] = useState<PersonalityTrait[]>([]);
    const [adoptionRequirements, setAdoptionRequirements] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    const toggleTrait = (trait: PersonalityTrait) => {
        setSelectedTraits(prev =>
            prev.includes(trait)
                ? prev.filter(t => t !== trait)
                : [...prev, trait]
        );
    };

    const handlePhotoSelected = (uri: string) => {
        setPhotos(prev => [...prev, uri]);
    };

    const handleSubmit = async () => {
        // Validation
        if (!name.trim()) {
            Alert.alert('Missing Information', 'Please enter the animal name.');
            return;
        }
        if (!breed.trim()) {
            Alert.alert('Missing Information', 'Please enter the breed.');
            return;
        }
        if (!age.trim()) {
            Alert.alert('Missing Information', 'Please enter the age.');
            return;
        }
        if (photos.length === 0) {
            Alert.alert('Missing Information', 'Please add at least one photo.');
            return;
        }

        setIsSaving(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsSaving(false);
        Alert.alert(
            'Success! 🎉',
            'Adoption post has been created and is now live!',
            [{ text: 'OK', onPress: () => router.back() }]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top']}>
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
                <Pressable style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="close" size={24} color={colors.minimalist.textDark} />
                </Pressable>
                <Text style={styles.headerTitle}>Create Adoption Post</Text>
                <View style={styles.headerPlaceholder} />
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Photo Upload */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionLabel}>Photos</Text>
                    <Text style={styles.sectionHint}>Add clear photos of the animal</Text>
                    <PhotoUploadBox
                        onImageSelected={handlePhotoSelected}
                        imageUri={photos[0]}
                    />
                </FloatingCard>

                {/* Basic Information */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionLabel}>Basic Information</Text>

                    {/* Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Name *</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Enter animal name"
                            placeholderTextColor={colors.minimalist.textLight}
                            value={name}
                            onChangeText={setName}
                        />
                    </View>

                    {/* Species */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Species *</Text>
                        <View style={styles.toggleRow}>
                            <Pressable
                                style={[styles.toggleButton, species === 'dog' && styles.toggleButtonActive]}
                                onPress={() => setSpecies('dog')}
                            >
                                <Text style={species === 'dog' ? styles.toggleTextActive : styles.toggleText}>
                                    🐕 Dog
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.toggleButton, species === 'cat' && styles.toggleButtonActive]}
                                onPress={() => setSpecies('cat')}
                            >
                                <Text style={species === 'cat' ? styles.toggleTextActive : styles.toggleText}>
                                    🐱 Cat
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Breed */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Breed *</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g., Golden Retriever, Persian"
                            placeholderTextColor={colors.minimalist.textLight}
                            value={breed}
                            onChangeText={setBreed}
                        />
                    </View>

                    {/* Age */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Age *</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g., 2 years, 6 months"
                            placeholderTextColor={colors.minimalist.textLight}
                            value={age}
                            onChangeText={setAge}
                        />
                    </View>

                    {/* Gender */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Gender *</Text>
                        <View style={styles.toggleRow}>
                            <Pressable
                                style={[styles.toggleButton, gender === 'male' && styles.toggleButtonActive]}
                                onPress={() => setGender('male')}
                            >
                                <Ionicons
                                    name="male"
                                    size={16}
                                    color={gender === 'male' ? colors.minimalist.white : '#3B82F6'}
                                />
                                <Text style={gender === 'male' ? styles.toggleTextActive : styles.toggleText}>
                                    Male
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[styles.toggleButton, gender === 'female' && styles.toggleButtonActive]}
                                onPress={() => setGender('female')}
                            >
                                <Ionicons
                                    name="female"
                                    size={16}
                                    color={gender === 'female' ? colors.minimalist.white : '#EC4899'}
                                />
                                <Text style={gender === 'female' ? styles.toggleTextActive : styles.toggleText}>
                                    Female
                                </Text>
                            </Pressable>
                        </View>
                    </View>

                    {/* Size */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Size</Text>
                        <View style={styles.toggleRow}>
                            {(['small', 'medium', 'large'] as const).map((s) => (
                                <Pressable
                                    key={s}
                                    style={[styles.toggleButton, size === s && styles.toggleButtonActive]}
                                    onPress={() => setSize(s)}
                                >
                                    <Text style={size === s ? styles.toggleTextActive : styles.toggleText}>
                                        {s.charAt(0).toUpperCase() + s.slice(1)}
                                    </Text>
                                </Pressable>
                            ))}
                        </View>
                    </View>

                    {/* Color */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Color</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="e.g., Golden, Black & White"
                            placeholderTextColor={colors.minimalist.textLight}
                            value={color}
                            onChangeText={setColor}
                        />
                    </View>
                </FloatingCard>

                {/* Health Status */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionLabel}>Health Status</Text>

                    <View style={styles.checkboxRow}>
                        <Pressable
                            style={styles.checkbox}
                            onPress={() => setIsVaccinated(!isVaccinated)}
                        >
                            <View style={[styles.checkboxBox, isVaccinated && styles.checkboxChecked]}>
                                {isVaccinated && <Ionicons name="checkmark" size={14} color={colors.minimalist.white} />}
                            </View>
                            <Text style={styles.checkboxLabel}>Vaccinated</Text>
                        </Pressable>

                        <Pressable
                            style={styles.checkbox}
                            onPress={() => setIsNeutered(!isNeutered)}
                        >
                            <View style={[styles.checkboxBox, isNeutered && styles.checkboxChecked]}>
                                {isNeutered && <Ionicons name="checkmark" size={14} color={colors.minimalist.white} />}
                            </View>
                            <Text style={styles.checkboxLabel}>Neutered / Spayed</Text>
                        </Pressable>

                        <Pressable
                            style={styles.checkbox}
                            onPress={() => setIsHealthy(!isHealthy)}
                        >
                            <View style={[styles.checkboxBox, isHealthy && styles.checkboxChecked]}>
                                {isHealthy && <Ionicons name="checkmark" size={14} color={colors.minimalist.white} />}
                            </View>
                            <Text style={styles.checkboxLabel}>Healthy</Text>
                        </Pressable>
                    </View>

                    <TextInput
                        style={[styles.textInput, styles.textArea]}
                        placeholder="Health notes (optional)"
                        placeholderTextColor={colors.minimalist.textLight}
                        multiline
                        numberOfLines={3}
                        value={healthNotes}
                        onChangeText={setHealthNotes}
                        textAlignVertical="top"
                    />
                </FloatingCard>

                {/* Personality Traits */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionLabel}>Personality Traits</Text>
                    <Text style={styles.sectionHint}>Select all that apply</Text>

                    <View style={styles.traitsGrid}>
                        {personalityOptions.map((trait) => (
                            <Pressable
                                key={trait}
                                style={[
                                    styles.traitChip,
                                    selectedTraits.includes(trait) && styles.traitChipActive
                                ]}
                                onPress={() => toggleTrait(trait)}
                            >
                                <Text style={[
                                    styles.traitText,
                                    selectedTraits.includes(trait) && styles.traitTextActive
                                ]}>
                                    {trait.charAt(0).toUpperCase() + trait.slice(1)}
                                </Text>
                            </Pressable>
                        ))}
                    </View>
                </FloatingCard>

                {/* Adoption Requirements */}
                <FloatingCard shadow="soft" style={styles.section}>
                    <Text style={styles.sectionLabel}>Adoption Requirements</Text>
                    <TextInput
                        style={[styles.textInput, styles.textArea]}
                        placeholder="Describe ideal home, experience needed, special requirements..."
                        placeholderTextColor={colors.minimalist.textLight}
                        multiline
                        numberOfLines={4}
                        value={adoptionRequirements}
                        onChangeText={setAdoptionRequirements}
                        textAlignVertical="top"
                    />
                </FloatingCard>

                <View style={styles.bottomSpacing} />
            </ScrollView>

            {/* Submit Button */}
            <View style={styles.submitContainer}>
                <Pressable onPress={handleSubmit} disabled={isSaving}>
                    <LinearGradient
                        colors={[colors.minimalist.coral, colors.minimalist.orange]}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={[styles.submitButton, isSaving && { opacity: 0.6 }]}
                    >
                        {isSaving ? (
                            <Text style={styles.submitButtonText}>Creating Post...</Text>
                        ) : (
                            <>
                                <Ionicons name="heart" size={20} color={colors.minimalist.white} />
                                <Text style={styles.submitButtonText}>Publish Adoption Post</Text>
                            </>
                        )}
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
    headerPlaceholder: {
        width: 40,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        padding: spacing.lg,
        paddingBottom: 120,
    },
    section: {
        marginBottom: spacing.lg,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        marginBottom: spacing.sm,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    sectionHint: {
        fontSize: 13,
        color: colors.minimalist.textLight,
        marginBottom: spacing.md,
    },
    inputGroup: {
        marginBottom: spacing.md,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
        marginBottom: spacing.xs,
    },
    textInput: {
        backgroundColor: colors.minimalist.bgLight,
        borderRadius: 12,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.md,
        fontSize: 15,
        color: colors.minimalist.textDark,
    },
    textArea: {
        minHeight: 80,
    },
    toggleRow: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    toggleButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        backgroundColor: colors.minimalist.bgLight,
        paddingVertical: spacing.md,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'transparent',
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
    checkboxRow: {
        gap: spacing.sm,
        marginBottom: spacing.md,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    checkboxBox: {
        width: 24,
        height: 24,
        borderRadius: 6,
        borderWidth: 2,
        borderColor: colors.minimalist.border,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxChecked: {
        backgroundColor: colors.minimalist.coral,
        borderColor: colors.minimalist.coral,
    },
    checkboxLabel: {
        fontSize: 15,
        color: colors.minimalist.textDark,
    },
    traitsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    traitChip: {
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: colors.minimalist.bgLight,
        borderWidth: 1,
        borderColor: colors.minimalist.border,
    },
    traitChipActive: {
        backgroundColor: colors.minimalist.peachLight,
        borderColor: colors.minimalist.coral,
    },
    traitText: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
    },
    traitTextActive: {
        color: colors.minimalist.coral,
        fontWeight: '600',
    },
    bottomSpacing: {
        height: 40,
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
        borderTopColor: colors.minimalist.border,
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
        fontSize: 17,
        fontWeight: '700',
        color: colors.minimalist.white,
    },
});

export default NGOCreateAdoptionScreen;
