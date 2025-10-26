import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function HeroSection({ t }) {
  return (
    <section className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 h-full flex items-center">
        <div className="bg-white/70 backdrop-blur rounded-xl p-5 sm:p-8 shadow-lg max-w-xl">
          <div className="flex items-center gap-2 text-indigo-700 font-semibold">
            <Rocket className="w-5 h-5" />
            <span>{t.appTitle}</span>
          </div>
          <h2 className="mt-2 text-3xl sm:text-4xl font-bold leading-tight">{t.tagline}</h2>
          <p className="mt-3 text-slate-700 text-sm sm:text-base">
            Gamified pathways, adaptive modules, and 3D simulations. Works great offline with smart sync.
          </p>
          <div className="mt-5 flex gap-3">
            <a href="#gamified" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
              {t.startLearning}
            </a>
            <a href="#offline" className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-white text-indigo-700 border border-indigo-200 hover:bg-indigo-50 transition-colors">
              Learn Offline
            </a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
