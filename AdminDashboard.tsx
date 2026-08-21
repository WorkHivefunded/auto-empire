import { Link } from 'react-router-dom';
import {
  Car, Mail, CalendarCheck, Heart, CheckCircle2, Star,
  TrendingUp, ArrowUpRight, Users,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { ENQUIRIES, TEST_DRIVES, CUSTOMERS, CATEGORIES, BRANDS, formatPrice } from '@/data';
import { Badge } from '@/components/ui/Badge';

export function AdminDashboard() {
  const { cars, wishlist } = useApp();
  const published = cars.filter((c) => c.published);
  const featured = cars.filter((c) => c.featured);

  const kpis = [
    { label: 'Total Cars', value: cars.length, icon: Car, tone: 'bg-brand-600/15 text-brand-400' },
    { label: 'Published Cars', value: published.length, icon: CheckCircle2, tone: 'bg-emerald-500/15 text-emerald-400' },
    { label: 'Enquiries', value: ENQUIRIES.length, icon: Mail, tone: 'bg-sky-500/15 text-sky-400' },
    { label: 'Test Drives', value: TEST_DRIVES.length, icon: CalendarCheck, tone: 'bg-amber-500/15 text-amber-400' },
    { label: 'Wishlist Adds', value: wishlist.length, icon: Heart, tone: 'bg-pink-500/15 text-pink-400' },
    { label: 'Featured Cars', value: featured.length, icon: Star, tone: 'bg-violet-500/15 text-violet-400' },
  ];

  // Enquiries over time (mock last 6 months)
  const months = ['Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
  const enquiryData = [3, 5, 4, 7, 6, 8];
  const maxEnq = Math.max(...enquiryData);

  // Cars by category
  const byCategory = CATEGORIES.map((cat) => ({
    name: cat.name,
    count: cars.filter((c) => c.bodyType === cat.name).length,
  }));
  const maxCat = Math.max(...byCategory.map((c) => c.count), 1);

  // Popular brands
  const brandStats = BRANDS.slice(0, 6).map((b) => ({
    name: b.name,
    count: cars.filter((c) => c.brand === b.name).length,
  }));
  const maxBrand = Math.max(...brandStats.map((b) => b.count), 1);

  const recent = [...cars].sort((a, b) => b.year - a.year).slice(0, 5);

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-white">Dashboard</h1>
        <p className="mt-1 text-sm text-ink-400">Welcome back. Here's what's happening at Auto Empire.</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {kpis.map((k) => (
          <div key={k.label} className="card-surface p-4">
            <span className={`flex h-10 w-10 items-center justify-center rounded-xl ${k.tone}`}>
              <k.icon size={20} />
            </span>
            <p className="mt-3 font-display text-2xl font-extrabold text-white">{k.value}</p>
            <p className="text-xs text-ink-400">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        {/* Enquiries over time */}
        <div className="card-surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white">Enquiries Over Time</h2>
            <Badge tone="success"><TrendingUp size={12} /> +18%</Badge>
          </div>
          <div className="flex h-48 items-end justify-between gap-3">
            {enquiryData.map((v, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-brand-600 to-brand-500 transition-all duration-500"
                    style={{ height: `${(v / maxEnq) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-ink-400">{months[i]}</span>
                <span className="text-xs font-bold text-white">{v}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular brands */}
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Popular Brands</h2>
          <div className="space-y-3">
            {brandStats.map((b) => (
              <div key={b.name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-ink-300">{b.name}</span>
                  <span className="font-semibold text-white">{b.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink-800">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: `${(b.count / maxBrand) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cars by category + Recent cars */}
      <div className="mt-4 grid gap-4 lg:grid-cols-3">
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Cars by Category</h2>
          <div className="space-y-3">
            {byCategory.map((c) => (
              <div key={c.name}>
                <div className="mb-1 flex justify-between text-xs">
                  <span className="text-ink-300">{c.name}</span>
                  <span className="font-semibold text-white">{c.count}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-ink-800">
                  <div className="h-full rounded-full bg-brand-600" style={{ width: `${(c.count / maxCat) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-surface p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white">Recent Cars</h2>
            <Link to="/admin/cars" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300">
              View all <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="space-y-2">
            {recent.map((c) => (
              <Link key={c.id} to={`/admin/cars/${c.id}/edit`} className="flex items-center gap-3 rounded-xl border border-ink-700/70 bg-ink-900 p-3 transition hover:border-brand-500/60">
                <img src={c.image} alt={c.model} className="h-12 w-16 rounded-lg object-cover" />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-bold text-white">{c.brand} {c.model}</p>
                  <p className="truncate text-xs text-ink-400">{c.variant}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-brand-400">{formatPrice(c.price)}</p>
                  <div className="flex justify-end gap-1">
                    <Badge tone={c.published ? 'success' : 'neutral'}>{c.published ? 'Live' : 'Draft'}</Badge>
                    {c.featured && <Badge tone="warning"><Star size={10} /></Badge>}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Recent enquiries + customers */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Recent Enquiries</h2>
          <div className="space-y-2">
            {ENQUIRIES.slice(0, 4).map((e) => (
              <div key={e.id} className="flex items-center justify-between rounded-xl border border-ink-700/70 bg-ink-900 p-3">
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-white">{e.name}</p>
                  <p className="truncate text-xs text-ink-400">{e.car}</p>
                </div>
                <Badge tone={e.status === 'New' ? 'brand' : e.status === 'Contacted' ? 'info' : e.status === 'Converted' ? 'success' : 'neutral'}>
                  {e.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
        <div className="card-surface p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-white">New Customers</h2>
            <Link to="/admin/customers" className="inline-flex items-center gap-1 text-sm font-semibold text-brand-400 hover:text-brand-300">
              <Users size={14} /> All
            </Link>
          </div>
          <div className="space-y-2">
            {CUSTOMERS.slice(0, 4).map((c) => (
              <div key={c.id} className="flex items-center gap-3 rounded-xl border border-ink-700/70 bg-ink-900 p-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600/15 font-bold text-brand-400">{c.name.charAt(0)}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-white">{c.name}</p>
                  <p className="truncate text-xs text-ink-400">{c.email}</p>
                </div>
                <span className="text-xs text-ink-500">{c.registeredOn}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
