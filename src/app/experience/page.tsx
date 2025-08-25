'use client';

import { motion } from 'framer-motion';
import { Timeline } from '@/components/Timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getExperience, getAwards, getCertifications } from '@/lib/data';
import { Award, BookOpen, TrendingUp, Users, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ExperiencePage() {
  const experiences = getExperience();
  const awards = getAwards();
  const certifications = getCertifications();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-luxury"
    >
      <div className="container">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center section-padding">
          <h1 className="mb-6">
            Professional <span className="text-gradient">Experience</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A journey through account management, strategic consulting, and business operations 
            with a focus on measurable results and innovative solutions.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="card-premium text-center">
              <TrendingUp className="w-8 h-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold mb-1">280%</div>
              <div className="text-sm text-muted-foreground">FY25 Quota</div>
            </div>
            
            <div className="card-premium text-center">
              <Target className="w-8 h-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold mb-1">320%</div>
              <div className="text-sm text-muted-foreground">Peak Quarter</div>
            </div>
            
            <div className="card-premium text-center">
              <Users className="w-8 h-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold mb-1">100%</div>
              <div className="text-sm text-muted-foreground">GRR Rate</div>
            </div>
            
            <div className="card-premium text-center">
              <Award className="w-8 h-8 mx-auto text-primary mb-2" />
              <div className="text-2xl font-bold mb-1">{awards.length}</div>
              <div className="text-sm text-muted-foreground">Awards 2024</div>
            </div>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="text-center mb-12">
            <div className="badge-skill mb-4 inline-block">Career Journey</div>
            <h2 className="mb-4">From startup operations to enterprise account management</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Each role has built on the foundation of the last, creating a unique blend of 
              operational excellence and strategic relationship management.
            </p>
          </div>

          <Timeline experiences={experiences} />
        </motion.div>

        {/* Awards & Recognition */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <motion.div variants={itemVariants}>
            <div className="card-premium h-full">
              <div className="mb-6">
                <h3 className="text-xl font-heading font-bold flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary" />
                  Awards & Recognition
                </h3>
              </div>
              <div className="space-y-4">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{award.title}</h4>
                      <p className="text-sm text-primary mb-1">{award.organization}</p>
                      <p className="text-xs text-muted-foreground">{award.date}</p>
                      {award.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <div className="card-premium h-full">
              <div className="mb-6">
                <h3 className="text-xl font-heading font-bold flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Certifications
                </h3>
              </div>
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted/70 transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{cert.name}</h4>
                      <p className="text-sm text-primary mb-1">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">{cert.date}</p>
                    </div>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline"
                      >
                        View
                      </a>
                    )}
                  </motion.div>
                ))}

                {/* Additional Learning */}
                <motion.div
                  className="p-4 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto text-primary mb-2" />
                    <p className="text-sm font-medium mb-1">Continuous Learning</p>
                    <p className="text-xs text-muted-foreground">
                      Always expanding knowledge in AI, sales methodologies, and emerging technologies
                    </p>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Key Differentiators */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="card-premium">
            <h3 className="text-2xl font-heading font-bold text-center mb-8">
              What Sets Me Apart
            </h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Results-Driven Approach</h4>
                <p className="text-sm text-muted-foreground">
                  Consistently exceed targets through strategic planning, executive alignment, 
                  and data-driven decision making.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">Relationship Excellence</h4>
                <p className="text-sm text-muted-foreground">
                  Build lasting partnerships through trust, transparency, and genuine value creation 
                  at all organizational levels.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold mb-2">AI-Enhanced Workflows</h4>
                <p className="text-sm text-muted-foreground">
                  Leverage artificial intelligence and automation to improve processes, 
                  enhance insights, and scale impact.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center pb-20">
          <div className="card-glass p-12 max-w-4xl mx-auto">
            <h2 className="mb-4">Ready to Discuss Opportunities?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're looking for an experienced account manager, want to learn about 
              my approach to AI-enhanced sales processes, or explore collaboration opportunities, 
              let's connect.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <div className="btn-primary">
                  Start a Conversation
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
              
              <Link href="/skills">
                <div className="btn-outline">
                  Explore My Skills
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}