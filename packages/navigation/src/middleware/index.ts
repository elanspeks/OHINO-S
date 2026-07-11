/**
 * Navigation Middleware
 * Handle navigation events, logging, analytics
 */

export interface NavigationMiddleware {
  name: string;
  handle: (context: any) => Promise<void>;
}

export class MiddlewareChain {
  private middlewares: NavigationMiddleware[] = [];

  use(middleware: NavigationMiddleware): this {
    this.middlewares.push(middleware);
    return this;
  }

  async execute(context: any): Promise<void> {
    let index = -1;

    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) return;
      index = i;

      const middleware = this.middlewares[i];
      if (!middleware) return;

      try {
        await middleware.handle(context);
        await dispatch(i + 1);
      } catch (error) {
        console.error(`Middleware '${middleware.name}' error:`, error);
      }
    };

    await dispatch(0);
  }
}

export const createMiddlewareChain = (): MiddlewareChain => {
  return new MiddlewareChain();
};

// Common middleware
export const loggingMiddleware: NavigationMiddleware = {
  name: 'logging',
  handle: async (context: any) => {
    console.log('[Navigation]', context.from, '->', context.to);
  },
};

export const analyticsMiddleware: NavigationMiddleware = {
  name: 'analytics',
  handle: async (context: any) => {
    console.log('[Analytics] Route change:', context.to);
  },
};

export const offlineSyncMiddleware: NavigationMiddleware = {
  name: 'offline-sync',
  handle: async (context: any) => {
    if (!navigator.onLine) {
      console.log('[Offline] Navigation in offline mode');
    }
  },
};
