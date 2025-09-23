/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { logger } from "@open-choreo/logging";
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth,
} from "firebase/auth";

export interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket?: string;
  messagingSenderId?: string;
  appId?: string;
  scope: string[];
}

export class FirebaseProvider {
  private app: any;
  private isInitialized = false;

  constructor(config: FirebaseConfig) {
    this.initializeApp(config);
  }

  private initializeApp(config: FirebaseConfig) {
    if (!this.isInitialized) {
      this.app = initializeApp(config);
      this.isInitialized = true;
    }
  }

  async register(email: string, password: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error("Firebase app not initialized");
    }
    // Implement Firebase registration logic here
    const auth = getAuth(this.app);
    logger.log("Firebase register called");

    try {
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Registered
          const user = userCredential.user;
          logger.log("User registered:", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          logger.error("Error registering:", errorCode, errorMessage);
          throw error;
        });
      logger.log("User registered successfully");
    } catch (error) {
      logger.error("Firebase registration error:", error);
      throw error;
    }
  }

  async login(email: string, password: string): Promise<void> {
    if (!this.isInitialized) {
      throw new Error("Firebase app not initialized");
    }
    // Implement Firebase login logic here
    const auth = getAuth(this.app);
    logger.log("Firebase login called");

    try {
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          logger.log("User signed in:", user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          logger.error("Error signing in:", errorCode, errorMessage);
          throw error;
        });
      logger.log("User signed in successfully");
    } catch (error) {
      logger.error("Firebase login error:", error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    if (!this.isInitialized) {
      throw new Error("Firebase app not initialized");
    }
    // Implement Firebase logout logic here
    const auth = getAuth(this.app);
    await signOut(auth);
    logger.log("Firebase logout called");
  }

  async getUser(): Promise<any> {
    if (!this.isInitialized) {
      throw new Error("Firebase app not initialized");
    }
    // Implement logic to get current user from Firebase
    const auth = getAuth(this.app);
    const user = auth.currentUser;
    if (user) {
      logger.log("Get Firebase user called", user);
      return {
        id: user.uid,
        email: user.email,
        // Add other user properties as needed
      };
    } else {
      logger.log("Get Firebase user called");
      return null; // Replace with actual user object
    }
  }

  async getToken(): Promise<string | null> {
    if (!this.isInitialized) {
      throw new Error("Firebase app not initialized");
    }
    // Implement logic to get current user's token from Firebase
    const auth = getAuth(this.app);
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      logger.log("Get Firebase token called");
      return token;
    } else {
      logger.log("Get Firebase token called");
      return null; // Replace with actual token
    }
  }

  async isAuthenticated(): Promise<boolean> {
    if (!this.isInitialized) {
      throw new Error("Firebase app not initialized");
    }
    // Implement logic to check if user is authenticated in Firebase
    const auth = getAuth(this.app);
    const user = auth.currentUser;
    logger.log("Is Firebase authenticated called");
    return !!user; // Return true if user is logged in, false otherwise
  }

  async hasScope(scope: string): Promise<boolean> {
    // Implement logic to check if user has specific scope
    logger.log("Firebase hasScope called for scope:", scope);
    return true; // Replace with actual scope check
  }

  async hasRole(role: string): Promise<boolean> {
    // Implement logic to check if user has specific role
    logger.log("Firebase hasRole called for role:", role);
    return true; // Replace with actual role check
  }

  async getScopes(): Promise<string[]> {
    // Implement logic to get all user scopes
    logger.log("Firebase getScopes called");
    return []; // Replace with actual scopes
  }

  async getRoles(): Promise<string[]> {
    // Implement logic to get all user roles
    logger.log("Firebase getRoles called");
    return []; // Replace with actual roles
  }
}
