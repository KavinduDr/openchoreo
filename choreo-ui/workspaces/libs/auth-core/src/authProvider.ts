/* eslint-disable no-console */
import {
  AsgardeoProvider,
  FirebaseProvider,
  ThunderProvider,
} from "./providers";
import {
  AuthConfig,
  ProviderType,
  AsgardeoConfig,
  Auth0Config,
  FirebaseConfig,
  isAsgardeoConfig,
  isAuth0Config,
  isFirebaseConfig,
  AuthError,
  User,
  ThunderConfig,
  isThunderConfig,
} from "./types";

// Common interface that all auth providers must implement
interface AuthProviderType {
  /**
   * Initialize login flow
   */
  login(email?: string, password?: string): Promise<void>;

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
 * Factory class to create appropriate auth provider based on configuration
 */
export class ProviderFactory {
  /**
   * Create an auth provider instance based on the configuration
   */
  static createProvider(config: AuthConfig): AuthProviderType {
    // Validate required fields
    ProviderFactory.validateBaseConfig(config);

    switch (config.provider) {
      case "asgardeo":
        if (!isAsgardeoConfig(config)) {
          throw new AuthError(
            "Invalid Asgardeo configuration",
            "INVALID_CONFIG",
            "asgardeo",
          );
        }
        return ProviderFactory.createAsgardeoProvider(config);

      case "auth0":
        if (!isAuth0Config(config)) {
          throw new AuthError(
            "Invalid Auth0 configuration",
            "INVALID_CONFIG",
            "auth0",
          );
        }
        return ProviderFactory.createAuth0Provider(config);

      case "firebase":
        if (!isFirebaseConfig(config)) {
          throw new AuthError(
            "Invalid Firebase configuration",
            "INVALID_CONFIG",
            "firebase",
          );
        }
        return ProviderFactory.createFirebaseProvider(config);

      case "thunder":
        if (!isThunderConfig(config)) {
          throw new AuthError(
            "Invalid Thunder configuration",
            "INVALID_CONFIG",
            "thunder",
          );
        }
        return ProviderFactory.createThunderProvider(config);

      default:
        throw new AuthError(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          `Unsupported auth provider: ${(config as any).provider}`,
          "UNSUPPORTED_PROVIDER",
          "factory",
        );
    }
  }

  /**
   * Get list of supported providers
   */
  static getSupportedProviders(): ProviderType[] {
    return ["asgardeo", "auth0", "firebase"];
  }

  /**
   * Check if a provider is supported
   */
  static isProviderSupported(provider: string): provider is ProviderType {
    return ProviderFactory.getSupportedProviders().includes(
      provider as ProviderType,
    );
  }

  /**
   * Validate base configuration fields
   */
  private static validateBaseConfig(config: AuthConfig): void {
    const requiredFields = [
      "provider",
      // "clientID",
      // "signInRedirectURL",
      // "signOutRedirectURL",
      // "scope",
    ];

    for (const field of requiredFields) {
      if (!config[field as keyof AuthConfig]) {
        throw new AuthError(
          `Missing required configuration field: ${field}`,
          "MISSING_CONFIG_FIELD",
          config.provider || "unknown",
        );
      }
    }
  }

  /**
   * Create Asgardeo provider instance
   */
  private static createAsgardeoProvider(
    config: AsgardeoConfig,
  ): AuthProviderType {
    // Validate Asgardeo-specific fields
    if (!config.baseUrl) {
      throw new AuthError(
        "Missing required field: baseUrl",
        "MISSING_CONFIG_FIELD",
        "asgardeo",
      );
    }

    if (!ProviderFactory.isValidURL(config.baseUrl)) {
      throw new AuthError("Invalid baseUrl", "INVALID_URL", "asgardeo");
    }

    try {
      return new AsgardeoProvider({
        clientID: config.clientID,
        baseUrl: config.baseUrl,
        signInRedirectURL: config.signInRedirectURL,
        signOutRedirectURL: config.signOutRedirectURL,
        scope: config.scope,
      });
    } catch (error) {
      throw new AuthError(
        "Failed to create Asgardeo provider",
        "PROVIDER_INIT_FAILED",
        "asgardeo",
        error,
      );
    }
  }

