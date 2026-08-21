import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car as CarIcon, Edit3, Plus, Search, Star, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatPrice } from '@/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';
import type { Car } from '@/types';

export function AdminCarsPage() {
  const { cars, setCars } = useApp();
  const toast = useToast();
  const [query, setQuery] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Car | null>(null);

  const filtered = cars.filter((c) => `${c.brand} ${c.model} ${c.variant}`.toLowerCase().includes(query.toLowerCase()));

  const togglePublished = (id: string) => {
    setCars(cars.map((c) => (c.id === id ? { ...c, published: !c.published } : c)));
    toast('Status updated');
  };

  const toggleFeatured = (id: string) => {
    setCars(cars.map((c) => (c.id === id ? { ...c, featured: !c.featured } : c)));
    toast('Featured status updated');
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setCars(cars.filter((c) => c.id !== deleteTarget.id));
    toast('Car deleted');
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Cars</h1>
          <p className="mt-1 text-sm text-ink-400">{cars.length} cars in your inventory.</p>
        </div>
        <Link to="/admin/cars/new">
          <Button leftIcon={<Plus size={16} />}>Add Car</Button>
        </Link>
      </div>

      <div className="mb-4 relative max-w-sm">
        <Search size={16} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search cars..." className="input-base pl-10" />
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-700 bg-ink-900 text-xs uppercase text-ink-400">
              <tr>
                <th className="p-3 font-semibold">Image</th>
                <th className="p-3 font-semibold">Car</th>
                <th className="p-3 font-semibold">Brand</th>
                <th className="p-3 font-semibold">Price</th>
                <th className="p-3 font-semibold">Fuel</th>
                <th className="p-3 font-semibold">Transmission</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 font-semibold">Featured</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c.id} className="border-b border-ink-700/50 last:border-0 hover:bg-ink-850/50">
                  <td className="p-3">
                    <img src={c.image} alt={c.model} className="h-12 w-16 rounded-lg object-cover" />
                  </td>
                  <td className="p-3">
                    <p className="font-semibold text-white">{c.model}</p>
                    <p className="text-xs text-ink-400">{c.variant} &middot; {c.year}</p>
                  </td>
                  <td className="p-3 text-ink-300">{c.brand}</td>
                  <td className="p-3 font-bold text-brand-400">{formatPrice(c.price)}</td>
                  <td className="p-3 text-ink-300">{c.fuel}</td>
                  <td className="p-3 text-ink-300">{c.transmission}</td>
                  <td className="p-3">
                    <button onClick={() => togglePublished(c.id)}>
                      <Badge tone={c.published ? 'success' : 'neutral'}>{c.published ? 'Live' : 'Draft'}</Badge>
                    </button>
                  </td>
                  <td className="p-3">
                    <button onClick={() => toggleFeatured(c.id)}>
                      <Star size={18} className={c.featured ? 'text-amber-400' : 'text-ink-600'} fill={c.featured ? 'currentColor' : 'none'} />
                    </button>
                  </td>
                  <td className="p-3">
                    <div className="flex justify-end gap-1.5">
                      <Link to={`/admin/cars/${c.id}/edit`}>
                        <button className="rounded-lg p-2 text-ink-300 transition hover:bg-ink-700 hover:text-white" aria-label="Edit">
                          <Edit3 size={16} />
                        </button>
                      </Link>
                      <button onClick={() => setDeleteTarget(c)} className="rounded-lg p-2 text-ink-300 transition hover:bg-brand-600/20 hover:text-brand-400" aria-label="Delete">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-2 py-12 text-center">
            <CarIcon size={32} className="text-ink-500" />
            <p className="text-sm text-ink-400">No cars match your search.</p>
          </div>
        )}
      </div>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Car" size="sm">
        <p className="text-sm text-ink-300">Are you sure you want to delete <span className="font-semibold text-white">{deleteTarget?.brand} {deleteTarget?.model}</span>? This action cannot be undone.</p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" fullWidth onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" fullWidth onClick={confirmDelete} leftIcon={<Trash2 size={16} />}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
