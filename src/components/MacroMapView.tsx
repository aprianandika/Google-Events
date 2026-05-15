import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Zap, Users, Info, ChevronLeft, Search, Filter, Layers } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, useAdvancedMarkerRef, InfoWindow } from '@vis.gl/react-google-maps';

interface RichZone {
  id: string;
  name: string;
  richness: 'Teknologi' | 'Budaya' | 'Kreativitas' | 'Pariwisata' | 'Energi' | 'Industri';
  description: string;
  energy: number;
  position: { lat: number; lng: number };
}

const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

const RICH_ZONES: RichZone[] = [
  { id: '1', name: 'Jakarta', richness: 'Teknologi', description: 'Pusat inovasi digital dan pusat data nasional.', energy: 98, position: { lat: -6.2088, lng: 106.8456 } },
  { id: '2', name: 'Bandung', richness: 'Kreativitas', description: 'Kaya akan talenta desain dan startup kreatif.', energy: 92, position: { lat: -6.9175, lng: 107.6191 } },
  { id: '3', name: 'Yogyakarta', richness: 'Budaya', description: 'Pusat seni tradisional dan pendidikan kreatif.', energy: 85, position: { lat: -7.7956, lng: 110.3695 } },
  { id: '4', name: 'Surabaya', richness: 'Industri', description: 'Hub perdagangan internasional dan industri modern.', energy: 88, position: { lat: -7.2575, lng: 112.7521 } },
  { id: '5', name: 'Bali', richness: 'Pariwisata', description: 'Destinasi global dengan ekonomi berbasis pariwisata.', energy: 95, position: { lat: -8.4095, lng: 115.1889 } },
  { id: '6', name: 'Balikpapan', richness: 'Energi', description: 'Pusat pengelolaan energi dan sumber daya alam.', energy: 82, position: { lat: -1.2654, lng: 116.8312 } },
  { id: '7', name: 'Medan', richness: 'Industri', description: 'Gerbang ekonomi wilayah barat Indonesia.', energy: 78, position: { lat: 3.5952, lng: 98.6722 } },
  { id: '8', name: 'Makassar', richness: 'Industri', description: 'Hub logistik dan ekonomi timur Indonesia.', energy: 76, position: { lat: -5.1476, lng: 119.4327 } },
  { id: '9', name: 'Karawang', richness: 'Industri', description: 'Kawasan industri terbesar di Asia Tenggara dengan fokus manufaktur modern.', energy: 94, position: { lat: -6.3073, lng: 107.2995 } },
  { id: '10', name: 'Magelang', richness: 'Budaya', description: 'Kota paku tanah Jawa dengan kekayaan warisan sejarah dunia.', energy: 81, position: { lat: -7.4706, lng: 110.2177 } },
];

const MAP_ID = "dark_mode_map"; // In production you'd use a real Map ID from console

