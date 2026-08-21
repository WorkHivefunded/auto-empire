import { useState } from 'react';
import { ENQUIRIES } from '@/data';
import type { Enquiry } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { useToast } from '@/components/ui/Toast';

const statusTone = { New: 'brand', Contacted: 'info', Converted: 'success', Closed: 'neutral' } as const;

export function AdminEnquiriesPage() {
  const toast = useToast();
  const [enquiries, setEnquiries] = useState<Enquiry[]>(ENQUIRIES);
  const [viewing, setViewing] = useState<Enquiry | null>(null);

  const updateStatus = (id: string, status: Enquiry['status']) => {
    setEnquiries(enquiries.map((e) => (e.id === id ? { ...e, status } : e)));
    if (viewing && viewing.id === id) setViewing({ ...viewing, status });
    toast('Status updated');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="font-display text-2xl font-extrabold text-white">Enquiries</h1>
        <p className="mt-1 text-sm text-ink-400">{enquiries.length} customer enquiries.</p>
      </div>

      <div className="card-surface overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-ink-700 bg-ink-900 text-xs uppercase text-ink-400">
              <tr>
                <th className="p-3 font-semibold">Customer</th>
                <th className="p-3 font-semibold">Phone</th>
                <th className="p-3 font-semibold">Email</th>
                <th className="p-3 font-semibold">Car</th>
                <th className="p-3 font-semibold">Date</th>
                <th className="p-3 font-semibold">Status</th>
                <th className="p-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((e) => (
                <tr key={e.id} className="border-b border-ink-700/50 last:border-0 hover:bg-ink-850/50">
                  <td className="p-3 font-semibold text-white">{e.name}</td>
                  <td className="p-3 text-ink-300">{e.phone}</td>
                  <td className="p-3 text-ink-300">{e.email}</td>
                  <td className="p-3 text-ink-300">{e.car}</td>
                  <td className="p-3 text-ink-400">{e.date}</td>
                  <td className="p-3">
                    <select
                      value={e.status}
                      onChange={(ev) => updateStatus(e.id, ev.target.value as Enquiry['status'])}
                      className="rounded-lg border border-ink-700 bg-ink-850 px-2 py-1 text-xs text-white outline-none focus:border-brand-500"
                    >
                      {['New', 'Contacted', 'Converted', 'Closed'].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="p-3 text-right">
                    <button onClick={() => setViewing(e)} className="rounded-lg px-3 py-1.5 text-xs font-semibold text-brand-400 hover:bg-ink-700">View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal open={!!viewing} onClose={() => setViewing(null)} title="Enquiry Details" size="md">
        {viewing && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-lg font-bold text-white">{viewing.name}</p>
                <p className="text-xs text-ink-400">{viewing.date}</p>
              </div>
              <Badge tone={statusTone[viewing.status]}>{viewing.status}</Badge>
            </div>
            <div className="grid gap-2 rounded-xl border border-ink-700/70 bg-ink-900 p-4 text-sm">
              <div className="flex justify-between"><span className="text-ink-400">Phone</span><span className="text-white">{viewing.phone}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Email</span><span className="text-white">{viewing.email}</span></div>
              <div className="flex justify-between"><span className="text-ink-400">Car</span><span className="text-white">{viewing.car}</span></div>
            </div>
            <div>
              <p className="label-base">Message</p>
              <p className="rounded-xl border border-ink-700/70 bg-ink-900 p-4 text-sm text-ink-200">{viewing.message}</p>
            </div>
            <div>
              <p className="label-base">Update Status</p>
              <div className="flex gap-2">
                {(['New', 'Contacted', 'Converted', 'Closed'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => updateStatus(viewing.id, s)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                      viewing.status === s ? 'border-brand-500 bg-brand-600/15 text-brand-400' : 'border-ink-700 text-ink-300 hover:border-ink-600'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
