/**
 * AI Module Implementation
 */

import type { Module } from '@ohino/modules-system';
import type { ChatService } from '@ohino/ai';

export class AIModule implements Module {
  id = 'ai';
  name = 'OHINO-S AI';
  version = '1.0.0';
  description = 'Intelligent conversational AI assistant';
  author = 'OHINO Team';
  offlineCapable = true;
  requiredCapabilities = ['ai', 'chat', 'memory'];

  private chatService: ChatService | null = null;

  async init(): Promise<void> {
    console.log('[AI Module] Initializing OHINO-S AI');
    // Initialize AI-specific services
  }

  async destroy(): Promise<void> {
    console.log('[AI Module] Destroying OHINO-S AI');
  }

  setChatService(chatService: ChatService): void {
    this.chatService = chatService;
  }

  async processMessage(userId: string, message: string): Promise<string> {
    if (!this.chatService) {
      throw new Error('Chat service not initialized');
    }

    const conversation = this.chatService.createConversation(userId, this.id);
    const response = await this.chatService.sendMessage(
      conversation.id,
      message,
      'ai-assistant-system'
    );

    return response.content;
  }
}

export const createAIModule = (): AIModule => {
  return new AIModule();
};
