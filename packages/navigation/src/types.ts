import type { UserProfile } from '@ohino/types';

export interface RouteConfig {
  id: string;
  path: string;
  name: string;
  component: React.ComponentType<any>;
  protected?: boolean;
  requiredRole?: string[];
  icon?: React.ReactNode;
  label?: string;
  children?: RouteConfig[];
}

export interface NavigationState {
  currentRoute: string;
  previousRoute?: string;
  user?: UserProfile;
  isOnline: boolean;
  isAuthenticated: boolean;
}

export interface NavigationContext {
  navigate: (path: string) => Promise<void>;
  goBack: () => void;
  canNavigate: (path: string) => boolean;
  state: NavigationState;
}
