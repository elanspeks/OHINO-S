import { ModuleManifest, ModuleInitializer } from './types';

type RegisteredModule = {
  manifest: ModuleManifest;
  initializer?: ModuleInitializer;
  initialized?: boolean;
};

const registry = new Map<string, RegisteredModule>();

export function registerModule(manifest: ModuleManifest, initializer?: ModuleInitializer) {
  if (!manifest || !manifest.id || !manifest.slug) throw new Error('Invalid module manifest');
  if (registry.has(manifest.id)) throw new Error(`Module already registered: ${manifest.id}`);
  // avoid slug duplication
  for (const m of registry.values()) {
    if (m.manifest.slug === manifest.slug) throw new Error(`Module slug already in use: ${manifest.slug}`);
  }
  registry.set(manifest.id, { manifest, initializer, initialized: false });
}

export function getRegisteredModules() {
  return Array.from(registry.values()).map(r => r.manifest);
}

export function getModuleBySlug(slug: string) {
  for (const r of registry.values()) {
    if (r.manifest.slug === slug) return r.manifest;
  }
  return null;
}

export async function initializeAllModules(context: { registerRoute: (path: string, component: any) => void; services: any }) {
  for (const [id, r] of registry.entries()) {
    if (r.initialized) continue;
    if (r.initializer) {
      try {
        await r.initializer({ registerRoute: context.registerRoute, services: context.services });
        r.initialized = true;
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(`Module ${id} init failed:`, e);
      }
    }
  }
}

export async function shutdownAllModules() {
  for (const [id, r] of registry.entries()) {
    if (r.initialized && r.initializer) {
      // no explicit shutdown hook for now; future improvement
      r.initialized = false;
    }
  }
  registry.clear();
}
