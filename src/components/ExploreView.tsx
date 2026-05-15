import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Filter, Map as MapIcon, Compass, Zap, Users, Calendar, Briefcase, Coffee, TrendingUp } from 'lucide-react';
import { OpportunityCard } from './OpportunityCard';

const CATEGORIES = [
  { id: 'all', label: 'Semua', icon: Compass },
  { id: 'job', label: 'Karir', icon: Briefcase },
  { id: 'event', label: 'Acara', icon: Calendar },
  { id: 'community', label: 'Komunitas', icon: Users },
  { id: 'business', label: 'Bisnis', icon: Coffee },
];

const EXPLORE_ITEMS = [
  {
    id: 'e1',
    type: 'event' as const,
    title: 'Jakarta Future Tech Expo',
    subtitle: 'Pameran inovasi terbesar di JIExpo Kemayoran.',
    tags: ['Teknologi', 'Pameran', 'Besar'],
    energy: 95
  },
  {
    id: 'e2',
    type: 'community' as const,
    title: 'Gowes Malam Sudirman',
    subtitle: 'Komunitas pesepeda malam yang melintasi jantung kota.',
    tags: ['Olahraga', 'Malam', 'Gratis'],
    energy: 72
  },
  {
    id: 'e3',
    type: 'job' as const,
    title: 'Product Designer (Contract)',
    subtitle: 'Startup AI di Kuningan mencari desainer paruh waktu.',
    tags: ['Kontrak', 'Kuningan', 'UI/UX'],
    energy: 68
  },
  {
    id: 'e4',
    type: 'business' as const,
    title: 'Digital Hub Tangerang',
    subtitle: 'Ruang kerja kolaboratif terbaru untuk para kreator.',
    tags: ['Co-working', 'Baru', 'Tangerang'],
    energy: 54
  }
];

