import { AIProvider, AIRequest, AIResponse, QueueEntry } from './providers';

export class ProviderManager {
  private providers = new Map<string, AIProvider>();
  private queue: QueueEntry[] = [];

  register(provider: AIProvider) {
    if (this.providers.has(provider.id)) throw new Error(`Provider already registered: ${provider.id}`);
    this.providers.set(provider.id, provider);
  }

  get(providerId: string) {
    return this.providers.get(providerId);
  }

  list() {
    return Array.from(this.providers.values());
  }

  async send(request: AIRequest, providerId?: string): Promise<AIResponse> {
    // pick provider
    const provider = providerId ? this.providers.get(providerId) : Array.from(this.providers.values())[0];
    if (!provider) throw new Error('No AI provider available');

    try {
      return await provider.send(request);
    } catch (e) {
      // enqueue for retry later
      const id = `q_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
      this.queue.push({ id, providerId: provider?.id, request, enqueuedAt: Date.now() });
      throw e;
    }
  }

  enqueue(request: AIRequest, providerId?: string) {
    const id = `q_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
    this.queue.push({ id, providerId, request, enqueuedAt: Date.now() });
    return id;
  }

  getQueue() {
    return this.queue.slice();
  }

  async processQueue() {
    const pending = this.queue.slice();
    this.queue = [];
    for (const entry of pending) {
      const p = entry.providerId ? this.providers.get(entry.providerId) : Array.from(this.providers.values())[0];
      if (!p) continue;
      try {
        await p.send(entry.request);
      } catch (e) {
        // re-enqueue failed entries
        this.queue.push(entry);
      }
    }
  }
}
