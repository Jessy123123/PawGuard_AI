import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

// Import screens
import { AuthScreen } from '../screens/AuthScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DisasterResponseScreen } from '../screens/DisasterResponseScreen';
import { DogProfileScreen } from '../screens/DogProfileScreen';
import { MissionControlScreen } from '../screens/MissionControlScreen';

// Type definitions
export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    DisasterResponse: undefined;
    DogProfile: undefined;
};

export type MainTabParamList = {
    Dashboard: undefined;
    Map: undefined;
    Mission: undefined;
    Animals: undefined;
    Adoption: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Tab Navigator Component
const MainTabs: React.FC = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: theme.colors.surfaceDark,
                    borderTopWidth: 0,
                    height: 80,
                    paddingBottom: 10,
                    paddingTop: 10,
                },
                tabBarActiveTintColor: theme.colors.primary,
                tabBarInactiveTintColor: theme.colors.textSecondary,
                tabBarLabelStyle: {
                    fontSize: 10,
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    marginTop: 4,
                },
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="grid" size={size} color={color} />
                    ),
                    tabBarLabel: 'DASHBOARD',
                }}
            />
            <Tab.Screen
                name="Map"
                component={DisasterResponseScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                    tabBarLabel: 'MAP',
                }}
            />
            <Tab.Screen
                name="Mission"
                component={MissionControlScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="grid" size={size} color={color} />
                    ),
                    tabBarLabel: 'MISSION',
                }}
            />
            <Tab.Screen
                name="Animals"
                component={DogProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="paw" size={size} color={color} />
                    ),
                    tabBarLabel: 'ANIMALS',
                }}
            />
            <Tab.Screen
                name="Adoption"
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),
                    tabBarLabel: 'ADOPTION',
                }}
            />
        </Tab.Navigator>
    );
};

// Main Navigation Component
export const AppNavigation: React.FC = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: theme.colors.background },
                }}
            >
                <Stack.Screen name="Auth" component={AuthScreen} />
                <Stack.Screen name="Main" component={MainTabs} />
                <Stack.Screen
                    name="DisasterResponse"
                    component={DisasterResponseScreen}
                    options={{
                        presentation: 'modal',
                    }}
                />
                <Stack.Screen
                    name="DogProfile"
                    component={DogProfileScreen}
                    options={{
                        presentation: 'card',
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};
