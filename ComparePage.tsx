import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, GitCompare, Plus, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatPrice, formatEmi } from '@/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

export function ComparePage() {
  const { cars, compareList, toggleCompare } = useApp();
  const toast = useToast();
  const navigate = useNavigate();
  const [pickerOpen, setPickerOpen] = useState(false);

  const selected = compareList.map((id) => cars.find((c) => c.id === id)).filter(Boolean) as typeof cars;

  const rows: { label: string; get: (c: (typeof cars)[number]) => string }[] = [
    { label: 'Price', get: (c) => formatPrice(c.price) },
    { label: 'EMI starts at', get: (c) => formatEmi(c.emiStart) },
    { label: 'Engine', get: (c) => c.engine },
    { label: 'Power', get: (c) => c.power },
    { label: 'Torque', get: (c) => c.torque },
    { label: 'Mileage', get: (c) => c.mileage },
    { label: 'Fuel', get: (c) => c.fuel },
    { label: 'Transmission', get: (c) => c.transmission },
    { label: 'Seating', get: (c) => `${c.seating} seats` },
    { label: 'Boot Space', get: (c) => c.bootSpace },
    { label: 'Safety Rating', get: (c) => `${c.safetyRating} Star` },
    { label: 'Body Type', get: (c) => c.bodyType },
    { label: 'Year', get: (c) => String(c.year) },
    { label: 'Status', get: (c) => c.status },
    { label: 'Features', get: (c) => c.features.join(', ') },
  ];

  return (
    <div className="container-px py-8">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-extrabold text-white">Compare Cars</h1>
        <p className="mt-1 text-sm text-ink-400">Stack up to 4 cars side by side and find your perfect drive.</p>
      </div>

      {selected.length === 0 ? (
        <div className="card-surface flex flex-col items-center justify-center gap-3 py-20 text-center">
          <GitCompare size={40} className="text-ink-500" />
          <p className="font-display text-lg font-bold text-white">No cars in compare yet</p>
          <p className="text-sm text-ink-400">Add cars from the explore page or pick one below.</p>
          <div className="mt-2 flex gap-2">
            <Button onClick={() => setPickerOpen(true)} leftIcon={<Plus size={16} />}>Add a Car</Button>
            <Button variant="outline" onClick={() => navigate('/explore')}>Browse Cars</Button>
          </div>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="w-40 p-3 text-left text-xs font-semibold uppercase text-ink-400">Specification</th>
                  {selected.map((c) => (
                    <th key={c.id} className="p-3 text-left align-top">
                      <div className="relative">
                        <button onClick={() => { toggleCompare(c.id); toast('Removed from compare'); }} className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-ink-700 text-ink-300 hover:bg-brand-600 hover:text-white">
                          <X size={13} />
                        </button>
                        <Link to={`/car/${c.id}`} className="block">
                          <div className="aspect-[16/10] overflow-hidden rounded-xl border border-ink-700">
                            <img src={c.image} alt={c.model} className="h-full w-full object-cover" />
                          </div>
                          <p className="mt-2 text-xs text-brand-500">{c.brand}</p>
                          <p className="font-display text-sm font-bold text-white">{c.model}</p>
                          <p className="text-xs text-ink-400">{c.variant}</p>
                        </Link>
                      </div>
                    </th>
                  ))}
                  {selected.length < 4 && (
                    <th className="w-40 p-3">
                      <button onClick={() => setPickerOpen(true)} className="flex aspect-[16/10] w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ink-600 text-ink-400 transition hover:border-brand-500 hover:text-brand-400">
                        <Plus size={24} />
                        <span className="text-xs font-semibold">Add Car</span>
                      </button>
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {rows.map((row, i) => (
                  <tr key={row.label} className={i % 2 === 0 ? 'bg-ink-850/50' : ''}>
                    <td className="p-3 text-xs font-semibold uppercase tracking-wide text-ink-400">{row.label}</td>
                    {selected.map((c) => (
                      <td key={c.id} className="p-3 text-sm text-ink-100">{row.get(c)}</td>
                    ))}
                    {selected.length < 4 && <td className="p-3" />}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="space-y-4 lg:hidden">
            {selected.map((c) => (
              <div key={c.id} className="card-surface overflow-hidden">
                <div className="relative">
                  <img src={c.image} alt={c.model} className="h-40 w-full object-cover" />
                  <button onClick={() => { toggleCompare(c.id); toast('Removed from compare'); }} className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur">
                    <X size={15} />
                  </button>
                </div>
                <div className="p-4">
                  <Link to={`/car/${c.id}`}>
                    <p className="text-xs text-brand-500">{c.brand}</p>
                    <p className="font-display text-base font-bold text-white">{c.model}</p>
                    <p className="text-xs text-ink-400">{c.variant}</p>
                  </Link>
                  <dl className="mt-3 space-y-1.5">
                    {rows.map((r) => (
                      <div key={r.label} className="flex justify-between border-b border-ink-700/40 pb-1.5 text-sm last:border-0">
                        <dt className="text-ink-400">{r.label}</dt>
                        <dd className="font-semibold text-ink-100">{r.get(c)}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            ))}
            {selected.length < 4 && (
              <button onClick={() => setPickerOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-ink-600 py-6 text-ink-400 transition hover:border-brand-500 hover:text-brand-400">
                <Plus size={20} /> Add another car
              </button>
            )}
          </div>

          <div className="mt-6 flex gap-3">
            <Button variant="outline" onClick={() => { selected.forEach((c) => toggleCompare(c.id)); toast('Compare list cleared'); }}>
              Clear All
            </Button>
            <Button onClick={() => setPickerOpen(true)} leftIcon={<Plus size={16} />}>Add More</Button>
          </div>
        </>
      )}

      <CarPicker open={pickerOpen} onClose={() => setPickerOpen(false)} />
    </div>
  );
}

function CarPicker({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { cars, compareList, toggleCompare } = useApp();
  const toast = useToast();
  const available = cars.filter((c) => c.published && !compareList.includes(c.id));

  return (
    <Modal open={open} onClose={onClose} title="Add a car to compare" size="lg">
      {available.length === 0 ? (
        <p className="py-8 text-center text-sm text-ink-400">You've already added all available cars.</p>
      ) : (
        <div className="grid max-h-[60vh] gap-3 overflow-y-auto sm:grid-cols-2">
          {available.map((c) => (
            <button
              key={c.id}
              onClick={() => { toggleCompare(c.id); toast('Added to compare'); onClose(); }}
              className="flex items-center gap-3 rounded-xl border border-ink-700 bg-ink-900 p-3 text-left transition hover:border-brand-500"
            >
              <img src={c.image} alt={c.model} className="h-14 w-20 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate text-xs text-brand-500">{c.brand}</p>
                <p className="truncate text-sm font-bold text-white">{c.model}</p>
                <p className="truncate text-xs text-ink-400">{formatPrice(c.price)}</p>
              </div>
              <Plus size={18} className="ml-auto shrink-0 text-ink-400" />
            </button>
          ))}
        </div>
      )}
    </Modal>
  );
}