export const ExploreView = ({ cityName = 'Jakarta', onOpenMap }: { cityName?: string; onOpenMap?: () => void }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [votedItems, setVotedItems] = useState<string[]>(['v1']);

  const toggleVote = (id: string) => {
    setVotedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const CITY_DATA: Record<string, { zones: any[], explore: any[], suggestions: any[] }> = {
    'Jakarta': {
      zones: [
        { name: 'SCBD', vibe: 'Energetic', pulse: 98, color: 'cyber-lime' },
        { name: 'Senopati', vibe: 'Trendy', pulse: 85, color: 'blue-500' },
        { name: 'Menteng', vibe: 'Elite', pulse: 62, color: 'white' },
      ],
      explore: [
        { id: 'e1', type: 'event', title: 'Jakarta Future Tech Expo', subtitle: 'Pameran inovasi terbesar di JIExpo Kemayoran.', tags: ['Teknologi', 'Pameran', 'Besar'], energy: 95 },
        { id: 'e2', type: 'community', title: 'Gowes Malam Sudirman', subtitle: 'Komunitas pesepeda malam yang melintasi jantung kota.', tags: ['Olahraga', 'Malam', 'Gratis'], energy: 72 },
        { id: 'e3', type: 'job', title: 'Product Designer (Contract)', subtitle: 'Startup AI di Kuningan mencari desainer paruh waktu.', tags: ['Kontrak', 'Kuningan', 'UI/UX'], energy: 68 },
      ],
      suggestions: [
        { id: 'v1', title: 'Car Free Tech Night', description: 'Uji coba teknologi mikro-mobilitas di sepanjang Sudirman.', votes: 421 },
        { id: 'v2', title: 'Open Air AI Talk', description: 'Diskusi senja tentang etika AI di Taman Ismail Marzuki.', votes: 289 },
        { id: 'v3', title: 'Mural Digital Mapping', description: 'Kompetisi seni proyeksi pada gedung budaya di Menteng.', votes: 154 },
      ]
    },
    'Karawang': {
      zones: [
        { name: 'KIIC', vibe: 'Industrial', pulse: 95, color: 'cyber-lime' },
        { name: 'Galuh Mas', vibe: 'Lifestyle', pulse: 78, color: 'blue-500' },
        { name: 'Suryacipta', vibe: 'Tech-Factory', pulse: 88, color: 'white' },
      ],
      explore: [
        { id: 'k1', type: 'job', title: 'Industrial IoT Specialist', subtitle: 'Membangun smart factory di kawasan industri Karawang.', tags: ['Industry 4.0', 'IoT', 'KIIC'], energy: 96 },
        { id: 'k2', type: 'event', title: 'Manufacturing Summit 2024', subtitle: 'Diskusi panel masa depan industri hijau di Karawang.', tags: ['Green Industry', 'Networking'], energy: 82 },
        { id: 'k3', type: 'community', title: 'Karawang Tech Runners', subtitle: 'Komunitas lari di tengah kawasan industri.', tags: ['Fitness', 'Community'], energy: 65 },
      ],
      suggestions: [
        { id: 'kv1', title: 'Solar Powered Workers Hub', description: 'Pembangunan ruang publik dengan energi surya untuk pekerja industri.', votes: 312 },
        { id: 'kv2', title: 'Industrial Tourism Trail', description: 'Rute wisata sejarah perkembangan industri di Indonesia.', votes: 198 },
      ]
    },
    'Magelang': {
      zones: [
        { name: 'Borobudur', vibe: 'Heritage', pulse: 99, color: 'cyber-lime' },
        { name: 'Muntilan', vibe: 'Culinary', pulse: 72, color: 'blue-500' },
        { name: 'Menoreh', vibe: 'Nature', pulse: 84, color: 'white' },
      ],
      explore: [
        { id: 'm1', type: 'event', title: 'Vesak Digital Glow', subtitle: 'Instalasi seni cahaya digital di pelataran Borobudur.', tags: ['Culture', 'Digital Art'], energy: 94 },
        { id: 'm2', type: 'community', title: 'Magelang Creative Circle', subtitle: 'Wadah pengrajin lokal untuk go-digital.', tags: ['Handicraft', 'Digital Marketing'], energy: 88 },
        { id: 'm3', type: 'job', title: 'Heritage Conservation Lead', subtitle: 'Posisi strategis untuk pelestarian cagar budaya Magelang.', tags: ['History', 'Gov', 'Magelang'], energy: 76 },
      ],
      suggestions: [
        { id: 'mv1', title: 'Ancient Virtual Tour', description: 'Pengembangan aplikasi VR untuk melihat sejarah Borobudur masa lampau.', votes: 456 },
        { id: 'mv2', title: 'Organic Farm Collective', description: 'Inisiatif perkebunan organik modern di kaki bukit Menoreh.', votes: 243 },
      ]
    },
    'Bandung': {
      zones: [
        { name: 'Dago', vibe: 'Creative', pulse: 92, color: 'cyber-lime' },
        { name: 'Braga', vibe: 'Classic', pulse: 88, color: 'blue-500' },
        { name: 'Ciumbuleuit', vibe: 'Chill', pulse: 75, color: 'white' },
      ],
      explore: [
        { id: 'b1', type: 'job', title: 'Creative Strategist', subtitle: 'Startup fashion terbesar di Bandung mencari nakhoda kreatif.', tags: ['Fashion', 'Bandung', 'Remote-Hybrid'], energy: 91 },
        { id: 'b2', type: 'community', title: 'Indie Dev Bandung', subtitle: 'Kumpul rutin pengembang game indie di Paris Van Java.', tags: ['Game Dev', 'Indie'], energy: 84 },
      ],
      suggestions: [
        { id: 'bv1', title: 'Creative Street Art Festival', description: 'Festival seni jalanan tahunan berskala internasional di Braga.', votes: 567 },
      ]
    }
  };

  const currentData = CITY_DATA[cityName] || CITY_DATA['Jakarta'];

  return (
    <div className="px-6 pt-24 pb-32">
      {/* Search Header */}
      <div className="mb-8">
        <div className="mb-4">
          <span className="text-[10px] font-mono text-cyber-lime uppercase tracking-[0.2em]">Menjelajahi Kota</span>
          <h2 className="text-3xl font-display font-black text-white">{cityName}</h2>
        </div>
        <div className="relative mb-6">
          <input 
            type="text" 
            placeholder="Cari peluang di sekitarmu..." 
            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm text-white focus:border-cyber-lime/30 transition-all outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" size={18} />
          <button className="absolute right-4 top-1/2 -translate-y-1/2 text-cyber-lime">
            <Filter size={18} />
          </button>
        </div>

        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-300 font-mono text-[10px] uppercase tracking-wider border ${isActive ? 'bg-cyber-lime text-obsidian border-cyber-lime shadow-[0_0_15px_rgba(255, 49, 49, 0.2)]' : 'bg-white/5 text-white/40 border-white/5 hover:border-white/20'}`}
              >
                <Icon size={14} />
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Featured Zones/Heatmap Preview */}
      <div className="mb-10">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-display font-bold">Zona Panas Kota</h3>
          <span className="text-[10px] font-mono text-white/20 uppercase">Real-time Data</span>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {currentData.zones.map((zone, i) => (
            <motion.div 
              key={zone.name}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="min-w-[160px] p-5 glass rounded-3xl relative overflow-hidden group cursor-pointer"
            >
              <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full" />
              <div className="relative z-10">
                <span className="block text-[8px] font-mono text-white/30 uppercase mb-1 tracking-widest">{zone.vibe}</span>
                <h4 className="text-xl font-display font-black text-white group-hover:text-cyber-lime transition-colors">{zone.name}</h4>
                <div className="mt-4 flex items-center gap-2">
                  <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-cyber-lime" style={{ width: `${zone.pulse}%` }} />
                  </div>
                  <span className="text-[10px] font-mono text-cyber-lime">{zone.pulse}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* AI Activity Voting Section */}
      <div className="mb-12">
        <header className="flex justify-between items-center mb-6 px-2">
          <div>
            <div className="flex items-center gap-2 text-cyber-lime mb-1">
              <Zap size={14} className="animate-pulse" />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest">AI Suggested Activities</span>
            </div>
            <h3 className="text-xl font-display font-black">Voting Rencana Kota</h3>
          </div>
          <button className="text-[10px] font-mono text-white/30 uppercase border border-white/10 px-3 py-1 rounded-full">
            History
          </button>
        </header>

        <div className="space-y-4">
          {currentData.suggestions.map((v, i) => {
            const isVoted = votedItems.includes(v.id);
            return (
              <motion.div 
                key={v.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 glass rounded-3xl border border-white/5 relative overflow-hidden transition-all duration-300 ${isVoted ? 'border-cyber-lime/40' : ''}`}
              >
                {isVoted && <div className="absolute top-0 right-0 w-24 h-24 bg-cyber-lime/5 blur-3xl pointer-events-none" />}
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-6">
                    <h4 className={`text-lg font-display font-bold mb-1 transition-colors ${isVoted ? 'text-cyber-lime' : 'text-white'}`}>{v.title}</h4>
                    <p className="text-sm text-white/40 mb-4 line-clamp-2">{v.description}</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <button 
                      onClick={() => toggleVote(v.id)}
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isVoted ? 'bg-cyber-lime text-obsidian shadow-[0_0_20px_rgba(255, 49, 49, 0.3)]' : 'bg-white/5 text-white/40 hover:bg-white/10'}`}
                    >
                      <TrendingUp size={20} />
                    </button>
                    <span className="text-xs font-mono font-bold text-white/60">{v.votes + (isVoted && v.id !== 'v1' ? 1 : 0)}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-display font-bold">Temuan Jelajah</h3>
          <button 
            onClick={onOpenMap}
            className="flex items-center gap-2 glass px-3 py-1.5 rounded-full text-[9px] font-mono text-white/60 hover:text-white transition-colors"
          >
            <MapIcon size={12} /> Buka Peta
          </button>
        </div>
        <div className="space-y-4">
          {currentData.explore
            .filter(item => activeCategory === 'all' || item.type === activeCategory)
            .map(item => (
              <div key={item.id}>
                <OpportunityCard 
                  type={item.type}
                  title={item.title}
                  subtitle={item.subtitle}
                  tags={item.tags}
                  energyLevel={item.energy}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
