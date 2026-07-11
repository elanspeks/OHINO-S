import { AIProvider } from './providers';

export const LocalStubProvider: AIProvider = {
  id: 'local-stub',
  name: 'Local Stub Provider',
  async send(request) {
    // echo back the prompt with a small delay to simulate processing
    await new Promise((r) => setTimeout(r, 150));
    return { id: `resp_${Date.now()}`, text: `Stub reply: ${request.prompt}`, tokens: (request.prompt || '').split(' ').length };
  },
  async health() { return true; }
};
