import React from 'react';

export interface HeaderProps extends React.HTMLAttributes<HTMLHeaderElement> {
  title?: string;
  subtitle?: string;
  logo?: React.ReactNode;
  actions?: React.ReactNode;
  transparent?: boolean;
}

export const Header = React.forwardRef<HTMLHeaderElement, HeaderProps>(
  ({ title, subtitle, logo, actions, transparent = false, ...props }, ref) => {
    return (
      <header
        ref={ref}
        className={`
          py-4 px-6 border-b
          ${transparent ? 'bg-transparent border-transparent' : 'bg-white border-gray-200'}
        `}
        {...props}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {logo && <div className="flex-shrink-0">{logo}</div>}
            <div>
              {title && <h1 className="text-2xl font-bold">{title}</h1>}
              {subtitle && <p className="text-gray-500 text-sm">{subtitle}</p>}
            </div>
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </div>
      </header>
    );
  }
);

Header.displayName = 'Header';
