'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export function FloatingElements() {
  const [elements, setElements] = useState<Array<{
    id: number;
    size: number;
    initialX: number;
    initialY: number;
    duration: number;
    delay: number;
    color: string;
  }>>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const colors = [
        'rgba(139, 92, 246, 0.05)',
        'rgba(99, 102, 241, 0.04)',
        'rgba(124, 58, 237, 0.03)',
        'rgba(139, 92, 246, 0.04)',
        'rgba(99, 102, 241, 0.03)',
        'rgba(167, 139, 250, 0.05)',
      ];
      const newElements = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 120 + 50,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        duration: Math.random() * 25 + 15,
        delay: Math.random() * 5,
        color: colors[i],
      }));
      setElements(newElements);
    }
  }, []);

  if (elements.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute rounded-full"
          style={{
            width: element.size,
            height: element.size,
            backgroundColor: element.color,
            x: element.initialX,
            y: element.initialY,
          }}
          animate={{
            x: [element.initialX, element.initialX + 250, element.initialX - 120, element.initialX],
            y: [element.initialY, element.initialY - 180, element.initialY + 120, element.initialY],
            scale: [1, 1.3, 0.8, 1],
            opacity: [0.6, 0.9, 0.4, 0.6],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
}
