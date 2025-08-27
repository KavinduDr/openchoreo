import React from "react";

export interface AuthProvider {
    id: string;
    name: string;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    getUser: () => Promise<any | null>;
    getToken: () => Promise<string | null>;
}

export type AuthProviderProps = {
    provider: string;
    config: Record<string, any>;
    children: React.ReactNode;
}