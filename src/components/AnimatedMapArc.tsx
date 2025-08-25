'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { TrendingUp, Award, Users, Target } from 'lucide-react';

export function AnimatedMapArc() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const achievements = [
    { icon: TrendingUp, label: "280% Quota", value: "FY25" },
    { icon: Award, label: "Top Performer", value: "2024" },
    { icon: Users, label: "100% Retention", value: "Rate" },
    { icon: Target, label: "AI Enhanced", value: "Sales" }
  ];

  if (!mounted) {
    return (
      <div className="w-full h-64 gradient-luxury rounded-2xl flex items-center justify-center">
        <div className="text-muted-foreground">Loading achievements...</div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-64 bg-neutral-50 rounded-2xl overflow-hidden p-6 border border-neutral-200">
      {/* Achievements Grid */}
      <div className="grid grid-cols-2 gap-4 h-full">
        {achievements.map((achievement, index) => {
          const IconComponent = achievement.icon;
          return (
            <motion.div
              key={achievement.label}
              className="flex flex-col items-center justify-center text-center bg-white rounded-xl border border-neutral-200 shadow-sm"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ scale: 1.05, boxShadow: "0 4px 12px rgba(92, 64, 51, 0.15)" }}
            >
              <div className="mb-2 p-3 bg-neutral-100 rounded-full">
                <IconComponent className="w-6 h-6 text-chocolate" />
              </div>
              <div className="text-black font-semibold text-sm">
                {achievement.label}
              </div>
              <div className="text-muted text-xs font-medium">
                {achievement.value}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}