import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function LoginScreen() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // TODO: Implement login logic
        router.replace('/(tabs)/home');
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable onPress={() => router.back()} style={styles.backButton}>
                        <Ionicons name="arrow-back" size={24} color={colors.minimalist.textDark} />
                    </Pressable>
                    <Text style={styles.title}>Welcome Back</Text>
                    <Text style={styles.subtitle}>Log in to continue helping animals</Text>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="your@email.com"
                            placeholderTextColor={colors.minimalist.textLight}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Password</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your password"
                            placeholderTextColor={colors.minimalist.textLight}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    <Pressable style={styles.forgotButton}>
                        <Text style={styles.forgotText}>Forgot password?</Text>
                    </Pressable>
                </View>

                {/* Login Button */}
                <Pressable onPress={handleLogin} style={styles.submitButton}>
                    {({ pressed }) => (
                        <LinearGradient
                            colors={[colors.minimalist.coral, colors.minimalist.mutedOrange]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={[styles.submitButtonInner, pressed && styles.pressed]}
                        >
                            <Text style={styles.submitButtonText}>Log In</Text>
                        </LinearGradient>
                    )}
                </Pressable>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <Pressable onPress={() => router.push('/(auth)/signup')}>
                        <Text style={styles.footerLink}>Sign Up</Text>
                    </Pressable>
                </View>
            </ScrollView>
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
    },
    scrollContent: {
        padding: spacing.xl,
        justifyContent: 'space-between',
        minHeight: '100%',
    },
    header: {
        marginBottom: spacing.xxl,
    },
    backButton: {
        marginBottom: spacing.lg,
    },
    title: {
        fontFamily: 'PlayfairDisplay_700Bold',
        fontSize: 32,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: colors.minimalist.textMedium,
    },
    form: {
        marginBottom: spacing.xl,
    },
    inputGroup: {
        marginBottom: spacing.md,
    },
    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginBottom: spacing.xs,
    },
    input: {
        backgroundColor: colors.minimalist.white,
        borderWidth: 1,
        borderColor: colors.minimalist.border,
        borderRadius: 12,
        paddingVertical: 14,
        paddingHorizontal: 16,
        fontSize: 16,
        color: colors.minimalist.textDark,
    },
    forgotButton: {
        alignSelf: 'flex-end',
        marginTop: spacing.xs,
    },
    forgotText: {
        fontSize: 14,
        color: colors.minimalist.coral,
        fontWeight: '600',
    },
    submitButton: {
        marginTop: spacing.md,
    },
    submitButtonInner: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    submitButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.minimalist.white,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 'auto',
        paddingTop: spacing.xl,
        paddingBottom: spacing.xxl,
    },
    footerText: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
    },
    footerLink: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.coral,
    },
});
