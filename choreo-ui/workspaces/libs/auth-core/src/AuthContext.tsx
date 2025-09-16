/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { AuthClient, createAuthClient } from "./authClient";
import { AuthClientConfig, User, AuthError } from "./types";

// Auth context state interface
interface AuthContextState {
  // Auth client instance
  client: AuthClient | null;

  // User state
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;

  // Auth methods
  login: (email?: string, password?: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData?: Record<string, any>,
  ) => Promise<void>;

  // Permission checks
  hasScope: (scope: string) => Promise<boolean>;
  hasRole: (role: string) => Promise<boolean>;
  getScopes: () => Promise<string[]>;
  getRoles: () => Promise<string[]>;

  // Utility methods
  refresh: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

// Create the context
const AuthContext = createContext<AuthContextState | null>(null);

// AuthProvider props interface
interface AuthProviderProps {
  children: ReactNode;
  config: AuthClientConfig;
  fallback?: ReactNode;
  onSessionExpired?: () => void;
  onLoginSuccess?: (user: User) => void;
  onLoginError?: (error: Error) => void;
  onLogout?: () => void;
}

/**
 * AuthProvider component that wraps your app and provides auth context
 * Use this in your GlobalProviders component
 */
export const AuthContextProvider: React.FC<AuthProviderProps> = ({
  children,
  config,
  fallback,
  onSessionExpired,
  onLoginSuccess,
  onLoginError,
  onLogout,
}) => {
  const [client, setClient] = useState<AuthClient | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  // Initialize auth client
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Create auth client with event handlers
        const authConfig: AuthClientConfig = {
          ...config,
          events: {
            onLoginSuccess: (user: User) => {
              setUser(user);
              setIsAuthenticated(true);
              onLoginSuccess?.(user);
            },
            onLoginError: (error: Error) => {
              setError(error as AuthError);
              onLoginError?.(error);
            },
            onLogout: () => {
              setUser(null);
              setIsAuthenticated(false);
              onLogout?.();
            },
            onSessionExpired: () => {
              setUser(null);
              setIsAuthenticated(false);
              onSessionExpired?.();
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onTokenRefresh: (token: string) => {
              // Optionally refresh user data when token refreshes
              refreshUserData();
            },
            ...config.events,
          },
        };

        const authClient = await createAuthClient(authConfig);
        setClient(authClient);

        // Check if user is already authenticated
        const isAuth = await authClient.isAuthenticated();
        setIsAuthenticated(isAuth);

        if (isAuth) {
          const userData = await authClient.getUser();
          setUser(userData);
        }
      } catch (err) {
        const authError =
          err instanceof AuthError
            ? err
            : new AuthError(
                "Failed to initialize authentication",
                "INIT_ERROR",
                config.provider,
                err,
              );
        setError(authError);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Cleanup on unmount
    return () => {
      if (client) {
        client.destroy();
      }
    };
  }, [config]);

  // Refresh user data
  const refreshUserData = useCallback(async () => {
    if (!client) return;

    try {
      const userData = await client.getUser();
      setUser(userData);
      const isAuth = await client.isAuthenticated();
      setIsAuthenticated(isAuth);
    } catch (err) {
      console.error("Failed to refresh user data:", err);
    }
  }, [client]);

  // Login method
  const login = useCallback(
    async (email?: string, password?: string) => {
      if (!client) throw new Error("Auth client not initialized");

      try {
        setError(null);
        console.log("Starting login process...", { email, password });
        await client.login(email || "", password || "");
        console.log("Login completed, checking auth state...");

        // After login, manually refresh the auth state
        setTimeout(async () => {
          try {
            const isAuth = await client.isAuthenticated();
            console.log("Post-login auth check:", isAuth);

            if (isAuth) {
              const userData = await client.getUser();
              console.log("Post-login user data:", userData);
              setUser(userData);
              setIsAuthenticated(true);
            }
          } catch (err) {
            console.error("Post-login state refresh failed:", err);
          }
        }, 2000); // Wait 2 seconds after login

        // User state will be updated via onLoginSuccess event
      } catch (err) {
        const authError =
          err instanceof AuthError
            ? err
            : new AuthError(
                "Login failed",
                "LOGIN_ERROR",
                config.provider,
                err,
              );
        setError(authError);
        throw authError;
      }
    },
    [client, config.provider],
  );

