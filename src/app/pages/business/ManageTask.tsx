import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, MessageCircle, Star, CheckCircle, DollarSign } from 'lucide-react';
import { mockTasks } from '../../data/mockData';
import { StatusStepper } from '../../components/ui/StatusStepper';

export function ManageTask() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const task = mockTasks.find(t => t.id === id) || mockTasks[0];
  const [currentStep, setCurrentStep] = useState(3);
  const [showRelease, setShowRelease] = useState(false);
  const [released, setReleased] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewDone, setReviewDone] = useState(false);

  const student = {
    name: 'Ana Lim',
    initials: 'AL',
    rating: 5.0,
    reviewCount: 8,
    email: 'ana.lim@email.com',
  };

  if (reviewDone) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center bg-[#F9FAFB]">
        <div className="w-20 h-20 rounded-full flex items-center justify-center mb-5" style={{ background: '#D1FAE5' }}>
          <CheckCircle size={40} color="#10B981" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Task Completed! 🎉</h2>
        <p className="text-sm text-gray-500 mb-1">Payment released to Ana Lim</p>
        <p className="text-lg font-bold text-green-600 mb-6">₱{task.price.toLocaleString()}</p>
        <button
          onClick={() => navigate('/business/tasks')}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm"
          style={{ background: '#FF7B54', fontFamily: 'Sora, sans-serif' }}
        >
          Back to My Tasks
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] relative">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900 truncate flex-1" style={{ fontFamily: 'Sora, sans-serif' }}>
          {task.title}
        </h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {/* Status Stepper */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Task Progress</p>
          <StatusStepper currentStep={currentStep} color="#FF7B54" />
        </div>

        {/* Assigned Student */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Assigned Student</p>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white" style={{ background: '#4F5BD5' }}>
              {student.initials}
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-900">{student.name}</p>
              <div className="flex items-center gap-1">
                <Star size={11} fill="#F59E0B" color="#F59E0B" />
                <span className="text-xs text-gray-500">{student.rating} · {student.reviewCount} reviews</span>
              </div>
            </div>
            <button
              onClick={() => navigate('/messages/c3')}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: '#EEF0FF' }}
            >
              <MessageCircle size={16} color="#4F5BD5" />
            </button>
          </div>
          <p className="text-xs text-gray-400">{student.email}</p>
        </div>

        {/* Task Info */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Commission</p>
            <p className="text-lg font-bold" style={{ color: '#FF7B54', fontFamily: 'Sora, sans-serif' }}>₱{task.price.toLocaleString()}</p>
          </div>
          <p className="text-xs text-gray-500">Deadline: {task.deadline}</p>
        </div>

        {/* Work Submitted Banner (when step = 4) */}
        {currentStep >= 3 && !released && (
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <div className="flex items-start gap-2 mb-3">
              <span className="text-lg">📦</span>
              <div>
                <p className="text-sm font-semibold text-amber-800">Work Submitted</p>
                <p className="text-xs text-amber-700 mt-0.5">Ana Lim marked this task as complete. Please review the delivery before releasing payment.</p>
              </div>
            </div>
            <button
              onClick={() => setShowRelease(true)}
              className="w-full py-2.5 rounded-xl text-white text-sm font-semibold"
              style={{ background: '#FF7B54', fontFamily: 'Sora, sans-serif' }}
            >
              Review & Release Payment
            </button>
          </div>
        )}

        {/* Simulate steps */}
        {!released && (
          <div className="bg-white rounded-2xl p-4 border border-gray-100">
            <p className="text-xs font-semibold text-gray-500 mb-3">Update Status (Demo)</p>
            <div className="flex gap-2 flex-wrap">
              {[2, 3, 4, 5].map(s => (
                <button
                  key={s}
                  onClick={() => setCurrentStep(s)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium border transition-all"
                  style={{
                    borderColor: currentStep === s ? '#FF7B54' : '#E5E7EB',
                    background: currentStep === s ? '#FFF0EB' : 'white',
                    color: currentStep === s ? '#FF7B54' : '#6B7280',
                  }}
                >
                  Step {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Release Payment Modal */}
      {showRelease && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl px-6 pt-6 pb-8">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Release Payment?</h3>
            <p className="text-sm text-gray-500 mb-4">
              You're about to release <strong className="text-gray-900">₱{task.price.toLocaleString()}</strong> to <strong className="text-gray-900">Ana Lim</strong>.
            </p>
            <div className="bg-green-50 rounded-xl p-3 flex items-center gap-2 mb-5">
              <DollarSign size={18} color="#10B981" />
              <div>
                <p className="text-xs text-green-700 font-medium">Amount to release</p>
                <p className="text-lg font-bold text-green-800" style={{ fontFamily: 'Sora, sans-serif' }}>₱{task.price.toLocaleString()}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowRelease(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => { setReleased(true); setShowRelease(false); setShowReview(true); setCurrentStep(5); }}
                className="flex-1 py-3 rounded-xl text-white text-sm font-semibold"
                style={{ background: '#10B981', fontFamily: 'Sora, sans-serif' }}
              >
                Confirm Release
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Leave Review */}
      {showReview && !reviewDone && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl px-6 pt-6 pb-8">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <h3 className="text-base font-bold text-gray-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>Rate Ana Lim</h3>
            <p className="text-sm text-gray-500 mb-4">How was your experience working with this student?</p>
            <div className="flex justify-center gap-2 mb-4">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} onClick={() => setRating(s)}>
                  <Star size={32} fill={s <= rating ? '#F59E0B' : 'none'} color={s <= rating ? '#F59E0B' : '#D1D5DB'} />
                </button>
              ))}
            </div>
            <textarea
              value={reviewText}
              onChange={e => setReviewText(e.target.value)}
              placeholder="Describe your experience (optional)"
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none outline-none focus:border-[#FF7B54] transition-all mb-4"
            />
            <button
              onClick={() => setReviewDone(true)}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm mb-2"
              style={{ background: '#FF7B54', fontFamily: 'Sora, sans-serif' }}
            >
              Submit Review
            </button>
            <button onClick={() => setReviewDone(true)} className="w-full text-center text-sm text-gray-400">
              Skip for now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}