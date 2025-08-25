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
  }>>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const newElements = Array.from({ length: 6 }, (_, i) => ({
        id: i,
        size: Math.random() * 60 + 20,
        initialX: Math.random() * window.innerWidth,
        initialY: Math.random() * window.innerHeight,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
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
          className="absolute rounded-full bg-neutral-200/30"
          style={{
            width: element.size,
            height: element.size,
            x: element.initialX,
            y: element.initialY,
          }}
          animate={{
            x: [element.initialX, element.initialX + 200, element.initialX - 100, element.initialX],
            y: [element.initialY, element.initialY - 150, element.initialY + 100, element.initialY],
            scale: [1, 1.2, 0.8, 1],
            opacity: [0.3, 0.6, 0.2, 0.3],
          }}
          transition={{
            duration: element.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: element.delay,
          }}
        />
      ))}
    </div>
  );
}