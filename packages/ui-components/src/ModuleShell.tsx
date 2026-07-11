import React from 'react';

type Props = {
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

export default function ModuleShell({ title, children, className = '' }: Props) {
  return (
    <div className={`ohino-module-shell ${className}`}>
      {title && <header style={{marginBottom:12}}><h1>{title}</h1></header>}
      <section>{children}</section>
    </div>
  );
}
