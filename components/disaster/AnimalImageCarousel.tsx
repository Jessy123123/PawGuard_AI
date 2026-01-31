import React, { useState, useRef } from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    NativeSyntheticEvent,
    NativeScrollEvent
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_HEIGHT = 280;

interface AnimalImageCarouselProps {
    images: string[];
    borderRadius?: number;
}

export const AnimalImageCarousel: React.FC<AnimalImageCarouselProps> = ({
    images,
    borderRadius = 0,
}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollViewRef = useRef<ScrollView>(null);

    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const contentOffset = event.nativeEvent.contentOffset.x;
        const index = Math.round(contentOffset / SCREEN_WIDTH);
        setActiveIndex(index);
    };

    if (images.length === 0) {
        return (
            <View style={[styles.placeholder, { borderRadius }]}>
                <Ionicons
                    name="image-outline"
                    size={48}
                    color={colors.minimalist.textLight}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView
                ref={scrollViewRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {images.map((uri, index) => (
                    <Image
                        key={`image-${index}`}
                        source={{ uri }}
                        style={[styles.image, { borderRadius }]}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            {/* Page Indicators */}
            {images.length > 1 && (
                <View style={styles.indicators}>
                    {images.map((_, index) => (
                        <View
                            key={`indicator-${index}`}
                            style={[
                                styles.indicator,
                                activeIndex === index && styles.activeIndicator,
                            ]}
                        />
                    ))}
                </View>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
                <View style={styles.counter}>
                    <Ionicons
                        name="images-outline"
                        size={14}
                        color={colors.minimalist.white}
                    />
                    <View style={styles.counterText}>
                        <View style={styles.counterNumber}>
                            <Ionicons
                                name="remove"
                                size={0}
                                color="transparent"
                            />
                        </View>
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    image: {
        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT,
    },
    placeholder: {
        width: SCREEN_WIDTH,
        height: IMAGE_HEIGHT,
        backgroundColor: colors.minimalist.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicators: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: spacing.md,
        left: 0,
        right: 0,
        gap: 6,
    },
    indicator: {
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    activeIndicator: {
        width: 20,
        backgroundColor: colors.minimalist.white,
    },
    counter: {
        position: 'absolute',
        top: spacing.md,
        right: spacing.md,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingHorizontal: spacing.sm,
        paddingVertical: 4,
        borderRadius: 12,
    },
    counterText: {
        flexDirection: 'row',
    },
    counterNumber: {
        // Placeholder for index display
    },
});