export const MacroMapView = ({ onBack, onSelectCity }: { onBack: () => void, onSelectCity: (cityName: string) => void }) => {
  const [selectedZone, setSelectedZone] = useState<RichZone | null>(null);

  if (!hasValidKey) {
    return (
      <div className="fixed inset-0 bg-obsidian z-[210] flex items-center justify-center p-8 text-center">
        <div className="glass p-8 rounded-[40px] max-w-lg border-cyber-lime/20">
          <h2 className="text-2xl font-display font-black text-cyber-lime mb-4">Google Maps API Key Required</h2>
          <p className="text-white/60 mb-6">Untuk melihat visualisasi peta kekayaan nusantara secara real-time, Anda perlu menambahkan API Key.</p>
          
          <div className="space-y-4 text-left mb-8">
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-cyber-lime text-obsidian flex items-center justify-center font-bold flex-shrink-0">1</div>
              <p className="text-sm text-white/80">Dapatkan API Key dari <a href="https://console.cloud.google.com/google/maps-apis/start" target="_blank" className="text-cyber-lime underline">Google Cloud Console</a></p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-cyber-lime text-obsidian flex items-center justify-center font-bold flex-shrink-0">2</div>
              <p className="text-sm text-white/80">Buka <strong>Settings</strong> (ikon ⚙️) → <strong>Secrets</strong></p>
            </div>
            <div className="flex gap-4 items-start">
              <div className="w-8 h-8 rounded-full bg-cyber-lime text-obsidian flex items-center justify-center font-bold flex-shrink-0">3</div>
              <p className="text-sm text-white/80">Tambahkan secret <code>GOOGLE_MAPS_PLATFORM_KEY</code> dan paste key Anda.</p>
            </div>
          </div>
          
          <button onClick={onBack} className="w-full py-4 glass text-white rounded-2xl font-bold uppercase text-[10px] tracking-widest">
            Kembali ke Jelajah
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-obsidian z-[210] flex flex-col pt-12 overflow-hidden">
      {/* Map Header */}
      <div className="px-6 flex justify-between items-center mb-6 relative z-[220]">
        <button onClick={onBack} className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/60">
          <ChevronLeft size={24} />
        </button>
        <div className="text-center">
          <h2 className="text-sm font-mono text-white/40 uppercase tracking-widest">Global View</h2>
          <h3 className="text-xl font-display font-black text-cyber-lime">Kekayaan Nusantara</h3>
        </div>
        <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/60">
          <Filter size={20} />
        </div>
      </div>

      {/* Map Container */}
      <div className="flex-1 relative bg-white/5 rounded-t-[60px] border-t border-white/10 overflow-hidden shadow-[0_-20px_100px_rgba(255,49,49,0.1)]">
        <APIProvider apiKey={API_KEY} version="weekly">
          <Map
            defaultCenter={{ lat: -2.5, lng: 118 }} // Centered on Indonesia
            defaultZoom={4.5}
            mapId={MAP_ID}
            internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
            disableDefaultUI={true}
            style={{ width: '100%', height: '100%' }}
            // Styles for a "cyber" look
            styles={[
              { elementType: "geometry", stylers: [{ color: "#050505" }] },
              { elementType: "labels.text.stroke", stylers: [{ color: "#000000" }, { weight: 2 }] },
              { elementType: "labels.text.fill", stylers: [{ color: "#ffffff" }, { opacity: 0.05 }] },
              { featureType: "administrative", elementType: "geometry", stylers: [{ color: "#1a1a1a" }] },
              { featureType: "water", elementType: "geometry", stylers: [{ color: "#000000" }] },
              { featureType: "water", elementType: "labels.text.fill", stylers: [{ color: "#222222" }] },
              { featureType: "road", stylers: [{ visibility: "off" }] },
              { featureType: "poi", stylers: [{ visibility: "off" }] }
            ]}
          >
            {RICH_ZONES.map((zone) => (
              <AdvancedMarker
                key={zone.id}
                position={zone.position}
                onClick={() => setSelectedZone(zone)}
              >
                <div className="relative group cursor-pointer flex flex-col items-center">
                  {/* Custom "Wealth" Icon Marker */}
                  <div className={`p-2 rounded-xl glass border transition-all duration-300 transform group-hover:-translate-y-1 group-hover:scale-110 ${selectedZone?.id === zone.id ? 'border-cyber-lime bg-cyber-lime/20 -translate-y-1 scale-110' : 'border-white/10 bg-black/60 hover:border-white/40'}`}>
                    {zone.richness === 'Teknologi' && <Zap size={20} className="text-cyber-lime" />}
                    {zone.richness === 'Kreativitas' && <MapPin size={20} className="text-cyber-lime" />}
                    {zone.richness === 'Budaya' && <Users size={20} className="text-cyber-lime" />}
                    {zone.richness === 'Pariwisata' && <MapPin size={20} className="text-cyber-lime" />}
                    {zone.richness === 'Energi' && <Zap size={20} className="text-cyber-lime" />}
                    {zone.richness === 'Industri' && <Layers size={20} className="text-cyber-lime" />}
                  </div>
                  
                  {/* Shadow/Glow under marker */}
                  <div className="w-4 h-1 bg-black/40 rounded-full blur-[2px] mt-1" />
                  
                  {/* Tooltip Label */}
                  <div className={`absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/90 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 transition-all ${selectedZone?.id === zone.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0'}`}>
                    <div className="flex flex-col items-center">
                      <span className="text-[11px] font-bold text-white tracking-wide">{zone.name}</span>
                      <span className="text-[8px] font-mono text-cyber-lime/80 uppercase">{zone.richness}</span>
                    </div>
                  </div>
                </div>
              </AdvancedMarker>
            ))}
          </Map>
        </APIProvider>

        {/* Map UI Vignette/Gradients for Legibility */}
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-obsidian via-obsidian/40 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-obsidian via-obsidian/60 to-transparent z-10 pointer-events-none" />

        {/* Search Bar Overlay */}
        <div className="absolute top-6 left-6 right-6 z-[220]">
          <div className="glass-dark h-14 rounded-2xl flex items-center px-4 shadow-2xl">
            <Search className="text-white/40 mr-3" size={20} />
            <input 
              type="text" 
              placeholder="Cari kekayaan di kota lain..." 
              className="bg-transparent border-none outline-none text-white placeholder:text-white/20 text-sm flex-1"
            />
            <div className="w-px h-6 bg-white/10 mx-3" />
            <div className="w-8 h-8 rounded-full bg-cyber-lime/10 flex items-center justify-center">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=User" className="w-6 h-6 rounded-full" alt="User" />
            </div>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="absolute bottom-12 right-6 z-[220] flex flex-col gap-2">
          <button className="w-10 h-10 glass-dark rounded-lg flex items-center justify-center text-white/60 hover:text-white active:scale-95 transition-transform">
            <Layers size={18} />
          </button>
          <div className="flex flex-col glass-dark rounded-lg overflow-hidden">
            <button className="w-10 h-12 border-b border-white/10 flex items-center justify-center text-white/60 hover:text-cyber-lime transition-colors">+</button>
            <button className="w-10 h-12 flex items-center justify-center text-white/60 hover:text-cyber-lime transition-colors">-</button>
          </div>
        </div>

        {/* Info Overlays */}
        <div className="absolute bottom-12 left-6 right-20 group-hover:right-6 transition-all duration-300 pointer-events-none">
          <div className="mb-4 px-2 pointer-events-auto">
            <h4 className="text-[10px] font-mono text-white/50 uppercase tracking-[0.3em] mb-2 drop-shadow-md">Indeks Modal Nasional</h4>
            <div className="flex gap-2">
              {[
                { label: 'Talenta', value: '89%' },
                { label: 'Sinergi', value: '72%' },
                { label: 'Inovasi', value: 'Positive' }
              ].map(stat => (
                <div key={stat.label} className="flex-1 glass-dark py-2 px-3 rounded-xl flex flex-col items-center">
                  <span className="text-[8px] font-mono text-white/40 uppercase mb-1">{stat.label}</span>
                  <div className="text-sm font-bold text-cyber-lime text-glow">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="pointer-events-auto">
            <AnimatePresence mode="wait">
              {selectedZone ? (
                <motion.div 
                  key={selectedZone.id}
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 50, opacity: 0 }}
                  className="glass-dark rounded-[40px] p-8 border-cyber-lime/30 shadow-[0_0_50px_rgba(255,49,49,0.15)] relative"
                >
                  <button 
                    onClick={() => setSelectedZone(null)}
                    className="absolute top-6 right-8 text-white/40 hover:text-white"
                  >
                    Tutup
                  </button>
                  <div className="flex items-center gap-2 mb-4">
                    <div className="px-3 py-1 bg-cyber-lime text-obsidian rounded-full text-[10px] font-mono font-bold uppercase tracking-widest">
                      Pusat {selectedZone.richness}
                    </div>
                    <div className="text-[10px] font-mono text-white/40 uppercase">Energi: {selectedZone.energy}%</div>
                  </div>
                  <h4 className="text-2xl font-display font-black mb-2 text-white">{selectedZone.name}</h4>
                  <p className="text-white/60 text-sm mb-6">{selectedZone.description}</p>
                  <button 
                    onClick={() => {
                      onSelectCity(selectedZone.name);
                      onBack();
                    }}
                    className="w-full py-4 bg-cyber-lime text-obsidian rounded-2xl font-bold uppercase text-[10px] tracking-widest transition-transform active:scale-95 shadow-[0_0_20px_rgba(255,49,49,0.3)] mb-3"
                  >
                    Zoom In Ke {selectedZone.name}
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="glass-dark rounded-[40px] p-6 flex items-center gap-4"
                >
                  <div className="w-12 h-12 bg-cyber-lime/10 rounded-2xl flex items-center justify-center">
                    <Zap className="text-cyber-lime" size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Analisis Inteligensi Kota</h4>
                    <p className="text-[10px] text-white/40 font-mono uppercase tracking-tighter">Pilih titik untuk melihat kekayaan daerah.</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
