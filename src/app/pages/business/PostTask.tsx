import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronLeft, ChevronRight, X, Check, CheckCircle } from 'lucide-react';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { CATEGORIES } from '../../data/mockData';

const TIME_OPTIONS = ['1-2h', '3-5h', '5-8h', '8-12h', '12h+'];

export function PostTask() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [form, setForm] = useState({
    title: '',
    category: '',
    description: '',
    deadline: '',
    price: '',
    estimatedTime: '',
    skills: [] as string[],
    maxApplicants: 5,
    skillInput: '',
  });

  const addSkill = () => {
    const s = form.skillInput.trim();
    if (s && !form.skills.includes(s)) {
      setForm(f => ({ ...f, skills: [...f.skills, s], skillInput: '' }));
    }
  };

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) { setStep(2); return; }
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="h-full flex flex-col items-center justify-center px-6 text-center bg-[#F9FAFB]">
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: '#D1FAE5' }}>
          <CheckCircle size={48} color="#10B981" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Task is Now Live!</h2>
        <p className="text-sm text-gray-500 mb-2 leading-relaxed">
          <strong className="text-gray-700">{form.title || 'Your task'}</strong> is published. Students can now start applying.
        </p>
        <p className="text-xs text-gray-400 mb-8">You'll be notified when applications come in.</p>
        <button
          onClick={() => navigate('/business/task/t1/applicants')}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm mb-3"
          style={{ background: '#FF7B54', fontFamily: 'Sora, sans-serif' }}
        >
          View Task
        </button>
        <button onClick={() => navigate('/business/dashboard')} className="text-sm text-gray-500">Back to Dashboard</button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => step > 1 ? setStep(1) : navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Post a Task</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Step Indicator */}
        <div className="mb-5">
          <StepIndicator totalSteps={2} currentStep={step} color="#FF7B54" />
          <h2 className="text-base font-bold text-gray-900 mt-3" style={{ fontFamily: 'Sora, sans-serif' }}>
            {step === 1 ? 'Task Details' : 'Requirements & Budget'}
          </h2>
        </div>

        <form onSubmit={handleNext} className="flex flex-col gap-4">
          {step === 1 ? (
            <>
              {/* Title */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Task Title *</label>
                <input
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  placeholder="e.g. Social Media Content Creation"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all bg-white"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Category *</label>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => setForm(f => ({ ...f, category: cat }))}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                      style={{
                        borderColor: form.category === cat ? '#FF7B54' : '#E5E7EB',
                        background: form.category === cat ? '#FFF0EB' : 'white',
                        color: form.category === cat ? '#FF7B54' : '#6B7280',
                      }}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-gray-600">Task Description *</label>
                  <span className="text-[10px] text-gray-400">{form.description.length}/200</span>
                </div>
                <textarea
                  value={form.description}
                  onChange={e => setForm(f => ({ ...f, description: e.target.value.slice(0, 200) }))}
                  placeholder="Describe what the student needs to do..."
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all resize-none bg-white"
                  required
                />
              </div>

              {/* Deadline */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Deadline *</label>
                <input
                  type="date"
                  value={form.deadline}
                  onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all bg-white"
                  required
                />
              </div>
            </>
          ) : (
            <>
              {/* Price */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Commission Amount (₱) *</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">₱</span>
                  <input
                    type="number"
                    value={form.price}
                    onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                    placeholder="0"
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all bg-white"
                    required
                    min={0}
                  />
                </div>
              </div>

              {/* Estimated Time */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Estimated Time</label>
                <div className="flex flex-wrap gap-2">
                  {TIME_OPTIONS.map(t => (
                    <button
                      type="button"
                      key={t}
                      onClick={() => setForm(f => ({ ...f, estimatedTime: t }))}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                      style={{
                        borderColor: form.estimatedTime === t ? '#FF7B54' : '#E5E7EB',
                        background: form.estimatedTime === t ? '#FFF0EB' : 'white',
                        color: form.estimatedTime === t ? '#FF7B54' : '#6B7280',
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Skills Needed</label>
                <div className="flex gap-2 mb-2">
                  <input
                    value={form.skillInput}
                    onChange={e => setForm(f => ({ ...f, skillInput: e.target.value }))}
                    onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                    placeholder="Type a skill and press Enter"
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all bg-white"
                  />
                  <button
                    type="button"
                    onClick={addSkill}
                    className="px-3 py-2 rounded-xl text-white text-sm font-semibold flex-shrink-0"
                    style={{ background: '#FF7B54' }}
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {form.skills.map(skill => (
                    <span
                      key={skill}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                      style={{ background: '#FFF0EB', color: '#FF7B54' }}
                    >
                      {skill}
                      <button onClick={() => setForm(f => ({ ...f, skills: f.skills.filter(s => s !== skill) }))} type="button">
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              </div>

              {/* Max Applicants */}
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Max Applicants</label>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, maxApplicants: Math.max(1, f.maxApplicants - 1) }))}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-lg text-gray-600 bg-white"
                  >
                    −
                  </button>
                  <span className="text-xl font-bold text-gray-900 w-8 text-center" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {form.maxApplicants}
                  </span>
                  <button
                    type="button"
                    onClick={() => setForm(f => ({ ...f, maxApplicants: Math.min(20, f.maxApplicants + 1) }))}
                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-lg text-gray-600 bg-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 mt-2"
            style={{ background: '#FF7B54', fontFamily: 'Sora, sans-serif' }}
          >
            {step === 2 ? (
              <><Check size={16} /> Post Task</>
            ) : (
              <>Continue <ChevronRight size={16} /></>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
