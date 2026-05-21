import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { supabase } from '../../lib/supabase';
import { getUserProfile, getNotifications, logoutUser, loginUser } from '../../lib/db';
import type { UserProfile, Notification } from '../../lib/types';

interface AppContextType {
  // Auth
  user: any | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  supabaseReady: boolean;
  
  // User Type
  userType: 'student' | 'business' | null;
  
  // Notifications
  notifications: Notification[];
  unreadCount: number;
  
  // Dark Mode
  isDarkMode: boolean;
  
  // Actions
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  markNotificationAsRead: (id: string) => void;
  deleteNotification: (id: string) => void;
  toggleDarkMode: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const supabaseReady = !!supabase;

  // Initialize auth state and load user data
  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    (async () => {
      try {
        // If supabase not configured, skip auth check
        if (!supabase) {
          console.log('⚠️  Supabase not configured. Using demo mode.');
          setIsLoading(false);
          return;
        }

        // Check current session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          setUser(session.user);
          // Load user profile
          const profile = await getUserProfile(session.user.id);
          if (profile) {
            setUserProfile(profile);
            // Load notifications
            const notifs = await getNotifications(session.user.id);
            setNotifications(notifs);
          }
        }

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              setUser(session.user);
              const profile = await getUserProfile(session.user.id);
              if (profile) {
                setUserProfile(profile);
              }
            } else {
              setUser(null);
              setUserProfile(null);
            }
          }
        );

        unsubscribe = subscription?.unsubscribe || null;
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Continue anyway, don't crash
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      unsubscribe?.();
    };
  }, []);

  // Load dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('skillbridge-dark-mode') === 'true';
    setIsDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      if (!supabase) {
        toast.error('Supabase not configured');
        return false;
      }
      
      const { data, error } = await loginUser(email, password);
      
      if (error) {
        // Parse error message for better UX
        if (error.message?.includes('Email not confirmed')) {
          toast.error('Please confirm your email first');
        } else if (error.message?.includes('Invalid login credentials')) {
          toast.error('Invalid email or password');
        } else if (error.message?.includes('User not found')) {
          toast.error('Email not found. Please sign up first');
        } else {
          toast.error(error.message || 'Login failed');
        }
        return false;
      }
      
      if (data?.user) {
        setUser(data.user);
        toast.success('Welcome back!');
        // Load profile
        const profile = await getUserProfile(data.user.id);
        if (profile) {
          setUserProfile(profile);
        }
        return true;
      }
      
      return false;
    } catch (error: any) {
      console.error('Login error:', error);
      toast.error(error?.message || 'Login failed. Please try again.');
      return false;
    }
  };

  const logout = async () => {
    try {
      if (supabase) {
        await logoutUser();
      }
      setUser(null);
      setUserProfile(null);
      setNotifications([]);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('skillbridge-dark-mode', newDarkMode.toString());
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const userType = userProfile?.user_type || null;

  return (
    <AppContext.Provider
      value={{
        user,
        userProfile,
        isLoading,
        isAuthenticated: !!user,
        supabaseReady,
        userType,
        notifications,
        unreadCount,
        isDarkMode,
        login,
        logout,
        markNotificationAsRead,
        deleteNotification,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
