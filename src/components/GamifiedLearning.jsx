import { useEffect, useMemo, useState } from 'react';
import { Star, Trophy, Users } from 'lucide-react';

const DEFAULT_PROFILE = {
  points: 0,
  badges: [],
  streak: 0,
  progress: {
    physics: 0,
    chemistry: 0,
    math: 0,
  },
};

const BADGE_DEFS = [
  { id: 'starter', name: 'Pathfinder', desc: 'Completed first module', points: 50 },
  { id: 'streak3', name: 'Consistency', desc: '3-day streak', points: 100 },
  { id: 'physics50', name: 'Mechanics Pro', desc: '50% Physics complete', points: 150 },
];

export default function GamifiedLearning({ lang }) {
  const [profile, setProfile] = useState(() => {
    const raw = localStorage.getItem('sq_profile');
    return raw ? JSON.parse(raw) : DEFAULT_PROFILE;
  });
  const [lastActionAt, setLastActionAt] = useState(Date.now());

  useEffect(() => {
    localStorage.setItem('sq_profile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    const id = setInterval(() => setLastActionAt(Date.now()), 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    // simple streak checker (daily-based) for demo
    const last = localStorage.getItem('sq_last_open');
    const today = new Date().toDateString();
    if (last !== today) {
      setProfile((p) => ({ ...p, streak: (p.streak || 0) + 1 }));
      localStorage.setItem('sq_last_open', today);
    }
  }, []);

  useEffect(() => {
    // award badges
    setProfile((p) => {
      let changed = false;
      let next = { ...p };
      const award = (id) => {
        if (!next.badges.includes(id)) {
          const def = BADGE_DEFS.find((b) => b.id === id);
          next.badges = [...next.badges, id];
          next.points += def?.points || 0;
          changed = true;
        }
      };
      if ((p.progress.physics + p.progress.chemistry + p.progress.math) > 0) award('starter');
      if (p.streak >= 3) award('streak3');
      if (p.progress.physics >= 50) award('physics50');
      return changed ? next : p;
    });
  }, [profile.progress.physics, profile.progress.chemistry, profile.progress.math, profile.streak]);

  const progressTotal = useMemo(() => {
    const { physics, chemistry, math } = profile.progress;
    return Math.round((physics + chemistry + math) / 3);
  }, [profile.progress]);

  const incrementProgress = (key) => {
    setProfile((p) => ({
      ...p,
      points: p.points + 10,
      progress: { ...p.progress, [key]: Math.min(100, p.progress[key] + 10) },
    }));
  };

  const startChallenge = () => {
    // simple challenge: random subject increment
    const keys = ['physics', 'chemistry', 'math'];
    const key = keys[Math.floor(Math.random() * keys.length)];
    incrementProgress(key);
  };

  const labels = {
    en: { points: 'Points', streak: 'Day Streak', badges: 'Badges', progress: 'Progress', start: 'Start Challenge', collab: 'Collaborate', compete: 'Compete', physics: 'Physics', chemistry: 'Chemistry', math: 'Math' },
    hi: { points: 'अंक', streak: 'दिन स्ट्रीक', badges: 'बैज', progress: 'प्रगति', start: 'चैलेंज शुरू करें', collab: 'सहयोग', compete: 'प्रतिस्पर्धा', physics: 'भौतिकी', chemistry: 'रसायन', math: 'गणित' },
    bn: { points: 'পয়েন্ট', streak: 'দিন স্ট্রিক', badges: 'ব্যাজ', progress: 'অগ্রগতি', start: 'চ্যালেঞ্জ শুরু', collab: 'সহযোগিতা', compete: 'প্রতিদ্বন্দ্বিতা', physics: 'পদার্থবিজ্ঞান', chemistry: 'রসায়ন', math: 'গণিত' },
    te: { points: 'పాయింట్లు', streak: 'రోజుల స్ట్రీక్', badges: 'బ్యాడ్జ్‌లు', progress: 'పురోగతి', start: 'ఛాలెంజ్ ప్రారంభించండి', collab: 'సహకారం', compete: 'పోటీ', physics: 'భౌతిక శాస్త్రం', chemistry: 'రసాయన శాస్త్రం', math: 'గణితం' },
  }[lang] || {};

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-7 space-y-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-600">{labels.points}</p>
              <p className="text-2xl font-bold text-indigo-700">{profile.points}</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">{labels.streak}</p>
              <p className="text-2xl font-bold">{profile.streak} 🔥</p>
            </div>
            <div>
              <p className="text-sm text-slate-600">{labels.badges}</p>
              <p className="text-2xl font-bold text-amber-600 flex items-center gap-1"><Star className="w-5 h-5" /> {profile.badges.length}</p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {profile.badges.length === 0 ? (
              <span className="text-xs text-slate-500">Play a challenge to earn your first badge!</span>
            ) : (
              profile.badges.map((id) => {
                const badge = BADGE_DEFS.find((b) => b.id === id);
                return (
                  <span key={id} className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs">
                    <Trophy className="w-3.5 h-3.5" /> {badge?.name || id}
                  </span>
                );
              })
            )}
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <h3 className="font-semibold mb-3">{labels.progress}</h3>
          <div className="grid sm:grid-cols-3 gap-3">
            {['physics', 'chemistry', 'math'].map((k) => (
              <div key={k} className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium capitalize">{labels[k]}</span>
                  <span className="text-xs text-slate-600">{profile.progress[k]}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
                  <div className="h-2 bg-indigo-600" style={{ width: `${profile.progress[k]}%` }} />
                </div>
                <button onClick={() => incrementProgress(k)} className="mt-3 w-full text-xs px-2 py-1 rounded-md border border-indigo-200 text-indigo-700 bg-white hover:bg-indigo-50">
                  Practice {labels[k]}
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-800">Overall Completion</p>
              <p className="text-xl font-bold text-emerald-700">{progressTotal}%</p>
            </div>
            <button onClick={startChallenge} className="px-3 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 text-sm">
              {labels.start}
            </button>
          </div>
        </div>
      </div>

      <div className="lg:col-span-5 space-y-4">
        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <h3 className="font-semibold mb-2 flex items-center gap-2"><Users className="w-5 h-5 text-indigo-600" /> Social Play</h3>
          <p className="text-sm text-slate-600 mb-3">Collaborate with peers or compete on leaderboards. Works offline and syncs when back online.</p>
          <div className="flex gap-2">
            <button className="flex-1 px-3 py-2 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 text-sm">{labels.collab}</button>
            <button className="flex-1 px-3 py-2 rounded-md bg-amber-50 text-amber-700 border border-amber-200 hover:bg-amber-100 text-sm">{labels.compete}</button>
          </div>
          <div className="mt-4 text-xs text-slate-500">
            Note: Leaderboards and group challenges synchronize automatically when connectivity restores.
          </div>
        </div>

        <div className="p-4 rounded-xl border border-slate-200 bg-white">
          <h3 className="font-semibold mb-2">Adaptive Pathways</h3>
          <p className="text-sm text-slate-600">Difficulty adjusts based on performance. Focus suggestions appear after each assessment with immediate feedback.</p>
          <ul className="mt-3 list-disc list-inside text-sm text-slate-700">
            <li>Visual 3D models for concepts</li>
            <li>Step-by-step hints on mistakes</li>
            <li>Curriculum-aligned milestones</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
