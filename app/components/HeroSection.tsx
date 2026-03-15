'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';
import { useTheme } from '../lib/theme-context';
import FlowerOfLife from './FlowerOfLife';

const themeHeroContent: Record<string, {
  taglinePre: string;
  accent: string;
  taglinePost: string;
  sub: string;
}> = {
  'sacred-gold': {
    taglinePre: '45 Cards.',
    accent: '15 Chapters.',
    taglinePost: 'One Journey.',
    sub: 'A wisdom oracle forged in sacred geometry and golden intention.',
  },
  'moonlit': {
    taglinePre: 'Under the',
    accent: 'Lunar Gaze',
    taglinePost: 'Wisdom Speaks.',
    sub: 'Silver light illuminates forty-five truths written in starlight.',
  },
  'ember': {
    taglinePre: 'From Ancient',
    accent: 'Embers',
    taglinePost: 'Wisdom Burns.',
    sub: 'Forty-five scrolls of firelit wisdom, handed down through ages.',
  },
  'crystal': {
    taglinePre: 'Through the',
    accent: 'Crystal Lens',
    taglinePost: 'Truth Refracts.',
    sub: 'Prismatic visions encoded in forty-five oracle fragments.',
  },
  'forest': {
    taglinePre: 'The Forest',
    accent: 'Remembers',
    taglinePost: 'Everything.',
    sub: 'Deep roots carry forty-five seeds of ancestral knowing.',
  },
  'desert': {
    taglinePre: 'Written in',
    accent: 'Desert Stone',
    taglinePost: 'Eternal Words.',
    sub: 'Unearthed from sand and time, forty-five prophecies endure.',
  },
  'arctic': {
    taglinePre: 'Carved in',
    accent: 'Glacial Runes',
    taglinePost: 'Clear as Ice.',
    sub: 'Nordic precision meets oracle depth. Forty-five runes decoded.',
  },
  'cosmic': {
    taglinePre: 'Across the',
    accent: 'Nebula',
    taglinePost: 'Signals Arrive.',
    sub: 'Star-scattered wisdom from forty-five cosmic transmissions.',
  },
  'blood': {
    taglinePre: 'Inked in',
    accent: 'Blood',
    taglinePost: 'Raw. Real.',
    sub: 'No filter. No comfort. Forty-five truths that cut deep.',
  },
  'dawn': {
    taglinePre: 'At First',
    accent: 'Light',
    taglinePost: 'Clarity Arrives.',
    sub: 'Morning wisdom. Forty-five gentle revelations for the awakened mind.',
  },
};

export default function HeroSection() {
  const { theme } = useTheme();
  const content = themeHeroContent[theme] || themeHeroContent['sacred-gold'];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background sacred geometry */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-rotate-slow opacity-30">
          <FlowerOfLife size={600} />
        </div>
      </div>

      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, transparent 30%, rgb(var(--bg-primary)) 70%)`,
        }}
      />

      {/* Diagonal accent line */}
      <div
        className="absolute top-0 right-0 w-px h-full pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, rgb(var(--accent) / 0.1), transparent)`,
          right: '15%',
        }}
      />
      <div
        className="absolute top-0 left-0 w-px h-full pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, rgb(var(--accent) / 0.05), transparent)`,
          left: '15%',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
          <span
            className="text-[10px] tracking-[0.4em] uppercase font-heading"
            style={{ color: 'rgb(var(--accent) / 0.6)' }}
          >
            Oracle Card Game
          </span>
          <div className="h-px w-12" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
        </motion.div>

        {/* Main tagline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-heading text-4xl sm:text-5xl md:text-7xl leading-tight mb-6"
          style={{ color: 'rgb(var(--text-primary))' }}
        >
          {content.taglinePre}{' '}
          <span
            className="relative inline-block"
            style={{ color: 'rgb(var(--accent-bright))' }}
          >
            {content.accent}
            <span
              className="absolute -bottom-1 left-0 right-0 h-px"
              style={{ background: `linear-gradient(to right, transparent, rgb(var(--accent)), transparent)` }}
            />
          </span>{' '}
          {content.taglinePost}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgb(var(--text-body))', opacity: 0.8 }}
        >
          {content.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#products"
            className="group px-8 py-3.5 rounded-xl font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all relative overflow-hidden"
            style={{
              background: 'rgb(var(--accent))',
              color: 'rgb(var(--bg-primary))',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={16} />
              Begin Your Journey
            </span>
          </a>
          <a
            href="#cards"
            className="px-8 py-3.5 rounded-xl font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all"
            style={{
              border: '1px solid rgb(var(--accent) / 0.3)',
              color: 'rgb(var(--text-primary))',
            }}
          >
            Explore the Deck
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="flex justify-center gap-12 mt-16"
        >
          {[
            { value: '45', label: 'Oracle Cards' },
            { value: '15', label: 'Life Chapters' },
            { value: '5', label: 'Rarities' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-2xl sm:text-3xl" style={{ color: 'rgb(var(--accent))' }}>
                {stat.value}
              </div>
              <div className="text-[10px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown size={16} style={{ color: 'rgb(var(--accent) / 0.3)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
