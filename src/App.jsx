import { useEffect, useMemo, useState } from 'react';
import HeroSection from './components/HeroSection';
import GamifiedLearning from './components/GamifiedLearning';
import OfflineCapabilities from './components/OfflineCapabilities';
import TeacherDashboard from './components/TeacherDashboard';

const STRINGS = {
  en: {
    appTitle: 'STEM Quest',
    tagline: 'Interactive, offline-first STEM learning for grades 6-12',
    startLearning: 'Start Learning',
    gamificationTitle: 'Gamified Learning',
    offlineTitle: 'Offline & Sync',
    teacherTitle: 'Teacher Dashboard',
    chooseLanguage: 'Language',
  },
  hi: {
    appTitle: 'एसटीईएम क्वेस्ट',
    tagline: 'कक्षा 6-12 के लिए इंटरएक्टिव, ऑफ़लाइन प्रथम एसटीईएम सीख',
    startLearning: 'शुरू करें',
    gamificationTitle: 'गेमिफाइड लर्निंग',
    offlineTitle: 'ऑफ़लाइन व सिंक',
    teacherTitle: 'शिक्षक डैशबोर्ड',
    chooseLanguage: 'भाषा',
  },
  bn: {
    appTitle: 'এসটিইএম কোয়েস্ট',
    tagline: '৬-১২ শ্রেণির জন্য ইন্টারঅ্যাক্টিভ, অফলাইন-প্রথম STEM শেখা',
    startLearning: 'শুরু করুন',
    gamificationTitle: 'গ্যামিফায়েড লার্নিং',
    offlineTitle: 'অফলাইন ও সিঙ্ক',
    teacherTitle: 'শিক্ষক ড্যাশবোর্ড',
    chooseLanguage: 'ভাষা',
  },
  te: {
    appTitle: 'స్టెమ్ క్వెస్ట్',
    tagline: '6-12 తరగతుల కోసం ఇంటరాక్టివ్, ఆఫ్లైన్-ఫస్ట్ STEM లెర్నింగ్',
    startLearning: 'ప్రారంభించండి',
    gamificationTitle: 'గేమిఫైడ్ లెర్నింగ్',
    offlineTitle: 'ఆఫ్లైన్ & సింక్',
    teacherTitle: 'అధ్యాపకుల డ్యాష్‌బోర్డ్',
    chooseLanguage: 'భాష',
  },
};

export default function App() {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const t = useMemo(() => STRINGS[lang] || STRINGS.en, [lang]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <header className="sticky top-0 z-20 backdrop-blur bg-white/60 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="size-8 rounded-md bg-indigo-600" />
            <h1 className="font-semibold text-lg">{t.appTitle}</h1>
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="lang" className="text-sm text-slate-600">{t.chooseLanguage}</label>
            <select
              id="lang"
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              className="text-sm rounded-md border-slate-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 px-2 py-1 bg-white"
            >
              <option value="en">English</option>
              <option value="hi">हिंदी</option>
              <option value="bn">বাংলা</option>
              <option value="te">తెలుగు</option>
            </select>
          </div>
        </div>
      </header>

      <main>
        <HeroSection t={t} />
        <section id="gamified" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4">{t.gamificationTitle}</h2>
          <GamifiedLearning lang={lang} />
        </section>

        <section id="offline" className="bg-slate-50 border-y border-slate-200">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <h2 className="text-2xl font-semibold mb-4">{t.offlineTitle}</h2>
            <OfflineCapabilities />
          </div>
        </section>

        <section id="teacher" className="max-w-7xl mx-auto px-4 py-10">
          <h2 className="text-2xl font-semibold mb-4">{t.teacherTitle}</h2>
          <TeacherDashboard />
        </section>
      </main>

      <footer className="border-t border-slate-200 py-6 mt-10">
        <div className="max-w-7xl mx-auto px-4 text-sm text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} {t.appTitle}. All rights reserved.</p>
          <p>Optimized for offline use and low-bandwidth networks.</p>
        </div>
      </footer>
    </div>
  );
}
