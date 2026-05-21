import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Star, Briefcase, MessageCircle } from 'lucide-react';
import { mockApplicants } from '../../data/mockData';

export function ApplicantProfile() {
  const { studentId } = useParams<{ studentId: string }>();
  const navigate = useNavigate();
  const app = mockApplicants.find(a => a.id === studentId) || mockApplicants[0];

  const portfolio = [
    { title: 'Social Media Pack', color: '#4F5BD5', emoji: '📱' },
    { title: 'Brand Identity', color: '#10B981', emoji: '🎨' },
    { title: 'Video Reel', color: '#FF7B54', emoji: '🎬' },
  ];

  const reviews = [
    { business: 'Digital Agency PH', rating: 5, text: 'Excellent work, very professional and timely!', date: '2 weeks ago' },
    { business: 'FitLife Gym', rating: 5, text: 'Loved the creative content. Will hire again!', date: '1 month ago' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Applicant Profile</h1>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Hero */}
        <div className="px-4 pt-4 pb-5 bg-gradient-to-br from-[#4F5BD5] to-[#818cf8] text-white mb-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)', fontFamily: 'Sora' }}>
              {app.initials}
            </div>
            <div>
              <h2 className="text-base font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>{app.name}</h2>
              <p className="text-sm opacity-75">{app.university}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-0.5">
                  <Star size={11} fill="white" color="white" />
                  <span className="text-xs font-semibold">{app.rating}</span>
                  <span className="text-xs opacity-60">({app.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/10 rounded-xl px-3 py-2">
            <Briefcase size={13} />
            <span className="text-xs font-medium">{app.completedTasks} tasks completed on SkillBridge</span>
          </div>
        </div>

        {/* Bio */}
        <div className="mx-4 bg-white rounded-2xl p-4 border border-gray-100 mb-3">
          <h3 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>About</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{app.bio}</p>
        </div>

        {/* Skills */}
        <div className="mx-4 bg-white rounded-2xl p-4 border border-gray-100 mb-3">
          <h3 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Skills</h3>
          <div className="flex flex-wrap gap-2">
            {app.skills.map(s => (
              <span key={s} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: '#EEF0FF', color: '#4F5BD5' }}>{s}</span>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="mx-4 bg-white rounded-2xl p-4 border border-gray-100 mb-3">
          <h3 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Portfolio</h3>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {portfolio.map(item => (
              <div key={item.title} className="flex-shrink-0 w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1" style={{ background: item.color + '15' }}>
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-[9px] font-semibold text-center px-1" style={{ color: item.color }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mx-4 bg-white rounded-2xl p-4 border border-gray-100 mb-6">
          <h3 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Reviews</h3>
          {reviews.map((rev, i) => (
            <div key={i} className={i > 0 ? 'border-t border-gray-50 pt-3 mt-3' : ''}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-gray-700">{rev.business}</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <Star key={j} size={10} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{rev.text}</p>
              <p className="text-[10px] text-gray-400 mt-1">{rev.date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky CTA */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-2">
        <button
          onClick={() => navigate('/messages/c1')}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600 flex items-center justify-center gap-2"
        >
          <MessageCircle size={15} /> Message
        </button>
        <button
          className="flex-1 py-3 rounded-xl text-white text-sm font-semibold"
          style={{ background: '#10B981', fontFamily: 'Sora, sans-serif' }}
          onClick={() => navigate(-1)}
        >
          Accept for Task
        </button>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }`}</style>
    </div>
  );
}
