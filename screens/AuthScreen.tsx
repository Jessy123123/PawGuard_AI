import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RoleSelector, CustomInput, CustomButton, LoadingOverlay } from '../components';
import { theme } from '../theme';
import { UserRole } from '../types';
import { useAuth } from '../contexts/AuthContext';
import { loginSchema, signupSchema, LoginFormData, SignupFormData } from '../utils/validation';

export const AuthScreen: React.FC = () => {
    const router = useRouter();
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
            router.replace('/Main');
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
            <StatusBar style="light" />
            <LoadingOverlay visible={isLoading} message={isSignUp ? 'Creating account...' : 'Logging in...'} />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Gradient Header */}
                <LinearGradient
                    colors={[theme.colors.peach, theme.colors.coral, theme.colors.softOrange]}
                    start={theme.gradientPositions.diagonal.start}
                    end={theme.gradientPositions.diagonal.end}
                    style={styles.logoContainer}
                >
                    <Ionicons name="paw" size={40} color={theme.colors.textPrimary} />
                </LinearGradient>
                <Text style={styles.title}>PawGuard AI</Text>
                <Text style={styles.subtitle}>Animal Rescue Intelligence</Text>

                {/* Role Selector */}
                <RoleSelector selectedRole={selectedRole} onSelectRole={setSelectedRole} />

                {/* Tab Toggle */}
                <View style={styles.tabContainer}>
                    <Pressable
                        style={[styles.tab, !isSignUp && styles.tabActive]}
                        onPress={() => setIsSignUp(false)}
                    >
                        <Text style={[styles.tabText, !isSignUp && styles.tabTextActive]}>
                            LOGIN
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.tab, isSignUp && styles.tabActive]}
                        onPress={() => setIsSignUp(true)}
                    >
                        <Text style={[styles.tabText, isSignUp && styles.tabTextActive]}>
                            SIGN UP
                        </Text>
                    </Pressable>
                </View>

                {/* Form */}
                <View style={styles.form}>
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <CustomInput
                                label="EMAIL ADDRESS"
                                placeholder="contact@organization.org"
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
                            <CustomInput
                                label="PASSWORD"
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
                                    <CustomInput
                                        label="ORGANIZATION NAME"
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
                                            <CustomInput
                                                label="REG NUMBER"
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
                                            <CustomInput
                                                label="COUNTRY"
                                                placeholder="USA"
                                                value={value}
                                                onChangeText={onChange}
                                                onBlur={onBlur}
                                                icon="chevron-down"
                                                error={errors.country?.message}
                                            />
                                        )}
                                    />
                                </View>
                            </View>
                        </>
                    )}

                    <CustomButton
                        title="Access Platform"
                        icon="arrow-forward"
                        onPress={handleSubmit(onSubmit)}
                        style={styles.submitButton}
                        disabled={isLoading}
                    />

                    {/* Divider */}
                    <View style={styles.dividerContainer}>
                        <View style={styles.divider} />
                        <Text style={styles.dividerText}>OR CONTINUE WITH</Text>
                        <View style={styles.divider} />
                    </View>

                    {/* Google Button */}
                    <CustomButton
                        title="Google"
                        variant="glass"
                        icon="logo-google"
                        iconPosition="left"
                        onPress={() => { }}
                    />

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
        backgroundColor: theme.colors.background,
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.xxxl,
    },
    logoContainer: {
        width: 80,
        height: 80,
        borderRadius: theme.radius.xxl,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: theme.spacing.xxl,
        marginBottom: theme.spacing.lg,
        ...theme.shadows.lg,
    },
    title: {
        ...theme.textStyles.h1,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: theme.spacing.xs,
    },
    subtitle: {
        ...theme.textStyles.body,
        color: theme.colors.textMuted,
        textAlign: 'center',
        marginBottom: theme.spacing.xxxl,
    },
    tabContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xxl,
        backgroundColor: theme.colors.glassLight,
        borderRadius: theme.borderRadius.button,
        padding: theme.spacing.xs,
    },
    tab: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.button - 4,
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: theme.colors.surface,
    },
    tabText: {
        ...theme.textStyles.button,
        color: theme.colors.textMuted,
        fontSize: 14,
        fontWeight: '600',
    },
    tabTextActive: {
        color: theme.colors.textAccent,
        fontWeight: '700',
    },
    form: {
        marginTop: theme.spacing.md,
    },
    row: {
        flexDirection: 'row',
        gap: theme.spacing.md,
    },
    halfWidth: {
        flex: 1,
    },
    submitButton: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.xxl,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.xxl,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.borderGlass,
    },
    dividerText: {
        ...theme.textStyles.caption,
        color: theme.colors.textMuted,
        marginHorizontal: theme.spacing.md,
        fontSize: 11,
        letterSpacing: 1,
    },
    copyright: {
        ...theme.textStyles.small,
        color: theme.colors.textMuted,
        textAlign: 'center',
        marginTop: theme.spacing.xxl,
        fontSize: 10,
        letterSpacing: 1,
    },
});
