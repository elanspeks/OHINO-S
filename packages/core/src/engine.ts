import { ServiceLocator } from './service-locator';

export type EngineOptions = {
  env?: 'development' | 'production';
};

export class Engine {
  private locator: ServiceLocator;
  private initialized = false;

  constructor(private options: EngineOptions = {}) {
    this.locator = new ServiceLocator();
  }

  get services() {
    return this.locator;
  }

  async initialize() {
    if (this.initialized) return;
    // initialize services with lifecycle order
    await this.locator.initializeAll();
    this.initialized = true;
  }

  async shutdown() {
    await this.locator.shutdownAll();
    this.initialized = false;
  }
}
