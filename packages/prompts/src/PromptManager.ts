/**
 * Prompt Management System
 */

export interface PromptTemplate {
  id: string;
  name: string;
  category: string;
  version: string;
  content: string;
  variables?: string[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PromptContext {
  userId: string;
  userName?: string;
  module: string;
  history?: string[];
  metadata?: Record<string, any>;
}

export class PromptManager {
  private templates: Map<string, PromptTemplate> = new Map();
  private versionHistory: Map<string, PromptTemplate[]> = new Map();

  registerTemplate(template: PromptTemplate): void {
    this.templates.set(template.id, template);
    console.log(`Registered prompt template: ${template.id}`);
  }

  getTemplate(id: string): PromptTemplate | undefined {
    return this.templates.get(id);
  }

  getTemplatesByCategory(category: string): PromptTemplate[] {
    return Array.from(this.templates.values()).filter(
      (t) => t.category === category
    );
  }

  renderTemplate(template: PromptTemplate, context: PromptContext): string {
    let prompt = template.content;

    // Replace variables
    if (template.variables) {
      template.variables.forEach((variable) => {
        const placeholder = `{{${variable}}}`;
        const value = (context as any)[variable] || '';
        prompt = prompt.replace(new RegExp(placeholder, 'g'), value);
      });
    }

    // Add context history
    if (context.history && context.history.length > 0) {
      prompt += `\n\nRecent Context:\n${context.history.join('\n')}`;
    }

    return prompt;
  }

  updateTemplate(id: string, updates: Partial<PromptTemplate>): void {
    const template = this.templates.get(id);
    if (!template) return;

    // Store version history
    if (!this.versionHistory.has(id)) {
      this.versionHistory.set(id, []);
    }
    this.versionHistory.get(id)!.push({ ...template });

    // Update template
    const updated: PromptTemplate = {
      ...template,
      ...updates,
      updatedAt: new Date(),
    };

    this.templates.set(id, updated);
    console.log(`Updated prompt template: ${id}`);
  }

  getVersionHistory(id: string): PromptTemplate[] {
    return this.versionHistory.get(id) || [];
  }

  deleteTemplate(id: string): void {
    this.templates.delete(id);
    console.log(`Deleted prompt template: ${id}`);
  }

  getAllTemplates(): PromptTemplate[] {
    return Array.from(this.templates.values());
  }
}

export const createPromptManager = (): PromptManager => {
  return new PromptManager();
};
