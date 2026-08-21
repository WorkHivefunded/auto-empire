import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { Car, Heart, GitCompare, Menu, Search, User, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/explore', label: 'Explore Cars' },
  { to: '/explore?status=New', label: 'New Cars' },
  { to: '/explore?status=Used', label: 'Used Cars' },
  { to: '/brands', label: 'Brands' },
  { to: '/compare', label: 'Compare' },
  { to: '/wishlist', label: 'Wishlist' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');
  const { wishlist, compareList } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [location.pathname, location.search]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(query)}`);
    setSearchOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-ink-700/60 bg-ink-950/90 backdrop-blur-xl' : 'bg-gradient-to-b from-ink-950/80 to-transparent'
      }`}
    >
      <div className="container-px">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
              <Car size={20} strokeWidth={2.5} />
            </span>
            <span className="font-display text-xl font-extrabold tracking-tight text-white">
              Auto<span className="text-brand-500">Empire</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((l) => (
              <NavLink
                key={l.label}
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  `relative rounded-lg px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive ? 'text-white' : 'text-ink-300 hover:text-white'
                  }`
                }
              >
                {l.label}
                {(l.label === 'Wishlist' && wishlist.length > 0) || (l.label === 'Compare' && compareList.length > 0) ? (
                  <span className="ml-1.5 rounded-full bg-brand-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
                    {l.label === 'Wishlist' ? wishlist.length : compareList.length}
                  </span>
                ) : null}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setSearchOpen((s) => !s)}
              className="rounded-lg p-2.5 text-ink-200 transition hover:bg-ink-800 hover:text-white"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link
              to="/wishlist"
              className="hidden rounded-lg p-2.5 text-ink-200 transition hover:bg-ink-800 hover:text-white sm:block"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </Link>
            <Link
              to="/compare"
              className="hidden rounded-lg p-2.5 text-ink-200 transition hover:bg-ink-800 hover:text-white sm:block"
              aria-label="Compare"
            >
              <GitCompare size={20} />
            </Link>
            <Link
              to="/login"
              className="hidden items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-500 sm:inline-flex"
            >
              <User size={16} />
              Login
            </Link>
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="rounded-lg p-2.5 text-ink-200 transition hover:bg-ink-800 hover:text-white lg:hidden"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {searchOpen && (
          <div className="hidden pb-4 lg:block">
            <form onSubmit={submitSearch} className="relative">
              <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by brand or model (e.g. Creta, BMW, Nexon)"
                className="input-base h-12 pl-11 text-base"
              />
            </form>
          </div>
        )}
      </div>

      {mobileOpen && (
        <div className="lg:hidden">
          <div className="border-t border-ink-700/60 bg-ink-950/95 px-4 py-4 backdrop-blur-xl">
            <form onSubmit={submitSearch} className="relative mb-3">
              <Search size={18} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search cars..."
                className="input-base pl-11"
              />
            </form>
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <NavLink
                  key={l.label}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive ? 'bg-brand-600/15 text-white' : 'text-ink-200 hover:bg-ink-800 hover:text-white'
                    }`
                  }
                >
                  {l.label}
                  {l.label === 'Wishlist' && wishlist.length > 0 && (
                    <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">{wishlist.length}</span>
                  )}
                  {l.label === 'Compare' && compareList.length > 0 && (
                    <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[10px] font-bold text-white">{compareList.length}</span>
                  )}
                </NavLink>
              ))}
              <Link
                to="/login"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white"
              >
                <User size={16} />
                Login
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
