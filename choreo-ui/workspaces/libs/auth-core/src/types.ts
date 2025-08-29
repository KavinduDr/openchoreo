// Common interfaces that all auth providers must implement

// Normalized user data structure - same across all providers
export interface User {
  name: string;
  email: string;
  roles: string[];
  scopes: string[];
  token: string;
}

// Base configuration that all providers need
export interface BaseAuthConfig {
  provider: string;
  clientID: string;
  signInRedirectURL: string;
  signOutRedirectURL: string;
  scope: string[];
}

// Provider-specific config extensions
export interface AsgardeoConfig extends BaseAuthConfig {
  provider: "asgardeo";
  baseUrl: string;
}

export interface Auth0Config extends BaseAuthConfig {
  provider: "auth0";
  domain: string;
  audience?: string;
}

export interface FirebaseConfig extends BaseAuthConfig {
  provider: "firebase";
  apiKey: string;
  authDomain: string;
  projectId: string;
}

// Union type for all supported provider configs
export type AuthConfig = AsgardeoConfig | Auth0Config | FirebaseConfig;

// Auth events that providers can emit
export interface AuthEvents {
  onLoginSuccess?: (user: User) => void;
  onLoginError?: (error: Error) => void;
  onLogout?: () => void;
  onTokenRefresh?: (token: string) => void;
  onTokenExpired?: () => void;
  onSessionExpired?: () => void;
}

// Configuration for the main AuthClient
export interface AuthClientConfig {
  // Auth provider config
  provider: AuthConfig["provider"];
  clientID: string;
  signInRedirectURL: string;
  signOutRedirectURL: string;
  domain?: string;
  audience?: string;
  scope?: string | string[];
  baseUrl: string;
  // Optional event handlers
  events?: AuthEvents;

  // Token refresh settings
  autoRefresh?: boolean;
  checkInterval?: number; // in minutes

  // Storage settings (for future use)
  storage?: "localStorage" | "sessionStorage" | "memory";
}

// Error types that providers should use
export class AuthError extends Error {
  constructor(
    message: string,
    public code: string,
    public provider: string,
    public originalError?: any
  ) {
    super(message);
    this.name = "AuthError";
  }
}

export class LoginError extends AuthError {
  constructor(message: string, provider: string, originalError?: any) {
    super(message, "LOGIN_FAILED", provider, originalError);
    this.name = "LoginError";
  }
}

export class TokenError extends AuthError {
  constructor(message: string, provider: string, originalError?: any) {
    super(message, "TOKEN_ERROR", provider, originalError);
    this.name = "TokenError";
  }
}

export class SessionExpiredError extends AuthError {
  constructor(provider: string, originalError?: any) {
    super("Session has expired", "SESSION_EXPIRED", provider, originalError);
    this.name = "SessionExpiredError";
  }
}

// Helper type for provider factory
export type ProviderType = AuthConfig["provider"];

// Type guards for config validation
export function isAsgardeoConfig(config: AuthConfig): config is AsgardeoConfig {
  return config.provider === "asgardeo";
}

export function isAuth0Config(config: AuthConfig): config is Auth0Config {
  return config.provider === "auth0";
}

export function isFirebaseConfig(config: AuthConfig): config is FirebaseConfig {
  return config.provider === "firebase";
}
