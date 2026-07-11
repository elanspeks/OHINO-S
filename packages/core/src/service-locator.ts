export type ServiceFactory<T = any> = (locator: ServiceLocator) => T | Promise<T>;

export class ServiceLocator {
  private factories = new Map<string, ServiceFactory>();
  private instances = new Map<string, any>();

  register<T>(key: string, factory: ServiceFactory<T>) {
    if (this.factories.has(key)) throw new Error(`Service already registered: ${key}`);
    this.factories.set(key, factory);
  }

  has(key: string) {
    return this.factories.has(key) || this.instances.has(key);
  }

  async get<T>(key: string): Promise<T> {
    if (this.instances.has(key)) return this.instances.get(key) as T;
    const factory = this.factories.get(key);
    if (!factory) throw new Error(`Service not found: ${key}`);
    const inst = await factory(this);
    this.instances.set(key, inst);
    return inst as T;
  }

  async initializeAll() {
    // initialize all registered factories so services are ready
    for (const key of this.factories.keys()) {
      await this.get(key);
    }
  }

  async shutdownAll() {
    for (const [key, inst] of this.instances) {
      if (inst && typeof inst.shutdown === 'function') {
        try {
          await inst.shutdown();
        } catch (e) {
          // ignore individual service shutdown errors
          // eslint-disable-next-line no-console
          console.warn(`Error shutting down service ${key}:`, e);
        }
      }
    }
    this.instances.clear();
  }
}
