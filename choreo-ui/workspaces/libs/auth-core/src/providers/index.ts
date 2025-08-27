import { AuthProvider } from "src/types";
import { asgardeoProvider } from "./asgardeoProvider";

const providers: Record<string, AuthProvider> = {
    asgardeo: asgardeoProvider,
};

export function getProvider(id: string): AuthProvider | null {
    return providers[id] || null;
}

export function listProviders(): AuthProvider[] {
    return Object.values(providers);
}
