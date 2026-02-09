import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '../types';
import { supabase } from '../lib/supabase';
import { DbUser, DbUserInsert } from '../lib/supabaseTypes';

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
            // Get current session from Supabase
            const { data: { session } } = await supabase.auth.getSession();

            if (session?.user) {
                // Fetch user profile from database
                const { data: profile, error } = await supabase
                    .from('users')
                    .select('*')
                    .eq('id', session.user.id)
                    .single();

                if (error) {
                    console.error('Error fetching user profile:', error);
                    return;
                }

                if (profile) {
                    setUser({
                        id: profile.id,
                        email: profile.email,
                        name: profile.name,
                        role: profile.role as UserRole,
                        phone: profile.phone || undefined,
                        organizationName: profile.ngo_name || undefined,
                        profileComplete: !!(profile.name && profile.role && profile.phone),
                    });
                }
            }
        } catch (error) {
            console.error('Failed to load user session:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const login = async (email: string, password: string, role: UserRole = 'citizen') => {
        setIsLoading(true);
        try {
            // Sign in with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error('No user returned from login');

            // Fetch user profile from database
            const { data: profile, error: profileError } = await supabase
                .from('users')
                .select('*')
                .eq('id', authData.user.id)
                .single();

            if (profileError) {
                console.error('Error fetching user profile:', profileError);
                throw profileError;
            }

            if (profile) {
                setUser({
                    id: profile.id,
                    email: profile.email,
                    name: profile.name,
                    role: profile.role as UserRole,
                    phone: profile.phone || undefined,
                    organizationName: profile.ngo_name || undefined,
                    profileComplete: !!(profile.name && profile.role && profile.phone),
                });
            }
        } catch (error: any) {
            console.error('Login failed:', error);
            throw new Error(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string, name: string, role: UserRole, phone?: string, orgName?: string) => {
        setIsLoading(true);
        try {
            // Sign up with Supabase Auth
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email,
                password,
            });

            if (authError) throw authError;
            if (!authData.user) throw new Error('No user returned from signup');

            console.log('✅ Supabase Auth user created:', authData.user.id);

            // Insert user details into users table
            const profileComplete = !!(name && role && (role === 'ngo' ? orgName : true) && phone);

            const userInsert: DbUserInsert = {
                id: authData.user.id,
                email,
                name,
                role,
                phone: phone || null,
                ngo_name: orgName || null,
            };

            const { data: profile, error: profileError } = await supabase
                .from('users')
                .insert(userInsert)
                .select()
                .single();

            if (profileError) {
                console.error('❌ Error creating user profile:', profileError);
                throw profileError;
            }

            console.log('✅ User profile created in database:', profile);

            setUser({
                id: profile.id,
                email: profile.email,
                name: profile.name,
                role: profile.role as UserRole,
                phone: profile.phone || undefined,
                organizationName: profile.ngo_name || undefined,
                profileComplete,
            });
        } catch (error: any) {
            console.error('❌ Registration failed:', error);
            throw new Error(error.message || 'Registration failed');
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (updates: Partial<User>) => {
        if (!user) return;

        try {
            const { error } = await supabase
                .from('users')
                .update({
                    name: updates.name,
                    phone: updates.phone || null,
                    ngo_name: updates.organizationName || null,
                })
                .eq('id', user.id);

            if (error) throw error;

            const updatedUser = { ...user, ...updates };
            const profileComplete = !!(
                updatedUser.name &&
                updatedUser.role &&
                updatedUser.phone &&
                (updatedUser.role === 'ngo' ? updatedUser.organizationName : true)
            );

            updatedUser.profileComplete = profileComplete;
            setUser(updatedUser);

            console.log('✅ Profile updated successfully');
        } catch (error: any) {
            console.error('❌ Failed to update profile:', error);
            throw new Error(error.message || 'Update failed');
        }
    };

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            setUser(null);
            console.log('✅ Logged out successfully');
        } catch (error: any) {
            console.error('❌ Failed to logout:', error);
            throw new Error(error.message || 'Logout failed');
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
