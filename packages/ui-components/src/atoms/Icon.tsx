import React from 'react';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  name:
    | 'home'
    | 'settings'
    | 'menu'
    | 'close'
    | 'search'
    | 'user'
    | 'chat'
    | 'book'
    | 'heart'
    | 'star';
  size?: number;
}

const icons: Record<string, React.ReactNode> = {
  home: '🏠',
  settings: '⚙️',
  menu: '☰',
  close: '✕',
  search: '🔍',
  user: '👤',
  chat: '💬',
  book: '📚',
  heart: '❤️',
  star: '⭐',
};

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ name, size = 24, ...props }, ref) => {
    return (
      <span {...props} style={{ fontSize: size, ...props.style }}>
        {icons[name] || '?'}
      </span>
    );
  }
);

Icon.displayName = 'Icon';
