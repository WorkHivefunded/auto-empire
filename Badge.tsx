import type { ReactNode } from 'react';

type Tone = 'neutral' | 'brand' | 'success' | 'warning' | 'error' | 'info';

const tones: Record<Tone, string> = {
  neutral: 'bg-ink-700 text-ink-100 border-ink-600',
  brand: 'bg-brand-600/15 text-brand-400 border-brand-600/40',
  success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/40',
  warning: 'bg-amber-500/15 text-amber-400 border-amber-500/40',
  error: 'bg-red-500/15 text-red-400 border-red-500/40',
  info: 'bg-sky-500/15 text-sky-400 border-sky-500/40',
};

export function Badge({ tone = 'neutral', children, className = '' }: { tone?: Tone; children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${tones[tone]} ${className}`}>
      {children}
    </span>
  );
}
