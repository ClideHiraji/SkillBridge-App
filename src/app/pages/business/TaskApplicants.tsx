import { useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { ChevronLeft, Star, ChevronDown, ChevronUp, Check } from 'lucide-react';
import { mockTasks, mockApplicants, categoryColors, type Applicant } from '../../data/mockData';

export function TaskApplicants() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const task = mockTasks.find(t => t.id === id) || mockTasks[0];
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState<Applicant | null>(null);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const catColor = categoryColors[task.category] || '#FF7B54';

  const handleAccept = (app: Applicant) => {
    if (!selected || selected.id !== app.id) { setSelected(app); return; }
    setConfirmed(app.id);
    setSelected(null);
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <div className="flex-1 min-w-0">
          <h1 className="text-[14px] font-semibold text-gray-900 truncate" style={{ fontFamily: 'Sora, sans-serif' }}>{task.title}</h1>
          <p className="text-[11px] text-gray-500">{mockApplicants.length} applicants</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Task Summary */}
        <div className="mx-4 mt-4 bg-white rounded-2xl border border-gray-100 overflow-hidden mb-4">
          <button
            onClick={() => setCollapsed(v => !v)}
            className="w-full flex items-center justify-between px-4 py-3 text-left"
          >
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full" style={{ background: catColor + '15', color: catColor }}>
                {task.category}
              </span>
              <span className="text-sm font-semibold text-[#FF7B54]">₱{task.price.toLocaleString()}</span>
            </div>
            {collapsed ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronUp size={16} className="text-gray-400" />}
          </button>
          {!collapsed && (
            <div className="px-4 pb-4 border-t border-gray-50">
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{task.description}</p>
              <p className="text-xs text-gray-400 mt-2">Deadline: {task.deadline}</p>
            </div>
          )}
        </div>

        {/* Applicants */}
        <div className="px-4 flex flex-col gap-3 pb-6">
          {mockApplicants.map(app => (
            <div key={app.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start gap-3">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
                    style={{ background: '#4F5BD5' }}
                  >
                    {app.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-900">{app.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{app.university}</p>
                      </div>
                      <span
                        className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{
                          background: app.status === 'accepted' || confirmed === app.id ? '#D1FAE5' : app.status === 'rejected' ? '#FEE2E2' : '#F3F4F6',
                          color: app.status === 'accepted' || confirmed === app.id ? '#10B981' : app.status === 'rejected' ? '#EF4444' : '#6B7280',
                        }}
                      >
                        {confirmed === app.id ? 'Accepted' : app.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center gap-0.5">
                        <Star size={11} fill="#F59E0B" color="#F59E0B" />
                        <span className="text-xs font-semibold text-gray-700">{app.rating}</span>
                        <span className="text-[10px] text-gray-400">({app.reviewCount})</span>
                      </div>
                      <span className="text-gray-300">·</span>
                      <span className="text-[10px] text-gray-500">{app.completedTasks} tasks done</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {app.skills.slice(0, 3).map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{s}</span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              {confirmed !== app.id && app.status !== 'rejected' && (
                <div className="flex border-t border-gray-50">
                  <button
                    onClick={() => navigate(`/business/applicant/${app.id}`)}
                    className="flex-1 py-2.5 text-xs font-semibold text-[#4F5BD5] border-r border-gray-50 hover:bg-blue-50/30 transition-colors"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={() => handleAccept(app)}
                    className="flex-1 py-2.5 text-xs font-semibold transition-colors hover:bg-green-50"
                    style={{ color: '#10B981' }}
                  >
                    {selected?.id === app.id ? 'Confirm Accept' : 'Accept'}
                  </button>
                </div>
              )}

              {/* Accept Confirmation bottom sheet */}
              {selected?.id === app.id && (
                <div className="border-t border-gray-100 px-4 py-3 bg-green-50/50">
                  <p className="text-xs font-semibold text-gray-700 mb-2">Accept <strong>{app.name}</strong> for this task?</p>
                  <p className="text-[11px] text-gray-500 mb-3">Other applicants will be notified. The task status will change to "In Progress."</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelected(null)}
                      className="flex-1 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-600 bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => { setConfirmed(app.id); setSelected(null); }}
                      className="flex-1 py-2 rounded-xl text-white text-xs font-semibold flex items-center justify-center gap-1"
                      style={{ background: '#10B981' }}
                    >
                      <Check size={13} /> Confirm
                    </button>
                  </div>
                </div>
              )}

              {confirmed === app.id && (
                <div
                  onClick={() => navigate('/business/task/t1/manage')}
                  className="border-t border-green-100 px-4 py-2.5 bg-green-50/50 flex items-center justify-between cursor-pointer"
                >
                  <p className="text-xs font-medium text-green-700">✓ Accepted · Task is now In Progress</p>
                  <span className="text-xs text-green-600 font-semibold">Manage →</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