  /**
   * Create Auth0 provider instance (placeholder for future implementation)
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static createAuth0Provider(config: Auth0Config): AuthProviderType {
    // TODO: Implement Auth0 provider
    throw new AuthError(
      "Auth0 provider not yet implemented",
      "PROVIDER_NOT_IMPLEMENTED",
      "auth0",
    );

    // Future implementation:
    // return new Auth0Provider({
    //   clientID: config.clientID,
    //   domain: config.domain,
    //   audience: config.audience,
    //   signInRedirectURL: config.signInRedirectURL,
    //   signOutRedirectURL: config.signOutRedirectURL,
    //   scope: config.scope
    // });
  }

  private static createThunderProvider(
    config: ThunderConfig,
  ): AuthProviderType {
    console.log(config);
    try {
      return new ThunderProvider();
    } catch (error) {
      throw new AuthError(
        "Failed to create Thunder provider",
        "PROVIDER_INIT_FAILED",
        "thunder",
        error,
      );
    }
  }

  /**
   * Create Firebase provider instance (placeholder for future implementation)
   */

  private static createFirebaseProvider(
    config: FirebaseConfig,
  ): AuthProviderType {
    // TODO: Implement Firebase provider

    if (config.apiKey && config.authDomain && config.projectId) {
      // Minimal validation passed
      try {
        return new FirebaseProvider({
          apiKey: config.apiKey,
          authDomain: config.authDomain,
          projectId: config.projectId,
          storageBucket: config.storageBucket,
          messagingSenderId: config.messagingSenderId,
          appId: config.appId,
          scope: config.scope,
        });
      } catch (error) {
        throw new AuthError(
          "Failed to create Firebase provider",
          "PROVIDER_INIT_FAILED",
          "firebase",
          error,
        );
      }
    } else {
      throw new AuthError(
        "Missing required Firebase configuration fields",
        "MISSING_CONFIG_FIELD",
        "firebase",
      );
    }
    // Future implementation:
    // return new FirebaseProvider({
    //   clientID: config.clientID,
    //   apiKey: config.apiKey,
    //   authDomain: config.authDomain,
    //   projectId: config.projectId,
    //   signInRedirectURL: config.signInRedirectURL,
    //   signOutRedirectURL: config.signOutRedirectURL,
    //   scope: config.scope
    // });
  }

  /**
   * Validate URL format
   */
  private static isValidURL(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Convenience function to create a provider
 * This is what developers will typically use
 */
export function createAuthProvider(config: AuthConfig): AuthProviderType {
  return ProviderFactory.createProvider(config);
}

/**
 * Helper function to validate configuration before creating provider
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function validateAuthConfig(config: any): config is AuthConfig {
  try {
    // Check if it has required base properties
    if (typeof config !== "object" || config === null) {
      return false;
    }

    const requiredFields = [
      "provider",
      "clientID",
      "signInRedirectURL",
      "signOutRedirectURL",
      "scope",
    ];

    for (const field of requiredFields) {
      if (!config[field]) {
        return false;
      }
    }

    // Check if provider is supported
    if (!ProviderFactory.isProviderSupported(config.provider)) {
      return false;
    }

    // Validate provider-specific requirements
    switch (config.provider) {
      case "asgardeo":
        return typeof config.baseUrl === "string" && config.baseUrl.length > 0;
      case "auth0":
        return typeof config.domain === "string" && config.domain.length > 0;
      case "firebase":
        return (
          typeof config.apiKey === "string" &&
          typeof config.authDomain === "string" &&
          typeof config.projectId === "string"
        );
      default:
        return false;
    }
  } catch {
    return false;
  }
}
