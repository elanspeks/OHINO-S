import React from 'react';

export interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {
  collapsed?: boolean;
  children: React.ReactNode;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ collapsed = false, children, ...props }, ref) => {
    return (
      <aside
        ref={ref}
        className={`
          bg-gray-50 border-r border-gray-200 transition-all duration-300
          ${collapsed ? 'w-20' : 'w-64'}
          overflow-hidden
        `}
        {...props}
      >
        <nav className="p-4 space-y-2">
          {children}
        </nav>
      </aside>
    );
  }
);

Sidebar.displayName = 'Sidebar';
