import React from 'react';
import { motion } from 'motion/react';
import { MessageSquare, Heart, Share2, Plus, TrendingUp, Users } from 'lucide-react';

const DISCUSSIONS = [
  {
    id: 'd1',
    author: 'Rama Creative',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rama',
    content: 'Apakah ada yang tahu tempat terbaik untuk networking desainer di Jakarta Selatan? Baru saja pindah ke sini!',
    time: '2 jam yang lalu',
    likes: 124,
    comments: 42,
    tags: ['Networking', 'JakartaSelatan']
  },
  {
    id: 'd2',
    author: 'Siti AI',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti',
    content: 'Kolektif AI Jakarta sedang membuka pendaftaran untuk batch kolaborasi baru. Ayo bangun masa depan bersama!',
    time: '5 jam yang lalu',
    likes: 89,
    comments: 15,
    tags: ['Teknologi', 'Kolaborasi']
  }
];

const DiscussionCard = ({ discussion }: { discussion: typeof DISCUSSIONS[0] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="p-6 glass rounded-[32px] mb-4 border-white/5 hover:border-white/10 transition-all"
  >
    <div className="flex items-center gap-3 mb-4">
      <img src={discussion.avatar} alt={discussion.author} className="w-10 h-10 rounded-full border border-cyber-lime/20 bg-white/5" />
      <div>
        <h4 className="text-sm font-bold text-white tracking-tight">{discussion.author}</h4>
        <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">{discussion.time}</p>
      </div>
    </div>
    <p className="text-white/80 text-sm leading-relaxed mb-4">
      {discussion.content}
    </p>
    <div className="flex flex-wrap gap-2 mb-6">
      {discussion.tags.map(tag => (
        <span key={tag} className="text-[9px] font-mono text-cyber-lime/60 px-2 py-0.5 rounded-full bg-cyber-lime/5 border border-cyber-lime/10">#{tag}</span>
      ))}
    </div>
    <div className="flex items-center justify-between">
      <div className="flex gap-6">
        <button className="flex items-center gap-2 group">
          <div className="p-2 rounded-full group-hover:bg-pink-500/10 transition-colors">
            <Heart size={18} className="text-white/30 group-hover:text-pink-500 transition-colors" />
          </div>
          <span className="text-xs font-mono text-white/30 group-hover:text-white transition-colors">{discussion.likes}</span>
        </button>
        <button className="flex items-center gap-2 group">
          <div className="p-2 rounded-full group-hover:bg-cyber-lime/10 transition-colors">
            <MessageSquare size={18} className="text-white/30 group-hover:text-cyber-lime transition-colors" />
          </div>
          <span className="text-xs font-mono text-white/30 group-hover:text-white transition-colors">{discussion.comments}</span>
        </button>
      </div>
      <button className="p-2 rounded-full hover:bg-white/5 transition-colors">
        <Share2 size={18} className="text-white/30" />
      </button>
    </div>
  </motion.div>
);

export const SocialView = ({ cityName = 'Jakarta' }: { cityName?: string }) => {
  const DISCUSSIONS_MOCK: Record<string, any[]> = {
    'Jakarta': [
      { id: 'd1', author: 'Rama Creative', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Rama', content: 'Apakah ada yang tahu tempat terbaik untuk networking desainer di Jakarta Selatan? Baru saja pindah ke sini!', time: '2 jam yang lalu', likes: 124, comments: 42, tags: ['Networking', 'JakartaSelatan'] },
      { id: 'd2', author: 'Siti AI', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Siti', content: 'Kolektif AI Jakarta sedang membuka pendaftaran untuk batch kolaborasi baru. Ayo bangun masa depan bersama!', time: '5 jam yang lalu', likes: 89, comments: 15, tags: ['Teknologi', 'Kolaborasi'] }
    ],
    'Karawang': [
      { id: 'dk1', author: 'Budi Industri', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Budi', content: 'Ada info loker Industrial IoT di KIIC? Pengalaman 3 tahun di manufaktur.', time: '1 jam yang lalu', likes: 45, comments: 12, tags: ['Karawang', 'Karir', 'KIIC'] },
      { id: 'dk2', author: 'Ani Green', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ani', content: 'Workshop efisiensi energi di Surya Cipta besok pagi. Siapa yang mau ikut bareng?', time: '4 jam yang lalu', likes: 67, comments: 8, tags: ['GreenEnergy', 'Workshop'] }
    ],
    'Magelang': [
      { id: 'dm1', author: 'Eco Traveler', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Eco', content: 'Sunset terbaik di Borobudur hari ini! Komunitas fotografi lagi kumpul di dekat gerbang masuk.', time: '30 menit yang lalu', likes: 156, comments: 24, tags: ['Magelang', 'Photography'] }
    ],
    'Bandung': [
      { id: 'db1', author: 'Dedi Fashion', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Dedi', content: 'Braga malam ini vibes-nya asik banget buat hunting konten street photography. Ada yang mau join?', time: '45 menit yang lalu', likes: 210, comments: 56, tags: ['Bandung', 'StreetPhotography'] }
    ],
    'Surabaya': [
      { id: 'dsb1', author: 'Arek Tech', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Arek', content: 'Info meetup startup di Surabaya dong? Pengen networking sama founder-founder lokal.', time: '1 jam yang lalu', likes: 132, comments: 31, tags: ['Networking', 'StartupSurabaya'] }
    ],
    'Denpasar': [
      { id: 'ddp1', author: 'Wayan Digital', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Wayan', content: 'Co-working space di Sanur yang internetnya kenceng dan view-nya oke ada rekomendasi?', time: '3 jam yang lalu', likes: 88, comments: 19, tags: ['DigitalNomad', 'Bali'] }
    ],
    'Medan': [
      { id: 'dmd1', author: 'Horas Dev', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Horas', content: 'Workshop UI/UX besok di Medan Baru. Slot sisa sedikit lagi gaesss!', time: '6 jam yang lalu', likes: 145, comments: 28, tags: ['UIUX', 'MedanEvents'] }
    ]
  };

  const getFallbackDiscussions = (city: string) => [
    { id: `fd1-${city}`, author: 'Lokal Genius', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${city}`, content: `Halo warga ${city}! Ada yang tahu event teknologi atau komunitas kreatif paling aktif di sini?`, time: 'Baru saja', likes: 12, comments: 4, tags: [city, 'Social'] },
    { id: `fd2-${city}`, author: 'Anak Daerah', avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${city}-2`, content: `Mencari partner kolaborasi untuk membangun startup berbasis kearifan lokal ${city}. PM ya!`, time: '1 jam yang lalu', likes: 24, comments: 7, tags: ['Collaboration', city] }
  ];

  const currentDiscussions = DISCUSSIONS_MOCK[cityName] || getFallbackDiscussions(cityName);

  return (
    <div className="px-6 pt-24 pb-32">
      {/* Header Discussion */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <div className="flex items-center gap-2 text-cyber-lime mb-1">
             <Users size={14} />
             <span className="text-[10px] font-mono font-bold uppercase tracking-widest">{cityName} Social</span>
          </div>
          <h3 className="text-3xl font-display font-black">Diskusi Nadi</h3>
        </div>
        <div className="flex gap-2">
           <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-cyber-lime shadow-[0_0_20px_rgba(255, 49, 49, 0.1)]">
              <Plus size={24} />
           </button>
        </div>
      </div>

      {/* Topics / Tags */}
      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar">
        {['Populer', 'Terdekat', 'Pekerjaan', 'Seni', 'Teknologi'].map((tag, i) => (
          <button key={tag} className={`px-5 py-2 rounded-full border text-[10px] font-mono uppercase tracking-widest whitespace-nowrap transition-all ${i === 0 ? 'bg-white text-obsidian border-white font-bold' : 'bg-white/5 border-white/5 text-white/40 hover:border-white/20'}`}>
            {tag}
          </button>
        ))}
      </div>

      {/* Discussion List */}
      <div className="space-y-4">
        {currentDiscussions.map(d => (
          <div key={d.id}>
            <DiscussionCard discussion={d} />
          </div>
        ))}
      </div>

      {/* Community Energy Summary */}
      <div className="mt-8 glass-dark rounded-[32px] p-6 border border-white/5 text-center">
        <div className="flex justify-center -space-x-3 mb-4">
           {[1, 2, 3, 4, 5].map(i => (
             <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} className="w-8 h-8 rounded-full border-2 border-obsidian" alt="User" />
           ))}
           <div className="w-8 h-8 rounded-full bg-cyber-lime text-obsidian flex items-center justify-center text-[10px] font-bold border-2 border-obsidian">
             +12
           </div>
        </div>
        <p className="text-xs text-white/60 font-mono uppercase tracking-widest">320 orang sedang berdiskusi</p>
      </div>
    </div>
  );
};
