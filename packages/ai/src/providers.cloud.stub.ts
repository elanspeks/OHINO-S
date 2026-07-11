import { AIProvider } from './providers';

export const CloudStubProvider: AIProvider = {
  id: 'cloud-stub',
  name: 'Cloud Stub Provider',
  async send(request) {
    await new Promise((r) => setTimeout(r, 250));
    return { id: `cloud_${Date.now()}`, text: `[CloudStub] Received: ${request.prompt}`, tokens: (request.prompt || '').split(' ').length };
  },
  async health() { return true; }
};
