import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Zap, Users, Calendar } from 'lucide-react';

export type OpportunityType = 'job' | 'event' | 'community' | 'business';

interface OpportunityCardProps {
  type: OpportunityType;
  title: string;
  subtitle: string;
  tags: string[];
  energyLevel: number; // 0-100
}

const typeIcon = {
  job: <Zap size={14} />,
  event: <Calendar size={14} />,
  community: <Users size={14} />,
  business: <ArrowUpRight size={14} />
};

const typeLabel = {
  job: 'Karir',
  event: 'Acara',
  community: 'Komunitas',
  business: 'Bisnis'
};

export const OpportunityCard = ({ type, title, subtitle, tags, energyLevel }: OpportunityCardProps) => {
  return (
    <motion.div 
      whileHover={{ scale: 0.98 }}
      className="p-5 glass rounded-3xl relative mb-4 group cursor-pointer overflow-hidden border-white/5 hover:border-white/20 transition-all duration-300"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-[10px] font-mono text-white/80 uppercase tracking-wider">
          {typeIcon[type]}
          {typeLabel[type]}
        </div>
        <div className="text-white/20 group-hover:text-cyber-lime transition-colors">
          <ArrowUpRight size={20} />
        </div>
      </div>

      <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-cyber-lime transition-colors">{title}</h3>
      <p className="text-white/50 text-sm mb-4 line-clamp-2">{subtitle}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {tags.map(tag => (
          <span key={tag} className="text-[10px] font-mono border border-white/10 px-2 py-0.5 rounded text-white/40 uppercase">
            {tag}
          </span>
        ))}
      </div>

      <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${energyLevel}%` }}
          className="h-full bg-cyber-lime shadow-[0_0_10px_#CCFF00]"
        />
      </div>
      <div className="mt-2 flex justify-between items-center text-[9px] font-mono text-white/30 uppercase tracking-tighter">
        <span>Energi Nadi</span>
        <span>{energyLevel}%</span>
      </div>
    </motion.div>
  );
};
