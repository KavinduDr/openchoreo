/* eslint-disable no-console */
import { createAuthProvider } from "./authProvider";
import {
  AuthClientConfig,
  User,
  AuthEvents,
  AuthError,
  SessionExpiredError,
  AuthConfig,
  AsgardeoConfig,
  Auth0Config,
  FirebaseConfig,
  ThunderConfig,
} from "./types";

// Common interface that all auth providers must implement
interface AuthProviderType {
  /**
   * Initialize login flow
   */
  login(username: string, password: string): Promise<void>;

  /**
   * Register new user (if provider supports it)
   */
  register?(
    email: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData?: Record<string, any>,
  ): Promise<void>;

  /**
   * Sign out user
   */
  logout(): Promise<void>;

  /**
   * Check if user is currently authenticated
   * This should handle token refresh automatically
   */
  isAuthenticated(): Promise<boolean>;

  /**
   * Get current access token
   */
  getToken(): Promise<string | null>;

  /**
   * Get normalized user data
   */
  getUser(): Promise<User | null>;

  /**
   * Check if user has specific scope
   */
  hasScope(scope: string): Promise<boolean>;

  /**
   * Check if user has specific role
   */
  hasRole(role: string): Promise<boolean>;

  /**
   * Get all user scopes
   */
  getScopes(): Promise<string[]>;

  /**
   * Get all user roles
   */
  getRoles(): Promise<string[]>;
}
/**
 * Convert AuthClientConfig to the appropriate AuthConfig type
 */
function convertToAuthConfig(config: AuthClientConfig): AuthConfig {
  const baseConfig = {
    clientID: config.clientID,
    signInRedirectURL: config.signInRedirectURL,
    signOutRedirectURL: config.signOutRedirectURL,
    scope: Array.isArray(config.scope)
      ? config.scope
      : config.scope
        ? [config.scope]
        : [],
  };

  switch (config.provider) {
    case "asgardeo":
      return {
        ...baseConfig,
        provider: "asgardeo",
        baseUrl: config.domain || config.baseUrl || "",
      } as AsgardeoConfig;
    case "auth0":
      return {
        ...baseConfig,
        provider: "auth0",
        domain: config.domain || "",
        audience: config.audience,
      } as Auth0Config;
    case "firebase":
      return {
        ...baseConfig,
        provider: "firebase",
        apiKey: config.clientID, // Use clientID as apiKey for now
        authDomain: config.domain || "",
        projectId: config.audience || "",
      } as FirebaseConfig;
    case "thunder":
      return {
        ...baseConfig,
        provider: "thunder",
        apiKey: config.clientID, // Use clientID as apiKey for now
        authDomain: config.domain || "",
        projectId: config.audience || "",
      } as ThunderConfig;
    default:
      throw new AuthError(
        `Unsupported provider: ${config.provider}`,
        "UNSUPPORTED_PROVIDER",
        config.provider,
      );
  }
}

/**
 * Main AuthClient that developers will use
 * Wraps the provider and handles common authentication logic
 */
export class AuthClient {
  private provider: AuthProviderType;
  private config: AuthClientConfig;
  private events: AuthEvents;
  private tokenCheckInterval?: ReturnType<typeof setInterval>;
  private isInitialized = false;

