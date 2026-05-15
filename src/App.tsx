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
import { Logo } from './components/Logo';
import { useAuth } from './contexts/AuthContext';
import { AuthView } from './components/AuthView';
import { Activity, Bell, Search, Layers, Map as MapIcon, TrendingUp, Zap, Users, Award, Sparkles, ChevronRight, ChevronLeft, LogOut } from 'lucide-react';
import { auth } from './lib/firebase';
import { ExploreView } from './components/ExploreView';
import { SocialView } from './components/SocialView';
import { ProfileView } from './components/ProfileView';
import { MacroMapView } from './components/MacroMapView';
import { SkillShowcase } from './components/SkillShowcase';

interface LocalPulse {
  id: string;
  type: OpportunityType;
  title: string;
  subtitle: string;
  tags: string[];
  energy: number;
}

const getOpportunitiesForCity = (city: string): LocalPulse[] => {
  const base = [
    {
      id: '1',
      type: 'job' as OpportunityType,
      title: 'Senior Developer',
      subtitle: `Membangun ekosistem teknologi di pusat ${city}.`,
      tags: ['Fullstack', city, 'High-Tier'],
      energy: 95
    },
    {
      id: '2',
      type: 'event' as OpportunityType,
      title: `Festival LokalPride ${city}`,
      subtitle: `Merayakan kreativitas komunitas ${city} di pusat kota.`,
      tags: ['Budaya', 'Networking', 'Besok'],
      energy: 88
    },
    {
      id: '3',
      type: 'community' as OpportunityType,
      title: `Kolektif Kreatif ${city}`,
      subtitle: `Gabung dengan ribuan penggerak ${city} di platform ini.`,
      tags: ['Kolaborasi', 'Social', 'Aktif'],
      energy: 72
    }
  ];

  if (city === 'Karawang') {
    return [
      ...base,
      {
        id: 'k1',
        type: 'job' as OpportunityType,
        title: 'Industrial Automation Specialist',
        subtitle: 'Optimalisasi lini produksi di Kawasan Industri KIIC.',
        tags: ['Manufaktur', 'IoT', 'On-site'],
        energy: 96
      }
    ];
  }

  if (city === 'Magelang') {
    return [
      ...base,
      {
        id: 'm1',
        type: 'event' as OpportunityType,
        title: 'Heritage Walk Borobudur',
        subtitle: 'Eksplorasi narasi sejarah dan modal budaya Magelang.',
        tags: ['Pariwisata', 'Sejarah', 'Weekend'],
        energy: 84
      }
    ];
  }

  if (city === 'Jakarta') {
    return [
      ...base,
      {
        id: '4',
        type: 'business' as OpportunityType,
        title: 'Kopi Kenangan SCBD',
        subtitle: 'Diskon khusus warga LokalPride di area SCBD.',
        tags: ['Lifestyle', 'Promo'],
        energy: 60
      }
    ];
  }

  return base;
};

