import { CUSTOMERS } from '@/data';
import { Badge } from '@/components/ui/Badge';

export function AdminCustomersPage() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-white">Customers</h1>
        <p className="mt-1 text-sm text-ink-400">{CUSTOMERS.length} registered customers.</p>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-700 bg-ink-900 text-xs uppercase text-ink-400">
              <tr>
                <th className="p-3 font-semibold">Name</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Phone</th>
                <th className="p-3 font-semibold">Enquiries</th>
                <th className="p-3 font-semibold">Test Drives</th>
                <th className="p-3 font-semibold">Registered</th>
              </tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c) => (
                <tr key={c.id} className="border-b border-ink-700/50 last:border-0 hover:bg-ink-850/50">
                  <td className="p-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-600/15 font-bold text-brand-400">{c.name.charAt(0)}</span>
                      <span className="font-semibold text-white">{c.name}</span>
                    </div>
                  </td>
                  <td className="p-3 text-ink-300">{c.email}</td>
                  <td className="p-3 text-ink-300">{c.phone}</td>
                  <td className="p-3"><Badge tone={c.enquiries > 0 ? 'brand' : 'neutral'}>{c.enquiries}</Badge></td>
                  <td className="p-3"><Badge tone={c.testDrives > 0 ? 'info' : 'neutral'}>{c.testDrives}</Badge></td>
                  <td className="p-3 text-ink-400">{c.registeredOn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
