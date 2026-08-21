import { useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  BarChart3, Car, CarFront, LayoutDashboard, LogOut, Menu, Settings,
  Tag, Users, Wrench, X, Mail, CalendarCheck,
} from 'lucide-react';
import { useApp } from '@/context/AppContext';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/cars', label: 'Cars', icon: Car },
  { to: '/admin/cars/new', label: 'Add Car', icon: CarFront },
  { to: '/admin/brands', label: 'Brands', icon: Tag },
  { to: '/admin/categories', label: 'Categories', icon: BarChart3 },
  { to: '/admin/enquiries', label: 'Enquiries', icon: Mail },
  { to: '/admin/test-drives', label: 'Test Drives', icon: CalendarCheck },
  { to: '/admin/customers', label: 'Customers', icon: Users },
  { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export function AdminLayout() {
  const { isAdmin, logoutAdmin } = useApp();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (!isAdmin) {
    navigate('/login');
    return null;
  }

  const logout = () => {
    logoutAdmin();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-ink-950">
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-ink-700/60 bg-ink-950/95 px-4 py-3 backdrop-blur lg:hidden">
        <Link to="/admin" className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Car size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-lg font-extrabold text-white">Auto<span className="text-brand-500">Empire</span></span>
        </Link>
        <button onClick={() => setSidebarOpen(true)} className="rounded-lg p-2 text-ink-200 hover:bg-ink-800">
          <Menu size={22} />
        </button>
      </div>

      <div className="flex">
        {/* Desktop sidebar */}
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-ink-700/60 bg-ink-900 p-4 lg:flex">
          <AdminSidebarContent logout={logout} />
        </aside>

        {/* Mobile drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <aside className="absolute left-0 top-0 h-full w-72 border-r border-ink-700 bg-ink-900 p-4 animate-fade-in">
              <button onClick={() => setSidebarOpen(false)} className="mb-2 ml-auto flex rounded-lg p-2 text-ink-300 hover:bg-ink-800">
                <X size={20} />
              </button>
              <AdminSidebarContent logout={logout} onNavigate={() => setSidebarOpen(false)} />
            </aside>
          </div>
        )}

        {/* Main content */}
        <main className="min-w-0 flex-1">
          <div className="container-px py-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

function AdminSidebarContent({ logout, onNavigate }: { logout: () => void; onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link to="/admin" onClick={onNavigate} className="mb-6 hidden items-center gap-2 lg:flex">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow">
          <Car size={20} strokeWidth={2.5} />
        </span>
        <span className="font-display text-xl font-extrabold text-white">Auto<span className="text-brand-500">Empire</span></span>
      </Link>
      <p className="mb-3 hidden text-xs font-semibold uppercase tracking-wide text-ink-500 lg:block">Admin Panel</p>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                isActive ? 'bg-brand-600 text-white shadow-glow' : 'text-ink-300 hover:bg-ink-800 hover:text-white'
              }`
            }
          >
            <item.icon size={18} />
            {item.label}
          </NavLink>
        ))}
      </nav>
      <div className="mt-4 border-t border-ink-700/60 pt-4">
        <Link
          to="/"
          onClick={onNavigate}
          className="mb-1 flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-300 transition hover:bg-ink-800 hover:text-white"
        >
          <Wrench size={18} /> View Site
        </Link>
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-ink-300 transition hover:bg-brand-600/15 hover:text-brand-400"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </div>
  );
}
