/**
 * User Profile Management
 */

import type { UserProfile, ChildProfile, UserPreferences } from '@ohino/types';
import type { ProfileUpdatePayload, ChildProfileUpdatePayload } from '../types';

export class ProfileManager {
  async createUserProfile(data: {
    name: string;
    email?: string;
    age: number;
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  }): Promise<UserProfile> {
    const profile: UserProfile = {
      id: crypto.randomUUID(),
      name: data.name,
      email: data.email,
      age: data.age,
      learningStyle: data.learningStyle,
      preferences: this.getDefaultPreferences(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return profile;
  }

  async createChildProfile(data: {
    parentId: string;
    name: string;
    age: number;
    learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
    specialNeeds?: string[];
    allergies?: string[];
    medicalHistory?: string;
  }): Promise<ChildProfile> {
    const profile: ChildProfile = {
      id: crypto.randomUUID(),
      parentId: data.parentId,
      name: data.name,
      email: undefined,
      age: data.age,
      learningStyle: data.learningStyle,
      specialNeeds: data.specialNeeds,
      allergies: data.allergies,
      medicalHistory: data.medicalHistory,
      preferences: this.getDefaultPreferences(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    return profile;
  }

  async updateUserProfile(
    profile: UserProfile,
    updates: ProfileUpdatePayload
  ): Promise<UserProfile> {
    return {
      ...profile,
      ...updates,
      preferences: {
        ...profile.preferences,
        ...(updates.preferences || {}),
      },
      updatedAt: new Date(),
    };
  }

  async updateChildProfile(
    profile: ChildProfile,
    updates: ChildProfileUpdatePayload
  ): Promise<ChildProfile> {
    return {
      ...profile,
      ...updates,
      preferences: {
        ...profile.preferences,
        ...(updates.preferences || {}),
      },
      updatedAt: new Date(),
    };
  }

  private getDefaultPreferences(): UserPreferences {
    return {
      language: 'en',
      theme: 'auto',
      notifications: true,
      offlineMode: true,
      dataSharing: false,
      modulePreferences: {},
    };
  }
}

export const createProfileManager = (): ProfileManager => {
  return new ProfileManager();
};
