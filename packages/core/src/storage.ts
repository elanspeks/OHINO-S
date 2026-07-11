import localforage from 'localforage';

export type StorageOptions = {
  name?: string;
  storeName?: string;
};

export class Storage {
  private lf: LocalForage;

  constructor(options: StorageOptions = {}) {
    this.lf = localforage.createInstance({
      name: options.name || 'ohino_storage',
      storeName: options.storeName || 'keyvalue_pairs',
    });
  }

  async set<T>(key: string, value: T) {
    return this.lf.setItem(key, value) as Promise<T>;
  }

  async get<T>(key: string, fallback?: T) {
    const v = (await this.lf.getItem(key)) as T | null;
    return v === null ? fallback : v;
  }

  async remove(key: string) {
    return this.lf.removeItem(key);
  }

  async clear() {
    return this.lf.clear();
  }
}
