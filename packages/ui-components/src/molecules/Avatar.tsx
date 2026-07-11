import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg';
  status?: 'online' | 'offline' | 'away';
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, initials, size = 'md', status, ...props }, ref) => {
    const sizeClasses = {
      sm: 'w-6 h-6 text-xs',
      md: 'w-10 h-10 text-sm',
      lg: 'w-16 h-16 text-xl',
    };

    const statusClasses = {
      online: 'bg-green-500',
      offline: 'bg-gray-400',
      away: 'bg-yellow-500',
    };

    return (
      <div ref={ref} className="relative inline-block" {...props}>
        {src ? (
          <img
            src={src}
            alt={alt}
            className={`${sizeClasses[size]} rounded-full object-cover`}
          />
        ) : (
          <div
            className={`${sizeClasses[size]} rounded-full bg-blue-500 text-white flex items-center justify-center font-semibold`}
          >
            {initials}
          </div>
        )}
        {status && (
          <div
            className={`
              absolute bottom-0 right-0 w-2 h-2 rounded-full border-2 border-white
              ${statusClasses[status]}
            `}
          />
        )}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
