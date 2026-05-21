import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Send, Phone, MoreVertical } from 'lucide-react';
import { mockConversations, mockChatMessages } from '../data/mockData';

export function Chat() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const conv = mockConversations.find(c => c.id === id) || mockConversations[0];
  const [messages, setMessages] = useState(mockChatMessages);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages(prev => [
      ...prev,
      {
        id: `m${prev.length + 1}`,
        text: input.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isMe: true,
      }
    ]);
    setInput('');
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <div className="relative flex-shrink-0">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{ background: conv.participantColor, fontFamily: 'Sora, sans-serif' }}
          >
            {conv.participantInitials}
          </div>
          {conv.isOnline && (
            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-white" />
          )}
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>
            {conv.participantName}
          </p>
          <p className="text-[11px]" style={{ color: conv.isOnline ? '#10B981' : '#9CA3AF' }}>
            {conv.isOnline ? 'Online' : 'Offline'}
          </p>
        </div>
        <div className="flex items-center gap-1">
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
            <Phone size={16} className="text-gray-500" />
          </button>
          <button className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
            <MoreVertical size={16} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
        {/* Date divider */}
        <div className="flex items-center gap-3 my-2">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[11px] text-gray-400 font-medium">Today</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
            {!msg.isMe && (
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0 mr-2 mt-auto"
                style={{ background: conv.participantColor, fontFamily: 'Sora, sans-serif' }}
              >
                {conv.participantInitials}
              </div>
            )}
            <div className={`max-w-[72%]`}>
              <div
                className="px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                style={{
                  background: msg.isMe ? '#4F5BD5' : 'white',
                  color: msg.isMe ? 'white' : '#111827',
                  borderRadius: msg.isMe ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  boxShadow: msg.isMe ? 'none' : '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                {msg.text}
              </div>
              <p className={`text-[10px] text-gray-400 mt-1 ${msg.isMe ? 'text-right' : 'text-left'}`}>
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSend}
        className="flex-shrink-0 bg-white border-t border-gray-100 px-4 py-3 flex items-center gap-3"
      >
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-gray-100 rounded-xl px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none"
        />
        <button
          type="submit"
          className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0 transition-opacity disabled:opacity-40"
          style={{ background: '#4F5BD5' }}
          disabled={!input.trim()}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
}
