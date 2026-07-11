import React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  footer?: React.ReactNode;
  hoverable?: boolean;
  loading?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ title, description, footer, hoverable = false, loading = false, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          bg-white rounded-lg shadow-md p-4
          ${hoverable ? 'hover:shadow-lg transition-shadow cursor-pointer' : ''}
        `}
        {...props}
      >
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <>
            {title && <h3 className="text-lg font-semibold mb-2">{title}</h3>}
            {description && <p className="text-gray-600 text-sm mb-3">{description}</p>}
            <div>{children}</div>
            {footer && <div className="mt-4 pt-4 border-t border-gray-200">{footer}</div>}
          </>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
