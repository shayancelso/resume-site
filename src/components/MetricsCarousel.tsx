'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Metric {
  icon: React.ComponentType<{ className?: string }>;
  value: string;
  label: string;
}

interface MetricsCarouselProps {
  metrics: Metric[];
}

export function MetricsCarousel({ metrics }: MetricsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  useEffect(() => {
    if (isMobile) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % metrics.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isMobile, metrics.length]);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % metrics.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + metrics.length) % metrics.length);
  };

  if (!isMobile) {
    // Desktop: Show all metrics in grid
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const IconComponent = metric.icon;
          return (
            <motion.div
              key={index}
              className="card-clean text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 25px rgba(92, 64, 51, 0.12)"
              }}
            >
              <IconComponent className="w-8 h-8 mx-auto text-chocolate mb-2" />
              <div className="text-2xl font-bold mb-1 text-black">{metric.value}</div>
              <div className="text-sm text-muted">{metric.label}</div>
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Mobile: Show carousel
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="card-clean text-center min-h-[160px] flex flex-col justify-center"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3 }}
          >
            {(() => {
              const metric = metrics[currentIndex];
              const IconComponent = metric.icon;
              return (
                <>
                  <IconComponent className="w-12 h-12 mx-auto text-chocolate mb-4" />
                  <div className="text-3xl font-bold mb-2 text-black">{metric.value}</div>
                  <div className="text-base text-muted">{metric.label}</div>
                </>
              );
            })()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        aria-label="Previous metric"
      >
        <ChevronLeft className="w-5 h-5 text-chocolate" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white border border-neutral-200 rounded-full flex items-center justify-center shadow-md hover:shadow-lg transition-shadow"
        aria-label="Next metric"
      >
        <ChevronRight className="w-5 h-5 text-chocolate" />
      </button>

      {/* Dots indicator */}
      <div className="flex justify-center space-x-2 mt-4">
        {metrics.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-chocolate' : 'bg-neutral-300'
            }`}
            aria-label={`Go to metric ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}