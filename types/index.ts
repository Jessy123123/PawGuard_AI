// TypeScript type definitions for PawGuard AI

export type UserRole = 'citizen' | 'ngo';

export type AlertStatus = 'critical' | 'review' | 'active';

export interface Alert {
    id: string;
    title: string;
    description: string;
    location: string;
    timestamp: string;
    status: AlertStatus;
    icon: string;
}

export interface Stat {
    label: string;
    value: number;
    icon: string;
    positive: boolean;
}

export interface AnimalProfile {
    id: string;
    name: string;
    species: 'dog' | 'cat';
    breed: string;
    size: string;
    color: string;
    imageUrl: string;
    priority: 'high' | 'medium' | 'low';
    vaccinated: boolean;
    neutered: boolean;
    atRisk: boolean;
    lastSeen: string;
    location: string;
}

export interface ActivityItem {
    id: string;
    type: 'location' | 'medical' | 'intake' | 'rescue';
    title: string;
    description: string;
    timestamp: string;
    icon: string;
}

export interface MapMarker {
    id: string;
    latitude: number;
    longitude: number;
    type: 'critical' | 'canine' | 'feline' | 'drowning';
    label: string;
}
