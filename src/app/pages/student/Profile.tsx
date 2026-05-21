import { useState } from 'react';
import { Settings, Star, Briefcase, MapPin, Edit2, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router';
import { TopNav } from '../../components/layout/TopNav';
import { mockStudent, mockStudentReviews } from '../../data/mockData';

export function StudentProfile() {
  const [isPublic, setIsPublic] = useState(true);
  const navigate = useNavigate();

  const portfolioItems = [
    { id: 1, title: 'FitLife Campaign', color: '#4F5BD5', emoji: '📱' },
    { id: 2, title: 'Café Latte Brand', color: '#10B981', emoji: '☕' },
    { id: 3, title: 'E-commerce Site', color: '#FF7B54', emoji: '🛍️' },
  ];

  return (
    <div className="flex flex-col h-full">
      <TopNav title="My Profile" rightContent={
        <button onClick={() => navigate('/settings')} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <Settings size={17} className="text-gray-500" />
        </button>
      } />

      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Hero */}
        <div className="relative px-4 pt-6 pb-16 text-white" style={{ background: 'linear-gradient(135deg, #4F5BD5, #818cf8)' }}>
          <div className="flex items-start gap-4">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold" style={{ background: 'rgba(255,255,255,0.2)', fontFamily: 'Sora, sans-serif' }}>
              {mockStudent.initials}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>{mockStudent.name}</h1>
              <p className="text-sm opacity-80">{mockStudent.university}</p>
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1">
                  <Star size={12} fill="white" color="white" />
                  <span className="text-xs font-semibold">{mockStudent.rating}</span>
                  <span className="text-xs opacity-60">({mockStudent.reviewCount} reviews)</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase size={12} />
                  <span className="text-xs">{mockStudent.completedTasks} tasks done</span>
                </div>
              </div>
            </div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.2)' }}>
              <Edit2 size={14} color="white" />
            </button>
          </div>

          {/* Public toggle */}
          <div className="flex items-center justify-between mt-4 bg-white/10 rounded-xl px-3 py-2">
            <span className="text-xs font-medium opacity-80">Profile visible to businesses</span>
            <button
              onClick={() => setIsPublic(v => !v)}
              className="relative w-10 h-5 rounded-full transition-colors"
              style={{ background: isPublic ? '#10B981' : 'rgba(255,255,255,0.3)' }}
            >
              <span
                className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all shadow-sm"
                style={{ left: isPublic ? '22px' : '2px' }}
              />
            </button>
          </div>
        </div>

        {/* Stats overlay card */}
        <div className="mx-4 -mt-10 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-3">
          <div className="grid grid-cols-3 gap-0 text-center">
            {[
              { label: 'Total Earned', value: `₱${(mockStudent.totalEarned / 1000).toFixed(1)}k` },
              { label: 'Completed', value: mockStudent.completedTasks },
              { label: 'Rating', value: `⭐ ${mockStudent.rating}` },
            ].map((stat, i) => (
              <div key={i} className={i > 0 ? 'border-l border-gray-100' : ''}>
                <p className="text-base font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</p>
                <p className="text-[10px] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="mx-4 mb-3 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>About</h2>
            <button className="text-xs text-[#4F5BD5] font-medium">Edit</button>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">{mockStudent.bio}</p>
        </div>

        {/* Skills */}
        <div className="mx-4 mb-3 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Skills</h2>
            <button className="text-xs text-[#4F5BD5] font-medium">Edit</button>
          </div>
          <div className="flex flex-wrap gap-2">
            {mockStudent.skills.map(skill => (
              <span key={skill} className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: '#EEF0FF', color: '#4F5BD5' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Portfolio */}
        <div className="mx-4 mb-3 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Portfolio</h2>
            <button className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: '#4F5BD5' }}>+</button>
          </div>
          <div className="flex gap-2 overflow-x-auto no-scrollbar">
            {portfolioItems.map(item => (
              <div
                key={item.id}
                className="flex-shrink-0 w-24 h-24 rounded-xl flex flex-col items-center justify-center gap-1 cursor-pointer"
                style={{ background: item.color + '15' }}
              >
                <span className="text-2xl">{item.emoji}</span>
                <p className="text-[9px] font-semibold text-center px-1" style={{ color: item.color }}>{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div className="mx-4 mb-4 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Reviews from Businesses</h2>
            <div className="flex items-center gap-1">
              <Star size={12} fill="#F59E0B" color="#F59E0B" />
              <span className="text-xs font-bold text-gray-700">{mockStudent.rating}</span>
            </div>
          </div>
          {mockStudentReviews.map((rev, i) => (
            <div key={rev.id} className={`${i > 0 ? 'border-t border-gray-50 pt-3 mt-3' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#4F5BD5' }}>
                  {rev.businessInitials}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">{rev.businessName}</p>
                  <p className="text-[10px] text-gray-400">{rev.date}</p>
                </div>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: rev.rating }).map((_, j) => (
                    <Star key={j} size={10} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </div>
      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }`}</style>
    </div>
  );
}
