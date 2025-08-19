'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function AnimatedMapArc() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-64 gradient-luxury rounded-2xl flex items-center justify-center">
        <div className="text-muted-foreground">Loading map...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 gradient-executive rounded-2xl overflow-hidden glass">
      {/* World map background with more realistic continents */}
      <div className="absolute inset-0 opacity-15">
        <svg viewBox="0 0 400 200" className="w-full h-full">
          {/* North America (including Canada/Toronto area) */}
          <path 
            d="M20 80 Q40 70 60 75 L80 80 Q90 85 85 95 L75 105 Q65 110 50 108 L30 105 Q15 95 20 80 Z" 
            fill="#8B9DC3" 
            opacity="0.4" 
          />
          {/* Europe/Middle East/Asia (including UAE/Dubai area) */}
          <path 
            d="M200 70 Q240 65 280 70 L320 75 Q350 80 360 85 L380 90 Q385 95 380 100 L370 105 Q340 110 310 108 L280 105 Q250 100 220 95 L200 90 Q190 80 200 70 Z" 
            fill="#DEB887" 
            opacity="0.4" 
          />
          {/* Africa */}
          <path 
            d="M220 110 Q240 105 260 110 L280 115 Q290 125 285 135 L275 145 Q265 150 250 148 L230 145 Q215 135 220 110 Z" 
            fill="#CD853F" 
            opacity="0.3" 
          />
          {/* Asia */}
          <path 
            d="M300 80 Q330 75 360 80 L390 85 Q395 90 390 95 L380 100 Q350 105 320 103 L300 100 Q290 90 300 80 Z" 
            fill="#F4A460" 
            opacity="0.3" 
          />
        </svg>
      </div>
      
      <svg
        viewBox="0 0 400 200"
        className="w-full h-full relative z-10"
        style={{ filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))' }}
      >
        {/* Simple connection arc */}
        <motion.path
          d="M50 120 Q200 40 350 100"
          stroke="url(#connectionGradient)"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
        />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C8A96A" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#C8A96A" stopOpacity="1" />
            <stop offset="100%" stopColor="#C8A96A" stopOpacity="0.6" />
          </linearGradient>
          
          {/* Canadian flag gradient - authentic red and white with maple leaf inspiration */}
          <radialGradient id="canadianGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FF0000" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="60%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#FF0000" />
          </radialGradient>
          
          {/* UAE flag gradient - red, green, white, black */}
          <radialGradient id="uaeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#00732F" />
            <stop offset="70%" stopColor="#FF0000" />
            <stop offset="100%" stopColor="#000000" />
          </radialGradient>
          
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        {/* Toronto pin - Canadian Flag */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {/* Canadian flag */}
          <rect
            x="42"
            y="112"
            width="16"
            height="12"
            rx="1"
            fill="#FFFFFF"
            stroke="#FF0000"
            strokeWidth="1"
            filter="url(#glow)"
          />
          <rect x="42" y="112" width="4" height="12" fill="#FF0000" />
          <rect x="54" y="112" width="4" height="12" fill="#FF0000" />
          <text x="50" y="120" textAnchor="middle" fontSize="6" fill="#FF0000">🍁</text>
          
          <motion.circle
            cx="50"
            cy="118"
            r="14"
            fill="none"
            stroke="#FF0000"
            strokeWidth="2"
            strokeOpacity="0.6"
            animate={{
              r: [14, 20, 14],
              strokeOpacity: [0.6, 0.2, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.g>
        
        {/* Dubai pin - UAE Flag */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 2 }}
        >
          {/* UAE flag */}
          <rect
            x="342"
            y="92"
            width="16"
            height="12"
            rx="1"
            fill="#FFFFFF"
            stroke="#000000"
            strokeWidth="1"
            filter="url(#glow)"
          />
          {/* Red stripe on left */}
          <rect x="342" y="92" width="4" height="12" fill="#FF0000" />
          {/* Green stripe on top */}
          <rect x="346" y="92" width="12" height="4" fill="#00732F" />
          {/* White stripe in middle */}
          <rect x="346" y="96" width="12" height="4" fill="#FFFFFF" />
          {/* Black stripe on bottom */}
          <rect x="346" y="100" width="12" height="4" fill="#000000" />
          
          <motion.circle
            cx="350"
            cy="98"
            r="14"
            fill="none"
            stroke="#00732F"
            strokeWidth="2"
            strokeOpacity="0.6"
            animate={{
              r: [14, 20, 14],
              strokeOpacity: [0.6, 0.2, 0.6]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
          />
        </motion.g>
        
        {/* Animated plane moving from Toronto to Dubai */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
        >
          <g transform-origin="center">
            <animateMotion
              dur="6s"
              repeatCount="indefinite"
              path="M50 120 Q200 40 350 100"
            >
              <mpath href="#flightPath" />
            </animateMotion>
            <animateTransform
              attributeName="transform"
              type="rotate"
              values="0;15;0;-10;0"
              dur="6s"
              repeatCount="indefinite"
            />
            {/* Plane icon */}
            <path
              d="M-6,-2 L-2,-2 L4,0 L-2,2 L-6,2 L-4,0 Z M2,-1 L6,-1 L6,1 L2,1 Z"
              fill="#C8A96A"
              stroke="#FFFFFF"
              strokeWidth="0.5"
              filter="url(#glow)"
            />
            {/* Plane trail */}
            <circle
              cx="-8"
              cy="0"
              r="1"
              fill="#C8A96A"
              opacity="0.6"
            />
            <circle
              cx="-10"
              cy="0"
              r="0.5"
              fill="#C8A96A"
              opacity="0.3"
            />
          </g>
        </motion.g>
        
        {/* Hidden path for plane animation reference */}
        <path
          id="flightPath"
          d="M50 120 Q200 40 350 100"
          fill="none"
          stroke="none"
        />
      </svg>
      
      {/* City labels with flag elements */}
      <motion.div
        className="absolute top-4 left-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
      >
        <div className="w-5 h-3 rounded-sm overflow-hidden shadow-md border border-white/50">
          <div className="flex h-full">
            <div className="w-1/4 bg-red-600"></div>
            <div className="w-2/4 bg-white flex items-center justify-center">
              <div className="text-red-600 text-[6px] leading-none">🍁</div>
            </div>
            <div className="w-1/4 bg-red-600"></div>
          </div>
        </div>
        <span className="text-sm font-medium text-foreground">Toronto</span>
      </motion.div>
      
      <motion.div
        className="absolute top-2 right-4 flex items-center gap-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
      >
        <div className="w-5 h-3 rounded-sm overflow-hidden shadow-md border border-white/50 flex">
          <div className="w-1/4 bg-red-500"></div>
          <div className="w-3/4">
            <div className="w-full h-1/3 bg-green-600"></div>
            <div className="w-full h-1/3 bg-white"></div>
            <div className="w-full h-1/3 bg-black"></div>
          </div>
        </div>
        <span className="text-sm font-medium text-foreground">Dubai</span>
      </motion.div>
      
      {/* Relocation Status - Clear for Recruiters */}
      <motion.div
        className="absolute inset-x-4 bottom-4 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
      >
        <div className="bg-gold/10 backdrop-blur-sm border border-gold/30 rounded-2xl p-4 shadow-lg">
          <div className="text-lg font-semibold text-foreground mb-2">
            🇦🇪 Moving to Dubai - 2025
          </div>
          <div className="text-sm text-muted-foreground">
            <span className="font-medium">Available for opportunities</span> • Ready to start
          </div>
        </div>
      </motion.div>
    </div>
  );
}