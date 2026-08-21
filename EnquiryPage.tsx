import { useState } from 'react';
import { Check, Mail } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function EnquiryPage() {
  const { cars } = useApp();
  const toast = useToast();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', car: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.phone) errs.phone = 'Phone is required';
    if (!form.email) errs.email = 'Email is required';
    if (!form.car) errs.car = 'Select a car';
    if (!form.message) errs.message = 'Message is required';
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setSubmitted(true);
    toast('Enquiry sent successfully');
  };

  return (
    <div className="container-px py-10">
      <div className="mx-auto max-w-2xl">
        <div className="mb-6 text-center">
          <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-brand-600/15 text-brand-400">
            <Mail size={24} />
          </span>
          <h1 className="mt-4 font-display text-3xl font-extrabold text-white">Customer Enquiry</h1>
          <p className="mt-2 text-sm text-ink-400">Have a question about a car, pricing or finance? Our team replies within one business day.</p>
        </div>

        {submitted ? (
          <div className="card-surface flex flex-col items-center gap-3 py-12 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
              <Check size={28} />
            </div>
            <h2 className="font-display text-xl font-bold text-white">Enquiry Sent!</h2>
            <p className="text-sm text-ink-400">Our team will get back to you within one business day.</p>
            <Button className="mt-2" onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', car: '', message: '' }); }}>
              Send Another
            </Button>
          </div>
        ) : (
          <form onSubmit={submit} className="card-surface space-y-4 p-6">
            <Input label="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} error={errors.name} placeholder="Your name" />
            <div className="grid gap-3 sm:grid-cols-2">
              <Input label="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} error={errors.phone} placeholder="+91" />
              <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} error={errors.email} placeholder="you@example.com" />
            </div>
            <Select label="Selected Car" value={form.car} onChange={(e) => setForm({ ...form, car: e.target.value })} error={errors.car}>
              <option value="">Choose a car</option>
              {cars.map((c) => <option key={c.id} value={`${c.brand} ${c.model}`}>{c.brand} {c.model}</option>)}
            </Select>
            <Textarea label="Message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} error={errors.message} placeholder="Tell us what you'd like to know" />
            <Button type="submit" fullWidth>Send Enquiry</Button>
          </form>
        )}
      </div>
    </div>
  );
}
