import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FloatingCard } from '../../components/FloatingCard';
import { Popup } from '../../components/Popup';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

type UserRole = 'citizen' | 'ngo' | null;

export default function SignupScreen() {
    const router = useRouter();
    const { register } = useAuth();
    const [selectedRole, setSelectedRole] = useState<UserRole>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [orgName, setOrgName] = useState('');
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSignup = async () => {
        if (!name || !email || !password || !selectedRole || !phone) {
            setErrorMessage('Please complete all required fields\n(Name, Email, Password, Role, Phone Number)');
            setShowError(true);
            return;
        }

        if (selectedRole === 'ngo' && !orgName) {
            setErrorMessage('Please enter your organization name');
            setShowError(true);
            return;
        }

        try {
            await register(email, password, name, selectedRole, phone, orgName || undefined);
            router.replace('/(tabs)/home');
        } catch (error) {
            setErrorMessage('Sign up failed. Please try again.');
            setShowError(true);
        }
    };

    const dismissError = () => {
        setShowError(false);
        setErrorMessage('');
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
                    <Text style={styles.title}>Create Account</Text>
                    <Text style={styles.subtitle}>Join the PawGuard community</Text>
                </View>

                {/* Role Selection */}
                <View style={styles.section}>
                    <Text style={styles.sectionLabel}>I am a</Text>
                    <View style={styles.roleRow}>
                        <Pressable
                            style={styles.roleCardContainer}
                            onPress={() => setSelectedRole('citizen')}
                        >
                            {({ pressed }) => (
                                <FloatingCard
                                    shadow="medium"
                                    style={[
                                        styles.roleCard,
                                        selectedRole === 'citizen' && styles.roleCardSelected,
                                        pressed && styles.pressed,
                                    ]}
                                >
                                    <Ionicons
                                        name="person"
                                        size={32}
                                        color={selectedRole === 'citizen' ? colors.minimalist.coral : colors.minimalist.textMedium}
                                    />
                                    <Text style={[
                                        styles.roleLabel,
                                        selectedRole === 'citizen' && styles.roleLabelSelected,
                                    ]}>
                                        Citizen
                                    </Text>
                                </FloatingCard>
                            )}
                        </Pressable>

                        <Pressable
                            style={styles.roleCardContainer}
                            onPress={() => setSelectedRole('ngo')}
                        >
                            {({ pressed }) => (
                                <FloatingCard
                                    shadow="medium"
                                    style={[
                                        styles.roleCard,
                                        selectedRole === 'ngo' && styles.roleCardSelected,
                                        pressed && styles.pressed,
                                    ]}
                                >
                                    <Ionicons
                                        name="business"
                                        size={32}
                                        color={selectedRole === 'ngo' ? colors.minimalist.coral : colors.minimalist.textMedium}
                                    />
                                    <Text style={[
                                        styles.roleLabel,
                                        selectedRole === 'ngo' && styles.roleLabelSelected,
                                    ]}>
                                        NGO / Shelter
                                    </Text>
                                </FloatingCard>
                            )}
                        </Pressable>
                    </View>
                </View>

                {/* Form Fields */}
                {selectedRole && (
                    <View style={styles.section}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Full Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your name"
                                placeholderTextColor={colors.minimalist.textLight}
                                value={name}
                                onChangeText={setName}
                                autoCapitalize="words"
                            />
                        </View>

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
                                placeholder="Create a password"
                                placeholderTextColor={colors.minimalist.textLight}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Phone Number *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="+65 1234 5678"
                                placeholderTextColor={colors.minimalist.textLight}
                                value={phone}
                                onChangeText={setPhone}
                                keyboardType="phone-pad"
                            />
                        </View>

                        {selectedRole === 'ngo' && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Organization Name *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Your Organization"
                                    placeholderTextColor={colors.minimalist.textLight}
                                    value={orgName}
                                    onChangeText={setOrgName}
                                />
                            </View>
                        )}
                    </View>
                )}

                {/* Popups */}
                <Popup
                    visible={showError}
                    title="Sign Up Error"
                    message={errorMessage}
                    icon="alert-circle"
                    iconColor={colors.minimalist.errorRed}
                    onClose={dismissError}
                />

                {/* Sign Up Button */}
                {selectedRole && (
                    <Pressable onPress={handleSignup} style={styles.submitButton}>
                        {({ pressed }) => (
                            <LinearGradient
                                colors={[colors.minimalist.coral, colors.minimalist.mutedOrange]}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={[styles.submitButtonInner, pressed && styles.pressed]}
                            >
                                <Text style={styles.submitButtonText}>Sign Up</Text>
                            </LinearGradient>
                        )}
                    </Pressable>
                )}

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <Pressable onPress={() => router.push('/(auth)/login')}>
                        <Text style={styles.footerLink}>Log In</Text>
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
    },
    header: {
        marginBottom: spacing.xl,
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
    section: {
        marginBottom: spacing.xl,
    },
    sectionLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
        marginBottom: spacing.md,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    roleRow: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    roleCardContainer: {
        flex: 1,
    },
    roleCard: {
        padding: spacing.lg,
        alignItems: 'center',
        minHeight: 120,
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: 'transparent',
    },
    roleCardSelected: {
        borderColor: colors.minimalist.coral,
        backgroundColor: `${colors.minimalist.coral}10`,
    },
    pressed: {
        opacity: 0.8,
        transform: [{ scale: 0.98 }],
    },
    roleLabel: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
        marginTop: spacing.sm,
        textAlign: 'center',
    },
    roleLabelSelected: {
        color: colors.minimalist.coral,
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
    submitButton: {
        marginTop: spacing.md,
    },
    submitButtonInner: {
        paddingVertical: 16,
        borderRadius: 12,
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 17,
        fontWeight: '600',
        color: colors.minimalist.white,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: spacing.xl,
        marginBottom: spacing.xxl,
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
