import React, { forwardRef, useCallback, useMemo } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { DisasterAnimal } from '../../types/disaster';
import { getConditionLabel, getConditionBadgeColor } from '../../types/disaster';
import { AnimalPinIcon } from './AnimalMapPin';

interface AnimalQuickViewSheetProps {
    animal: DisasterAnimal | null;
    onViewDetails: (animal: DisasterAnimal) => void;
    onContactReporter: (animal: DisasterAnimal) => void;
    onClose: () => void;
}

export const AnimalQuickViewSheet = forwardRef<BottomSheet, AnimalQuickViewSheetProps>(
    ({ animal, onViewDetails, onContactReporter, onClose }, ref) => {
        const snapPoints = useMemo(() => ['35%', '60%'], []);

        const renderBackdrop = useCallback(
            (props: any) => (
                <BottomSheetBackdrop
                    {...props}
                    disappearsOnIndex={-1}
                    appearsOnIndex={0}
                    opacity={0.5}
                />
            ),
            []
        );

        if (!animal) return null;

        const conditionColors = getConditionBadgeColor(animal.condition);

        return (
            <BottomSheet
                ref={ref}
                index={-1}
                snapPoints={snapPoints}
                enablePanDownToClose
                backdropComponent={renderBackdrop}
                handleIndicatorStyle={styles.handleIndicator}
                backgroundStyle={styles.background}
                onClose={onClose}
            >
                <BottomSheetView style={styles.content}>
                    {/* Animal Preview */}
                    <View style={styles.previewContainer}>
                        {animal.photos.length > 0 ? (
                            <Image
                                source={{ uri: animal.photos[0] }}
                                style={styles.previewImage}
                                resizeMode="cover"
                            />
                        ) : (
                            <View style={styles.placeholderImage}>
                                <Ionicons
                                    name="image-outline"
                                    size={40}
                                    color={colors.minimalist.textLight}
                                />
                            </View>
                        )}

                        <View style={styles.previewInfo}>
                            <View style={styles.animalTypeRow}>
                                <AnimalPinIcon
                                    condition={animal.condition}
                                    animalType={animal.animalType}
                                    size="small"
                                />
                                <Text style={styles.animalType}>
                                    {animal.animalType === 'cat' ? 'Cat' : 'Dog'}
                                </Text>
                            </View>

                            <View style={[
                                styles.conditionBadge,
                                { backgroundColor: conditionColors.bg }
                            ]}>
                                <Text style={[
                                    styles.conditionText,
                                    { color: conditionColors.text }
                                ]}>
                                    {getConditionLabel(animal.condition)}
                                </Text>
                            </View>

                            <View style={styles.locationRow}>
                                <Ionicons
                                    name="location"
                                    size={14}
                                    color={colors.minimalist.textMedium}
                                />
                                <Text style={styles.locationText}>
                                    {animal.locationName}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Description */}
                    {animal.description && (
                        <Text style={styles.description} numberOfLines={2}>
                            {animal.description}
                        </Text>
                    )}

                    {/* Action Buttons */}
                    <View style={styles.actions}>
                        <Pressable
                            style={styles.primaryButton}
                            onPress={() => onViewDetails(animal)}
                        >
                            <Text style={styles.primaryButtonText}>View Details</Text>
                        </Pressable>

                        <Pressable
                            style={styles.secondaryButton}
                            onPress={() => onContactReporter(animal)}
                        >
                            <Ionicons
                                name="call-outline"
                                size={18}
                                color={colors.minimalist.textDark}
                            />
                            <Text style={styles.secondaryButtonText}>Contact</Text>
                        </Pressable>
                    </View>
                </BottomSheetView>
            </BottomSheet>
        );
    }
);

const styles = StyleSheet.create({
    background: {
        backgroundColor: colors.minimalist.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    handleIndicator: {
        backgroundColor: colors.gray300,
        width: 40,
    },
    content: {
        flex: 1,
        padding: spacing.lg,
    },
    previewContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.md,
    },
    previewImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 12,
        backgroundColor: colors.minimalist.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    previewInfo: {
        flex: 1,
        justifyContent: 'center',
        gap: spacing.sm,
    },
    animalTypeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    animalType: {
        fontSize: 18,
        fontWeight: '700',
        color: colors.minimalist.textDark,
    },
    conditionBadge: {
        alignSelf: 'flex-start',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 6,
    },
    conditionText: {
        fontSize: 12,
        fontWeight: '600',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    locationText: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
    },
    description: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
        lineHeight: 20,
        marginBottom: spacing.lg,
    },
    actions: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    primaryButton: {
        flex: 1,
        backgroundColor: colors.minimalist.disasterOrange,
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: 'center',
    },
    primaryButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.white,
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingHorizontal: spacing.lg,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: colors.minimalist.bgLight,
        borderWidth: 1,
        borderColor: colors.minimalist.border,
    },
    secondaryButtonText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
});
