import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { DisasterAnimalDetailScreen } from '../screens/DisasterAnimalDetailScreen';

export default function DisasterAnimalDetailPage() {
    const router = useRouter();
    const params = useLocalSearchParams<{ animalId: string }>();

    const navigation = {
        goBack: () => router.back(),
        navigate: (screen: string, params?: any) => router.push({ pathname: `/${screen}`, params }),
    };

    return (
        <DisasterAnimalDetailScreen
            navigation={navigation}
            route={{ params: { animalId: params.animalId || '' } }}
        />
    );
}
