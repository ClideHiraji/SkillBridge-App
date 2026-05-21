import { useState } from 'react';
import { ChevronLeft, Camera, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { mockBusiness } from '../../data/mockData';

const CATEGORIES = [
  'Food & Beverage', 'Retail', 'Technology', 'Health & Fitness',
  'Education', 'Marketing & Media', 'Fashion', 'Other',
];

export function EditBusinessProfile() {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: mockBusiness.name,
    category: mockBusiness.category,
    description: mockBusiness.description,
    address: mockBusiness.address,
    website: mockBusiness.website,
    email: mockBusiness.email,
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSaved(true);
      setTimeout(() => { navigate('/business/profile'); }, 800);
    }, 1200);
  };

  return (
    <div className="flex flex-col h-full bg-[#F9FAFB]">
      {/* Header */}
      <div className="flex-shrink-0 bg-white border-b border-gray-100 px-4 flex items-center gap-3" style={{ height: 56 }}>
        <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100">
          <ChevronLeft size={20} className="text-gray-700" />
        </button>
        <h1 className="text-[15px] font-semibold text-gray-900" style={{ fontFamily: 'Sora, sans-serif' }}>Edit Business Profile</h1>
      </div>

      <form onSubmit={handleSave} className="flex-1 overflow-y-auto">
        <div className="px-4 py-4 flex flex-col gap-4">
          {/* Logo upload */}
          <div className="flex flex-col items-center py-4">
            <div className="relative">
              <div
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-3"
                style={{ background: 'linear-gradient(135deg, #FF7B54, #FF9B54)', fontFamily: 'Sora, sans-serif' }}
              >
                {mockBusiness.initials}
              </div>
              <button
                type="button"
                className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-white shadow-md"
                style={{ background: '#FF7B54' }}
              >
                <Camera size={13} />
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Tap to upload business logo</p>
            <p className="text-[10px] text-gray-300">PNG or JPG, max 5MB</p>
          </div>

          {/* Business Name */}
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Business Name *</label>
            <input
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all bg-white"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Business Category</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setForm(f => ({ ...f, category: cat }))}
                  className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-all"
                  style={{
                    borderColor: form.category === cat ? '#FF7B54' : '#E5E7EB',
                    background: form.category === cat ? '#FFF0EB' : 'white',
                    color: form.category === cat ? '#FF7B54' : '#6B7280',
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-gray-600">About Your Business</label>
              <span className="text-[10px] text-gray-400">{form.description.length}/300</span>
            </div>
            <textarea
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value.slice(0, 300) }))}
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all resize-none bg-white"
            />
          </div>

          {/* Address */}
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Address</label>
            <input
              value={form.address}
              onChange={e => setForm(f => ({ ...f, address: e.target.value }))}
              placeholder="e.g. BGC, Taguig City, Metro Manila"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all bg-white"
            />
          </div>

          {/* Website */}
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Website</label>
            <input
              value={form.website}
              onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
              placeholder="www.yourbusiness.ph"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all bg-white"
            />
          </div>

          {/* Contact Email */}
          <div>
            <label className="text-xs font-semibold text-gray-600 block mb-1.5">Contact Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              placeholder="hello@yourbusiness.ph"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#FF7B54] transition-all bg-white"
            />
          </div>

          {/* Save button */}
          <button
            type="submit"
            disabled={saving}
            className="w-full py-3.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 mt-2 transition-all"
            style={{
              background: saved ? '#10B981' : '#FF7B54',
              fontFamily: 'Sora, sans-serif',
              opacity: saving ? 0.8 : 1,
            }}
          >
            {saving ? (
              <><Loader2 size={16} className="animate-spin" /> Saving...</>
            ) : saved ? (
              <>✓ Saved!</>
            ) : (
              'Save Changes'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
