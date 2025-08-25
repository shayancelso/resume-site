'use client';

import { motion, useMotionValue, useTransform, animate, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  from: number;
  to: number;
  duration?: number;
  suffix?: string;
  className?: string;
}

export function AnimatedCounter({ 
  from, 
  to, 
  duration = 2, 
  suffix = '', 
  className = '' 
}: AnimatedCounterProps) {
  const count = useMotionValue(from);
  const rounded = useTransform(count, latest => Math.round(latest));
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, to, {
        duration,
        ease: "easeOut",
        delay: 0.2,
      });
      return controls.stop;
    }
  }, [count, to, duration, inView]);

  return (
    <motion.span ref={ref} className={className}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </motion.span>
  );
}