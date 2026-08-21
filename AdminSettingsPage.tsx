import { useState } from 'react';
import { Save } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useToast } from '@/components/ui/Toast';

export function AdminSettingsPage() {
  const toast = useToast();
  const [site, setSite] = useState({ name: 'Auto Empire', tagline: 'Find Your Perfect Drive', email: 'care@autoempire.com', phone: '+91 1800 200 3000', address: 'Auto Empire Tower, Bandra Kurla Complex, Mumbai 400051' });
  const [profile, setProfile] = useState({ name: 'Admin User', email: 'admin@autoempire.com' });
  const [notifications, setNotifications] = useState({ newEnquiries: true, testDrives: true, weeklyReport: false });

  const saveSite = (e: React.FormEvent) => { e.preventDefault(); toast('Website settings saved'); };
  const saveProfile = (e: React.FormEvent) => { e.preventDefault(); toast('Profile updated'); };
  const saveNotifs = (e: React.FormEvent) => { e.preventDefault(); toast('Notification preferences saved'); };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-white">Settings</h1>
        <p className="mt-1 text-sm text-ink-400">Manage your website, contact info, profile and notifications.</p>
      </div>

      <div className="space-y-6">
        {/* Website settings */}
        <form onSubmit={saveSite} className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Website Settings</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Site Name" value={site.name} onChange={(e) => setSite({ ...site, name: e.target.value })} />
            <Input label="Tagline" value={site.tagline} onChange={(e) => setSite({ ...site, tagline: e.target.value })} />
          </div>
          <Button type="submit" className="mt-4" leftIcon={<Save size={16} />}>Save</Button>
        </form>

        {/* Contact info */}
        <form onSubmit={saveSite} className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Contact Information</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Email" type="email" value={site.email} onChange={(e) => setSite({ ...site, email: e.target.value })} />
            <Input label="Phone" value={site.phone} onChange={(e) => setSite({ ...site, phone: e.target.value })} />
          </div>
          <div className="mt-3">
            <Textarea label="Address" rows={2} value={site.address} onChange={(e) => setSite({ ...site, address: e.target.value })} />
          </div>
          <Button type="submit" className="mt-4" leftIcon={<Save size={16} />}>Save</Button>
        </form>

        {/* Admin profile */}
        <form onSubmit={saveProfile} className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Admin Profile</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <Input label="Name" value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} />
            <Input label="Email" type="email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} />
          </div>
          <Button type="submit" className="mt-4" leftIcon={<Save size={16} />}>Save</Button>
        </form>

        {/* Notifications */}
        <form onSubmit={saveNotifs} className="card-surface p-5">
          <h2 className="mb-4 font-display text-base font-bold text-white">Notification Preferences</h2>
          <div className="space-y-3">
            {([
              { key: 'newEnquiries', label: 'New enquiry alerts', desc: 'Get notified when a customer submits an enquiry' },
              { key: 'testDrives', label: 'Test drive alerts', desc: 'Get notified when a test drive is booked' },
              { key: 'weeklyReport', label: 'Weekly report', desc: 'Receive a weekly summary of marketplace activity' },
            ] as const).map((n) => (
              <label key={n.key} className="flex items-center justify-between rounded-xl border border-ink-700/70 bg-ink-900 p-4">
                <div>
                  <p className="text-sm font-semibold text-white">{n.label}</p>
                  <p className="text-xs text-ink-400">{n.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications({ ...notifications, [n.key]: !notifications[n.key] })}
                  className={`relative h-6 w-11 rounded-full transition ${notifications[n.key] ? 'bg-brand-600' : 'bg-ink-700'}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all ${notifications[n.key] ? 'left-[22px]' : 'left-0.5'}`} />
                </button>
              </label>
            ))}
          </div>
          <Button type="submit" className="mt-4" leftIcon={<Save size={16} />}>Save</Button>
        </form>
      </div>
    </div>
  );
}
