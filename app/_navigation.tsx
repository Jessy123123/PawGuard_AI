import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../theme';

// Import screens
import { AuthScreen } from '../screens/AuthScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ReportSightingScreen } from '../screens/ReportSightingScreen';
import { AdoptionListScreen } from '../screens/AdoptionListScreen';
import { AdoptionExitScreen } from '../screens/AdoptionExitScreen';
import { DashboardScreen } from '../screens/DashboardScreen';
import { DogProfileScreen } from '../screens/DogProfileScreen';

// Type definitions
export type RootStackParamList = {
    Auth: undefined;
    Main: undefined;
    ReportSighting: undefined;
    AdoptionExit: { petId?: string };
    DogProfile: undefined;
};

export type MainTabParamList = {
    Scan: undefined;
    Report: undefined;
    Adoption: undefined;
    Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

// Tab Navigator Component - New layout matching mockups
export const MainTabs: React.FC = () => {
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
                tabBarActiveTintColor: theme.colors.greenPrimary,
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
                name="Scan"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="scan" size={size} color={color} />
                    ),
                    tabBarLabel: 'SCAN',
                }}
            />
            <Tab.Screen
                name="Report"
                component={DashboardScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" size={size} color={color} />
                    ),
                    tabBarLabel: 'REPORT',
                }}
            />
            <Tab.Screen
                name="Adoption"
                component={AdoptionListScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="heart" size={size} color={color} />
                    ),
                    tabBarLabel: 'ADOPTION',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={DogProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                    tabBarLabel: 'PROFILE',
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
                    name="ReportSighting"
                    component={ReportSightingScreen}
                    options={{
                        presentation: 'card',
                    }}
                />
                <Stack.Screen
                    name="AdoptionExit"
                    component={AdoptionExitScreen}
                    options={{
                        presentation: 'card',
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
