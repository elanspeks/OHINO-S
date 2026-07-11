import type { Module } from '@ohino/modules-system';

export class ConnectModule implements Module {
  id = 'connect';
  name = 'OHINO-S Connect';
  version = '1.0.0';
  description = 'Guidance for relationships and social interaction';
  author = 'OHINO Team';
  offlineCapable = true;
  requiredCapabilities = ['ai', 'storage'];

  private socialStories: Map<string, any> = new Map();
  private relationshipGuides: Map<string, any> = new Map();

  async init(): Promise<void> {
    console.log('[Connect Module] Initializing OHINO-S Connect');
    this.initializeResources();
  }

  async destroy(): Promise<void> {
    console.log('[Connect Module] Destroying OHINO-S Connect');
  }

  private initializeResources(): void {
    const stories = [
      { id: 'making-friends', title: 'Making New Friends' },
      { id: 'handling-conflict', title: 'Handling Conflict' },
      { id: 'family-time', title: 'Family Time' },
      { id: 'group-situations', title: 'Group Situations' },
    ];
    stories.forEach((s) => this.socialStories.set(s.id, s));
  }

  async getSocialStories(): Promise<any[]> {
    return Array.from(this.socialStories.values());
  }

  async getRelationshipGuide(topic: string): Promise<any> {
    return this.relationshipGuides.get(topic);
  }
}

export const createConnectModule = (): ConnectModule => {
  return new ConnectModule();
};
