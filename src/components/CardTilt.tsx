'use client';

import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, MouseEvent, ReactNode } from 'react';

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
}

export function CardTilt({ children, className = '', intensity = 1 }: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [4 * intensity, -4 * intensity]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-4 * intensity, 4 * intensity]);
  
  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };
  
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{
        z: 50,
        transition: { duration: 0.2 }
      }}
      className={`transition-shadow duration-300 hover:shadow-2xl ${className}`}
    >
      <div style={{ transform: 'translateZ(75px)' }}>
        {children}
      </div>
    </motion.div>
  );
}