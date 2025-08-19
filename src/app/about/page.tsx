'use client';

import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CardTilt } from '@/components/CardTilt';
import { getProfile, getYearsOfExperience } from '@/lib/data';
import { MapPin, Calendar, GraduationCap, Briefcase, ArrowRight, Globe } from 'lucide-react';
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
            About <span className="text-gold">Me</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A strategic account manager with {yearsOfExperience} years of experience, 
            currently making the exciting transition from Toronto's vibrant tech scene to 
            Dubai's dynamic business landscape.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-12 mb-20">
          {/* Profile Image & Quick Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <CardTilt>
              <Card className="p-8 text-center">
                <CardContent className="p-0">
                  {/* Profile image */}
                  <div className="w-48 h-48 mx-auto mb-6 rounded-2xl overflow-hidden bg-gradient-to-br from-gold/20 to-sand/40">
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
                        <div className="text-6xl font-heading font-bold text-gold">
                          {profile.name.split(' ').map(n => n[0]).join('')}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <h2 className="text-2xl font-heading font-bold mb-2">
                    {profile.name}
                  </h2>
                  <p className="text-gold font-medium mb-4">
                    {profile.title}
                  </p>
                  
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>{profile.location}</span>
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      <span>{yearsOfExperience} years experience</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardTilt>
          </motion.div>

          {/* Story & Values */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
            <Card className="p-8">
              <CardContent className="p-0 space-y-6">
                <div>
                  <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                    <Globe className="w-6 h-6 text-gold" />
                    My Journey
                  </h3>
                  <div className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      My career began with a fascination for the intersection of technology and human behavior, 
                      studying <strong className="text-foreground">Cognitive Systems with a focus on AI and Cognition</strong> at 
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
                      <strong className="text-foreground"> expansions and renewals</strong>. My approach combines deep 
                      technical understanding with genuine relationship building, resulting in 
                      <strong className="text-gold"> 280% FY25 quota achievement</strong> and recognition as 
                      Rookie of the Year.
                    </p>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-border">
                  <h4 className="text-lg font-semibold mb-4">Core Values</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Badge variant="skill">🎯 Results-Driven</Badge>
                      <p className="text-sm text-muted-foreground">
                        Every interaction should deliver measurable value
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Badge variant="skill">🤝 Relationship-First</Badge>
                      <p className="text-sm text-muted-foreground">
                        Trust and transparency build lasting partnerships
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Badge variant="skill">🚀 Innovation Mindset</Badge>
                      <p className="text-sm text-muted-foreground">
                        Continuously improving processes with AI and automation
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Badge variant="skill">📈 Growth Oriented</Badge>
                      <p className="text-sm text-muted-foreground">
                        Always seeking opportunities to expand and improve
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Dubai Transition */}
            <Card className="p-8 border-gold/30 gradient-premium">
              <CardContent className="p-0">
                <h3 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                  <MapPin className="w-6 h-6 text-gold" />
                  Why Dubai?
                </h3>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Dubai represents the perfect convergence of my professional aspirations and personal growth. 
                    As the Middle East's business hub, it offers unparalleled opportunities to work with 
                    international enterprises while being at the forefront of technological innovation.
                  </p>
                  
                  <p>
                    The city's vision for AI integration and digital transformation aligns perfectly with my 
                    expertise in leveraging technology for business growth. I'm excited to bring my 
                    North American sales experience to this dynamic market while learning from its 
                    unique business culture.
                  </p>
                  
                  <div className="flex flex-wrap gap-2 pt-4">
                    <Badge variant="outline">Global Business Hub</Badge>
                    <Badge variant="outline">Tech Innovation</Badge>
                    <Badge variant="outline">Cultural Diversity</Badge>
                    <Badge variant="outline">Strategic Location</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Education & Background */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-gold" />
                  Education
                </h3>
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold">Bachelor of Cognitive Systems</h4>
                    <p className="text-sm text-gold">AI and Cognition Specialization</p>
                    <p className="text-sm text-muted-foreground">University of British Columbia</p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Studied the intersection of artificial intelligence, cognitive science, and human-computer 
                    interaction. This interdisciplinary program provided a unique foundation for understanding 
                    both the technical and human aspects of business relationships.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0">
                <h3 className="text-xl font-heading font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-gold" />
                  Beyond Work
                </h3>
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    When I'm not optimizing sales processes or building client relationships, you'll find me 
                    exploring new AI tools and automation possibilities. I'm passionate about how technology 
                    can enhance human capabilities rather than replace them.
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    I'm also an avid traveler and cultural enthusiast, which has prepared me well for the 
                    international move to Dubai. I believe that diverse experiences make for better business insights.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div variants={itemVariants} className="text-center">
          <Card className="p-12 gradient-executive">
            <CardContent className="p-0">
              <h2 className="text-3xl font-heading font-bold mb-4">
                Let's Connect
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Whether you're interested in discussing opportunities, sharing insights about the Dubai market, 
                or exploring how AI can transform sales processes, I'd love to have a conversation.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">
                    Get in Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                
                <Link href="/experience">
                  <Button size="lg" variant="outline">
                    View My Experience
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