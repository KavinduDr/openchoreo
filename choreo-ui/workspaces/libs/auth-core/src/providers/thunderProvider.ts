/* eslint-disable no-console */
import { logger } from "@open-choreo/logging";
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

  async login(email?: string, password?: string): Promise<void> {
    try {
      logger.log("ThunderProvider: Starting login...", email, password);
      const userData = await Login(email || "", password || "");
      logger.log("Raw login response:", userData);

      // Check if userData is valid
      if (!userData) {
        throw new Error("Login response is empty or undefined");
      }

      // Map the response to your User type
      this.cachedUser = {
        name: userData.username || email || "",
        email: userData.email || email || "",
        roles: userData.roles || [],
        scopes: userData.scopes || [],
        // Add other properties as needed based on your User type
      } as unknown as User;

      logger.log("Mapped user data:", this.cachedUser);
    } catch (error) {
      logger.error("Login failed:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    this.cachedUser = null;
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
