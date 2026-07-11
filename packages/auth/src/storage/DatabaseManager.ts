/**
 * Database Manager
 * Manages SQLite/IndexedDB for structured data
 */

import type { UserProfile, ChildProfile, ConversationContext } from '@ohino/types';

export interface DatabaseConfig {
  name: string;
  version: number;
  offlineOnly?: boolean;
}

export class DatabaseManager {
  private dbName: string;
  private dbVersion: number;
  private offlineOnly: boolean;
  private db: IDBDatabase | null = null;

  constructor(config: DatabaseConfig) {
    this.dbName = config.name;
    this.dbVersion = config.version;
    this.offlineOnly = config.offlineOnly ?? true;
  }

  async initialize(): Promise<void> {
    console.log('Initializing Database:', this.dbName);

    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        this.setupObjectStores();
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;
        this.createObjectStores(db);
      };
    });
  }

  async saveUserProfile(profile: UserProfile): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['users'], 'readwrite');
      const store = tx.objectStore('users');
      const request = store.put(profile);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getUserProfile(userId: string): Promise<UserProfile | null> {
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['users'], 'readonly');
      const store = tx.objectStore('users');
      const request = store.get(userId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async saveChildProfile(profile: ChildProfile): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['children'], 'readwrite');
      const store = tx.objectStore('children');
      const request = store.put(profile);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getChildProfiles(parentId: string): Promise<ChildProfile[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['children'], 'readonly');
      const store = tx.objectStore('children');
      const index = store.index('parentId');
      const request = index.getAll(parentId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  async saveConversation(conversation: ConversationContext): Promise<void> {
    if (!this.db) return;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['conversations'], 'readwrite');
      const store = tx.objectStore('conversations');
      const request = store.put(conversation);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve();
    });
  }

  async getConversation(conversationId: string): Promise<ConversationContext | null> {
    if (!this.db) return null;

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['conversations'], 'readonly');
      const store = tx.objectStore('conversations');
      const request = store.get(conversationId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result || null);
    });
  }

  async getAllConversations(userId: string): Promise<ConversationContext[]> {
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const tx = this.db!.transaction(['conversations'], 'readonly');
      const store = tx.objectStore('conversations');
      const index = store.index('userId');
      const request = index.getAll(userId);

      request.onerror = () => reject(request.error);
      request.onsuccess = () => resolve(request.result);
    });
  }

  private setupObjectStores(): void {
    if (!this.db) return;
    // Object stores already created in onupgradeneeded
  }

  private createObjectStores(db: IDBDatabase): void {
    // Create users store
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'id' });
    }

    // Create children store
    if (!db.objectStoreNames.contains('children')) {
      const childStore = db.createObjectStore('children', { keyPath: 'id' });
      childStore.createIndex('parentId', 'parentId', { unique: false });
    }

    // Create conversations store
    if (!db.objectStoreNames.contains('conversations')) {
      const convStore = db.createObjectStore('conversations', { keyPath: 'id' });
      convStore.createIndex('userId', 'userId', { unique: false });
      convStore.createIndex('module', 'module', { unique: false });
    }

    // Create messages store
    if (!db.objectStoreNames.contains('messages')) {
      const msgStore = db.createObjectStore('messages', { keyPath: 'id' });
      msgStore.createIndex('conversationId', 'conversationId', { unique: false });
    }
  }

  async close(): Promise<void> {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

export const createDatabaseManager = (config?: Partial<DatabaseConfig>): DatabaseManager => {
  return new DatabaseManager({
    name: 'ohino-db',
    version: 1,
    ...config,
  });
};
