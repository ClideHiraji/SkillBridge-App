import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Warn but don't crash if env vars missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('⚠️  Missing Supabase environment variables');
  console.warn('📝 Create .env.local file in project root with:');
  console.warn('   VITE_SUPABASE_URL=https://your-project.supabase.co');
  console.warn('   VITE_SUPABASE_ANON_KEY=your_anon_key_here');
  console.warn('');
  console.warn('📖 Get keys from: https://supabase.com > Settings > API');
  console.warn('📚 See QUICK_START.md for setup instructions');
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Re-export types
export type { User, Session } from '@supabase/supabase-js';
