import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '../contexts/AuthContext';
import { DataProvider } from '../contexts/DataContext';

interface ProvidersProps {
    children: React.ReactNode;
}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
    return (
        <SafeAreaProvider>
            <AuthProvider>
                <DataProvider>
                    {children}
                </DataProvider>
            </AuthProvider>
        </SafeAreaProvider>
    );
};
