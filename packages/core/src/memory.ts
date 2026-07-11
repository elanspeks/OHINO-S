export type MemoryRecord = {
  id: string;
  namespace?: string;
  createdAt: number;
  updatedAt?: number;
  expiresAt?: number | null;
  content: any;
};

export class MemoryManager {
  private store = new Map<string, MemoryRecord[]>();

  constructor() {}

  save(namespace: string, record: MemoryRecord) {
    const list = this.store.get(namespace) || [];
    list.push(record);
    this.store.set(namespace, list);
  }

  query(namespace: string, predicate?: (r: MemoryRecord) => boolean) {
    const list = this.store.get(namespace) || [];
    if (!predicate) return list;
    return list.filter(predicate);
  }

  clear(namespace?: string) {
    if (namespace) this.store.delete(namespace);
    else this.store.clear();
  }
}
