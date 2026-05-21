import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Calendar, Clock, Users, MapPin, Star, Bookmark, MessageCircle, ChevronLeft, CheckCircle } from 'lucide-react';
import { mockTasks, categoryColors } from '../../data/mockData';

export function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const task = mockTasks.find(t => t.id === id) || mockTasks[0];
  const [applied, setApplied] = useState(false);
  const [saved, setSaved] = useState(false);
  const catColor = categoryColors[task.category] || '#4F5BD5';

  const businessReviews = [
    { name: 'Maria S.', rating: 5, text: 'Great client to work with! Very clear instructions and paid on time.' },
    { name: 'Carlo R.', rating: 5, text: 'Professional and responsive. Would work with them again.' },
  ];

  if (applied) {
    return (
      <div className="h-full bg-[#F9FAFB] flex flex-col items-center justify-center px-6 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: '#D1FAE5' }}>
          <CheckCircle size={40} color="#10B981" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Application Sent!</h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Your application for <strong className="text-gray-700">{task.title}</strong> has been submitted. You'll be notified once the business reviews it.
        </p>
        <button
          onClick={() => navigate('/student/my-tasks')}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm mb-3"
          style={{ background: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}
        >
          View My Tasks
        </button>
        <button onClick={() => navigate('/student/feed')} className="text-sm text-[#4F5BD5] font-medium">
          Back to Feed
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header image area */}
      <div className="relative flex-shrink-0" style={{ background: catColor + '15' }}>
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm z-10"
        >
          <ChevronLeft size={18} className="text-gray-700" />
        </button>
        <button
          onClick={() => setSaved(v => !v)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm z-10"
        >
          <Bookmark size={16} style={{ color: saved ? '#4F5BD5' : '#9CA3AF', fill: saved ? '#4F5BD5' : 'none' }} />
        </button>
        <div className="px-4 pt-16 pb-4 flex items-end gap-3">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
            style={{ background: catColor + '20' }}
          >
            {task.category === 'Design' ? '🎨' : task.category === 'Social Media' ? '📱' : task.category === 'Coding' ? '💻' : task.category === 'Tutoring' ? '📚' : task.category === 'Photography' ? '📷' : task.category === 'Video' ? '🎬' : task.category === 'Writing' ? '✍️' : '📣'}
          </div>
          <div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: catColor + '20', color: catColor }}>{task.category}</span>
            <h1 className="text-lg font-bold text-gray-900 mt-1" style={{ fontFamily: 'Sora, sans-serif' }}>{task.title}</h1>
            <p className="text-sm text-gray-500">{task.businessName}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Price + Stats */}
        <div className="mx-4 mt-4 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Commission</p>
              <p className="text-2xl font-bold" style={{ color: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}>₱{task.price.toLocaleString()}</p>
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-1.5 text-gray-500">
                <Calendar size={13} />
                <span className="text-xs">{task.deadline}</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Clock size={13} />
                <span className="text-xs">{task.estimatedTime} estimated</span>
              </div>
              <div className="flex items-center gap-1.5 text-gray-500">
                <Users size={13} />
                <span className="text-xs">{task.applicantCount}/{task.maxApplicants} applicants</span>
              </div>
            </div>
          </div>
          <div className="h-px bg-gray-100 my-3" />
          <div className="flex items-center gap-1.5">
            <div
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{ background: task.daysLeft <= 7 ? '#FEE2E2' : '#D1FAE5', color: task.daysLeft <= 7 ? '#EF4444' : '#10B981' }}
            >
              {task.daysLeft} days left
            </div>
            <span className="text-xs text-gray-400">· Posted {task.postedDate}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Task Description</h2>
          <p className="text-sm text-gray-600 leading-relaxed">{task.description}</p>
        </div>

        {/* Skills */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Skills Required</h2>
          <div className="flex flex-wrap gap-2">
            {task.skills.map(skill => (
              <span key={skill} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: catColor + '15', color: catColor }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Business Card */}
        <div className="mx-4 mt-3 bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>About the Business</h2>
            <button className="text-xs font-semibold text-[#4F5BD5]">View Profile →</button>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white" style={{ background: catColor }}>
              {task.businessName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{task.businessName}</p>
              <div className="flex items-center gap-1">
                <Star size={11} fill="#F59E0B" color="#F59E0B" />
                <span className="text-xs text-gray-500">4.7 · 12 reviews</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-gray-500">
            <MapPin size={12} />
            <span className="text-xs">Quezon City, Metro Manila</span>
          </div>
        </div>

        {/* Reviews */}
        <div className="mx-4 mt-3 mb-4 bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>What Students Say</h2>
          {businessReviews.map((rev, i) => (
            <div key={i} className={`${i > 0 ? 'border-t border-gray-50 pt-3 mt-3' : ''}`}>
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white" style={{ background: '#4F5BD5' }}>
                  {rev.name[0]}
                </div>
                <span className="text-xs font-semibold text-gray-700">{rev.name}</span>
                <div className="flex items-center gap-0.5 ml-auto">
                  {Array.from({ length: rev.rating }).map((_, i) => (
                    <Star key={i} size={10} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">{rev.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTAs */}
      <div className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-3 flex gap-2">
        <button
          onClick={() => navigate('/student/feed')}
          className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600"
        >
          Not Interested
        </button>
        <button
          onClick={() => setApplied(true)}
          className="flex-1 py-3 rounded-xl text-white text-sm font-semibold flex items-center justify-center gap-2"
          style={{ background: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}
