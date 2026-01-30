import React, { useEffect, useRef, memo } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Dimensions,
    Animated,
    Platform,
    ImageBackground,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { BlurView } from 'expo-blur';
import * as Haptics from 'expo-haptics';
import { spacing } from '../../theme/spacing';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Local video file
const VIDEO_SOURCE = require('../../assets/video/stray_cat.mp4');

/**
 * Isolated Video Component to prevent React 19 "Expected static flag" errors
 * by keeping the native view stable and outside the main animation re-render cycle.
 */
const VideoBackground = memo(({ player }: { player: any }) => {
    return (
        <View style={StyleSheet.absoluteFill}>
            <View style={styles.videoContainer}>
                <VideoView
                    player={player}
                    style={styles.video}
                    contentFit="cover"
                    nativeControls={false}
                />
            </View>

            {/* Premium Dark Gradient Overlay */}
            <LinearGradient
                colors={[
                    'rgba(0, 0, 0, 0.15)',
                    'rgba(0, 0, 0, 0.05)',
                    'rgba(0, 0, 0, 0.25)',
                    'rgba(0, 0, 0, 0.65)',
                    'rgba(0, 0, 0, 0.85)',
                ]}
                locations={[0, 0.25, 0.5, 0.75, 1]}
                style={styles.gradientOverlay}
            />

            {/* Vignette Effect */}
            <View style={styles.vignetteTop} />
            <View style={styles.vignetteBottom} />
            <View style={styles.vignetteLeft} />
            <View style={styles.vignetteRight} />
        </View>
    );
});

