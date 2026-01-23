
import { Stack } from 'expo-router';
import { Providers } from './_providers';

export default function RootLayout() {
    return (
        <Providers>
            <Stack
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: '#FFFFFF' }, // Default background
                }}
            >
                <Stack.Screen name="index" />
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
            </Stack>
        </Providers>
    );
}
