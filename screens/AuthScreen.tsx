import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoadingOverlay, FloatingCard } from '../components';
import { colors } from '../theme/colors';
import { serifTextStyles } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { minimalistShadows } from '../theme/shadows';
import { UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { loginSchema, signupSchema, LoginFormData, SignupFormData } from '../utils/validation';

interface MinimalistInputProps {
    label: string;
    placeholder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    onBlur?: () => void;
    secureTextEntry?: boolean;
    keyboardType?: 'default' | 'email-address';
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    error?: string;
}

const MinimalistInput: React.FC<MinimalistInputProps> = ({
    label,
    placeholder,
    value,
    onChangeText,
    onBlur,
    secureTextEntry,
    keyboardType = 'default',
    autoCapitalize = 'sentences',
    error,
}) => {
    return (
        <View style={inputStyles.container}>
            <Text style={inputStyles.label}>{label}</Text>
            <TextInput
                style={[inputStyles.input, error && inputStyles.inputError]}
                placeholder={placeholder}
                placeholderTextColor={colors.minimalist.textLight}
                value={value}
                onChangeText={onChangeText}
                onBlur={onBlur}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
            />
            {error && <Text style={inputStyles.errorText}>{error}</Text>}
        </View>
    );
};

const inputStyles = StyleSheet.create({
    container: {
        marginBottom: spacing.lg,
    },
    label: {
        fontSize: 12,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
        marginBottom: spacing.xs,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
    },
    input: {
        backgroundColor: colors.minimalist.white,
        borderRadius: 12,
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        fontSize: 16,
        color: colors.minimalist.textDark,
        borderWidth: 1,
        borderColor: colors.gray200,
    },
    inputError: {
        borderColor: colors.minimalist.red,
    },
    errorText: {
        fontSize: 12,
        color: colors.minimalist.redDark,
        marginTop: spacing.xs,
    },
});

export const AuthScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
    const [isSignUp, setIsSignUp] = useState(true);
    const { login, register, isLoading } = useAuth();

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<SignupFormData>({
        resolver: yupResolver(isSignUp ? signupSchema : loginSchema),
        context: { isNGO: selectedRole === 'ngo' },
        mode: 'onBlur',
    });

    const onSubmit = async (data: LoginFormData | SignupFormData) => {
        try {
            if (isSignUp) {
                await register(
                    data.email,
                    data.password,
                    selectedRole,
                    'organizationName' in data ? data.organizationName : undefined
                );
            } else {
                await login(data.email, data.password, selectedRole);
            }
            navigation.navigate('Main');
        } catch (error) {
            console.error('Auth error:', error);
        }
    };

    const toggleMode = () => {
        setIsSignUp(!isSignUp);
        reset();
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right', 'bottom']}>
            <StatusBar style="dark" />
            <LoadingOverlay visible={isLoading} message={isSignUp ? 'Creating account...' : 'Logging in...'} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Back Button */}
                <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color={colors.minimalist.textDark} />
                </Pressable>

                {/* Header */}
                <View style={styles.header}>
                    <FloatingCard style={styles.logoCard} shadow="medium">
                        <Ionicons name="paw" size={40} color={colors.minimalist.coral} />
                    </FloatingCard>
                    <Text style={styles.title}>Welcome to PawGuard AI</Text>
                    <Text style={styles.subtitle}>
                        {isSignUp ? 'Create your account' : 'Sign in to continue'}
                    </Text>
                </View>

                {/* Role Selector */}
                <View style={styles.roleContainer}>
                    <Pressable
                        style={[styles.roleCard, selectedRole === 'citizen' && styles.roleCardActive]}
                        onPress={() => setSelectedRole('citizen')}
                    >
                        <Ionicons
                            name="person"
                            size={24}
                            color={selectedRole === 'citizen' ? colors.minimalist.white : colors.minimalist.textMedium}
                        />
                        <Text style={[styles.roleText, selectedRole === 'citizen' && styles.roleTextActive]}>
                            Citizen
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[styles.roleCard, selectedRole === 'ngo' && styles.roleCardActive]}
                        onPress={() => setSelectedRole('ngo')}
                    >
                        <Ionicons
                            name="business"
                            size={24}
                            color={selectedRole === 'ngo' ? colors.minimalist.white : colors.minimalist.textMedium}
                        />
                        <Text style={[styles.roleText, selectedRole === 'ngo' && styles.roleTextActive]}>
                            NGO
                        </Text>
                    </Pressable>
                </View>

                {/* Tab Toggle */}
                <View style={styles.tabContainer}>
                    <Pressable
                        style={[styles.tab, !isSignUp && styles.tabActive]}
                        onPress={() => setIsSignUp(false)}
                    >
                        <Text style={[styles.tabText, !isSignUp && styles.tabTextActive]}>
                            Log In
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.tab, isSignUp && styles.tabActive]}
                        onPress={() => setIsSignUp(true)}
                    >
                        <Text style={[styles.tabText, isSignUp && styles.tabTextActive]}>
                            Sign Up
                        </Text>
                    </Pressable>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <MinimalistInput
                                label="Email Address"
                                placeholder="your@email.com"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                error={errors.email?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <MinimalistInput
                                label="Password"
                                placeholder="••••••••"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                secureTextEntry
                                error={errors.password?.message}
                            />
                        )}
                    />

                    {isSignUp && selectedRole === 'ngo' && (
                        <>
                            <Controller
                                control={control}
                                name="organizationName"
                                render={({ field: { onChange, onBlur, value } }) => (
                                    <MinimalistInput
                                        label="Organization Name"
                                        placeholder="Global Rescue Corp"
                                        value={value}
                                        onChangeText={onChange}
                                        onBlur={onBlur}
                                        error={errors.organizationName?.message}
                                    />
                                )}
                            />

                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <Controller
                                        control={control}
                                        name="regNumber"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <MinimalistInput
                                                label="Registration Number"
                                                placeholder="REG-29384"
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                error={errors.regNumber?.message}
                                            />
                                        )}
                                    />
                                </View>
                                <View style={styles.halfWidth}>
                                    <Controller
                                        control={control}
                                        name="country"
                                        render={({ field: { onChange, onBlur, value } }) => (
                                            <MinimalistInput
                                                label="Country"
                                                placeholder="USA"
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                error={errors.country?.message}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </>
                    )}

                    {/* Submit Button */}
                    <Pressable style={styles.submitButton} onPress={handleSubmit(onSubmit)} disabled={isLoading}>
                        <LinearGradient
                            colors={[colors.minimalist.coral, colors.minimalist.orange]}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            style={styles.buttonGradient}
                        >
                            <Text style={styles.submitButtonText}>
                                {isSignUp ? 'Create Account' : 'Sign In'}
                            </Text>
                            <Ionicons name="arrow-forward" size={20} color={colors.minimalist.white} />
                        </LinearGradient>
                    </Pressable>

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                        <View style={styles.divider} />
                    </View>

                    {/* Google Button */}
                    <Pressable style={styles.googleButton}>
                        <Ionicons name="logo-google" size={20} color={colors.minimalist.textDark} />
                        <Text style={styles.googleButtonText}>Google</Text>
                    </Pressable>

                    {/* Footer */}
                    <Text style={styles.copyright}>© 2026 PAWGUARD AI</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.minimalist.bgLight,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: spacing.xl,
        paddingTop: spacing.md,
        paddingBottom: spacing.xxxl,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.minimalist.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
        ...minimalistShadows.cardSoft,
    },
    header: {
        alignItems: 'center',
        marginBottom: spacing.xxl,
    },
    logoCard: {
        width: 80,
        height: 80,
        backgroundColor: colors.minimalist.peachLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.lg,
    },
    title: {
        ...serifTextStyles.serifSubheading,
        color: colors.minimalist.textDark,
        textAlign: 'center',
        marginBottom: spacing.xs,
    },
    subtitle: {
        fontSize: 16,
        color: colors.minimalist.textMedium,
        textAlign: 'center',
    },
    roleContainer: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    roleCard: {
        flex: 1,
        backgroundColor: colors.minimalist.white,
        borderRadius: 16,
        paddingVertical: spacing.lg,
        alignItems: 'center',
        borderWidth: 2,
        borderColor: colors.gray200,
        ...minimalistShadows.cardSoft,
    },
    roleCardActive: {
        backgroundColor: colors.minimalist.coral,
        borderColor: colors.minimalist.coral,
    },
    roleText: {
        fontSize: 14,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
        marginTop: spacing.xs,
    },
    roleTextActive: {
        color: colors.minimalist.white,
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: colors.minimalist.white,
        borderRadius: 12,
        padding: 4,
        marginBottom: spacing.xl,
        ...minimalistShadows.cardSoft,
    },
    tab: {
        flex: 1,
        paddingVertical: spacing.md,
        borderRadius: 10,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: colors.minimalist.peachLight,
    },
    tabText: {
        fontSize: 15,
        fontWeight: '600',
        color: colors.minimalist.textMedium,
    },
    tabTextActive: {
        color: colors.minimalist.textDark,
    },
    form: {
        marginTop: spacing.md,
    },
    row: {
        flexDirection: 'row',
        gap: spacing.md,
    },
    halfWidth: {
        flex: 1,
    },
    submitButton: {
        borderRadius: 16,
        overflow: 'hidden',
        marginTop: spacing.lg,
        marginBottom: spacing.xl,
    },
    buttonGradient: {
        flexDirection: 'row',
        paddingVertical: spacing.lg,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
    },
    submitButtonText: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.minimalist.white,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: spacing.xl,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: colors.gray200,
    },
    dividerText: {
        fontSize: 11,
        color: colors.minimalist.textLight,
        marginHorizontal: spacing.md,
        letterSpacing: 1,
        fontWeight: '600',
    },
    googleButton: {
        flexDirection: 'row',
        backgroundColor: colors.minimalist.white,
        borderRadius: 12,
        paddingVertical: spacing.md,
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.sm,
        borderWidth: 1,
        borderColor: colors.gray200,
    },
    googleButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    copyright: {
        fontSize: 10,
        color: colors.minimalist.textLight,
        textAlign: 'center',
        marginTop: spacing.xxl,
        letterSpacing: 1,
    },
});
