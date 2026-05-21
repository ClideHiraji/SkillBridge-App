import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Eye, EyeOff, Check } from 'lucide-react';
import { StepIndicator } from '../../components/ui/StepIndicator';
import { useApp } from '../../context/AppContext';
import { registerUser } from '../../../lib/db';
import { toast } from 'sonner';

export function Register() {
  const navigate = useNavigate();
  const { login } = useApp();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'student' | 'business' | null>(null);
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    fullName: '', email: '', password: '',
    university: '', businessName: '', businessCategory: '',
  });

  const businessCategories = [
    'Food & Beverage', 'Retail', 'Technology', 'Health & Fitness',
    'Education', 'Marketing & Media', 'Fashion', 'Other',
  ];

  const handleContinue = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1 && !userType) return;
    if (step < 2) { setStep(2); return; }
    
    // Register user
    setLoading(true);
    try {
      const displayName = userType === 'student' ? form.fullName : form.businessName;
      
      // Register with Supabase
      await registerUser(form.email, form.password, userType!, displayName);
      
      // Auto-login
      const loginSuccess = await login(form.email, form.password);
      
      if (loginSuccess) {
        toast.success(`Welcome, ${displayName}!`);
        if (userType === 'student') navigate('/student/feed');
        else navigate('/business/dashboard');
      } else {
        // Login failed after registration (shouldn't happen, but handle it)
        toast.error('Account created but login failed. Please log in manually.');
        navigate('/login');
      }
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Registration failed';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (step === 1 && !userType) {
    // User type selection step
    return (
      <div className="h-full flex flex-col bg-white overflow-y-auto">
        <div className="px-6 pt-10 pb-6">
          <Link to="/login" className="text-sm text-[#4F5BD5] font-medium mb-8 block">← Back to Login</Link>
          <StepIndicator totalSteps={2} currentStep={1} />
          <h1 className="text-xl font-bold text-gray-900 mt-5 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>I am a...</h1>
          <p className="text-sm text-gray-500">Choose how you'll use SkillBridge</p>
        </div>

        <div className="px-6 flex flex-col gap-4 flex-1">
          {([
            {
              type: 'student' as const,
              emoji: '🎓',
              title: "I'm a Student",
              desc: 'Find gigs, earn money, and build your portfolio',
              color: '#4F5BD5',
              bg: '#EEF0FF',
            },
            {
              type: 'business' as const,
              emoji: '🏢',
              title: "I'm a Business Owner",
              desc: 'Post tasks, hire student talent, grow your business',
              color: '#FF7B54',
              bg: '#FFF0EB',
            },
          ]).map(opt => (
            <button
              key={opt.type}
              onClick={() => setUserType(opt.type)}
              className="w-full p-5 rounded-2xl border-2 text-left transition-all relative"
              style={{
                borderColor: userType === opt.type ? opt.color : '#E5E7EB',
                background: userType === opt.type ? opt.bg : 'white',
              }}
            >
              {userType === opt.type && (
                <div
                  className="absolute top-3 right-3 w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: opt.color }}
                >
                  <Check size={11} color="white" strokeWidth={3} />
                </div>
              )}
              <div className="text-3xl mb-3">{opt.emoji}</div>
              <h3 className="text-base font-bold mb-1" style={{ color: opt.color, fontFamily: 'Sora, sans-serif' }}>{opt.title}</h3>
              <p className="text-sm text-gray-500">{opt.desc}</p>
            </button>
          ))}
        </div>

        <div className="px-6 py-8">
          <button
            disabled={!userType}
            onClick={() => setStep(2)}
            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity disabled:opacity-40"
            style={{ background: userType === 'business' ? '#FF7B54' : '#4F5BD5', fontFamily: 'Sora, sans-serif' }}
          >
            Continue
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
            Already have an account? <Link to="/login" className="font-semibold text-[#4F5BD5]">Sign In</Link>
          </p>
        </div>
      </div>
    );
  }

  const brandColor = userType === 'business' ? '#FF7B54' : '#4F5BD5';

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto">
      <div className="px-6 pt-10 pb-6">
        <button onClick={() => { if (step === 2) setStep(1); else navigate('/login'); }} className="text-sm font-medium mb-8 block" style={{ color: brandColor }}>← Back</button>
        <StepIndicator totalSteps={2} currentStep={step} color={brandColor} />
        <h1 className="text-xl font-bold text-gray-900 mt-5 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
          {step === 1 ? 'Choose account type' : 'Create your account'}
        </h1>
        <p className="text-sm text-gray-500">
          {step === 2 && userType === 'student' ? 'Tell us about you as a student' : 'Tell us about your business'}
        </p>
      </div>

      <form onSubmit={handleContinue} className="flex-1 overflow-y-auto px-6 flex flex-col gap-4 pb-8">
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1.5">Full Name</label>
          <input
            value={form.fullName}
            onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
            placeholder="Juan dela Cruz"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#4F5BD5] outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1.5">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="juan@email.com"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#4F5BD5] outline-none transition-all"
            required
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-gray-600 block mb-1.5">Password</label>
          <div className="relative">
            <input
              type={showPw ? 'text' : 'password'}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              placeholder="Create a password"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#4F5BD5] outline-none transition-all pr-12"
              required
            />
            <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        {userType === 'student' ? (
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">University / School</label>
            <input
              value={form.university}
              onChange={e => setForm(f => ({ ...f, university: e.target.value }))}
              placeholder="e.g. University of Santo Tomas"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#4F5BD5] outline-none transition-all"
            />
          </div>
        ) : (
          <>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1.5">Business Name</label>
              <input
                value={form.businessName}
                onChange={e => setForm(f => ({ ...f, businessName: e.target.value }))}
                placeholder="e.g. FitLife Gym"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#4F5BD5] outline-none transition-all"
                required
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1.5">Business Category</label>
              <div className="flex flex-wrap gap-2 mt-1">
                {businessCategories.map(cat => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setForm(f => ({ ...f, businessCategory: cat }))}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={{
                      borderColor: form.businessCategory === cat ? '#FF7B54' : '#E5E7EB',
                      background: form.businessCategory === cat ? '#FFF0EB' : 'white',
                      color: form.businessCategory === cat ? '#FF7B54' : '#6B7280',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <button
          type="submit"
          disabled={loading || !form.email || !form.password || !form.fullName}
          className="w-full py-3.5 rounded-xl text-white font-semibold text-sm mt-4 transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ background: brandColor, fontFamily: 'Sora, sans-serif' }}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
        <p className="text-center text-sm text-gray-500">
          Already have an account? <Link to="/login" className="font-semibold text-[#4F5BD5]">Sign In</Link>
        </p>
      </form>
    </div>
  );
}
