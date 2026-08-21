import { Link } from 'react-router-dom';
import { Fuel, GitCompare, Heart, Gauge, Settings2, Calendar, Eye } from 'lucide-react';
import type { Car } from '@/types';
import { formatPrice, formatEmi } from '@/data';
import { useApp } from '@/context/AppContext';
import { Badge } from '@/components/ui/Badge';

export function CarCard({ car, index = 0 }: { car: Car; index?: number }) {
  const { toggleWishlist, isWishlisted, toggleCompare, isInCompare } = useApp();
  const wished = isWishlisted(car.id);
  const comparing = isInCompare(car.id);

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-850 transition-all duration-300 hover:-translate-y-1 hover:border-ink-600 hover:shadow-card-hover animate-fade-up"
      style={{ animationDelay: `${Math.min(index * 40, 320)}ms` }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink-900">
        <Link to={`/car/${car.id}`}>
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="absolute left-3 top-3 flex gap-1.5">
          <Badge tone={car.status === 'New' ? 'brand' : 'info'}>{car.status}</Badge>
          {car.featured && <Badge tone="warning">Featured</Badge>}
        </div>
        <button
          onClick={() => toggleWishlist(car.id)}
          className={`absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-md transition ${
            wished ? 'bg-brand-600 text-white' : 'bg-black/40 text-white hover:bg-black/60'
          }`}
          aria-label="Toggle wishlist"
        >
          <Heart size={18} fill={wished ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-500">{car.brand}</p>
            <Link to={`/car/${car.id}`}>
              <h3 className="font-display text-base font-bold leading-tight text-white transition hover:text-brand-400">
                {car.model}
              </h3>
            </Link>
            <p className="text-xs text-ink-400">{car.variant}</p>
          </div>
          <div className="text-right">
            <p className="font-display text-lg font-bold text-white">{formatPrice(car.price)}</p>
            <p className="text-[11px] text-ink-400">EMI from {formatEmi(car.emiStart)}</p>
          </div>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-ink-300">
          <span className="flex items-center gap-1.5">
            <Fuel size={13} className="text-ink-500" /> {car.fuel}
          </span>
          <span className="flex items-center gap-1.5">
            <Settings2 size={13} className="text-ink-500" /> {car.transmission}
          </span>
          <span className="flex items-center gap-1.5">
            <Gauge size={13} className="text-ink-500" /> {car.mileage}
          </span>
          <span className="flex items-center gap-1.5">
            <Calendar size={13} className="text-ink-500" /> {car.year}
          </span>
        </div>

        <div className="mt-4 flex items-center gap-2 border-t border-ink-700/60 pt-3">
          <Link
            to={`/car/${car.id}`}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-500"
          >
            <Eye size={14} /> View Details
          </Link>
          <button
            onClick={() => toggleCompare(car.id)}
            className={`flex items-center justify-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
              comparing
                ? 'border-brand-500 bg-brand-600/15 text-brand-400'
                : 'border-ink-600 text-ink-200 hover:border-ink-500 hover:text-white'
            }`}
            aria-label="Toggle compare"
          >
            <GitCompare size={14} /> Compare
          </button>
        </div>
      </div>
    </article>
  );
}
