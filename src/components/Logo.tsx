import React from 'react';
import { motion } from 'motion/react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  withText?: boolean;
}

export const Logo = ({ className = '', size = 'md', withText = true }: LogoProps) => {
  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-16 h-16'
  };

  const textSizes = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-4xl'
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className={`relative ${iconSizes[size]} group`}>
        {/* Glow Effect */}
        <div className="absolute inset-0 bg-cyber-lime/40 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main Logo Container */}
        <div className="relative w-full h-full glass-dark rounded-[30%] border border-cyber-lime/30 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 100 100" className="w-2/3 h-2/3 fill-none stroke-cyber-lime" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round">
            {/* Abstract L+O + City pulse shape */}
            <motion.path
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              d="M20 20 V80 H45 M55 30 H85 V70 H55 Z"
              className="drop-shadow-[0_0_8px_rgba(255,49,49,0.5)]"
            />
            {/* Pulse Dot */}
            <motion.circle
              cx="80"
              cy="80"
              r="6"
              fill="currentColor"
              className="text-cyber-lime"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </svg>
        </div>
      </div>

      {withText && (
        <span className={`font-display font-black tracking-tighter ${textSizes[size]} text-white`}>
          Lokal<span className="text-cyber-lime">Pride</span>
        </span>
      )}
    </div>
  );
};
