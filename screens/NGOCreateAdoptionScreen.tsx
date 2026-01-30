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
<<<<<<< HEAD
    Image,
    TextInput,
    Animated,
    Dimensions,
    Platform,
    KeyboardAvoidingView,
=======
    TextInput,
    Alert,
>>>>>>> 9cfb1f6 (adoption and report)
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
<<<<<<< HEAD
import * as Haptics from 'expo-haptics';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { PersonalityTrait } from '../types';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const personalityOptions: { key: PersonalityTrait; label: string; emoji: string }[] = [
    { key: 'friendly', label: 'Friendly', emoji: '🤗' },
    { key: 'playful', label: 'Playful', emoji: '🎾' },
    { key: 'calm', label: 'Calm', emoji: '😌' },
    { key: 'active', label: 'Active', emoji: '🏃' },
    { key: 'shy', label: 'Shy', emoji: '🙈' },
    { key: 'affectionate', label: 'Affectionate', emoji: '💕' },
    { key: 'independent', label: 'Independent', emoji: '🦁' },
    { key: 'protective', label: 'Protective', emoji: '🛡️' },
];

const sizeOptions = [
    { key: 'small', label: 'Small', description: 'Under 10kg' },
    { key: 'medium', label: 'Medium', description: '10-25kg' },
    { key: 'large', label: 'Large', description: 'Over 25kg' },
];

// Step Indicator Component
const StepIndicator: React.FC<{ currentStep: number; totalSteps: number }> = ({ currentStep, totalSteps }) => {
    return (
        <View style={styles.stepIndicator}>
            {Array.from({ length: totalSteps }, (_, i) => (
                <View key={i} style={styles.stepContainer}>
                    <View style={[
                        styles.stepDot,
                        i < currentStep && styles.stepDotCompleted,
                        i === currentStep && styles.stepDotActive,
                    ]}>
                        {i < currentStep && (
                            <Ionicons name="checkmark" size={12} color="#fff" />
                        )}
                    </View>
                    {i < totalSteps - 1 && (
                        <View style={[
                            styles.stepLine,
                            i < currentStep && styles.stepLineCompleted,
                        ]} />
                    )}
                </View>
            ))}
        </View>
    );
};

// Photo Upload Card
const PhotoUploadCard: React.FC<{
    photos: string[];
    onAddPhoto: () => void;
    onRemovePhoto: (index: number) => void;
}> = ({ photos, onAddPhoto, onRemovePhoto }) => {
    const scaleAnim = useRef(new Animated.Value(0.95)).current;

    useEffect(() => {
        Animated.spring(scaleAnim, { toValue: 1, friction: 8, useNativeDriver: true }).start();
    }, []);

    return (
        <Animated.View style={[styles.photoCard, { transform: [{ scale: scaleAnim }] }]}>
            <Text style={styles.cardTitle}>Add Photos 📸</Text>
            <Text style={styles.cardSubtitle}>Beautiful photos help pets find homes faster</Text>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.photoScroll}>
                <Pressable style={styles.addPhotoBtn} onPress={onAddPhoto}>
                    <LinearGradient colors={['#FED7AA', '#FDBA74']} style={styles.addPhotoGradient}>
                        <Ionicons name="camera" size={28} color={colors.minimalist.orange} />
                        <Text style={styles.addPhotoText}>Add Photo</Text>
                    </LinearGradient>
                </Pressable>

                {photos.map((photo, index) => (
                    <Animated.View key={index} style={styles.photoPreview}>
                        <Image source={{ uri: photo }} style={styles.photoImage} resizeMode="cover" />
                        <Pressable style={styles.removePhotoBtn} onPress={() => onRemovePhoto(index)}>
                            <Ionicons name="close" size={16} color="#fff" />
                        </Pressable>
                    </Animated.View>
                ))}
            </ScrollView>
        </Animated.View>
    );
};

