import React from 'react';
import { motion } from 'motion/react';
import { MapPin } from 'lucide-react';

export const CityPulse = ({ cityName }: { cityName: string }) => {
  return (
    <div className="relative w-full h-[400px] flex flex-col items-center justify-center overflow-hidden">
      {/* Background Pulse Rings */}
      <div className="absolute inset-0 flex items-center justify-center opacity-30">
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.3, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-64 h-64 border border-cyber-lime rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.2, 0] }}
          transition={{ duration: 4, delay: 1.3, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-64 h-64 border border-cyber-lime rounded-full"
        />
        <motion.div 
          animate={{ scale: [1, 2], opacity: [0.1, 0] }}
          transition={{ duration: 4, delay: 2.6, repeat: Infinity, ease: "easeOut" }}
          className="absolute w-64 h-64 border border-cyber-lime rounded-full"
        />
      </div>

      {/* Floating City Info */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="relative text-center z-10"
      >
        <div className="flex items-center justify-center gap-2 text-cyber-lime mb-2">
          <MapPin size={16} />
          <span className="font-mono text-xs tracking-tighter uppercase font-bold">Nadi Langsung • Indonesia</span>
        </div>
        <h1 className="text-6xl md:text-8xl font-display font-black tracking-tight text-white mb-1">
          {cityName}
        </h1>
        <div className="flex items-center justify-center gap-4 text-white/60 font-mono text-xs uppercase tracking-[0.2em]">
          <span>Terhubung: 12.4rb</span>
          <span className="w-1 h-1 bg-white/20 rounded-full" />
          <span>Aktif: 890</span>
        </div>
      </motion.div>

      {/* Ambient particles or something */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-obsidian to-transparent z-20" />
    </div>
  );
};
