import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SlidersHorizontal, X, Search as SearchIcon, Car } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BRANDS } from '@/data';
import { FUEL_TYPES, TRANSMISSIONS, BODY_TYPES } from '@/types';
import { CarCard } from '@/components/CarCard';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

const BUDGET_OPTIONS = [
  { label: 'Any', value: '' },
  { label: 'Under ₹5 Lakh', value: '0-5' },
  { label: '₹5 - 10 Lakh', value: '5-10' },
  { label: '₹10 - 20 Lakh', value: '10-20' },
  { label: '₹20 - 50 Lakh', value: '20-50' },
  { label: 'Above ₹50 Lakh', value: '50+' },
];

const SORT_OPTIONS = [
  { label: 'Popular', value: 'popular' },
  { label: 'Price: Low to High', value: 'price-asc' },
  { label: 'Price: High to Low', value: 'price-desc' },
  { label: 'Newest', value: 'newest' },
];

function inBudget(price: number, range: string) {
  if (!range) return true;
  if (range === '50+') return price >= 5000000;
  const [min, max] = range.split('-').map(Number);
  return price >= min * 100000 && price <= max * 100000;
}

export function ExplorePage() {
  const { cars } = useApp();
  const [params, setParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const q = params.get('q') ?? '';
  const status = params.get('status') ?? '';
  const brand = params.get('brand') ?? '';
  const model = params.get('model') ?? '';
  const budget = params.get('budget') ?? '';
  const fuel = params.get('fuel') ?? '';
  const transmission = params.get('transmission') ?? '';
  const bodyType = params.get('bodyType') ?? '';
  const seats = params.get('seats') ?? '';
  const year = params.get('year') ?? '';
  const sort = params.get('sort') ?? 'popular';

  const setParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    let list = cars.filter((c) => c.published);
    if (q) list = list.filter((c) => `${c.brand} ${c.model}`.toLowerCase().includes(q.toLowerCase()));
    if (status) list = list.filter((c) => c.status === status);
    if (brand) list = list.filter((c) => c.brand === brand);
    if (model) list = list.filter((c) => c.model === model);
    if (budget) list = list.filter((c) => inBudget(c.price, budget));
    if (fuel) list = list.filter((c) => c.fuel === fuel);
    if (transmission) list = list.filter((c) => c.transmission === transmission);
    if (bodyType) list = list.filter((c) => c.bodyType === bodyType);
    if (seats) list = list.filter((c) => c.seating === Number(seats));
    if (year) list = list.filter((c) => c.year === Number(year));

    switch (sort) {
      case 'price-asc': list = [...list].sort((a, b) => a.price - b.price); break;
      case 'price-desc': list = [...list].sort((a, b) => b.price - a.price); break;
      case 'newest': list = [...list].sort((a, b) => b.year - a.year); break;
      default: list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [cars, q, status, brand, model, budget, fuel, transmission, bodyType, seats, year, sort]);

  const years = Array.from(new Set(cars.map((c) => c.year))).sort((a, b) => b - a);
  const models = brand ? Array.from(new Set(cars.filter((c) => c.brand === brand).map((c) => c.model))) : [];

  const activeCount = [q, status, brand, model, budget, fuel, transmission, bodyType, seats, year].filter(Boolean).length;

  const clearAll = () => setParams(sort ? new URLSearchParams({ sort }) : new URLSearchParams(), { replace: true });

  const FilterPanel = (
    <div className="space-y-6">
      <FilterGroup label="Condition">
        <div className="flex gap-2">
          {['', 'New', 'Used'].map((s) => (
            <button
              key={s || 'all'}
              onClick={() => setParam('status', s)}
              className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                status === s ? 'border-brand-500 bg-brand-600/15 text-brand-400' : 'border-ink-700 text-ink-300 hover:border-ink-600'
              }`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Brand">
        <select value={brand} onChange={(e) => { setParam('brand', e.target.value); setParam('model', ''); }} className="input-base">
          <option value="">All Brands</option>
          {BRANDS.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
        </select>
      </FilterGroup>

      {models.length > 0 && (
        <FilterGroup label="Model">
          <select value={model} onChange={(e) => setParam('model', e.target.value)} className="input-base">
            <option value="">All Models</option>
            {models.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
        </FilterGroup>
      )}

      <FilterGroup label="Price Range">
        <div className="grid grid-cols-2 gap-1.5">
          {BUDGET_OPTIONS.map((b) => (
            <button
              key={b.value || 'any'}
              onClick={() => setParam('budget', b.value)}
              className={`rounded-lg border px-2.5 py-2 text-xs font-medium transition ${
                budget === b.value ? 'border-brand-500 bg-brand-600/15 text-brand-400' : 'border-ink-700 text-ink-300 hover:border-ink-600'
              }`}
            >
              {b.label}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Fuel">
        <div className="flex flex-wrap gap-1.5">
          {FUEL_TYPES.map((f) => (
            <button
              key={f}
              onClick={() => setParam('fuel', fuel === f ? '' : f)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                fuel === f ? 'border-brand-500 bg-brand-600/15 text-brand-400' : 'border-ink-700 text-ink-300 hover:border-ink-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Transmission">
        <div className="flex flex-wrap gap-1.5">
          {TRANSMISSIONS.map((t) => (
            <button
              key={t}
              onClick={() => setParam('transmission', transmission === t ? '' : t)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                transmission === t ? 'border-brand-500 bg-brand-600/15 text-brand-400' : 'border-ink-700 text-ink-300 hover:border-ink-600'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Body Type">
        <div className="flex flex-wrap gap-1.5">
          {BODY_TYPES.map((b) => (
            <button
              key={b}
              onClick={() => setParam('bodyType', bodyType === b ? '' : b)}
              className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition ${
                bodyType === b ? 'border-brand-500 bg-brand-600/15 text-brand-400' : 'border-ink-700 text-ink-300 hover:border-ink-600'
              }`}
            >
              {b}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Seating Capacity">
        <div className="flex gap-1.5">
          {['', '4', '5', '7'].map((s) => (
            <button
              key={s || 'all'}
              onClick={() => setParam('seats', s)}
              className={`flex-1 rounded-lg border px-2 py-2 text-xs font-semibold transition ${
                seats === s ? 'border-brand-500 bg-brand-600/15 text-brand-400' : 'border-ink-700 text-ink-300 hover:border-ink-600'
              }`}
            >
              {s || 'All'}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup label="Year">
        <select value={year} onChange={(e) => setParam('year', e.target.value)} className="input-base">
          <option value="">All Years</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>
      </FilterGroup>

      {activeCount > 0 && (
        <Button variant="outline" fullWidth onClick={clearAll} leftIcon={<X size={16} />}>
          Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="container-px py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">Explore Cars</h1>
        <p className="mt-1 text-sm text-ink-400">Browse {filtered.length} car{filtered.length === 1 ? '' : 's'} matching your filters.</p>
      </div>

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-24 card-surface p-5">
            <div className="mb-4 flex items-center gap-2">
              <SlidersHorizontal size={18} className="text-brand-500" />
              <h2 className="font-display text-base font-bold text-white">Filters</h2>
              {activeCount > 0 && <span className="ml-auto rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">{activeCount}</span>}
            </div>
            {FilterPanel}
          </div>
        </aside>

        {/* Results */}
        <div className="min-w-0 flex-1">
          <div className="mb-4 flex items-center justify-between gap-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="inline-flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-850 px-4 py-2.5 text-sm font-semibold text-ink-100 transition hover:border-ink-600 lg:hidden"
            >
              <SlidersHorizontal size={16} /> Filters
              {activeCount > 0 && <span className="rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">{activeCount}</span>}
            </button>
            <div className="flex items-center gap-2">
              <span className="hidden text-xs text-ink-400 sm:inline">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setParam('sort', e.target.value)}
                className="input-base h-10 w-auto appearance-none bg-[right_0.75rem_center] bg-no-repeat pr-9 text-sm"
              >
                {SORT_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="card-surface flex flex-col items-center justify-center gap-3 py-20 text-center">
              <Car size={40} className="text-ink-500" />
              <p className="font-display text-lg font-bold text-white">No cars found</p>
              <p className="text-sm text-ink-400">Try adjusting your filters or clearing them all.</p>
              {activeCount > 0 && <Button variant="outline" onClick={clearAll}>Clear filters</Button>}
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((car, i) => <CarCard key={car.id} car={car} index={i} />)}
            </div>
          )}
        </div>
      </div>

      {/* Mobile drawer */}
      <Modal open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Filters" size="md">
        {FilterPanel}
        <Button fullWidth className="mt-4" onClick={() => setDrawerOpen(false)}>
          Show {filtered.length} cars
        </Button>
      </Modal>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="label-base">{label}</p>
      {children}
    </div>
  );
}
