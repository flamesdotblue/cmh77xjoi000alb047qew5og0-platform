import { Trophy, BookOpen, WifiOff, LayoutDashboard, Users, Shield } from 'lucide-react'

const content = {
  en: {
    headline: 'Core Capabilities',
    description: 'Designed for grades 6–12 with adaptive, low-bandwidth experiences and robust offline support.',
  },
  hi: {
    headline: 'मुख्य क्षमताएँ',
    description: 'कक्षा 6–12 के लिए अनुकूलित, कम बैंडविड्थ और मजबूत ऑफलाइन समर्थन के साथ।',
  },
  rg1: { headline: 'মূল সক্ষমতা', description: '৬–১২ শ্রেণির জন্য কম ব্যান্ডউইথ ও অফলাইন সমর্থন সহ।' },
  rg2: { headline: 'முக்கிய திறன்கள்', description: 'தரங்கள் 6–12 க்காக குறைந்த வலைவெளி மற்றும் வலுவான ஆஃப்லைன் ஆதரவு.' }
}

const cards = [
  {
    icon: Trophy,
    title: 'Gamification System',
    points: [
      'Points, badges, seasonal leaderboards',
      'Progress trees and milestones',
      'Collaborative and competitive challenges',
      'Rewards tied to curriculum mastery'
    ]
  },
  {
    icon: BookOpen,
    title: 'Interactive STEM Content',
    points: [
      'Physics sims, Chemistry labs, Math problem solving',
      'Adaptive difficulty with AI recommendations',
      '3D models, animations, interactive diagrams',
      'Instant feedback with remedial guidance'
    ]
  },
  {
    icon: WifiOff,
    title: 'Offline First',
    points: [
      'Full lessons cached after first load',
      'Local progress with auto cloud sync',
      'Downloadable videos, PDFs, interactives',
      'Background sync for assignments'
    ]
  },
  {
    icon: LayoutDashboard,
    title: 'Teacher Dashboard',
    points: [
      'Real-time progress and engagement analytics',
      'Lesson plans with curriculum mapping',
      'Assignments, assessments, parent reports',
      'Mentorship and classroom management'
    ]
  },
  {
    icon: Users,
    title: 'Community & Mentorship',
    points: [
      'Peer collaboration and project spaces',
      'Senior–junior mentorship connections',
      'Local educator content contributions',
      'Inter-school competitions'
    ]
  },
  {
    icon: Shield,
    title: 'Accessibility & Security',
    points: [
      'WCAG 2.1 compliant UI and captions',
      'Privacy-first data with parental controls',
      '2G/3G optimized data usage',
      'PWA + Service Worker hardened'
    ]
  }
]

export default function FeaturesGrid({ language = 'en' }) {
  const t = content[language] || content.en
  return (
    <div className="relative py-16">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-semibold">{t.headline}</h2>
          <p className="mt-2 text-white/80">{t.description}</p>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, idx) => (
            <div key={idx} className="rounded-2xl border border-white/10 bg-neutral-900 p-5 hover:border-emerald-400/40 transition-colors">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-emerald-500/15 p-2">
                  <card.icon className="size-5 text-emerald-400" />
                </div>
                <h3 className="font-semibold">{card.title}</h3>
              </div>
              <ul className="mt-3 space-y-2 text-sm text-white/80">
                {card.points.map((p,i)=> <li key={i}>• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
