import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router';
import { useApp } from '../context/AppContext';
import type { Notification } from '../data/mockData';

function dotColor(type: Notification['type']) {
  const map: Record<string, string> = {
    task_match: '#4F5BD5',
    application: '#4F5BD5',
    payment: '#10B981',
    deadline: '#F59E0B',
    review: '#10B981',
  };
  return map[type] || '#E5E7EB';
}

function typeEmoji(type: Notification['type']) {
  const map: Record<string, string> = {
    task_match: '🔍',
    application: '📋',
    payment: '💰',
    deadline: '⏰',
    review: '⭐',
  };
  return map[type] || '🔔';
}

export function Notifications() {
  const navigate = useNavigate();
  const { notifications, markAllRead, markRead, unreadCount } = useApp();

  const today = notifications.slice(0, 3);
  const yesterday = notifications.slice(3, 5);
  const thisWeek = notifications.slice(5);

  const groups = [
    { label: 'Today', items: today },
    { label: 'Yesterday', items: yesterday },
    { label: 'This Week', items: thisWeek },
  ].filter(g => g.items.length > 0);

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center justify-between" style={{ height: 56 }}>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(-1)}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
          >
            <ChevronLeft size={20} className="text-gray-700" />
          </button>
          <h1 className="text-[15px] font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
            Notifications
          </h1>
          {unreadCount > 0 && (
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
              style={{ background: '#EF4444' }}
            >
              {unreadCount}
            </div>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs font-semibold"
            style={{ color: '#4F5BD5' }}
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto pb-4">
        {notifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <div className="text-6xl mb-5">🔔</div>
            <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>
              You're all caught up!
            </h3>
            <p className="text-sm text-gray-500">No new notifications right now.</p>
          </div>
        ) : (
          groups.map(group => (
            <div key={group.label} className="mb-2">
              <p className="px-4 py-2 text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
                {group.label}
              </p>
              <div className="mx-4 bg-white rounded-2xl border border-gray-100 overflow-hidden">
                {group.items.map((n, i) => (
                  <button
                    key={n.id}
                    onClick={() => markRead(n.id)}
                    className={`w-full flex items-start gap-3 px-4 py-4 text-left transition-colors hover:bg-gray-50 ${i > 0 ? 'border-t border-gray-50' : ''} ${!n.isRead ? 'bg-blue-50/30' : ''}`}
                  >
                    {/* Type icon */}
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                      style={{ background: dotColor(n.type) + '15' }}
                    >
                      {typeEmoji(n.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700 leading-relaxed">{n.message}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: n.isRead ? '#E5E7EB' : dotColor(n.type) }}
                        />
                        <span className="text-[11px] text-gray-400">{n.time}</span>
                        {!n.isRead && (
                          <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full" style={{ background: '#EEF0FF', color: '#4F5BD5' }}>
                            New
                          </span>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
