'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Brain, Mail, HelpCircle, Zap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface EmailSummaryResult {
  tldr: string;
  tags: string[];
  priority: 'Low' | 'Medium' | 'High';
}

interface DiscoveryQuestion {
  question: string;
  category: string;
  reasoning: string;
}

export default function DemosPage() {
  const [emailText, setEmailText] = useState('');
  const [emailSummary, setEmailSummary] = useState<EmailSummaryResult | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState('');
  const [discoveryQuestions, setDiscoveryQuestions] = useState<DiscoveryQuestion[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

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

  const industries = [
    'Financial Services',
    'Technology',
    'Healthcare',
    'Manufacturing',
    'Retail',
    'Real Estate',
    'Professional Services'
  ];

  const processEmail = () => {
    setIsProcessing(true);
    
    setTimeout(() => {
      // Offline heuristic analysis
      const text = emailText.toLowerCase();
      let priority: 'Low' | 'Medium' | 'High' = 'Medium';
      let tags: string[] = [];

      // Priority detection
      if (text.includes('urgent') || text.includes('asap') || text.includes('immediately')) {
        priority = 'High';
      } else if (text.includes('when you have time') || text.includes('no rush')) {
        priority = 'Low';
      }

      // Tag detection
      if (text.includes('renew') || text.includes('contract') || text.includes('expiring')) {
        tags.push('renewal');
      }
      if (text.includes('expand') || text.includes('additional') || text.includes('more')) {
        tags.push('expansion');
      }
      if (text.includes('concern') || text.includes('issue') || text.includes('problem')) {
        tags.push('risk');
      }
      if (text.includes('ceo') || text.includes('executive') || text.includes('decision')) {
        tags.push('executive');
      }
      if (text.includes('meeting') || text.includes('call') || text.includes('discuss')) {
        tags.push('meeting-request');
      }

      // Generate TLDR
      const tldr = emailText.length > 100 
        ? `Client communication regarding ${tags.length > 0 ? tags[0] : 'business matters'}. Key points identified for follow-up action.`
        : 'Brief client communication requiring attention.';

      setEmailSummary({
        tldr,
        tags: tags.length > 0 ? tags : ['general'],
        priority
      });
      
      setIsProcessing(false);
    }, 1500);
  };

  const generateQuestions = (industry: string) => {
    setIsProcessing(true);
    
    setTimeout(() => {
      // Offline question generation based on industry
      const questionSets: Record<string, DiscoveryQuestion[]> = {
        'Financial Services': [
          {
            question: 'What regulatory requirements are driving your current technology initiatives?',
            category: 'Compliance',
            reasoning: 'Financial services face unique regulatory pressures that often drive tech decisions'
          },
          {
            question: 'How are you currently measuring and reporting on risk exposure across your portfolio?',
            category: 'Risk Management',
            reasoning: 'Risk visibility is crucial for financial institutions and often requires specialized tools'
          },
          {
            question: 'What challenges are you experiencing with real-time data processing for trading or client reporting?',
            category: 'Data & Analytics',
            reasoning: 'Real-time processing capabilities are competitive advantages in financial services'
          }
        ],
        'Technology': [
          {
            question: 'What percentage of your development resources are currently allocated to maintaining legacy systems?',
            category: 'Technical Debt',
            reasoning: 'Tech companies often struggle with balancing innovation and maintenance'
          },
          {
            question: 'How are you measuring developer productivity and identifying bottlenecks in your CI/CD pipeline?',
            category: 'DevOps Efficiency',
            reasoning: 'Developer productivity directly impacts time-to-market for tech companies'
          },
          {
            question: 'What strategies are you using to attract and retain top engineering talent in this competitive market?',
            category: 'Talent Management',
            reasoning: 'Talent acquisition and retention are critical challenges for tech companies'
          }
        ],
        'Healthcare': [
          {
            question: 'How are you ensuring patient data security while enabling interoperability between systems?',
            category: 'Data Security & Compliance',
            reasoning: 'Healthcare organizations must balance security with data accessibility'
          },
          {
            question: 'What metrics are you tracking to measure patient satisfaction and clinical outcomes?',
            category: 'Quality Metrics',
            reasoning: 'Outcome measurement is increasingly important for healthcare organizations'
          },
          {
            question: 'How are you leveraging AI or machine learning to improve diagnostic accuracy or operational efficiency?',
            category: 'AI & Innovation',
            reasoning: 'Healthcare is rapidly adopting AI for both clinical and operational improvements'
          }
        ]
      };

      const questions = questionSets[industry] || [
        {
          question: 'What are the top 3 business challenges keeping your leadership team up at night?',
          category: 'Strategic Priorities',
          reasoning: 'Understanding strategic challenges helps identify solution fit'
        },
        {
          question: 'How do you currently measure success in this area, and what would improvement look like?',
          category: 'Success Metrics',
          reasoning: 'Establishing baseline metrics is crucial for demonstrating value'
        }
      ];

      setDiscoveryQuestions(questions);
      setIsProcessing(false);
    }, 1500);
  };

  const sampleEmail = `Hi Shayan,

Hope you're doing well! I wanted to touch base regarding our contract renewal coming up in Q1. 

We've been really happy with the solution, but I need to discuss a few concerns with my team before we finalize. The CEO has some questions about ROI and wants to explore additional modules for our European operations.

Can we schedule a call this week to discuss? This is somewhat urgent as we need to present to the board next Friday.

Thanks,
Sarah Johnson
VP Operations`;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-20 px-6"
    >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            AI <span className="text-gold">Demos</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            See how I leverage artificial intelligence to enhance sales processes, 
            extract insights from communications, and improve client engagement.
          </p>
        </motion.div>

        {/* Demos Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Email Summarizer */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Mail className="w-6 h-6 text-gold" />
                  Email Summarizer
                </CardTitle>
                <p className="text-muted-foreground">
                  AI-powered tool that extracts key insights from client emails, 
                  identifies priority levels, and suggests appropriate tags for follow-up.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Paste Client Email
                  </label>
                  <Textarea
                    placeholder="Paste email content here..."
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                    rows={8}
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    onClick={processEmail}
                    disabled={!emailText.trim() || isProcessing}
                    className="flex-1"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" />
                        Analyze Email
                      </>
                    )}
                  </Button>
                  
                  <Button
                    variant="outline"
                    onClick={() => setEmailText(sampleEmail)}
                  >
                    Load Sample
                  </Button>
                </div>

                {/* Results */}
                {emailSummary && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 p-4 rounded-xl bg-muted/50"
                  >
                    <div>
                      <h4 className="font-semibold mb-2">TLDR Summary</h4>
                      <p className="text-sm text-muted-foreground">{emailSummary.tldr}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Priority Level</h4>
                      <Badge 
                        variant={emailSummary.priority === 'High' ? 'default' : 'outline'}
                        className={emailSummary.priority === 'High' ? 'bg-red-500' : ''}
                      >
                        {emailSummary.priority}
                      </Badge>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Identified Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {emailSummary.tags.map((tag) => (
                          <Badge key={tag} variant="skill">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Discovery Question Helper */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <HelpCircle className="w-6 h-6 text-gold" />
                  Discovery Assistant
                </CardTitle>
                <p className="text-muted-foreground">
                  Generate intelligent follow-up questions based on industry context 
                  to uncover deeper client needs and pain points.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Select Industry
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {industries.map((industry) => (
                      <Button
                        key={industry}
                        variant={selectedIndustry === industry ? "default" : "outline"}
                        size="sm"
                        onClick={() => setSelectedIndustry(industry)}
                        className="text-xs"
                      >
                        {industry}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => generateQuestions(selectedIndustry)}
                  disabled={!selectedIndustry || isProcessing}
                  className="w-full"
                >
                  {isProcessing ? (
                    <>
                      <motion.div
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 mr-2" />
                      Generate Questions
                    </>
                  )}
                </Button>

                {/* Questions Results */}
                {discoveryQuestions.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    {discoveryQuestions.map((item, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-xl bg-muted/50 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-medium text-sm leading-relaxed">
                            {item.question}
                          </h4>
                          <Badge variant="outline" className="text-xs">
                            {item.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground italic">
                          {item.reasoning}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Implementation Notes */}
        <motion.div variants={itemVariants} className="mb-16">
          <Card className="p-8 gradient-executive">
            <CardContent className="p-0">
              <h2 className="text-2xl font-heading font-bold mb-4 flex items-center gap-2">
                <Brain className="w-6 h-6 text-gold" />
                How I Use AI in Practice
              </h2>
              
              <div className="grid md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-3">
                  <h4 className="font-semibold">Workflow Integration</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• Email preprocessing for priority triage</li>
                    <li>• Automated meeting note summarization</li>
                    <li>• Account health scoring based on communication patterns</li>
                    <li>• Competitive intelligence from public data</li>
                  </ul>
                </div>
                
                <div className="space-y-3">
                  <h4 className="font-semibold">Results Achieved</h4>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>• 40% reduction in email processing time</li>
                    <li>• 25% improvement in meeting preparation quality</li>
                    <li>• Earlier identification of at-risk accounts</li>
                    <li>• More strategic conversation starters</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-border">
                <p className="text-muted-foreground text-sm">
                  <strong>Note:</strong> These demos use offline heuristics for demonstration purposes. 
                  In production, I integrate with GPT-4, Claude, or custom fine-tuned models depending 
                  on the specific use case and data sensitivity requirements.
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
                Interested in AI-Enhanced Sales?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                These are just simple examples of how AI can transform sales workflows. 
                I'd love to discuss more advanced applications and how they could benefit your organization.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button size="lg">
                    Discuss AI Solutions
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