// Basic Info Card
const BasicInfoCard: React.FC<{
    name: string;
    breed: string;
    age: string;
    species: 'dog' | 'cat';
    gender: 'male' | 'female';
    onNameChange: (value: string) => void;
    onBreedChange: (value: string) => void;
    onAgeChange: (value: string) => void;
    onSpeciesChange: (value: 'dog' | 'cat') => void;
    onGenderChange: (value: 'male' | 'female') => void;
}> = ({ name, breed, age, species, gender, onNameChange, onBreedChange, onAgeChange, onSpeciesChange, onGenderChange }) => {
    return (
        <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Basic Information ✨</Text>
            <Text style={styles.cardSubtitle}>Tell us about this lovely animal</Text>

            {/* Species Toggle */}
            <View style={styles.toggleRow}>
                <Pressable
                    style={[styles.toggleBtn, species === 'dog' && styles.toggleBtnActive]}
                    onPress={() => onSpeciesChange('dog')}
                >
                    <Text style={styles.toggleEmoji}>🐕</Text>
                    <Text style={[styles.toggleText, species === 'dog' && styles.toggleTextActive]}>Dog</Text>
                </Pressable>
                <Pressable
                    style={[styles.toggleBtn, species === 'cat' && styles.toggleBtnActive]}
                    onPress={() => onSpeciesChange('cat')}
                >
                    <Text style={styles.toggleEmoji}>🐱</Text>
                    <Text style={[styles.toggleText, species === 'cat' && styles.toggleTextActive]}>Cat</Text>
                </Pressable>
            </View>

            {/* Name Input */}
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Name</Text>
                <TextInput
                    style={styles.textInput}
                    value={name}
                    onChangeText={onNameChange}
                    placeholder="e.g., Buddy"
                    placeholderTextColor={colors.minimalist.textLight}
                />
            </View>

            {/* Breed Input */}
            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Breed</Text>
                <TextInput
                    style={styles.textInput}
                    value={breed}
                    onChangeText={onBreedChange}
                    placeholder="e.g., Golden Retriever"
                    placeholderTextColor={colors.minimalist.textLight}
                />
            </View>

            {/* Age & Gender Row */}
            <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Age</Text>
                    <TextInput
                        style={styles.textInput}
                        value={age}
                        onChangeText={onAgeChange}
                        placeholder="e.g., 2 years"
                        placeholderTextColor={colors.minimalist.textLight}
                    />
                </View>
                <View style={[styles.inputGroup, { flex: 1 }]}>
                    <Text style={styles.inputLabel}>Gender</Text>
                    <View style={styles.genderToggle}>
                        <Pressable
                            style={[styles.genderBtn, gender === 'male' && styles.genderBtnActive]}
                            onPress={() => onGenderChange('male')}
                        >
                            <Text style={[styles.genderText, gender === 'male' && styles.genderTextActive]}>♂ Male</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.genderBtn, gender === 'female' && styles.genderBtnActive]}
                            onPress={() => onGenderChange('female')}
                        >
                            <Text style={[styles.genderText, gender === 'female' && styles.genderTextActive]}>♀ Female</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </View>
    );
};

// Personality Card
const PersonalityCard: React.FC<{
    selectedTraits: PersonalityTrait[];
    size: 'small' | 'medium' | 'large';
    onTraitToggle: (trait: PersonalityTrait) => void;
    onSizeChange: (size: 'small' | 'medium' | 'large') => void;
}> = ({ selectedTraits, size, onTraitToggle, onSizeChange }) => {
    return (
        <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Personality & Size 💛</Text>
            <Text style={styles.cardSubtitle}>Help adopters find the perfect match</Text>

            {/* Size Selection */}
            <Text style={styles.sectionLabel}>Size</Text>
            <View style={styles.sizeOptions}>
                {sizeOptions.map((option) => (
                    <Pressable
                        key={option.key}
                        style={[styles.sizeBtn, size === option.key && styles.sizeBtnActive]}
                        onPress={() => onSizeChange(option.key as any)}
                    >
                        <Text style={[styles.sizeBtnLabel, size === option.key && styles.sizeBtnLabelActive]}>
                            {option.label}
                        </Text>
                        <Text style={styles.sizeBtnDesc}>{option.description}</Text>
                    </Pressable>
                ))}
            </View>

            {/* Personality Traits */}
            <Text style={[styles.sectionLabel, { marginTop: spacing.lg }]}>Personality Traits</Text>
            <View style={styles.traitGrid}>
                {personalityOptions.map((trait) => (
                    <Pressable
                        key={trait.key}
                        style={[styles.traitChip, selectedTraits.includes(trait.key) && styles.traitChipActive]}
                        onPress={() => {
                            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                            onTraitToggle(trait.key);
                        }}
                    >
                        <Text style={styles.traitEmoji}>{trait.emoji}</Text>
                        <Text style={[styles.traitLabel, selectedTraits.includes(trait.key) && styles.traitLabelActive]}>
                            {trait.label}
                        </Text>
                    </Pressable>
                ))}
            </View>
        </View>
    );
};

