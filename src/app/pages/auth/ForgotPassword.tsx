import { useState } from 'react';
import { Link } from 'react-router';
import { ChevronLeft, Mail } from 'lucide-react';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 pt-10 pb-6">
        <Link to="/login" className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors">
          <ChevronLeft size={20} className="text-gray-700" />
        </Link>
      </div>

      <div className="flex-1 px-6 flex flex-col">
        {!sent ? (
          <>
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6" style={{ background: '#EEF0FF' }}>
                <Mail size={28} color="#4F5BD5" />
              </div>
              <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Forgot Password?</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                No worries! Enter your email address and we'll send you a link to reset your password.
              </p>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="juan@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-[#4F5BD5] focus:ring-2 focus:ring-[#4F5BD5]/20 outline-none transition-all"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm"
                style={{ background: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}
              >
                Send Reset Link
              </button>
            </form>
            <p className="text-center text-sm text-gray-500 mt-6">
              Remember your password? <Link to="/login" className="font-semibold text-[#4F5BD5]">Sign In</Link>
            </p>
          </>
        ) : (
          <div className="flex flex-col items-center text-center mt-8">
            <div className="w-20 h-20 rounded-full flex items-center justify-center mb-6" style={{ background: '#D1FAE5' }}>
              <span className="text-4xl">📧</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Check your email</h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-2">
              We sent a password reset link to
            </p>
            <p className="text-sm font-semibold text-gray-900 mb-6">{email}</p>
            <p className="text-sm text-gray-500 mb-8">
              Didn't receive it?{' '}
              <button onClick={() => setSent(false)} className="text-[#4F5BD5] font-semibold">Resend</button>
            </p>
            <Link
              to="/login"
              className="w-full py-3.5 rounded-xl text-white font-semibold text-sm text-center"
              style={{ background: '#4F5BD5', fontFamily: 'Sora, sans-serif', display: 'block' }}
            >
              Back to Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
