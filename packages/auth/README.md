# OHINO Auth (Local Profiles)

Minimal local-only profile service for OHINO-S.

- Local-only profiles (no external auth)
- User / Child profile models
- CRUD operations
- Persistence using the Core Storage (IndexedDB via localForage)
- Registerable with Engine ServiceLocator

Registering with the Engine

In your bootstrap code (see packages/navigation/src/appBootstrap.tsx), register the service:

engine.services.register('auth.profileService', async (locator) => {
  const storage = await locator.get('storage');
  return new ProfileService(storage);
});

Or use the helper exported by this package:

import { registerAuthServices } from '@ohino/auth';
registerAuthServices(engine.services);
