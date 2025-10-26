import { Activity, BarChart3, ClipboardList, MessageSquare } from 'lucide-react'

function Stat({ label, value, trend }){
  return (
    <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
      <p className="text-xs text-white/60">{label}</p>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
      <p className={`mt-1 text-xs ${trend >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>{trend >= 0 ? '+' : ''}{trend}% last 30 days</p>
    </div>
  )
}

function MiniBar({ values }){
  const max = Math.max(...values, 1)
  return (
    <div className="flex items-end gap-1 h-16">
      {values.map((v, i) => (
        <div key={i} className="w-2.5 rounded bg-emerald-500/70" style={{ height: `${(v / max) * 100}%` }} />
      ))}
    </div>
  )
}

export default function DashboardPreview(){
  return (
    <div className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-emerald-500/20 p-2">
            <BarChart3 className="size-5 text-emerald-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">Teacher Dashboard Preview</h2>
        </div>
        <p className="mt-2 text-white/80 max-w-3xl">Monitor real-time progress, engagement, and mastery. Map lessons to curriculum, assign activities, and share progress with parents — even when students learn offline.</p>

        <div className="mt-6 grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3 rounded-2xl border border-white/10 bg-neutral-900 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="size-4 text-emerald-400" />
                <h3 className="font-semibold">Class 8 • Physics • Force & Motion</h3>
              </div>
              <span className="text-xs text-white/60">Realtime</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              <Stat label="Avg. Mastery" value="78%" trend={12} />
              <Stat label="Active Learners" value="26" trend={8} />
              <Stat label="Completion Rate" value="85%" trend={5} />
            </div>
            <div className="mt-6">
              <MiniBar values={[6,8,5,7,9,10,6,7,8,11,9,12]} />
              <p className="mt-2 text-xs text-white/60">Daily lesson completions (last 12 days)</p>
            </div>
          </div>

          <div className="md:col-span-2 space-y-6">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
              <div className="flex items-center gap-2">
                <ClipboardList className="size-4 text-emerald-400" />
                <h3 className="font-semibold">Assignments</h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                <li>• Motion Graphs Quiz — Due Fri</li>
                <li>• Group Project: Solar Cooker — Due Mon</li>
                <li>• Remedial: Newton's Laws — Adaptive</li>
              </ul>
              <div className="mt-3 flex gap-2">
                <button className="rounded bg-emerald-500 px-3 py-1.5 text-sm text-neutral-900 font-medium hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400">Create</button>
                <button className="rounded bg-neutral-800 border border-white/10 px-3 py-1.5 text-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/30">Import Plan</button>
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-5">
              <div className="flex items-center gap-2">
                <MessageSquare className="size-4 text-emerald-400" />
                <h3 className="font-semibold">Parent Communication</h3>
              </div>
              <p className="mt-2 text-sm text-white/80">Weekly SMS summaries and low-data report links in preferred language.</p>
              <div className="mt-3 text-xs text-white/60">Compliance: student privacy and consent controls enabled.</div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-neutral-900 p-5">
          <h3 className="font-semibold">Deployment Notes</h3>
          <ul className="mt-2 text-sm text-white/80 space-y-1">
            <li>• Install as PWA for sub-3s cached loads and offline access.</li>
            <li>• First-time content size ≤ 50MB; larger packs can be scheduled overnight on Wi‑Fi.</li>
            <li>• Works on Android 6+, iOS 12+, and basic browsers with Service Worker fallback.</li>
            <li>• Background sync queues progress for patchy 2G/3G connections.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
