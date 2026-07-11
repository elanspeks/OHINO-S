/**
 * Application Shell
 * Main layout structure and page wrappers
 */

import React, { useState } from 'react';
import { Header, Footer, Sidebar, Navigation } from '@ohino/ui-components';
import { useRouter } from '../router';

export interface AppShellProps {
  children: React.ReactNode;
  showSidebar?: boolean;
  navigationItems?: NavigationItem[];
}

interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path: string;
}

export const AppShell: React.FC<AppShellProps> = ({
  children,
  showSidebar = true,
  navigationItems = [],
}) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { state } = useRouter();

  return (
    <div className="flex h-screen flex-col">
      <Header
        title="OHINO-S"
        subtitle="Understanding Beyond Words"
        actions={
          <div className="flex items-center gap-4">
            <OfflineIndicator isOnline={state.isOnline} />
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              {sidebarCollapsed ? '☰' : '✕'}
            </button>
          </div>
        }
      />

      <div className="flex flex-1 overflow-hidden">
        {showSidebar && navigationItems.length > 0 && (
          <Sidebar collapsed={sidebarCollapsed}>
            <Navigation
              items={navigationItems.map((item) => ({
                id: item.id,
                label: item.label,
                icon: item.icon,
              }))}
              activeId={state.currentRoute}
            />
          </Sidebar>
        )}

        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>

      <Footer copyright="© 2026 OHINO-S. All rights reserved." />
    </div>
  );
};

interface OfflineIndicatorProps {
  isOnline: boolean;
}

const OfflineIndicator: React.FC<OfflineIndicatorProps> = ({ isOnline }) => {
  if (isOnline) return null;

  return (
    <div className="flex items-center gap-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
      📡 Offline Mode
    </div>
  );
};
