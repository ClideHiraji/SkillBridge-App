import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Plus, Calendar, Users } from 'lucide-react';
import { TopNav } from '../../components/layout/TopNav';
import { mockTasks, categoryColors } from '../../data/mockData';

const TABS = ['Active', 'Pending Review', 'Completed'] as const;

const STATUS_MAP: Record<typeof TABS[number], string[]> = {
  'Active': ['open'],
  'Pending Review': ['in_progress'],
  'Completed': ['done', 'paid'],
};

export function BusinessTasks() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Active');
  const navigate = useNavigate();

  const tasksByTab = TABS.reduce((acc, tab) => {
    acc[tab] = mockTasks.filter(t => STATUS_MAP[tab].includes(t.status));
    return acc;
  }, {} as Record<typeof TABS[number], typeof mockTasks>);

  const tasks = tasksByTab[activeTab];

  return (
    <div className="flex flex-col h-full relative">
      <TopNav title="My Tasks" />

      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-2">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-xs font-semibold border-b-2 transition-all px-1"
              style={{
                borderColor: activeTab === tab ? '#FF7B54' : 'transparent',
                color: activeTab === tab ? '#FF7B54' : '#9CA3AF',
              }}
            >
              {tab}
              <span
                className="ml-1 px-1.5 py-0.5 rounded-full text-[9px]"
                style={{
                  background: activeTab === tab ? '#FFF0EB' : '#F3F4F6',
                  color: activeTab === tab ? '#FF7B54' : '#9CA3AF',
                }}
              >
                {tasksByTab[tab].length}
              </span>
            </button>
          ))}
        </div>

        <div className="px-4 py-4 flex flex-col gap-3">
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>No tasks yet</h3>
              <p className="text-sm text-gray-500 mb-6">Tap the + button to post your first task.</p>
              <button
                onClick={() => navigate('/business/post-task')}
                className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white flex items-center gap-2 mx-auto"
                style={{ background: '#FF7B54' }}
              >
                <Plus size={16} /> Post a Task
              </button>
            </div>
          ) : (
            tasks.map(task => {
              const catColor = categoryColors[task.category] || '#FF7B54';
              return (
                <div
                  key={task.id}
                  onClick={() => navigate(`/business/task/${task.id}/applicants`)}
                  className="bg-white rounded-2xl p-4 border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-2">
                    <span
                      className="text-[11px] font-semibold px-2.5 py-1 rounded-full"
                      style={{ background: catColor + '15', color: catColor }}
                    >
                      {task.category}
                    </span>
                    <span className="text-base font-bold" style={{ color: '#FF7B54', fontFamily: 'Sora, sans-serif' }}>
                      ₱{task.price.toLocaleString()}
                    </span>
                  </div>

                  <h3 className="text-[15px] font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Sora, sans-serif' }}>
                    {task.title}
                  </h3>

                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Calendar size={11} />
                      <span className="text-[11px]">{task.daysLeft} days left</span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Users size={11} />
                      <span className="text-[11px]">{task.applicantCount} of {task.maxApplicants} spots filled</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {task.skills.slice(0, 2).map(s => (
                        <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{s}</span>
                      ))}
                    </div>
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{ background: '#FFF0EB', color: '#FF7B54' }}
                    >
                      {task.applicantCount} applicants
                    </span>
                  </div>
                </div>
              );
            })
          )}
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
    </div>
  );
}