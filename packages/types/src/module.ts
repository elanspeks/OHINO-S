export interface ModuleMetadata {
  id: string;
  name: string;
  version: string;
  description: string;
  author: string;
  offlineCapable: boolean;
  requiredCapabilities: string[];
}

export interface ModuleConfig {
  id: string;
  enabled: boolean;
  priority: number;
  settings: Record<string, any>;
}
