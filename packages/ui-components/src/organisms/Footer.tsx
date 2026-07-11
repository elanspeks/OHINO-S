import React from 'react';

export interface FooterProps extends React.HTMLAttributes<HTMLFooterElement> {
  copyright?: string;
  links?: { label: string; href: string }[];
}

export const Footer = React.forwardRef<HTMLFooterElement, FooterProps>(
  ({ copyright, links, ...props }, ref) => {
    return (
      <footer
        ref={ref}
        className="bg-gray-100 border-t border-gray-200 py-6 px-6"
        {...props}
      >
        <div className="flex items-center justify-between">
          {copyright && <p className="text-gray-600 text-sm">{copyright}</p>}
          {links && (
            <div className="flex gap-6">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-gray-600 hover:text-gray-900 text-sm"
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}
        </div>
      </footer>
    );
  }
);

Footer.displayName = 'Footer';
