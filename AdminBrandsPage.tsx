import { useState } from 'react';
import { Car, Edit3, Plus, Trash2, X } from 'lucide-react';
import { BRANDS } from '@/data';
import type { Brand } from '@/types';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

export function AdminBrandsPage() {
  const toast = useToast();
  const [brands, setBrands] = useState<Brand[]>(BRANDS);
  const [editing, setEditing] = useState<Brand | null>(null);
  const [name, setName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);

  const openAdd = () => { setEditing({ id: '', name: '', logo: '', count: 0 }); setName(''); };
  const openEdit = (b: Brand) => { setEditing({ ...b }); setName(b.name); };

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (editing && editing.id) {
      setBrands(brands.map((b) => (b.id === editing.id ? { ...editing, name: name.trim() } : b)));
      toast('Brand updated');
    } else {
      setBrands([...brands, { id: name.toLowerCase().replace(/\s+/g, '-'), name: name.trim(), logo: '', count: 0 }]);
      toast('Brand added');
    }
    setEditing(null);
  };

  const confirmDelete = () => {
    if (!deleteTarget) return;
    setBrands(brands.filter((b) => b.id !== deleteTarget.id));
    toast('Brand deleted');
    setDeleteTarget(null);
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="font-display text-2xl font-extrabold text-white">Brands</h1>
          <p className="mt-1 text-sm text-ink-400">{brands.length} brands in your marketplace.</p>
        </div>
        <Button leftIcon={<Plus size={16} />} onClick={openAdd}>Add Brand</Button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {brands.map((b) => (
          <div key={b.id} className="card-surface flex flex-col items-center gap-3 p-5 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-ink-800 text-ink-300">
              <Car size={26} />
            </span>
            <div>
              <p className="text-sm font-bold text-white">{b.name}</p>
              <p className="text-xs text-ink-500">{b.count} models</p>
            </div>
            <div className="flex gap-1.5">
              <button onClick={() => openEdit(b)} className="rounded-lg p-2 text-ink-300 hover:bg-ink-700 hover:text-white"><Edit3 size={15} /></button>
              <button onClick={() => setDeleteTarget(b)} className="rounded-lg p-2 text-ink-300 hover:bg-brand-600/20 hover:text-brand-400"><Trash2 size={15} /></button>
            </div>
          </div>
        ))}
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit Brand' : 'Add Brand'} size="sm">
        <form onSubmit={save} className="space-y-4">
          <Input label="Brand Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Honda" autoFocus />
          <div className="flex gap-3">
            <Button type="submit" fullWidth>{editing?.id ? 'Save' : 'Add'}</Button>
            <Button type="button" variant="outline" fullWidth onClick={() => setEditing(null)}>Cancel</Button>
          </div>
        </form>
      </Modal>

      <Modal open={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Brand" size="sm">
        <p className="text-sm text-ink-300">Delete <span className="font-semibold text-white">{deleteTarget?.name}</span>?</p>
        <div className="mt-5 flex gap-3">
          <Button variant="outline" fullWidth onClick={() => setDeleteTarget(null)}>Cancel</Button>
          <Button variant="danger" fullWidth onClick={confirmDelete} leftIcon={<Trash2 size={16} />}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}
