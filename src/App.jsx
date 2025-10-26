import { useState } from 'react'
import HeroSection from './components/HeroSection'
import FeaturesGrid from './components/FeaturesGrid'
import LearningPath from './components/LearningPath'
import DashboardPreview from './components/DashboardPreview'

function App() {
  const [language, setLanguage] = useState('en')

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-white/10 bg-neutral-950/70 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <a href="#home" className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white/40 rounded px-1">
            <div className="size-8 rounded bg-gradient-to-br from-emerald-400 to-cyan-500" aria-hidden />
            <span className="font-semibold tracking-tight">GramLearn STEM</span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#path" className="hover:text-white transition-colors">Learning Path</a>
            <a href="#dashboard" className="hover:text-white transition-colors">Teacher</a>
            <a href="#start" className="hover:text-white transition-colors">Get Started</a>
          </nav>
          <div className="flex items-center gap-3">
            <select aria-label="Select language" value={language} onChange={(e)=>setLanguage(e.target.value)} className="bg-neutral-900 border border-white/10 rounded px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400">
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
              <option value="rg1">বাংলা</option>
              <option value="rg2">தமிழ்</option>
            </select>
            <a href="#start" className="inline-flex items-center gap-2 rounded bg-emerald-500 px-3 py-1.5 text-sm font-medium text-neutral-900 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400">
              Start Learning
            </a>
          </div>
        </div>
      </header>

      <main className="pt-14" id="home">
        <HeroSection language={language} />
        <section id="features" className="relative">
          <FeaturesGrid language={language} />
        </section>
        <section id="path">
          <LearningPath language={language} />
        </section>
        <section id="dashboard">
          <DashboardPreview language={language} />
        </section>

        <section id="start" className="relative py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-8 md:p-10">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold">Ready to deploy in rural schools</h2>
                  <p className="mt-3 text-white/80 text-sm md:text-base">Install the Progressive Web App, pre-download content packs over Wi‑Fi, and enable offline-first learning with automatic background sync when connectivity returns. Includes teacher dashboard, parent reports, and community challenges.</p>
                  <ul className="mt-4 space-y-2 text-white/70 text-sm">
                    <li>• Works on low-cost Android devices (4GB RAM)</li>
                    <li>• <span className="font-medium text-white">≤ 50MB</span> initial install, progressive asset loading</li>
                    <li>• 2G/3G optimized with smart caching, background sync</li>
                    <li>• WCAG 2.1 compliant, data privacy by design</li>
                  </ul>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 justify-end">
                  <button className="inline-flex justify-center rounded-lg bg-emerald-500 px-4 py-2 text-neutral-900 font-medium hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400">Install PWA</button>
                  <button className="inline-flex justify-center rounded-lg bg-neutral-800 border border-white/10 px-4 py-2 hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-white/30">Download Content Pack (200MB)</button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-sm text-white/60 flex flex-col md:flex-row items-center justify-between gap-3">
          <p>© {new Date().getFullYear()} GramLearn. Inclusive STEM for every village.</p>
          <div className="flex gap-4">
            <a href="#features" className="hover:text-white">Features</a>
            <a href="#dashboard" className="hover:text-white">Teacher</a>
            <a href="#start" className="hover:text-white">Deployment</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
