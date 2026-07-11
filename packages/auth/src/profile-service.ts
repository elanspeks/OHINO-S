import { Storage } from '@ohino/core';
import { Profile } from './types';

const PROFILES_KEY = 'auth:profiles:v1';
const ACTIVE_KEY = 'auth:active:v1';

function makeId(prefix = 'profile') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}

export class ProfileService {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  async listProfiles(): Promise<Profile[]> {
    return (await this.storage.get<Profile[]>(PROFILES_KEY, [])) || [];
  }

  async getProfile(id: string): Promise<Profile | null> {
    const list = await this.listProfiles();
    return list.find(p => p.id === id) || null;
  }

  async createProfile(data: { name: string; role?: Profile['role']; birthDate?: string | null; metadata?: Record<string, any> }): Promise<Profile> {
    const list = await this.listProfiles();
    const p: Profile = {
      id: makeId(),
      name: data.name,
      role: data.role || 'user',
      birthDate: data.birthDate || null,
      metadata: data.metadata || {},
      createdAt: Date.now(),
    };
    list.push(p);
    await this.storage.set(PROFILES_KEY, list);
    return p;
  }

  async updateProfile(id: string, patch: Partial<Omit<Profile, 'id' | 'createdAt'>>): Promise<Profile> {
    const list = await this.listProfiles();
    const idx = list.findIndex(p => p.id === id);
    if (idx === -1) throw new Error('Profile not found');
    const existing = list[idx];
    const updated: Profile = { ...existing, ...patch, updatedAt: Date.now() } as Profile;
    list[idx] = updated;
    await this.storage.set(PROFILES_KEY, list);
    return updated;
  }

  async deleteProfile(id: string): Promise<void> {
    const list = await this.listProfiles();
    const filtered = list.filter(p => p.id !== id);
    await this.storage.set(PROFILES_KEY, filtered);
    const active = await this.getActiveProfileId();
    if (active === id) {
      await this.clearActiveProfile();
    }
  }

  async setActiveProfile(id: string | null): Promise<void> {
    await this.storage.set(ACTIVE_KEY, id);
  }

  async getActiveProfileId(): Promise<string | null> {
    return await this.storage.get<string | null>(ACTIVE_KEY, null as any);
  }

  async getActiveProfile(): Promise<Profile | null> {
    const id = await this.getActiveProfileId();
    if (!id) return null;
    return this.getProfile(id);
  }

  async clearActiveProfile(): Promise<void> {
    await this.storage.remove(ACTIVE_KEY);
  }
}
