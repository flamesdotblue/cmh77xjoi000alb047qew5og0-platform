import { useMemo } from 'react';
import { Users } from 'lucide-react';

export default function TeacherDashboard() {
  const students = useMemo(() => [
    { id: 's1', name: 'Asha', grade: 8, physics: 60, chemistry: 45, math: 72, active: true },
    { id: 's2', name: 'Ravi', grade: 10, physics: 35, chemistry: 55, math: 40, active: false },
    { id: 's3', name: 'Meera', grade: 7, physics: 80, chemistry: 78, math: 75, active: true },
  ], []);

  const avg = useMemo(() => {
    const totals = students.reduce((acc, s) => {
      acc.physics += s.physics; acc.chemistry += s.chemistry; acc.math += s.math; return acc;
    }, { physics: 0, chemistry: 0, math: 0 });
    const n = students.length || 1;
    return { physics: Math.round(totals.physics / n), chemistry: Math.round(totals.chemistry / n), math: Math.round(totals.math / n) };
  }, [students]);

  return (
    <div className="grid lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 p-4 rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center gap-2 text-indigo-700 font-semibold mb-2"><Users className="w-5 h-5" /> Class Overview</div>
        <div className="space-y-2">
          {['physics', 'chemistry', 'math'].map((k) => (
            <div key={k}>
              <div className="flex items-center justify-between text-sm"><span className="capitalize">{k}</span><span>{avg[k]}%</span></div>
              <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden"><div className="h-2 bg-indigo-600" style={{ width: `${avg[k]}%` }} /></div>
            </div>
          ))}
        </div>
        <p className="mt-3 text-sm text-slate-600">Curriculum mapping aligns modules to grade-level outcomes. Monitor engagement and completion rates in real-time.</p>
      </div>

      <div className="lg:col-span-8 p-4 rounded-xl border border-slate-200 bg-white">
        <h3 className="font-semibold mb-3">Student Progress</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-600">
                <th className="py-2 pr-4">Name</th>
                <th className="py-2 pr-4">Grade</th>
                <th className="py-2 pr-4">Physics</th>
                <th className="py-2 pr-4">Chemistry</th>
                <th className="py-2 pr-4">Math</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => (
                <tr key={s.id} className="border-t border-slate-200">
                  <td className="py-2 pr-4 font-medium">{s.name}</td>
                  <td className="py-2 pr-4">{s.grade}</td>
                  <td className="py-2 pr-4">{s.physics}%</td>
                  <td className="py-2 pr-4">{s.chemistry}%</td>
                  <td className="py-2 pr-4">{s.math}%</td>
                  <td className="py-2 pr-4">
                    <span className={`px-2 py-1 rounded-full text-xs border ${s.active ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-slate-50 text-slate-600 border-slate-200'}`}>{s.active ? 'Active' : 'Inactive'}</span>
                  </td>
                  <td className="py-2">
                    <div className="flex gap-2">
                      <button className="px-2 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100">Assign</button>
                      <button className="px-2 py-1 rounded-md bg-white text-slate-700 border border-slate-200 hover:bg-slate-50">Message</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-4 grid sm:grid-cols-2 gap-3">
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-sm font-medium">Lesson Planner</p>
            <p className="text-xs text-slate-600">Map lessons to standards and auto-suggest remedial content based on assessments.</p>
          </div>
          <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
            <p className="text-sm font-medium">Parent Reports</p>
            <p className="text-xs text-slate-600">Share progress via SMS/WhatsApp-friendly summaries optimized for low data usage.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
