'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Construction, ArrowRight, Sparkles } from 'lucide-react';
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
        <motion.div variants={itemVariants} className="mb-20 relative">
          <div className="card-clean p-16 text-center" style={{background: 'linear-gradient(135deg, #1e3a2e 0%, #2d5a3d 50%, #3d7c47 100%)'}}>
            
            {/* Animated construction tools as decorative elements around the main content */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-8 left-8 text-4xl opacity-30"
              >
                🔨
              </motion.div>
              
              <motion.div
                animate={{
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.2, 1]
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute top-12 right-8 text-4xl opacity-30"
              >
                🔧
              </motion.div>
              
              <motion.div
                animate={{
                  rotate: [0, 5, -5, 0],
                  y: [-5, 5, -5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2
                }}
                className="absolute bottom-8 left-12 text-4xl opacity-30"
              >
                ⛑️
              </motion.div>
              
              <motion.div
                animate={{
                  rotate: [0, 3, -3, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-6 right-16 text-5xl opacity-40"
                style={{color: '#ffd700'}}
              >
                🏗️
              </motion.div>
            </div>

            {/* Main content with proper z-index */}
            <div className="relative z-10">
              {/* Main construction icon */}
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
                <div className="w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
                     style={{background: 'linear-gradient(135deg, #2e7d32, #43a047)'}}>
                  <Construction className="w-12 h-12 text-white" />
                </div>
              </motion.div>
              
              <h2 className="mb-6 text-3xl font-bold text-white">🚧 Work in Progress 🚧</h2>
              <p className="text-lg text-green-100 mb-8 max-w-2xl mx-auto">
                Great things take time to build! I'm currently crafting some amazing projects 
                that will be worth the wait.
              </p>

              {/* Animated progress bar */}
              <div className="max-w-md mx-auto mb-8">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-green-200">Progress</span>
                  <span className="text-sm font-medium text-green-200">Building...</span>
                </div>
                <div className="w-full bg-green-800/50 rounded-full h-3 overflow-hidden">
                  <motion.div
                    animate={{
                      width: ["0%", "75%", "0%"],
                      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="h-3 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #4caf50, #66bb6a, #81c784)',
                      backgroundSize: '200% 100%'
                    }}
                  />
                </div>
              </div>
              
              <div className="inline-flex items-center gap-2 font-medium text-green-200">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 180, 360]
                  }}
                  transition={{duration: 2, repeat: Infinity, ease: "linear"}}
                >
                  <Sparkles className="w-5 h-5" />
                </motion.div>
                Expected Launch: Coming Soon!
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [360, 180, 0]
                  }}
                  transition={{duration: 2, repeat: Infinity, ease: "linear", delay: 1}}
                >
                  <Sparkles className="w-5 h-5" />
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