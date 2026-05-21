import { useState } from 'react';
import { ChevronLeft, ChevronRight, User, Lock, Bell, Moon, Globe, HelpCircle, Bug, Star, FileText, Shield, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/ui/Logo';

interface SettingItem {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  sublabel?: string;
  action?: () => void;
  toggle?: boolean;
  toggleValue?: boolean;
  onToggle?: (v: boolean) => void;
  danger?: boolean;
}

interface SettingSection {
  title: string;
  items: SettingItem[];
}

export function Settings() {
  const navigate = useNavigate();
  const { logout } = useApp();
  const [pushNotif, setPushNotif] = useState(true);
  const [emailNotif, setEmailNotif] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const sections: SettingSection[] = [
    {
      title: 'Account',
      items: [
        {
          icon: <User size={15} />,
          iconBg: '#EEF0FF',
          iconColor: '#4F5BD5',
          label: 'Edit Profile',
          sublabel: 'Update your name, bio, skills',
        },
        {
          icon: <Lock size={15} />,
          iconBg: '#F3F4F6',
          iconColor: '#6B7280',
          label: 'Change Password',
          sublabel: 'Update your password',
        },
        {
          icon: <Globe size={15} />,
          iconBg: '#EEF0FF',
          iconColor: '#4F5BD5',
          label: 'Linked Accounts',
          sublabel: 'Google, Facebook',
        },
      ],
    },
    {
      title: 'Notifications',
      items: [
        {
          icon: <Bell size={15} />,
          iconBg: '#FEF3C7',
          iconColor: '#F59E0B',
          label: 'Push Notifications',
          sublabel: 'New tasks, updates, messages',
          toggle: true,
          toggleValue: pushNotif,
          onToggle: setPushNotif,
        },
        {
          icon: <Bell size={15} />,
          iconBg: '#F3F4F6',
          iconColor: '#6B7280',
          label: 'Email Notifications',
          sublabel: 'Weekly summaries and alerts',
          toggle: true,
          toggleValue: emailNotif,
          onToggle: setEmailNotif,
        },
      ],
    },
    {
      title: 'Appearance',
      items: [
        {
          icon: <Moon size={15} />,
          iconBg: '#1e293b',
          iconColor: '#94a3b8',
          label: 'Dark Mode',
          sublabel: 'Switch to dark theme',
          toggle: true,
          toggleValue: darkMode,
          onToggle: setDarkMode,
        },
        {
          icon: <Globe size={15} />,
          iconBg: '#F3F4F6',
          iconColor: '#6B7280',
          label: 'Language',
          sublabel: 'English (US)',
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle size={15} />,
          iconBg: '#EEF0FF',
          iconColor: '#4F5BD5',
          label: 'Help Center',
          sublabel: 'FAQs and guides',
        },
        {
          icon: <Bug size={15} />,
          iconBg: '#FEF3C7',
          iconColor: '#F59E0B',
          label: 'Report a Bug',
          sublabel: 'Help us improve SkillBridge',
        },
        {
          icon: <Star size={15} />,
          iconBg: '#FEF3C7',
          iconColor: '#F59E0B',
          label: 'Rate the App',
          sublabel: 'Share your experience',
        },
      ],
    },
    {
      title: 'Legal',
      items: [
        {
          icon: <Shield size={15} />,
          iconBg: '#F3F4F6',
          iconColor: '#6B7280',
          label: 'Privacy Policy',
        },
        {
          icon: <FileText size={15} />,
          iconBg: '#F3F4F6',
          iconColor: '#6B7280',
          label: 'Terms of Service',
        },
      ],
    },
    {
      title: 'Danger Zone',
      items: [
        {
          icon: <Trash2 size={15} />,
          iconBg: '#FEE2E2',
          iconColor: '#EF4444',
          label: 'Delete Account',
          sublabel: 'This action cannot be undone',
          danger: true,
          action: () => setShowDeleteConfirm(true),
        },
      ],
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB] relative">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Settings</h1>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* App version badge */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-3 bg-white rounded-2xl p-4 border border-gray-100">
            <Logo size="md" />
            <div>
              <p className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>SkillBridge</p>
              <p className="text-xs text-gray-400">Version 1.0.0 MVP</p>
            </div>
          </div>
        </div>

        {sections.map(section => (
          <div key={section.title} className="mb-3">
            <p className="px-4 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
              {section.title}
            </p>
            <div className="mx-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  onClick={item.action}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors ${i > 0 ? 'border-t border-gray-50' : ''}`}
                >
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.iconBg, color: item.iconColor }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${item.danger ? 'text-red-500' : 'text-gray-800'}`}>
                      {item.label}
                    </p>
                    {item.sublabel && (
                      <p className="text-[11px] text-gray-400 mt-0.5">{item.sublabel}</p>
                    )}
                  </div>
                  {item.toggle ? (
                    <button
                      onClick={(e) => { e.stopPropagation(); item.onToggle?.(!item.toggleValue); }}
                      className="relative w-11 h-6 rounded-full transition-colors flex-shrink-0"
                      style={{ background: item.toggleValue ? '#4F5BD5' : '#E5E7EB' }}
                    >
                      <span
                        className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all"
                        style={{ left: item.toggleValue ? '22px' : '2px' }}
                      />
                    </button>
                  ) : (
                    <ChevronRight size={16} className="text-gray-300 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Log out */}
        <div className="mx-4 mt-2">
          <button
            onClick={() => { logout(); navigate('/login'); }}
            className="w-full py-3.5 rounded-2xl border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Delete Confirm Modal */}
      {showDeleteConfirm && (
        <div className="absolute inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-3xl px-6 pt-6 pb-8">
            <div className="w-10 h-1 bg-gray-200 rounded-full mx-auto mb-5" />
            <div className="text-center mb-5">
              <div className="text-4xl mb-3">⚠️</div>
              <h3 className="text-base font-bold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>Delete Account?</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                This will permanently delete your account and all your data. This action cannot be undone.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 py-3 rounded-xl border border-gray-200 text-sm font-semibold text-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={() => { setShowDeleteConfirm(false); logout(); navigate('/login'); }}
                className="flex-1 py-3 rounded-xl text-white text-sm font-semibold"
                style={{ background: '#EF4444' }}
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}