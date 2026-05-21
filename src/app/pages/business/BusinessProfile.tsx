import { useNavigate } from 'react-router';
import { Settings, MapPin, Globe, Mail, Star, Briefcase, Users, Edit2 } from 'lucide-react';
import { TopNav } from '../../components/layout/TopNav';
import { mockBusiness, mockBusinessReviews } from '../../data/mockData';

export function BusinessProfile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <TopNav title="Business Profile" rightContent={
        <button onClick={() => navigate('/business/profile/edit')} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <Edit2 size={16} className="text-gray-500" />
        </button>
      } />

      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Hero */}
        <div className="px-4 pt-6 pb-14 text-white" style={{ background: 'linear-gradient(135deg, #FF7B54, #FF9B54)' }}>
          <div className="flex items-start gap-3">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold flex-shrink-0" style={{ background: 'rgba(255,255,255,0.2)', fontFamily: 'Sora, sans-serif' }}>
              {mockBusiness.initials}
            </div>
            <div className="flex-1">
              <h1 className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>{mockBusiness.name}</h1>
              <span className="inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-1" style={{ background: 'rgba(255,255,255,0.2)' }}>
                {mockBusiness.category}
              </span>
              <div className="flex items-center gap-2 mt-2">
                <Star size={12} fill="white" color="white" />
                <span className="text-sm font-semibold">{mockBusiness.rating}</span>
                <span className="text-xs opacity-60">({mockBusiness.reviewCount} reviews)</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/business/profile/edit')}
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(255,255,255,0.2)' }}
            >
              <Settings size={15} color="white" />
            </button>
          </div>
        </div>

        {/* Stats overlay card */}
        <div className="mx-4 -mt-8 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm mb-3">
          <div className="grid grid-cols-3 gap-0 text-center">
            {[
              { label: 'Tasks Posted', value: mockBusiness.tasksPosted, icon: <Briefcase size={16} color="#FF7B54" /> },
              { label: 'Total Hired', value: mockBusiness.totalHired, icon: <Users size={16} color="#4F5BD5" /> },
              { label: 'Avg Rating', value: `⭐ ${mockBusiness.rating}`, icon: <Star size={16} color="#F59E0B" /> },
            ].map((stat, i) => (
              <div key={i} className={`${i > 0 ? 'border-l border-gray-100' : ''} px-2`}>
                <div className="flex justify-center mb-1">{stat.icon}</div>
                <p className="text-base font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</p>
                <p className="text-[10px] text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mx-4 mb-3 bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>About</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{mockBusiness.description}</p>
          <div className="mt-3 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-gray-500">
              <MapPin size={13} />
              <span className="text-xs">{mockBusiness.address}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Globe size={13} />
              <span className="text-xs text-[#4F5BD5]">{mockBusiness.website}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500">
              <Mail size={13} />
              <span className="text-xs">{mockBusiness.email}</span>
            </div>
          </div>
        </div>

        {/* Reviews from Students */}
        <div className="mx-4 mb-4 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Reviews from Students</h2>
            <div className="flex items-center gap-1">
              <Star size={12} fill="#F59E0B" color="#F59E0B" />
              <span className="text-xs font-bold text-gray-700">{mockBusiness.rating}</span>
            </div>
          </div>
          {mockBusinessReviews.map((rev, i) => (
            <div key={rev.id} className={i > 0 ? 'border-t border-gray-50 pt-3 mt-3' : ''}>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white" style={{ background: '#4F5BD5' }}>
                  {rev.studentInitials}
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-700">{rev.studentName}</p>
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
    </div>
  );
}
