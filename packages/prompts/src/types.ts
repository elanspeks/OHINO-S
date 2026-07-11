export type PromptTemplate = {
  id: string;
  title: string;
  description?: string;
  prompt: string;
  ownerModule?: string; // optional module id/slug that owns this prompt
  createdAt: number;
  updatedAt?: number;
};

export type ConversationMessage = {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
  createdAt: number;
  metadata?: Record<string, any>;
};

export type ConversationRecord = {
  id: string;
  title?: string;
  createdAt: number;
  updatedAt?: number;
  messageCount?: number;
};
