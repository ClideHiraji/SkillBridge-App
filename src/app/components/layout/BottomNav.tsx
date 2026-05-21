import { useNavigate, useLocation } from 'react-router';
import { Home, Briefcase, DollarSign, User, LayoutDashboard, MessageSquare, BarChart2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NavItem {
  icon: React.ReactNode;
  label: string;
  path: string;
}

export function BottomNav() {
  const { userType } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const studentItems: NavItem[] = [
    { icon: <Home size={20} />, label: 'Feed', path: '/student/feed' },
    { icon: <Briefcase size={20} />, label: 'Tasks', path: '/student/my-tasks' },
    { icon: <DollarSign size={20} />, label: 'Earnings', path: '/student/earnings' },
    { icon: <User size={20} />, label: 'Profile', path: '/student/profile' },
  ];

  const businessItems: NavItem[] = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/business/dashboard' },
    { icon: <Briefcase size={20} />, label: 'My Tasks', path: '/business/tasks' },
    { icon: <MessageSquare size={20} />, label: 'Messages', path: '/messages' },
    { icon: <User size={20} />, label: 'Profile', path: '/business/profile' },
  ];

  const items = userType === 'student' ? studentItems : businessItems;
  const activeColor = userType === 'student' ? '#4F5BD5' : '#FF7B54';

  const isActive = (path: string) => {
    if (path === '/student/feed') return location.pathname === path || location.pathname.startsWith('/student/task');
    if (path === '/business/dashboard') return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex-shrink-0 bg-white border-t border-gray-100 flex items-center" style={{ height: 64 }}>
      {items.map((item) => {
        const active = isActive(item.path);
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex-1 flex flex-col items-center justify-center gap-0.5 py-2 transition-all"
            style={{ color: active ? activeColor : '#9CA3AF' }}
          >
            <div style={{ color: active ? activeColor : '#9CA3AF' }}>{item.icon}</div>
            <span className="text-[10px] font-medium" style={{ color: active ? activeColor : '#9CA3AF' }}>{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}
