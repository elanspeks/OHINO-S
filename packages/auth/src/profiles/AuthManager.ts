/**
 * Authentication Manager
 * Handles login, logout, session management
 */

import type { UserProfile, ChildProfile } from '@ohino/types';
import type { AuthState } from '../types';
import { ProfileManager } from './ProfileManager';

export class AuthManager {
  private authState: AuthState;
  private profileManager: ProfileManager;
  private sessionTimeout: NodeJS.Timeout | null = null;
  private sessionTimeoutMs = 24 * 60 * 60 * 1000; // 24 hours

  constructor() {
    this.profileManager = new ProfileManager();
    this.authState = {
      isAuthenticated: false,
      currentUser: null,
      currentChild: null,
      children: [],
      lastLogin: null,
      sessionToken: null,
    };
  }

  async login(userId: string): Promise<AuthState> {
    console.log('Logging in user:', userId);
    
    // Generate session token
    const sessionToken = crypto.randomUUID();
    const now = new Date();

    this.authState = {
      isAuthenticated: true,
      currentUser: {
        id: userId,
        name: 'User',
        age: 0,
        learningStyle: 'visual',
        preferences: {
          language: 'en',
          theme: 'auto',
          notifications: true,
          offlineMode: true,
          dataSharing: false,
          modulePreferences: {},
        },
        createdAt: now,
        updatedAt: now,
      },
      currentChild: null,
      children: [],
      lastLogin: now,
      sessionToken,
    };

    this.setupSessionTimeout();
    return this.authState;
  }

  async logout(): Promise<void> {
    console.log('Logging out user');
    this.clearSession();
    this.authState = {
      isAuthenticated: false,
      currentUser: null,
      currentChild: null,
      children: [],
      lastLogin: null,
      sessionToken: null,
    };
  }

  async selectChild(childId: string): Promise<AuthState> {
    const child = this.authState.children.find((c) => c.id === childId);
    if (child) {
      this.authState.currentChild = child;
    }
    return this.authState;
  }

  async addChild(childProfile: ChildProfile): Promise<void> {
    this.authState.children.push(childProfile);
  }

  isAuthenticated(): boolean {
    return this.authState.isAuthenticated;
  }

  getAuthState(): AuthState {
    return { ...this.authState };
  }

  private setupSessionTimeout(): void {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
    }

    this.sessionTimeout = setTimeout(() => {
      this.logout();
    }, this.sessionTimeoutMs);
  }

  private clearSession(): void {
    if (this.sessionTimeout) {
      clearTimeout(this.sessionTimeout);
      this.sessionTimeout = null;
    }
  }
}

export const createAuthManager = (): AuthManager => {
  return new AuthManager();
};
