import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import useWeather, { WeatherData, WeatherAlert } from '../hooks/useWeather';

interface DisasterModeContextType {
    // Weather-based state
    isDisasterModeActive: boolean;
    weatherAlert: WeatherAlert;
    weather: WeatherData | null;
    loading: boolean;
    error: string | null;

    // Manual override for NGOs
    manualOverride: boolean;
    setManualOverride: (override: boolean) => void;

    // Actions
    refetchWeather: () => void;
    dismissAlert: () => void;
}

const DisasterModeContext = createContext<DisasterModeContextType | undefined>(undefined);

interface DisasterModeProviderProps {
    children: ReactNode;
}

export const DisasterModeProvider: React.FC<DisasterModeProviderProps> = ({ children }) => {
    const { weather, isExtremeWeather, weatherAlert, loading, error, refetch } = useWeather();
    const [manualOverride, setManualOverride] = useState(false);
    const [dismissed, setDismissed] = useState(false);

    // Disaster mode is active if:
    // 1. Extreme weather detected AND not dismissed, OR
    // 2. Manual override is enabled
    const isDisasterModeActive = manualOverride || (isExtremeWeather && !dismissed);

    const dismissAlert = useCallback(() => {
        setDismissed(true);
        // Reset dismissed state after 1 hour (so it can trigger again if conditions persist)
        setTimeout(() => setDismissed(false), 60 * 60 * 1000);
    }, []);

    const handleRefetch = useCallback(() => {
        setDismissed(false); // Reset dismissed when manually refreshing
        refetch();
    }, [refetch]);

    const value: DisasterModeContextType = {
        isDisasterModeActive,
        weatherAlert,
        weather,
        loading,
        error,
        manualOverride,
        setManualOverride,
        refetchWeather: handleRefetch,
        dismissAlert,
    };

    return (
        <DisasterModeContext.Provider value={value}>
            {children}
        </DisasterModeContext.Provider>
    );
};

export const useDisasterMode = (): DisasterModeContextType => {
    const context = useContext(DisasterModeContext);
    if (context === undefined) {
        throw new Error('useDisasterMode must be used within a DisasterModeProvider');
    }
    return context;
};

export default DisasterModeContext;
