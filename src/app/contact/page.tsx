'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
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
  ExternalLink,
  Linkedin
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
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

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
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = async (text: string, field: string) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
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
          <h1 className="mb-6">
            Let's <span className="text-chocolate">Connect</span>
          </h1>
          <p className="text-xl text-muted max-w-3xl mx-auto">
            Ready to discuss AI-enhanced account management strategies, collaboration opportunities, 
            or just want to say hello? I'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 pb-20">
          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <div className="card-clean">
              <h2 className="text-2xl font-heading font-bold mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="John Smith"
                      className="w-full"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@company.com"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    placeholder="Tell me about your project, opportunity, or just say hello..."
                    rows={6}
                    className="w-full"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted">
                    I typically respond within 24 hours
                  </div>
                  
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </div>

                {submitStatus === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg"
                  >
                    <CheckCircle className="h-5 w-5" />
                    <span>Message sent successfully! I'll get back to you soon.</span>
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg"
                  >
                    <XCircle className="h-5 w-5" />
                    <span>Failed to send message. Please try again or use direct email.</span>
                  </motion.div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div variants={itemVariants} className="space-y-6">
            {/* Direct Contact */}
            <div className="card-clean">
              <h3 className="text-xl font-heading font-bold mb-4">Direct Contact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-chocolate" />
                    </div>
                    <div>
                      <div className="font-medium">Email</div>
                      <div className="text-sm text-muted">{profile.email}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(profile.email, 'email')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedField === 'email' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center justify-between group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                      <Phone className="w-5 h-5 text-chocolate" />
                    </div>
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-sm text-muted">{profile.phone}</div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(profile.phone, 'phone')}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedField === 'phone' ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-chocolate" />
                  </div>
                  <div>
                    <div className="font-medium">Location</div>
                    <div className="text-sm text-muted">{profile.location}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="card-clean">
              <h3 className="text-xl font-heading font-bold mb-4">Professional Links</h3>
              <div className="space-y-3">
                <a
                  href={`https://${profile.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group"
                >
                  <div className="w-10 h-10 bg-neutral-100 rounded-lg flex items-center justify-center">
                    <Linkedin className="w-5 h-5 text-chocolate" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">LinkedIn</div>
                    <div className="text-sm text-muted">Professional network</div>
                  </div>
                  <ExternalLink className="w-4 h-4 text-muted group-hover:text-chocolate transition-colors" />
                </a>
              </div>
            </div>

            {/* Availability */}
            <div className="card-clean">
              <h3 className="text-xl font-heading font-bold mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-chocolate" />
                  <div>
                    <div className="font-medium">Response Time</div>
                    <div className="text-sm text-muted">Usually within 24 hours</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Globe className="w-5 h-5 text-chocolate" />
                  <div>
                    <div className="font-medium">Time Zone</div>
                    <div className="text-sm text-muted">Eastern Time (ET)</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Download Resume */}
            <div className="card-clean border-neutral-300 bg-neutral-50">
              <div className="text-center">
                <h3 className="text-xl font-heading font-bold mb-2">Resume Download</h3>
                <p className="text-sm text-muted mb-4">
                  Get a comprehensive overview of my experience and achievements
                </p>
                <Button
                  onClick={() => downloadFile('/resume.pdf', 'Shayan_Mirzazadeh_Resume.pdf')}
                  className="btn-outline w-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume (PDF)
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}