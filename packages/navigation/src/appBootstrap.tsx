import React from 'react';
import { createRoot } from 'react-dom/client';
import { Engine, Storage, MemoryManager } from '@ohino/core';
import { ProviderManager } from '@ohino/ai';
import { registerRoute as globalRegisterRoute, clearRoutes } from './routeRegistry';
import { initializeAllModules } from '@ohino/modules-system';

// Import module registerers so they register their manifests with the modules-system
// We intentionally import them here to ensure modules are registered during bootstrap
import { registerModule as registerEducation } from '@ohino/modules/education';
import { registerModule as registerSpecialNeeds } from '@ohino/modules/special-needs';
import { registerModule as registerRelationships } from '@ohino/modules/relationships';
import { registerModule as registerMotivation } from '@ohino/modules/motivation';
import { registerModule as registerHealth } from '@ohino/modules/health';
import { registerModule as registerTechnology } from '@ohino/modules/technology';
import { registerModule as registerBibleStudy } from '@ohino/modules/bible-study';
import { registerModule as registerCreativity } from '@ohino/modules/creativity';

// Provider stubs are available in the ai package files
import { LocalStubProvider } from '@ohino/ai/src/providers.local.stub';
import { CloudStubProvider } from '@ohino/ai/src/providers.cloud.stub';

import { ProviderManager as PM } from '@ohino/ai';
import { AppRouter } from './router';

export async function bootstrapApp(rootSelector = '#root') {
  // create engine
  const engine = new Engine({ env: process.env.NODE_ENV === 'production' ? 'production' : 'development' });

  // register core services
  engine.services.register('storage', () => new Storage({ name: 'ohino_storage' }));
  engine.services.register('memory', () => new MemoryManager());

  // AI provider manager
  engine.services.register('ai.providerManager', () => {
    const pm = new PM();
    try { pm.register(LocalStubProvider); } catch (_) {}
    try { pm.register(CloudStubProvider); } catch (_) {}
    return pm;
  });

  // --- register auth and prompts services (minimal registration) ---
  // register auth.profileService via helper
  try {
    // lazy import to avoid circular dependencies during packaging
    const { registerAuthServices } = await import('@ohino/auth');
    registerAuthServices(engine.services);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Auth services registration skipped:', e);
  }

  try {
    const { PromptManager, ConversationHistoryService } = await import('@ohino/prompts');
    if (!engine.services.has('prompts.manager')) {
      engine.services.register('prompts.manager', async (loc) => {
        const storage = await loc.get('storage');
        return new PromptManager(storage as any);
      });
    }
    if (!engine.services.has('prompts.history')) {
      engine.services.register('prompts.history', async (loc) => {
        const storage = await loc.get('storage');
        return new ConversationHistoryService(storage as any);
      });
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn('Prompts services registration skipped:', e);
  }
  // --- end registration ---

  // initialize engine services
  await engine.initialize();

  // clear previous routes and let modules register route handlers
  clearRoutes();

  // ensure modules are registered (they call modules-system.registerModule when invoked)
  registerEducation();
  registerSpecialNeeds();
  registerRelationships();
  registerMotivation();
  registerHealth();
  registerTechnology();
  registerBibleStudy();
  registerCreativity();

  // run module initializers which will call registerRoute via the context
  await initializeAllModules({ registerRoute: globalRegisterRoute, services: { engine } });

  // mount React app
  const rootEl = document.querySelector(rootSelector) as HTMLElement | null;
  if (!rootEl) {
    // eslint-disable-next-line no-console
    console.error('Root element not found for selector', rootSelector);
    return;
  }

  const root = createRoot(rootEl);
  root.render(React.createElement(AppRouter));
}

// auto-bootstrap when loaded in browser if DOM ready
if (typeof window !== 'undefined') {
  if (document.readyState === 'complete' || document.readyState === 'interactive') {
    bootstrapApp().catch(err => console.error('Bootstrap failed', err));
  } else {
    window.addEventListener('DOMContentLoaded', () => {
      bootstrapApp().catch(err => console.error('Bootstrap failed', err));
    });
  }
}
