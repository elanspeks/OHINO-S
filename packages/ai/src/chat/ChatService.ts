/**
 * Chat Service
 * Manages chat interactions, prompt injection, response processing
 */

import type { AIResponse, ConversationContext } from '@ohino/types';
import { PromptManager } from '@ohino/prompts';
import type { AIProviderRegistry } from '../providers';

export class ChatService {
  private providerRegistry: AIProviderRegistry;
  private promptManager: PromptManager;
  private conversationHistories: Map<string, ConversationContext> = new Map();

  constructor(
    providerRegistry: AIProviderRegistry,
    promptManager: PromptManager
  ) {
    this.providerRegistry = providerRegistry;
    this.promptManager = promptManager;
  }

  async sendMessage(
    conversationId: string,
    userMessage: string,
    promptTemplateId: string
  ): Promise<AIResponse> {
    // Get or create conversation
    let conversation = this.conversationHistories.get(conversationId);
    if (!conversation) {
      throw new Error(`Conversation ${conversationId} not found`);
    }

    // Get prompt template
    const promptTemplate = this.promptManager.getTemplate(promptTemplateId);
    if (!promptTemplate) {
      throw new Error(`Prompt template ${promptTemplateId} not found`);
    }

    // Render prompt with context
    const systemPrompt = this.promptManager.renderTemplate(promptTemplate, {
      userId: conversation.userId,
      module: conversation.module,
    });

    // Prepare context
    const context: any = {
      ...conversation,
      systemPrompt,
    };

    // Get response from provider
    const response = await this.providerRegistry.process(userMessage, context);

    // Update conversation history
    conversation.messages.push({
      id: crypto.randomUUID(),
      conversationId,
      role: 'user',
      content: userMessage,
      module: conversation.module,
      timestamp: new Date(),
    });

    conversation.messages.push({
      id: response.id,
      conversationId,
      role: 'assistant',
      content: response.content,
      module: conversation.module,
      timestamp: new Date(),
      metadata: {
        confidence: response.confidence,
        offline: response.offline,
      },
    });

    conversation.updatedAt = new Date();

    return response;
  }

  createConversation(userId: string, module: string): ConversationContext {
    const conversation: ConversationContext = {
      id: crypto.randomUUID(),
      userId,
      module,
      messages: [],
      archived: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    this.conversationHistories.set(conversation.id, conversation);
    return conversation;
  }

  getConversation(conversationId: string): ConversationContext | undefined {
    return this.conversationHistories.get(conversationId);
  }

  archiveConversation(conversationId: string): void {
    const conversation = this.conversationHistories.get(conversationId);
    if (conversation) {
      conversation.archived = true;
      conversation.updatedAt = new Date();
    }
  }

  deleteConversation(conversationId: string): void {
    this.conversationHistories.delete(conversationId);
  }
}

export const createChatService = (
  providerRegistry: AIProviderRegistry,
  promptManager: PromptManager
): ChatService => {
  return new ChatService(providerRegistry, promptManager);
};
