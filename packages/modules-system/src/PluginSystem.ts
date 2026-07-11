/**
 * Plugin System
 * Dynamic plugin loading and execution
 */

export interface Plugin {
  id: string;
  name: string;
  version: string;
  dependencies?: string[];
  init?: () => Promise<void>;
  execute?: (input: any) => Promise<any>;
  destroy?: () => Promise<void>;
}

export class PluginSystem {
  private plugins: Map<string, Plugin> = new Map();
  private hooks: Map<string, Function[]> = new Map();

  registerPlugin(plugin: Plugin): void {
    this.plugins.set(plugin.id, plugin);
    console.log(`Registered plugin: ${plugin.id}@${plugin.version}`);
  }

  async loadPlugin(pluginId: string): Promise<void> {
    const plugin = this.plugins.get(pluginId);
    if (!plugin) {
      throw new Error(`Plugin ${pluginId} not found`);
    }

    // Load dependencies first
    if (plugin.dependencies) {
      for (const dep of plugin.dependencies) {
        await this.loadPlugin(dep);
      }
    }

    // Initialize plugin
    if (plugin.init) {
      try {
        await plugin.init();
        console.log(`Loaded plugin: ${pluginId}`);
      } catch (error) {
        console.error(`Failed to load plugin ${pluginId}:`, error);
        throw error;
      }
    }
  }

  registerHook(hookName: string, callback: Function): void {
    if (!this.hooks.has(hookName)) {
      this.hooks.set(hookName, []);
    }
    this.hooks.get(hookName)!.push(callback);
  }

  async executeHook(hookName: string, input?: any): Promise<any> {
    const hooks = this.hooks.get(hookName) || [];
    let result = input;

    for (const hook of hooks) {
      result = await hook(result);
    }

    return result;
  }

  getPlugin(pluginId: string): Plugin | undefined {
    return this.plugins.get(pluginId);
  }

  getAllPlugins(): Plugin[] {
    return Array.from(this.plugins.values());
  }
}

export const createPluginSystem = (): PluginSystem => {
  return new PluginSystem();
};
