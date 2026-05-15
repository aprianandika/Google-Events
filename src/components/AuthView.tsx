import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Zap, Mail, Lock, User, ArrowRight, Github, Chrome } from 'lucide-react';
import { auth } from '../lib/firebase';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider 
} from 'firebase/auth';

export const AuthView = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        // Profile creation is handled in AuthContext listener
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-obsidian z-[300] flex items-center justify-center p-6 overflow-y-auto">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-cyber-lime/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/5 blur-[150px] rounded-full" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-10">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-cyber-lime/10 rounded-[32px] flex items-center justify-center mx-auto mb-6 border border-cyber-lime/20"
          >
            <Zap className="text-cyber-lime" size={40} fill="currentColor" />
          </motion.div>
          <h1 className="text-4xl font-display font-black tracking-tighter mb-2">LOKALPRIDE</h1>
          <p className="text-white/40 font-mono text-[10px] uppercase tracking-[0.3em]">Gerbang Masa Depan Kota</p>
        </div>

        <div className="glass-dark rounded-[48px] p-8 border-white/5 relative overflow-hidden">
          <div className="flex gap-4 mb-8 p-1 bg-white/5 rounded-2xl">
            <button 
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all ${isLogin ? 'bg-cyber-lime text-obsidian font-bold shadow-lg shadow-cyber-lime/20' : 'text-white/40 hover:text-white'}`}
            >
              Masuk
            </button>
            <button 
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-3 rounded-xl text-[10px] font-mono uppercase tracking-widest transition-all ${!isLogin ? 'bg-cyber-lime text-obsidian font-bold shadow-lg shadow-cyber-lime/20' : 'text-white/40 hover:text-white'}`}
            >
              Daftar
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="relative"
                >
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                  <input 
                    type="text" 
                    placeholder="Nama Lengkap" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-cyber-lime/50 transition-all outline-none"
                    required={!isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="email" 
                placeholder="Email Pribadi" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-cyber-lime/50 transition-all outline-none"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="password" 
                placeholder="Kata Sandi" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:border-cyber-lime/50 transition-all outline-none"
                required
              />
            </div>

            {error && (
              <p className="text-[10px] text-cyber-lime/80 font-mono text-center">{error}</p>
            )}

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-5 bg-cyber-lime text-obsidian rounded-3xl font-display font-black uppercase text-xs tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-cyber-lime/10 disabled:opacity-50 flex items-center justify-center gap-2 group"
            >
              {loading ? 'Memproses...' : (isLogin ? 'Masuk Sekarang' : 'Mulai Petualangan')}
              {!loading && <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />}
            </button>
          </form>

          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-white/5" />
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Atau</span>
            <div className="flex-1 h-px bg-white/5" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={handleGoogleSignIn}
              className="py-4 glass rounded-2xl flex items-center justify-center gap-2 text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <Chrome size={18} />
              <span className="text-[10px] font-mono uppercase tracking-widest">Google</span>
            </button>
            <button className="py-4 glass rounded-2xl flex items-center justify-center gap-2 text-white/60 hover:text-white hover:border-white/20 transition-all">
              <Github size={18} />
              <span className="text-[10px] font-mono uppercase tracking-widest">GitHub</span>
            </button>
          </div>
        </div>

        <p className="text-center mt-8 text-[10px] text-white/20 font-mono uppercase tracking-widest">
          Dengan melanjutkan, Anda menyetujui <br />
          <span className="text-white/40 cursor-pointer hover:text-cyber-lime transition-colors">Syarat Protokol & Privasi Lokal</span>
        </p>
      </motion.div>
    </div>
  );
};
