/**
 * Context Analyzer
 * Analyzes conversation context for relevant information
 */

import type { ConversationMessage } from '@ohino/types';

export interface ContextAnalysis {
  topic: string;
  sentiment: 'positive' | 'negative' | 'neutral';
  intent: string;
  keyEntities: string[];
  references: string[];
}

export class ContextAnalyzer {
  analyzeMessages(messages: ConversationMessage[]): ContextAnalysis {
    if (messages.length === 0) {
      return {
        topic: 'general',
        sentiment: 'neutral',
        intent: 'unknown',
        keyEntities: [],
        references: [],
      };
    }

    const lastMessage = messages[messages.length - 1];
    const allText = messages.map((m) => m.content).join(' ');

    return {
      topic: this.extractTopic(allText),
      sentiment: this.analyzeSentiment(lastMessage.content),
      intent: this.extractIntent(lastMessage.content),
      keyEntities: this.extractEntities(allText),
      references: this.extractReferences(allText),
    };
  }

  private extractTopic(text: string): string {
    // Simple topic extraction
    const topics = [
      { word: 'learn', topic: 'education' },
      { word: 'help', topic: 'support' },
      { word: 'feel', topic: 'emotion' },
      { word: 'friend', topic: 'relationship' },
      { word: 'health', topic: 'wellness' },
    ];

    for (const { word, topic } of topics) {
      if (text.toLowerCase().includes(word)) {
        return topic;
      }
    }

    return 'general';
  }

  private analyzeSentiment(
    text: string
  ): 'positive' | 'negative' | 'neutral' {
    const positiveWords = ['good', 'great', 'happy', 'love', 'excellent'];
    const negativeWords = ['bad', 'sad', 'hate', 'terrible', 'awful'];

    const lowerText = text.toLowerCase();
    const positiveCount = positiveWords.filter((w) =>
      lowerText.includes(w)
    ).length;
    const negativeCount = negativeWords.filter((w) =>
      lowerText.includes(w)
    ).length;

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }

  private extractIntent(text: string): string {
    const intents = [
      { pattern: /how\s+to|help|explain/i, intent: 'learn' },
      { pattern: /what|tell|explain/i, intent: 'ask' },
      { pattern: /i\s+feel|emotion|mood/i, intent: 'share' },
      { pattern: /hello|hi|hey/i, intent: 'greet' },
    ];

    for (const { pattern, intent } of intents) {
      if (pattern.test(text)) {
        return intent;
      }
    }

    return 'query';
  }

  private extractEntities(text: string): string[] {
    // Simple entity extraction
    const words = text.split(/\s+/);
    return words
      .filter((w) => w.length > 4 && /^[A-Z]/.test(w))
      .slice(0, 5);
  }

  private extractReferences(text: string): string[] {
    // Extract references to previous messages
    const patterns = [
      /(?:earlier|before|you said|mentioned)\s+(.+?)(?:[.,]|$)/gi,
      /(?:regarding|about|concerning)\s+(.+?)(?:[.,]|$)/gi,
    ];

    const references: string[] = [];

    for (const pattern of patterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        references.push(match[1]);
      }
    }

    return references;
  }
}

export const createContextAnalyzer = (): ContextAnalyzer => {
  return new ContextAnalyzer();
};
