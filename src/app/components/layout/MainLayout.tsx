import { useNavigate, useLocation, Outlet } from 'react-router';
import { Home, Briefcase, DollarSign, User, LayoutDashboard, MessageSquare } from 'lucide-react';
import { BottomNav } from './BottomNav';
import { useResponsive } from '../../../hooks/useResponsive';
import { useApp } from '../../context/AppContext';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export function MainLayout() {
  const { isMobile } = useResponsive();
  const { userType } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const studentItems: NavItem[] = [
    { icon: <Home size={22} />, label: 'Feed', path: '/student/feed' },
    { icon: <Briefcase size={22} />, label: 'Tasks', path: '/student/my-tasks' },
    { icon: <DollarSign size={22} />, label: 'Earnings', path: '/student/earnings' },
    { icon: <User size={22} />, label: 'Profile', path: '/student/profile' },
  ];

  const businessItems: NavItem[] = [
    { icon: <LayoutDashboard size={22} />, label: 'Dashboard', path: '/business/dashboard' },
    { icon: <Briefcase size={22} />, label: 'My Tasks', path: '/business/tasks' },
    { icon: <MessageSquare size={22} />, label: 'Messages', path: '/messages' },
    { icon: <User size={22} />, label: 'Profile', path: '/business/profile' },
  ];

  const items = userType === 'student' ? studentItems : businessItems;
  const activeColor = userType === 'student' ? '#4F5BD5' : '#FF7B54';

  const isActive = (path: string) => {
    if (path === '/student/feed') return location.pathname === path || location.pathname.startsWith('/student/task');
    if (path === '/business/dashboard') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-full w-full">
      {/* Desktop Sidebar Navigation */}
      {!isMobile && (
        <div className="hidden lg:flex w-64 bg-white border-r border-gray-200 flex-col shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              SkillBridge
            </h1>
          </div>
          
          {/* Navigation Items - Push to bottom */}
          <div className="flex-1" />
          
          {/* Bottom Navigation Items */}
          <div className="p-4 border-t border-gray-200 space-y-2">
            {items.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all"
                  style={{
                    background: active ? `${activeColor}15` : 'transparent',
                    color: active ? activeColor : '#9CA3AF',
                  }}
                >
                  <div style={{ color: active ? activeColor : '#9CA3AF' }}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col flex-1 min-h-0">
        {/* Pages render their own TopNav + scrollable content */}
        <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
          <Outlet />
        </div>
        
        {/* Show bottom nav only on mobile */}
        {isMobile && <BottomNav />}
      </div>
    </div>
  );
}
