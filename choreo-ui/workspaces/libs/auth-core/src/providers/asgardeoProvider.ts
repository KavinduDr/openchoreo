import { AsgardeoSPAClient } from "@asgardeo/auth-spa";

// Configuration interface for Asgardeo
export interface AsgardeoConfig {
  clientID: string;
  baseUrl: string;
  signInRedirectURL: string;
  signOutRedirectURL: string;
  scope: string[];
}

// Normalized user data structure that your SDK will return
export interface NormalizedUser {
  name: string;
  email: string;
  roles: string[];
  scopes: string[];
  token: string;
}

export class AsgardeoProvider {
  private client: AsgardeoSPAClient;
  private cachedUser: NormalizedUser | null = null;

  constructor(config: AsgardeoConfig) {
    // Initialize Asgardeo client with configuration
    this.client = AsgardeoSPAClient.getInstance();

    // Configure the client
    this.client.initialize({
      clientID: config.clientID,
      baseUrl: config.baseUrl,
      signInRedirectURL: config.signInRedirectURL,
      signOutRedirectURL: config.signOutRedirectURL,
      scope: config.scope,
      // Add other Asgardeo-specific configurations as needed
      enablePKCE: true,
      storage: "webWorker",
    });
  }

  async login(): Promise<void> {
    try {
      // Step 1: Call Asgardeo login
      await this.client.signIn();

      // Step 2: Get user data after successful login
      const asgardeoUser = await this.client.getBasicUserInfo();
      const accessToken = await this.client.getAccessToken();
      const decodedIDToken = await this.client.getDecodedIDToken();

      // Step 3: Normalize the data to your standard format
      this.cachedUser = await this.normalizeUserData(
        asgardeoUser,
        accessToken,
        decodedIDToken
      );
    } catch (error) {
      console.error("Asgardeo login failed:", error);
      throw new Error("Login failed");
    }
  }

  async logout(): Promise<void> {
    try {
      await this.client.signOut();
      // Step 4: Clear cached data
      this.cachedUser = null;
    } catch (error) {
      console.error("Asgardeo logout failed:", error);
      throw new Error("Logout failed");
    }
  }

  async isAuthenticated(): Promise<boolean> {
    try {
      // Check token validity before each scope verification
      const isAuth = await this.client.isAuthenticated();

      if (!isAuth) {
        this.cachedUser = null;
        return false;
      }

      // Check if token needs refresh
      const accessToken = await this.client.getAccessToken();
      if (!accessToken || this.isTokenExpired(accessToken)) {
        try {
          // Try to refresh token
          await this.client.refreshAccessToken();
          // Refresh user data with new token
          await this.refreshUserData();
        } catch (refreshError) {
          this.cachedUser = null;
          console.error("Refresh Error", refreshError);
          return false;
        }
      }

      return true;
    } catch (error) {
      this.cachedUser = null;
      console.error("Error", error);
      return false;
    }
  }

  async getToken(): Promise<string | null> {
    try {
      return await this.client.getAccessToken();
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  }

  async getUser(): Promise<NormalizedUser | null> {
    // Return cached user if available
    if (this.cachedUser) {
      return this.cachedUser;
    }

    // If not cached, try to get fresh data
    try {
      const isAuth = await this.isAuthenticated();
      if (!isAuth) {
        return null;
      }

      // Get fresh user data
      const asgardeoUser = await this.client.getBasicUserInfo();
      const accessToken = await this.client.getAccessToken();
      const decodedIDToken = await this.client.getDecodedIDToken();

      this.cachedUser = await this.normalizeUserData(
        asgardeoUser,
        accessToken,
        decodedIDToken
      );

      return this.cachedUser;
    } catch (error) {
      console.error("Error", error);
      return null;
    }
  }

  // Check if user has specific scopes
  async hasScope(scope: string): Promise<boolean> {
    const user = await this.getUser();
    if (!user) return false;

    return user.scopes.includes(scope);
  }

  // Check if user has specific roles
  async hasRole(role: string): Promise<boolean> {
    const user = await this.getUser();
    if (!user) return false;

    return user.roles.includes(role);
  }

  // Get all user scopes
  async getScopes(): Promise<string[]> {
    const user = await this.getUser();
    return user?.scopes || [];
  }

  // Get all user roles
  async getRoles(): Promise<string[]> {
    const user = await this.getUser();
    return user?.roles || [];
  }

  // Private method to normalize Asgardeo user data to your standard format
  private async normalizeUserData(
    asgardeoUser: any,
    accessToken: string,
    decodedIDToken: any
  ): Promise<NormalizedUser> {
    return {
      name: asgardeoUser.displayName || asgardeoUser.username || "",
      email: asgardeoUser.email || "",
      // Extract roles from groups or custom claims
      roles: decodedIDToken.groups || [],
      // Extract scopes from token
      scopes: decodedIDToken.scope?.split(" ") || [],
      token: accessToken,
    };
  }

  // Private method to check if token is expired
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      const currentTime = Math.floor(Date.now() / 1000);
      return payload.exp < currentTime;
    } catch {
      return true;
    }
  }

  // Private method to refresh user data when token is refreshed
  private async refreshUserData(): Promise<void> {
    try {
      const asgardeoUser = await this.client.getBasicUserInfo();
      const accessToken = await this.client.getAccessToken();
      const decodedIDToken = await this.client.getDecodedIDToken();

      const newUserData = await this.normalizeUserData(
        asgardeoUser,
        accessToken,
        decodedIDToken
      );

      // Keep old roles if new fetch fails, as per your preference
      if (
        this.cachedUser &&
        (!newUserData.roles.length || !newUserData.scopes.length)
      ) {
        newUserData.roles = this.cachedUser.roles;
        newUserData.scopes = this.cachedUser.scopes;
      }

      this.cachedUser = newUserData;
    } catch (error) {
      console.error("Failed to refresh user data:", error);
      // Keep existing cached user data on failure
    }
  }
}
