/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Navigation } from './components/Navigation';
import { CityPulse } from './components/CityPulse';
import { OpportunityCard, OpportunityType } from './components/OpportunityCard';
import { AICompanion } from './components/AICompanion';
import { Activity, Bell, Search, Layers, Map as MapIcon, TrendingUp, Zap, Users, Award } from 'lucide-react';
import { ExploreView } from './components/ExploreView';
import { SocialView } from './components/SocialView';
import { ProfileView } from './components/ProfileView';

interface LocalPulse {
  id: string;
  type: OpportunityType;
  title: string;
  subtitle: string;
  tags: string[];
  energy: number;
}

const MOCK_OPPORTUNITIES: LocalPulse[] = [
  {
    id: '1',
    type: 'job',
    title: 'Lead Creative Strategist',
    subtitle: 'Studio ultra-modern di SCBD mencari visual disruptor.',
    tags: ['Remote-Hybrid', 'High-Tier', 'Desain'],
    energy: 92
  },
  {
    id: '2',
    type: 'event',
    title: 'Pertemuan NusaPulse Jakarta',
    subtitle: 'Menghubungkan perajin lokal dan pengembang teknologi di Nomad House.',
    tags: ['Networking', 'Gratis', 'Malam Ini'],
    energy: 78
  },
  {
    id: '3',
    type: 'community',
    title: 'Kolektif AI Jakarta',
    subtitle: 'Komunitas akar rumput yang membangun LLM lokal untuk Indonesia.',
    tags: ['Membangun', 'Kolaboratif', 'Aktif'],
    energy: 85
  },
  {
    id: '4',
    type: 'business',
    title: 'Kopi Kenangan (Terbatas)',
    subtitle: 'Diskon eksklusif NusaPulse untuk penggerak energi kota.',
    tags: ['Promosi', 'Gaya Hidup', 'Terdekat'],
    energy: 64
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const [selectedCity, setSelectedCity] = useState('Jakarta');

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="fixed inset-0 bg-obsidian flex flex-col items-center justify-center z-[100]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="w-20 h-20 bg-cyber-lime rounded-full blur-3xl opacity-20 animate-pulse" />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-cyber-lime/30 rounded-full"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Zap className="text-cyber-lime" size={40} fill="currentColor" />
          </div>
        </motion.div>
        <motion.h1 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-2xl font-display font-black tracking-widest text-white uppercase"
        >
          NusaPulse
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 0.5 }}
          className="mt-2 text-xs font-mono uppercase tracking-tighter"
        >
          Menghubungkan Jiwa Kota
        </motion.p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-obsidian relative pb-40">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-lime/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-gradient-to-b from-obsidian via-obsidian/80 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 glass-dark rounded-lg flex items-center justify-center border-cyber-lime/20">
            <Zap size={16} className="text-cyber-lime" fill="currentColor" />
          </div>
          <span className="font-display font-black text-xl tracking-tighter">NusaPulse</span>
        </div>
        <div className="flex gap-4">
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <Search size={18} />
          </button>
          <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/60 hover:text-white transition-colors">
            <Bell size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative pt-20">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="px-6"
            >
              <CityPulse cityName={selectedCity} />
              
              <div className="flex justify-between items-end mb-6">
                <div>
                  <h2 className="text-sm font-mono text-white/40 uppercase tracking-widest mb-1">Umpan Lokal • Hari Ini</h2>
                  <h3 className="text-2xl font-display font-bold">Energi Tren</h3>
                </div>
                <button className="text-xs font-mono text-cyber-lime uppercase tracking-wider flex items-center gap-1">
                  Lihat Peta <MapIcon size={12} />
                </button>
              </div>

              {/* Feed Grid */}
              <div className="space-y-4">
                {MOCK_OPPORTUNITIES.map(opt => (
                  <OpportunityCard 
                    key={opt.id} 
                    type={opt.type}
                    title={opt.title}
                    subtitle={opt.subtitle}
                    tags={opt.tags}
                    energyLevel={opt.energy}
                  />
                ))}
              </div>

              {/* Local Pride Section */}
              <div className="mt-12 mb-8">
                <div className="glass-dark border-white/5 rounded-[40px] p-8 flex flex-col items-center text-center">
                   <div className="w-16 h-16 bg-cyber-lime/10 rounded-full flex items-center justify-center mb-4">
                      <Award size={32} className="text-cyber-lime" />
                   </div>
                   <h3 className="text-xl font-display font-bold mb-2">Pencapaian Kota</h3>
                   <p className="text-white/40 text-sm mb-6 max-w-xs">Jakarta baru saja mencapai 1 juta perjalanan transportasi berkelanjutan. Kontribusi: +150 Poin Pulse.</p>
                   <button className="w-full py-4 bg-white text-obsidian rounded-2xl font-bold uppercase text-[10px] tracking-widest hover:bg-cyber-lime transition-colors">
                      Klaim Lencana Lokal Anda
                   </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'companion' && (
            <motion.div 
              key="companion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AICompanion />
            </motion.div>
          )}

          {activeTab === 'explore' && (
            <motion.div 
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ExploreView />
            </motion.div>
          )}

          {activeTab === 'social' && (
            <motion.div 
              key="social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SocialView />
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProfileView />
            </motion.div>
          )}

          {/* Empty catch-all or default view logic removed since all tabs are implemented */}
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}
