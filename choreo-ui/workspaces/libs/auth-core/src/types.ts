import React from "react";

export interface AuthProvider {
    login: () => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: () => Promise<boolean>;
    getToken: () => Promise<string | null>;
    getUser?: () => Promise<any>;
    // ...other auth methods
}

// Configuration for provider factories
export interface AuthProviderConfig {
    clientId: string;
    baseUrl: string;
    scopes?: string[];
    // ...other configuration properties
}

// Props for the AuthWrapper component
export interface AuthProviderProps {
    provider: {
        name: string;
        id: string;
        config: AuthProviderConfig;
    };
    children: React.ReactNode;
}