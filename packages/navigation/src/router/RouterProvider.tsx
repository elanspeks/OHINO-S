import React, { createContext, useContext, useCallback, useState, useEffect } from 'react';
import type { NavigationState, NavigationContext } from '../types';

const RouterContext = createContext<NavigationContext | undefined>(undefined);

export interface RouterProviderProps {
  children: React.ReactNode;
  initialRoute?: string;
}

export const RouterProvider: React.FC<RouterProviderProps> = ({
  children,
  initialRoute = '/splash',
}) => {
  const [state, setState] = useState<NavigationState>({
    currentRoute: initialRoute,
    isOnline: navigator.onLine,
    isAuthenticated: false,
  });

  useEffect(() => {
    const handleOnline = () => setState((prev) => ({ ...prev, isOnline: true }));
    const handleOffline = () => setState((prev) => ({ ...prev, isOnline: false }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const navigate = useCallback(async (path: string) => {
    setState((prev) => ({
      ...prev,
      previousRoute: prev.currentRoute,
      currentRoute: path,
    }));
    window.history.pushState({}, '', path);
  }, []);

  const goBack = useCallback(() => {
    window.history.back();
  }, []);

  const canNavigate = useCallback((path: string): boolean => {
    // Check if user is authenticated for protected routes
    if (path.startsWith('/dashboard') || path.startsWith('/modules')) {
      return state.isAuthenticated;
    }
    return true;
  }, [state.isAuthenticated]);

  const value: NavigationContext = {
    navigate,
    goBack,
    canNavigate,
    state,
  };

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = (): NavigationContext => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within RouterProvider');
  }
  return context;
};
