import { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft, Calendar, Check, ChevronLeft, ChevronRight, Fuel, Gauge,
  GitCompare, Heart, Mail, Phone, Settings2, ShieldCheck, ThumbsDown,
  ThumbsUp, Users, Package, Cog, Battery, Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { formatPrice, formatEmi } from '@/data';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { CarCard } from '@/components/CarCard';
import { Modal } from '@/components/ui/Modal';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { useToast } from '@/components/ui/Toast';

export function CarDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { cars, toggleWishlist, isWishlisted, toggleCompare, isInCompare } = useApp();
  const toast = useToast();

  const car = cars.find((c) => c.id === id);

  const [activeImg, setActiveImg] = useState(0);
  const [emiAmount, setEmiAmount] = useState(car ? car.price : 0);
  const [tenure, setTenure] = useState(60);
  const [downPayment, setDownPayment] = useState(0);
  const [tdOpen, setTdOpen] = useState(false);
  const [enqOpen, setEnqOpen] = useState(false);

  const similar = useMemo(() => {
    if (!car) return [];
    return cars.filter((c) => c.id !== car.id && c.published && (c.bodyType === car.bodyType || c.brand === car.brand)).slice(0, 4);
  }, [cars, car]);

  if (!car) {
    return (
      <div className="container-px py-20 text-center">
        <p className="font-display text-2xl font-bold text-white">Car not found</p>
        <Button className="mt-4" onClick={() => navigate('/explore')}>Back to Explore</Button>
      </div>
    );
  }

  const wished = isWishlisted(car.id);
  const comparing = isInCompare(car.id);
  const principal = Math.max(emiAmount - downPayment, 0);
  const rate = 9.5 / 12 / 100;
  const monthly = principal > 0 ? Math.round((principal * rate * Math.pow(1 + rate, tenure)) / (Math.pow(1 + rate, tenure) - 1)) : 0;

  const specs = [
    { icon: Cog, label: 'Engine', value: car.engine },
    { icon: Zap, label: 'Power', value: car.power },
    { icon: Gauge, label: 'Torque', value: car.torque },
    { icon: Fuel, label: 'Fuel', value: car.fuel },
    { icon: Settings2, label: 'Transmission', value: car.transmission },
    { icon: Users, label: 'Seating', value: `${car.seating} seats` },
    { icon: Package, label: 'Boot Space', value: car.bootSpace },
    { icon: ShieldCheck, label: 'Safety Rating', value: `${car.safetyRating} Star` },
  ];

  return (
    <div className="container-px py-6">
      <button onClick={() => navigate(-1)} className="mb-4 inline-flex items-center gap-1.5 text-sm text-ink-300 transition hover:text-white">
        <ArrowLeft size={16} /> Back
      </button>

      {/* Gallery + summary */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-900">
            <img src={car.gallery[activeImg]} alt={`${car.brand} ${car.model}`} className="h-full w-full object-cover" />
            <div className="absolute left-3 top-3 flex gap-1.5">
              <Badge tone={car.status === 'New' ? 'brand' : 'info'}>{car.status}</Badge>
              {car.featured && <Badge tone="warning">Featured</Badge>}
            </div>
            {activeImg > 0 && (
              <button onClick={() => setActiveImg((i) => i - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70">
                <ChevronLeft size={18} />
              </button>
            )}
            {activeImg < car.gallery.length - 1 && (
              <button onClick={() => setActiveImg((i) => i + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur hover:bg-black/70">
                <ChevronRight size={18} />
              </button>
            )}
          </div>
          <div className="mt-3 grid grid-cols-4 gap-2">
            {car.gallery.map((g, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                className={`aspect-[4/3] overflow-hidden rounded-lg border-2 transition ${
                  activeImg === i ? 'border-brand-500' : 'border-transparent opacity-70 hover:opacity-100'
                }`}
              >
                <img src={g} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-brand-500">{car.brand}</p>
          <h1 className="mt-1 font-display text-3xl font-extrabold text-white">{car.model}</h1>
          <p className="text-sm text-ink-400">{car.variant} &middot; {car.year}</p>

          <div className="mt-5 rounded-2xl border border-ink-700/70 bg-ink-850 p-5">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs text-ink-400">Price</p>
                <p className="font-display text-3xl font-extrabold text-white">{formatPrice(car.price)}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-ink-400">EMI starts at</p>
                <p className="font-display text-xl font-bold text-brand-400">{formatEmi(car.emiStart)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button leftIcon={<Calendar size={16} />} onClick={() => setTdOpen(true)}>Book Test Drive</Button>
              <Button variant="outline" leftIcon={<Mail size={16} />} onClick={() => setEnqOpen(true)}>Send Enquiry</Button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Button
              variant={wished ? 'primary' : 'outline'}
              leftIcon={<Heart size={16} fill={wished ? 'currentColor' : 'none'} />}
              onClick={() => { toggleWishlist(car.id); toast(wished ? 'Removed from wishlist' : 'Added to wishlist'); }}
            >
              {wished ? 'Wishlisted' : 'Add to Wishlist'}
            </Button>
            <Button
              variant={comparing ? 'primary' : 'outline'}
              leftIcon={<GitCompare size={16} />}
              onClick={() => { toggleCompare(car.id); toast(comparing ? 'Removed from compare' : 'Added to compare'); }}
            >
              {comparing ? 'In Compare' : 'Add to Compare'}
            </Button>
          </div>

          {/* Colors */}
          <div className="mt-6">
            <p className="label-base">Available Colors</p>
            <div className="flex flex-wrap gap-2.5">
              {car.colors.map((c) => (
                <div key={c.name} className="flex items-center gap-2 rounded-xl border border-ink-700 bg-ink-850 px-3 py-2">
                  <span className="h-5 w-5 rounded-full border border-ink-600" style={{ background: c.hex }} />
                  <span className="text-xs text-ink-200">{c.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="mt-10 card-surface p-6">
        <h2 className="font-display text-xl font-bold text-white">Overview</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-300">{car.description}</p>
      </div>

      {/* Specs */}
      <div className="mt-6 card-surface p-6">
        <h2 className="font-display text-xl font-bold text-white">Key Specifications</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {specs.map((s) => (
            <div key={s.label} className="rounded-xl border border-ink-700/70 bg-ink-900 p-4">
              <s.icon size={18} className="text-brand-500" />
              <p className="mt-2 text-xs text-ink-400">{s.label}</p>
              <p className="text-sm font-bold text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* EMI Calculator */}
      <div className="mt-6 card-surface p-6">
        <h2 className="font-display text-xl font-bold text-white">EMI Calculator</h2>
        <p className="mt-1 text-sm text-ink-400">Estimate your monthly installment based on loan amount and tenure.</p>
        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs">
                <span className="text-ink-400">Loan Amount</span>
                <span className="font-semibold text-white">{formatPrice(emiAmount)}</span>
              </div>
              <input type="range" min={100000} max={car.price * 1.2} step={50000} value={emiAmount} onChange={(e) => setEmiAmount(Number(e.target.value))} className="mt-2 w-full accent-brand-600" />
            </div>
            <div>
              <div className="flex justify-between text-xs">
                <span className="text-ink-400">Down Payment</span>
                <span className="font-semibold text-white">{formatPrice(downPayment)}</span>
              </div>
              <input type="range" min={0} max={emiAmount} step={50000} value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} className="mt-2 w-full accent-brand-600" />
            </div>
            <div>
              <div className="flex justify-between text-xs">
                <span className="text-ink-400">Tenure</span>
                <span className="font-semibold text-white">{tenure} months</span>
              </div>
              <input type="range" min={12} max={84} step={12} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="mt-2 w-full accent-brand-600" />
            </div>
          </div>
          <div className="flex flex-col justify-center rounded-2xl bg-gradient-to-br from-brand-600/15 to-ink-900 p-6 text-center">
            <p className="text-xs uppercase tracking-wide text-ink-400">Estimated Monthly EMI</p>
            <p className="mt-1 font-display text-4xl font-extrabold text-white">{formatEmi(monthly)}</p>
            <p className="mt-2 text-xs text-ink-400">at 9.5% interest rate</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="mt-6 card-surface p-6">
        <h2 className="font-display text-xl font-bold text-white">Features</h2>
        <div className="mt-4 grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {car.features.map((f) => (
            <div key={f} className="flex items-center gap-2.5 rounded-lg border border-ink-700/70 bg-ink-900 px-3.5 py-2.5">
              <Check size={16} className="text-emerald-400" />
              <span className="text-sm text-ink-200">{f}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pros & Cons */}
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="card-surface p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white"><ThumbsUp size={18} className="text-emerald-400" /> Pros</h3>
          <ul className="mt-3 space-y-2">
            {car.pros.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm text-ink-200">
                <Check size={16} className="mt-0.5 shrink-0 text-emerald-400" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="card-surface p-6">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-white"><ThumbsDown size={18} className="text-brand-400" /> Cons</h3>
          <ul className="mt-3 space-y-2">
            {car.cons.map((c) => (
              <li key={c} className="flex items-start gap-2 text-sm text-ink-200">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Variants */}
      <div className="mt-6 card-surface p-6">
        <h2 className="font-display text-xl font-bold text-white">Variants</h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-ink-700 text-xs uppercase text-ink-400">
                <th className="py-3 pr-4 font-semibold">Variant</th>
                <th className="py-3 px-4 font-semibold">Fuel</th>
                <th className="py-3 px-4 font-semibold">Transmission</th>
                <th className="py-3 pl-4 text-right font-semibold">Price</th>
              </tr>
            </thead>
            <tbody>
              {car.variants.map((v) => (
                <tr key={v.name} className="border-b border-ink-700/50 last:border-0">
                  <td className="py-3.5 pr-4 font-semibold text-white">{v.name}</td>
                  <td className="py-3.5 px-4 text-ink-300">{v.fuel}</td>
                  <td className="py-3.5 px-4 text-ink-300">{v.transmission}</td>
                  <td className="py-3.5 pl-4 text-right font-bold text-brand-400">{formatPrice(v.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-6 card-surface p-6">
        <h2 className="font-display text-xl font-bold text-white">User Reviews</h2>
        <div className="mt-4 space-y-4">
          {car.reviews.map((r) => (
            <div key={r.id} className="rounded-xl border border-ink-700/70 bg-ink-900 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600/15 font-bold text-brand-400">{r.author.charAt(0)}</span>
                  <div>
                    <p className="text-sm font-semibold text-white">{r.author}</p>
                    <p className="text-xs text-ink-500">{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5 text-brand-500">
                  {Array.from({ length: r.rating }).map((_, i) => <span key={i} className="text-sm">★</span>)}
                </div>
              </div>
              <p className="mt-3 text-sm font-semibold text-white">{r.title}</p>
              <p className="mt-1 text-sm text-ink-300">{r.body}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Similar */}
      {similar.length > 0 && (
        <div className="mt-10">
          <h2 className="mb-4 font-display text-xl font-bold text-white">Similar Cars</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((c, i) => <CarCard key={c.id} car={c} index={i} />)}
          </div>
        </div>
      )}

      <TestDriveModal open={tdOpen} onClose={() => setTdOpen(false)} carName={`${car.brand} ${car.model}`} />
      <EnquiryModal open={enqOpen} onClose={() => setEnqOpen(false)} carName={`${car.brand} ${car.model}`} />
    </div>
  );
}

export function TestDriveModal({ open, onClose, carName }: { open: boolean; onClose: () => void; carName?: string }) {
  const toast = useToast();
  const { cars } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', car: carName ?? '', date: '', time: '', city: '', message: '' });
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

  const close = () => { setSubmitted(false); onClose(); setForm({ name: '', phone: '', email: '', car: carName ?? '', date: '', time: '', city: '', message: '' }); };

  return (
    <Modal open={open} onClose={close} title={submitted ? undefined : 'Book a Test Drive'} size="md">
      {submitted ? (
        <div className="py-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Check size={28} />
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-white">Test Drive Booked!</h3>
          <p className="mt-2 text-sm text-ink-400">Our team will call you shortly to confirm your slot.</p>
          <Button className="mt-5" onClick={close}>Done</Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
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
          <Button type="submit" fullWidth>Confirm Test Drive</Button>
        </form>
      )}
    </Modal>
  );
}

export function EnquiryModal({ open, onClose, carName }: { open: boolean; onClose: () => void; carName?: string }) {
  const toast = useToast();
  const { cars } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', car: carName ?? '', message: '' });
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

  const close = () => { setSubmitted(false); onClose(); setForm({ name: '', phone: '', email: '', car: carName ?? '', message: '' }); };

  return (
    <Modal open={open} onClose={close} title={submitted ? undefined : 'Send an Enquiry'} size="md">
      {submitted ? (
        <div className="py-6 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-400">
            <Check size={28} />
          </div>
          <h3 className="mt-4 font-display text-xl font-bold text-white">Enquiry Sent!</h3>
          <p className="mt-2 text-sm text-ink-400">Our team will get back to you within one business day.</p>
          <Button className="mt-5" onClick={close}>Done</Button>
        </div>
      ) : (
        <form onSubmit={submit} className="space-y-4">
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
    </Modal>
  );
}
