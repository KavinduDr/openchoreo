/* eslint-disable no-console */
import { AsgardeoSPAClient, Hooks } from "@asgardeo/auth-spa";
import { User } from "../types";

// Configuration interface for Asgardeo
export interface AsgardeoConfig {
  clientID: string;
  baseUrl: string;
  signInRedirectURL: string;
  signOutRedirectURL: string;
  scope: string[];
}

export class AsgardeoProvider {
  private client: AsgardeoSPAClient;
  private cachedUser: User | null = null;
  private isInitialized = false;

  constructor(config: AsgardeoConfig) {
    // Get singleton instance
    this.client = AsgardeoSPAClient.getInstance();

    // Initialize the client - this is crucial and must complete before any other operations
    this.initializeClient(config);
  }

  private async initializeClient(config: AsgardeoConfig): Promise<void> {
    try {
      await this.client.initialize({
        clientID: config.clientID,
        baseUrl: config.baseUrl,
        signInRedirectURL: config.signInRedirectURL,
        signOutRedirectURL: config.signOutRedirectURL,
        scope: config.scope,
        enablePKCE: true,
        storage: "webWorker",
        resourceServerURLs: [config.baseUrl],
      });

      this.isInitialized = true;
      console.log("Asgardeo client initialized successfully");
    } catch (error) {
      console.error("Failed to initialize Asgardeo client:", error);
      throw error;
    }
  }

  private async ensureInitialized(): Promise<void> {
    if (!this.isInitialized) {
      // Wait a bit and try again, or throw error
      throw new Error("Asgardeo client not yet initialized");
    }
  }

  async login(): Promise<void> {
    try {
      await this.ensureInitialized();

      // Start the sign-in process
      await this.client.signIn();

      // After sign-in redirect, the user should be authenticated
      // Let's wait a moment and then get user data
      this.client.on(Hooks.SignIn, (response) => {
        alert("User signed in successfully");
        console.log(response);
      });
      setTimeout(async () => {
        try {
          await this.refreshUserData();
        } catch (error) {
          console.error("Failed to get user data after login:", error);
        }
      }, 1000);
    } catch (error) {
      console.error("Asgardeo login failed:", error);
      throw new Error("Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await this.ensureInitialized();
      await this.client.signOut();
      this.cachedUser = null;
    } catch (error) {
      console.error("Asgardeo logout failed:", error);
      throw new Error("Logout failed");
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      await this.ensureInitialized();

      const isAuth = await this.client.isAuthenticated();

      if (!isAuth) {
        this.cachedUser = null;
        return false;
      }

      // Check if we need to refresh user data
      if (!this.cachedUser) {
        try {
          await this.refreshUserData();
        } catch (error) {
          console.error("Failed to refresh user data:", error);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error("Error checking authentication:", error);
      this.cachedUser = null;
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      await this.ensureInitialized();
      return await this.client.getAccessToken();
    } catch (error) {
      console.error("Error getting token:", error);
      return null;
    }
  }

  async getUser(): Promise<User | null> {
    if (this.cachedUser) {
      return this.cachedUser;
    }

    try {
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        return null;
      }

      return this.cachedUser;
    } catch (error) {
      console.error("Error getting user:", error);
      return null;
    }
  }

  async hasScope(scope: string): Promise<boolean> {
    const user = await this.getUser();
    if (!user) return false;

    return user.scopes.includes(scope);
  }

  async hasRole(role: string): Promise<boolean> {
    const user = await this.getUser();
    if (!user) return false;

    return user.roles.includes(role);
  }

  async getScopes(): Promise<string[]> {
    const user = await this.getUser();
    return user?.scopes || [];
  }

  async getRoles(): Promise<string[]> {
    const user = await this.getUser();
    return user?.roles || [];
  }

  private async refreshUserData(): Promise<void> {
    try {
      await this.ensureInitialized();

      // Get user info and token
      const [basicUserInfo, accessToken, decodedIDToken] = await Promise.all([
        this.client.getBasicUserInfo(),
        this.client.getAccessToken(),
        this.client.getDecodedIDToken(),
      ]);

      // Normalize the data
      this.cachedUser = await this.normalizeUserData(
        basicUserInfo,
        accessToken,
        decodedIDToken,
      );

      console.log("User data refreshed:", this.cachedUser);
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      throw error;
    }
  }

  private async normalizeUserData(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    asgardeoUser: any,
    accessToken: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    decodedIDToken: any,
  ): Promise<User> {
    return {
      name:
        asgardeoUser?.displayName ||
        asgardeoUser?.username ||
        asgardeoUser?.given_name ||
        "Unknown",
      email: asgardeoUser?.email || "",
      // Extract roles from groups or custom claims
      roles: decodedIDToken?.groups || decodedIDToken?.roles || [],
      // Extract scopes from token or decoded token
      scopes: decodedIDToken?.scope?.split(" ") || [],
      token: accessToken,
    };
  }

  // Method to manually initialize (call this if needed)
  async initialize(): Promise<void> {
    if (!this.isInitialized) {
      // Re-initialize if needed
      throw new Error("Client initialization failed");
    }
  }
}
