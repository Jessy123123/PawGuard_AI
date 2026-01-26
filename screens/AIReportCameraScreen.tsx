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
import { yoloBackendService } from '../services/yoloBackendService';
import { AnimalIdentificationResult } from '../types/yolo';
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

        try {
            console.log('🎯 Starting YOLO backend detection...');
            const backendResult = await yoloBackendService.detectAnimals(uri);

            if (!backendResult.primary_detection) {
                console.log('⚠️ YOLO: No dog/cat detected');
                Alert.alert('No Animal Detected', 'Please try taking a clearer photo of a dog or cat.');
                setIsAnalyzing(false);
                return;
            }

            console.log('✅ YOLO detected animal!');
            const detection = backendResult.primary_detection;

            // Create result from YOLO detection
            const result: AnimalIdentificationResult = {
                isAnimal: true,
                species: detection.class_name,
                breed: detection.class_name.charAt(0).toUpperCase() + detection.class_name.slice(1),
                color: 'Detected via YOLO',
                distinctiveFeatures: [
                    `Detected with ${(detection.confidence * 100).toFixed(1)}% confidence`,
                    'YOLOv8 Backend Detection'
                ],
                estimatedAge: 'unknown',
                size: 'medium',
                condition: 'unknown',
                confidence: detection.confidence,
                rawResponse: `YOLO: ${detection.class_name} @ ${(detection.confidence * 100).toFixed(1)}%`
            };

            setAnalysisResult(result);
            setIsAnalyzing(false);

        } catch (error: any) {
            const errorMsg = error?.message || 'Unknown error';
            console.error('❌ YOLO detection failed:', errorMsg);
            Alert.alert(
                'Detection Failed',
                `Could not analyze the image. Make sure the YOLO backend server is running.\n\nError: ${errorMsg}`
            );
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
