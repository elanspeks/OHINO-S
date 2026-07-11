import React from 'react';

export interface NavItemProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  icon?: React.ReactNode;
  label: string;
  active?: boolean;
  badge?: number;
}

export const NavItem = React.forwardRef<HTMLAnchorElement, NavItemProps>(
  ({ icon, label, active = false, badge, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={`
          flex items-center gap-3 px-4 py-2 rounded-lg transition-colors
          ${active ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}
        `}
        {...props}
      >
        {icon && <span className="flex-shrink-0">{icon}</span>}
        <span className="flex-1">{label}</span>
        {badge !== undefined && (
          <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {badge}
          </span>
        )}
      </a>
    );
  }
);

NavItem.displayName = 'NavItem';
