export type ModuleManifest = {
  id: string; // unique id
  name: string;
  slug: string; // used for routes: /modules/<slug>
  description?: string;
  version?: string;
  entry?: string; // module entry path
  capabilities?: string[];
};

export type ModuleInitializer = (context: { registerRoute: (path: string, component: any) => void; services: any }) => Promise<void> | void;
