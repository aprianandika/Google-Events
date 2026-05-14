import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Sparkles, Send } from 'lucide-react';

export const AICompanion = () => {
  return (
    <div className="min-h-screen px-6 pt-24 pb-32 flex flex-col items-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-24 h-24 relative mb-8"
      >
        <div className="absolute inset-0 bg-cyber-lime/20 rounded-full blur-2xl animate-pulse" />
        <div className="absolute inset-0 flex items-center justify-center">
           <div className="w-16 h-16 glass rounded-full flex items-center justify-center border-cyber-lime/30 shadow-[0_0_30px_rgba(204,255,0,0.2)]">
              <Sparkles className="text-cyber-lime animate-bounce" size={32} />
           </div>
        </div>
      </motion.div>

      <div className="text-center mb-12">
        <h2 className="text-3xl font-display font-black text-white mb-2">PULSE AI</h2>
        <p className="text-white/50 text-sm max-w-xs mx-auto">Pendamping kota cerdas Anda. Menghubungkan Anda dengan kehidupan Jakarta.</p>
      </div>

      <div className="w-full space-y-4 mb-8">
        {[
          "Ada apa di SCBD malam ini?",
          "Cari lowongan teknologi dalam radius 5km.",
          "Siapa perajin lokal di sekitar sini?",
          "Tunjukkan komunitas lokal yang sedang tren."
        ].map((prompt, i) => (
          <motion.button
            key={prompt}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="w-full p-4 glass-dark rounded-2xl text-left text-sm text-white/80 hover:bg-white/10 transition-colors border border-white/5 flex justify-between items-center group"
          >
            {prompt}
            <Send size={14} className="text-white/20 group-hover:text-cyber-lime transition-colors" />
          </motion.button>
        ))}
      </div>

      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 w-[90%] max-w-md">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Tanya Pulse apa saja..." 
            className="w-full bg-white/5 border border-white/10 backdrop-blur-3xl rounded-full py-4 px-6 outline-none focus:border-cyber-lime/50 transition-all text-white placeholder:text-white/30"
          />
          <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-cyber-lime rounded-full flex items-center justify-center text-obsidian shadow-[0_0_15px_rgba(204,255,0,0.4)]">
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
