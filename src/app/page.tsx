'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight, Sparkles, TrendingUp, Award, Shield,
  Brain, Rocket, Target, ChevronDown, ExternalLink, Trophy, Zap,
} from 'lucide-react';
import { getAwards } from '@/lib/data';

/* ── Rotating taglines ── */
const phrases = [
  'scale enterprise revenue',
  'build AI-powered GTM motions',
  'turn prospects into champions',
  'crush quota by 280%',
  'drive product-led growth',
];

/* ── Game: achievement definitions ── */
const gameAchievements = [
  {
    value: '280%', label: 'FY25 Quota', sub: 'Achievement',
    icon: TrendingUp, rarity: 'Legendary', rarityColor: '#f59e0b',
    gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
  },
  {
    value: '320%', label: 'Peak Quarter', sub: 'Performance',
    icon: Rocket, rarity: 'Epic', rarityColor: '#8b5cf6',
    gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)',
  },
  {
    value: '100%', label: 'Client Retention', sub: 'GRR',
    icon: Shield, rarity: 'Rare', rarityColor: '#3b82f6',
    gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)',
  },
  {
    value: '3', label: 'Awards', sub: 'in 2024',
    icon: Award, rarity: 'Uncommon', rarityColor: '#22c55e',
    gradient: 'linear-gradient(135deg, #4ade80, #22c55e)',
  },
];

const thresholds = [150, 400, 750, 1200]; // $K to unlock each
const dealSizes = [25, 50, 75, 100, 125, 150];

/* ── GTM Playbook ── */
const playbook = [
  {
    icon: Target,
    title: 'Land & Expand',
    body: 'Strategic account penetration through executive alignment, consultative selling, and multi-threaded relationships that drive expansion revenue.',
    tags: ['280% quota', 'C-suite access', 'Complex deals'],
  },
  {
    icon: Shield,
    title: 'Retain & Grow',
    body: '100% gross revenue retention through proactive value realization, strategic business reviews, and deep product-adoption partnerships.',
    tags: ['100% GRR', 'SBR leadership', 'Value mapping'],
  },
  {
    icon: Brain,
    title: 'AI-Powered GTM',
    body: 'Leveraging AI tools to supercharge GTM workflows — from deal intelligence and email optimization to forecasting and pipeline analysis.',
    tags: ['40% efficiency gain', '5+ AI tools', 'Automation'],
  },
];

/* ── Skills with ranks ── */
const skills = [
  { name: 'Expansion & Renewals', level: 98 },
  { name: 'Account Management', level: 95 },
  { name: 'Consultative Selling', level: 94 },
  { name: 'Stakeholder Management', level: 93 },
  { name: 'Business Development', level: 90 },
  { name: 'AI & Automation', level: 87 },
];

function getRank(level: number) {
  if (level >= 95) return { letter: 'S', color: '#f59e0b', bg: 'rgba(245,158,11,0.1)' };
  if (level >= 90) return { letter: 'A', color: '#8b5cf6', bg: 'rgba(139,92,246,0.08)' };
  if (level >= 85) return { letter: 'B', color: '#3b82f6', bg: 'rgba(59,130,246,0.08)' };
  return { letter: 'C', color: '#22c55e', bg: 'rgba(34,197,94,0.08)' };
}

/* ── Animation variants ── */
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] } },
};

/* ════════════════════════════════════════════════════════════════════════════ */

