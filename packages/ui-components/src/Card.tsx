import React from 'react';

type Props = {
  children: React.ReactNode;
  title?: string;
  className?: string;
};

export default function Card({ children, title, className = '' }: Props) {
  return (
    <div className={`ohino-card ${className}`}>
      {title && <div className="ohino-card__title">{title}</div>}
      <div className="ohino-card__body">{children}</div>
    </div>
  );
}
