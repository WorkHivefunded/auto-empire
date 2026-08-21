import { Link } from 'react-router-dom';
import { Car } from 'lucide-react';
import { BRANDS } from '@/data';

export function BrandsPage() {
  return (
    <div className="container-px py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">All Brands</h1>
        <p className="mt-1 text-sm text-ink-400">Browse cars from India's most-loved automakers.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {BRANDS.map((b, i) => (
          <Link
            key={b.id}
            to={`/explore?brand=${encodeURIComponent(b.name)}`}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-ink-700/70 bg-ink-850 p-6 text-center transition hover:-translate-y-0.5 hover:border-brand-500/60 hover:shadow-card animate-fade-up"
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-ink-800 text-ink-300 transition group-hover:bg-brand-600 group-hover:text-white">
              <Car size={28} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">{b.name}</p>
              <p className="text-xs text-ink-500">{b.count} models</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
