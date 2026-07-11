# OHINO Prompts

PromptManager and ConversationHistoryService for OHINO-S.

This package provides a minimal prompt template manager and a conversation history service backed by the Core Storage (IndexedDB via localForage).

Design
- PromptManager stores templates under a single key and provides CRUD operations.
- ConversationHistoryService stores conversations as individual records and keeps an index of conversation IDs for fast listing.
- Both services are lightweight and designed to be registered with the Core Engine's ServiceLocator (see Core.Storage).

Integration
- These services accept a Storage instance (from @ohino/core) so they can be registered via engine.services.register('prompts', (locator) => new PromptManager(await locator.get('storage')))
- ChatView and AI ProviderManager can use ConversationHistoryService to persist chat messages.
