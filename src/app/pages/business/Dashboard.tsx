import { useNavigate } from 'react-router';
import { Plus, LayoutDashboard, Briefcase, Users, CheckSquare, ChevronRight } from 'lucide-react';
import { TopNav } from '../../components/layout/TopNav';
import { TaskCard } from '../../components/ui/TaskCard';
import { mockTasks, mockBusiness, mockApplicants } from '../../data/mockData';

export function BusinessDashboard() {
  const navigate = useNavigate();
  const activeTasks = mockTasks.filter(t => t.status === 'open' || t.status === 'in_progress');

  const stats = [
    { icon: <Briefcase size={18} />, label: 'Active Tasks', value: activeTasks.length, color: '#FF7B54', bg: '#FFF0EB' },
    { icon: <Users size={18} />, label: 'Applicants', value: mockApplicants.length, color: '#4F5BD5', bg: '#EEF0FF' },
    { icon: <CheckSquare size={18} />, label: 'Completed', value: mockBusiness.totalHired, color: '#10B981', bg: '#D1FAE5' },
  ];

  const recentApplicants = mockApplicants.slice(0, 3);

  return (
    <div className="flex flex-col h-full relative">
      <TopNav showBrand />

      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Greeting */}
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs text-gray-500">Good morning 👋</p>
          <h1 className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{mockBusiness.name}</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 px-4 mb-4">
          {stats.map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-3 border border-gray-100">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center mb-2"
                style={{ background: stat.bg, color: stat.color }}
              >
                {stat.icon}
              </div>
              <p className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</p>
              <p className="text-[10px] text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Active Tasks horizontal scroll */}
        <div className="mb-4">
          <div className="flex items-center justify-between px-4 mb-2">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>My Active Tasks</h2>
            <button onClick={() => navigate('/business/tasks')} className="text-xs font-medium text-[#FF7B54] flex items-center gap-0.5">
              See all <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex gap-3 px-4 overflow-x-auto no-scrollbar pb-1">
            {activeTasks.slice(0, 5).map(task => (
              <TaskCard key={task.id} task={task} variant="business" compact />
            ))}
          </div>
        </div>

        {/* Recent Applicants */}
        <div className="mx-4 bg-white rounded-2xl border border-gray-100 mb-4 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-50">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Recent Applicants</h2>
            <button onClick={() => navigate('/business/task/t1/applicants')} className="text-xs font-medium text-[#FF7B54]">View all</button>
          </div>
          {recentApplicants.map((app, i) => (
            <div
              key={app.id}
              onClick={() => navigate(`/business/applicant/${app.id}`)}
              className="flex items-center gap-3 px-4 py-3 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 transition-colors"
            >
              <div
                className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                style={{ background: '#4F5BD5' }}
              >
                {app.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-900">{app.name}</p>
                <p className="text-xs text-gray-500 truncate">{app.university}</p>
              </div>
              <div className="flex items-center gap-1 flex-shrink-0">
                <span className="text-xs">⭐</span>
                <span className="text-xs font-semibold text-gray-700">{app.rating}</span>
              </div>
              <span
                className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{
                  background: app.status === 'accepted' ? '#D1FAE5' : app.status === 'rejected' ? '#FEE2E2' : '#F3F4F6',
                  color: app.status === 'accepted' ? '#10B981' : app.status === 'rejected' ? '#EF4444' : '#6B7280',
                }}
              >
                {app.status}
              </span>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mx-4 mb-4 bg-gradient-to-br from-[#FF7B54] to-[#FF9B54] rounded-2xl p-4 text-white">
          <p className="text-xs opacity-75 mb-1">Total Spent on Talent</p>
          <p className="text-2xl font-bold mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>₱{mockBusiness.totalSpent.toLocaleString()}</p>
          <button
            onClick={() => navigate('/business/analytics')}
            className="text-xs font-semibold bg-white/20 px-3 py-1.5 rounded-lg"
          >
            View Analytics →
          </button>
        </div>
      </div>

      {/* FAB */}
      <button
        onClick={() => navigate('/business/post-task')}
        className="absolute bottom-20 right-4 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform"
        style={{ background: '#FF7B54', zIndex: 100 }}
      >
        <Plus size={24} />
      </button>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }`}</style>
    </div>
  );
}