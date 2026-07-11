import React from 'react';

export interface NavigationProps extends React.HTMLAttributes<HTMLNavElement> {
  items: NavigationItem[];
  onNavigate?: (id: string) => void;
  activeId?: string;
}

interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  badge?: number;
}

export const Navigation = React.forwardRef<HTMLNavElement, NavigationProps>(
  ({ items, onNavigate, activeId, ...props }, ref) => {
    return (
      <nav ref={ref} className="flex flex-col gap-2" {...props}>
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={`
              flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-left
              ${activeId === item.id ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}
            `}
          >
            {item.icon && <span>{item.icon}</span>}
            <span className="flex-1">{item.label}</span>
            {item.badge !== undefined && (
              <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>
    );
  }
);

Navigation.displayName = 'Navigation';