// Health Card
const HealthCard: React.FC<{
    isVaccinated: boolean;
    isNeutered: boolean;
    isHealthy: boolean;
    healthNotes: string;
    onVaccinatedChange: (value: boolean) => void;
    onNeuteredChange: (value: boolean) => void;
    onHealthyChange: (value: boolean) => void;
    onHealthNotesChange: (value: string) => void;
}> = ({ isVaccinated, isNeutered, isHealthy, healthNotes, onVaccinatedChange, onNeuteredChange, onHealthyChange, onHealthNotesChange }) => {
    return (
        <View style={styles.infoCard}>
            <Text style={styles.cardTitle}>Health Status 🏥</Text>
            <Text style={styles.cardSubtitle}>Important health information</Text>

            <View style={styles.healthOptions}>
                <Pressable
                    style={[styles.healthOption, isVaccinated && styles.healthOptionActive]}
                    onPress={() => onVaccinatedChange(!isVaccinated)}
                >
                    <Ionicons name={isVaccinated ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={isVaccinated ? '#059669' : colors.minimalist.textLight} />
                    <Text style={[styles.healthLabel, isVaccinated && styles.healthLabelActive]}>Vaccinated</Text>
                </Pressable>

                <Pressable
                    style={[styles.healthOption, isNeutered && styles.healthOptionActive]}
                    onPress={() => onNeuteredChange(!isNeutered)}
                >
                    <Ionicons name={isNeutered ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={isNeutered ? '#059669' : colors.minimalist.textLight} />
                    <Text style={[styles.healthLabel, isNeutered && styles.healthLabelActive]}>Neutered/Spayed</Text>
                </Pressable>

                <Pressable
                    style={[styles.healthOption, isHealthy && styles.healthOptionActive]}
                    onPress={() => onHealthyChange(!isHealthy)}
                >
                    <Ionicons name={isHealthy ? 'checkmark-circle' : 'ellipse-outline'} size={24} color={isHealthy ? '#059669' : colors.minimalist.textLight} />
                    <Text style={[styles.healthLabel, isHealthy && styles.healthLabelActive]}>Healthy</Text>
                </Pressable>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Health Notes (Optional)</Text>
                <TextInput
                    style={[styles.textInput, styles.textArea]}
                    value={healthNotes}
                    onChangeText={onHealthNotesChange}
                    placeholder="Any special health considerations..."
                    placeholderTextColor={colors.minimalist.textLight}
                    multiline
                    numberOfLines={3}
                />
            </View>
        </View>
    );
};

export const NGOCreateAdoptionScreen: React.FC = () => {
    const router = useRouter();
    const scrollViewRef = useRef<ScrollView>(null);

    // Form state
    const [currentStep, setCurrentStep] = useState(0);
    const [photos, setPhotos] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [age, setAge] = useState('');
    const [species, setSpecies] = useState<'dog' | 'cat'>('dog');
    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [selectedTraits, setSelectedTraits] = useState<PersonalityTrait[]>([]);
=======
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
>>>>>>> 9cfb1f6 (adoption and report)
    const [isVaccinated, setIsVaccinated] = useState(false);
    const [isNeutered, setIsNeutered] = useState(false);
    const [isHealthy, setIsHealthy] = useState(true);
    const [healthNotes, setHealthNotes] = useState('');
<<<<<<< HEAD
    const [requirements, setRequirements] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Animations
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const successScale = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
        }).start();
    }, [currentStep]);

    const handleAddPhoto = async () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.8,
        });

        if (!result.canceled && result.assets[0]) {
            setPhotos([...photos, result.assets[0].uri]);
        }
    };

    const handleTraitToggle = (trait: PersonalityTrait) => {
        if (selectedTraits.includes(trait)) {
            setSelectedTraits(selectedTraits.filter(t => t !== trait));
        } else if (selectedTraits.length < 4) {
            setSelectedTraits([...selectedTraits, trait]);
        }
    };

    const handleNext = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (currentStep < 3) {
            setCurrentStep(currentStep + 1);
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        } else {
            handleSubmit();
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        } else {
            router.back();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

        await new Promise(resolve => setTimeout(resolve, 1500));

        setShowSuccess(true);
        Animated.spring(successScale, {
            toValue: 1,
            friction: 6,
            tension: 100,
            useNativeDriver: true,
        }).start();

        setTimeout(() => {
            router.back();
        }, 2000);
    };

    const renderStep = () => {
        switch (currentStep) {
            case 0:
                return (
                    <PhotoUploadCard
                        photos={photos}
                        onAddPhoto={handleAddPhoto}
                        onRemovePhoto={(index) => setPhotos(photos.filter((_, i) => i !== index))}
                    />
                );
            case 1:
                return (
                    <BasicInfoCard
                        name={name}
                        breed={breed}
                        age={age}
                        species={species}
                        gender={gender}
                        onNameChange={setName}
                        onBreedChange={setBreed}
                        onAgeChange={setAge}
                        onSpeciesChange={setSpecies}
                        onGenderChange={setGender}
                    />
                );
            case 2:
                return (
                    <PersonalityCard
                        selectedTraits={selectedTraits}
                        size={size}
                        onTraitToggle={handleTraitToggle}
                        onSizeChange={setSize}
                    />
                );
            case 3:
                return (
                    <HealthCard
                        isVaccinated={isVaccinated}
                        isNeutered={isNeutered}
                        isHealthy={isHealthy}
                        healthNotes={healthNotes}
                        onVaccinatedChange={setIsVaccinated}
                        onNeuteredChange={setIsNeutered}
                        onHealthyChange={setIsHealthy}
                        onHealthNotesChange={setHealthNotes}
                    />
                );
            default:
                return null;
        }
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 0: return photos.length > 0;
            case 1: return name.trim() && breed.trim() && age.trim();
            case 2: return selectedTraits.length > 0;
            case 3: return true;
            default: return false;
        }
    };

    if (showSuccess) {
        return (
            <SafeAreaView style={[styles.safeArea, styles.successContainer]}>
                <Animated.View style={[styles.successContent, { transform: [{ scale: successScale }] }]}>
                    <View style={styles.successIcon}>
                        <Text style={styles.successEmoji}>🎉</Text>
                    </View>
                    <Text style={styles.successTitle}>Post Created!</Text>
                    <Text style={styles.successText}>
                        🐾 {name} is now ready to find a loving home
                    </Text>
                </Animated.View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
=======
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
>>>>>>> 9cfb1f6 (adoption and report)
            <StatusBar style="dark" />

            {/* Header */}
            <View style={styles.header}>
<<<<<<< HEAD
                <Pressable style={styles.backButton} onPress={handleBack}>
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.textDark} />
                </Pressable>
                <View style={styles.headerCenter}>
                    <Text style={styles.headerTitle}>New Adoption Post</Text>
                    <StepIndicator currentStep={currentStep} totalSteps={4} />
                </View>
                <View style={styles.headerPlaceholder} />
            </View>

            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <ScrollView
                    ref={scrollViewRef}
                    style={styles.container}
                    contentContainerStyle={styles.scrollContent}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    <Animated.View style={{ opacity: fadeAnim }}>
                        {renderStep()}
                    </Animated.View>
                </ScrollView>

                {/* Bottom Actions */}
                <View style={styles.bottomActions}>
                    <Pressable
                        style={[styles.nextButton, !isStepValid() && styles.nextButtonDisabled]}
                        onPress={handleNext}
                        disabled={!isStepValid() || isSubmitting}
                    >
                        <LinearGradient
                            colors={isStepValid() ? ['#A5E5ED', '#BBF3DE'] : ['#E5E7EB', '#D1D5DB']}
                            style={styles.nextButtonGradient}
                        >
                            <Text style={[styles.nextButtonText, !isStepValid() && styles.nextButtonTextDisabled]}>
                                {currentStep === 3 ? (isSubmitting ? 'Creating...' : 'Create Post 🐾') : 'Continue'}
                            </Text>
                            {currentStep < 3 && (
                                <Ionicons name="arrow-forward" size={20} color="#fff" />
                            )}
                        </LinearGradient>
                    </Pressable>
                </View>
            </KeyboardAvoidingView>
=======
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
>>>>>>> 9cfb1f6 (adoption and report)
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
<<<<<<< HEAD
        backgroundColor: '#FAFBFC',
=======
        backgroundColor: colors.minimalist.bgLight,
>>>>>>> 9cfb1f6 (adoption and report)
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
<<<<<<< HEAD
        paddingHorizontal: spacing.xl,
        paddingVertical: spacing.lg,
        backgroundColor: '#fff',
=======
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.minimalist.white,
>>>>>>> 9cfb1f6 (adoption and report)
    },
    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
