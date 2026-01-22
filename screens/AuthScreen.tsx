import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { RoleSelector, CustomInput, CustomButton } from '../components';
import { theme } from '../theme';
import { UserRole } from '../types';

export const AuthScreen: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [selectedRole, setSelectedRole] = useState<UserRole>('citizen');
    const [isSignUp, setIsSignUp] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [orgName, setOrgName] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [country, setCountry] = useState('USA');

    const handleSubmit = () => {
        // Navigate to main app
        navigation.navigate('Main');
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar style="light" />
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.logoContainer}>
                        <Ionicons name="paw" size={40} color={theme.colors.textPrimary} />
                    </View>
                    <Text style={styles.title}>PawGuard AI</Text>
                </View>

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
                    <CustomInput
                        label="EMAIL ADDRESS"
                        placeholder="contact@organization.org"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    <CustomInput
                        label="PASSWORD"
                        placeholder="••••••••"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />

                    {isSignUp && selectedRole === 'ngo' && (
                        <>
                            <CustomInput
                                label="ORGANIZATION NAME"
                                placeholder="Global Rescue Corp"
                                value={orgName}
                                onChangeText={setOrgName}
                            />

                            <View style={styles.row}>
                                <View style={styles.halfWidth}>
                                    <CustomInput
                                        label="REG NUMBER"
                                        placeholder="REG-29384"
                                        value={regNumber}
                                        onChangeText={setRegNumber}
                                    />
                                </View>
                                <View style={styles.halfWidth}>
                                    <CustomInput
                                        label="COUNTRY"
                                        placeholder="USA"
                                        value={country}
                                        onChangeText={setCountry}
                                        icon="chevron-down"
                                    />
                                </View>
                            </View>
                        </>
                    )}

                    <CustomButton
                        title="Access Platform"
                        icon="arrow-forward"
                        onPress={handleSubmit}
                        style={styles.submitButton}
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
                        variant="ghost"
                        icon="logo-google"
                        iconPosition="left"
                        onPress={() => { }}
                        style={styles.googleButton}
                    />

                    {/* Footer Links */}
                    <View style={styles.footer}>
                        <Pressable>
                            <Text style={styles.footerLink}>Privacy Policy</Text>
                        </Pressable>
                        <Pressable>
                            <Text style={styles.footerLink}>Terms of Service</Text>
                        </Pressable>
                    </View>

                    <Text style={styles.copyright}>© 2024 PAWGUARD AI MISSION CONTROL</Text>
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
        paddingBottom: theme.spacing.xxxl,
    },
    header: {
        alignItems: 'center',
        marginTop: theme.spacing.xl,
        marginBottom: theme.spacing.xxxl,
    },
    logoContainer: {
        width: 64,
        height: 64,
        borderRadius: theme.radius.lg,
        backgroundColor: theme.colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: theme.spacing.md,
    },
    title: {
        ...theme.textStyles.h3,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
    },
    tabContainer: {
        flexDirection: 'row',
        gap: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    tab: {
        flex: 1,
        paddingVertical: theme.spacing.md,
        borderRadius: theme.borderRadius.button,
        borderWidth: 2,
        borderColor: theme.colors.primaryDark,
        backgroundColor: 'transparent',
        alignItems: 'center',
    },
    tabActive: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
    },
    tabText: {
        ...theme.textStyles.button,
        color: theme.colors.textPrimary,
    },
    tabTextActive: {
        color: theme.colors.textDark,
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
        marginTop: theme.spacing.md,
        marginBottom: theme.spacing.xl,
    },
    googleButton: {
        borderColor: theme.colors.gray600,
        borderWidth: 1,
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: theme.spacing.xl,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: theme.colors.gray600,
    },
    dividerText: {
        ...theme.textStyles.caption,
        color: theme.colors.textSecondary,
        marginHorizontal: theme.spacing.md,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: theme.spacing.xl,
        marginTop: theme.spacing.xxxl,
    },
    footerLink: {
        ...theme.textStyles.body,
        color: theme.colors.textSecondary,
    },
    copyright: {
        ...theme.textStyles.small,
        color: theme.colors.textTertiary,
        textAlign: 'center',
        marginTop: theme.spacing.md,
    },
});
