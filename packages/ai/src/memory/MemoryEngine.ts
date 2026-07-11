/**
 * Memory Engine
 * Manages short-term and long-term memory for conversations
 */

import type { ConversationMessage } from '@ohino/types';

export interface Memory {
  id: string;
  type: 'short-term' | 'long-term';
  content: string;
  importance: number;
  createdAt: Date;
  expiresAt?: Date;
}

export class MemoryEngine {
  private shortTermMemory: Map<string, Memory[]> = new Map();
  private longTermMemory: Map<string, Memory[]> = new Map();
  private shortTermTimeout = 1 * 60 * 60 * 1000; // 1 hour
  private maxShortTermItems = 50;

  storeShortTermMemory(
    userId: string,
    content: string,
    importance: number = 0.5
  ): void {
    const memory: Memory = {
      id: crypto.randomUUID(),
      type: 'short-term',
      content,
      importance,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + this.shortTermTimeout),
    };

    if (!this.shortTermMemory.has(userId)) {
      this.shortTermMemory.set(userId, []);
    }

    const memories = this.shortTermMemory.get(userId)!;
    memories.push(memory);

    // Keep only recent items
    if (memories.length > this.maxShortTermItems) {
      memories.shift();
    }
  }

  storeLongTermMemory(
    userId: string,
    content: string,
    importance: number = 0.8
  ): void {
    const memory: Memory = {
      id: crypto.randomUUID(),
      type: 'long-term',
      content,
      importance,
      createdAt: new Date(),
    };

    if (!this.longTermMemory.has(userId)) {
      this.longTermMemory.set(userId, []);
    }

    this.longTermMemory.get(userId)!.push(memory);
  }

  getRelevantMemories(
    userId: string,
    query: string,
    limit: number = 10
  ): Memory[] {
    const allMemories: Memory[] = [
      ...(this.shortTermMemory.get(userId) || []),
      ...(this.longTermMemory.get(userId) || []),
    ];

    // Filter expired short-term memories
    const activeMemories = allMemories.filter((m) => {
      if (m.type === 'short-term' && m.expiresAt) {
        return m.expiresAt > new Date();
      }
      return true;
    });

    // Sort by relevance and importance
    return activeMemories
      .sort((a, b) => b.importance - a.importance)
      .slice(0, limit);
  }

  clearExpiredMemories(): void {
    const now = new Date();

    for (const [userId, memories] of this.shortTermMemory.entries()) {
      const active = memories.filter((m) => !m.expiresAt || m.expiresAt > now);
      if (active.length === 0) {
        this.shortTermMemory.delete(userId);
      } else {
        this.shortTermMemory.set(userId, active);
      }
    }
  }
}

export const createMemoryEngine = (): MemoryEngine => {
  return new MemoryEngine();
};