export default function App() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('home');
  const [showSplash, setShowSplash] = useState(true);
  const [showMacro, setShowMacro] = useState(false);
  const [showSkills, setShowSkills] = useState(false);
  const [selectedCity, setSelectedCity] = useState('Jakarta');

  const opportunities = getOpportunitiesForCity(selectedCity);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (showSplash || authLoading) {
    return (
      <div className="fixed inset-0 bg-obsidian flex flex-col items-center justify-center z-[100]">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          <Logo size="lg" withText={false} />
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-8 border border-dashed border-cyber-lime/20 rounded-full"
          />
        </motion.div>
        
        <div className="mt-12 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Logo size="md" className="justify-center" />
          </motion.div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.6 }}
            className="mt-4 text-[10px] font-mono uppercase tracking-[0.3em] font-medium"
          >
            Nadi Digital Nusantara
          </motion.p>
        </div>

        {/* Loading Bar */}
        <div className="absolute bottom-20 w-48 h-[2px] bg-white/5 overflow-hidden rounded-full">
           <motion.div 
             initial={{ x: '-100%' }}
             animate={{ x: '100%' }}
             transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
             className="w-full h-full bg-cyber-lime shadow-[0_0_10px_#DFFF00]"
           />
        </div>
      </div>
    );
  }

  const isTabProtected = ['companion', 'social', 'profile'].includes(activeTab);

  return (
    <div className="min-h-screen bg-obsidian relative pb-40">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyber-lime/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-40 bg-gradient-to-b from-obsidian via-obsidian/80 to-transparent backdrop-blur-md">
        <Logo size="sm" />
        <div className="flex gap-4">
          {!user ? (
            <button 
              onClick={() => setActiveTab('profile')}
              className="px-4 h-10 glass-dark rounded-full flex items-center justify-center text-cyber-lime text-[10px] font-mono uppercase tracking-widest border border-cyber-lime/20 hover:bg-cyber-lime/10 transition-colors"
            >
              Masuk
            </button>
          ) : (
            <div className="w-10 h-10 glass rounded-full flex items-center justify-center overflow-hidden border border-white/10 cursor-pointer" onClick={() => setActiveTab('profile')}>
              <img src={user.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt="Avatar" className="w-full h-full object-cover" />
            </div>
          )}
          <button 
            onClick={() => setShowMacro(true)}
            className="w-10 h-10 glass rounded-full flex items-center justify-center text-cyber-lime hover:bg-cyber-lime/10 transition-colors"
          >
            <MapIcon size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="relative pt-20">
        <AnimatePresence mode="wait">
          {!user && isTabProtected ? (
            <motion.div
              key="auth-overlay"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="px-6"
            >
              <AuthView />
            </motion.div>
          ) : (
            <>
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
                <button 
                  onClick={() => setShowMacro(true)}
                  className="text-xs font-mono text-cyber-lime uppercase tracking-wider flex items-center gap-1 group"
                >
                  <span className="group-hover:mr-2 transition-all">Zoom Out (Map)</span> <MapIcon size={12} />
                </button>
              </div>

              {/* Skill Showcase Entry */}
              <motion.div 
                onClick={() => setShowSkills(true)}
                whileTap={{ scale: 0.98 }}
                className="mb-8 p-6 glass rounded-[40px] border-white/5 flex items-center gap-4 cursor-pointer hover:border-cyber-lime/20 transition-all bg-gradient-to-r from-cyber-lime/5 to-transparent shadow-[0_0_50px_rgba(255, 49, 49, 0.03)]"
              >
                <div className="w-14 h-14 bg-cyber-lime/10 rounded-2xl flex items-center justify-center text-cyber-lime">
                  <Sparkles size={28} />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-display font-black leading-tight">Unjuk Keahlian Lokal</h4>
                  <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest mt-1">42 Talenta baru bergabung minggu ini</p>
                </div>
                <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-cyber-lime">
                  <ChevronRight size={20} />
                </div>
              </motion.div>

              {/* Feed Grid */}
              <div className="space-y-4">
                {opportunities.map(opt => (
                  <div key={opt.id}>
                    <OpportunityCard 
                      type={opt.type}
                      title={opt.title}
                      subtitle={opt.subtitle}
                      tags={opt.tags}
                      energyLevel={opt.energy}
                    />
                  </div>
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

          {activeTab === 'companion' && user && (
            <motion.div 
              key="companion"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AICompanion cityName={selectedCity} />
            </motion.div>
          )}

          {activeTab === 'explore' && (
            <motion.div 
              key="explore"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ExploreView cityName={selectedCity} onOpenMap={() => setShowMacro(true)} />
            </motion.div>
          )}

          {activeTab === 'social' && user && (
            <motion.div 
              key="social"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <SocialView cityName={selectedCity} />
            </motion.div>
          )}

          {activeTab === 'profile' && user && (
            <motion.div 
              key="profile"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProfileView />
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  </main>

      {/* Navigation */}
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Overlays */}
      <AnimatePresence>
        {showMacro && (
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[200]"
          >
            <MacroMapView 
              onBack={() => setShowMacro(false)} 
              onSelectCity={(city) => {
                setSelectedCity(city);
                setActiveTab('home');
              }}
            />
          </motion.div>
        )}
        {showSkills && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-obsidian z-[200] overflow-y-auto pt-12"
          >
            <div className="px-6 flex justify-start mb-4">
              <button onClick={() => setShowSkills(false)} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/60">
                <ChevronLeft size={24} />
              </button>
            </div>
            <SkillShowcase />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
