import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, Pressable, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { serifTextStyles } from '../theme/typography';
import { FloatingCard } from '../components/FloatingCard';
import { offlineAI } from '../services/offlineAIService';
import { identifyAnimal } from '../services/geminiService';
import { searchSimilarAnimals } from '../services/animalService';
import { AnimalIdentificationResult } from '../services/geminiService';
import { useRouter } from 'expo-router';

export const AIReportCameraScreen = () => {
    const router = useRouter();
    const [imageUri, setImageUri] = useState<string | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnimalIdentificationResult | null>(null);

    const takePhoto = async () => {
        try {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permission needed', 'Camera permission is required to identify animals.');
                return;
            }

            const result = await ImagePicker.launchCameraAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled) {
                analyzeImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to open camera');
            console.error(error);
        }
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: 'images',
                allowsEditing: true,
                quality: 0.8,
            });

            if (!result.canceled) {
                analyzeImage(result.assets[0].uri);
            }
        } catch (error) {
            Alert.alert('Error', 'Failed to pick image');
            console.error(error);
        }
    };


    const analyzeImage = async (uri: string) => {
        setImageUri(uri);
        setIsAnalyzing(true);
        setAnalysisResult(null);

        let result: AnimalIdentificationResult | null = null;
        let usedTensorFlow = false;

        try {
            // Try TensorFlow Lite first (offline AI)
            console.log('🔍 Attempting TensorFlow AI detection...');
            await offlineAI.initialize();
            const tfliteResults = await offlineAI.classifyImage(uri);

            if (tfliteResults.length > 0) {
                usedTensorFlow = true;
                console.log('✅ TensorFlow AI successful');

                // Convert TFLite results to AnimalIdentificationResult format
                const bestMatch = tfliteResults[0];
                const labelLower = bestMatch.label.toLowerCase();

                // Detect if it's a dog or cat based on ImageNet labels
                const isDog = labelLower.includes('dog') ||
                    labelLower.includes('retriever') ||
                    labelLower.includes('terrier') ||
                    labelLower.includes('hound') ||
                    labelLower.includes('spaniel') ||
                    labelLower.includes('bulldog') ||
                    labelLower.includes('shepherd') ||
                    labelLower.includes('poodle') ||
                    labelLower.includes('chihuahua') ||
                    labelLower.includes('beagle') ||
                    labelLower.includes('pug');

                const isCat = labelLower.includes('cat') ||
                    labelLower.includes('tabby') ||
                    labelLower.includes('siamese') ||
                    labelLower.includes('persian') ||
                    labelLower.includes('kitty') ||
                    labelLower.includes('kitten');

                const isAnimal = isDog || isCat;

                if (isAnimal) {
                    result = {
                        isAnimal: true,
                        species: isDog ? 'dog' : 'cat',
                        breed: bestMatch.label,
                        color: 'Detected via TensorFlow',
                        distinctiveFeatures: ['Identified using Offline TensorFlow AI'],
                        estimatedAge: 'unknown',
                        size: 'medium',
                        condition: 'unknown',
                        confidence: bestMatch.confidence,
                        rawResponse: `TensorFlow: ${bestMatch.label} (${(bestMatch.confidence * 100).toFixed(1)}%)`
                    };
                } else {
                    console.log('⚠️ TensorFlow detected something, but not a dog/cat');
                }
            }
        } catch (tensorflowError) {
            console.log('⚠️ TensorFlow unavailable, falling back to Gemini API...');
        }

        // Fallback to Gemini API if TensorFlow didn't work
        if (!result) {
            try {
                console.log('🌐 Using Gemini API...');
                result = await identifyAnimal(uri);
                console.log('✅ Gemini API successful');
            } catch (geminiError: any) {
                const errorMsg = geminiError?.message || 'Unknown error';
                console.error('❌ Both TensorFlow and Gemini failed');
                console.error('Gemini error:', errorMsg);
                Alert.alert(
                    'Analysis Failed',
                    `Could not analyze the image.\n\nError: ${errorMsg.substring(0, 100)}`
                );
                setIsAnalyzing(false);
                return;
            }
        }

        // Validate result
        if (!result || !result.isAnimal) {
            Alert.alert('No Animal Detected', 'Please try taking a clearer photo of the animal.');
            setIsAnalyzing(false);
            return;
        }

        setAnalysisResult(result);

        // Search for matches in background (optional feature)
        try {
            const matches = await searchSimilarAnimals(
                result.species,
                result.breed,
                result.color
            );

            if (matches.length > 0) {
                // Navigate to match result screen if duplicates found
                setTimeout(() => {
                    router.push({
                        pathname: '/AnimalMatchResult',
                        params: {
                            capturedImage: uri,
                            aiResult: JSON.stringify(result),
                            matches: JSON.stringify(matches)
                        }
                    });
                }, 1500);
            }
        } catch (error) {
            // Firestore not configured yet - skip duplicate detection
            console.log('Duplicate detection skipped (Firestore not configured)');
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleContinue = () => {
        if (imageUri && analysisResult) {
            router.push({
                pathname: '/ReportSighting',
                params: {
                    imageUri,
                    aiResult: JSON.stringify(analysisResult)
                }
            });
        }
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            <View style={styles.header}>
                <Pressable onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="close" size={24} color={colors.minimalist.textDark} />
                </Pressable>
                <Text style={styles.headerTitle}>AI Identification</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content}>
                {!imageUri ? (
                    <View style={styles.placeholderContainer}>
                        <View style={styles.illustrationCircle}>
                            <Ionicons name="scan-outline" size={64} color={colors.minimalist.coral} />
                        </View>
                        <Text style={styles.title}>Identify Animal</Text>
                        <Text style={styles.subtitle}>
                            Take a photo or upload an image. AI will identify the species, breed, and check for existing records.
                        </Text>

                        <View style={styles.buttonRow}>
                            <Pressable style={styles.actionButton} onPress={takePhoto}>
                                <LinearGradient
                                    colors={[colors.minimalist.coral, colors.minimalist.orange]}
                                    style={styles.gradient}
                                >
                                    <Ionicons name="camera" size={24} color={colors.minimalist.white} />
                                    <Text style={styles.buttonText}>Camera</Text>
                                </LinearGradient>
                            </Pressable>

                            <Pressable style={styles.actionButton} onPress={pickImage}>
                                <View style={styles.secondaryButton}>
                                    <Ionicons name="images" size={24} color={colors.minimalist.coral} />
                                    <Text style={styles.secondaryButtonText}>Gallery</Text>
                                </View>
                            </Pressable>
                        </View>
                    </View>
                ) : (
                    <View style={styles.resultContainer}>
                        <Image source={{ uri: imageUri }} style={styles.previewImage} />

                        {isAnalyzing ? (
                            <View style={styles.analyzingOverlay}>
                                <ActivityIndicator size="large" color={colors.minimalist.white} />
                                <Text style={styles.analyzingText}>Analyzing with AI...</Text>
                            </View>
                        ) : analysisResult ? (
                            <View style={styles.resultCard}>
                                <FloatingCard shadow="medium">
                                    <View style={styles.resultHeader}>
                                        <Ionicons
                                            name="checkmark-circle"
                                            size={32}
                                            color={analysisResult.isAnimal ? colors.minimalist.greenDark : colors.minimalist.orange}
                                        />
                                        <Text style={styles.resultTitle}>
                                            {analysisResult.isAnimal ? 'Scan Complete' : 'Not an Animal?'}
                                        </Text>
                                    </View>

                                    {analysisResult.isAnimal && (
                                        <View style={styles.attributesList}>
                                            <View style={styles.attributeRow}>
                                                <Text style={styles.attributeLabel}>Species:</Text>
                                                <Text style={styles.attributeValue}>{analysisResult.species.toUpperCase()}</Text>
                                            </View>
                                            <View style={styles.attributeRow}>
                                                <Text style={styles.attributeLabel}>Breed Match:</Text>
                                                <Text style={styles.attributeValue}>{analysisResult.breed}</Text>
                                            </View>
                                            <View style={styles.attributeRow}>
                                                <Text style={styles.attributeLabel}>Color:</Text>
                                                <Text style={styles.attributeValue}>{analysisResult.color}</Text>
                                            </View>
                                            <View style={styles.attributeRow}>
                                                <Text style={styles.attributeLabel}>Confidence:</Text>
                                                <Text style={styles.attributeValue}>{(analysisResult.confidence * 100).toFixed(0)}%</Text>
                                            </View>
                                        </View>
                                    )}

                                    <Pressable
                                        style={styles.continueButton}
                                        onPress={handleContinue}
                                    >
                                        <Text style={styles.continueButtonText}>Create Report with this Data</Text>
                                        <Ionicons name="arrow-forward" size={20} color={colors.minimalist.white} />
                                    </Pressable>

                                    <Pressable
                                        style={styles.retakeButton}
                                        onPress={() => setImageUri(null)}
                                    >
                                        <Text style={styles.retakeButtonText}>Retake Photo</Text>
                                    </Pressable>
                                </FloatingCard>
                            </View>
                        ) : null}
                    </View>
                )}
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
    },
    backButton: {
        padding: spacing.xs,
    },
    headerTitle: {
        ...serifTextStyles.serifSubheading,
        flex: 1,
        textAlign: 'center',
        marginRight: 32, // Balance back button
    },
    content: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: spacing.lg,
    },
    placeholderContainer: {
        alignItems: 'center',
    },
    illustrationCircle: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: colors.minimalist.peachLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: colors.minimalist.textDark,
        marginBottom: spacing.sm,
    },
    subtitle: {
        fontSize: 16,
        color: colors.minimalist.textMedium,
        textAlign: 'center',
        marginBottom: spacing.xxl,
        lineHeight: 24,
    },
    buttonRow: {
        flexDirection: 'row',
        gap: spacing.md,
        width: '100%',
    },
    actionButton: {
        flex: 1,
        borderRadius: 16,
        overflow: 'hidden',
    },
    gradient: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        gap: spacing.sm,
    },
    buttonText: {
        color: colors.minimalist.white,
        fontWeight: '600',
        fontSize: 16,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.lg,
        gap: spacing.sm,
        backgroundColor: colors.minimalist.white,
        borderWidth: 1,
        borderColor: colors.minimalist.coral,
        borderRadius: 16,
    },
    secondaryButtonText: {
        color: colors.minimalist.coral,
        fontWeight: '600',
        fontSize: 16,
    },
    resultContainer: {
        flex: 1,
        width: '100%',
    },
    previewImage: {
        width: '100%',
        height: 300,
        borderRadius: 24,
        marginBottom: spacing.lg,
    },
    analyzingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24,
    },
    analyzingText: {
        color: colors.minimalist.white,
        marginTop: spacing.md,
        fontSize: 16,
        fontWeight: '600',
    },
    resultCard: {
        width: '100%',
    },
    resultHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: spacing.lg,
        gap: spacing.sm,
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.minimalist.textDark,
    },
    attributesList: {
        marginBottom: spacing.xl,
    },
    attributeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: spacing.xs,
        borderBottomWidth: 1,
        borderBottomColor: colors.gray200,
    },
    attributeLabel: {
        color: colors.minimalist.textMedium,
        fontSize: 15,
    },
    attributeValue: {
        color: colors.minimalist.textDark,
        fontWeight: '600',
        fontSize: 15,
    },
    continueButton: {
        backgroundColor: colors.minimalist.coral,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: spacing.md,
        borderRadius: 12,
        marginBottom: spacing.md,
        gap: spacing.xs,
    },
    continueButtonText: {
        color: colors.minimalist.white,
        fontWeight: '600',
        fontSize: 16,
    },
    retakeButton: {
        alignItems: 'center',
        paddingVertical: spacing.sm,
    },
    retakeButtonText: {
        color: colors.minimalist.textMedium,
        fontSize: 14,
    },
});
