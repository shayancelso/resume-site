'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Moon, Sun, Menu, X, Download, Mail } from 'lucide-react';
import { cn, copyToClipboard, downloadFile } from '@/lib/utils';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Skills', href: '/skills' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
    
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark', newTheme === 'dark');
  };

  const handleEmailCopy = async () => {
    const success = await copyToClipboard('shayan.mirzazadeh@gmail.com');
    if (success) {
      // You could add a toast notification here
    }
  };

  const handleResumeDownload = () => {
    downloadFile('/resume.pdf', 'Shayan_Mirzazadeh_Resume.pdf');
  };

  return (
    <>
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:shadow-lg focus:transition-all"
      >
        Skip to main content
      </a>
      
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'glass backdrop-blur-md shadow-lg' : 'bg-transparent'
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="text-2xl font-heading font-bold text-gold"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                SM
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors duration-200 relative group"
                  >
                    {item.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gold transition-all duration-200 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Actions */}
            <div className="hidden md:flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleEmailCopy}
                className="hover:bg-gold/10"
              >
                <Mail className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={handleResumeDownload}
                className="hover:bg-gold/10"
              >
                <Download className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-gold/10"
              >
                {theme === 'light' ? (
                  <Moon className="h-4 w-4" />
                ) : (
                  <Sun className="h-4 w-4" />
                )}
              </Button>
              
              <Link href="/contact">
                <Button size="sm">
                  Get in Touch
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" aria-hidden="true" />
              ) : (
                <Menu className="h-5 w-5" aria-hidden="true" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            className="md:hidden glass backdrop-blur-md border-t border-border/50"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            role="navigation"
            aria-label="Mobile navigation menu"
          >
            <div className="container mx-auto px-6 py-6">
              <div className="flex flex-col space-y-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                
                <div className="flex items-center space-x-3 pt-4 border-t border-border/50">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleEmailCopy}
                    aria-label="Copy email address to clipboard"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleResumeDownload}
                    aria-label="Download resume PDF"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
                  >
                    {theme === 'light' ? (
                      <Moon className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Sun className="h-4 w-4" aria-hidden="true" />
                    )}
                  </Button>
                  
                  <Link href="/contact">
                    <Button size="sm" onClick={() => setIsMenuOpen(false)}>
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.header>

      {/* Sticky Contact Pill */}
      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link href="/contact">
          <Button className="rounded-full px-6 py-3 shadow-lg hover:shadow-xl">
            <Mail className="w-4 h-4 mr-2" />
            Contact
          </Button>
        </Link>
      </motion.div>
    </>
  );
}