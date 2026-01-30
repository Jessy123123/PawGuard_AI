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

// ============= NEW TYPES FOR ANIMAL RECOGNITION SYSTEM =============

export type AnimalStatus = 'waiting' | 'in_care' | 'rescued' | 'adopted';

export interface AnimalIdentity {
    id: string;
    systemId: string;                    // Unique system ID (e.g., "PG-2024-0001")
    species: 'dog' | 'cat';
    breed: string;
    color: string;
    distinctiveFeatures: string[];       // AI-detected marks
    featureHash: string;                 // Searchable hash for matching
    primaryImageUrl: string;
    embedding?: number[];                // 512-number fingerprint for identity matching

    // Status tracking
    status: AnimalStatus;
    isVaccinated: boolean;
    vaccinationDate?: string;
    isNeutered: boolean;

    // NGO tracking
    assignedNgoId?: string;
    assignedNgoName?: string;
    ngoAssignedDate?: string;

    // Timeline
    firstReportedAt: string;
    firstReportedBy: string;
    createdBy: string;                   // User ID who created this animal
    lastSeenAt: string;
    lastSeenLocation: string;
    lastSeenCoordinates?: {
        latitude: number;
        longitude: number;
    };

    // History
    reportHistory: ReportEntry[];
    careHistory: CareEntry[];
}

export interface ReportEntry {
    id: string;
    reporterId: string;
    reporterName: string;
    location: string;
    coordinates?: { lat: number; lng: number };
    imageUrl: string;
    condition: string;
    notes: string;
    timestamp: string;
    embedding?: number[];
}

export type CareAction = 'intake' | 'vaccination' | 'neutering' | 'treatment' | 'release' | 'adoption';

export interface CareEntry {
    id: string;
    ngoId: string;
    ngoName: string;
    action: CareAction;
    notes: string;
    timestamp: string;
}
