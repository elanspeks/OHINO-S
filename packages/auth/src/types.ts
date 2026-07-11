import type { UserProfile, ChildProfile, UserPreferences } from '@ohino/types';

export interface AuthState {
  isAuthenticated: boolean;
  currentUser: UserProfile | null;
  currentChild: ChildProfile | null;
  children: ChildProfile[];
  lastLogin: Date | null;
  sessionToken: string | null;
}

export interface ProfileUpdatePayload {
  name?: string;
  email?: string;
  age?: number;
  learningStyle?: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  preferences?: Partial<UserPreferences>;
}

export interface ChildProfileUpdatePayload extends ProfileUpdatePayload {
  specialNeeds?: string[];
  allergies?: string[];
  medicalHistory?: string;
  behaviorNotes?: string;
  therapeuticGoals?: string[];
}
