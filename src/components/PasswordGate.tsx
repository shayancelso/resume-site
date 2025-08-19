'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Lock, Eye, EyeOff } from 'lucide-react';

interface PasswordGateProps {
  children: React.ReactNode;
}

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const correctPassword = 'dubai';

  useEffect(() => {
    // Check if user is already authenticated (stored in sessionStorage)
    const stored = sessionStorage.getItem('resume-authenticated');
    if (stored === 'true') {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password.toLowerCase() === correctPassword) {
      setIsAuthenticated(true);
      sessionStorage.setItem('resume-authenticated', 'true');
      setError('');
    } else {
      setError('Incorrect password. Please try again.');
      setPassword('');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-gold border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-slate-800/50 backdrop-blur-xl border-gold/20">
          <CardHeader className="text-center pb-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <Lock className="w-8 h-8 text-gold" />
            </motion.div>
            <CardTitle className="text-2xl font-heading text-white font-bold">
              Resume Access
            </CardTitle>
            <p className="text-white/90 text-sm mt-2 font-medium">
              This resume is password protected for privacy.
            </p>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-12 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-400 focus:border-gold focus:ring-gold/20"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              
              {error && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm"
                  role="alert"
                >
                  {error}
                </motion.p>
              )}
              
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-gold to-amber-600 text-slate-900 hover:from-amber-600 hover:to-gold font-semibold"
              >
                Access Resume
              </Button>
            </form>
            
            <div className="mt-6 pt-4 border-t border-slate-600">
              <p className="text-xs text-white/70 text-center font-medium">
                For authorized viewers only. This helps maintain professional discretion.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}