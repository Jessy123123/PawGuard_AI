import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Alert, AnimalProfile } from '../types';

interface DataContextType {
    animals: AnimalProfile[];
    alerts: Alert[];
    stats: {
        dogsRescued: number;
        dogsNotRescued: number;
        catsRescued: number;
        catsNotRescued: number;
    };
    isLoading: boolean;
    refreshData: () => Promise<void>;
    addAnimal: (animal: AnimalProfile) => void;
    updateAnimal: (id: string, updates: Partial<AnimalProfile>) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Mock data
const mockAnimals: AnimalProfile[] = [
    {
        id: '1',
        name: 'Buddy',
        species: 'dog',
        breed: 'Labrador Mix',
        size: 'Medium',
        color: 'Golden Tan',
        imageUrl: '',
        priority: 'high',
        vaccinated: true,
        neutered: true,
        atRisk: true,
        lastSeen: '2h ago',
        location: 'Downtown Metro - Gate 4',
    },
];

const mockAlerts: Alert[] = [
    {
        id: '1',
        title: 'Flood Warning',
        description: 'Rising water levels detected.',
        location: 'Area B',
        timestamp: '2m ago',
        status: 'critical',
        icon: 'warning',
    },
    {
        id: '2',
        title: 'Public Report',
        description: 'Injured Dog spotted near park.',
        location: 'Sector 4',
        timestamp: '10m ago',
        status: 'review',
        icon: 'person',
    },
    {
        id: '3',
        title: 'AI Detection',
        description: 'Multiple strays identified.',
        location: 'Sector 7',
        timestamp: '15m ago',
        status: 'active',
        icon: 'sparkles',
    },
];

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [animals, setAnimals] = useState<AnimalProfile[]>(mockAnimals);
    const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
    const [isLoading, setIsLoading] = useState(false);
    const [stats] = useState({
        dogsRescued: 128,
        dogsNotRescued: 45,
        catsRescued: 84,
        catsNotRescued: 22,
    });

    const refreshData = async () => {
        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            // Data would be fetched here
        } finally {
            setIsLoading(false);
        }
    };

    const addAnimal = (animal: AnimalProfile) => {
        setAnimals(prev => [...prev, animal]);
    };

    const updateAnimal = (id: string, updates: Partial<AnimalProfile>) => {
        setAnimals(prev =>
            prev.map(animal => (animal.id === id ? { ...animal, ...updates } : animal))
        );
    };

    return (
        <DataContext.Provider
            value={{
                animals,
                alerts,
                stats,
                isLoading,
                refreshData,
                addAnimal,
                updateAnimal,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within DataProvider');
    }
    return context;
};
