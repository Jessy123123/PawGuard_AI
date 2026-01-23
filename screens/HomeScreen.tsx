import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { FeatureCard } from '../components';
import { theme } from '../theme';

// Placeholder images
const PLACEHOLDER_IMAGES = {
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    scan: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=300&h=400&fit=crop',
    map: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?w=300&h=300&fit=crop',
    kitten: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=300&h=300&fit=crop',
};

interface HomeScreenProps {
    navigation: any;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    const user = {
        name: 'Sarah',
        age: 28,
        location: 'Austin, TX',
    };

    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="light" />

            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerContent}>
                    {/* User Info */}
                    <View style={styles.userRow}>
                        <View style={styles.avatarContainer}>
                            <Image
                                source={{ uri: PLACEHOLDER_IMAGES.avatar }}
                                style={styles.avatar}
                            />
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.greeting}>Hello, {user.name}!</Text>
                            <Text style={styles.userDetails}>
                                {user.age} years old • {user.location}
                            </Text>
                        </View>
                    </View>

                    {/* Notification Bell */}
                    <Pressable style={styles.notificationButton}>
                        <Ionicons name="notifications" size={24} color="#FFFFFF" />
                        <View style={styles.notificationBadge} />
                    </Pressable>
                </View>
            </View>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Live Camera Scan Card */}
                <FeatureCard
                    icon="camera"
                    iconColor={theme.colors.greenPrimary}
                    title="Live Camera Scan"
                    description="Identify animals instantly with AI vision."
                    buttonText="Scan Now"
                    imageUri={PLACEHOLDER_IMAGES.scan}
                    buttonColors={[theme.colors.greenLight, theme.colors.greenPrimary]}
                    onPress={() => navigation.navigate('Scan')}
                />

                {/* Report a Stray Card */}
                <FeatureCard
                    icon="document-text"
                    iconColor={theme.colors.primary}
                    title="Report a Stray"
                    description="Alert local rescue services manually."
                    buttonText="Report"
                    imageUri={PLACEHOLDER_IMAGES.map}
                    buttonColors={[theme.colors.surfaceDark, theme.colors.surfaceDark]}
                    onPress={() => navigation.navigate('ReportSighting')}
                />

                {/* Adoption List Card */}
                <FeatureCard
                    icon="heart"
                    iconColor={theme.colors.danger}
                    title="Adoption List"
                    description="Find a furry friend looking for a home."
                    buttonText="View List"
                    imageUri={PLACEHOLDER_IMAGES.kitten}
                    buttonColors={[theme.colors.greenLight, theme.colors.greenLight]}
                    onPress={() => navigation.navigate('Adoption')}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    header: {
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.lg,
        paddingHorizontal: theme.spacing.xl,
        backgroundColor: theme.colors.background,
    },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    avatarContainer: {
        width: 30,
        height: 30,
        borderRadius: 15,
        borderWidth: 2,
        borderColor: theme.colors.greenPrimary,
        overflow: 'hidden',
        marginRight: theme.spacing.md,
    },
    avatar: {
        width: '100%',
        height: '100%',
    },
    userInfo: {
        flex: 1,
    },
    greeting: {
        fontSize: 24,
        color: '#FFFFFF',
        fontWeight: 'bold',
        marginTop: 4,
    },
    userDetails: {
        color: '#89E4D2', // Mint green text
        fontSize: 13,
        fontWeight: '500',
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: theme.spacing.md,
    },
    notificationBadge: {
        position: 'absolute',
        top: 10,
        right: 12,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: theme.colors.danger,
        borderWidth: 1,
        borderColor: theme.colors.surfaceDark,
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.xs,
        paddingBottom: 100,
    },
});
