/**
 * Route Definitions
 */

import type { RouteConfig } from '../types';

export const ROUTES: RouteConfig[] = [
  {
    id: 'splash',
    path: '/',
    name: 'Splash',
    component: null as any, // Will be imported in shell
    protected: false,
    label: 'Welcome',
  },
  {
    id: 'welcome',
    path: '/welcome',
    name: 'Welcome',
    component: null as any,
    protected: false,
    label: 'Welcome',
  },
  {
    id: 'dashboard',
    path: '/dashboard',
    name: 'Dashboard',
    component: null as any,
    protected: true,
    label: 'Dashboard',
  },
  {
    id: 'modules',
    path: '/modules',
    name: 'Module Launcher',
    component: null as any,
    protected: true,
    label: 'Modules',
  },
  {
    id: 'ai',
    path: '/modules/ai',
    name: 'OHINO-S AI',
    component: null as any,
    protected: true,
    label: 'AI',
  },
  {
    id: 'learn',
    path: '/modules/learn',
    name: 'OHINO-S Learn',
    component: null as any,
    protected: true,
    label: 'Learn',
  },
  {
    id: 'care',
    path: '/modules/care',
    name: 'OHINO-S Care',
    component: null as any,
    protected: true,
    label: 'Care',
  },
  {
    id: 'sense',
    path: '/modules/sense',
    name: 'OHINO-S Sense',
    component: null as any,
    protected: true,
    label: 'Sense',
  },
  {
    id: 'voice',
    path: '/modules/voice',
    name: 'OHINO-S Voice',
    component: null as any,
    protected: true,
    label: 'Voice',
  },
  {
    id: 'connect',
    path: '/modules/connect',
    name: 'OHINO-S Connect',
    component: null as any,
    protected: true,
    label: 'Connect',
  },
  {
    id: 'health',
    path: '/modules/health',
    name: 'OHINO-S Health',
    component: null as any,
    protected: true,
    label: 'Health',
  },
  {
    id: 'vision',
    path: '/modules/vision',
    name: 'OHINO-S Vision',
    component: null as any,
    protected: true,
    label: 'Vision',
  },
  {
    id: 'settings',
    path: '/settings',
    name: 'Settings',
    component: null as any,
    protected: true,
    label: 'Settings',
  },
  {
    id: 'profile',
    path: '/profile',
    name: 'Profile',
    component: null as any,
    protected: true,
    label: 'Profile',
  },
];

export const getRoute = (id: string): RouteConfig | undefined => {
  return ROUTES.find((route) => route.id === id);
};

export const getRouteByPath = (path: string): RouteConfig | undefined => {
  return ROUTES.find((route) => route.path === path);
};
