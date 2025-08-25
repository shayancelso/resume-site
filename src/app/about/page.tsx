'use client';

import { motion } from 'framer-motion';
import { CardTilt } from '@/components/CardTilt';
import { getProfile, getYearsOfExperience } from '@/lib/data';
import { MapPin, Calendar, GraduationCap, Briefcase, ArrowRight, Globe, Brain } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  const profile = getProfile();
  const yearsOfExperience = getYearsOfExperience();

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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-white"
    >
      <div className="container">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center section-padding">
          <h1 className="mb-6">
            About <span className="text-chocolate">Me</span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            A strategic account manager with {yearsOfExperience} years of experience, 
            specializing in AI-enhanced sales processes and delivering exceptional results 
            in Toronto's vibrant tech ecosystem.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Card */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <CardTilt>
              <div className="card-clean text-center">
                {/* Profile image */}
                <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden bg-neutral-100">
                  {profile.photo ? (
                    <Image
                      src={profile.photo}
                      alt={`${profile.name} profile picture`}
                      width={192}
                      height={192}
                      className="w-full h-full object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-6xl font-heading font-bold text-chocolate">
                        {profile.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    </div>
                  )}
                </div>
                
                <h2 className="text-2xl font-heading font-bold mb-2 text-black">
                  {profile.name}
                </h2>
                <p className="text-chocolate font-medium mb-4">
                  {profile.title}
                </p>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-center gap-2 text-muted">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-2 text-muted">
                    <Briefcase className="w-4 h-4" />
                    <span>{yearsOfExperience} years experience</span>
                  </div>
                </div>
              </div>
            </CardTilt>
          </motion.div>

          {/* Story & Values */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <div className="card-clean">
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2 text-black">
                    <Globe className="w-6 h-6 text-chocolate" />
                    My Journey
                  </h3>
                  <div className="space-y-4 text-muted leading-relaxed">
                    <p>
                      My career began with a fascination for the intersection of technology and human behavior, 
                      studying <strong className="text-black">Cognitive Systems with a focus on AI and Cognition</strong> at 
                      the University of British Columbia. This unique background gave me insights into how people 
                      think, learn, and make decisions—skills that became invaluable in my sales career.
                    </p>
                    
                    <p>
                      Starting as a Business Operations Analyst at Hyre, I quickly learned the importance of 
                      data-driven decision making and process optimization. This foundation led me to management 
                      consulting at Optimus SBR, where I honed my strategic thinking and client relationship skills 
                      across diverse industries.
                    </p>
                    
                    <p>
                      Today, as an Account Manager at Vena Solutions, I've found my sweet spot in 
                      <strong className="text-black"> expansions and renewals</strong>. My approach combines deep 
                      technical understanding with genuine relationship building, resulting in 
                      <strong className="text-chocolate"> 280% FY25 quota achievement</strong> and recognition as 
                      Rookie of the Year.
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-neutral-200">
                  <h4 className="text-lg font-semibold mb-4 text-black">Core Values</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="badge-minimal">🎯 Results-Driven</div>
                      <p className="text-sm text-muted">
                        Every interaction should deliver measurable value
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="badge-minimal">🤝 Relationship-First</div>
                      <p className="text-sm text-muted">
                        Trust and transparency build lasting partnerships
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="badge-minimal">🚀 Innovation Mindset</div>
                      <p className="text-sm text-muted">
                        Continuously improving processes with AI and automation
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="badge-minimal">📈 Growth Oriented</div>
                      <p className="text-sm text-muted">
                        Always seeking opportunities to expand and improve
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Innovation */}
            <div className="card-clean border-2 border-primary/20 bg-primary/5">
              <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2 text-black">
                <Brain className="w-6 h-6 text-chocolate" />
                AI & Innovation
              </h3>
              <div className="space-y-4 text-muted leading-relaxed">
                <p>
                  I'm passionate about leveraging artificial intelligence to revolutionize sales processes 
                  and deliver superior client outcomes. By integrating AI tools into traditional account 
                  management practices, I've achieved exceptional performance metrics while enhancing 
                  the customer experience.
                </p>
                
                <p>
                  My approach combines data-driven insights with personalized relationship building, 
                  using AI to identify opportunities, predict client needs, and optimize engagement 
                  strategies. This methodology has consistently delivered results that exceed 
                  traditional quota expectations.
                </p>
                
                <div className="flex flex-wrap gap-2 pt-4">
                  <div className="badge-outline">Machine Learning</div>
                  <div className="badge-outline">Process Automation</div>
                  <div className="badge-outline">Data Analytics</div>
                  <div className="badge-outline">Predictive Insights</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Education & Background */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-clean">
              <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2 text-black">
                <GraduationCap className="w-5 h-5 text-chocolate" />
                Education
              </h3>
              <div className="space-y-3">
                <div>
                  <h4 className="font-semibold text-black">Bachelor of Cognitive Systems</h4>
                  <p className="text-sm text-chocolate">AI and Cognition Specialization</p>
                  <p className="text-sm text-muted">University of British Columbia</p>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  Studied the intersection of artificial intelligence, cognitive science, and human-computer 
                  interaction. This interdisciplinary program provided a unique foundation for understanding 
                  both the technical and human aspects of business relationships.
                </p>
              </div>
            </div>

            <div className="card-clean">
              <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2 text-black">
                <Calendar className="w-5 h-5 text-chocolate" />
                Beyond Work
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-muted leading-relaxed">
                  When I'm not optimizing sales processes or building client relationships, you'll find me 
                  exploring new AI tools and automation possibilities. I'm passionate about how technology 
                  can enhance human capabilities rather than replace them.
                </p>
                <p className="text-sm text-muted leading-relaxed">
                  I'm also an avid traveler and cultural enthusiast, always seeking new perspectives 
                  that inform better business strategies. I believe diverse experiences create more innovative solutions.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center pb-20">
          <div className="card-clean p-12 max-w-4xl mx-auto">
            <h2 className="mb-4 text-black">Let's Connect</h2>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              Whether you're interested in discussing opportunities, exploring how AI can transform sales processes, 
              or sharing insights about innovative account management strategies, I'd love to have a conversation.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <div className="btn-chocolate">
                  Get in Touch
                  <ArrowRight className="w-4 h-4" />
                </div>
              </Link>
              
              <Link href="/experience">
                <div className="btn-outline">
                  View My Experience
                </div>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}