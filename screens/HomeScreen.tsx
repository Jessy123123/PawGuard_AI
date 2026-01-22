import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { FeatureCard } from '../components';
import { theme } from '../theme';

// Placeholder images - in production these would come from assets or API
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

            {/* Gradient Header */}
            <LinearGradient
                colors={[theme.colors.greenDark, theme.colors.greenPrimary]}
                style={styles.header}
            >
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
                        <Ionicons name="notifications-outline" size={24} color={theme.colors.textPrimary} />
                    </Pressable>
                </View>
            </LinearGradient>

            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Live Camera Scan Card */}
                <FeatureCard
                    icon="scan"
                    iconColor={theme.colors.greenPrimary}
                    title="Live Camera Scan"
                    description="Identify animals instantly with AI vision."
                    buttonText="Scan Now"
                    imageUri={PLACEHOLDER_IMAGES.scan}
                    onPress={() => navigation.navigate('Scan')}
                />

                {/* Report a Stray Card */}
                <FeatureCard
                    icon="flag"
                    iconColor={theme.colors.coral}
                    title="Report a Stray"
                    description="Alert local rescue services manually."
                    buttonText="Report"
                    imageUri={PLACEHOLDER_IMAGES.map}
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
                    onPress={() => navigation.navigate('Adoption')}
                />
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: theme.colors.greenDark,
    },
    header: {
        paddingTop: theme.spacing.md,
        paddingBottom: theme.spacing.xxl,
        paddingHorizontal: theme.spacing.xl,
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
        width: 52,
        height: 52,
        borderRadius: 26,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 0.3)',
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
        ...theme.textStyles.h3,
        color: theme.colors.textPrimary,
        fontWeight: 'bold',
    },
    userDetails: {
        ...theme.textStyles.body,
        color: 'rgba(255, 255, 255, 0.8)',
        fontSize: 13,
        marginTop: 2,
    },
    notificationButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: 'rgba(255, 255, 255, 0.15)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        backgroundColor: theme.colors.greenDark,
    },
    scrollContent: {
        paddingHorizontal: theme.spacing.xl,
        paddingTop: theme.spacing.md,
        paddingBottom: theme.layout.tabBarHeight + theme.spacing.xl,
    },
});
