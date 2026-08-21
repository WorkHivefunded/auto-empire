import { useState } from 'react';
import { TEST_DRIVES } from '@/data';
import type { TestDrive } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { useToast } from '@/components/ui/Toast';

export function AdminTestDrivesPage() {
  const toast = useToast();
  const [drives, setDrives] = useState<TestDrive[]>(TEST_DRIVES);

  const statusTone = { Pending: 'warning', Confirmed: 'info', Completed: 'success', Cancelled: 'error' } as const;

  const updateStatus = (id: string, status: TestDrive['status']) => {
    setDrives(drives.map((d) => (d.id === id ? { ...d, status } : d)));
    toast('Status updated');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-white">Test Drives</h1>
        <p className="mt-1 text-sm text-ink-400">{drives.length} test drive bookings.</p>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-700 bg-ink-900 text-xs uppercase text-ink-400">
              <tr>
                <th className="p-3 font-semibold">Customer</th>
                <th className="p-3 font-semibold">Car</th>
                <th className="p-3 font-semibold">Phone</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Time</th>
                <th className="p-3 font-semibold">City</th>
                <th className="p-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {drives.map((d) => (
                <tr key={d.id} className="border-b border-ink-700/50 last:border-0 hover:bg-ink-850/50">
                  <td className="p-3 font-semibold text-white">{d.name}</td>
                  <td className="p-3 text-ink-300">{d.car}</td>
                  <td className="p-3 text-ink-300">{d.phone}</td>
                  <td className="p-3 text-ink-400">{d.date}</td>
                  <td className="p-3 text-ink-400">{d.time}</td>
                  <td className="p-3 text-ink-300">{d.city}</td>
                  <td className="p-3">
                    <select
                      value={d.status}
                      onChange={(e) => updateStatus(d.id, e.target.value as TestDrive['status'])}
                      className="rounded-lg border border-ink-700 bg-ink-850 px-2 py-1 text-xs text-white outline-none focus:border-brand-500"
                    >
                      {['Pending', 'Confirmed', 'Completed', 'Cancelled'].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {(['Pending', 'Confirmed', 'Completed', 'Cancelled'] as const).map((s) => (
          <Badge key={s} tone={statusTone[s]}>{s}: {drives.filter((d) => d.status === s).length}</Badge>
        ))}
      </div>
    </div>
  );
}
