'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface SkillRingProps {
  skill: string;
  proficiency: number;
  description?: string;
  size?: number;
}

export function SkillRing({ 
  skill, 
  proficiency, 
  description, 
  size = 120 
}: SkillRingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  
  const circumference = Math.PI * (size - 20);
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (proficiency / 100) * circumference;
  
  return (
    <div 
      ref={ref}
      className="flex flex-col items-center gap-3 group cursor-pointer"
    >
      <div className="relative">
        <svg
          width={size}
          height={size}
          className="transform -rotate-90 transition-transform duration-300 group-hover:scale-105"
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 20) / 2}
            stroke="rgba(233, 223, 199, 0.3)"
            strokeWidth="8"
            fill="none"
          />
          
          {/* Progress circle */}
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={(size - 20) / 2}
            stroke="url(#skillGradient)"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            initial={{ strokeDashoffset: circumference }}
            animate={isInView ? { 
              strokeDashoffset: strokeDashoffset 
            } : {}}
            transition={{ 
              duration: 1.5, 
              ease: "easeInOut", 
              delay: 0.2 
            }}
          />
          
          {/* Gradient definition */}
          <defs>
            <linearGradient id="skillGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#C8A96A" />
              <stop offset="100%" stopColor="#5D4037" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Percentage in center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span
            className="text-xl font-bold text-gold"
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { 
              opacity: 1, 
              scale: 1 
            } : {}}
            transition={{ 
              duration: 0.5, 
              delay: 1 
            }}
          >
            {proficiency}%
          </motion.span>
        </div>
      </div>
      
      {/* Skill name */}
      <motion.div
        className="text-center max-w-[140px]"
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0 
        } : {}}
        transition={{ 
          duration: 0.5, 
          delay: 1.2 
        }}
      >
        <h4 className="font-semibold text-sm mb-1">{skill}</h4>
        {description && (
          <p className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {description}
          </p>
        )}
      </motion.div>
    </div>
  );
}