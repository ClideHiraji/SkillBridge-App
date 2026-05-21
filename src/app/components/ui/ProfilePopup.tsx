import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import { mockStudent, mockBusiness } from '../../data/mockData';
import { User, DollarSign, Settings, LogOut, LayoutDashboard } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export function ProfilePopup({ isOpen, onClose, anchorRef }: Props) {
  const { userType, logout } = useApp();
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const user = userType === 'student' ? mockStudent : mockBusiness;
  const isStudent = userType === 'student';

  useEffect(() => {
    if (!isOpen) { setShowLogoutConfirm(false); return; }
    function handleClick(e: MouseEvent) {
      if (
        popupRef.current && !popupRef.current.contains(e.target as Node) &&
        anchorRef.current && !anchorRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen, onClose, anchorRef]);

  if (!isOpen) return null;

  const handleNav = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    if (!showLogoutConfirm) { setShowLogoutConfirm(true); return; }
    logout();
    onClose();
    navigate('/login');
  };

  const studentMenuItems = [
    { icon: <User size={13} />, label: 'View My Profile', path: '/student/profile', color: '#EEF0FF', iconColor: '#4F5BD5' },
    { icon: <DollarSign size={13} />, label: 'My Earnings', path: '/student/earnings', color: '#FEF3C7', iconColor: '#F59E0B' },
    { icon: <Settings size={13} />, label: 'Settings', path: '/settings', color: '#F3F4F6', iconColor: '#6B7280' },
  ];
  const businessMenuItems = [
    { icon: <LayoutDashboard size={13} />, label: 'Business Dashboard', path: '/business/dashboard', color: '#FFF0EB', iconColor: '#FF7B54' },
    { icon: <User size={13} />, label: 'View My Profile', path: '/business/profile', color: '#EEF0FF', iconColor: '#4F5BD5' },
    { icon: <Settings size={13} />, label: 'Settings', path: '/settings', color: '#F3F4F6', iconColor: '#6B7280' },
  ];
  const menuItems = isStudent ? studentMenuItems : businessMenuItems;

  return (
    <>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <div
        ref={popupRef}
        className="absolute top-full right-0 mt-2 w-[220px] bg-white rounded-2xl shadow-2xl z-[9999] overflow-hidden"
        style={{ animation: 'slideDown 0.2s ease-out' }}
      >
        <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        {/* Header */}
        <div className="px-4 py-5 text-center" style={{ background: '#4F5BD5' }}>
          <div
            className="w-14 h-14 rounded-full mx-auto mb-2.5 flex items-center justify-center text-lg font-bold text-white"
            style={{ fontFamily: 'Sora, sans-serif', background: 'rgba(255,255,255,0.2)' }}
          >
            {user.initials}
          </div>
          <p className="text-sm font-bold text-white" style={{ fontFamily: 'Sora, sans-serif' }}>
            {isStudent ? (user as typeof mockStudent).name : (user as typeof mockBusiness).ownerName}
          </p>
          <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.65)' }}>{user.email}</p>
          {isStudent && (
            <div className="inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-full" style={{ background: 'rgba(255,255,255,0.15)' }}>
              <span className="text-[10px] font-semibold text-white">⭐ {(user as typeof mockStudent).rating}</span>
              <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.6)' }}>· {(user as typeof mockStudent).reviewCount} reviews</span>
            </div>
          )}
        </div>
        {/* Menu */}
        {menuItems.map((item) => (
          <button
            key={item.label}
            onClick={() => handleNav(item.path)}
            className="w-full flex items-center gap-2.5 px-4 py-3 border-b border-gray-100 text-left hover:bg-gray-50 transition-colors"
          >
            <div
              className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0"
              style={{ background: item.color, color: item.iconColor }}
            >
              {item.icon}
            </div>
            <span className="text-[13px] text-gray-600">{item.label}</span>
          </button>
        ))}
        {/* Logout */}
        {!showLogoutConfirm ? (
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-4 py-3 text-left hover:bg-red-50 transition-colors"
          >
            <div className="w-4 h-4 rounded flex items-center justify-center flex-shrink-0" style={{ background: '#FEE2E2', color: '#EF4444' }}>
              <LogOut size={13} />
            </div>
            <span className="text-[13px] text-red-500 font-medium">Log Out</span>
          </button>
        ) : (
          <div className="p-3 bg-red-50 border-t border-red-100">
            <p className="text-xs text-gray-600 mb-2 text-center">You will be returned to login.</p>
            <div className="flex gap-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-1.5 text-xs font-semibold text-white rounded-lg"
                style={{ background: '#EF4444' }}
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
