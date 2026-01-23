import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FloatingCard } from '../../components/FloatingCard';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';

export default function ProfileScreen() {
    const router = useRouter();
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace('/(auth)/landing');
    };

    const getInitials = (name: string) => {
        if (!name) return 'U';
        return name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <View style={styles.header}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>{getInitials(user?.name || '')}</Text>
                    </View>
                    <Text style={styles.name}>{user?.name || 'User Name'}</Text>
                    <Text style={styles.role}>{user?.role === 'ngo' ? 'NGO / Shelter' : 'Citizen'}</Text>
                </View>

                {/* Stats */}
                <View style={styles.statsRow}>
                    <Pressable style={styles.statCardContainer} onPress={() => router.push('/report-history')}>
                        <FloatingCard shadow="soft" style={styles.statCard}>
                            <Text style={styles.statNumber}>12</Text>
                            <Text style={styles.statLabel}>Reports</Text>
                        </FloatingCard>
                    </Pressable>
                    <Pressable style={styles.statCardContainer} onPress={() => router.push('/report-history')}>
                        <FloatingCard shadow="soft" style={styles.statCard}>
                            <Text style={styles.statNumber}>5</Text>
                            <Text style={styles.statLabel}>Helped</Text>
                        </FloatingCard>
                    </Pressable>
                    <Pressable style={styles.statCardContainer} onPress={() => router.push('/report-history')}>
                        <FloatingCard shadow="soft" style={styles.statCard}>
                            <Text style={styles.statNumber}>48</Text>
                            <Text style={styles.statLabel}>Points</Text>
                        </FloatingCard>
                    </Pressable>
                </View>

                {/* Menu Items */}
                <View style={styles.section}>
                    <Pressable>
                        {({ pressed }) => (
                            <FloatingCard shadow="soft" style={[styles.menuItem, pressed && styles.menuItemPressed]}>
                                <Ionicons name="person-outline" size={24} color={colors.minimalist.textDark} />
                                <Text style={styles.menuText}>Edit Profile</Text>
                                <Ionicons name="chevron-forward" size={20} color={colors.minimalist.textLight} />
                            </FloatingCard>
                        )}
                    </Pressable>

                    <Pressable>
                        {({ pressed }) => (
                            <FloatingCard shadow="soft" style={[styles.menuItem, pressed && styles.menuItemPressed]}>
                                <Ionicons name="notifications-outline" size={24} color={colors.minimalist.textDark} />
                                <Text style={styles.menuText}>Notifications</Text>
                                <Ionicons name="chevron-forward" size={20} color={colors.minimalist.textLight} />
                            </FloatingCard>
                        )}
                    </Pressable>

                    <Pressable>
                        {({ pressed }) => (
                            <FloatingCard shadow="soft" style={[styles.menuItem, pressed && styles.menuItemPressed]}>
                                <Ionicons name="settings-outline" size={24} color={colors.minimalist.textDark} />
                                <Text style={styles.menuText}>Settings</Text>
                                <Ionicons name="chevron-forward" size={20} color={colors.minimalist.textLight} />
                            </FloatingCard>
                        )}
                    </Pressable>

                    <Pressable>
                        {({ pressed }) => (
                            <FloatingCard shadow="soft" style={[styles.menuItem, pressed && styles.menuItemPressed]}>
                                <Ionicons name="help-circle-outline" size={24} color={colors.minimalist.textDark} />
                                <Text style={styles.menuText}>Help & Support</Text>
                                <Ionicons name="chevron-forward" size={20} color={colors.minimalist.textLight} />
                            </FloatingCard>
                        )}
                    </Pressable>
                </View>

                {/* Logout Button */}
                <Pressable onPress={handleLogout} style={styles.logoutButton}>
                    {({ pressed }) => (
                        <View style={[styles.logoutButtonInner, pressed && styles.buttonPressed]}>
                            <Ionicons name="log-out-outline" size={20} color={colors.minimalist.errorRed} />
                            <Text style={styles.logoutText}>Log Out</Text>
                        </View>
                    )}
                </Pressable>

                {/* Bottom Spacing */}
                <View style={styles.bottomSpacing} />
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
        alignItems: 'center',
        marginBottom: spacing.xl,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.minimalist.coral,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: spacing.md,
    },
    avatarText: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.minimalist.white,
    },
    name: {
        fontFamily: 'PlayfairDisplay_700Bold',
        fontSize: 24,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        marginBottom: spacing.xs,
    },
    role: {
        fontSize: 14,
        color: colors.minimalist.textMedium,
    },
    statsRow: {
        flexDirection: 'row',
        gap: spacing.md,
        marginBottom: spacing.xl,
    },
    statCardContainer: {
        flex: 1,
    },
    statCard: {
        flex: 1,
        padding: spacing.md,
        alignItems: 'center',
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: colors.minimalist.textDark,
        marginBottom: 4,
    },
    statLabel: {
        fontSize: 12,
        color: colors.minimalist.textMedium,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    section: {
        gap: spacing.sm,
        marginBottom: spacing.xl,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: spacing.md,
        gap: spacing.md,
    },
    menuItemPressed: {
        opacity: 0.7,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
        fontWeight: '500',
        color: colors.minimalist.textDark,
    },
    logoutButton: {
        marginTop: spacing.md,
    },
    logoutButtonInner: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: spacing.xs,
        paddingVertical: 14,
        borderRadius: 12,
        backgroundColor: colors.minimalist.white,
        borderWidth: 1,
        borderColor: colors.minimalist.errorRed,
    },
    buttonPressed: {
        opacity: 0.7,
    },
    logoutText: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.minimalist.errorRed,
    },
    bottomSpacing: {
        height: spacing.xxl,
    },
});
