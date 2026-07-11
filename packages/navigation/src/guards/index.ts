/**
 * Navigation Guards
 * Protect routes, check authentication, verify permissions
 */

import type { RouteConfig, NavigationState } from '../types';
import type { UserProfile } from '@ohino/types';

export class NavigationGuard {
  private authGuards: Map<string, (state: NavigationState) => boolean> = new Map();
  private beforeGuards: ((from: string, to: string) => Promise<boolean>)[] = [];

  registerAuthGuard(
    routeId: string,
    guard: (state: NavigationState) => boolean
  ): void {
    this.authGuards.set(routeId, guard);
  }

  canAccess(route: RouteConfig, state: NavigationState): boolean {
    // Check if route is protected
    if (route.protected && !state.isAuthenticated) {
      return false;
    }

    // Check custom auth guard
    const guard = this.authGuards.get(route.id);
    if (guard && !guard(state)) {
      return false;
    }

    return true;
  }

  addBeforeGuard(
    guard: (from: string, to: string) => Promise<boolean>
  ): void {
    this.beforeGuards.push(guard);
  }

  async runBeforeGuards(from: string, to: string): Promise<boolean> {
    for (const guard of this.beforeGuards) {
      const canPass = await guard(from, to);
      if (!canPass) {
        return false;
      }
    }
    return true;
  }

  requiresAuth(route: RouteConfig): boolean {
    return route.protected === true;
  }

  requiresRole(route: RouteConfig, userRole: string): boolean {
    if (!route.requiredRole) {
      return true;
    }
    return route.requiredRole.includes(userRole);
  }
}

export const createNavigationGuard = (): NavigationGuard => {
  return new NavigationGuard();
};
