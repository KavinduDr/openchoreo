import React, { createContext, useState } from "react";
import { getProvider } from "./providers";

interface AuthState {
    user: any;
    token: string | null;
    provider: string | null;
}

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, setState] = useState<AuthState>({
        user: null,
        token: null,
        provider: null,
    });

    const login = async (providerId: string) => {
        const provider = getProvider(providerId);
        if (!provider) throw new Error(`Provider ${providerId} not found`);
        await provider.login();
        const user = await provider.getUser();
        const token = await provider.getToken();
        setState({ user, token, provider: providerId });
    };

    const logout = async () => {
        if (state.provider) {
            const provider = getProvider(state.provider);
            await provider?.logout();
        }
        setState({ user: null, token: null, provider: null });
    };

    const hasRole = (role: string) => state.user?.roles?.includes(role);

    return (
        <AuthContext.Provider value={{ ...state, login, logout, hasRole }}>
            {children}
        </AuthContext.Provider>
    );
};
