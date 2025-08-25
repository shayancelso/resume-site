'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getSkills, getSkillsByCategory } from '@/lib/data';
import { 
  Brain, Users, Monitor, Zap, ArrowRight, Target, TrendingUp, 
  MessageSquare, BarChart3, Award, Settings, Database,
  Globe, Mail, Phone, Calendar, FileText, DollarSign, Star,
  Briefcase, Lightbulb, PieChart, Search, Shield, Workflow,
  UserCheck
} from 'lucide-react';
import Link from 'next/link';

export default function SkillsPage() {
  const allSkills = getSkills();
  const salesSkills = getSkillsByCategory('Sales');
  const gtmSkills = getSkillsByCategory('GTM');
  const platformSkills = getSkillsByCategory('Platforms');
  const aiSkills = getSkillsByCategory('AI');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  // Icon mapping for different skills
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
    'Consultative Selling': Award,
    'Revenue Operations': DollarSign,
    'Customer Success': UserCheck,
    'Data Analysis': PieChart,
    'Project Management': Briefcase,
    'Strategic Planning': Lightbulb,
    'Market Research': Search,
    'Risk Management': Shield,
    'Workflow Automation': Workflow,
    'Communication': MessageSquare,
    'Presentation Skills': Monitor,
    'Negotiation': Award,
    'Leadership': Users,
    'Problem Solving': Settings,
    'Analytics': BarChart3
  };

  const getSkillIcon = (skillName: string) => {
    return skillIcons[skillName as keyof typeof skillIcons] || Target;
  };

  const categories = [
    { name: 'Sales & Account Management', skills: salesSkills, color: 'bg-primary/10 border-primary/20' },
    { name: 'Go-to-Market Strategy', skills: gtmSkills, color: 'bg-blue-50 border-blue-200' },
    { name: 'Platforms & Tools', skills: platformSkills, color: 'bg-green-50 border-green-200' },
    { name: 'AI & Automation', skills: aiSkills, color: 'bg-purple-50 border-purple-200' },
  ];

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
            Professional <span className="text-gradient">Skills</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A comprehensive overview of my technical expertise, sales methodologies, 
            and AI-enhanced workflow capabilities developed through years of hands-on experience.
          </p>
        </motion.div>

        {/* Skills Categories */}
        <div className="space-y-16 pb-20">
          {categories.map((category, categoryIndex) => (
            <motion.div key={category.name} variants={itemVariants}>
              <div className="text-center mb-8">
                <div className="badge-skill mb-4 inline-block">{category.name}</div>
                <h2 className="mb-4">{category.skills.length} Core Competencies</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.skills.map((skill, index) => {
                  const IconComponent = getSkillIcon(skill.name);
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        duration: 0.5, 
                        delay: categoryIndex * 0.2 + index * 0.1 
                      }}
                      className="group"
                    >
                      <div className={`card-premium hover:shadow-lg transition-all duration-300 ${category.color}`}>
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary/30 transition-colors">
                            <IconComponent className="w-6 h-6 text-primary" />
                          </div>
                          
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{skill.name}</h3>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                              {skill.description || 'Professional expertise with proven track record of success'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Skills Summary */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="card-glass p-12 text-center">
            <h2 className="mb-4">Skills in Action</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
              These skills combine to create a unique approach to account management that consistently 
              delivers results beyond traditional expectations. From AI-powered insights to executive 
              relationship building, every capability serves the goal of exceptional client outcomes.
            </p>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">15+</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">280%</div>
                <div className="text-sm text-muted-foreground">Quota Achievement</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">100%</div>
                <div className="text-sm text-muted-foreground">Client Retention</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">5+</div>
                <div className="text-sm text-muted-foreground">AI Tools Mastered</div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center pb-20">
          <div className="card-premium max-w-4xl mx-auto">
            <h2 className="mb-4">Ready to See These Skills in Action?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Let's discuss how these capabilities can drive results for your organization. 
              From strategic account planning to AI-powered process optimization.
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
    </motion.div>
  );
}