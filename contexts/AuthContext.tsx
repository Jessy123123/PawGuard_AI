
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/firebase";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '../types';

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
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    register: (email: string, password: string, name: string, role: UserRole, phone?: string, orgName?: string) => Promise<void>;
    updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!auth) {
            console.error('❌ Firebase auth is undefined');
            setIsLoading(false);
            return () => { }; // always return a cleanup function
        }

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (!firebaseUser) {
                setUser(null);
                setIsLoading(false);
                return;
            }

            const snap = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (snap.exists()) {
                setUser({
                    id: firebaseUser.uid,
                    ...snap.data(),
                } as User);
            }

            setIsLoading(false);
        });

        return unsubscribe; // cleanup function
    }, []);





    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );

            const firebaseUser = userCredential.user;

            const snap = await getDoc(doc(db, "users", firebaseUser.uid));
            if (snap.exists()) {
                setUser({
                    id: firebaseUser.uid,
                    ...snap.data(),
                } as User);
            }
        } finally {
            setIsLoading(false);
        }
    };


    const register = async (
        email: string,
        password: string,
        name: string,
        role: UserRole,
        phone?: string,
        orgName?: string
    ) => {
        setIsLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );

            const firebaseUser = userCredential.user;

            const profileComplete = !!(
                name &&
                role &&
                phone &&
                (role === "ngo" ? orgName : true)
            );

            const userData: User = {
                id: firebaseUser.uid,
                email,
                name,
                role,
                phone,
                profileComplete,
            };

            if (role === "ngo" && orgName) {
                userData.organizationName = orgName;
            }


            await setDoc(doc(db, "users", firebaseUser.uid), userData);
            setUser(userData);

        } catch (error: any) {
            console.error("🔥 SIGN UP ERROR:", error);

            // TEMP: show real Firebase error
            alert(error.code || error.message);
            throw error;

        } finally {
            setIsLoading(false);
        }
    };



    const updateProfile = async (updates: Partial<User>) => {
        if (!user) return;

        try {
            const updatedUser: User = {
                ...user,
                ...updates,
                profileComplete: false, // temp, recompute below
            };

            updatedUser.profileComplete = !!(
                updatedUser.name &&
                updatedUser.role &&
                updatedUser.phone &&
                (updatedUser.role === "ngo"
                    ? updatedUser.organizationName
                    : true)
            );

            const cleanUser: User = {
                id: updatedUser.id,
                email: updatedUser.email,
                name: updatedUser.name,
                role: updatedUser.role,
                phone: updatedUser.phone,
                profileComplete: updatedUser.profileComplete,
                ...(updatedUser.role === "ngo" && updatedUser.organizationName
                    ? { organizationName: updatedUser.organizationName }
                    : {}),
            };

            await setDoc(doc(db, "users", user.id), cleanUser);
            setUser(cleanUser);
        } catch (error) {
            console.error("Failed to update profile:", error);
        }
    };


    const logout = async () => {
        await signOut(auth);
        setUser(null);
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
