'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedMapArc } from '@/components/AnimatedMapArc';
import { CardTilt } from '@/components/CardTilt';
// Removed SkillRing component - using icon-based approach instead
import { getProfile, getCurrentRole, getAwards, getSkills } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, Award, TrendingUp, Users, Zap, Target, MessageSquare, BarChart3, Monitor, Brain, Settings } from 'lucide-react';

export default function HomePage() {
  const profile = getProfile();
  const currentRole = getCurrentRole();
  const awards = getAwards();
  const skills = getSkills().slice(0, 6);

  // Icon mapping for skills
  const skillIcons = {
    'Account Management': Target,
    'Business Development': TrendingUp,
    'Strategic Business Reviews': BarChart3,
    'Client Relationship Management': MessageSquare,
    'Go-to-Market Strategy': Zap,
    'Sales Enablement': Users,
    'CRM Platforms': Monitor,
    'AI Integration': Brain,
    'Process Optimization': Settings,
    'Consultative Selling': Award
  };

  const getSkillIcon = (skillName: string) => {
    return skillIcons[skillName as keyof typeof skillIcons] || Target;
  };

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
    <main
      id="main-content"
      className="min-h-screen"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen"
      >
      {/* Hero Section */}
      <section className="py-20 px-6 gradient-luxury">
        <div className="container mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Badge variant="outline" className="mb-4">
                    Relocating to Dubai 2025
                  </Badge>
                </motion.div>
                
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
                  <motion.span
                    className="block text-balance"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Expansions,
                  </motion.span>
                  <motion.span
                    className="block text-balance"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    renewals, and
                  </motion.span>
                  <motion.span
                    className="block text-gold text-balance"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    AI-boosted workflows
                  </motion.span>
                </h1>
                
                <motion.p
                  className="text-xl text-muted-foreground max-w-2xl text-balance leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  Account Manager moving from Toronto to Dubai, focused on measurable ROI 
                  and executive alignment. Delivered 280% FY25 performance with AI-driven 
                  process improvements.
                </motion.p>
              </div>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <Link href="/experience">
                  <Button size="lg" className="group">
                    View Experience
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Get in Touch
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Animated Map */}
            <motion.div variants={itemVariants}>
              <AnimatedMapArc />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-16 px-6 gradient-executive">
        <div className="container mx-auto max-w-7xl">
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <CardTilt>
              <Card className="text-center p-8 !bg-transparent border-gold/20 border-2 shadow-lg">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <TrendingUp className="w-12 h-12 mx-auto text-gold" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 !text-white">280%</h3>
                  <p className="!text-white/80">FY25 Quota Achievement</p>
                </CardContent>
              </Card>
            </CardTilt>

            <CardTilt>
              <Card className="text-center p-8 !bg-transparent border-gold/20 border-2 shadow-lg">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Award className="w-12 h-12 mx-auto text-gold" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 !text-white">{awards.length}</h3>
                  <p className="!text-white/80">Awards in 2024</p>
                </CardContent>
              </Card>
            </CardTilt>

            <CardTilt>
              <Card className="text-center p-8 !bg-transparent border-gold/20 border-2 shadow-lg">
                <CardContent className="p-0">
                  <div className="mb-4">
                    <Users className="w-12 h-12 mx-auto text-gold" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2 !text-white">100%</h3>
                  <p className="!text-white/80">Gross Revenue Retention</p>
                </CardContent>
              </Card>
            </CardTilt>
          </motion.div>
        </div>
      </section>

      {/* Current Role Highlight */}
      {currentRole && (
        <section className="py-20 px-6 gradient-luxury">
          <div className="container mx-auto max-w-4xl">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Current Focus
              </h2>
              <p className="text-xl text-muted-foreground">
                Making an impact at {currentRole.company}
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <CardTilt>
                <Card className="p-8">
                  <CardHeader className="text-center">
                    <CardTitle className="text-2xl">{currentRole.title}</CardTitle>
                    <CardDescription className="text-lg text-gold">
                      {currentRole.company} • {currentRole.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-center text-muted-foreground mb-6">
                      {currentRole.description}
                    </p>
                    
                    <div className="grid gap-3">
                      {currentRole.highlights.slice(0, 3).map((highlight, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 rounded-xl bg-muted/50"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
                        >
                          <Zap className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{highlight}</p>
                        </motion.div>
                      ))}
                    </div>

                    <div className="pt-6 text-center">
                      <Link href="/experience">
                        <Button variant="outline">
                          View Full Experience
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </CardTilt>
            </motion.div>
          </div>
        </section>
      )}

      {/* Skills Preview */}
      <section className="py-20 px-6 gradient-executive">
        <div className="container mx-auto max-w-7xl">
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              Core Expertise
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proven skills in account management, strategic sales, and AI-powered workflows
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12"
          >
            {skills.map((skill) => {
              const IconComponent = getSkillIcon(skill.name);
              return (
                <motion.div
                  key={skill.id}
                  className="text-center p-4 rounded-xl bg-transparent border-gold/20 border hover:bg-gold/5 hover:border-gold/40 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-16 h-16 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-8 h-8 text-gold" />
                  </div>
                  <h4 className="font-semibold text-sm mb-1 text-white">{skill.name}</h4>
                  <p className="text-xs text-white/70">{skill.description}</p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div variants={itemVariants} className="text-center">
            <Link href="/skills">
              <Button size="lg">
                Explore All Skills
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 gradient-premium">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            variants={itemVariants}
            className="text-center space-y-8"
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
                Ready to Connect?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Whether you're looking for an experienced account manager or want to discuss 
                opportunities in Dubai, I'd love to hear from you.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  Start a Conversation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              
              <Link href="/about">
                <Button size="lg" variant="outline">
                  Learn More About Me
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  </main>
  );
}