<<<<<<< HEAD
        backgroundColor: '#F3F4F6',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerCenter: {
        flex: 1,
        alignItems: 'center',
    },
    headerTitle: {
        ...serifTextStyles.serifSubheading,
        fontSize: 20,
        color: colors.minimalist.textDark,
        marginBottom: spacing.md,
=======
        backgroundColor: colors.minimalist.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        ...serifTextStyles.serifSubheading,
        color: colors.minimalist.textDark,
        flex: 1,
        textAlign: 'center',
>>>>>>> 9cfb1f6 (adoption and report)
    },
    headerPlaceholder: {
        width: 40,
    },
<<<<<<< HEAD
    // Step Indicator
    stepIndicator: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    stepDot: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: '#E5E7EB',
        justifyContent: 'center',
        alignItems: 'center',
    },
    stepDotActive: {
        backgroundColor: '#A5E5ED',
    },
    stepDotCompleted: {
        backgroundColor: '#059669',
    },
    stepLine: {
        width: 30,
        height: 2,
        backgroundColor: '#E5E7EB',
    },
    stepLineCompleted: {
        backgroundColor: '#059669',
    },
=======
>>>>>>> 9cfb1f6 (adoption and report)
    container: {
        flex: 1,
    },
    scrollContent: {
<<<<<<< HEAD
        padding: spacing.xl,
    },
    // Cards
    photoCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: spacing.xl,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
            android: { elevation: 3 },
        }),
    },
    infoCard: {
        backgroundColor: '#fff',
        borderRadius: 24,
        padding: spacing.xl,
        ...Platform.select({
            ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.08, shadowRadius: 12 },
            android: { elevation: 3 },
        }),
    },
    cardTitle: {
        ...serifTextStyles.serifSubheading,
        fontSize: 20,
        color: colors.minimalist.textDark,
    },
    cardSubtitle: {
        fontSize: 14,
        color: colors.minimalist.textLight,
        marginTop: 4,
        marginBottom: spacing.lg,
    },
    // Photo
    photoScroll: {
        marginTop: spacing.md,
    },
    addPhotoBtn: {
        width: 120,
        height: 120,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: spacing.md,
    },
    addPhotoGradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addPhotoText: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.minimalist.orange,
        marginTop: 4,
    },
    photoPreview: {
        width: 120,
        height: 120,
        borderRadius: 16,
        overflow: 'hidden',
        marginRight: spacing.md,
    },
    photoImage: {
        width: '100%',
        height: '100%',
    },
    removePhotoBtn: {
        position: 'absolute',
        top: 6,
        right: 6,
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    // Toggle
    toggleRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.lg,
    },
    toggleBtn: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.md,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
    },
    toggleBtnActive: {
        backgroundColor: '#FEF3C7',
    },
    toggleEmoji: {
        fontSize: 20,
    },
    toggleText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
    },
    toggleTextActive: {
        color: colors.minimalist.textDark,
    },
    // Inputs
