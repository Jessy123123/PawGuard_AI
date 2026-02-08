/**
 * Supabase Database Types for PawGuard AI
 * These types match the Supabase table schemas
 */

// ============= DATABASE TABLE TYPES =============

export type ReportStatus = 'new' | 'in_progress' | 'rescued' | 'resolved' | 'adopted';
export type InjurySeverity = 'low' | 'medium' | 'high' | 'critical';
export type DisasterSeverity = 'low' | 'medium' | 'high' | 'critical';
export type UserRole = 'citizen' | 'ngo';

// ============= USER TABLE =============
export interface DbUser {
    id: string;
    email: string;
    name: string;
    role: UserRole;
    phone?: string;
    ngo_name?: string; // Only for NGO users
    created_at: string;
    updated_at: string;
}

// ============= ANIMAL REPORTS TABLE =============
export interface DbAnimalReport {
    id: string;
    report_id: string; // Display ID like "RPT-2024-0001"

    // Reporter Info
    reporter_id: string;
    reporter_name: string;
    reporter_phone?: string;

    // Animal Info (from YOLO + CLIP + Gemini AI)
    species: 'dog' | 'cat' | 'unknown';
    breed?: string;
    color?: string;
    distinctive_features?: string;
    health_notes?: string;
    is_emergency: boolean;

    // Image & Embedding (CLIP 512-dim vector stored separately)
    image_url: string;
    animal_id: string; // Unique ID for the animal based on embedding matching

    // Location
    address: string;
    latitude?: number;
    longitude?: number;

    // Weather at time of report
    weather_condition?: string;
    temperature?: number;
    weather_alert?: string;

    // Care Status (multiple options)
    is_vaccinated: boolean;
    vaccination_date?: string;
    vaccination_notes?: string;
    is_neutered: boolean;
    neutered_date?: string;
    is_rescued: boolean;
    rescue_date?: string;
    rescue_notes?: string;

    // Status (real-time updates)
    status: ReportStatus;
    disaster_mode: boolean;

    // NGO Assignment
    assigned_ngo_id?: string;
    assigned_ngo_name?: string;
    ngo_notes?: string;

    // Timestamps
    created_at: string;
    updated_at: string;
    resolved_at?: string;

    // Rescue outcome fields
    rescue_outcome?: 'released_to_nature' | 'shelter_recovery' | 'adopted' | 'deceased';
    shelter_ngo_id?: string;
    is_tracking_enabled?: boolean;
    adopted_by_user_id?: string;
    adoption_date?: string;
}

// ============= ANIMAL EMBEDDINGS TABLE =============
// Separate table for embeddings to keep main table lighter
export interface DbAnimalEmbedding {
    id: string;
    animal_id: string; // Unique animal identifier
    embedding: number[]; // 512-dimension CLIP embedding
    image_url: string;
    species: 'dog' | 'cat';
    created_by: string; // User who first registered this animal
    created_at: string;
    last_seen_at: string;
    sighting_count: number;
}

// ============= DISASTER ZONES TABLE =============
export interface DbDisasterZone {
    id: string;
    name: string;
    description?: string;
    center_latitude: number;
    center_longitude: number;
    radius_km: number;
    is_active: boolean;
    severity: DisasterSeverity;
    activated_at: string;
    deactivated_at?: string;
    created_by?: string;
    created_at: string;
}

// ============= STATUS HISTORY TABLE =============
export interface DbStatusHistory {
    id: string;
    report_id: string;
    old_status?: string;
    new_status: string;
    action_type: 'status_change' | 'vaccination' | 'neutering' | 'rescue' | 'assignment';
    changed_by: string;
    changed_by_name: string;
    notes?: string;
    created_at: string;
}

// ============= FRONTEND-FRIENDLY TYPES =============
// Camel-case versions for use in React components

export interface AnimalReport {
    id: string;
    reportId: string;
    reporterId: string;
    reporterName: string;
    reporterPhone?: string;
    species: 'dog' | 'cat' | 'unknown';
    breed?: string;
    color?: string;
    distinctiveFeatures?: string;
    healthNotes?: string;
    isEmergency: boolean;
    imageUrl: string;
    animalId: string;
    address: string;
    latitude?: number;
    longitude?: number;
    weatherCondition?: string;
    temperature?: number;
    weatherAlert?: string;
    isVaccinated: boolean;
    vaccinationDate?: string;
    vaccinationNotes?: string;
    isNeutered: boolean;
    neuteredDate?: string;
    isRescued: boolean;
    rescueDate?: string;
    rescueNotes?: string;
    status: ReportStatus;
    disasterMode: boolean;
    assignedNgoId?: string;
    assignedNgoName?: string;
    ngoNotes?: string;
    createdAt: string;
    updatedAt: string;
    resolvedAt?: string;
    // Rescue outcome fields
    rescueOutcome?: 'released_to_nature' | 'shelter_recovery' | 'adopted' | 'deceased';
    shelterNgoId?: string;
    isTrackingEnabled?: boolean;
    adoptedByUserId?: string;
    adoptionDate?: string;
}

export interface DisasterZone {
    id: string;
    name: string;
    description?: string;
    centerLatitude: number;
    centerLongitude: number;
    radiusKm: number;
    isActive: boolean;
    severity: DisasterSeverity;
    activatedAt: string;
    deactivatedAt?: string;
}

