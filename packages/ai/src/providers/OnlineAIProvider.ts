/**
 * Online AI Provider
 * Connects to external AI services (OpenAI, Anthropic, etc.)
 */

import type { AIProvider, ProviderConfig, AIResponse } from '../types';
import type { ConversationContext } from '@ohino/types';

export class OnlineAIProvider implements AIProvider {
  id: string;
  name: string;
  type: 'online' = 'online';
  enabled: boolean;
  config: ProviderConfig;

  constructor(id: string, name: string, config: ProviderConfig) {
    this.id = id;
    this.name = name;
    this.config = config;
    this.enabled = true;
  }

  async isAvailable(): Promise<boolean> {
    // Check if online and API is accessible
    if (!navigator.onLine) {
      return false;
    }

    try {
      const response = await fetch(this.config.apiUrl || '', {
        method: 'HEAD',
        timeout: this.config.timeout || 5000,
      });
      return response.ok;
    } catch (error) {
      console.warn(`Online provider ${this.id} unavailable:`, error);
      return false;
    }
  }

  async process(
    input: string,
    context: ConversationContext
  ): Promise<AIResponse> {
    if (!this.config.apiKey || !this.config.apiUrl) {
      throw new Error('Online AI provider not configured');
    }

    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`,
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            {
              role: 'user',
              content: input,
            },
          ],
          temperature: this.config.temperature || 0.7,
          max_tokens: this.config.maxTokens || 1000,
        }),
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();

      return {
        id: crypto.randomUUID(),
        content: data.choices?.[0]?.message?.content || 'No response',
        module: context.module,
        confidence: 0.95,
        reasoning: 'Processed via online AI provider',
        offline: false,
      };
    } catch (error) {
      console.error('Online AI provider error:', error);
      throw error;
    }
  }
}

export const createOnlineProvider = (
  id: string,
  name: string,
  config: ProviderConfig
): OnlineAIProvider => {
  return new OnlineAIProvider(id, name, config);
};
