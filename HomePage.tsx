import { Link } from 'react-router-dom';
import {
  ArrowRight, Calendar, Car, CheckCircle2, Clock, GitCompare, Heart,
  Phone, ShieldCheck, Sparkles, Star, ThumbsUp, Zap,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { BRANDS, CARS, CATEGORIES, HOME_REVIEWS, formatPrice, formatEmi } from '@/data';
import { CarCard } from '@/components/CarCard';
import { SearchBar } from '@/components/SearchBar';
import { SectionHeader } from '@/components/SectionHeader';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export function HomePage() {
  const { cars, compareList } = useApp();
  const published = cars.filter((c) => c.published);

  const featured = published.filter((c) => c.featured).slice(0, 8);
  const latest = [...published].sort((a, b) => b.year - a.year).slice(0, 4);
  const under10 = published.filter((c) => c.price <= 1000000).slice(0, 4);
  const luxury = published.filter((c) => c.bodyType === 'Luxury').slice(0, 4);
  const electric = published.filter((c) => c.bodyType === 'Electric' || c.fuel === 'Electric').slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/28380935/pexels-photo-28380935.jpeg?auto=compress&cs=tinysrgb&h=900&w=1600"
            alt="Luxury car"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950 via-ink-950/85 to-ink-950/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-ink-950/40" />
        </div>
        <div className="container-px relative py-20 sm:py-28 lg:py-36">
          <div className="max-w-2xl">
            <Badge tone="brand" className="mb-4">
              <Sparkles size={13} /> India's Premium Car Marketplace
            </Badge>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl text-balance">
              Find Your <span className="text-brand-500">Perfect Car</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink-200">
              Explore, compare and discover your next car with Auto Empire.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-ink-300">
              <span className="flex items-center gap-1.5"><ShieldCheck size={16} className="text-brand-500" /> Verified listings</span>
              <span className="flex items-center gap-1.5"><GitCompare size={16} className="text-brand-500" /> Side-by-side compare</span>
              <span className="flex items-center gap-1.5"><Calendar size={16} className="text-brand-500" /> Book test drives</span>
            </div>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="container-px -mt-10 relative z-10">
        <SearchBar />
        <div className="mt-4 flex justify-center">
          <div className="inline-flex rounded-xl border border-ink-700 bg-ink-850/80 p-1 backdrop-blur">
            <Link to="/explore?status=New" className="rounded-lg px-5 py-2 text-sm font-semibold text-white transition hover:bg-ink-800">
              New Cars
            </Link>
            <Link to="/explore?status=Used" className="rounded-lg px-5 py-2 text-sm font-semibold text-ink-300 transition hover:bg-ink-800 hover:text-white">
              Used Cars
            </Link>
          </div>
        </div>
      </section>

      {/* Popular Brands */}
      <section className="container-px mt-20">
        <SectionHeader eyebrow="Browse by make" title="Popular Brands" description="Explore cars from India's most-loved automakers." actionTo="/brands" actionLabel="All Brands" />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10">
          {BRANDS.map((b, i) => (
            <Link
              key={b.id}
              to={`/explore?brand=${encodeURIComponent(b.name)}`}
              className="group flex flex-col items-center gap-2 rounded-2xl border border-ink-700/70 bg-ink-850 p-4 text-center transition hover:-translate-y-0.5 hover:border-brand-500/60 hover:shadow-card animate-fade-up"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-ink-800 text-ink-300 transition group-hover:bg-brand-600 group-hover:text-white">
                <Car size={22} />
              </span>
              <span className="text-xs font-semibold text-ink-100">{b.name}</span>
              <span className="text-[10px] text-ink-500">{b.count} models</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Categories */}
      <section className="container-px mt-16">
        <SectionHeader eyebrow="Find your fit" title="Popular Car Categories" description="Pick a body style and we'll show the best matches." />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.id}
              to={`/explore?bodyType=${c.name}`}
              className="group relative overflow-hidden rounded-2xl border border-ink-700/70 bg-ink-850 animate-fade-up"
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={c.image} alt={c.name} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              </div>
              <div className="absolute inset-x-0 bottom-0 p-3">
                <p className="font-display text-sm font-bold text-white">{c.name}</p>
                <p className="text-[11px] text-ink-300">{c.count} cars</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="container-px mt-16">
        <SectionHeader eyebrow="Editor's picks" title="Featured Cars" description="Hand-selected rides worth your attention." actionTo="/explore" actionLabel="View All" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      </section>

      {/* Latest + Under 10 Lakh */}
      <section className="container-px mt-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader title="Latest Cars" actionTo="/explore?sort=newest" actionLabel="More" />
            <div className="grid gap-4 sm:grid-cols-2">
              {latest.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Best Cars Under ₹10 Lakh" actionTo="/explore?budget=0-10" actionLabel="More" />
            <div className="grid gap-4 sm:grid-cols-2">
              {under10.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Luxury + Electric */}
      <section className="container-px mt-16">
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeader title="Luxury Cars" actionTo="/explore?bodyType=Luxury" actionLabel="More" />
            <div className="grid gap-4 sm:grid-cols-2">
              {luxury.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </div>
          <div>
            <SectionHeader title="Electric Cars" actionTo="/explore?fuel=Electric" actionLabel="More" />
            <div className="grid gap-4 sm:grid-cols-2">
              {electric.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compare CTA */}
      <section className="container-px mt-16">
        <div className="relative overflow-hidden rounded-3xl border border-ink-700/70 bg-gradient-to-br from-ink-850 to-ink-900 p-8 sm:p-12">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand-600/10 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Badge tone="brand" className="mb-3"><GitCompare size={13} /> Compare</Badge>
              <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">Compare Cars Side by Side</h2>
              <p className="mt-3 text-sm text-ink-300">
                Stack up to four cars against each other on price, engine, mileage, safety and features. You currently have {compareList.length} car{compareList.length === 1 ? '' : 's'} in your compare list.
              </p>
            </div>
            <Link to="/compare">
              <Button size="lg" rightIcon={<ArrowRight size={18} />}>Open Compare</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Test Drive CTA */}
      <section className="container-px mt-16">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="relative overflow-hidden rounded-3xl border border-ink-700/70 bg-ink-850 p-8">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-brand-600/10 blur-3xl" />
            <Calendar size={28} className="text-brand-500" />
            <h3 className="mt-4 font-display text-xl font-bold text-white">Book a Test Drive</h3>
            <p className="mt-2 text-sm text-ink-400">Get behind the wheel before you decide. Pick a car, date and city — we'll handle the rest.</p>
            <Link to="/test-drive" className="mt-5 inline-block">
              <Button rightIcon={<ArrowRight size={16} />}>Book Now</Button>
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-ink-700/70 bg-ink-850 p-8">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
            <Phone size={28} className="text-sky-400" />
            <h3 className="mt-4 font-display text-xl font-bold text-white">Send an Enquiry</h3>
            <p className="mt-2 text-sm text-ink-400">Have a question about a car, pricing or finance? Our team replies within one business day.</p>
            <Link to="/enquiry" className="mt-5 inline-block">
              <Button variant="outline" rightIcon={<ArrowRight size={16} />}>Enquire Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="container-px mt-20">
        <SectionHeader eyebrow="The Auto Empire promise" title="Why Choose Auto Empire" description="We obsess over the details so your car-buying journey feels effortless." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: ShieldCheck, title: 'Verified Listings', text: 'Every car is checked for accurate specs and honest pricing.' },
            { icon: GitCompare, title: 'Smart Compare', text: 'Compare up to four cars on 15+ parameters in seconds.' },
            { icon: Calendar, title: 'Easy Test Drives', text: 'Book a test drive online and drive the car before you buy.' },
            { icon: Zap, title: 'EMI Calculator', text: 'See monthly EMIs instantly and plan your budget with clarity.' },
          ].map((f, i) => (
            <div key={i} className="card-surface p-6 transition hover:border-brand-500/60 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-600/15 text-brand-400">
                <f.icon size={22} />
              </span>
              <h3 className="mt-4 font-display text-base font-bold text-white">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink-400">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews */}
      <section className="container-px mt-20">
        <SectionHeader eyebrow="Loved by buyers" title="Customer Reviews" description="Real stories from people who found their perfect drive." />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_REVIEWS.map((r, i) => (
            <div key={r.id} className="card-surface p-6 animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
              <div className="flex gap-0.5 text-brand-500">
                {Array.from({ length: r.rating }).map((_, j) => (
                  <Star key={j} size={15} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm text-ink-200">{r.text}</p>
              <div className="mt-4 flex items-center gap-3 border-t border-ink-700/60 pt-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600/15 font-bold text-brand-400">
                  {r.name.charAt(0)}
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{r.name}</p>
                  <p className="text-xs text-ink-500">{r.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured price strip */}
      <section className="container-px mt-20">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[...CARS.slice(0, 4)].map((c) => (
            <Link key={c.id} to={`/car/${c.id}`} className="card-surface group flex items-center gap-3 p-3 transition hover:border-brand-500/60">
              <img src={c.image} alt={c.model} className="h-14 w-20 rounded-lg object-cover" />
              <div className="min-w-0">
                <p className="truncate text-xs text-ink-400">{c.brand}</p>
                <p className="truncate text-sm font-bold text-white">{c.model}</p>
                <p className="text-xs font-semibold text-brand-400">{formatPrice(c.price)}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
