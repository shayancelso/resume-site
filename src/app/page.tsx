'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AnimatedMapArc } from '@/components/AnimatedMapArc';
import { CardTilt } from '@/components/CardTilt';
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
    <main className="min-h-screen bg-luxury">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen"
      >
        {/* Hero Section */}
        <section className="section-padding">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="badge-outline mb-4 inline-block">
                      Account Manager & AI Enthusiast
                    </div>
                  </motion.div>
                  
                  <h1 className="text-balance">
                    <motion.span
                      className="block"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      Expansions,
                    </motion.span>
                    <motion.span
                      className="block"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                    >
                      renewals, and
                    </motion.span>
                    <motion.span
                      className="block text-gradient"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                    >
                      AI-boosted workflows
                    </motion.span>
                  </h1>
                  
                  <motion.p
                    className="text-lg text-muted-foreground max-w-2xl text-balance"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    Account Manager focused on measurable ROI and executive alignment. 
                    Delivered 280% FY25 performance with AI-driven process improvements 
                    and strategic client expansion.
                  </motion.p>
                </div>
                
                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  <Link href="/experience">
                    <div className="btn-primary group">
                      View Experience
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                  
                  <Link href="/contact">
                    <div className="btn-outline">
                      Get in Touch
                    </div>
                  </Link>
                </motion.div>
              </motion.div>

              {/* Animated Achievement Cards */}
              <motion.div variants={itemVariants}>
                <AnimatedMapArc />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="section-padding bg-executive">
          <div className="container">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <CardTilt>
                <div className="card-glass text-center text-white border-primary/20 border-2">
                  <div className="mb-4">
                    <TrendingUp className="w-12 h-12 mx-auto text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">280%</h3>
                  <p className="text-white/80">FY25 Quota Achievement</p>
                </div>
              </CardTilt>

              <CardTilt>
                <div className="card-glass text-center text-white border-primary/20 border-2">
                  <div className="mb-4">
                    <Award className="w-12 h-12 mx-auto text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{awards.length}</h3>
                  <p className="text-white/80">Awards in 2024</p>
                </div>
              </CardTilt>

              <CardTilt>
                <div className="card-glass text-center text-white border-primary/20 border-2">
                  <div className="mb-4">
                    <Users className="w-12 h-12 mx-auto text-primary" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">100%</h3>
                  <p className="text-white/80">Gross Revenue Retention</p>
                </div>
              </CardTilt>
            </motion.div>
          </div>
        </section>

        {/* Core Competencies */}
        <section className="section-padding bg-premium">
          <div className="container">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="badge-skill mb-4 inline-block">Sales Excellence</div>
              <h2 className="mb-4">Core competencies in account management, expansion, and relationship building</h2>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {skills.map((skill, index) => {
                const IconComponent = getSkillIcon(skill.name);
                return (
                  <CardTilt key={skill.id}>
                    <motion.div
                      className="card-premium text-center group hover:shadow-lg transition-all duration-300"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                        <IconComponent className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                      <p className="text-sm text-muted-foreground">{skill.description || 'Professional expertise and proven results'}</p>
                    </motion.div>
                  </CardTilt>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding">
          <div className="container">
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
              <div className="card-glass p-12">
                <h2 className="mb-4">Ready to connect?</h2>
                <p className="text-lg text-muted-foreground mb-8">
                  Let's discuss how AI-enhanced account management can drive results for your organization.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <div className="btn-primary">
                      Start a Conversation
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                  
                  <Link href="/experience">
                    <div className="btn-outline">
                      View My Track Record
                    </div>
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </motion.div>
    </main>
  );
}