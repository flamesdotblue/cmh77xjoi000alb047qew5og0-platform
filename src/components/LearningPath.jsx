import { useMemo, useState } from 'react'
import { Star, Target, Crown } from 'lucide-react'

const LEVELS = [
  { id: 'math6', subject: 'Mathematics', grade: '6', title: 'Fractions & Ratios', xp: 120 },
  { id: 'phy8', subject: 'Physics', grade: '8', title: 'Force & Motion (3D Sim)', xp: 200 },
  { id: 'chem9', subject: 'Chemistry', grade: '9', title: 'Acids, Bases & Salts', xp: 180 },
  { id: 'math10', subject: 'Mathematics', grade: '10', title: 'Quadratic Equations', xp: 220 },
  { id: 'phy11', subject: 'Physics', grade: '11', title: 'Electricity Lab (WebGL)', xp: 260 },
]

function ProgressBar({ value }){
  return (
    <div className="h-2 w-full rounded bg-white/10 overflow-hidden" aria-label={`Progress ${Math.round(value*100)}%`}>
      <div className="h-full bg-emerald-500" style={{ width: `${value*100}%` }} />
    </div>
  )
}

export default function LearningPath(){
  const [xp, setXp] = useState(320)
  const [completed, setCompleted] = useState(['math6'])

  const levelProgress = useMemo(()=> LEVELS.map(l => ({
    ...l,
    progress: completed.includes(l.id) ? 1 : Math.min(0.95, xp / (l.xp + 200))
  })), [xp, completed])

  const totalXP = levelProgress.reduce((a,b)=>a+b.xp,0)
  const earnedBadges = [
    { name: 'Starter Scholar', icon: Star, color: 'from-yellow-400 to-amber-500' },
    { name: 'STEM Explorer', icon: Target, color: 'from-sky-400 to-cyan-500' },
    { name: 'Village Champion', icon: Crown, color: 'from-emerald-400 to-green-500' },
  ]

  return (
    <div className="relative py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <h2 className="text-2xl md:text-3xl font-semibold">Your Learning Path</h2>
            <p className="mt-2 text-white/80 text-sm">Adaptive milestones adjust difficulty based on performance. Unlock challenges and collaborative missions as you level up.</p>

            <div className="mt-5 space-y-4">
              {levelProgress.map((lvl)=> (
                <div key={lvl.id} className="rounded-xl border border-white/10 bg-neutral-900 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs text-white/60">Class {lvl.grade} • {lvl.subject}</p>
                      <h3 className="font-semibold">{lvl.title}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-white/60">XP: {Math.min(xp, lvl.xp)}/{lvl.xp}</p>
                      <button onClick={()=> setCompleted(prev => prev.includes(lvl.id) ? prev : [...prev, lvl.id])} className="mt-1 text-xs rounded bg-emerald-500/20 px-2 py-1 text-emerald-300 hover:bg-emerald-500/30 focus:outline-none focus:ring-2 focus:ring-emerald-400">Mark Complete</button>
                    </div>
                  </div>
                  <div className="mt-3"><ProgressBar value={lvl.progress} /></div>
                  <div className="mt-2 text-xs text-white/60">{Math.round(lvl.progress*100)}% complete</div>
                </div>
              ))}
            </div>
          </div>

          <aside className="md:w-1/3">
            <div className="rounded-xl border border-white/10 bg-neutral-900 p-4">
              <h3 className="font-semibold">Achievements</h3>
              <div className="mt-3 grid grid-cols-3 gap-3">
                {earnedBadges.map((b,i)=> (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className={`size-12 rounded-full bg-gradient-to-br ${b.color} flex items-center justify-center`}>
                      <b.icon className="size-6 text-neutral-950" />
                    </div>
                    <p className="text-[11px] text-center text-white/80 leading-tight">{b.name}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 text-sm text-white/80">Total XP Earned</div>
              <div className="text-2xl font-semibold">{xp}</div>
              <div className="mt-2"><ProgressBar value={Math.min(1, xp / (totalXP || 1))} /></div>
              <div className="mt-4 flex gap-2">
                <button onClick={()=> setXp(x=> x+50)} className="rounded bg-emerald-500 px-3 py-1.5 text-sm text-neutral-900 font-medium hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400">Complete Quest (+50)</button>
                <button onClick={()=> setXp(x=> Math.max(0, x-50))} className="rounded bg-neutral-800 border border-white/10 px-3 py-1.5 text-sm hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/30">Retry (-50)</button>
              </div>
              <p className="mt-3 text-xs text-white/60">Join weekly community challenges to earn bonus XP while collaborating with peers.</p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