=======
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
>>>>>>> 9cfb1f6 (adoption and report)
    inputGroup: {
        marginBottom: spacing.md,
    },
    inputLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
<<<<<<< HEAD
        marginBottom: 6,
    },
    textInput: {
        backgroundColor: '#F9FAFB',
        borderRadius: 12,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm + 4,
        fontSize: 15,
        color: colors.minimalist.textDark,
        borderWidth: 1,
        borderColor: '#E5E7EB',
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    inputRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    genderToggle: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        padding: 4,
    },
    genderBtn: {
        flex: 1,
        paddingVertical: spacing.sm,
        alignItems: 'center',
        borderRadius: 10,
    },
    genderBtnActive: {
        backgroundColor: '#fff',
    },
    genderText: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.minimalist.textLight,
    },
    genderTextActive: {
        color: colors.minimalist.textDark,
    },
    // Personality
    sectionLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
        marginBottom: spacing.sm,
    },
    sizeOptions: {
        flexDirection: 'row',
        gap: spacing.sm,
    },
    sizeBtn: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: 12,
        backgroundColor: '#F3F4F6',
        alignItems: 'center',
    },
    sizeBtnActive: {
        backgroundColor: '#A5E5ED',
    },
    sizeBtnLabel: {
=======
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
>>>>>>> 9cfb1f6 (adoption and report)
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
    },
