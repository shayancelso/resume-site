'use client';

import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Construction, Hammer, Wrench, HardHat, ArrowRight } from 'lucide-react';
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

  // Floating construction tools animation
  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      rotate: [-5, 5, -5],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const floatingVariants2 = {
    animate: {
      y: [10, -10, 10],
      rotate: [5, -5, 5],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: 0.5
      }
    }
  };

  // Construction crane animation
  const craneVariants = {
    animate: {
      rotate: [0, 2, -2, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // Progress bar animation
  const progressVariants = {
    animate: {
      width: ["0%", "75%", "0%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
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
          <div className="badge-chocolate mb-4 inline-block">
            Coming Soon
          </div>
          <h1 className="mb-6">
            Projects <span className="text-chocolate">Under Construction</span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Exciting projects are currently in development. 
            Check back soon to see what I've been working on!
          </p>
        </motion.div>

        {/* Construction Animation Section */}
        <motion.div variants={itemVariants} className="mb-20">
          <div className="relative card-clean p-16 text-center overflow-hidden" style={{background: 'linear-gradient(135deg, #f8f9ff 0%, #fff5e6 100%)'}}>
            {/* Floating background elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Construction tools floating around */}
              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute top-10 left-10 w-12 h-12 rounded-full flex items-center justify-center"
                style={{background: 'linear-gradient(45deg, #ff9a56, #ffa726)'}}
              >
                <Hammer className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                variants={floatingVariants2}
                animate="animate"
                className="absolute top-16 right-16 w-12 h-12 rounded-full flex items-center justify-center"
                style={{background: 'linear-gradient(45deg, #42a5f5, #64b5f6)'}}
              >
                <Wrench className="w-6 h-6 text-white" />
              </motion.div>

              <motion.div
                variants={floatingVariants}
                animate="animate"
                className="absolute bottom-20 left-20 w-12 h-12 rounded-full flex items-center justify-center"
                style={{background: 'linear-gradient(45deg, #66bb6a, #81c784)'}}
              >
                <HardHat className="w-6 h-6 text-white" />
              </motion.div>

              {/* Construction crane */}
              <motion.div
                variants={craneVariants}
                animate="animate"
                className="absolute top-4 right-4 text-6xl"
                style={{color: '#f57c00'}}
              >
                🏗️
              </motion.div>
            </div>

            {/* Main construction icon */}
            <div className="relative z-10">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="flex justify-center mb-8"
              >
                <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-lg"
                     style={{background: 'linear-gradient(135deg, #ff6b35, #f7931e)'}}>
                  <Construction className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              
              <h2 className="mb-6 text-3xl font-bold">🚧 Work in Progress 🚧</h2>
              <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
                Great things take time to build! I'm currently crafting some amazing projects 
                that will be worth the wait. 
              </p>

              {/* Animated progress bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-muted">Progress</span>
                  <span className="text-sm font-medium text-chocolate">Building...</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                  <motion.div
                    variants={progressVariants}
                    animate="animate"
                    className="h-3 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #ff6b35, #f7931e, #42a5f5)',
                      backgroundSize: '200% 100%'
                    }}
                  />
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 font-medium" style={{color: '#ff6b35'}}>
                <motion.div
                  animate={{rotate: 360}}
                  transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                >
                  ⚡
                </motion.div>
                Expected Launch: Coming Soon!
                <motion.div
                  animate={{rotate: 360}}
                  transition={{duration: 2, repeat: Infinity, ease: "linear", delay: 1}}
                >
                  ⚡
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mb-20">
          <div className="card-clean p-10 bg-section-alt border-neutral-300">
            <h3 className="text-2xl font-heading font-bold mb-4">
              Want to Stay Updated?
            </h3>
            <p className="text-lg text-muted mb-8 max-w-2xl mx-auto">
              While the projects are in development, feel free to explore my experience 
              and get in touch if you'd like to connect!
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