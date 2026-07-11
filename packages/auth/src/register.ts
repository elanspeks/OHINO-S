import { ServiceLocator } from '@ohino/core';
import { ProfileService } from './profile-service';

export function registerAuthServices(locator: ServiceLocator) {
  // Register profile service under a known key
  if (locator.has('auth.profileService')) return;
  locator.register('auth.profileService', async (loc: ServiceLocator) => {
    const storage = await loc.get('storage');
    return new ProfileService(storage);
  });
}
