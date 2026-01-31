import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import type { DisasterAnimal } from '../../types/disaster';
import { getConditionLabel, getConditionBadgeColor } from '../../types/disaster';

interface AnimalListCardProps {
    animal: DisasterAnimal;
    onPress: (animal: DisasterAnimal) => void;
}

export const AnimalListCard: React.FC<AnimalListCardProps> = ({ animal, onPress }) => {
    const conditionColors = getConditionBadgeColor(animal.condition);
    const timeAgo = getTimeAgo(animal.reportedAt);

    return (
        <Pressable
            style={({ pressed }) => [
                styles.container,
                pressed && styles.pressed
            ]}
            onPress={() => onPress(animal)}
        >
            {/* Photo */}
            {animal.photos.length > 0 ? (
                <Image
                    source={{ uri: animal.photos[0] }}
                    style={styles.photo}
                    resizeMode="cover"
                />
            ) : (
                <View style={styles.placeholderPhoto}>
                    <Ionicons
                        name={animal.animalType === 'cat' ? 'logo-octocat' : 'paw'}
                        size={24}
                        color={colors.minimalist.textLight}
                    />
                </View>
            )}

            {/* Content */}
            <View style={styles.content}>
                <View style={styles.topRow}>
                    {/* Animal Type Tag */}
                    <View style={styles.typeTag}>
                        <Text style={styles.typeText}>
                            {animal.animalType === 'cat' ? 'Cat' : 'Dog'}
                        </Text>
                    </View>

                    {/* Condition Badge */}
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
                </View>

                {/* Location */}
                <View style={styles.locationRow}>
                    <Ionicons
                        name="location-outline"
                        size={14}
                        color={colors.minimalist.textMedium}
                    />
                    <Text style={styles.locationText} numberOfLines={1}>
                        {animal.locationName}
                    </Text>
                </View>

                {/* Timestamp */}
                <Text style={styles.timestamp}>{timeAgo}</Text>
            </View>

            {/* Chevron */}
            <Ionicons
                name="chevron-forward"
                size={20}
                color={colors.minimalist.textLight}
            />
        </Pressable>
    );
};

// Helper function to format time ago
function getTimeAgo(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(date).toLocaleDateString();
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.minimalist.white,
        borderRadius: 12,
        padding: spacing.md,
        marginBottom: spacing.sm,
        borderWidth: 1,
        borderColor: colors.minimalist.border,
        gap: spacing.md,
    },
    pressed: {
        backgroundColor: colors.minimalist.bgLight,
    },
    photo: {
        width: 64,
        height: 64,
        borderRadius: 10,
    },
    placeholderPhoto: {
        width: 64,
        height: 64,
        borderRadius: 10,
        backgroundColor: colors.minimalist.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        flex: 1,
        gap: 4,
    },
    topRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: spacing.sm,
    },
    typeTag: {
        backgroundColor: colors.minimalist.bgLight,
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    typeText: {
        fontSize: 11,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
        textTransform: 'uppercase',
    },
    conditionBadge: {
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 4,
    },
    conditionText: {
        fontSize: 11,
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
        flex: 1,
    },
    timestamp: {
        fontSize: 12,
        color: colors.minimalist.textLight,
    },
});
