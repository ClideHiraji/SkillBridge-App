import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, Star, CheckCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { mockTasks } from '../data/mockData';

export function Review() {
  const { taskId } = useParams<{ taskId: string }>();
  const navigate = useNavigate();
  const { userType } = useApp();
  const task = mockTasks.find(t => t.id === taskId) || mockTasks[0];
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const brandColor = userType === 'student' ? '#4F5BD5' : '#FF7B54';

  const reviewTarget = userType === 'student'
    ? { name: task.businessName, initials: task.businessName.slice(0, 2).toUpperCase(), label: 'Business' }
    : { name: 'Ana Lim', initials: 'AL', label: 'Student' };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Great', 'Excellent'];

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center bg-[#F9FAFB]">
        <div
          className="w-20 h-20 rounded-full flex items-center justify-center mb-5"
          style={{ background: '#D1FAE5' }}
        >
          <CheckCircle size={40} color="#10B981" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
          Review Submitted!
        </h2>
        <p className="text-sm text-gray-500 mb-8 leading-relaxed">
          Thank you for your feedback. It helps build a better SkillBridge community.
        </p>
        <button
          onClick={() => navigate(-2)}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: brandColor, fontFamily: 'Sora, sans-serif' }}
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Leave a Review</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        {/* Task context */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-6">
          <p className="text-xs text-gray-400 mb-1">Task Completed</p>
          <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{task.title}</p>
          <p className="text-xs font-bold mt-1" style={{ color: brandColor }}>₱{task.price.toLocaleString()}</p>
        </div>

        {/* Target avatar */}
        <div className="flex flex-col items-center mb-8">
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center text-xl font-bold text-white mb-3"
            style={{ background: brandColor, fontFamily: 'Sora, sans-serif' }}
          >
            {reviewTarget.initials}
          </div>
          <p className="text-base font-bold text-gray-900 mb-0.5" style={{ fontFamily: 'Sora, sans-serif' }}>
            {reviewTarget.name}
          </p>
          <p className="text-xs text-gray-400">{reviewTarget.label}</p>
          <p className="text-sm text-gray-600 mt-2">How was your experience?</p>
        </div>

        {/* Stars */}
        <div className="flex justify-center gap-3 mb-3">
          {[1, 2, 3, 4, 5].map(s => (
            <button
              key={s}
              onMouseEnter={() => setHoverRating(s)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(s)}
              className="transition-transform hover:scale-110 active:scale-95"
            >
              <Star
                size={40}
                fill={s <= (hoverRating || rating) ? '#F59E0B' : 'none'}
                color={s <= (hoverRating || rating) ? '#F59E0B' : '#D1D5DB'}
                strokeWidth={1.5}
              />
            </button>
          ))}
        </div>

        {/* Rating label */}
        <div className="text-center mb-6">
          <p className="text-sm font-semibold" style={{ color: rating > 0 ? '#F59E0B' : '#9CA3AF' }}>
            {rating > 0 ? ratingLabels[rating] : 'Tap a star to rate'}
          </p>
        </div>

        {/* Review text */}
        <div className="mb-6">
          <label className="text-xs font-semibold text-gray-600 block mb-1.5">
            Share your experience <span className="font-normal text-gray-400">(optional)</span>
          </label>
          <div className="relative">
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value.slice(0, 200))}
              placeholder="Describe your experience working with them..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none resize-none bg-white transition-all"
              style={{ borderColor: reviewText ? brandColor : '' }}
            />
            <span className="absolute bottom-3 right-3 text-[10px] text-gray-400">
              {reviewText.length}/200
            </span>
          </div>
        </div>

        {/* Submit */}
        <button
          onClick={() => rating > 0 && setSubmitted(true)}
          disabled={rating === 0}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-40 mb-3"
          style={{ background: brandColor, fontFamily: 'Sora, sans-serif' }}
        >
          Submit Review
        </button>
        <button
          onClick={() => navigate(-1)}
          className="w-full text-center text-sm text-gray-400 py-2"
        >
          Skip for now
        </button>
      </div>
    </div>
  );
}
