/**
 * Conversation History Management
 */

import type { ConversationContext, ConversationMessage } from '@ohino/types';

export class ConversationHistory {
  private conversations: Map<string, ConversationContext> = new Map();

  addConversation(conversation: ConversationContext): void {
    this.conversations.set(conversation.id, conversation);
  }

  getConversation(id: string): ConversationContext | undefined {
    return this.conversations.get(id);
  }

  getUserConversations(userId: string): ConversationContext[] {
    return Array.from(this.conversations.values()).filter(
      (c) => c.userId === userId
    );
  }

  getModuleConversations(
    userId: string,
    module: string
  ): ConversationContext[] {
    return Array.from(this.conversations.values()).filter(
      (c) => c.userId === userId && c.module === module
    );
  }

  addMessage(
    conversationId: string,
    message: ConversationMessage
  ): void {
    const conversation = this.conversations.get(conversationId);
    if (conversation) {
      conversation.messages.push(message);
      conversation.updatedAt = new Date();
    }
  }

  getMessages(conversationId: string): ConversationMessage[] {
    const conversation = this.conversations.get(conversationId);
    return conversation?.messages || [];
  }

  searchConversations(
    userId: string,
    query: string
  ): ConversationContext[] {
    return this.getUserConversations(userId).filter((c) => {
      const messageContent = c.messages
        .map((m) => m.content)
        .join(' ')
        .toLowerCase();
      return messageContent.includes(query.toLowerCase());
    });
  }

  deleteConversation(id: string): void {
    this.conversations.delete(id);
  }

  archiveConversation(id: string): void {
    const conversation = this.conversations.get(id);
    if (conversation) {
      conversation.archived = true;
      conversation.updatedAt = new Date();
    }
  }
}

export const createConversationHistory = (): ConversationHistory => {
  return new ConversationHistory();
};
