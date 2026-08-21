import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  actionTo?: string;
  actionLabel?: string;
  children?: ReactNode;
}

export function SectionHeader({ eyebrow, title, description, actionTo, actionLabel }: SectionHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="section-eyebrow mb-2">{eyebrow}</p>}
        <h2 className="font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{title}</h2>
        {description && <p className="mt-2 max-w-2xl text-sm text-ink-400">{description}</p>}
      </div>
      {actionTo && actionLabel && (
        <Link
          to={actionTo}
          className="inline-flex items-center gap-1.5 self-start rounded-lg border border-ink-600 px-4 py-2 text-sm font-semibold text-ink-100 transition hover:border-brand-500 hover:text-brand-400 sm:self-auto"
        >
          {actionLabel}
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
