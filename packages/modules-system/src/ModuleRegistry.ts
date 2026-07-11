/**
 * Module Registry
 * Central registry for all OHINO modules
 */

export interface Module {
  id: string;
  name: string;
  version: string;
  description: string;
  author?: string;
  offlineCapable: boolean;
  requiredCapabilities: string[];
  init: () => Promise<void>;
  destroy?: () => Promise<void>;
}

export class ModuleRegistry {
  private modules: Map<string, Module> = new Map();
  private loadedModules: Set<string> = new Set();

  registerModule(module: Module): void {
    this.modules.set(module.id, module);
    console.log(`Registered module: ${module.id}@${module.version}`);
  }

  async initializeModule(moduleId: string): Promise<void> {
    const module = this.modules.get(moduleId);
    if (!module) {
      throw new Error(`Module ${moduleId} not found`);
    }

    if (this.loadedModules.has(moduleId)) {
      console.log(`Module ${moduleId} already initialized`);
      return;
    }

    try {
      await module.init();
      this.loadedModules.add(moduleId);
      console.log(`Initialized module: ${moduleId}`);
    } catch (error) {
      console.error(`Failed to initialize module ${moduleId}:`, error);
      throw error;
    }
  }

  async initializeAll(): Promise<void> {
    for (const moduleId of this.modules.keys()) {
      try {
        await this.initializeModule(moduleId);
      } catch (error) {
        console.error(`Failed to initialize module ${moduleId}:`, error);
      }
    }
  }

  async destroyModule(moduleId: string): Promise<void> {
    const module = this.modules.get(moduleId);
    if (!module) return;

    if (module.destroy) {
      await module.destroy();
    }

    this.loadedModules.delete(moduleId);
    console.log(`Destroyed module: ${moduleId}`);
  }

  getModule(moduleId: string): Module | undefined {
    return this.modules.get(moduleId);
  }

  getAllModules(): Module[] {
    return Array.from(this.modules.values());
  }

  getLoadedModules(): Module[] {
    return Array.from(this.modules.values()).filter((m) =>
      this.loadedModules.has(m.id)
    );
  }

  isModuleLoaded(moduleId: string): boolean {
    return this.loadedModules.has(moduleId);
  }
}

export const createModuleRegistry = (): ModuleRegistry => {
  return new ModuleRegistry();
};
