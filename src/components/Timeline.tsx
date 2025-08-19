'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Experience } from '@/types';
import { formatDateRange, calculateDuration } from '@/lib/utils';
import { MapPin, Calendar } from 'lucide-react';

interface TimelineProps {
  experiences: Experience[];
}

export function Timeline({ experiences }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold/50 to-transparent" />
      
      <div className="space-y-8">
        {experiences.map((experience, index) => (
          <TimelineItem 
            key={experience.id} 
            experience={experience} 
            index={index}
            isLast={index === experiences.length - 1}
          />
        ))}
      </div>
    </div>
  );
}

interface TimelineItemProps {
  experience: Experience;
  index: number;
  isLast: boolean;
}

function TimelineItem({ experience, index, isLast }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  
  return (
    <motion.div
      ref={ref}
      className="relative flex items-start gap-6"
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.2,
        ease: "easeOut"
      }}
    >
      {/* Timeline dot */}
      <motion.div
        className="relative z-10 flex-shrink-0"
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ 
          duration: 0.4, 
          delay: index * 0.2 + 0.3,
          type: "spring",
          stiffness: 200
        }}
      >
        <div className="w-3 h-3 bg-gold rounded-full shadow-lg" />
        <motion.div
          className="absolute inset-0 bg-gold rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.7, 0.3, 0.7]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </motion.div>
      
      {/* Content card */}
      <motion.div
        className="flex-1 pb-8"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <Card className="hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-lg mb-1">
                  {experience.title}
                </CardTitle>
                <CardDescription className="text-base font-medium text-gold mb-2">
                  {experience.company}
                </CardDescription>
              </div>
              
              {experience.endDate === null && (
                <Badge variant="default" className="text-xs">
                  Current
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDateRange(experience.startDate, experience.endDate)}</span>
              </div>
              
              <div className="flex items-center gap-1">
                <span>•</span>
                <span>{calculateDuration(experience.startDate, experience.endDate)}</span>
              </div>
              
              {experience.location && (
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </CardHeader>
          
          <CardContent>
            <p className="text-muted-foreground mb-4">
              {experience.description}
            </p>
            
            <div className="space-y-2">
              {experience.highlights.map((highlight, highlightIndex) => (
                <motion.div
                  key={highlightIndex}
                  className="flex items-start gap-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ 
                    duration: 0.4, 
                    delay: index * 0.2 + 0.5 + highlightIndex * 0.1
                  }}
                >
                  <div className="w-1.5 h-1.5 bg-gold rounded-full mt-2 flex-shrink-0" />
                  <p className="text-sm">{highlight}</p>
                </motion.div>
              ))}
            </div>
            
            {experience.skills.length > 0 && (
              <motion.div
                className="mt-4 pt-4 border-t border-border"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ 
                  duration: 0.4, 
                  delay: index * 0.2 + 1
                }}
              >
                <div className="flex flex-wrap gap-2">
                  {experience.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="outline"
                      className="text-xs hover:bg-gold/10"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}