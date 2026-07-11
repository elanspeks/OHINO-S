import React from 'react';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'ghost';
};

export default function Button({ children, variant = 'primary', className = '', ...rest }: Props) {
  const base = 'ohino-btn';
  const v = `ohino-btn--${variant}`;
  return (
    <button className={`${base} ${v} ${className}`} {...rest}>
      {children}
    </button>
  );
}
