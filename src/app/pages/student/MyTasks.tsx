import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, ChevronRight } from 'lucide-react';
import { TopNav } from '../../components/layout/TopNav';
import { StatusStepper } from '../../components/ui/StatusStepper';
import { mockActiveTasks, categoryColors } from '../../data/mockData';

const STATUS_LABELS = {
  in_progress: { label: 'In Progress', bg: '#FEF3C7', color: '#F59E0B' },
  done: { label: 'Submitted', bg: '#D1FAE5', color: '#10B981' },
  paid: { label: 'Paid', bg: '#D1FAE5', color: '#10B981' },
  cancelled: { label: 'Cancelled', bg: '#FEE2E2', color: '#EF4444' },
  open: { label: 'Open', bg: '#EEF0FF', color: '#4F5BD5' },
};

const TABS = ['In Progress', 'Done', 'Cancelled'] as const;

export function MyTasks() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('In Progress');
  const navigate = useNavigate();

  const tasksByTab = {
    'In Progress': mockActiveTasks.filter(t => t.status === 'in_progress'),
    'Done': mockActiveTasks.filter(t => t.status === 'done' || t.status === 'paid'),
    'Cancelled': [],
  };

  const tasks = tasksByTab[activeTab];

  return (
    <div className="flex flex-col h-full">
      <TopNav title="My Tasks" />

      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-4">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="flex-1 py-3 text-xs font-semibold border-b-2 transition-all"
              style={{
                borderColor: activeTab === tab ? '#4F5BD5' : 'transparent',
                color: activeTab === tab ? '#4F5BD5' : '#9CA3AF',
              }}
            >
              {tab}
              <span
                className="ml-1 px-1.5 py-0.5 rounded-full text-[9px]"
                style={{
                  background: activeTab === tab ? '#EEF0FF' : '#F3F4F6',
                  color: activeTab === tab ? '#4F5BD5' : '#9CA3AF',
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
              <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>No tasks here</h3>
              <p className="text-sm text-gray-500 mb-6">
                {activeTab === 'In Progress' ? 'Tasks you accept will appear here.' : 'Completed tasks will appear here.'}
              </p>
              {activeTab === 'In Progress' && (
                <button
                  onClick={() => navigate('/student/feed')}
                  className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: '#4F5BD5' }}
                >
                  Browse Tasks
                </button>
              )}
            </div>
          ) : (
            tasks.map(task => {
              const catColor = categoryColors[task.category] || '#4F5BD5';
              const statusStyle = STATUS_LABELS[task.status] || STATUS_LABELS['open'];
              return (
                <div
                  key={task.id}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => navigate(`/student/task/${task.taskId}`)}
                >
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                          style={{ background: catColor }}
                        >
                          {task.businessInitials}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">{task.businessName}</p>
                          <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{task.title}</h3>
                        </div>
                      </div>
                      <div
                        className="px-2 py-0.5 rounded-full text-[10px] font-semibold flex-shrink-0"
                        style={{ background: statusStyle.bg, color: statusStyle.color }}
                      >
                        {statusStyle.label}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-sm font-bold" style={{ color: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}>
                        ₱{task.price.toLocaleString()}
                      </span>
                      <div className="flex items-center gap-1 text-gray-400">
                        <Calendar size={11} />
                        <span className="text-xs">{task.daysLeft} days left</span>
                      </div>
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] text-gray-400 uppercase tracking-wider">Progress</span>
                        <span className="text-[10px] font-semibold text-gray-600">{task.progress}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${task.progress}%`, background: task.progress === 100 ? '#10B981' : '#4F5BD5' }}
                        />
                      </div>
                    </div>

                    {/* Status Stepper */}
                    <StatusStepper currentStep={task.currentStep} color="#4F5BD5" />
                  </div>

                  {task.status === 'done' && (
                    <div className="border-t border-gray-50 px-4 py-2.5 flex items-center justify-between bg-green-50/50">
                      <p className="text-xs font-medium text-green-700">Work submitted — awaiting payment release</p>
                      <ChevronRight size={14} className="text-green-600" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
