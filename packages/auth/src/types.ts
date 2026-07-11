export type ProfileRole = 'parent' | 'child' | 'user';

export type Profile = {
  id: string;
  name: string;
  role: ProfileRole;
  birthDate?: string | null; // ISO date string
  metadata?: Record<string, any>;
  createdAt: number;
  updatedAt?: number;
};
