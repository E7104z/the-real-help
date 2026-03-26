import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={cn(
            'flex h-10 w-full rounded-lg border bg-white px-3 py-2 text-sm text-brand-black placeholder:text-brand-silver-400 transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-blue focus-visible:ring-offset-1',
            'disabled:cursor-not-allowed disabled:opacity-50',
            error
              ? 'border-status-error focus-visible:ring-status-error'
              : 'border-brand-silver-300',
            className,
          )}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-sm text-status-error">{error}</p>
        ) : null}
      </div>
    );
  },
);

Input.displayName = 'Input';
