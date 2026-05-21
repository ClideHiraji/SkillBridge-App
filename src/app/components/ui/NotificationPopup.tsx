import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useApp } from '../../context/AppContext';
import type { Notification } from '../../data/mockData';

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

interface Props {
  isOpen: boolean;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
}

export function NotificationPopup({ isOpen, onClose, anchorRef }: Props) {
  const { notifications, unreadCount, markAllRead, markRead } = useApp();
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) return;
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

  return (
    <>
      <div className="fixed inset-0 z-[9998]" onClick={onClose} />
      <div
        ref={popupRef}
        className="absolute top-full right-0 mt-2 w-[320px] bg-white rounded-2xl shadow-2xl z-[9999] overflow-hidden"
        style={{ animation: 'slideDown 0.2s ease-out' }}
      >
        <style>{`@keyframes slideDown { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <span className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Notifications</span>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs font-semibold text-[#4F5BD5]">Mark all read</button>
          )}
        </div>
        <div className="max-h-[360px] overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="py-10 text-center">
              <div className="text-4xl mb-3">🔔</div>
              <p className="text-sm text-gray-500">You're all caught up!<br />No new notifications.</p>
            </div>
          ) : (
            notifications.map(n => (
              <button
                key={n.id}
                onClick={() => { markRead(n.id); onClose(); }}
                className={`w-full flex items-start gap-3 px-4 py-3.5 border-b border-gray-50 text-left transition-colors hover:bg-gray-50 ${!n.isRead ? 'bg-blue-50/40' : ''}`}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                  style={{ background: n.isRead ? '#E5E7EB' : dotColor(n.type) }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-600 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: n.message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}
                  />
                  <p className="text-[11px] text-gray-400 mt-1">{n.time}</p>
                </div>
              </button>
            ))
          )}
        </div>
        <button
          onClick={() => { navigate('/notifications'); onClose(); }}
          className="w-full py-3 text-xs font-semibold text-[#4F5BD5] border-t border-gray-100 hover:bg-blue-50/30 transition-colors"
        >
          See All Notifications
        </button>
      </div>
    </>
  );
}
