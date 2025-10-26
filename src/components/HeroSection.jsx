import Spline from '@splinetool/react-spline'
import { Rocket, PlayCircle } from 'lucide-react'

const copy = {
  en: {
    title: 'Gamified STEM for Every Rural Classroom',
    subtitle: 'Offline-first PWA with 3D simulations, adaptive paths, and teacher tools. Learn anywhere, even on 2G.',
    cta1: 'Explore Modules',
    cta2: 'See How It Works'
  },
  hi: {
    title: 'हर ग्रामीण कक्षा के लिए गेमीफाइड STEM',
    subtitle: 'ऑफलाइन-फर्स्ट PWA, 3D सिमुलेेशन और अनुकूलित सीखने के रास्ते। 2G पर भी सीखें।',
    cta1: 'मॉड्यूल देखें',
    cta2: 'कैसे काम करता है'
  },
  rg1: {
    title: 'প্রতিটি গ্রামীণ শ্রেণির জন্য গেমিফায়েড STEM',
    subtitle: 'অফলাইন-ফার্স্ট PWA, 3D সিমুলেশন ও অভিযোজিত পথ। 2G নেটওয়ার্কেও শেখা সম্ভব।',
    cta1: 'মডিউল দেখুন',
    cta2: 'কীভাবে কাজ করে'
  },
  rg2: {
    title: 'ஒவ்வொரு கிராமப்புற வகுப்பிற்கும் விளையாட்டு வடிவ STEM',
    subtitle: 'ஆஃப்லைன் PWA, 3D சிமுலேஷன்கள், தகும் பாதைகள். 2G-யிலும் கற்றல்.',
    cta1: 'தொடங்குங்கள்',
    cta2: 'எப்படி வேலை செய்கிறது'
  }
}

export default function HeroSection({ language = 'en' }) {
  const t = copy[language] || copy.en
  return (
    <section className="relative h-[80vh] md:h-[86vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/hGDm7Foxug7C6E8s/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/40 via-neutral-950/40 to-neutral-950" />

      <div className="relative z-10 mx-auto h-full max-w-7xl px-4 sm:px-6 lg:px-8 flex items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-neutral-900/70 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <Rocket className="size-3.5 text-emerald-400" />
            <span>Offline-first • 3D Simulations • Multilingual</span>
          </div>
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight">
            {t.title}
          </h1>
          <p className="mt-3 text-white/80 text-sm sm:text-base md:text-lg">
            {t.subtitle}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#features" className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-neutral-900 font-medium hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-400">
              <PlayCircle className="size-5" /> {t.cta1}
            </a>
            <a href="#path" className="inline-flex items-center gap-2 rounded-lg bg-neutral-900/80 border border-white/15 px-4 py-2 hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white/30">
              {t.cta2}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
