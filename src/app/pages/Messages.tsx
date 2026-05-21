import { useNavigate } from 'react-router';
import { Search } from 'lucide-react';
import { TopNav } from '../components/layout/TopNav';
import { mockConversations } from '../data/mockData';

export function Messages() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full">
      <TopNav title="Messages" />

      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Search */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-200">
            <Search size={15} className="text-gray-400 flex-shrink-0" />
            <input
              placeholder="Search messages..."
              className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Conversations */}
        <div className="bg-white mx-4 rounded-2xl border border-gray-100 overflow-hidden">
          {mockConversations.length === 0 ? (
            <div className="py-16 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>No messages yet</h3>
              <p className="text-sm text-gray-500">When you connect with businesses or students, your conversations will appear here.</p>
            </div>
          ) : (
            mockConversations.map((conv, i) => (
              <button
                key={conv.id}
                onClick={() => navigate(`/messages/${conv.id}`)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-gray-50 transition-colors ${i > 0 ? 'border-t border-gray-50' : ''}`}
              >
                {/* Avatar */}
                <div className="relative flex-shrink-0">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold text-white"
                    style={{ background: conv.participantColor, fontFamily: 'Sora, sans-serif' }}
                  >
                    {conv.participantInitials}
                  </div>
                  {conv.isOnline && (
                    <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-400 border-2 border-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-semibold text-gray-900 truncate" style={{ fontFamily: 'Sora, sans-serif' }}>
                      {conv.participantName}
                    </p>
                    <span className="text-[11px] text-gray-400 flex-shrink-0 ml-2">{conv.lastMessageTime}</span>
                  </div>
                  <p className={`text-xs truncate ${conv.unreadCount > 0 ? 'text-gray-700 font-medium' : 'text-gray-500'}`}>
                    {conv.lastMessage}
                  </p>
                </div>

                {/* Unread badge */}
                {conv.unreadCount > 0 && (
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
                    style={{ background: '#4F5BD5' }}
                  >
                    {conv.unreadCount}
                  </div>
                )}
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
