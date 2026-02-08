import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRole } from '../types';

// Generate a proper UUID v4 (no external dependencies)
const generateUUID = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    phone?: string;
    organizationName?: string;
    profileComplete: boolean;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string, role?: UserRole) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string, role: UserRole, phone?: string, orgName?: string) => Promise<void>;
    updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        loadStoredUser();
    }, []);

    const loadStoredUser = async () => {
        try {
            const storedUser = await AsyncStorage.getItem('@user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error('Failed to load user:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, role: UserRole = 'citizen') => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Check if we have an existing user with this email (to preserve UUID)
            const existingUserData = await AsyncStorage.getItem(`@user_${email.toLowerCase()}`);
            let userId: string;

            if (existingUserData) {
                const existingUser = JSON.parse(existingUserData);
                userId = existingUser.id;
            } else {
                // Generate a proper UUID for new users
                userId = generateUUID();
            }

            const newUser: User = {
                id: userId,
                email,
                name: email.split('@')[0], // Default name from email
                role, // Use the selected role
                profileComplete: true, // Login assumes existing user with complete profile
            };

            await AsyncStorage.setItem('@user', JSON.stringify(newUser));
            await AsyncStorage.setItem(`@user_${email.toLowerCase()}`, JSON.stringify(newUser));
            await AsyncStorage.setItem('@token', 'mock-jwt-token');
            setUser(newUser);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, name: string, role: UserRole, phone?: string, orgName?: string) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const profileComplete = !!(name && role && (role === 'ngo' ? orgName : true) && phone);

            // Generate a proper UUID for new users
            const userId = generateUUID();

            const newUser: User = {
                id: userId,
                email,
                name,
                role,
                phone,
                organizationName: orgName,
                profileComplete,
            };

            await AsyncStorage.setItem('@user', JSON.stringify(newUser));
            await AsyncStorage.setItem(`@user_${email.toLowerCase()}`, JSON.stringify(newUser));
            await AsyncStorage.setItem('@token', 'mock-jwt-token');
            setUser(newUser);
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (updates: Partial<User>) => {
        if (!user) return;

        try {
            const updatedUser = { ...user, ...updates };

            // Check if profile is complete
            const profileComplete = !!(
                updatedUser.name &&
                updatedUser.role &&
                updatedUser.phone &&
                (updatedUser.role === 'ngo' ? updatedUser.organizationName : true)
            );

            updatedUser.profileComplete = profileComplete;

            await AsyncStorage.setItem('@user', JSON.stringify(updatedUser));
            setUser(updatedUser);
        } catch (error) {
            console.error('Failed to update profile:', error);
        }
    };

    const logout = async () => {
        try {
            await AsyncStorage.multiRemove(['@user', '@token']);
            setUser(null);
        } catch (error) {
            console.error('Failed to logout:', error);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
                register,
                updateProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }
    return context;
};
