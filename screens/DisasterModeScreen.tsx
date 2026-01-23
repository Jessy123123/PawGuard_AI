import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Circle } from 'react-native-maps';
import { colors } from '../theme/colors';
import { serifTextStyles } from '../theme/typography';
import { spacing } from '../theme/spacing';
import { FloatingCard } from '../components/FloatingCard';
import { MinimalistStatusBadge } from '../components/MinimalistStatusBadge';

interface DisasterModeScreenProps {
    navigation: any;
}

const atRiskAnimals = [
    { id: '1', name: 'Coco (Bird)', priority: 'High', lat: 40.7829, lng: -73.9654 },
    { id: '2', name: 'Buddy (Dog)', priority: 'High', lat: 40.7750, lng: -73.9680 },
    { id: '3', name: 'Luna (Cat)', priority: 'Medium', lat: 40.7790, lng: -73.9630 },
];

export const DisasterModeScreen: React.FC<DisasterModeScreenProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
            <StatusBar style="dark" />

            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Pressable style={styles.backButton} onPress={() => navigation.goBack()}>
                        <Ionicons name="arrow-back" size={24} color={colors.minimalist.textDark} />
                    </Pressable>
                    <View style={styles.headerTextContainer}>
                        <Text style={styles.headerTitle}>Disaster Alert Active</Text>
                        <View style={styles.warningBadge}>
                            <Ionicons name="warning" size={16} color={colors.minimalist.redDark} />
                        </View>
                    </View>
                </View>

                {/* Map Container */}
                <View style={styles.mapContainer}>
                    <MapView
                        style={styles.map}
                        initialRegion={{
                            latitude: 40.7780,
                            longitude: -73.9650,
                            latitudeDelta: 0.02,
                            longitudeDelta: 0.02,
                        }}
                    >
                        {/* Disaster Risk Zones */}
                        <Circle
                            center={{ latitude: 40.7750, longitude: -73.9680 }}
                            radius={500}
                            fillColor="rgba(252, 165, 165, 0.2)"
                            strokeColor={colors.minimalist.redDark}
                            strokeWidth={2}
                        />
                        <Circle
                            center={{ latitude: 40.7810, longitude: -73.9640 }}
                            radius={400}
                            fillColor="rgba(233, 155, 109, 0.2)"
                            strokeColor={colors.minimalist.orange}
                            strokeWidth={2}
                        />

                        {/* Animal Markers */}
                        {atRiskAnimals.map((animal) => (
                            <Marker
                                key={animal.id}
                                coordinate={{ latitude: animal.lat, longitude: animal.lng }}
                                pinColor={animal.priority === 'High' ? colors.minimalist.redDark : colors.minimalist.orange}
                            />
                        ))}
                    </MapView>
                </View>

                {/* Bottom Drawer */}
                <View style={styles.drawer}>
                    <View style={styles.drawerHandle} />
                    <Text style={styles.drawerTitle}>At-Risk Animals (3)</Text>

                    <ScrollView style={styles.animalList} showsVerticalScrollIndicator={false}>
                        {atRiskAnimals.map((animal, index) => (
                            <Pressable key={animal.id} onPress={() => navigation.navigate('AnimalProfile')}>
                                <FloatingCard style={styles.animalCard} shadow="soft">
                                    <View style={styles.animalCardContent}>
                                        <View style={styles.animalInfo}>
                                            <Text style={styles.animalName}>{animal.name}</Text>
                                            <Text style={styles.animalId}>#{index + 1}</Text>
                                        </View>
                                        <View style={styles.priorityContainer}>
                                            <View style={[
                                                styles.priorityDot,
                                                { backgroundColor: animal.priority === 'High' ? colors.minimalist.redDark : colors.minimalist.orange }
                                            ]} />
                                            <Text style={styles.priorityText}>{animal.priority} Priority</Text>
                                        </View>
                                        <MinimalistStatusBadge label="At Risk" variant="atRisk" />
                                    </View>
                                </FloatingCard>
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </View>
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
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: spacing.lg,
        paddingVertical: spacing.md,
        backgroundColor: colors.minimalist.white,
    },
    backButton: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: colors.minimalist.bgLight,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    headerTextContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerTitle: {
        ...serifTextStyles.serifSubheading,
        color: colors.minimalist.textDark,
        marginRight: spacing.sm,
    },
    warningBadge: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: colors.minimalist.peachLight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapContainer: {
        flex: 1,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    drawer: {
        backgroundColor: colors.minimalist.white,
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: spacing.md,
        paddingHorizontal: spacing.lg,
        maxHeight: '40%',
    },
    drawerHandle: {
        width: 40,
        height: 4,
        backgroundColor: colors.gray300,
        borderRadius: 2,
        alignSelf: 'center',
        marginBottom: spacing.md,
    },
    drawerTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: colors.minimalist.textDark,
        marginBottom: spacing.md,
    },
    animalList: {
        flex: 1,
    },
    animalCard: {
        marginBottom: spacing.sm,
    },
    animalCardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    animalInfo: {
        flex: 1,
    },
    animalName: {
        fontSize: 16,
        fontWeight: '600',
        color: colors.minimalist.textDark,
    },
    animalId: {
        fontSize: 13,
        color: colors.minimalist.textLight,
        marginTop: 2,
    },
    priorityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: spacing.md,
    },
    priorityDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginRight: 6,
    },
    priorityText: {
        fontSize: 13,
        color: colors.minimalist.textMedium,
    },
});
