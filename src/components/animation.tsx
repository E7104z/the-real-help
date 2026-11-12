import type { ReactNode, HTMLAttributes } from 'react';

interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function FadeIn({ children, className = '', ...props }: FadeInProps) {
  return (
    <div className={`animate-fadeIn ${className}`} {...props}>
      {children}
    </div>
  );
}

interface StaggerChildrenProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function StaggerChildren({ children, className = '', ...props }: StaggerChildrenProps) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}