export interface StatusHistoryEntry {
    id: string;
    reportId: string;
    oldStatus?: string;
    newStatus: string;
    actionType: 'status_change' | 'vaccination' | 'neutering' | 'rescue' | 'assignment';
    changedBy: string;
    changedByName: string;
    notes?: string;
    createdAt: string;
}

// ============= CONVERTER FUNCTIONS =============

export function dbToAnimalReport(db: DbAnimalReport): AnimalReport {
    return {
        id: db.id,
        reportId: db.report_id,
        reporterId: db.reporter_id,
        reporterName: db.reporter_name,
        reporterPhone: db.reporter_phone,
        species: db.species,
        breed: db.breed,
        color: db.color,
        distinctiveFeatures: db.distinctive_features,
        healthNotes: db.health_notes,
        isEmergency: db.is_emergency,
        imageUrl: db.image_url,
        animalId: db.animal_id,
        address: db.address,
        latitude: db.latitude,
        longitude: db.longitude,
        weatherCondition: db.weather_condition,
        temperature: db.temperature,
        weatherAlert: db.weather_alert,
        isVaccinated: db.is_vaccinated,
        vaccinationDate: db.vaccination_date,
        vaccinationNotes: db.vaccination_notes,
        isNeutered: db.is_neutered,
        neuteredDate: db.neutered_date,
        isRescued: db.is_rescued,
        rescueDate: db.rescue_date,
        rescueNotes: db.rescue_notes,
        status: db.status,
        disasterMode: db.disaster_mode,
        assignedNgoId: db.assigned_ngo_id,
        assignedNgoName: db.assigned_ngo_name,
        ngoNotes: db.ngo_notes,
        createdAt: db.created_at,
        updatedAt: db.updated_at,
        resolvedAt: db.resolved_at,
        // Rescue outcome fields
        rescueOutcome: db.rescue_outcome,
        shelterNgoId: db.shelter_ngo_id,
        isTrackingEnabled: db.is_tracking_enabled,
        adoptedByUserId: db.adopted_by_user_id,
        adoptionDate: db.adoption_date,
    };
}

export function animalReportToDb(report: Partial<AnimalReport>): Partial<DbAnimalReport> {
    const result: Partial<DbAnimalReport> = {};

    if (report.reportId !== undefined) result.report_id = report.reportId;
    if (report.reporterId !== undefined) result.reporter_id = report.reporterId;
    if (report.reporterName !== undefined) result.reporter_name = report.reporterName;
    if (report.reporterPhone !== undefined) result.reporter_phone = report.reporterPhone;
    if (report.species !== undefined) result.species = report.species;
    if (report.breed !== undefined) result.breed = report.breed;
    if (report.color !== undefined) result.color = report.color;
    if (report.distinctiveFeatures !== undefined) result.distinctive_features = report.distinctiveFeatures;
    if (report.healthNotes !== undefined) result.health_notes = report.healthNotes;
    if (report.isEmergency !== undefined) result.is_emergency = report.isEmergency;
    if (report.imageUrl !== undefined) result.image_url = report.imageUrl;
    if (report.animalId !== undefined) result.animal_id = report.animalId;
    if (report.address !== undefined) result.address = report.address;
    if (report.latitude !== undefined) result.latitude = report.latitude;
    if (report.longitude !== undefined) result.longitude = report.longitude;
    if (report.weatherCondition !== undefined) result.weather_condition = report.weatherCondition;
    if (report.temperature !== undefined) result.temperature = report.temperature;
    if (report.weatherAlert !== undefined) result.weather_alert = report.weatherAlert;
    if (report.isVaccinated !== undefined) result.is_vaccinated = report.isVaccinated;
    if (report.vaccinationDate !== undefined) result.vaccination_date = report.vaccinationDate;
    if (report.vaccinationNotes !== undefined) result.vaccination_notes = report.vaccinationNotes;
    if (report.isNeutered !== undefined) result.is_neutered = report.isNeutered;
    if (report.neuteredDate !== undefined) result.neutered_date = report.neuteredDate;
    if (report.isRescued !== undefined) result.is_rescued = report.isRescued;
    if (report.rescueDate !== undefined) result.rescue_date = report.rescueDate;
    if (report.rescueNotes !== undefined) result.rescue_notes = report.rescueNotes;
    if (report.status !== undefined) result.status = report.status;
    if (report.disasterMode !== undefined) result.disaster_mode = report.disasterMode;
    if (report.assignedNgoId !== undefined) result.assigned_ngo_id = report.assignedNgoId;
    if (report.assignedNgoName !== undefined) result.assigned_ngo_name = report.assignedNgoName;
    if (report.ngoNotes !== undefined) result.ngo_notes = report.ngoNotes;

    return result;
}

export function dbToDisasterZone(db: DbDisasterZone): DisasterZone {
    return {
        id: db.id,
        name: db.name,
        description: db.description,
        centerLatitude: db.center_latitude,
        centerLongitude: db.center_longitude,
        radiusKm: db.radius_km,
        isActive: db.is_active,
        severity: db.severity,
        activatedAt: db.activated_at,
        deactivatedAt: db.deactivated_at,
    };
}
