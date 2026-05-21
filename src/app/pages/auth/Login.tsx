import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Eye, EyeOff } from 'lucide-react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { PageTransition, LoadingSpinner } from '../../../components/PageTransition';
import { Logo } from '../../components/ui/Logo';

export function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useApp();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [userType, setUserType] = useState<'student' | 'business'>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      return;
    }
    if (!password.trim()) {
      return;
    }

    try {
      setIsSubmitting(true);
      const success = await login(email, password);
      
      // Only navigate if login was successful
      if (success) {
        setTimeout(() => {
          if (userType === 'student') navigate('/student/feed');
          else navigate('/business/dashboard');
        }, 500);
      }
      // If login failed, user stays on login page and sees error toast
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <div className="h-full flex flex-col bg-white">
        {/* Hero */}
        <motion.div
          className="px-6 pt-12 pb-8"
          style={{ background: 'linear-gradient(135deg, #4F5BD5 0%, #818cf8 100%)' }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="mb-4"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Logo size="lg" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>Welcome back!</h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>Sign in to your SkillBridge account</p>
        </motion.div>

        <div className="flex-1 overflow-y-auto px-6 py-8 flex flex-col gap-5">
          {/* User type toggle */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">I am a</p>
            <div className="grid grid-cols-2 gap-2">
              {(['student', 'business'] as const).map((type, i) => (
                <motion.button
                  key={type}
                  onClick={() => setUserType(type)}
                  className="py-2.5 rounded-xl border-2 text-sm font-semibold transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  style={{
                    borderColor: userType === type ? '#4F5BD5' : '#E5E7EB',
                    background: userType === type ? '#EEF0FF' : 'white',
                    color: userType === type ? '#4F5BD5' : '#6B7280',
                  }}
                >
                  {type === 'student' ? '🎓 Student' : '🏢 Business'}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            onSubmit={handleLogin}
            className="flex flex-col gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1.5">Email Address</label>
              <motion.input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder={userType === 'student' ? 'juan@email.com' : 'hello@business.ph'}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#4F5BD5] focus:ring-2 focus:ring-[#4F5BD5]/20 transition-all"
                whileFocus={{ scale: 1.02 }}
                required
              />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-gray-600">Password</label>
                <Link to="/forgot-password" className="text-xs font-medium text-[#4F5BD5]">Forgot Password?</Link>
              </div>
              <div className="relative">
                <motion.input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-[#4F5BD5] focus:ring-2 focus:ring-[#4F5BD5]/20 transition-all pr-12"
                  whileFocus={{ scale: 1.02 }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw(v => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-opacity hover:opacity-90 mt-2 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ background: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting && <LoadingSpinner />}
              {isSubmitting ? 'Signing in...' : 'Sign In'}
            </motion.button>
          </motion.form>

          {/* Or divider */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex-1 h-px bg-gray-100" />
            <span className="text-xs text-gray-400">or continue with</span>
            <div className="flex-1 h-px bg-gray-100" />
          </motion.div>

          {/* Social (placeholder) */}
          <motion.div
            className="grid grid-cols-2 gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <button className="py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <img 
                src="https://p1.hiclipart.com/preview/209/923/667/google-logo-background-g-suite-google-pay-google-doodle-text-circle-line-area-png-clipart.jpg" 
                alt="Google" 
                className="h-5 w-5 object-contain"
              />
              Google
            </button>
            <button className="py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGEpxxC5VV92Lu3fwTUz3y4YD2iwKW7TF0pg&s" 
                alt="Facebook" 
                className="h-5 w-5 object-contain"
              />
              Facebook
            </button>
          </motion.div>

          <motion.p
            className="text-center text-sm text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-[#4F5BD5]">Sign Up</Link>
          </motion.p>
        </div>
      </div>
    </PageTransition>
  );
}
