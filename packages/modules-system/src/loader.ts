import { ModuleManifest } from './types';

export function validateManifest(manifest: ModuleManifest) {
  if (!manifest.id) throw new Error('Manifest must include id');
  if (!manifest.slug) throw new Error('Manifest must include slug');
  if (!manifest.name) throw new Error('Manifest must include name');
  return true;
}

export async function loadLocalModule(entryPath: string) {
  // for now, dynamic import is not used here to keep packages buildable;
  // modules should register themselves by importing the modules package when app boots.
  return { loaded: true, entryPath };
}
