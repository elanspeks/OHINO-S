/**
 * AI Provider Registry
 * Manages multiple AI providers with fallback logic
 */

import type { AIProvider, AIResponse } from '../types';
import type { ConversationContext } from '@ohino/types';

export class AIProviderRegistry {
  private providers: Map<string, AIProvider> = new Map();
  private primaryProvider: string | null = null;
  private fallbackChain: string[] = [];

  registerProvider(provider: AIProvider): void {
    this.providers.set(provider.id, provider);
    console.log(`Registered AI provider: ${provider.id}`);
  }

  setPrimaryProvider(providerId: string): void {
    if (this.providers.has(providerId)) {
      this.primaryProvider = providerId;
      console.log(`Set primary provider: ${providerId}`);
    }
  }

  setFallbackChain(chain: string[]): void {
    this.fallbackChain = chain;
    console.log(`Set fallback chain: ${chain.join(' -> ')}`);
  }

  async getProvider(): Promise<AIProvider | null> {
    // Try primary provider
    if (this.primaryProvider) {
      const provider = this.providers.get(this.primaryProvider);
      if (provider && provider.enabled && (await provider.isAvailable())) {
        return provider;
      }
    }

    // Try fallback chain
    for (const providerId of this.fallbackChain) {
      const provider = this.providers.get(providerId);
      if (provider && provider.enabled && (await provider.isAvailable())) {
        return provider;
      }
    }

    // Return any available provider
    for (const provider of this.providers.values()) {
      if (provider.enabled && (await provider.isAvailable())) {
        return provider;
      }
    }

    return null;
  }

  async process(
    input: string,
    context: ConversationContext
  ): Promise<AIResponse> {
    const provider = await this.getProvider();

    if (!provider) {
      throw new Error('No AI provider available');
    }

    return provider.process(input, context);
  }

  getProviders(): AIProvider[] {
    return Array.from(this.providers.values());
  }

  getProvider(id: string): AIProvider | undefined {
    return this.providers.get(id);
  }
}

export const createProviderRegistry = (): AIProviderRegistry => {
  return new AIProviderRegistry();
};
