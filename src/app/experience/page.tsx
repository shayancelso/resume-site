'use client';

import { motion } from 'framer-motion';
import { Timeline } from '@/components/Timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
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
      className="min-h-screen py-20 px-6"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Professional <span className="text-gold">Experience</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A journey through account management, strategic consulting, and business operations 
            with a focus on measurable results and innovative solutions.
          </p>
        </motion.div>

        {/* Key Metrics */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <TrendingUp className="w-8 h-8 mx-auto text-gold mb-2" />
                <div className="text-2xl font-bold mb-1">280%</div>
                <div className="text-sm text-muted-foreground">FY25 Quota</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Target className="w-8 h-8 mx-auto text-gold mb-2" />
                <div className="text-2xl font-bold mb-1">320%</div>
                <div className="text-sm text-muted-foreground">Peak Quarter</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Users className="w-8 h-8 mx-auto text-gold mb-2" />
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-sm text-muted-foreground">GRR Rate</div>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="p-0">
                <Award className="w-8 h-8 mx-auto text-gold mb-2" />
                <div className="text-2xl font-bold mb-1">{awards.length}</div>
                <div className="text-sm text-muted-foreground">Awards 2024</div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Experience Timeline */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Career Journey
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From startup operations to enterprise account management, 
              each role has built on the foundation of the last.
            </p>
          </div>

          <Timeline experiences={experiences} />
        </motion.div>

        {/* Awards & Recognition */}
        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-gold" />
                  Awards & Recognition
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {awards.map((award, index) => (
                  <motion.div
                    key={award.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{award.title}</h4>
                      <p className="text-sm text-gold mb-1">{award.organization}</p>
                      <p className="text-xs text-muted-foreground">{award.date}</p>
                      {award.description && (
                        <p className="text-sm text-muted-foreground mt-2">
                          {award.description}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-gold" />
                  Certifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    className="flex items-start gap-4 p-4 rounded-xl bg-muted/50"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <div className="w-10 h-10 bg-gold/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <BookOpen className="w-5 h-5 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold mb-1">{cert.name}</h4>
                      <p className="text-sm text-gold mb-1">{cert.issuer}</p>
                      <p className="text-xs text-muted-foreground">{cert.date}</p>
                    </div>
                    {cert.url && (
                      <a
                        href={cert.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-gold hover:underline"
                      >
                        View
                      </a>
                    )}
                  </motion.div>
                ))}

                {/* Additional Learning */}
                <motion.div
                  className="p-4 rounded-xl border-2 border-dashed border-gold/30"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  <div className="text-center">
                    <BookOpen className="w-8 h-8 mx-auto text-gold mb-2" />
                    <p className="text-sm font-medium mb-1">Continuous Learning</p>
                    <p className="text-xs text-muted-foreground">
                      Always expanding knowledge in AI, sales methodologies, and emerging technologies
                    </p>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Key Differentiators */}
        <motion.div variants={itemVariants} className="mb-20">
          <Card className="p-8">
            <CardContent className="p-0">
              <h3 className="text-2xl font-heading font-bold text-center mb-8">
                What Sets Me Apart
              </h3>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-semibold mb-2">Results-Driven Approach</h4>
                  <p className="text-sm text-muted-foreground">
                    Consistently exceed targets through strategic planning, executive alignment, 
                    and data-driven decision making.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-semibold mb-2">Relationship Excellence</h4>
                  <p className="text-sm text-muted-foreground">
                    Build lasting partnerships through trust, transparency, and genuine value creation 
                    at all organizational levels.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-gold/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-semibold mb-2">AI-Enhanced Workflows</h4>
                  <p className="text-sm text-muted-foreground">
                    Leverage artificial intelligence and automation to improve processes, 
                    enhance insights, and scale impact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center">
          <Card className="p-12 gradient-luxury">
            <CardContent className="p-0">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Ready to Discuss Opportunities?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're looking for an experienced account manager, want to learn about 
                my approach to AI-enhanced sales processes, or explore collaboration opportunities 
                in Dubai, let's connect.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">
                    Start a Conversation
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link href="/skills">
                  <Button size="lg" variant="outline">
                    Explore My Skills
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}