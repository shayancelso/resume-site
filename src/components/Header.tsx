'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, Download, Mail, Check } from 'lucide-react';
import { copyToClipboard, downloadFile } from '@/lib/utils';
import Link from 'next/link';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Experience', href: '/experience' },
  { name: 'Skills', href: '/skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Contact', href: '/contact' },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleEmailCopy = async () => {
    const success = await copyToClipboard('shayan.mirzazadeh@gmail.com');
    if (success) {
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2000);
    }
  };

  const handleResumeDownload = () => {
    downloadFile('/resume.pdf', 'Shayan_Mirzazadeh_Resume.pdf');
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:rounded-md"
        style={{ background: '#7c3aed', color: '#fff' }}
      >
        Skip to main content
      </a>

      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04)' : 'none',
        }}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <nav className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <motion.div
                className="text-2xl font-heading font-bold gradient-text"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                SM
              </motion.div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                >
                  <Link
                    href={item.href}
                    className="text-sm font-medium relative group"
                    style={{ color: '#71717a', transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#18181b')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#71717a')}
                  >
                    {item.name}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #8b5cf6, #6366f1)' }}
                    />
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="hidden md:flex items-center space-x-1">
              <button
                onClick={handleEmailCopy}
                className="p-2.5 rounded-lg transition-all duration-200"
                style={{ color: '#a1a1aa' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#18181b';
                  e.currentTarget.style.backgroundColor = '#f4f4f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#a1a1aa';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label={emailCopied ? 'Email copied!' : 'Copy email address'}
              >
                {emailCopied ? <Check className="h-4 w-4" style={{ color: '#22c55e' }} /> : <Mail className="h-4 w-4" />}
              </button>

              <button
                onClick={handleResumeDownload}
                className="p-2.5 rounded-lg transition-all duration-200"
                style={{ color: '#a1a1aa' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#18181b';
                  e.currentTarget.style.backgroundColor = '#f4f4f5';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#a1a1aa';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                aria-label="Download resume"
              >
                <Download className="h-4 w-4" />
              </button>

              <Link
                href="/contact"
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                  color: '#ffffff',
                  boxShadow: '0 2px 10px rgba(124, 58, 237, 0.2)',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 4px 20px rgba(124, 58, 237, 0.3)')}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 2px 10px rgba(124, 58, 237, 0.2)')}
              >
                Connect
              </Link>
            </div>

            <button
              className="md:hidden p-2.5 rounded-lg"
              style={{ color: '#52525b' }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              id="mobile-menu"
              className="md:hidden"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.97)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                borderTop: '1px solid rgba(0,0,0,0.06)',
              }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="container mx-auto px-6 py-6">
                <div className="flex flex-col space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-sm font-medium py-3 px-3 rounded-lg transition-colors"
                      style={{ color: '#52525b' }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div
                    className="flex items-center space-x-2 pt-4 mt-2"
                    style={{ borderTop: '1px solid #e4e4e7' }}
                  >
                    <button onClick={handleEmailCopy} className="p-2.5 rounded-lg" style={{ color: '#a1a1aa' }} aria-label="Copy email">
                      {emailCopied ? <Check className="h-4 w-4" style={{ color: '#22c55e' }} /> : <Mail className="h-4 w-4" />}
                    </button>
                    <button onClick={handleResumeDownload} className="p-2.5 rounded-lg" style={{ color: '#a1a1aa' }} aria-label="Download resume">
                      <Download className="h-4 w-4" />
                    </button>
                    <Link
                      href="/contact"
                      className="ml-auto px-5 py-2.5 rounded-lg text-sm font-medium"
                      style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#ffffff' }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Connect
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      <motion.div
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 1.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Link
          href="/contact"
          className="flex items-center gap-2 px-5 py-3 rounded-full text-sm font-medium shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
            color: '#ffffff',
            boxShadow: '0 4px 20px rgba(124, 58, 237, 0.25)',
          }}
        >
          <Mail className="w-4 h-4" />
          Connect
        </Link>
      </motion.div>
    </>
  );
}
