import React from 'react';
import { motion } from 'motion/react';
import { Award, Code, Palette, Camera, Music, Sparkles, MessageSquare, ChevronRight, Share2 } from 'lucide-react';

const SKILLS = [
  { id: '1', name: 'UI/UX Design', category: 'Creative', energy: 95, icon: Palette },
  { id: '2', name: 'Prompt Engineering', category: 'Technology', energy: 88, icon: Code },
  { id: '3', name: 'Urban Photography', category: 'Creative', energy: 72, icon: Camera },
  { id: '4', name: 'Electronic Music', category: 'Art', energy: 84, icon: Music },
];

export const SkillShowcase = () => {
  return (
    <div className="px-6 pt-24 pb-32">
      <header className="mb-12">
        <div className="flex items-center gap-3 text-cyber-lime mb-2">
          <Sparkles size={18} />
          <span className="font-mono text-xs uppercase tracking-[0.2em] font-bold">In-City Talent</span>
        </div>
        <h2 className="text-4xl font-display font-black text-white leading-tight">Unjuk Keahlian Lokal</h2>
        <p className="text-white/40 text-sm mt-3">Tunjukkan bakatmu, biarkan kota mengenalmu.</p>
      </header>

      {/* Showcase Grid */}
      <div className="grid grid-cols-2 gap-4 mb-12">
        {SKILLS.map((skill, i) => (
          <motion.div 
            key={skill.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass rounded-3xl p-6 border-white/5 flex flex-col items-center text-center group cursor-pointer hover:border-cyber-lime/30 transition-all"
          >
            <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-cyber-lime shadow-[0_0_20px_rgba(255, 49, 49, 0)] group-hover:shadow-[0_0_20px_rgba(255, 49, 49, 0.3)] group-hover:text-obsidian transition-all">
              <skill.icon size={28} />
            </div>
            <h4 className="text-sm font-bold text-white mb-1">{skill.name}</h4>
            <p className="text-[10px] text-white/30 font-mono uppercase tracking-widest">{skill.category}</p>

            <div className="mt-6 w-full h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-cyber-lime" style={{ width: `${skill.energy}%` }} />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Featured Professional Card */}
      <div className="glass-dark border-cyber-lime/20 rounded-[40px] p-8 relative overflow-hidden mb-12">
        <div className="absolute top-0 right-0 p-6 text-cyber-lime">
          <Award size={24} />
        </div>
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyber-lime/20 to-blue-500/20 p-[2px]">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Expert" className="w-full h-full rounded-2xl bg-obsidian" alt="Professional" />
          </div>
          <div>
            <h3 className="text-xl font-display font-bold">Keahlian Unggulan</h3>
            <p className="text-white/40 text-xs font-mono uppercase">Talenta Minggu Ini</p>
          </div>
        </div>
        <p className="text-white/60 text-sm mb-6 leading-relaxed">
          "Saya percaya desain yang baik adalah yang tidak terlihat namun dirasakan. Mari bangun Jakarta lebih cerdas."
        </p>
        <div className="flex gap-3">
          <button className="flex-1 py-4 bg-cyber-lime text-obsidian rounded-2xl font-black uppercase text-[10px] tracking-widest transition-transform active:scale-95">
            Kolaborasi Sekarang
          </button>
          <button className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white/60">
            <Share2 size={20} />
          </button>
        </div>
      </div>

      {/* Call to action */}
      <div className="text-center">
         <button className="text-xs font-mono text-white/40 uppercase tracking-widest flex items-center justify-center gap-2 mx-auto hover:text-white transition-colors">
            Lihat semua kategori <ChevronRight size={14} />
         </button>
      </div>
    </div>
  );
};
