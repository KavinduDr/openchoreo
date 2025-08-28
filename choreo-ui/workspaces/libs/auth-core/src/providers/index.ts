import { AuthProvider, AuthProviderConfig } from "../types";
import { asgardeoProvider } from "./asgardeoProvider";

// Define factory function type
export type AuthProviderFactory = (config: AuthProviderConfig) => AuthProvider;

// Store provider factory functions
const providers: Record<string, AuthProviderFactory> = {
    asgardeo: asgardeoProvider,
};

export function getProvider(id: string): AuthProviderFactory | null {
    return providers[id] || null;
}

export function listProviders(): Record<string, AuthProviderFactory> {
    return { ...providers };
}
