import { TextareaHTMLAttributes, forwardRef } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, helperText, id, className = '', ...props }, ref) => {
    const textareaId = id || props.name;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={textareaId}
            className="block text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1"
          >
            {label}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={`w-full rounded-lg border px-3 py-2 text-xs transition duration-150 outline-none
            bg-white text-slate-900 border-slate-300 placeholder:text-slate-400
            focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500
            dark:bg-slate-950 dark:border-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500
            dark:focus:border-emerald-500 dark:focus:ring-emerald-500
            ${error ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500 dark:border-rose-500' : ''}
            ${className}`}
          {...props}
        />
        {error ? (
          <p className="mt-1 text-[11px] text-rose-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1 text-[11px] text-slate-500 dark:text-slate-400">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