export default function HomePage() {
  const awards = getAwards();
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  /* ── Slot machine state ── */
  const [spinning, setSpinning] = useState(false);
  const [revealed, setRevealed] = useState([false, false, false, false]);
  const [reelTexts, setReelTexts] = useState(['???', '???', '???', '???']);
  const [hasSpun, setHasSpun] = useState(false);
  const [confettiReels, setConfettiReels] = useState<number[]>([]);
  const intervalsRef = useRef<ReturnType<typeof setInterval>[]>([]);

  /* ── Phrase rotation ── */
  useEffect(() => {
    const id = setInterval(() => setPhraseIdx((i) => (i + 1) % phrases.length), 3000);
    return () => clearInterval(id);
  }, []);

  /* ── Cursor glow ── */
  useEffect(() => {
    const handler = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  /* ── Spin the reels ── */
  const spinReels = () => {
    if (spinning || hasSpun) return;
    setSpinning(true);

    const randomVals = ['142%', '87%', '203%', '95%', '64%', '177%', '312%', '56%', '245%', '73%', '291%', '118%'];

    // Start all reels cycling
    const intervals = gameAchievements.map((_, i) => {
      return setInterval(() => {
        setReelTexts((prev) => {
          const next = [...prev];
          next[i] = randomVals[Math.floor(Math.random() * randomVals.length)];
          return next;
        });
      }, 55 + i * 15);
    });
    intervalsRef.current = intervals;

    // Stop reels one by one with staggered timing
    gameAchievements.forEach((a, i) => {
      setTimeout(() => {
        clearInterval(intervals[i]);
        setReelTexts((prev) => {
          const next = [...prev];
          next[i] = a.value;
          return next;
        });
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
        // Confetti for this reel
        setConfettiReels((prev) => [...prev, i]);
        setTimeout(() => setConfettiReels((prev) => prev.filter((r) => r !== i)), 1000);
        // All done?
        if (i === gameAchievements.length - 1) {
          setSpinning(false);
          setHasSpun(true);
        }
      }, 1000 + i * 600);
    });
  };

  // Cleanup intervals on unmount
  useEffect(() => {
    return () => intervalsRef.current.forEach(clearInterval);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed inset-0 z-0 hidden md:block"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(124,58,237,0.03), transparent 40%)`,
          transition: 'background 0.15s',
        }}
      />

      {/* Background */}
      <div className="fixed inset-0 -z-10" style={{ backgroundColor: '#ffffff' }}>
        <div className="absolute inset-0 bg-dot-grid opacity-[0.4]" />
        <div
          className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] rounded-full blur-[160px] animate-pulse-slow"
          style={{ backgroundColor: 'rgba(139,92,246,0.06)' }}
        />
        <div
          className="absolute bottom-[-5%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[140px] animate-pulse-slow"
          style={{ backgroundColor: 'rgba(96,165,250,0.04)', animationDelay: '3s' }}
        />
      </div>

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="min-h-[92vh] flex items-center pt-24 pb-12 md:pt-32 md:pb-20 relative">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-20 items-center">
            {/* Left */}
            <motion.div
              className="lg:col-span-3 space-y-8 text-center lg:text-left"
              variants={stagger}
              initial="hidden"
              animate="visible"
            >
              <motion.div variants={fadeUp}>
                <span
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium"
                  style={{ background: '#ede9fe', border: '1px solid rgba(124,58,237,0.15)', color: '#7c3aed' }}
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  Open to GTM Opportunities
                </span>
              </motion.div>

              <motion.div variants={fadeUp} className="space-y-3">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold leading-[1.05]">
                  <span style={{ color: '#18181b' }}>Shayan</span><br />
                  <span className="gradient-text">Mirzazadeh</span>
                </h1>
                <div
                  className="text-xl md:text-2xl flex flex-wrap items-center justify-center lg:justify-start gap-x-2"
                  style={{ color: '#71717a', minHeight: '2.25rem' }}
                >
                  <span>I help companies</span>
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={phraseIdx}
                      className="gradient-text font-semibold"
                      initial={{ opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -14 }}
                      transition={{ duration: 0.3 }}
                    >
                      {phrases[phraseIdx]}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </motion.div>

              <motion.p variants={fadeUp} className="text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed" style={{ color: '#52525b' }}>
                Sr.&nbsp;Account Manager with a track record of{' '}
                <span className="font-semibold" style={{ color: '#18181b' }}>280% quota achievement</span> and{' '}
                <span className="font-semibold" style={{ color: '#18181b' }}>100% client retention</span>.
                Passionate about AI-driven GTM strategies and building scalable revenue engines.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/experience" className="btn-glow group">
                  View My Playbook
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/contact" className="btn-glass">Let&apos;s Talk</Link>
              </motion.div>

              {/* Stats + XP */}
              <motion.div variants={fadeUp} className="space-y-4 pt-2">
                <div className="flex items-center gap-6 sm:gap-8 justify-center lg:justify-start">
                  {[
                    { val: '280%', label: 'QUOTA' },
                    { val: '100%', label: 'RETENTION' },
                    { val: String(awards.length), label: 'AWARDS' },
                  ].map((s, i) => (
                    <div key={s.label} className="flex items-center gap-6 sm:gap-8">
                      {i > 0 && <div className="w-px h-8" style={{ background: '#e4e4e7' }} />}
                      <div className="text-center">
                        <div className="text-2xl font-bold" style={{ color: '#18181b' }}>{s.val}</div>
                        <div className="text-[10px] tracking-[0.2em] font-medium" style={{ color: '#a1a1aa' }}>{s.label}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="max-w-xs mx-auto lg:mx-0">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-semibold" style={{ color: '#7c3aed' }}>
                      <Zap className="w-3 h-3 inline mr-1" />LVL 8 — Sr. Account Manager
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: '#a1a1aa' }}>7+ yrs XP</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#f4f4f5' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: 'linear-gradient(90deg, #8b5cf6, #6366f1, #4f46e5)' }}
                      initial={{ width: 0 }}
                      animate={{ width: '78%' }}
                      transition={{ duration: 2, delay: 1, ease: [0.25, 0.4, 0.25, 1] }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right: photo */}
            <motion.div
              className="lg:col-span-2 flex justify-center"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.4, 0.25, 1] }}
            >
              <div className="relative">
                <div
                  className="absolute -inset-8 rounded-full opacity-50"
                  style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)' }}
                />
                <div
                  className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-[420px] md:h-[420px] rounded-full overflow-hidden"
                  style={{ border: '3px solid rgba(124,58,237,0.15)', boxShadow: '0 8px 40px rgba(124,58,237,0.1)' }}
                >
                  <Image src="/images/shayan-hero.jpeg" alt="Shayan Mirzazadeh" fill className="object-cover object-top" priority />
                </div>

                <motion.div
                  className="absolute -top-1 -right-1 sm:top-2 sm:right-2 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #8b5cf6, #7c3aed)', color: '#fff', boxShadow: '0 2px 12px rgba(124,58,237,0.3)' }}
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                >
                  LVL 8
                </motion.div>

                <motion.div
                  className="absolute -right-2 sm:-right-6 top-16 sm:top-20 px-3 py-2 rounded-lg shadow-md"
                  style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" style={{ color: '#22c55e' }} />
                    <span className="text-xs font-semibold" style={{ color: '#18181b' }}>280% Quota</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute -left-2 sm:-left-6 bottom-20 sm:bottom-28 px-3 py-2 rounded-lg shadow-md"
                  style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4" style={{ color: '#f59e0b' }} />
                    <span className="text-xs font-semibold" style={{ color: '#18181b' }}>Rookie of Year</span>
                  </div>
                </motion.div>

                <motion.div
                  className="absolute right-4 sm:right-2 bottom-4 sm:bottom-10 px-3 py-2 rounded-lg shadow-md"
                  style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(12px)', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 4px 16px rgba(0,0,0,0.06)' }}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                >
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4" style={{ color: '#8b5cf6' }} />
                    <span className="text-xs font-semibold" style={{ color: '#18181b' }}>AI Native</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
        <motion.div className="absolute bottom-6 left-1/2 -translate-x-1/2" animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <ChevronDown className="w-5 h-5" style={{ color: '#d4d4d8' }} />
        </motion.div>
      </section>

      {/* ═══════════════ SLOT MACHINE ═══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#faf8ff' }}>
        <div className="container">
          <motion.div
            className="text-center mb-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="badge-chocolate mb-4 inline-flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5" />
              Career Achievements
            </span>
            <h2 className="text-3xl md:text-4xl font-heading mb-2">Spin to reveal my stats</h2>
            <p style={{ color: '#71717a' }}>One spin. Four real career achievements. Give it a pull.</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {/* Slot machine frame */}
            <div
              className="rounded-2xl p-6 sm:p-8 md:p-10 relative overflow-hidden"
              style={{
                background: '#ffffff',
                border: '1px solid #e4e4e7',
                boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              }}
            >
              {/* Decorative top bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{ background: 'linear-gradient(90deg, #f59e0b, #8b5cf6, #3b82f6, #22c55e)' }}
              />

              {/* Reel cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mb-8">
                {gameAchievements.map((a, i) => {
                  const Icon = a.icon;
                  const isRevealed = revealed[i];
                  const isSpinning = spinning && !isRevealed;
                  const showConfetti = confettiReels.includes(i);
                  return (
                    <motion.div
                      key={a.label}
                      className={`relative rounded-xl p-5 sm:p-6 text-center overflow-hidden ${
                        isRevealed ? `rarity-${a.rarity.toLowerCase()}` : ''
                      }`}
                      style={{
                        background: isRevealed ? '#ffffff' : '#faf8ff',
                        border: `1px solid ${isRevealed ? '#e4e4e7' : '#e4e4e7'}`,
                        boxShadow: isRevealed ? `0 4px 20px ${a.rarityColor}15` : 'inset 0 1px 3px rgba(0,0,0,0.04)',
                      }}
                      animate={showConfetti ? { scale: [1, 1.06, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Confetti burst on reveal */}
                      {showConfetti && (
                        <div className="absolute inset-0 pointer-events-none overflow-visible z-10">
                          {Array.from({ length: 14 }).map((_, j) => {
                            const angle = (j / 14) * Math.PI * 2;
                            const dist = 35 + Math.random() * 25;
                            return (
                              <motion.div
                                key={j}
                                className="absolute rounded-full"
                                style={{
                                  width: 4 + Math.random() * 3,
                                  height: 4 + Math.random() * 3,
                                  backgroundColor: a.rarityColor,
                                  left: '50%',
                                  top: '50%',
                                }}
                                initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                                animate={{
                                  x: Math.cos(angle) * dist,
                                  y: Math.sin(angle) * dist,
                                  opacity: 0,
                                  scale: 0,
                                }}
                                transition={{ duration: 0.7, ease: 'easeOut', delay: j * 0.02 }}
                              />
                            );
                          })}
                        </div>
                      )}

                      {isRevealed ? (
                        /* ── Revealed state ── */
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <span className="text-[9px] font-bold tracking-[0.15em] uppercase" style={{ color: a.rarityColor }}>
                              {a.rarity}
                            </span>
                            <span className="text-[8px] font-bold tracking-widest uppercase" style={{ color: '#a1a1aa' }}>
                              UNLOCKED
                            </span>
                          </div>
                          <div
                            className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                            style={{ background: a.gradient }}
                          >
                            <Icon className="w-5 h-5" style={{ color: '#fff' }} />
                          </div>
                          <div className="text-2xl sm:text-3xl font-bold" style={{ color: '#18181b' }}>{a.value}</div>
                          <div className="text-sm font-medium" style={{ color: '#52525b' }}>{a.label}</div>
                          <div className="text-xs" style={{ color: '#a1a1aa' }}>{a.sub}</div>
                        </motion.div>
                      ) : (
                        /* ── Spinning / idle state ── */
                        <div>
                          <div
                            className="w-10 h-10 rounded-xl mx-auto mb-3 flex items-center justify-center"
                            style={{ background: isSpinning ? '#ede9fe' : '#f4f4f5' }}
                          >
                            {isSpinning ? (
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
                              >
                                <Sparkles className="w-5 h-5" style={{ color: '#8b5cf6' }} />
                              </motion.div>
                            ) : (
                              <span className="text-lg">🔒</span>
                            )}
                          </div>
                          <div
                            className="text-2xl sm:text-3xl font-bold font-mono tabular-nums"
                            style={{
                              color: isSpinning ? '#8b5cf6' : '#d4d4d8',
                              filter: isSpinning ? 'blur(0.5px)' : 'none',
                              transition: 'color 0.2s',
                            }}
                          >
                            {reelTexts[i]}
                          </div>
                          <div className="text-sm font-medium mt-1" style={{ color: '#d4d4d8' }}>
                            {isSpinning ? 'Spinning...' : '?????'}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Spin button / result */}
              <div className="text-center">
                {!hasSpun ? (
                  <motion.button
                    onClick={spinReels}
                    disabled={spinning}
                    className="px-10 py-4 rounded-2xl font-bold text-lg cursor-pointer select-none disabled:cursor-not-allowed"
                    style={{
                      background: spinning
                        ? '#e4e4e7'
                        : 'linear-gradient(135deg, #8b5cf6, #7c3aed)',
                      color: spinning ? '#a1a1aa' : '#ffffff',
                      boxShadow: spinning ? 'none' : '0 4px 24px rgba(124,58,237,0.3)',
                    }}
                    whileHover={spinning ? {} : { scale: 1.04, boxShadow: '0 8px 35px rgba(124,58,237,0.4)' }}
                    whileTap={spinning ? {} : { scale: 0.93 }}
                  >
                    {spinning ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="inline-block"
                        >
                          <Sparkles className="w-5 h-5" />
                        </motion.span>
                        Revealing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Trophy className="w-5 h-5" />
                        Spin to Reveal
                      </span>
                    )}
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-semibold"
                    style={{ color: '#22c55e' }}
                  >
                    All achievements revealed! These are real career stats from 2024.
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PROJECTS ═══════════════ */}
      <section id="projects" className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-chocolate mb-4 inline-flex items-center gap-1.5"><Rocket className="w-3.5 h-3.5" />What I&apos;m Building</span>
            <h2 className="text-3xl md:text-4xl font-heading mb-4">Projects &amp; Ventures</h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#71717a' }}>
              Beyond the day job — building products, tools, and companies at the intersection of GTM and AI.
            </p>
          </motion.div>

          <div className="space-y-6">
            {/* Featured: Gloo */}
            <motion.a
              href="https://buildwithgloo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-2xl overflow-hidden group"
              style={{ background: '#ffffff', border: '1px solid #e4e4e7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ borderColor: 'rgba(124,58,237,0.25)', boxShadow: '0 8px 30px rgba(124,58,237,0.06)', y: -2 }}
            >
              <div className="grid md:grid-cols-5 gap-0">
                <div className="md:col-span-2 relative h-48 md:h-auto overflow-hidden" style={{ background: '#faf8ff' }}>
                  <Image src="/images/project-gloo.png" alt="Gloo" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="md:col-span-3 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-semibold" style={{ color: '#18181b' }}>Gloo</h3>
                    <span className="text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: '#ede9fe', color: '#7c3aed' }}>Co-Founder</span>
                    <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a1a1aa' }} />
                  </div>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: '#71717a' }}>
                    Consulting-to-build studio creating custom internal tools for GTM teams — dashboards, automations, and AI agents delivered in 2-3 week sprints. Co-founded with Jayne and Ravi.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {['Claude', 'Lovable', 'n8n', 'Zapier', 'Figma'].map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#ede9fe', border: '1px solid rgba(124,58,237,0.12)', color: '#7c3aed' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.a>

            {/* Grid: other projects */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Seat Bee */}
              <motion.a
                href="https://seatbee.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden group"
                style={{ background: '#ffffff', border: '1px solid #e4e4e7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                whileHover={{ borderColor: 'rgba(124,58,237,0.25)', boxShadow: '0 8px 30px rgba(124,58,237,0.06)', y: -2 }}
              >
                <div className="relative h-40 overflow-hidden" style={{ background: '#faf8ff' }}>
                  <Image src="/images/project-seatbee.png" alt="Seat Bee" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold" style={{ color: '#18181b' }}>Seat Bee</h3>
                    <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: '#ede9fe', color: '#7c3aed' }}>Co-Founder</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a1a1aa' }} />
                  </div>
                  <p className="text-sm mb-3" style={{ color: '#71717a' }}>
                    AI-powered seating arrangements for weddings — generates intelligent seating based on guest relationships and constraints.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['AI/ML', 'Weddings', 'SaaS'].map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#f4f4f5', color: '#71717a' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.a>

              {/* Relay */}
              <motion.a
                href="https://relaygtm.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden group"
                style={{ background: '#ffffff', border: '1px solid #e4e4e7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                whileHover={{ borderColor: 'rgba(124,58,237,0.25)', boxShadow: '0 8px 30px rgba(124,58,237,0.06)', y: -2 }}
              >
                <div className="relative h-40 overflow-hidden" style={{ background: '#faf8ff' }}>
                  <Image src="/images/project-relay.png" alt="Relay" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold" style={{ color: '#18181b' }}>Relay</h3>
                    <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: '#ede9fe', color: '#7c3aed' }}>Co-Founder</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a1a1aa' }} />
                  </div>
                  <p className="text-sm mb-3" style={{ color: '#71717a' }}>
                    Account Transition Engine — automates handoffs when reps leave with AI-powered briefs and revenue protection.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Salesforce', 'HubSpot', 'Gong'].map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#f4f4f5', color: '#71717a' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.a>

              {/* Forme Pilates */}
              <motion.a
                href="https://formepilates.app"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl overflow-hidden group"
                style={{ background: '#ffffff', border: '1px solid #e4e4e7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                whileHover={{ borderColor: 'rgba(124,58,237,0.25)', boxShadow: '0 8px 30px rgba(124,58,237,0.06)', y: -2 }}
              >
                <div className="relative h-40 overflow-hidden" style={{ background: '#faf8ff' }}>
                  <Image src="/images/project-forme.png" alt="Forme Pilates" fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-base font-semibold" style={{ color: '#18181b' }}>Forme Pilates</h3>
                    <span className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full" style={{ background: '#f0fdf4', color: '#16a34a' }}>Live</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#a1a1aa' }} />
                  </div>
                  <p className="text-sm mb-3" style={{ color: '#71717a' }}>
                    Mobile app for Pilates instructors to plan classes with intelligent exercise sequencing.
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {['Mobile', 'Fitness', 'AI'].map((t) => (
                      <span key={t} className="text-[11px] px-2 py-0.5 rounded-full" style={{ background: '#f4f4f5', color: '#71717a' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ THE PLAYBOOK ═══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-chocolate mb-4 inline-flex items-center gap-1.5"><Target className="w-3.5 h-3.5" />The Playbook</span>
            <h2 className="text-3xl md:text-4xl font-heading mb-4">How I drive GTM success</h2>
            <p className="max-w-2xl mx-auto" style={{ color: '#71717a' }}>
              A proven framework combining strategic account management, relationship excellence, and AI-powered workflows.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {playbook.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.div
                  key={p.title}
                  className="rounded-xl p-8 group relative overflow-hidden"
                  style={{ background: '#ffffff', border: '1px solid #e4e4e7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15, duration: 0.5 }}
                  whileHover={{ borderColor: 'rgba(124,58,237,0.25)', boxShadow: '0 8px 30px rgba(124,58,237,0.06)', y: -2 }}
                >
                  <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.4), transparent)' }} />
                  <div className="w-12 h-12 rounded-xl mb-6 flex items-center justify-center" style={{ background: '#ede9fe' }}>
                    <Icon className="w-6 h-6" style={{ color: '#7c3aed' }} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3" style={{ color: '#18181b' }}>{p.title}</h3>
                  <p className="text-sm leading-relaxed mb-5" style={{ color: '#71717a' }}>{p.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="text-xs px-2.5 py-1 rounded-full" style={{ background: '#ede9fe', border: '1px solid rgba(124,58,237,0.12)', color: '#7c3aed' }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════ SKILLS MATRIX ═══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#faf8ff' }}>
        <div className="container">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <span className="badge-chocolate mb-4 inline-flex items-center gap-1.5"><Zap className="w-3.5 h-3.5" />Skills Matrix</span>
            <h2 className="text-3xl md:text-4xl font-heading">Core abilities &amp; power levels</h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {skills.map((s, i) => {
              const rank = getRank(s.level);
              return (
                <motion.div
                  key={s.name}
                  className="rounded-xl p-5 group"
                  style={{ background: '#ffffff', border: '1px solid #e4e4e7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.45 }}
                  whileHover={{ borderColor: `${rank.color}40`, boxShadow: `0 4px 20px ${rank.color}10` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ background: rank.bg, color: rank.color }}>
                      {rank.letter}
                    </div>
                    <span className="text-sm font-medium flex-1" style={{ color: '#18181b' }}>{s.name}</span>
                    <span className="text-xs font-mono tabular-nums font-semibold" style={{ color: rank.color }}>{s.level}</span>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#f4f4f5' }}>
                    <motion.div
                      className="h-full rounded-full"
                      style={{ backgroundColor: rank.color }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.4, delay: 0.3 + i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div className="flex items-center justify-center gap-6 mt-8 text-xs" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}>
            {[
              { letter: 'S', color: '#f59e0b', label: '95+' },
              { letter: 'A', color: '#8b5cf6', label: '90+' },
              { letter: 'B', color: '#3b82f6', label: '85+' },
            ].map((r) => (
              <div key={r.letter} className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px]" style={{ background: `${r.color}15`, color: r.color }}>{r.letter}</div>
                <span style={{ color: '#a1a1aa' }}>{r.label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <motion.div className="text-center max-w-2xl mx-auto" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="rounded-2xl p-10 md:p-14 relative overflow-hidden" style={{ background: '#faf8ff', border: '1px solid rgba(124,58,237,0.1)' }}>
              <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(124,58,237,0.3), transparent)' }} />
              <h2 className="text-3xl md:text-4xl font-heading mb-4">
                Let&apos;s build something <span className="gradient-text">extraordinary</span>
              </h2>
              <p className="text-lg mb-8" style={{ color: '#71717a' }}>
                Looking for a GTM leader who combines strategic thinking with AI-native workflows? Let&apos;s connect.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link href="/contact" className="btn-glow group">
                  Get in Touch <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link href="/experience" className="btn-glass">
                  Full Experience <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
