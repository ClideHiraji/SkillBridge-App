import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';

const slides = [
  {
    emoji: '🎯',
    title: 'Find Tasks,\nEarn Real Money',
    subtitle: 'Browse hundreds of commissions from local businesses. Apply to tasks that match your skills and get paid for your work.',
    bg: 'from-[#4F5BD5] to-[#818cf8]',
    accentBg: 'rgba(255,255,255,0.1)',
    illustration: (
      <div className="relative">
        <div className="w-48 h-48 rounded-3xl bg-white/10 flex items-center justify-center mx-auto">
          <div className="grid grid-cols-2 gap-2 p-3">
            {['Design', 'Coding', 'Writing', 'Marketing'].map(c => (
              <div key={c} className="bg-white/20 rounded-xl px-2 py-1.5 text-center">
                <div className="text-xl mb-0.5">
                  {c === 'Design' ? '🎨' : c === 'Coding' ? '💻' : c === 'Writing' ? '✍️' : '📣'}
                </div>
                <p className="text-[9px] font-semibold text-white">{c}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-2 -right-4 bg-white rounded-2xl px-3 py-2 shadow-lg">
          <p className="text-xs font-bold text-green-600">+₱850</p>
          <p className="text-[9px] text-gray-500">Task Paid</p>
        </div>
      </div>
    ),
  },
  {
    emoji: '🏢',
    title: 'Post Commissions,\nHire Students',
    subtitle: 'Connect with talented university students ready to help your business grow. Post tasks, review applicants, and hire the best fit.',
    bg: 'from-[#FF7B54] to-[#FF9B54]',
    accentBg: 'rgba(255,255,255,0.1)',
    illustration: (
      <div className="relative">
        <div className="w-48 h-48 rounded-3xl bg-white/10 flex items-center justify-center mx-auto">
          <div className="flex flex-col gap-2 p-3 w-full">
            {['Maria S. — ⭐ 4.9', 'Carlo R. — ⭐ 4.7', 'Ana L. — ⭐ 5.0'].map((s, i) => (
              <div key={i} className="bg-white/20 rounded-xl px-3 py-2 flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold text-white">
                  {s[0]}
                </div>
                <p className="text-[11px] font-medium text-white">{s}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute -bottom-2 -left-4 bg-white rounded-2xl px-3 py-2 shadow-lg">
          <p className="text-xs font-bold text-[#FF7B54]">12 Applicants</p>
          <p className="text-[9px] text-gray-500">For your task</p>
        </div>
      </div>
    ),
  },
  {
    emoji: '💳',
    title: 'Get Paid\nSecurely & Fast',
    subtitle: 'Our escrow system protects both students and businesses. Funds are held safely until work is delivered and approved.',
    bg: 'from-[#10B981] to-[#34D399]',
    accentBg: 'rgba(255,255,255,0.1)',
    illustration: (
      <div className="relative">
        <div className="w-48 h-48 rounded-3xl bg-white/10 flex items-center justify-center mx-auto">
          <div className="flex flex-col items-center gap-3 p-4">
            <div className="text-5xl">🔐</div>
            <div className="bg-white/20 rounded-xl px-4 py-3 w-full text-center">
              <p className="text-[10px] text-white/70 mb-0.5">Protected Balance</p>
              <p className="text-xl font-bold text-white" style={{ fontFamily: 'Sora' }}>₱4,850</p>
            </div>
            <div className="flex gap-2">
              {['GCash', 'PayMaya', 'Bank'].map(m => (
                <div key={m} className="bg-white/20 rounded-lg px-2 py-1">
                  <p className="text-[9px] font-semibold text-white">{m}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute -top-2 -right-4 bg-white rounded-2xl px-3 py-2 shadow-lg">
          <p className="text-xs font-bold text-green-600">✓ Secured</p>
          <p className="text-[9px] text-gray-500">Escrow</p>
        </div>
      </div>
    ),
  },
];

export function Onboarding() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const current = slides[slide];

  const handleNext = () => {
    if (slide < slides.length - 1) setSlide(s => s + 1);
    else navigate('/login');
  };

  return (
    <div className={`h-full flex flex-col bg-gradient-to-b ${current.bg} relative overflow-hidden`}>
      {/* Skip */}
      <button
        onClick={() => navigate('/login')}
        className="absolute top-4 right-4 text-white/60 text-sm font-medium z-10"
      >
        Skip
      </button>

      {/* Illustration */}
      <div className="flex-1 flex items-center justify-center px-8 pt-16">
        <div className="flex flex-col items-center gap-8">
          {current.illustration}
        </div>
      </div>

      {/* Content */}
      <div className="bg-white rounded-t-[32px] px-8 pt-8 pb-10 flex flex-col gap-6">
        <div>
          <h2
            className="text-2xl font-bold text-gray-900 mb-3 whitespace-pre-line"
            style={{ fontFamily: 'Sora, sans-serif' }}
          >
            {current.title}
          </h2>
          <p className="text-sm text-gray-500 leading-relaxed">{current.subtitle}</p>
        </div>

        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              className="rounded-full transition-all duration-300"
              style={{
                width: i === slide ? 24 : 6,
                height: 6,
                background: i === slide
                  ? (slide === 0 ? '#4F5BD5' : slide === 1 ? '#FF7B54' : '#10B981')
                  : '#E5E7EB',
              }}
            />
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-2xl flex items-center justify-center gap-2 text-white font-semibold transition-opacity hover:opacity-90 active:scale-[0.98]"
          style={{
            background: slide === 0 ? '#4F5BD5' : slide === 1 ? '#FF7B54' : '#10B981',
            fontFamily: 'Sora, sans-serif',
          }}
        >
          {slide === slides.length - 1 ? 'Get Started' : 'Continue'}
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
