
import { Stack } from 'expo-router';
import { Providers } from './_providers';
import { colors } from '../theme/colors';

export default function RootLayout() {
    return (
        <Providers>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: colors.minimalist.bgLight },
                }}
            >
                <Stack.Screen name="index" />
                <Stack.Screen name="(auth)" options={{ headerShown: false }} />
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="complete-profile" options={{ headerShown: false }} />
                <Stack.Screen name="Main" />
                <Stack.Screen
                    name="ReportSighting"
                    options={{ presentation: 'card' }}
                />
                <Stack.Screen
                    name="AdoptionExit"
                    options={{ presentation: 'card' }}
                />
                <Stack.Screen
                    name="DogProfile"
                    options={{ presentation: 'card' }}
                />
                <Stack.Screen name="Community" />
                <Stack.Screen name="CommunityFeed" />
            </Stack>
        </Providers>
    );
}
