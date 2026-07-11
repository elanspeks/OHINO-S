import { registerModule as msRegisterModule } from '@ohino/modules-system';
import manifest from './manifest';
import ModulePage from './ui/ModulePage';

export function registerModule() {
  msRegisterModule(manifest as any, ({ registerRoute }) => {
    registerRoute(`/modules/${(manifest as any).slug}`, ModulePage);
  });
}

export { manifest };
