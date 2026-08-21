import { Link } from 'react-router-dom';
import { Car, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-700/60 bg-ink-950">
      <div className="container-px py-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                <Car size={20} strokeWidth={2.5} />
              </span>
              <span className="font-display text-xl font-extrabold text-white">
                Auto<span className="text-brand-500">Empire</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-ink-400">
              Find Your Perfect Drive. Explore, compare and discover your next car with India's premium car marketplace.
            </p>
            <div className="mt-5 flex gap-2">
              {[Facebook, Instagram, Twitter, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-ink-700 bg-ink-850 text-ink-300 transition hover:border-brand-500 hover:text-brand-400"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">Explore</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: '/explore', label: 'All Cars' },
                { to: '/explore?status=New', label: 'New Cars' },
                { to: '/explore?status=Used', label: 'Used Cars' },
                { to: '/explore?bodyType=Electric', label: 'Electric Cars' },
                { to: '/explore?bodyType=Luxury', label: 'Luxury Cars' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-ink-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">Company</h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {[
                { to: '/brands', label: 'Brands' },
                { to: '/compare', label: 'Compare Cars' },
                { to: '/wishlist', label: 'Wishlist' },
                { to: '/test-drive', label: 'Book Test Drive' },
                { to: '/enquiry', label: 'Customer Enquiry' },
                { to: '/admin', label: 'Admin Panel' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-ink-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wide text-white">Contact</h4>
            <ul className="mt-4 space-y-3 text-sm text-ink-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="mt-0.5 shrink-0 text-brand-500" />
                <span>Auto Empire Tower, Bandra Kurla Complex, Mumbai 400051</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="shrink-0 text-brand-500" />
                <span>+91 1800 200 3000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="shrink-0 text-brand-500" />
                <span>care@autoempire.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-3 border-t border-ink-700/60 pt-6 text-xs text-ink-500 sm:flex-row">
          <p>&copy; {new Date().getFullYear()} Auto Empire. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-ink-200">Privacy</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-ink-200">Terms</a>
            <a href="#" onClick={(e) => e.preventDefault()} className="transition hover:text-ink-200">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
