import { AuthProvider } from "src/types";

export const asgardeoProvider: AuthProvider = {
    id: "asgardeo",
    name: "Asgardeo",
    login: async () => {
        // Implementation for login
    },
    logout: async () => {
        // Implementation for logout
    },
    getUser: async () => {
        // Implementation for getting user
    },
    getToken: async () => {
        // Implementation for getting token
        return 'token';
    }
};