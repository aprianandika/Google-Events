import React from 'react';
import { motion } from 'motion/react';
import { User, Settings, Award, MapPin, Zap, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';

const ACHIEVEMENT_BADGES = [
  { id: 1, label: 'Early Builder', color: 'cyber-lime' },
  { id: 2, label: 'City Soul', color: 'blue-500' },
  { id: 3, label: 'Trendsetter', color: 'purple-500' }
];

export const ProfileView = () => {
  return (
    <div className="px-6 pt-24 pb-32">
      {/* Profile Card */}
      <div className="relative mb-8">
        <div className="absolute top-0 right-0 p-4">
           <button className="w-10 h-10 glass-dark rounded-full flex items-center justify-center text-white/40">
              <Settings size={18} />
           </button>
        </div>
        
        <div className="glass rounded-[40px] p-8 border-white/5 flex flex-col items-center text-center overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-b from-cyber-lime/5 to-transparent pointer-events-none" />
          
          <div className="relative mb-6">
            <div className="w-24 h-24 rounded-full border-2 border-cyber-lime p-1 shadow-[0_0_30px_rgba(204,255,0,0.2)]">
               <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Aprian" className="w-full h-full rounded-full bg-white/10" alt="Profile" />
            </div>
            <div className="absolute -bottom-1 -right-1 bg-cyber-lime text-obsidian p-1.5 rounded-full shadow-lg">
               <ShieldCheck size={14} />
            </div>
          </div>

          <h2 className="text-3xl font-display font-black text-white mb-1">Aprian Surya</h2>
          <div className="flex items-center gap-2 text-white/40 font-mono text-[10px] uppercase tracking-widest mb-6">
            <MapPin size={12} className="text-cyber-lime" /> Jakarta, Indonesia
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-3 gap-8 w-full border-t border-white/5 pt-6">
             <div>
                <span className="block text-xl font-display font-black text-white">1.2rb</span>
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">Poin Pulse</span>
             </div>
             <div>
                <span className="block text-xl font-display font-black text-white">42</span>
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">Kontribusi</span>
             </div>
             <div>
                <span className="block text-xl font-display font-black text-white">8</span>
                <span className="text-[8px] font-mono text-white/30 uppercase tracking-tighter">Badges</span>
             </div>
          </div>
        </div>
      </div>

      {/* Achievement Row */}
      <div className="mb-8 overflow-hidden">
        <h3 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-4 px-2">Lencana Pencapaian</h3>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar px-2">
           {ACHIEVEMENT_BADGES.map(badge => (
             <motion.div 
               key={badge.id} 
               whileHover={{ scale: 1.05 }}
               className="min-w-[120px] glass-dark p-4 rounded-3xl border-white/5 flex flex-col items-center text-center cursor-pointer group"
             >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 bg-white/5 group-hover:bg-cyber-lime/10 transition-colors`}>
                   <Award size={20} className="text-cyber-lime" />
                </div>
                <span className="text-[9px] font-mono text-white/60 uppercase font-bold tracking-tighter">{badge.label}</span>
             </motion.div>
           ))}
        </div>
      </div>

      {/* Menu Options */}
      <div className="space-y-3">
        {[
          { icon: Zap, label: 'Dompet Digi-Aset', value: '1.240 NP' },
          { icon: User, label: 'Identitas Digitalitas', value: 'Terverifikasi' },
          { icon: MapPin, label: 'Aktivitas Lokasi', value: '24 Area' },
        ].map((item, i) => (
          <button 
            key={i}
            className="w-full glass-dark p-5 rounded-3xl border border-white/5 flex items-center justify-between group hover:border-white/10 transition-all"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/5 rounded-2xl text-white/40 group-hover:text-cyber-lime transition-colors">
                <item.icon size={20} />
              </div>
              <div className="text-left">
                <h4 className="text-sm font-bold text-white group-hover:text-cyber-lime transition-colors">{item.label}</h4>
                <p className="text-[10px] font-mono text-white/30 uppercase tracking-widest">{item.value}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-white/20 group-hover:text-cyber-lime transition-transform group-hover:translate-x-1" />
          </button>
        ))}
      </div>

      <button className="w-full mt-12 py-5 bg-white text-obsidian rounded-[32px] font-display font-black uppercase tracking-[0.2em] text-xs hover:bg-cyber-lime transition-colors shadow-2xl">
         Eksport Identitas Ke Jaringan
      </button>
    </div>
  );
};
