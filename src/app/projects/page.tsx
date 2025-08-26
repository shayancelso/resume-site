'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Code, Star, ArrowRight, Wrench, Lightbulb, Zap } from 'lucide-react';
import Link from 'next/link';

export default function ProjectsPage() {
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

  const upcomingProjects = [
    {
      icon: Wrench,
      title: "Process Automation Framework",
      description: "Comprehensive documentation of AI-driven workflow optimization methodologies",
      category: "Automation"
    },
    {
      icon: Lightbulb,
      title: "Strategic Account Management Playbook",
      description: "Best practices and frameworks for scaling account management excellence",
      category: "Strategy"
    },
    {
      icon: Zap,
      title: "Performance Analytics Dashboard",
      description: "Interactive showcase of key metrics and achievement patterns",
      category: "Analytics"
    }
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-white"
    >
      <div className="container">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center section-padding">
          <div className="badge-chocolate mb-4 inline-block">
            Coming Soon
          </div>
          <h1 className="mb-6">
            Featured <span className="text-chocolate">Projects</span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Exciting projects showcasing innovative solutions, strategic frameworks, 
            and process improvements are currently in development.
          </p>
        </motion.div>

        {/* Coming Soon Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="card-clean p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-chocolate/10 rounded-full flex items-center justify-center">
                <Clock className="w-8 h-8 text-chocolate" />
              </div>
            </div>
            
            <h2 className="mb-4">Projects in Development</h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              I'm currently working on several exciting projects that will showcase practical applications 
              of strategic account management, AI process optimization, and innovative business solutions. 
              <strong className="text-black"> Stay tuned!</strong>
            </p>
            
            <div className="inline-flex items-center gap-2 text-chocolate font-medium">
              <Star className="w-4 h-4" />
              Expected Launch: Q2 2025
            </div>
          </div>
        </motion.div>

        {/* Preview Cards */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-heading font-bold mb-4">What's Coming</h3>
            <p className="text-muted max-w-2xl mx-auto">
              A sneak peek at the innovative projects and frameworks currently in development
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingProjects.map((project, index) => {
              const IconComponent = project.icon;
              return (
                <motion.div
                  key={project.title}
                  variants={itemVariants}
                  className="card-clean group hover:border-chocolate/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-chocolate/10 rounded-lg flex items-center justify-center group-hover:bg-chocolate/20 transition-colors">
                      <IconComponent className="w-5 h-5 text-chocolate" />
                    </div>
                    <span className="badge-minimal">{project.category}</span>
                  </div>
                  
                  <h4 className="text-lg font-heading font-bold mb-3">{project.title}</h4>
                  <p className="text-muted leading-relaxed">{project.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="card-clean p-10 bg-section-alt border-neutral-300">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Interested in My Work?
            </h3>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              While these projects are in development, you can explore my proven track record 
              of delivering exceptional results in strategic account management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/experience">
                <Button className="btn-primary">
                  View My Experience
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button className="btn-outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}