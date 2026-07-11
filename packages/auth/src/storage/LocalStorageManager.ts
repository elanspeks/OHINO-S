/**
 * Local Storage Manager
 * Manages browser localStorage and IndexedDB
 */

interface StorageData {
  key: string;
  value: any;
  timestamp: number;
  encrypted?: boolean;
}

export class LocalStorageManager {
  private prefix = 'ohino_';
  private encryptionEnabled = false;

  async initialize(encryptionEnabled: boolean = false): Promise<void> {
    this.encryptionEnabled = encryptionEnabled;
    console.log('Initializing LocalStorageManager', { encryptionEnabled });
  }

  async set(key: string, value: any): Promise<void> {
    const storageKey = this.prefix + key;
    const data: StorageData = {
      key,
      value,
      timestamp: Date.now(),
      encrypted: this.encryptionEnabled,
    };

    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.error('LocalStorage set error:', error);
      // Fallback to IndexedDB if localStorage is full
      await this.setIndexedDB(key, value);
    }
  }

  async get(key: string): Promise<any> {
    const storageKey = this.prefix + key;
    const data = localStorage.getItem(storageKey);

    if (!data) {
      // Try IndexedDB
      return this.getIndexedDB(key);
    }

    try {
      const parsed: StorageData = JSON.parse(data);
      return parsed.value;
    } catch (error) {
      console.error('LocalStorage get error:', error);
      return null;
    }
  }

  async remove(key: string): Promise<void> {
    const storageKey = this.prefix + key;
    localStorage.removeItem(storageKey);
    await this.removeIndexedDB(key);
  }

  async clear(): Promise<void> {
    const keys = Object.keys(localStorage);
    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        localStorage.removeItem(key);
      }
    });
  }

  async getAll(): Promise<Record<string, any>> {
    const result: Record<string, any> = {};
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      if (key.startsWith(this.prefix)) {
        const data = localStorage.getItem(key);
        if (data) {
          try {
            const parsed: StorageData = JSON.parse(data);
            result[parsed.key] = parsed.value;
          } catch (error) {
            console.error('Error parsing storage data:', error);
          }
        }
      }
    });

    return result;
  }

  private async setIndexedDB(key: string, value: any): Promise<void> {
    // IndexedDB implementation
    console.log('Storing in IndexedDB:', key);
  }

  private async getIndexedDB(key: string): Promise<any> {
    // IndexedDB implementation
    return null;
  }

  private async removeIndexedDB(key: string): Promise<void> {
    // IndexedDB implementation
  }
}

export const createLocalStorageManager = (
  encryptionEnabled: boolean = false
): LocalStorageManager => {
  const manager = new LocalStorageManager();
  manager.initialize(encryptionEnabled);
  return manager;
};
