import { useState } from 'react';
import { Calendar, Check, Car as CarIcon } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function TestDrivePage() {
  const { cars } = useApp();
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', car: '', date: '', time: '', city: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.phone) errs.phone = 'Phone is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.car) errs.car = 'Select a car';
    if (!form.date) errs.date = 'Date is required';
    if (!form.time) errs.time = 'Time is required';
    if (!form.city) errs.city = 'City is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
    toast('Test drive booked successfully');
  };

  return (
    <div className="container-px py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/15 text-brand-400">
            <Calendar size={24} />
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white">Book a Test Drive</h1>
          <p className="mt-2 text-sm text-ink-400">Get behind the wheel before you decide. Pick a car, date and city — we'll handle the rest.</p>
        </div>

        {submitted ? (
          <div className="card-surface flex flex-col items-center gap-3 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Check size={28} />
            </div>
            <h2 className="font-display text-xl font-bold text-white">Test Drive Booked!</h2>
            <p className="text-sm text-ink-400">Our team will call you shortly to confirm your slot.</p>
            <Button className="mt-2" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', car: '', date: '', time: '', city: '', message: '' }); }}>
              Book Another
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="card-surface space-y-4 p-6">
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="Your name" />
              <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} placeholder="+91" />
            </div>
            <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="you@example.com" />
            <Select label="Select Car" value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })} error={errors.car}>
              <option value="">Choose a car</option>
              {cars.map((c) => <option key={c.id} value={`${c.brand} ${c.model}`}>{c.brand} {c.model}</option>)}
            </Select>
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Preferred Date" type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} error={errors.date} />
              <Select label="Preferred Time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} error={errors.time}>
                <option value="">Select slot</option>
                {['09:00 AM', '11:00 AM', '01:00 PM', '03:00 PM', '05:00 PM'].map((t) => <option key={t} value={t}>{t}</option>)}
              </Select>
            </div>
            <Select label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} error={errors.city}>
              <option value="">Select city</option>
              {['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata'].map((c) => <option key={c} value={c}>{c}</option>)}
            </Select>
            <Textarea label="Message (optional)" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Any specific requests?" />
            <Button type="submit" fullWidth leftIcon={<CarIcon size={18} />}>Confirm Test Drive</Button>
          </form>
        )}
      </div>
    </div>
  );
}
