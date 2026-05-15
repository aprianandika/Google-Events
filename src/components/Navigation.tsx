import React from 'react';
import { Home, Compass, MessageSquare, User, Zap } from 'lucide-react';
import { motion } from 'motion/react';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  onClick: () => void;
}

const NavItem = ({ icon: Icon, label, active, onClick }: NavItemProps) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center gap-1 transition-all duration-300 ${active ? 'text-cyber-lime scale-110' : 'text-white/40'}`}
  >
    <div className={`p-2 rounded-full transition-all duration-500 ${active ? 'bg-cyber-lime/10 shadow-[0_0_20px_rgba(255, 49, 49, 0.1)]' : ''}`}>
      <Icon size={24} strokeWidth={active ? 2.5 : 2} />
    </div>
    <span className="text-[10px] uppercase font-mono tracking-widest font-medium">{label}</span>
    {active && (
      <motion.div 
        layoutId="nav-glow"
        className="absolute -bottom-2 w-1 h-1 bg-cyber-lime rounded-full shadow-[0_0_10px_#FF3131]"
      />
    )}
  </button>
);

export const Navigation = ({ activeTab, setActiveTab }: { activeTab: string, setActiveTab: (tab: string) => void }) => {
  return (
    <nav className="fixed bottom-0 left-0 w-full md:bottom-6 md:left-1/2 md:-translate-x-1/2 md:w-[90%] md:max-w-md h-20 glass md:rounded-full flex items-center justify-around px-6 z-50 overflow-hidden">
      <NavItem icon={Home} label="Beranda" active={activeTab === 'home'} onClick={() => setActiveTab('home')} />
      <NavItem icon={Compass} label="Jelajah" active={activeTab === 'explore'} onClick={() => setActiveTab('explore')} />
      <div className="relative -top-3">
         <button 
           onClick={() => setActiveTab('companion')}
           className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 shadow-2xl ${activeTab === 'companion' ? 'bg-cyber-lime text-obsidian scale-110 shadow-cyber-lime/30' : 'bg-white text-obsidian shadow-white/10'}`}
         >
           <Zap size={28} fill={activeTab === 'companion' ? 'currentColor' : 'none'} className="animate-pulse" />
         </button>
      </div>
      <NavItem icon={MessageSquare} label="Diskusi" active={activeTab === 'social'} onClick={() => setActiveTab('social')} />
      <NavItem icon={User} label="Profil" active={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
    </nav>
  );
};
