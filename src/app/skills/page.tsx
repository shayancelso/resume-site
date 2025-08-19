'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
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
    'Consultative Selling': MessageSquare,
    'Relationship Building': UserCheck,
    'Stakeholder Management': Users,
    'Negotiation': Award,
    'Salesforce': Database,
    'HubSpot': Globe,
    'Outreach': Mail,
    'Gong': Phone,
    'Calendly': Calendar,
    'Notion': FileText,
    'Revenue Growth': DollarSign,
    'Team Leadership': Star,
    'Project Management': Briefcase,
    'Problem Solving': Lightbulb,
    'Data Analysis': PieChart,
    'Market Research': Search,
    'Client Retention': Shield,
    'Process Optimization': Workflow,
    'AI Tools': Brain,
    'Sales Automation': Settings
  };

  const skillCategories = [
    {
      title: 'Sales Excellence',
      icon: Target,
      description: 'Core competencies in account management, expansion, and relationship building',
      skills: salesSkills
    },
    {
      title: 'Go-to-Market',
      icon: TrendingUp,
      description: 'Strategic approaches to consultative selling and stakeholder management',
      skills: gtmSkills
    },
    {
      title: 'Platforms & Tools',
      icon: Monitor,
      description: 'Proficiency with industry-leading sales and customer success platforms',
      skills: platformSkills
    },
    {
      title: 'AI & Innovation',
      icon: Brain,
      description: 'Leveraging artificial intelligence and automation for enhanced workflows',
      skills: aiSkills
    }
  ];

  return (
    <main className="min-h-screen py-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen"
      >
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Skills & <span className="text-gold">Expertise</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A comprehensive toolkit built through years of experience in account management, 
            strategic consulting, and innovative problem-solving across diverse industries.
          </p>
        </motion.div>

        {/* Skills by Category */}
        <div className="space-y-16">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              variants={itemVariants}
              className="space-y-8"
            >
              {/* Category Header */}
              <div className="text-center">
                <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl gradient-premium mb-4`}>
                  <category.icon className="w-6 h-6 text-gold" />
                  <h2 className="text-2xl font-heading font-bold">{category.title}</h2>
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  {category.description}
                </p>
              </div>

              {/* Skills Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {category.skills.map((skill, skillIndex) => {
                  const SkillIcon = skillIcons[skill.name as keyof typeof skillIcons] || Monitor;
                  return (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: categoryIndex * 0.2 + skillIndex * 0.1,
                        type: "spring",
                        stiffness: 200
                      }}
                    >
                      <Card className="p-4 h-full bg-card/80 hover:bg-card transition-colors text-center group cursor-pointer">
                        <div className="flex flex-col items-center gap-3">
                          <div className="w-12 h-12 bg-rich-gold/10 rounded-xl flex items-center justify-center group-hover:bg-rich-gold/20 transition-colors">
                            <SkillIcon className="w-6 h-6 text-rich-gold" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-foreground mb-1">{skill.name}</h4>
                            {skill.description && (
                              <p className="text-xs text-muted-foreground line-clamp-2">
                                {skill.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI Showcase Highlight */}
        <motion.div variants={itemVariants} className="mt-20 mb-20">
          <Card className="p-8 gradient-executive border-gold/30">
            <CardContent className="p-0">
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-3 mb-4">
                  <Brain className="w-8 h-8 text-gold" />
                  <h2 className="text-3xl font-heading font-bold">AI-Enhanced Workflows</h2>
                </div>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  See how I leverage artificial intelligence to transform sales processes and 
                  deliver exceptional results through interactive demonstrations.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="text-center p-6 rounded-xl bg-background/50">
                  <h4 className="font-semibold mb-2">Email Summarizer</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    AI-powered tool for extracting key insights from client communications
                  </p>
                  <Badge variant="skill">TLDR Generation</Badge>
                </div>
                
                <div className="text-center p-6 rounded-xl bg-background/50">
                  <h4 className="font-semibold mb-2">Discovery Assistant</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Smart question generator for deeper client needs analysis
                  </p>
                  <Badge variant="skill">Industry-Specific</Badge>
                </div>
              </div>

              <div className="text-center">
                <Link href="/demos">
                  <Button size="lg">
                    Try Interactive Demos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Skill Development Philosophy */}
        <motion.div variants={itemVariants} className="mb-20">
          <Card className="p-8">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-heading">
                Continuous Learning Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div className="p-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-gold">1</span>
                  </div>
                  <h4 className="font-semibold mb-2">Stay Current</h4>
                  <p className="text-sm text-muted-foreground">
                    Regularly update skills with latest industry trends, tools, and methodologies
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-gold">2</span>
                  </div>
                  <h4 className="font-semibold mb-2">Practice Daily</h4>
                  <p className="text-sm text-muted-foreground">
                    Apply new concepts immediately in real-world scenarios for deeper understanding
                  </p>
                </div>
                
                <div className="p-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <span className="text-xl font-bold text-gold">3</span>
                  </div>
                  <h4 className="font-semibold mb-2">Share Knowledge</h4>
                  <p className="text-sm text-muted-foreground">
                    Mentor others and contribute to team learning for collective growth
                  </p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border text-center">
                <p className="text-muted-foreground italic">
                  "The intersection of human insight and artificial intelligence creates 
                  the most powerful solutions for complex business challenges."
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center">
          <Card className="p-12 gradient-luxury">
            <CardContent className="p-0">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Let's Collaborate
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Interested in discussing how these skills can drive results for your organization? 
                Or curious about my approach to AI-enhanced sales processes? Let's connect.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">
                    Discuss Opportunities
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link href="/experience">
                  <Button size="lg" variant="outline">
                    View Experience
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </motion.div>
    </main>
  );
}