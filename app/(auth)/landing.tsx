import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { FloatingCard } from '../../components/FloatingCard';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function LandingScreen() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
            <StatusBar style="dark" />

            <View style={styles.container}>
                {/* Logo/App Name Section */}
                <View style={styles.headerSection}>
                    <Text style={styles.appName}>PawGuard AI</Text>
                    <Text style={styles.tagline}>
                        Protecting animals through technology and community
                    </Text>
                </View>

                {/* Hero Card with Image */}
                <FloatingCard shadow="medium" style={styles.heroCard}>
                    <View style={styles.heroImageContainer}>
                        <View style={styles.heroImagePlaceholder}>
                            <Text style={styles.heroImageText}>🐾</Text>
                        </View>
                    </View>

                    <Text style={styles.missionTitle}>Our Mission</Text>
                    <Text style={styles.missionText}>
                        AI-powered animal rescue and adoption platform connecting citizens, NGOs, and shelters to protect vulnerable animals.
                    </Text>
                </FloatingCard>

                {/* CTA Buttons */}
                <View style={styles.ctaSection}>
                    <Pressable onPress={() => router.push('/(auth)/signup')}>
                        {({ pressed }) => (
                            <LinearGradient
                                colors={[colors.minimalist.coral, colors.minimalist.mutedOrange]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.primaryButton, pressed && styles.buttonPressed]}
                            >
                                <Text style={styles.primaryButtonText}>Get Started</Text>
                            </LinearGradient>
                        )}
                    </Pressable>

                    <Pressable onPress={() => router.push('/(auth)/login')}>
                        {({ pressed }) => (
                            <View style={[styles.secondaryButton, pressed && styles.buttonPressed]}>
                                <Text style={styles.secondaryButtonText}>Log In</Text>
                            </View>
                        )}
                    </Pressable>
                </View>

                {/* Footer Text */}
                <Text style={styles.footer}>
                    Join thousands helping animals in your community
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.minimalist.bgLight,
    },
    container: {
        flex: 1,
        padding: spacing.xl,
        justifyContent: 'space-between',
    },
    headerSection: {
        alignItems: 'center',
        marginTop: spacing.xxl,
    },
    appName: {
        fontFamily: 'PlayfairDisplay_700Bold',
        fontSize: 36,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    tagline: {
        fontSize: 16,
        color: colors.minimalist.textMedium,
        textAlign: 'center',
        lineHeight: 24,
        maxWidth: 280,
    },
    heroCard: {
        padding: spacing.xl,
        alignItems: 'center',
    },
    heroImageContainer: {
        width: '100%',
        marginBottom: spacing.lg,
    },
    heroImagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: colors.minimalist.warmGray,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heroImageText: {
        fontSize: 64,
    },
    missionTitle: {
        fontFamily: 'PlayfairDisplay_600SemiBold',
        fontSize: 22,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginBottom: spacing.sm,
        textAlign: 'center',
    },
    missionText: {
        fontSize: 15,
        color: colors.minimalist.textMedium,
        textAlign: 'center',
        lineHeight: 22,
    },
    ctaSection: {
        gap: spacing.md,
    },
    primaryButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    secondaryButton: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
        backgroundColor: colors.minimalist.white,
        borderWidth: 2,
        borderColor: colors.minimalist.border,
    },
    buttonPressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    primaryButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.minimalist.white,
    },
    secondaryButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    footer: {
        fontSize: 13,
        color: colors.minimalist.textLight,
        textAlign: 'center',
        marginTop: spacing.lg,
    },
});
