import { Storage } from '@ohino/core';
import { ConversationMessage, ConversationRecord } from './types';

function makeId(prefix = 'c') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}

const CONVO_INDEX_KEY = 'prompts:convos:index:v1';
const CONVO_KEY_PREFIX = 'prompts:convo:'; // + id

export class ConversationHistoryService {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  private convoKey(id: string) {
    return `${CONVO_KEY_PREFIX}${id}`;
  }

  private async readIndex(): Promise<string[]> {
    return await this.storage.get<string[]>(CONVO_INDEX_KEY, []);
  }

  private async writeIndex(list: string[]) {
    return this.storage.set(CONVO_INDEX_KEY, list);
  }

  async createConversation(title?: string): Promise<ConversationRecord> {
    const id = makeId('convo');
    const rec: ConversationRecord = { id, title, createdAt: Date.now(), messageCount: 0 };
    await this.storage.set(this.convoKey(id), { meta: rec, messages: [] });
    const idx = await this.readIndex();
    idx.unshift(id);
    await this.writeIndex(idx);
    return rec;
  }

  async saveMessage(conversationId: string, message: Omit<ConversationMessage, 'id' | 'createdAt'>) {
    const key = this.convoKey(conversationId);
    const raw = await this.storage.get<{ meta: ConversationRecord; messages: ConversationMessage[] }>(key, null as any);
    if (!raw) throw new Error('Conversation not found');
    const msg: ConversationMessage = { id: makeId('m'), createdAt: Date.now(), ...message } as ConversationMessage;
    const messages = raw.messages || [];
    messages.push(msg);
    raw.messages = messages;
    raw.meta.updatedAt = Date.now();
    raw.meta.messageCount = messages.length;
    await this.storage.set(key, raw);
    return msg;
  }

  async getConversation(conversationId: string): Promise<{ meta: ConversationRecord; messages: ConversationMessage[] } | null> {
    const key = this.convoKey(conversationId);
    const raw = await this.storage.get<{ meta: ConversationRecord; messages: ConversationMessage[] }>(key, null as any);
    return raw || null;
  }

  async listConversations(limit = 50): Promise<ConversationRecord[]> {
    const idx = await this.readIndex();
    const slice = idx.slice(0, limit);
    const results: ConversationRecord[] = [];
    for (const id of slice) {
      const raw = await this.storage.get<{ meta: ConversationRecord; messages: ConversationMessage[] }>(this.convoKey(id), null as any);
      if (raw && raw.meta) results.push(raw.meta);
    }
    return results;
  }

  async deleteConversation(conversationId: string) {
    const key = this.convoKey(conversationId);
    await this.storage.remove(key);
    const idx = await this.readIndex();
    const filtered = idx.filter(i => i !== conversationId);
    await this.writeIndex(filtered);
  }

  // very simple search across messages (substring match)
  async searchMessages(query: string, limit = 50): Promise<ConversationMessage[]> {
    if (!query) return [];
    const idx = await this.readIndex();
    const results: ConversationMessage[] = [];
    for (const id of idx) {
      const raw = await this.storage.get<{ meta: ConversationRecord; messages: ConversationMessage[] }>(this.convoKey(id), null as any);
      if (!raw || !raw.messages) continue;
      for (const m of raw.messages) {
        if (typeof m.text === 'string' && m.text.toLowerCase().includes(query.toLowerCase())) {
          results.push(m);
          if (results.length >= limit) return results;
        }
      }
    }
    return results;
  }
}