  // Logout method
  const logout = useCallback(async () => {
    if (!client) throw new Error("Auth client not initialized");

    try {
      await client.logout();
      // State will be cleared via onLogout event
    } catch (err) {
      const authError =
        err instanceof AuthError
          ? err
          : new AuthError(
              "Logout failed",
              "LOGOUT_ERROR",
              config.provider,
              err,
            );
      setError(authError);
      throw authError;
    }
  }, [client, config.provider]);

  // Register method
  const register = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async (email: string, password: string, userData?: Record<string, any>) => {
      if (!client) throw new Error("Auth client not initialized");

      try {
        setError(null);
        await client.register(email, password, userData);
        // User state will be updated via onLoginSuccess event
      } catch (err) {
        const authError =
          err instanceof AuthError
            ? err
            : new AuthError(
                "Registration failed",
                "REGISTER_ERROR",
                config.provider,
                err,
              );
        setError(authError);
        throw authError;
      }
    },
    [client, config.provider],
  );

  // Permission check methods
  const hasScope = useCallback(
    async (scope: string): Promise<boolean> => {
      if (!client) return false;
      return await client.hasScope(scope);
    },
    [client],
  );

  const hasRole = useCallback(
    async (role: string): Promise<boolean> => {
      if (!client) return false;
      return await client.hasRole(role);
    },
    [client],
  );

  const getScopes = useCallback(async (): Promise<string[]> => {
    if (!client) return [];
    return await client.getScopes();
  }, [client]);

  const getRoles = useCallback(async (): Promise<string[]> => {
    if (!client) return [];
    return await client.getRoles();
  }, [client]);

  const refresh = useCallback(async () => {
    if (!client) throw new Error("Auth client not initialized");
    await client.refresh();
    await refreshUserData();
  }, [client, refreshUserData]);

  const getToken = useCallback(async (): Promise<string | null> => {
    if (!client) return null;
    return await client.getToken();
  }, [client]);

  // Context value
  const contextValue: AuthContextState = {
    client,
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    register,
    hasScope,
    hasRole,
    getScopes,
    getRoles,
    refresh,
    getToken,
  };

  // Show fallback during loading or error
  if (isLoading) {
    return <>{fallback || <div>Loading authentication...</div>}</>;
  }

  if (error && !client) {
    return (
      <>
        {fallback || (
          <div>Authentication initialization failed: {error.message}</div>
        )}
      </>
    );
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

/**
 * Hook to use auth context
 * This is what your plugins will use to check permissions
 */
export const useAuth = (): AuthContextState => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

/**
 * HOC to protect components that require authentication
 */
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
) {
  return function AuthenticatedComponent(props: P) {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
      return <>{fallback || <div>Loading...</div>}</>;
    }

    if (!isAuthenticated) {
      return (
        <>{fallback || <div>Please log in to access this content.</div>}</>
      );
    }

    return <Component {...props} />;
  };
}

/**
 * Hook to check specific scope/role with loading state
 * Useful for conditional rendering in plugins
 */
export const usePermission = (scope?: string, role?: string) => {
  const { hasScope, hasRole } = useAuth();
  const [hasPermission, setHasPermission] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);

  useEffect(() => {
    const checkPermission = async () => {
      setIsChecking(true);
      try {
        let result = false;

        if (scope && role) {
          // Check both scope and role (AND logic)
          const [scopeResult, roleResult] = await Promise.all([
            hasScope(scope),
            hasRole(role),
          ]);
          result = scopeResult && roleResult;
        } else if (scope) {
          result = await hasScope(scope);
        } else if (role) {
          result = await hasRole(role);
        }

        setHasPermission(result);
      } catch (error) {
        console.error("Permission check failed:", error);
        setHasPermission(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkPermission();
  }, [scope, role, hasScope, hasRole]);

  return { hasPermission, isChecking };
};
