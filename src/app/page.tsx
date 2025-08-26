'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AnimatedMapArc } from '@/components/AnimatedMapArc';
import { AnimatedCounter } from '@/components/AnimatedCounter';
import { FloatingElements } from '@/components/FloatingElements';
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
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <main className="min-h-screen bg-white relative">
      <FloatingElements />
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Hero Content */}
              <motion.div variants={itemVariants} className="space-y-6 text-center lg:text-left">
                <div className="space-y-4">
                  <div className="badge-chocolate inline-block">
                    Strategic Account Manager
                  </div>
                  
                  <h1 className="text-balance hero-title">
                    Driving{' '}
                    <motion.span 
                      className="text-chocolate"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                    >
                      exceptional results
                    </motion.span>
                    {' '}through strategic account management
                  </h1>
                  
                  <p className="text-lg text-muted max-w-2xl text-balance">
                    Proven account manager with expertise in client expansion, retention, and AI-driven process optimization. 
                    <strong className="text-black">280% quota achievement</strong> and <strong className="text-black">100% client retention</strong> demonstrate 
                    my commitment to measurable results and executive-level relationship building.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/experience">
                    <div className="btn-primary group">
                      Explore My Track Record
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                  
                  <Link href="/contact">
                    <div className="btn-outline">
                      Let's Connect
                    </div>
                  </Link>
                </div>
                
                <div className="mt-6 p-4 rounded-lg border border-neutral-200" style={{backgroundColor: '#fefefe'}}>
                  <p className="text-sm text-muted">
                    👆 <strong className="text-black">Start here:</strong> See how I've consistently delivered 280%+ quota performance, 
                    maintained 100% retention rates, and earned multiple recognition awards in 2024.
                  </p>
                </div>
              </motion.div>

              {/* Achievement Cards */}
              <motion.div variants={itemVariants}>
                <AnimatedMapArc />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="section-padding bg-section-alt">
          <div className="container">
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <CardTilt>
                <motion.div 
                  className="card-clean text-center group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(92, 64, 51, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TrendingUp className="w-12 h-12 mx-auto text-chocolate mb-4" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2 text-black">
                    <AnimatedCounter from={0} to={280} suffix="%" duration={2.5} />
                  </h3>
                  <p className="text-muted">FY25 Quota Achievement</p>
                </motion.div>
              </CardTilt>

              <CardTilt>
                <motion.div 
                  className="card-clean text-center group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(92, 64, 51, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: -12, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Award className="w-12 h-12 mx-auto text-chocolate mb-4" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2 text-black">
                    <AnimatedCounter from={0} to={awards.length} duration={1.8} />
                  </h3>
                  <p className="text-muted">Awards in 2024</p>
                </motion.div>
              </CardTilt>

              <CardTilt>
                <motion.div 
                  className="card-clean text-center group"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 10px 30px rgba(92, 64, 51, 0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 12, scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Users className="w-12 h-12 mx-auto text-chocolate mb-4" />
                  </motion.div>
                  <h3 className="text-3xl font-bold mb-2 text-black">
                    <AnimatedCounter from={0} to={100} suffix="%" duration={2.2} />
                  </h3>
                  <p className="text-muted">Client Retention Rate</p>
                </motion.div>
              </CardTilt>
            </motion.div>
          </div>
        </section>

        {/* Core Skills */}
        <section className="section-padding bg-white">
          <div className="container">
            <motion.div variants={itemVariants} className="text-center mb-12">
              <div className="badge-minimal mb-4 inline-block">Core Competencies</div>
              <h2 className="mb-4">Professional expertise in account management and AI integration</h2>
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
                      className="card-clean group"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 25px rgba(92, 64, 51, 0.12)"
                      }}
                    >
                      <div className="flex items-start gap-4">
                        <motion.div 
                          className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0"
                          whileHover={{ 
                            scale: 1.15,
                            backgroundColor: "rgba(92, 64, 51, 0.1)"
                          }}
                          transition={{ duration: 0.2 }}
                        >
                          <motion.div
                            whileHover={{ rotate: 5, scale: 1.1 }}
                            transition={{ duration: 0.2 }}
                          >
                            <IconComponent className="w-6 h-6 text-chocolate" />
                          </motion.div>
                        </motion.div>
                        <div className="flex-1">
                          <motion.h3 
                            className="font-semibold mb-2 text-black group-hover:text-chocolate transition-colors duration-200"
                          >
                            {skill.name}
                          </motion.h3>
                          <p className="text-sm text-muted">
                            {skill.description || 'Professional expertise with proven results'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </CardTilt>
                );
              })}
            </motion.div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="section-padding bg-section-alt">
          <div className="container">
            <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto">
              <div className="card-clean p-12">
                <h2 className="mb-4">Ready to explore what's possible?</h2>
                <p className="text-lg text-muted mb-8">
                  Discover how strategic account management and AI-driven process optimization 
                  can deliver measurable results for your team.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/experience">
                    <div className="btn-chocolate">
                      View Detailed Experience
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                  
                  <Link href="/contact">
                    <div className="btn-outline">
                      Let's Connect
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