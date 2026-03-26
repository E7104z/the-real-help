import type { ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
}

export function FormField({ label, htmlFor, error, required, children, className }: FormFieldProps) {
  return (
    <div className={cn('space-y-1.5', className)}>
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-brand-silver-700"
      >
        {label}
        {required ? <span className="text-status-error ml-0.5">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="text-sm text-status-error">{error}</p>
      ) : null}
    </div>
  );
}
