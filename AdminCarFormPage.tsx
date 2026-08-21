import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Plus, Save, Trash2, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BRANDS } from '@/data';
import { FUEL_TYPES, TRANSMISSIONS, BODY_TYPES } from '@/types';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';
import type { BodyType, Car, CarColor, CarVariant, FuelType, Transmission } from '@/types';

const emptyCar: Car = {
  id: '',
  brand: 'Maruti Suzuki',
  model: '',
  variant: '',
  year: new Date().getFullYear(),
  price: 0,
  emiStart: 0,
  fuel: 'Petrol',
  transmission: 'Manual',
  bodyType: 'SUV',
  mileage: '',
  seating: 5,
  bootSpace: '',
  engine: '',
  power: '',
  torque: '',
  safetyRating: 4,
  status: 'New',
  featured: false,
  published: true,
  image: '',
  gallery: [],
  colors: [],
  features: [],
  pros: [],
  cons: [],
  variants: [],
  reviews: [],
  description: '',
};

export function AdminCarFormPage() {
  const { id } = useParams();
  const { cars, setCars } = useApp();
  const navigate = useNavigate();
  const toast = useToast();
  const isEdit = !!id;

  const existing = id ? cars.find((c) => c.id === id) : undefined;
  const [car, setCar] = useState<Car>(existing ? { ...existing } : { ...emptyCar });

  const [featureInput, setFeatureInput] = useState('');
  const [proInput, setProInput] = useState('');
  const [conInput, setConInput] = useState('');
  const [colorName, setColorName] = useState('');
  const [colorHex, setColorHex] = useState('#ffffff');

  const update = <K extends keyof Car>(key: K, value: Car[K]) => setCar((c) => ({ ...c, [key]: value }));

  const addFeature = () => { if (featureInput.trim()) { update('features', [...car.features, featureInput.trim()]); setFeatureInput(''); } };
  const addPro = () => { if (proInput.trim()) { update('pros', [...car.pros, proInput.trim()]); setProInput(''); } };
  const addCon = () => { if (conInput.trim()) { update('cons', [...car.cons, conInput.trim()]); setConInput(''); } };
  const addColor = () => { if (colorName.trim()) { update('colors', [...car.colors, { name: colorName.trim(), hex: colorHex }]); setColorName(''); } };
  const addVariant = () => update('variants', [...car.variants, { name: '', price: 0, transmission: 'Manual', fuel: 'Petrol' }]);

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!car.model || !car.brand || car.price <= 0) {
      toast('Please fill model, brand and price');
      return;
    }
    const newId = car.id || `${car.brand.toLowerCase().replace(/\s+/g, '-')}-${car.model.toLowerCase().replace(/\s+/g, '-')}`;
    const finalCar: Car = {
      ...car,
      id: newId,
      emiStart: car.emiStart || Math.round(car.price / 60),
      image: car.image || 'https://images.pexels.com/photos/17078606/pexels-photo-17078606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
      gallery: car.gallery.length > 0 ? car.gallery : [car.image || 'https://images.pexels.com/photos/17078606/pexels-photo-17078606.jpeg?auto=compress&cs=tinysrgb&h=650&w=940'],
    };
    if (isEdit) {
      setCars(cars.map((c) => (c.id === finalCar.id ? finalCar : c)));
      toast('Car updated successfully');
    } else {
      setCars([finalCar, ...cars]);
      toast('Car added successfully');
    }
    navigate('/admin/cars');
  };

  return (
    <div>
      <button onClick={() => navigate('/admin/cars')} className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-300 hover:text-white">
        <ArrowLeft size={16} /> Back to Cars
      </button>
      <h1 className="font-display text-2xl font-extrabold text-white">{isEdit ? 'Edit Car' : 'Add New Car'}</h1>
      <p className="mt-1 text-sm text-ink-400">{isEdit ? 'Update the details of this car.' : 'Fill in the details to add a new car to your inventory.'}</p>

      <form onSubmit={save} className="mt-6 space-y-6">
        {/* Basic info */}
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Basic Information</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Select label="Brand" value={car.brand} onChange={(e) => update('brand', e.target.value)}>
              {BRANDS.map((b) => <option key={b.id} value={b.name}>{b.name}</option>)}
            </Select>
            <Input label="Model" value={car.model} onChange={(e) => update('model', e.target.value)} placeholder="e.g. Swift" />
            <Input label="Variant" value={car.variant} onChange={(e) => update('variant', e.target.value)} placeholder="e.g. ZXi+" />
            <Input label="Year" type="number" value={car.year} onChange={(e) => update('year', Number(e.target.value))} />
            <Select label="Status" value={car.status} onChange={(e) => update('status', e.target.value as Car['status'])}>
              <option value="New">New</option>
              <option value="Used">Used</option>
            </Select>
            <Input label="Image URL" value={car.image} onChange={(e) => update('image', e.target.value)} placeholder="https://..." />
          </div>
          <div className="mt-4 flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-ink-200">
              <input type="checkbox" checked={car.published} onChange={(e) => update('published', e.target.checked)} className="h-4 w-4 accent-brand-600" />
              Published
            </label>
            <label className="flex items-center gap-2 text-sm text-ink-200">
              <input type="checkbox" checked={car.featured} onChange={(e) => update('featured', e.target.checked)} className="h-4 w-4 accent-brand-600" />
              Featured
            </label>
          </div>
        </div>

        {/* Price */}
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Pricing</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Price (₹)" type="number" value={car.price} onChange={(e) => update('price', Number(e.target.value))} placeholder="e.g. 745000" />
            <Input label="EMI Starting (₹/mo)" type="number" value={car.emiStart} onChange={(e) => update('emiStart', Number(e.target.value))} placeholder="Auto-calculated if empty" />
          </div>
        </div>

        {/* Specs */}
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Specifications</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Select label="Fuel" value={car.fuel} onChange={(e) => update('fuel', e.target.value as FuelType)}>
              {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
            </Select>
            <Select label="Transmission" value={car.transmission} onChange={(e) => update('transmission', e.target.value as Transmission)}>
              {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Select label="Body Type" value={car.bodyType} onChange={(e) => update('bodyType', e.target.value as BodyType)}>
              {BODY_TYPES.map((b) => <option key={b} value={b}>{b}</option>)}
            </Select>
            <Input label="Engine" value={car.engine} onChange={(e) => update('engine', e.target.value)} placeholder="e.g. 1197 cc" />
            <Input label="Power" value={car.power} onChange={(e) => update('power', e.target.value)} placeholder="e.g. 89 bhp" />
            <Input label="Torque" value={car.torque} onChange={(e) => update('torque', e.target.value)} placeholder="e.g. 113 Nm" />
            <Input label="Mileage" value={car.mileage} onChange={(e) => update('mileage', e.target.value)} placeholder="e.g. 24.8 kmpl" />
            <Input label="Seating" type="number" value={car.seating} onChange={(e) => update('seating', Number(e.target.value))} />
            <Input label="Boot Space" value={car.bootSpace} onChange={(e) => update('bootSpace', e.target.value)} placeholder="e.g. 265 L" />
            <Input label="Safety Rating (1-5)" type="number" min={1} max={5} value={car.safetyRating} onChange={(e) => update('safetyRating', Number(e.target.value))} />
          </div>
        </div>

        {/* Description */}
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Description</h2>
          <Textarea label="Overview" rows={3} value={car.description} onChange={(e) => update('description', e.target.value)} placeholder="Short description of the car..." />
        </div>

        {/* Features */}
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Features</h2>
          <div className="flex gap-2">
            <input value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} placeholder="Add a feature" className="input-base" />
            <Button type="button" onClick={addFeature} leftIcon={<Plus size={16} />}>Add</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {car.features.map((f, i) => (
              <span key={i} className="chip">
                {f}
                <button type="button" onClick={() => update('features', car.features.filter((_, j) => j !== i))}><X size={12} /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Pros & Cons */}
        <div className="grid gap-4 md:grid-cols-2">
          <div className="card-surface p-5">
            <h2 className="mb-4 font-display text-base font-bold text-white">Pros</h2>
            <div className="flex gap-2">
              <input value={proInput} onChange={(e) => setProInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPro())} placeholder="Add a pro" className="input-base" />
              <Button type="button" onClick={addPro} leftIcon={<Plus size={16} />}>Add</Button>
            </div>
            <ul className="mt-3 space-y-1.5">
              {car.pros.map((p, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg border border-ink-700/70 bg-ink-900 px-3 py-2 text-sm text-ink-200">
                  {p}
                  <button type="button" onClick={() => update('pros', car.pros.filter((_, j) => j !== i))}><X size={14} className="text-ink-400 hover:text-brand-400" /></button>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-surface p-5">
            <h2 className="mb-4 font-display text-base font-bold text-white">Cons</h2>
            <div className="flex gap-2">
              <input value={conInput} onChange={(e) => setConInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addCon())} placeholder="Add a con" className="input-base" />
              <Button type="button" onClick={addCon} leftIcon={<Plus size={16} />}>Add</Button>
            </div>
            <ul className="mt-3 space-y-1.5">
              {car.cons.map((c, i) => (
                <li key={i} className="flex items-center justify-between rounded-lg border border-ink-700/70 bg-ink-900 px-3 py-2 text-sm text-ink-200">
                  {c}
                  <button type="button" onClick={() => update('cons', car.cons.filter((_, j) => j !== i))}><X size={14} className="text-ink-400 hover:text-brand-400" /></button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Colors */}
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Available Colors</h2>
          <div className="flex flex-wrap items-end gap-2">
            <div className="flex-1">
              <Input label="Color Name" value={colorName} onChange={(e) => setColorName(e.target.value)} placeholder="e.g. Pearl White" />
            </div>
            <div>
              <label className="label-base">Hex</label>
              <input type="color" value={colorHex} onChange={(e) => setColorHex(e.target.value)} className="h-11 w-16 rounded-xl border border-ink-700 bg-ink-900" />
            </div>
            <Button type="button" onClick={addColor} leftIcon={<Plus size={16} />}>Add</Button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {car.colors.map((c, i) => (
              <span key={i} className="flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-850 px-3 py-2">
                <span className="h-5 w-5 rounded-full border border-ink-600" style={{ background: c.hex }} />
                <span className="text-xs text-ink-200">{c.name}</span>
                <button type="button" onClick={() => update('colors', car.colors.filter((_, j) => j !== i))}><X size={12} className="text-ink-400 hover:text-brand-400" /></button>
              </span>
            ))}
          </div>
        </div>

        {/* Variants */}
        <div className="card-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white">Variants</h2>
            <Button type="button" size="sm" onClick={addVariant} leftIcon={<Plus size={14} />}>Add Variant</Button>
          </div>
          <div className="space-y-2">
            {car.variants.map((v, i) => (
              <div key={i} className="grid items-end gap-2 rounded-xl border border-ink-700/70 bg-ink-900 p-3 sm:grid-cols-4">
                <Input label="Name" value={v.name} onChange={(e) => { const next = [...car.variants]; next[i] = { ...v, name: e.target.value }; update('variants', next); }} />
                <Input label="Price" type="number" value={v.price} onChange={(e) => { const next = [...car.variants]; next[i] = { ...v, price: Number(e.target.value) }; update('variants', next); }} />
                <Select label="Fuel" value={v.fuel} onChange={(e) => { const next = [...car.variants]; next[i] = { ...v, fuel: e.target.value as FuelType }; update('variants', next); }}>
                  {FUEL_TYPES.map((f) => <option key={f} value={f}>{f}</option>)}
                </Select>
                <div className="flex items-end gap-2">
                  <Select label="Transmission" value={v.transmission} onChange={(e) => { const next = [...car.variants]; next[i] = { ...v, transmission: e.target.value as Transmission }; update('variants', next); }}>
                    {TRANSMISSIONS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </Select>
                  <button type="button" onClick={() => update('variants', car.variants.filter((_, j) => j !== i))} className="mb-1 rounded-lg p-2.5 text-ink-300 hover:bg-brand-600/20 hover:text-brand-400">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
            {car.variants.length === 0 && <p className="text-sm text-ink-500">No variants added yet.</p>}
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" size="lg" leftIcon={<Save size={18} />}>{isEdit ? 'Save Changes' : 'Add Car'}</Button>
          <Button type="button" variant="outline" size="lg" onClick={() => navigate('/admin/cars')}>Cancel</Button>
        </div>
      </form>
    </div>
  );
}
