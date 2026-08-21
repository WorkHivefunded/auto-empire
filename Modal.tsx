import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'max-w-md',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
};

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handler);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in" onClick={onClose} />
      <div className={`relative w-full ${sizes[size]} card-surface shadow-card-hover animate-scale-in max-h-[92vh] overflow-y-auto rounded-b-none sm:rounded-2xl`}>
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-ink-700/70 bg-ink-850/95 px-5 py-4 backdrop-blur">
            <h3 className="font-display text-lg font-bold text-white">{title}</h3>
            <button onClick={onClose} className="rounded-lg p-1.5 text-ink-300 transition hover:bg-ink-700 hover:text-white" aria-label="Close">
              <X size={20} />
            </button>
          </div>
        )}
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}
