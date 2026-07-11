export type AIRequest = {
  id?: string;
  prompt: string;
  maxTokens?: number;
  temperature?: number;
  stream?: boolean;
  metadata?: Record<string, any>;
};

export type AIResponse = {
  id?: string;
  text: string;
  tokens?: number;
  finishReason?: string;
  metadata?: Record<string, any>;
};

export interface AIProvider {
  id: string;
  name: string;
  send(request: AIRequest): Promise<AIResponse>;
  health?(): Promise<boolean>;
  cancel?(requestId: string): Promise<void>;
}

// a very small in-memory queue for offline/send-later support
export type QueueEntry = {
  id: string;
  providerId?: string;
  request: AIRequest;
  enqueuedAt: number;
};