  constructor(config: AuthClientConfig) {
    this.config = {
      autoRefresh: true,
      checkInterval: 5, // default 5 minutes
      storage: "localStorage",
      ...config,
    };

    this.events = config.events || {};

    try {
      this.provider = createAuthProvider(convertToAuthConfig(config));
    } catch (error) {
      throw new AuthError(
        `Failed to initialize AuthClient: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        "CLIENT_INIT_FAILED",
        config.provider,
        error,
      );
    }
  }

  /**
   * Initialize the auth client and start token checking if enabled
   */
  async initialize(): Promise<void> {
    try {
      this.isInitialized = true;

      // Start periodic token checking if enabled
      if (this.config.autoRefresh && this.config.checkInterval) {
        this.startTokenChecking();
      }

      // Check if user is already authenticated from previous session
      const isAuth = await this.isAuthenticated();
      if (isAuth) {
        const user = await this.getUser();
        if (user && this.events.onLoginSuccess) {
          this.events.onLoginSuccess(user);
        }
      }
    } catch (error) {
      throw new AuthError(
        "Failed to initialize AuthClient",
        "INITIALIZATION_FAILED",
        this.config.provider,
        error,
      );
    }
  }

  /**
   * Login user
   */
  async login(username: string, password: string): Promise<void> {
    this.ensureInitialized();

    try {
      await this.provider.login(username, password);
      const user = await this.provider.getUser();

      if (user && this.events.onLoginSuccess) {
        this.events.onLoginSuccess(user);
      }
    } catch (error) {
      if (this.events.onLoginError) {
        this.events.onLoginError(error as Error);
      }
      throw error;
    }
  }

  /**
   * Register new user (if provider supports it)
   */
  async register(
    email: string,
    password: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    userData?: Record<string, any>,
  ): Promise<void> {
    this.ensureInitialized();

    if (!this.provider.register) {
      throw new AuthError(
        `Registration not supported by ${this.config.provider} provider`,
        "REGISTRATION_NOT_SUPPORTED",
        this.config.provider,
      );
    }

    try {
      await this.provider.register(email, password, userData);
      const user = await this.provider.getUser();

      if (user && this.events.onLoginSuccess) {
        this.events.onLoginSuccess(user);
      }
    } catch (error) {
      if (this.events.onLoginError) {
        this.events.onLoginError(error as Error);
      }
      throw error;
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    this.ensureInitialized();

    try {
      await this.provider.logout();

      if (this.events.onLogout) {
        this.events.onLogout();
      }
    } catch (error) {
      throw new AuthError(
        "Logout failed",
        "LOGOUT_FAILED",
        this.config.provider,
        error,
      );
    }
  }

  /**
   * Check if user is authenticated
   * This is called before scope verification as you requested
   */
  async isAuthenticated(): Promise<boolean> {
    this.ensureInitialized();

    try {
      return await this.provider.isAuthenticated();
    } catch (error) {
      console.error("Error", error);
      return false;
    }
  }

  /**
   * Get current access token
   */
  async getToken(): Promise<string | null> {
    this.ensureInitialized();

    try {
      return await this.provider.getToken();
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  }

  /**
   * Get normalized user data
   */
  async getUser(): Promise<User | null> {
    this.ensureInitialized();

    try {
      return await this.provider.getUser();
    } catch (error) {
      console.error("Error ", error);
      return null;
    }
  }

  /**
   * Check if user has specific scope
   * This will check authentication before verifying scope
   */
  async hasScope(scope: string): Promise<boolean> {
    this.ensureInitialized();

    try {
      // Check authentication first (this handles token refresh)
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        return false;
      }

      return await this.provider.hasScope(scope);
    } catch (error) {
      console.error("Error", error);
      return false;
    }
  }

  /**
   * Check if user has specific role
   */
  async hasRole(role: string): Promise<boolean> {
    this.ensureInitialized();

    try {
      // Check authentication first (this handles token refresh)
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        return false;
      }

      return await this.provider.hasRole(role);
    } catch (error) {
      console.error("Error", error);
      return false;
    }
  }

  /**
   * Get all user scopes
   */
  async getScopes(): Promise<string[]> {
    this.ensureInitialized();

    try {
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        return [];
      }

      return await this.provider.getScopes();
    } catch (error) {
      console.error("Error", error);
      return [];
    }
  }

  /**
   * Get all user roles
   */
  async getRoles(): Promise<string[]> {
    this.ensureInitialized();

    try {
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        return [];
      }

      return await this.provider.getRoles();
    } catch (error) {
      console.error("Error", error);
      return [];
    }
  }

  /**
   * Manually refresh authentication state
   */
  async refresh(): Promise<void> {
    this.ensureInitialized();

    try {
      const isAuth = await this.provider.isAuthenticated();
      if (!isAuth) {
        throw new SessionExpiredError(this.config.provider);
      }

      const token = await this.provider.getToken();
      if (token && this.events.onTokenRefresh) {
        this.events.onTokenRefresh(token);
      }
    } catch (error) {
      if (
        error instanceof SessionExpiredError &&
        this.events.onSessionExpired
      ) {
        this.events.onSessionExpired();
      }
      throw error;
    }
  }

  /**
   * Start periodic token checking
   */
  private startTokenChecking(): void {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
    }

    const intervalMs = (this.config.checkInterval || 5) * 60 * 1000; // Convert minutes to milliseconds

    this.tokenCheckInterval = setInterval(async () => {
      try {
        await this.refresh();
      } catch (error) {
        if (
          error instanceof SessionExpiredError &&
          this.events.onSessionExpired
        ) {
          this.events.onSessionExpired();
        }
      }
    }, intervalMs);
  }

  /**
   * Stop periodic token checking
   */
  private stopTokenChecking(): void {
    if (this.tokenCheckInterval) {
      clearInterval(this.tokenCheckInterval);
      this.tokenCheckInterval = undefined;
    }
  }

  /**
   * Clean up resources
   */
  destroy(): void {
    this.stopTokenChecking();
    this.isInitialized = false;
  }

  /**
   * Update event handlers
   */
  updateEvents(events: Partial<AuthEvents>): void {
    this.events = { ...this.events, ...events };
  }

  /**
   * Get current configuration
   */
  getConfig(): Readonly<AuthClientConfig> {
    return { ...this.config };
  }

  /**
   * Get provider type
   */
  getProviderType(): string {
    return this.config.provider;
  }

  /**
   * Ensure client is initialized before operations
   */
  private ensureInitialized(): void {
    if (!this.isInitialized) {
      throw new AuthError(
        "AuthClient must be initialized before use. Call initialize() first.",
        "CLIENT_NOT_INITIALIZED",
        this.config.provider,
      );
    }
  }
}

/**
 * Convenience function to create and initialize AuthClient
 */
export async function createAuthClient(
  config: AuthClientConfig,
): Promise<AuthClient> {
  const client = new AuthClient(config);
  await client.initialize();
  return client;
}