export default function LandingScreen() {
    const router = useRouter();

    // Initialize Video Player (expo-video)
    const player = useVideoPlayer(VIDEO_SOURCE, (player) => {
        player.loop = true;
        player.play();
        player.muted = true;
    });

    // Animation values - staggered entry
    const backgroundOpacity = useRef(new Animated.Value(0)).current;
    const titleOpacity = useRef(new Animated.Value(0)).current;
    const titleTranslateY = useRef(new Animated.Value(30)).current;
    const taglineOpacity = useRef(new Animated.Value(0)).current;
    const buttonsOpacity = useRef(new Animated.Value(0)).current;
    const buttonsTranslateY = useRef(new Animated.Value(60)).current;
    const grainOpacity = useRef(new Animated.Value(0)).current;

    // Button animations
    const getStartedScale = useRef(new Animated.Value(1)).current;
    const loginScale = useRef(new Animated.Value(1)).current;
    const getStartedGlow = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const runAnimations = async () => {
            // 1. Background fades in
            Animated.timing(backgroundOpacity, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start();

            // Film grain subtle fade
            Animated.timing(grainOpacity, {
                toValue: 0.025,
                duration: 1200,
                useNativeDriver: true,
            }).start();

            // 2. Title fades & slides in (after 400ms)
            await new Promise(resolve => setTimeout(resolve, 400));
            Animated.parallel([
                Animated.timing(titleOpacity, {
                    toValue: 1,
                    duration: 600,
                    useNativeDriver: true,
                }),
                Animated.timing(titleTranslateY, {
                    toValue: 0,
                    duration: 600,
                    useNativeDriver: true,
                }),
            ]).start();

            // 3. Tagline fades in (after 300ms more)
            await new Promise(resolve => setTimeout(resolve, 300));
            Animated.timing(taglineOpacity, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }).start();

            // 4. Buttons slide up (after 250ms more)
            await new Promise(resolve => setTimeout(resolve, 250));
            Animated.parallel([
                Animated.timing(buttonsOpacity, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                }),
                Animated.spring(buttonsTranslateY, {
                    toValue: 0,
                    friction: 8,
                    tension: 50,
                    useNativeDriver: true,
                }),
            ]).start();
        };

        runAnimations();
    }, []);

    const handleGetStartedPressIn = () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }
        Animated.spring(getStartedScale, {
            toValue: 0.96,
            friction: 3,
            tension: 400,
            useNativeDriver: true,
        }).start();
        Animated.timing(getStartedGlow, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    const handleGetStartedPressOut = () => {
        Animated.spring(getStartedScale, {
            toValue: 1,
            friction: 3,
            tension: 400,
            useNativeDriver: true,
        }).start();
        Animated.timing(getStartedGlow, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const handleLoginPressIn = () => {
        if (Platform.OS !== 'web') {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        Animated.spring(loginScale, {
            toValue: 0.96,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const handleLoginPressOut = () => {
        Animated.spring(loginScale, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const handleGetStarted = () => {
        router.push('/(auth)/signup');
    };

    const handleLogin = () => {
        router.push('/(auth)/login');
    };

    return (
        <View style={styles.container}>
            <StatusBar style="light" />

            {/* Video Background - Memoized to protect from animation flags */}
            <VideoBackground player={player} />

            {/* Background Animation Overlay (Fade in) */}
            <Animated.View style={[
                StyleSheet.absoluteFillObject,
                {
                    backgroundColor: '#000',
                    opacity: backgroundOpacity.interpolate({
                        inputRange: [0, 1],
                        outputRange: [1, 0],
                    }),
                }
            ]} pointerEvents="none" />

            {/* Subtle Film Grain */}
            <Animated.View style={[styles.filmGrain, { opacity: grainOpacity }]} pointerEvents="none" />

            {/* Content */}
            <View style={styles.content}>
                {/* Logo Section - Centered */}
                <View style={styles.logoSection}>
                    <Animated.View style={{
                        opacity: titleOpacity,
                        transform: [{ translateY: titleTranslateY }],
                    }}>
                        <Text style={styles.appName}>PawGuard AI</Text>
                    </Animated.View>

                    <Animated.Text style={[styles.tagline, { opacity: taglineOpacity }]}>
                        Protecting animals through{'\n'}technology and community
                    </Animated.Text>
                </View>

                {/* CTA Section - Bottom */}
                <Animated.View style={[
                    styles.ctaSection,
                    {
                        opacity: buttonsOpacity,
                        transform: [{ translateY: buttonsTranslateY }],
                    }
                ]}>
                    {/* Get Started - Premium Button */}
                    <Animated.View style={[
                        styles.primaryButtonWrapper,
                        { transform: [{ scale: getStartedScale }] }
                    ]}>
                        {/* Outer Glow */}
                        <Animated.View style={[
                            styles.buttonGlow,
                            {
                                opacity: getStartedGlow.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.4, 0.7],
                                })
                            }
                        ]} />
                        <Pressable
                            onPressIn={handleGetStartedPressIn}
                            onPressOut={handleGetStartedPressOut}
                            onPress={handleGetStarted}
                            style={styles.primaryButtonPressable}
                        >
                            <LinearGradient
                                colors={['#FFB088', '#FF9268', '#FF7B4A']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 1 }}
                                style={styles.primaryButton}
                            >
                                {/* Inner Shadow Overlay */}
                                <View style={styles.innerShadow} />
                                <Text style={styles.primaryButtonText}>Get Started</Text>
                            </LinearGradient>
                        </Pressable>
                    </Animated.View>

                    {/* Log In - Frosted Glass Button */}
                    <Animated.View style={{ transform: [{ scale: loginScale }] }}>
                        <Pressable
                            onPressIn={handleLoginPressIn}
                            onPressOut={handleLoginPressOut}
                            onPress={handleLogin}
                            style={styles.secondaryButtonPressable}
                        >
                            {Platform.OS === 'ios' ? (
                                <BlurView intensity={20} tint="dark" style={styles.secondaryButton}>
                                    <Text style={styles.secondaryButtonText}>Log In</Text>
                                </BlurView>
                            ) : (
                                <View style={[styles.secondaryButton, styles.secondaryButtonAndroid]}>
                                    <Text style={styles.secondaryButtonText}>Log In</Text>
                                </View>
                            )}
                        </Pressable>
                    </Animated.View>

                    {/* Footer */}
                    <Text style={styles.footer}>
                        Join thousands helping animals in your community
                    </Text>
                </Animated.View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0A0A0A',
    },
    videoContainer: {
        ...StyleSheet.absoluteFillObject,
    },
    video: {
        flex: 1,
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
    },
    gradientOverlay: {
        ...StyleSheet.absoluteFillObject,
    },
    decorativeCircle1: {
        position: 'absolute',
        top: -100,
        right: -100,
        width: 300,
        height: 300,
        borderRadius: 150,
        backgroundColor: 'rgba(255, 146, 104, 0.1)',
    },
    decorativeCircle2: {
        position: 'absolute',
        bottom: 200,
        left: -150,
        width: 400,
        height: 400,
        borderRadius: 200,
        backgroundColor: 'rgba(100, 200, 255, 0.05)',
    },
    filmGrain: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(128, 128, 128, 0.15)',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        paddingHorizontal: spacing.xl + 8,
        paddingTop: Platform.OS === 'ios' ? SCREEN_HEIGHT * 0.12 : SCREEN_HEIGHT * 0.08,
        paddingBottom: spacing.mega + 24,
    },
    logoSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    appName: {
        fontSize: 44,
        fontWeight: '600',
        color: '#FFFAF5',
        textAlign: 'center',
        letterSpacing: 1.5,
        textShadowColor: 'rgba(0, 0, 0, 0.4)',
        textShadowOffset: { width: 0, height: 3 },
        textShadowRadius: 10,
        marginBottom: spacing.xl,
    },
    tagline: {
        fontSize: 16,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.75)',
        textAlign: 'center',
        lineHeight: 26,
        letterSpacing: 0.3,
        textShadowColor: 'rgba(0, 0, 0, 0.3)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 6,
    },
    ctaSection: {
        gap: spacing.lg,
    },
    primaryButtonWrapper: {
        position: 'relative',
    },
    buttonGlow: {
        position: 'absolute',
        top: -8,
        left: -8,
        right: -8,
        bottom: -8,
        borderRadius: 40,
        backgroundColor: 'rgba(255, 146, 104, 0.35)',
        ...Platform.select({
            ios: {
                shadowColor: '#FF9268',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.5,
                shadowRadius: 20,
            },
        }),
    },
    primaryButtonPressable: {
        borderRadius: 32,
        overflow: 'hidden',
    },
    primaryButton: {
        paddingVertical: 18,
        paddingHorizontal: 32,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#FF7B4A',
                shadowOffset: { width: 0, height: 6 },
                shadowOpacity: 0.35,
                shadowRadius: 12,
            },
            android: {
                elevation: 6,
            },
        }),
    },
    innerShadow: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 32,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderTopColor: 'rgba(255, 255, 255, 0.35)',
        borderBottomColor: 'rgba(0, 0, 0, 0.15)',
    },
    primaryButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: '#FFFFFF',
        letterSpacing: 0.4,
    },
    secondaryButtonPressable: {
        borderRadius: 32,
        overflow: 'hidden',
    },
    secondaryButton: {
        paddingVertical: 16,
        paddingHorizontal: 32,
        borderRadius: 32,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderColor: 'rgba(255, 255, 255, 0.35)',
        overflow: 'hidden',
    },
    secondaryButtonAndroid: {
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    secondaryButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.9)',
        letterSpacing: 0.3,
    },
    footer: {
        fontSize: 13,
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.4)',
        textAlign: 'center',
        marginTop: spacing.md,
        letterSpacing: 0.2,
    },
});

