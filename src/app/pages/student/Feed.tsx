import { useState, useRef } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { TopNav } from '../../components/layout/TopNav';
import { TaskCard } from '../../components/ui/TaskCard';
import { mockTasks, CATEGORIES, categoryColors } from '../../data/mockData';

export function StudentFeed() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showFilter, setShowFilter] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [sortBy, setSortBy] = useState<'latest' | 'highest' | 'deadline'>('latest');

  const filteredTasks = mockTasks.filter(t => {
    const matchQuery = !query || t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.businessName.toLowerCase().includes(query.toLowerCase());
    const matchCat = !activeCategory || t.category === activeCategory;
    const matchPrice = t.price >= priceRange[0] && t.price <= priceRange[1];
    return matchQuery && matchCat && matchPrice && t.status === 'open';
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortBy === 'highest') return b.price - a.price;
    if (sortBy === 'deadline') return a.daysLeft - b.daysLeft;
    return 0;
  });

  return (
    <div className="flex flex-col h-full">
      <TopNav showBrand />

      <div className="flex-1 overflow-y-auto bg-[#F9FAFB]">
        {/* Search Bar */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-2 bg-white rounded-xl px-3 py-2.5 border border-gray-200">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search tasks or businesses..."
                className="flex-1 text-sm text-gray-900 placeholder-gray-400 outline-none bg-transparent"
              />
              {query && (
                <button onClick={() => setQuery('')}><X size={14} className="text-gray-400" /></button>
              )}
            </div>
            <button
              onClick={() => setShowFilter(v => !v)}
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
              style={{ background: showFilter ? '#4F5BD5' : 'white', border: '1px solid #E5E7EB' }}
            >
              <SlidersHorizontal size={16} style={{ color: showFilter ? 'white' : '#6B7280' }} />
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilter && (
          <div className="mx-4 mb-2 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-2">Sort By</p>
              <div className="flex gap-2">
                {([['latest', 'Latest'], ['highest', 'Highest Pay'], ['deadline', 'Deadline Soon']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setSortBy(val)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                    style={{
                      borderColor: sortBy === val ? '#4F5BD5' : '#E5E7EB',
                      background: sortBy === val ? '#EEF0FF' : 'white',
                      color: sortBy === val ? '#4F5BD5' : '#6B7280',
                    }}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wider mb-1">
                Price Range: ₱{priceRange[0]} – ₱{priceRange[1]}+
              </p>
              <input
                type="range" min={0} max={2000} value={priceRange[1]}
                onChange={e => setPriceRange([0, parseInt(e.target.value)])}
                className="w-full accent-[#4F5BD5]"
              />
            </div>
          </div>
        )}

        {/* Category Chips */}
        <div className="flex gap-2 px-4 pb-4 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory(null)}
            className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
            style={{
              borderColor: !activeCategory ? '#4F5BD5' : '#E5E7EB',
              background: !activeCategory ? '#4F5BD5' : 'white',
              color: !activeCategory ? 'white' : '#6B7280',
            }}
          >
            All
          </button>
          {CATEGORIES.map(cat => {
            const active = activeCategory === cat;
            const color = categoryColors[cat] || '#4F5BD5';
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(active ? null : cat)}
                className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all"
                style={{
                  borderColor: active ? color : '#E5E7EB',
                  background: active ? color : 'white',
                  color: active ? 'white' : '#6B7280',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Task List */}
        <div className="px-4 pb-4 flex flex-col gap-3">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: 'Sora, sans-serif' }}>No tasks found</h3>
              <p className="text-sm text-gray-500">Try adjusting your filters or search query.</p>
              <button
                onClick={() => { setQuery(''); setActiveCategory(null); }}
                className="mt-4 px-4 py-2 rounded-xl text-sm font-semibold text-white"
                style={{ background: '#4F5BD5' }}
              >
                Clear Filters
              </button>
            </div>
          ) : (
            sortedTasks.map(task => <TaskCard key={task.id} task={task} variant="student" />)
          )}
        </div>
      </div>

      <style>{`.no-scrollbar::-webkit-scrollbar { display: none; } .no-scrollbar { scrollbar-width: none; }`}</style>
    </div>
  );
}
