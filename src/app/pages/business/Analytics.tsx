import { ChevronLeft, TrendingUp, Users, Clock, Tag } from 'lucide-react';
import { useNavigate } from 'react-router';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockBusiness } from '../../data/mockData';

const lineData = [
  { month: 'Jan', tasks: 0 },
  { month: 'Feb', tasks: 1 },
  { month: 'Mar', tasks: 2 },
  { month: 'Apr', tasks: 1 },
  { month: 'May', tasks: 3 },
  { month: 'Jun', tasks: 1 },
];

const barData = [
  { category: 'Design', applicants: 3 },
  { category: 'Social', applicants: 8 },
  { category: 'Coding', applicants: 5 },
  { category: 'Writing', applicants: 4 },
  { category: 'Photo', applicants: 2 },
];

export function Analytics() {
  const navigate = useNavigate();

  const statCards = [
    {
      icon: <TrendingUp size={18} />,
      label: 'Total Spent',
      value: `₱${mockBusiness.totalSpent.toLocaleString()}`,
      color: '#FF7B54',
      bg: '#FFF0EB',
    },
    {
      icon: <Clock size={18} />,
      label: 'Avg Completion',
      value: mockBusiness.avgCompletionTime,
      color: '#4F5BD5',
      bg: '#EEF0FF',
    },
    {
      icon: <Tag size={18} />,
      label: 'Top Category',
      value: 'Social Media',
      color: '#10B981',
      bg: '#D1FAE5',
    },
    {
      icon: <Users size={18} />,
      label: 'Total Hired',
      value: mockBusiness.totalHired,
      color: '#F59E0B',
      bg: '#FEF3C7',
    },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Analytics</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-4">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-3">
          {statCards.map(stat => (
            <div key={stat.label} className="bg-white rounded-2xl p-4 border border-gray-100">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center mb-2"
                style={{ background: stat.bg, color: stat.color }}
              >
                {stat.icon}
              </div>
              <p className="text-lg font-bold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>{stat.value}</p>
              <p className="text-[11px] text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Line chart: task postings */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Task Postings Over Time
          </h2>
          <ResponsiveContainer width="100%" height={160}>
            <LineChart data={lineData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
              />
              <Line
                type="monotone"
                dataKey="tasks"
                stroke="#FF7B54"
                strokeWidth={2.5}
                dot={{ fill: '#FF7B54', strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: '#FF7B54' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar chart: applicants per category */}
        <div className="bg-white rounded-2xl p-4 border border-gray-100">
          <h2 className="text-sm font-bold text-gray-900 mb-4" style={{ fontFamily: 'Sora, sans-serif' }}>
            Applicants by Category
          </h2>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={barData} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" vertical={false} />
              <XAxis dataKey="category" tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: '#9CA3AF' }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ borderRadius: 8, border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: 12 }}
              />
              <Bar dataKey="applicants" fill="#4F5BD5" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Coming soon banner */}
        <div
          className="rounded-2xl p-4 border"
          style={{ background: 'rgba(79,91,213,0.05)', borderColor: 'rgba(79,91,213,0.2)' }}
        >
          <p className="text-xs font-semibold mb-1" style={{ color: '#4F5BD5' }}>📊 Full Analytics Coming Soon</p>
          <p className="text-xs text-gray-500 leading-relaxed">
            Advanced insights including applicant quality scores, task completion rates, ROI tracking, and more detailed breakdowns will be available in the next release.
          </p>
        </div>
      </div>
    </div>
  );
}
