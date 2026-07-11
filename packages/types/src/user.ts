export interface UserProfile {
  id: string;
  name: string;
  age: number;
  email?: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'mixed';
  preferences: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChildProfile extends UserProfile {
  parentId: string;
  specialNeeds?: string[];
  allergies?: string[];
  medicalHistory?: string;
  behaviorNotes?: string;
  therapeuticGoals?: string[];
}

export interface UserPreferences {
  language: string;
  theme: 'light' | 'dark' | 'auto';
  notifications: boolean;
  offlineMode: boolean;
  dataSharing: boolean;
  modulePreferences: Record<string, any>;
}