<<<<<<< HEAD
    sizeBtnLabelActive: {
        color: '#fff',
    },
    sizeBtnDesc: {
        fontSize: 11,
        color: colors.minimalist.textLight,
        marginTop: 2,
    },
    traitGrid: {
=======
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
>>>>>>> 9cfb1f6 (adoption and report)
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: spacing.sm,
    },
    traitChip: {
<<<<<<< HEAD
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        borderRadius: 20,
        backgroundColor: '#F3F4F6',
    },
    traitChipActive: {
        backgroundColor: '#FEF3C7',
    },
    traitEmoji: {
        fontSize: 14,
    },
    traitLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
    },
    traitLabelActive: {
        color: colors.minimalist.textDark,
    },
    // Health
    healthOptions: {
        gap: spacing.sm,
        marginBottom: spacing.lg,
    },
    healthOption: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.md,
        paddingVertical: spacing.sm,
        paddingHorizontal: spacing.md,
        borderRadius: 12,
        backgroundColor: '#F9FAFB',
    },
    healthOptionActive: {
        backgroundColor: '#D1FAE5',
    },
    healthLabel: {
        fontSize: 15,
        color: colors.minimalist.textMedium,
    },
    healthLabelActive: {
        color: '#059669',
        fontWeight: '600',
    },
    // Bottom Actions
    bottomActions: {
        padding: spacing.lg,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: 'rgba(0,0,0,0.05)',
    },
    nextButton: {
        borderRadius: 16,
        overflow: 'hidden',
    },
    nextButtonDisabled: {
        opacity: 0.7,
    },
    nextButtonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        paddingVertical: spacing.md + 4,
    },
    nextButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#fff',
    },
    nextButtonTextDisabled: {
        color: '#9CA3AF',
    },
    // Success
    successContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FAFBFC',
    },
    successContent: {
        alignItems: 'center',
    },
    successIcon: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#D1FAE5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    successEmoji: {
        fontSize: 48,
    },
    successTitle: {
        ...serifTextStyles.serifSubheading,
        fontSize: 24,
        color: colors.minimalist.textDark,
        marginBottom: spacing.sm,
    },
    successText: {
        fontSize: 16,
        color: colors.minimalist.textMedium,
        textAlign: 'center',
=======
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
>>>>>>> 9cfb1f6 (adoption and report)
    },
});

export default NGOCreateAdoptionScreen;
