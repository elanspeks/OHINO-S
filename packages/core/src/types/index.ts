/**
 * Core type definitions
 */

export interface OHINOConfig {
  aiProvider: string;
  storageType: 'sqlite' | 'indexeddb';
  offlineMode: boolean;
  cacheTimeout: number;
}

export interface UserProfile {
  id: string;
  name: string;
  age: number;
  learningStyle: string;
  preferences: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ChildProfile extends UserProfile {
  parentId: string;
  specialNeeds?: string[];
  allergies?: string[];
  medicalHistory?: string;
}

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  module: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

export interface ConversationContext {
  id: string;
  userId: string;
  module: string;
  messages: ConversationMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AIResponse {
  id: string;
  content: string;
  module: string;
  confidence: number;
  reasoning: string;
  offline: boolean;
}

export interface Module {
  id: string;
  name: string;
  version: string;
  description: string;
  offlineCapable: boolean;
  requiredCapabilities: string[];
  init: (config: OHINOConfig) => Promise<void>;
  process: (input: string, context: ConversationContext) => Promise<AIResponse>;
}
