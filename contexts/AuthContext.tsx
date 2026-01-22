import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserRole } from '../types';

interface User {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    organizationName?: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: (email: string, password: string, role: UserRole, orgName?: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, role: UserRole, orgName?: string) => Promise<void>;
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

    const login = async (email: string, password: string, role: UserRole, orgName?: string) => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newUser: User = {
                id: Math.random().toString(36).substr(2, 9),
                email,
                name: orgName || email.split('@')[0],
                role,
                organizationName: orgName,
            };

            await AsyncStorage.setItem('@user', JSON.stringify(newUser));
            await AsyncStorage.setItem('@token', 'mock-jwt-token');
            setUser(newUser);
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, role: UserRole, orgName?: string) => {
        // For now, registration is the same as login
        await login(email, password, role, orgName);
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
