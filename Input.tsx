import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes, ReactNode } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export function Input({ label, error, icon, className = '', id, ...rest }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label-base">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-400">{icon}</span>}
        <input id={id} className={`input-base ${icon ? 'pl-10' : ''} ${error ? 'border-brand-500 ring-2 ring-brand-500/30' : ''} ${className}`} {...rest} />
      </div>
      {error && <p className="mt-1 text-xs text-brand-400">{error}</p>}
    </div>
  );
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, error, className = '', id, children, ...rest }: SelectProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label-base">
          {label}
        </label>
      )}
      <select id={id} className={`input-base appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%239a9aa3%22 stroke-width=%222%22><path d=%22M4 6l4 4 4-4%22/></svg>')] bg-[right_0.75rem_center] bg-no-repeat pr-9 ${error ? 'border-brand-500 ring-2 ring-brand-500/30' : ''} ${className}`} {...rest}>
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-brand-400">{error}</p>}
    </div>
  );
}

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className = '', id, ...rest }: TextareaProps) {
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="label-base">
          {label}
        </label>
      )}
      <textarea id={id} className={`input-base resize-none ${error ? 'border-brand-500 ring-2 ring-brand-500/30' : ''} ${className}`} {...rest} />
      {error && <p className="mt-1 text-xs text-brand-400">{error}</p>}
    </div>
  );
}
