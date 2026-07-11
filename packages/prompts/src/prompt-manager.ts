import { Storage } from '@ohino/core';
import { PromptTemplate } from './types';

function makeId(prefix = 'p') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
}

const TEMPLATES_KEY = 'prompts:templates:v1';

export class PromptManager {
  private storage: Storage;

  constructor(storage: Storage) {
    this.storage = storage;
  }

  async listTemplates(): Promise<PromptTemplate[]> {
    const items = await this.storage.get<PromptTemplate[]>(TEMPLATES_KEY, []);
    return items || [];
  }

  async getTemplate(id: string): Promise<PromptTemplate | null> {
    const items = await this.listTemplates();
    return items.find(t => t.id === id) || null;
  }

  async createTemplate(data: { title: string; prompt: string; description?: string; ownerModule?: string }): Promise<PromptTemplate> {
    const templates = await this.listTemplates();
    const tpl: PromptTemplate = {
      id: makeId('tpl'),
      title: data.title,
      prompt: data.prompt,
      description: data.description,
      ownerModule: data.ownerModule,
      createdAt: Date.now(),
    };
    templates.push(tpl);
    await this.storage.set(TEMPLATES_KEY, templates);
    return tpl;
  }

  async updateTemplate(id: string, patch: Partial<Omit<PromptTemplate, 'id' | 'createdAt'>>): Promise<PromptTemplate> {
    const templates = await this.listTemplates();
    const idx = templates.findIndex(t => t.id === id);
    if (idx === -1) throw new Error('Template not found');
    const existing = templates[idx];
    const updated: PromptTemplate = { ...existing, ...patch, updatedAt: Date.now() };
    templates[idx] = updated;
    await this.storage.set(TEMPLATES_KEY, templates);
    return updated;
  }

  async deleteTemplate(id: string): Promise<void> {
    const templates = await this.listTemplates();
    const filtered = templates.filter(t => t.id !== id);
    await this.storage.set(TEMPLATES_KEY, filtered);
  }

  async findTemplatesByModule(moduleId: string): Promise<PromptTemplate[]> {
    const templates = await this.listTemplates();
    return templates.filter(t => t.ownerModule === moduleId);
  }
}
