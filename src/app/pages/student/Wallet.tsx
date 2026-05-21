import { useNavigate } from 'react-router';
import { ChevronLeft, CreditCard, Plus, Info } from 'lucide-react';
import { mockStudent } from '../../data/mockData';

export function Wallet() {
  const navigate = useNavigate();

  const paymentMethods = [
    { name: 'GCash', number: '09xx xxx x123', icon: '💚', color: '#00B4D8' },
    { name: 'PayMaya', number: '09xx xxx x456', icon: '💙', color: '#7B2D8B' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Wallet & Payout</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Balance Card */}
        <div className="rounded-2xl p-5 text-white mb-4" style={{ background: 'linear-gradient(135deg, #10B981, #34D399)' }}>
          <p className="text-sm opacity-75 mb-1">Available Balance</p>
          <p className="text-3xl font-bold mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>₱{mockStudent.availableBalance.toLocaleString()}</p>
          <div className="flex items-center gap-2 bg-white/15 rounded-xl px-3 py-2">
            <Info size={14} />
            <p className="text-xs opacity-90">₱{mockStudent.pendingBalance} pending from active tasks</p>
          </div>
        </div>

        {/* Payout Button */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
          <div className="flex items-start gap-2 mb-3">
            <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ background: '#FEF3C7' }}>
              <Info size={12} color="#F59E0B" />
            </div>
            <p className="text-xs text-gray-500 leading-relaxed">
              <strong className="text-gray-700">Coming Soon:</strong> Direct bank and e-wallet payouts will be available in the next update. For now, payouts are processed manually within 3-5 business days.
            </p>
          </div>
          <button
            className="w-full py-3 rounded-xl text-sm font-semibold text-gray-400 border border-dashed border-gray-200 flex items-center justify-center gap-2"
            disabled
          >
            <CreditCard size={16} />
            Request Payout
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-600 font-medium">Soon</span>
          </button>
        </div>

        {/* Payment Methods */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Payment Methods</h2>
            <button className="flex items-center gap-1 text-xs text-[#4F5BD5] font-medium">
              <Plus size={13} /> Add
            </button>
          </div>
          {paymentMethods.map(m => (
            <div key={m.name} className="flex items-center gap-3 py-3 border-b border-gray-50 last:border-0">
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-xl" style={{ background: m.color + '15' }}>
                {m.icon}
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                <p className="text-xs text-gray-500">{m.number}</p>
              </div>
              <span className="ml-auto text-[10px] font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Linked</span>
            </div>
          ))}
          <button className="w-full py-2.5 mt-2 rounded-xl border border-dashed border-gray-200 text-xs text-gray-500 font-medium flex items-center justify-center gap-1">
            <Plus size={13} /> Add Payment Method
          </button>
        </div>

        {/* Transaction History */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-3" style={{ fontFamily: 'Sora, sans-serif' }}>Recent Transactions</h2>
          {[
            { label: 'Instagram Templates Pack', amount: '+₱350', date: 'Apr 20', color: 'text-green-600' },
            { label: 'WordPress Landing Page', amount: '+₱1,800', date: 'Apr 10', color: 'text-green-600' },
            { label: 'Payout to GCash', amount: '-₱2,000', date: 'Apr 5', color: 'text-red-500' },
          ].map((t, i) => (
            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
              <div>
                <p className="text-xs font-medium text-gray-700">{t.label}</p>
                <p className="text-[10px] text-gray-400">{t.date}</p>
              </div>
              <span className={`text-sm font-bold ${t.color}`}>{t.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
