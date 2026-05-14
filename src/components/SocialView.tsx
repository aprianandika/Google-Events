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

export const SocialView = () => {
  return (
    <div className="px-6 pt-24 pb-32">
      {/* Header Discussion */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-1">Nadi Sosial</h2>
          <h3 className="text-3xl font-display font-black">Diskusi Kota</h3>
        </div>
        <div className="flex gap-2">
           <button className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-cyber-lime shadow-[0_0_20px_rgba(204,255,0,0.1)]">
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
        {DISCUSSIONS.map(d => (
          <DiscussionCard key={d.id} discussion={d} />
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
