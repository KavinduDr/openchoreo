import React, { createContext, useState } from "react";
import { getProvider } from "./providers";
import { AuthProvider as AuthProviderType } from "./types";

interface AuthState {
    user: any;
    token: string | null;
    provider: string | null;
}

interface AuthContextValue extends AuthState {
    login: (providerId: string, config: any) => Promise<void>;
    logout: () => Promise<void>;
    hasRole: (role: string) => boolean;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        provider: null,
    });

    const login = async (providerId: string, config: any) => {
        const providerFactory = getProvider(providerId);
        if (!providerFactory) throw new Error(`Provider ${providerId} not found`);

        // Create provider instance with config
        const provider = providerFactory(config);

        await provider.login();
        const user = provider.getUser ? await provider.getUser() : null;
        const token = await provider.getToken();
        setState({ user, token, provider: providerId });
    };

    const logout = async () => {
        if (state.provider) {
            const providerFactory = getProvider(state.provider);
            if (providerFactory) {
                // Create provider instance (ideally we'd store this in state)
                const provider = providerFactory({} as any);
                await provider.logout();
            }
        }
        setState({ user: null, token: null, provider: null });
    };

    const hasRole = (role: string) => state.user?.roles?.includes(role);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                login,
                logout,
                hasRole,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
