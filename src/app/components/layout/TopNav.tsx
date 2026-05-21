import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Bell, ChevronLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useResponsive } from '../../../hooks/useResponsive';
import { NotificationPopup } from '../ui/NotificationPopup';
import { ProfilePopup } from '../ui/ProfilePopup';
import { Logo } from '../ui/Logo';
import { mockStudent, mockBusiness } from '../../data/mockData';

interface Props {
  title?: string;
  showBack?: boolean;
  showBrand?: boolean;
  rightContent?: React.ReactNode;
  onBack?: () => void;
}

export function TopNav({ title, showBack = false, showBrand = false, rightContent, onBack }: Props) {
  const { userType, unreadCount } = useApp();
  const { isMobile } = useResponsive();
  const navigate = useNavigate();
  const location = useLocation();
  const bellRef = useRef<HTMLButtonElement>(null);
  const avatarRef = useRef<HTMLButtonElement>(null);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const isMainPage = !showBack;
  const user = userType === 'student' ? mockStudent : mockBusiness;
  const brandColor = userType === 'student' ? '#4F5BD5' : '#FF7B54';

  const handleBack = () => {
    if (onBack) { onBack(); return; }
    navigate(-1);
  };

  const navHeight = isMobile ? 56 : 64;

  return (
    <div 
      className="relative flex-shrink-0 bg-white border-b border-gray-200 px-4 lg:px-8 flex items-center justify-between shadow-sm" 
      style={{ height: navHeight }}
    >
      {/* Left */}
      <div className="flex items-center gap-2 lg:gap-4 min-w-[80px]">
        {showBack ? (
          <button
            onClick={handleBack}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
        ) : showBrand ? (
          <div className="flex items-center gap-2 lg:gap-3">
            <div
              className="w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center"
              style={{ background: brandColor }}
            >
              <Logo size="md" />
            </div>
            <span className="text-sm lg:text-base font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>SkillBridge</span>
          </div>
        ) : null}
      </div>

      {/* Center */}
      <div className="absolute left-1/2 transform -translate-x-1/2">
        {title && (
          <h1 className="text-[15px] lg:text-lg font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{title}</h1>
        )}
      </div>

      {/* Right */}
      <div className="flex items-center gap-2 lg:gap-4 min-w-[80px] justify-end">
        {rightContent}
        {isMainPage && (
          <>
            {/* Bell */}
            <div className="relative">
              <button
                ref={bellRef}
                onClick={() => { setNotifOpen(v => !v); setProfileOpen(false); }}
                className="w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <Bell size={isMobile ? 18 : 20} className="text-gray-600" />
              </button>
              {unreadCount > 0 && (
                <div
                  className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border-2 border-white"
                  style={{ background: '#EF4444' }}
                />
              )}
              <NotificationPopup
                isOpen={notifOpen}
                onClose={() => setNotifOpen(false)}
                anchorRef={bellRef}
              />
            </div>
            {/* Avatar */}
            <div className="relative">
              <button
                ref={avatarRef}
                onClick={() => { setProfileOpen(v => !v); setNotifOpen(false); }}
                className="w-8 h-8 lg:w-9 lg:h-9 rounded-full flex items-center justify-center text-white text-xs lg:text-sm font-bold transition-opacity hover:opacity-80"
                style={{ background: brandColor, fontFamily: 'Sora, sans-serif' }}
              >
                {user.initials}
              </button>
              <ProfilePopup
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
                anchorRef={avatarRef}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
