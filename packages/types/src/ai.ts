export interface AIResponse {
  id: string;
  content: string;
  module: string;
  confidence: number;
  reasoning: string;
  offline: boolean;
  suggestions?: string[];
  resources?: AIResource[];
}

export interface AIResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'exercise' | 'tool';
  url?: string;
  content?: string;
  metadata?: Record<string, any>;
}

export interface AIProvider {
  id: string;
  name: string;
  type: 'online' | 'local';
  enabled: boolean;
  config: Record<string, any>;
}
