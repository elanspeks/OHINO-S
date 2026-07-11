import type { AIResponse } from '@ohino/types';

export interface AIProvider {
  id: string;
  name: string;
  type: 'online' | 'local';
  enabled: boolean;
  process(input: string, context: any): Promise<AIResponse>;
  isAvailable(): Promise<boolean>;
}

export interface ProviderConfig {
  apiKey?: string;
  apiUrl?: string;
  model?: string;
  temperature?: number;
  maxTokens?: number;
  timeout?: number;
}
