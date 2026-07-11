export interface ConversationMessage {
  id: string;
  conversationId: string;
  role: 'user' | 'assistant';
  content: string;
  module: string;
  timestamp: Date;
  metadata?: {
    confidence?: number;
    sources?: string[];
    tags?: string[];
    offline?: boolean;
  };
}

export interface ConversationContext {
  id: string;
  userId: string;
  childId?: string;
  module: string;
  title?: string;
  messages: ConversationMessage[];
  tags?: string[];
  archived: boolean;
  createdAt: Date;
  updatedAt: Date;
}
