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

export class ThunderProvider {
  private cachedUser: User | null = null;
  private isInitialized = false;
  private authenticated = false;

  async login(username?: string, password?: string): Promise<void> {
    try {
      console.log("ThunderProvider: Starting login...", username, password);
      const userData = await Login(username || "", password || "");
      console.log("Raw login response:", userData);

      // Check if userData is valid
      if (!userData) {
        throw new Error("Login response is empty or undefined");
      }

      // Map the response to your User type
      this.cachedUser = {
        name: userData.username || username || "",
        email: userData.email || username || "",
        roles: userData.roles || [],
        scopes: userData.scopes || [],
        // Add other properties as needed based on your User type
      } as unknown as User;

      console.log("Mapped user data:", this.cachedUser);
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
