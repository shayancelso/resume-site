'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
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
    <main className="min-h-screen bg-white">
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
                    Account Manager & AI Enthusiast
                  </div>
                  
                  <h1 className="text-balance">
                    Expansions, renewals, and <span className="text-chocolate">AI-enhanced workflows</span>
                  </h1>
                  
                  <p className="text-lg text-muted max-w-2xl text-balance">
                    Account Manager focused on measurable ROI and executive alignment. 
                    Delivered 280% FY25 performance with AI-driven process improvements 
                    and strategic client expansion.
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Link href="/experience">
                    <div className="btn-primary">
                      View Experience
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                  
                  <Link href="/contact">
                    <div className="btn-outline">
                      Get in Touch
                    </div>
                  </Link>
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
                <div className="card-clean text-center">
                  <TrendingUp className="w-12 h-12 mx-auto text-chocolate mb-4" />
                  <h3 className="text-3xl font-bold mb-2 text-black">280%</h3>
                  <p className="text-muted">FY25 Quota Achievement</p>
                </div>
              </CardTilt>

              <CardTilt>
                <div className="card-clean text-center">
                  <Award className="w-12 h-12 mx-auto text-chocolate mb-4" />
                  <h3 className="text-3xl font-bold mb-2 text-black">{awards.length}</h3>
                  <p className="text-muted">Awards in 2024</p>
                </div>
              </CardTilt>

              <CardTilt>
                <div className="card-clean text-center">
                  <Users className="w-12 h-12 mx-auto text-chocolate mb-4" />
                  <h3 className="text-3xl font-bold mb-2 text-black">100%</h3>
                  <p className="text-muted">Client Retention Rate</p>
                </div>
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
                      className="card-clean group hover:shadow-md transition-all duration-200"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-chocolate" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2 text-black">{skill.name}</h3>
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
                <h2 className="mb-4">Ready to connect?</h2>
                <p className="text-lg text-muted mb-8">
                  Let's discuss how AI-enhanced account management can drive measurable results for your organization.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/contact">
                    <div className="btn-chocolate">
                      Start a Conversation
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                  
                  <Link href="/experience">
                    <div className="btn-outline">
                      View Track Record
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