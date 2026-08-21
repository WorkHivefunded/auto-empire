import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { BRANDS } from '@/data';
import { FUEL_TYPES, TRANSMISSIONS, BODY_TYPES } from '@/types';
import { Button } from '@/components/ui/Button';

export function SearchBar() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [budget, setBudget] = useState('');
  const [fuel, setFuel] = useState('');
  const [transmission, setTransmission] = useState('');
  const [bodyType, setBodyType] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (query) params.set('q', query);
    if (budget) params.set('budget', budget);
    if (fuel) params.set('fuel', fuel);
    if (transmission) params.set('transmission', transmission);
    if (bodyType) params.set('bodyType', bodyType);
    navigate(`/explore?${params.toString()}`);
  };

  return (
    <form
      onSubmit={submit}
      className="card-surface w-full rounded-2xl border-ink-700/80 bg-ink-900/80 p-4 shadow-card backdrop-blur-md sm:p-5"
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="label-base">Brand or Model</label>
          <input
            list="brand-list"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. Creta, BMW"
            className="input-base"
          />
          <datalist id="brand-list">
            {BRANDS.map((b) => (
              <option key={b.id} value={b.name} />
            ))}
          </datalist>
        </div>
        <div>
          <label className="label-base">Budget</label>
          <select value={budget} onChange={(e) => setBudget(e.target.value)} className="input-base appearance-none bg-[right_0.75rem_center] bg-no-repeat pr-9">
            <option value="">Any</option>
            <option value="0-5">Under ₹5 Lakh</option>
            <option value="5-10">₹5 - 10 Lakh</option>
            <option value="10-20">₹10 - 20 Lakh</option>
            <option value="20-50">₹20 - 50 Lakh</option>
            <option value="50+">Above ₹50 Lakh</option>
          </select>
        </div>
        <div>
          <label className="label-base">Fuel</label>
          <select value={fuel} onChange={(e) => setFuel(e.target.value)} className="input-base appearance-none bg-[right_0.75rem_center] bg-no-repeat pr-9">
            <option value="">Any</option>
            {FUEL_TYPES.map((f) => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-base">Transmission</label>
          <select value={transmission} onChange={(e) => setTransmission(e.target.value)} className="input-base appearance-none bg-[right_0.75rem_center] bg-no-repeat pr-9">
            <option value="">Any</option>
            {TRANSMISSIONS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="label-base">Body Type</label>
          <select value={bodyType} onChange={(e) => setBodyType(e.target.value)} className="input-base appearance-none bg-[right_0.75rem_center] bg-no-repeat pr-9">
            <option value="">Any</option>
            {BODY_TYPES.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>
      <Button type="submit" size="lg" fullWidth leftIcon={<Search size={18} />} className="mt-4">
        Search Cars
      </Button>
    </form>
  );
}
