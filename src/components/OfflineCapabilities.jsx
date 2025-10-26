import { useEffect, useState } from 'react';
import { WifiOff, Wifi, CloudUpload } from 'lucide-react';

export default function OfflineCapabilities() {
  const [online, setOnline] = useState(typeof navigator !== 'undefined' ? navigator.onLine : true);
  const [queue, setQueue] = useState(() => {
    const raw = localStorage.getItem('sq_sync_queue');
    return raw ? JSON.parse(raw) : [];
  });
  const [syncing, setSyncing] = useState(false);

  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener('online', on);
    window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('online', on);
      window.removeEventListener('offline', off);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem('sq_sync_queue', JSON.stringify(queue));
  }, [queue]);

  const addOfflineItem = () => {
    const item = { id: crypto.randomUUID(), type: 'assignment', payload: { score: Math.floor(Math.random() * 100) }, ts: Date.now() };
    setQueue((q) => [item, ...q]);
  };

  const simulateSync = async () => {
    if (!online || queue.length === 0) return;
    setSyncing(true);
    // simulate batched sync
    await new Promise((r) => setTimeout(r, 800));
    setQueue([]);
    setSyncing(false);
  };

  useEffect(() => {
    if (online && queue.length > 0) {
      simulateSync();
    }
  }, [online, queue.length]);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="p-4 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {online ? <Wifi className="w-5 h-5 text-emerald-600" /> : <WifiOff className="w-5 h-5 text-rose-600" />}
            <p className={`font-medium ${online ? 'text-emerald-700' : 'text-rose-700'}`}>{online ? 'Online' : 'Offline'}</p>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <CloudUpload className={`w-4 h-4 ${syncing ? 'animate-pulse text-indigo-600' : 'text-slate-500'}`} />
            <span>{syncing ? 'Syncing...' : 'Background Sync Ready'}</span>
          </div>
        </div>
        <p className="mt-3 text-sm text-slate-600">All lessons are cached after first open. Progress is saved locally and syncs automatically when connection returns.</p>
        <div className="mt-4 flex gap-2">
          <button onClick={addOfflineItem} className="px-3 py-2 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 text-sm">Create Offline Update</button>
          <button onClick={simulateSync} disabled={!online || queue.length === 0} className={`px-3 py-2 rounded-md border text-sm ${online && queue.length ? 'border-emerald-300 text-emerald-700 bg-emerald-50 hover:bg-emerald-100' : 'border-slate-200 text-slate-400 bg-white cursor-not-allowed'}`}>Force Sync</button>
        </div>
        <div className="mt-4">
          <h4 className="font-semibold text-sm mb-2">Pending Sync Queue</h4>
          {queue.length === 0 ? (
            <p className="text-sm text-slate-500">No pending items.</p>
          ) : (
            <ul className="space-y-2 max-h-40 overflow-auto pr-1">
              {queue.map((item) => (
                <li key={item.id} className="text-sm p-2 rounded-md border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <span>#{item.id.slice(0, 6)} • {item.type} • score {item.payload.score}</span>
                  <span className="text-xs text-slate-500">{new Date(item.ts).toLocaleTimeString()}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="p-4 rounded-xl border border-slate-200 bg-white">
        <h3 className="font-semibold mb-2">Resource Packs</h3>
        <p className="text-sm text-slate-600 mb-3">Download content for offline use. Intelligent data optimization supports 2G/3G networks.</p>
        <div className="space-y-3">
          {[
            { id: 'physics_pack', name: 'Physics Starter Pack', size: '8 MB' },
            { id: 'chemistry_pack', name: 'Chemistry Lab Pack', size: '12 MB' },
            { id: 'math_pack', name: 'Mathematics Practice Pack', size: '6 MB' },
          ].map((r) => (
            <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 border border-slate-200">
              <div>
                <p className="font-medium text-sm">{r.name}</p>
                <p className="text-xs text-slate-500">{r.size} • Includes videos, PDFs, and interactive content</p>
              </div>
              <button className="px-3 py-1.5 rounded-md bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 text-sm">Download</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
