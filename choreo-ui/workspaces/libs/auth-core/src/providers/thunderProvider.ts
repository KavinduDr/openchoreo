/* eslint-disable no-console */
import { User } from "../types";
import { Login } from "./apis/thunderAPI";

// Configuration interface for Thunder
export interface ThunderConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  scope: string[];
}

interface JWTPayload {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  jti: string;
  nbf: number;
  sub: string;
}

export class ThunderProvider {
  private cachedUser: User | null = null;
  private accessToken: string | null = null;
  private isInitialized = false;
  private authenticated = false;

  private decodeJWT(token: string): JWTPayload | null {
    try {
      // Split the JWT into parts
      const parts = token.split(".");
      if (parts.length !== 3) {
        throw new Error("Invalid JWT format");
      }

      // Decode the payload (second part)
      const payload = parts[1];

      // Add padding if necessary
      const paddedPayload =
        payload + "=".repeat((4 - (payload.length % 4)) % 4);

      // Decode base64
      const decodedPayload = atob(paddedPayload);

      // Parse JSON
      const parsedPayload: JWTPayload = JSON.parse(decodedPayload);

      console.log("Decoded JWT payload:", parsedPayload);
      return parsedPayload;
    } catch (error) {
      console.error("Failed to decode JWT:", error);
      return null;
    }
  }

  async login(username?: string, password?: string): Promise<void> {
    try {
      console.log("ThunderProvider: Starting login...", username, password);
      const userData = await Login(username || "", password || "");
      console.log("Raw login response:", userData);

      // Check if userData is valid
      if (!userData) {
        throw new Error("Login response is empty or undefined");
      }

      const { assertion } = userData;

      if (!assertion) {
        throw new Error("No assertion token received from login response");
      }

      this.accessToken = assertion;

      const decodedJwtPayload = this.decodeJWT(this.accessToken);
      if (!decodedJwtPayload) {
        throw new Error("Failed to decode JWT token");
      }

      console.log("Decoded JWT Payload:", decodedJwtPayload);

      // Map the response to your User type
      this.cachedUser = {
        name: userData.username || username || "",
        // email: decodedJwtPayload.email || username || "",
        // roles: decodedJwtPayload.roles || [],
        // scopes: decodedJwtPayload.scopes || [],
        id: decodedJwtPayload.sub || "",
        // Add other properties as needed based on your User type
      } as unknown as User;

      console.log("Mapped user data:", this.cachedUser);
      console.log("Access Token:", this.accessToken);
      this.authenticated = true;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.cachedUser = null;
    this.authenticated = false;
  }

  async isAuthenticated(): Promise<boolean> {
    return this.cachedUser !== null;
  }

  async getToken(): Promise<string | null> {
    return null;
  }

  async getUser(): Promise<User | null> {
    return this.cachedUser;
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
}
