'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { getProfile } from '@/lib/data';
import { copyToClipboard, downloadFile } from '@/lib/utils';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Download, 
  Copy, 
  Send,
  Clock,
  Globe,
  CheckCircle,
  XCircle,
  ExternalLink
} from 'lucide-react';

export default function ContactPage() {
  const profile = getProfile();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }

    setIsSubmitting(false);
    setTimeout(() => setSubmitStatus('idle'), 5000);
  };

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const handleResumeDownload = () => {
    downloadFile('/resume.pdf', 'Shayan_Mirzazadeh_Resume.pdf');
  };

  return (
    <main className="min-h-screen py-20 px-6">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="min-h-screen"
      >
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-6">
            Get in <span className="text-gold">Touch</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Whether you're exploring opportunities in Dubai, interested in AI-enhanced sales processes, 
            or just want to connect, I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-8">
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Email */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                    <Mail className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">{profile.email}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(profile.email, 'email')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedField === 'email' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Phone */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                    <Phone className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">{profile.phone}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(profile.phone, 'phone')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedField === 'phone' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">{profile.location}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Relocating 2025
                  </Badge>
                </div>

                {/* LinkedIn */}
                <div className="flex items-center gap-4 group">
                  <div className="w-12 h-12 bg-gold/20 rounded-xl flex items-center justify-center">
                    <ExternalLink className="w-5 h-5 text-gold" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">LinkedIn</p>
                    <p className="text-muted-foreground">{profile.linkedin}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(`https://${profile.linkedin}`, 'linkedin')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedField === 'linkedin' ? (
                      <CheckCircle className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="p-8">
              <CardContent className="p-0 space-y-4">
                <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
                
                <Button
                  onClick={handleResumeDownload}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Download Resume (PDF)
                </Button>

                <Button
                  onClick={() => window.open(`https://${profile.linkedin}`, '_blank')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <ExternalLink className="w-4 h-4 mr-3" />
                  Connect on LinkedIn
                </Button>

                <Button
                  onClick={() => window.open(`mailto:${profile.email}`, '_blank')}
                  variant="outline"
                  className="w-full justify-start"
                >
                  <Mail className="w-4 h-4 mr-3" />
                  Send Email
                </Button>
              </CardContent>
            </Card>

            {/* Availability */}
            <Card className="p-8 gradient-executive">
              <CardContent className="p-0">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-gold" />
                  <h3 className="text-lg font-semibold">Availability</h3>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  Currently based in Toronto (EST) and typically respond within 24 hours. 
                  Planning Dubai relocation for 2025.
                </p>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gold" />
                  <span className="text-sm">Open to global opportunities</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card className="p-8">
              <CardHeader>
                <CardTitle className="text-2xl font-heading">
                  Send a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Contact form">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium mb-2">
                        Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="Your name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-describedby="name-help"
                      />
                      <div id="name-help" className="sr-only">
                        Enter your full name for identification
                      </div>
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium mb-2">
                        Email *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        aria-required="true"
                        aria-describedby="email-help"
                      />
                      <div id="email-help" className="sr-only">
                        Enter a valid email address for response
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell me about your opportunity, question, or how we might collaborate..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                      aria-required="true"
                      aria-describedby="message-help"
                    />
                    <div id="message-help" className="sr-only">
                      Describe your inquiry, opportunity, or how we might work together
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full mr-3"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-3" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-green-600 text-sm"
                      role="status"
                      aria-live="polite"
                      aria-label="Form submission success"
                    >
                      <CheckCircle className="w-4 h-4" aria-hidden="true" />
                      Message sent successfully! I'll get back to you soon.
                    </motion.div>
                  )}

                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-2 text-red-600 text-sm"
                      role="alert"
                      aria-live="assertive"
                      aria-label="Form submission error"
                    >
                      <XCircle className="w-4 h-4" aria-hidden="true" />
                      Failed to send message. Please try again or email me directly.
                    </motion.div>
                  )}
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Alternative Contact Methods */}
        <motion.div variants={itemVariants} className="mt-16 text-center">
          <Card className="p-8 gradient-premium">
            <CardContent className="p-0">
              <h3 className="text-xl font-heading font-bold mb-4">
                Prefer a Different Approach?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                No problem! Feel free to reach out through any method that works best for you. 
                I'm always open to meaningful conversations about opportunities, AI in sales, 
                or insights about the Dubai market.
              </p>
              
              <div className="flex flex-wrap justify-center gap-3">
                <Badge variant="outline">Account Management</Badge>
                <Badge variant="outline">Sales Strategy</Badge>
                <Badge variant="outline">AI Workflows</Badge>
                <Badge variant="outline">Dubai Opportunities</Badge>
                <Badge variant="outline">Consulting</Badge>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      </motion.div>
    </main>
  );
}