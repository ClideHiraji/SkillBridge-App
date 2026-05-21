import { useState } from 'react';
import { useNavigate } from 'react-router';
import { TrendingUp, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { TopNav } from '../../components/layout/TopNav';
import { mockEarningsHistory, mockActiveTasks, mockStudent } from '../../data/mockData';

const TABS = ['Active', 'History'] as const;

export function Earnings() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]>('Active');
  const navigate = useNavigate();

  const totalReleased = mockEarningsHistory.reduce((s, e) => s + e.amount, 0);

  return (
    <div className="flex flex-col h-full">
      <TopNav title="Earnings" />

      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Summary Cards */}
        <div className="px-4 pt-4 pb-2">
          <div className="bg-gradient-to-br from-[#4F5BD5] to-[#818cf8] rounded-2xl p-5 text-white mb-3">
            <p className="text-sm opacity-75 mb-0.5">Total Earned</p>
            <p className="text-3xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
              ₱{mockStudent.totalEarned.toLocaleString()}
            </p>
            <div className="flex gap-4">
              <div>
                <p className="text-xs opacity-60">Available</p>
                <p className="text-base font-bold">₱{mockStudent.availableBalance.toLocaleString()}</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-xs opacity-60">Pending</p>
                <p className="text-base font-bold">₱{mockStudent.pendingBalance.toLocaleString()}</p>
              </div>
              <div className="w-px bg-white/20" />
              <div>
                <p className="text-xs opacity-60">Tasks Done</p>
                <p className="text-base font-bold">{mockStudent.completedTasks}</p>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
              <TrendingUp size={18} color="#4F5BD5" className="mx-auto mb-1" />
              <p className="text-base font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>₱850</p>
              <p className="text-[10px] text-gray-500">Avg per Task</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
              <Clock size={18} color="#F59E0B" className="mx-auto mb-1" />
              <p className="text-base font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>2</p>
              <p className="text-[10px] text-gray-500">In Progress</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-gray-100 text-center">
              <CheckCircle size={18} color="#10B981" className="mx-auto mb-1" />
              <p className="text-base font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{mockStudent.completedTasks}</p>
              <p className="text-[10px] text-gray-500">Completed</p>
            </div>
          </div>

          {/* Payout button */}
          <button
            onClick={() => navigate('/student/wallet')}
            className="w-full py-3 rounded-xl flex items-center justify-center gap-2 text-white text-sm font-semibold mb-4"
            style={{ background: '#10B981', fontFamily: 'Sora, sans-serif' }}
          >
            Request Payout
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Tabs */}
        <div className="bg-white border-b border-gray-100 flex px-4 mx-0">
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
            </button>
          ))}
        </div>

        <div className="px-4 py-3 flex flex-col gap-3">
          {activeTab === 'Active' ? (
            mockActiveTasks.map(task => (
              <div key={task.id} className="bg-white rounded-2xl p-4 border border-gray-100">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{task.businessName}</p>
                    <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{task.title}</h3>
                  </div>
                  <span className="text-sm font-bold" style={{ color: '#4F5BD5', fontFamily: 'Sora, sans-serif' }}>₱{task.price.toLocaleString()}</span>
                </div>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wider">Progress</span>
                  <span className="text-[10px] font-semibold text-gray-600">{task.progress}%</span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${task.progress}%`, background: task.progress === 100 ? '#10B981' : '#4F5BD5' }}
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">Due: {task.deadline}</p>
              </div>
            ))
          ) : (
            mockEarningsHistory.map(item => (
              <div key={item.id} className="bg-white rounded-2xl p-4 border border-gray-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{item.taskTitle}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{item.businessName} · {item.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-green-600">+₱{item.amount.toLocaleString()}</p>
                  <span className="text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Released</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
