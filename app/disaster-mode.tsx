import React from 'react';
import { useRouter } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { DisasterModeScreen } from '../screens/DisasterModeScreen';

export default function DisasterModePage() {
    const router = useRouter();

    const navigation = {
        goBack: () => router.back(),
        navigate: (screen: string, params?: any) => {
            // Handle navigation to different screens
            if (screen === 'DisasterAnimalDetail') {
                router.push({ pathname: '/disaster-animal-detail', params });
            } else if (screen === 'contact-reporter') {
                router.push({ pathname: '/contact-reporter', params });
            } else {
                router.push({ pathname: `/${screen.toLowerCase()}`, params });
            }
        },
    };

    return <DisasterModeScreen navigation={navigation} />;
}
