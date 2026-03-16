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

// Themes grouped by hero structure variant
type HeroVariant = 'centered' | 'left-aligned' | 'split' | 'minimal-typographic' | 'brutalist';
const THEME_VARIANT: Record<string, HeroVariant> = {
  'sacred-gold': 'centered',
  'moonlit': 'centered',
  'ember': 'split',
  'crystal': 'minimal-typographic',
  'forest': 'centered',
  'desert': 'left-aligned',
  'arctic': 'minimal-typographic',
  'cosmic': 'split',
  'blood': 'brutalist',
  'dawn': 'centered',
};

function CenteredHero({ content, theme }: { content: typeof themeHeroContent['sacred-gold']; theme: string }) {
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

      {/* Vertical accent lines */}
      <div
        className="absolute top-0 w-px h-full pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, rgb(var(--accent) / 0.1), transparent)`,
          right: '15%',
        }}
      />
      <div
        className="absolute top-0 w-px h-full pointer-events-none"
        style={{
          background: `linear-gradient(to bottom, transparent, rgb(var(--accent) / 0.05), transparent)`,
          left: '15%',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="h-px w-12" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
          <span
            className="text-[10px] tracking-[0.4em] uppercase font-heading section-eyebrow"
            style={{ color: 'rgb(var(--accent) / 0.6)' }}
          >
            Oracle Card Game
          </span>
          <div className="h-px w-12" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
        </motion.div>

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

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgb(var(--text-body))', opacity: 0.8 }}
        >
          {content.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#products"
            className="group px-8 py-3.5 rounded-xl font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all btn-primary"
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

function LeftAlignedHero({ content }: { content: typeof themeHeroContent['sacred-gold'] }) {
  return (
    <section className="relative min-h-screen flex items-end overflow-hidden pb-24">
      {/* Desert texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(170deg, rgb(var(--bg-tertiary)) 0%, rgb(var(--bg-primary)) 50%, rgb(var(--bg-secondary)) 100%)`,
        }}
      />

      {/* Horizontal line across the screen */}
      <div
        className="absolute top-1/3 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'rgb(var(--accent) / 0.08)' }}
      />
      <div
        className="absolute top-2/3 left-0 right-0 h-px pointer-events-none"
        style={{ background: 'rgb(var(--accent) / 0.05)' }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-12 w-full">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-2xl"
        >
          <span
            className="text-[10px] tracking-[0.5em] uppercase font-heading section-eyebrow block mb-8"
            style={{ color: 'rgb(var(--accent) / 0.4)' }}
          >
            Oracle Card Game
          </span>

          <h1
            className="font-heading text-5xl sm:text-6xl md:text-8xl leading-none mb-4"
            style={{ color: 'rgb(var(--text-primary))' }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="block"
            >
              {content.taglinePre}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="block"
              style={{ color: 'rgb(var(--accent-bright))' }}
            >
              {content.accent}
            </motion.span>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="block"
            >
              {content.taglinePost}
            </motion.span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="h-px w-48 mb-8 origin-left"
            style={{ background: 'rgb(var(--accent) / 0.3)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3 }}
            className="text-base sm:text-lg max-w-lg mb-12 leading-relaxed"
            style={{ color: 'rgb(var(--text-body))', opacity: 0.7 }}
          >
            {content.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            className="flex gap-4"
          >
            <a
              href="#products"
              className="px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all btn-primary"
              style={{
                background: 'rgb(var(--accent))',
                color: 'rgb(var(--bg-primary))',
              }}
            >
              Begin
            </a>
            <a
              href="#cards"
              className="px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all"
              style={{
                border: '1px solid rgb(var(--accent) / 0.3)',
                color: 'rgb(var(--text-primary))',
              }}
            >
              Explore
            </a>
          </motion.div>
        </motion.div>

        {/* Right-side stat column */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7 }}
          className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8"
        >
          {[
            { value: '45', label: 'Cards' },
            { value: '15', label: 'Chapters' },
            { value: '5', label: 'Rarities' },
          ].map(stat => (
            <div key={stat.label} className="text-right">
              <div className="font-heading text-3xl" style={{ color: 'rgb(var(--accent))' }}>
                {stat.value}
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={16} style={{ color: 'rgb(var(--accent) / 0.3)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function SplitHero({ content, theme }: { content: typeof themeHeroContent['sacred-gold']; theme: string }) {
  const isEmber = theme === 'ember';
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Diagonal split background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: isEmber
          ? `linear-gradient(135deg, rgb(var(--bg-primary)) 50%, rgb(var(--bg-tertiary)) 50%)`
          : `linear-gradient(135deg, rgb(var(--bg-tertiary)) 45%, rgb(var(--bg-primary)) 55%)`,
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text side */}
        <div className={isEmber ? '' : 'lg:order-2'}>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-[10px] tracking-[0.4em] uppercase font-heading section-eyebrow block mb-6"
            style={{ color: 'rgb(var(--accent) / 0.5)' }}
          >
            Oracle Card Game
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl leading-tight mb-6"
            style={{ color: 'rgb(var(--text-primary))' }}
          >
            {content.taglinePre}{' '}
            <span style={{ color: 'rgb(var(--accent-bright))' }}>{content.accent}</span>{' '}
            {content.taglinePost}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-base sm:text-lg max-w-lg mb-10 leading-relaxed"
            style={{ color: 'rgb(var(--text-body))', opacity: 0.8 }}
          >
            {content.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#products"
              className="px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all btn-primary"
              style={{
                background: 'rgb(var(--accent))',
                color: 'rgb(var(--bg-primary))',
              }}
            >
              <span className="flex items-center gap-2">
                <Sparkles size={16} />
                Begin Your Journey
              </span>
            </a>
            <a
              href="#cards"
              className="px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all"
              style={{
                border: '1px solid rgb(var(--accent) / 0.3)',
                color: 'rgb(var(--text-primary))',
              }}
            >
              Explore
            </a>
          </motion.div>
        </div>

        {/* Visual side */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className={`flex items-center justify-center ${isEmber ? 'lg:order-2' : 'lg:order-1'}`}
        >
          <div className="relative">
            <div className="animate-rotate-slow opacity-40">
              <FlowerOfLife size={400} />
            </div>
            {/* Stats layered over geometry */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
              {[
                { value: '45', label: 'Oracle Cards' },
                { value: '15', label: 'Life Chapters' },
                { value: '5', label: 'Rarities' },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 + i * 0.2 }}
                  className="text-center px-6 py-2 rounded-lg backdrop-blur-sm"
                  style={{ background: 'rgb(var(--bg-primary) / 0.6)' }}
                >
                  <div className="font-heading text-xl" style={{ color: 'rgb(var(--accent))' }}>{stat.value}</div>
                  <div className="text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={16} style={{ color: 'rgb(var(--accent) / 0.3)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function MinimalTypographicHero({ content, theme }: { content: typeof themeHeroContent['sacred-gold']; theme: string }) {
  const isArctic = theme === 'arctic';
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Very subtle background */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: `radial-gradient(circle at 50% 120%, rgb(var(--accent) / 0.03) 0%, transparent 60%)`,
      }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Large typographic display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <h1
            className="font-heading leading-none mb-2"
            style={{
              color: 'rgb(var(--text-primary))',
              fontSize: 'clamp(3rem, 10vw, 9rem)',
              fontWeight: isArctic ? 200 : 500,
              letterSpacing: isArctic ? '0.3em' : '0.1em',
            }}
          >
            {content.taglinePre}
          </h1>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="font-heading leading-none mb-2"
            style={{
              color: 'rgb(var(--accent-bright))',
              fontSize: 'clamp(3rem, 12vw, 11rem)',
              fontWeight: isArctic ? 100 : 600,
              letterSpacing: isArctic ? '0.2em' : '0.05em',
            }}
          >
            {content.accent}
          </motion.h1>
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="font-heading leading-none"
            style={{
              color: 'rgb(var(--text-primary))',
              fontSize: 'clamp(2rem, 6vw, 5rem)',
              fontWeight: isArctic ? 300 : 400,
              letterSpacing: isArctic ? '0.5em' : '0.15em',
            }}
          >
            {content.taglinePost}
          </motion.h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mx-auto my-10 h-px w-24"
          style={{ background: 'rgb(var(--accent) / 0.2)' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-sm max-w-md mx-auto mb-12 leading-relaxed"
          style={{ color: 'rgb(var(--text-body))', opacity: 0.6 }}
        >
          {content.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6 }}
          className="flex gap-4 justify-center"
        >
          <a
            href="#products"
            className="px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all btn-primary"
            style={{
              background: 'rgb(var(--accent))',
              color: 'rgb(var(--bg-primary))',
            }}
          >
            Begin
          </a>
          <a
            href="#cards"
            className="px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all"
            style={{
              border: '1px solid rgb(var(--accent) / 0.2)',
              color: 'rgb(var(--text-primary))',
            }}
          >
            Browse
          </a>
        </motion.div>

        {/* Inline stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
          className="flex justify-center gap-16 mt-20"
        >
          {[
            { value: '45', label: 'Cards' },
            { value: '15', label: 'Chapters' },
            { value: '5', label: 'Rarities' },
          ].map(stat => (
            <div key={stat.label} className="text-center">
              <div className="font-heading text-3xl" style={{ color: 'rgb(var(--accent) / 0.7)' }}>
                {stat.value}
              </div>
              <div className="text-[9px] tracking-[0.3em] uppercase mt-1" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={16} style={{ color: 'rgb(var(--accent) / 0.3)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

function BrutalistHero({ content }: { content: typeof themeHeroContent['sacred-gold'] }) {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Hard-edge background blocks */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-1/2 h-full" style={{ background: 'rgb(var(--bg-primary))' }} />
        <div className="absolute top-0 right-0 w-1/2 h-full" style={{ background: 'rgb(var(--bg-secondary))' }} />
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgb(var(--accent))' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Brutalist label */}
          <div
            className="inline-block px-3 py-1 mb-8 text-[10px] tracking-[0.5em] uppercase font-heading section-eyebrow"
            style={{
              background: 'rgb(var(--accent))',
              color: 'rgb(var(--bg-primary))',
            }}
          >
            Oracle Card Game
          </div>

          <h1
            className="font-heading leading-none mb-4"
            style={{
              color: 'rgb(var(--text-primary))',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            {content.taglinePre}
          </h1>
          <h1
            className="font-heading leading-none mb-4"
            style={{
              color: 'rgb(var(--accent))',
              fontSize: 'clamp(4rem, 14vw, 12rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.03em',
            }}
          >
            {content.accent}
          </h1>
          <h1
            className="font-heading leading-none"
            style={{
              color: 'rgb(var(--text-primary))',
              fontSize: 'clamp(3rem, 10vw, 8rem)',
              fontWeight: 900,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
            }}
          >
            {content.taglinePost}
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          className="h-0.5 w-32 my-8 origin-left"
          style={{ background: 'rgb(var(--accent))' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-sm max-w-md mb-12"
          style={{ color: 'rgb(var(--text-body))', opacity: 0.7 }}
        >
          {content.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex gap-4"
        >
          <a
            href="#products"
            className="px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all btn-primary"
            style={{
              border: '2px solid rgb(var(--accent))',
              color: 'rgb(var(--accent))',
              background: 'transparent',
            }}
          >
            Enter
          </a>
          <a
            href="#cards"
            className="px-8 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all"
            style={{
              color: 'rgb(var(--text-primary))',
              borderBottom: '2px solid rgb(var(--accent) / 0.3)',
            }}
          >
            Browse
          </a>
        </motion.div>

        {/* Stats in a vertical line on the right */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="absolute right-6 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-12"
        >
          {[
            { value: '45', label: 'Cards' },
            { value: '15', label: 'Chapters' },
            { value: '05', label: 'Rarities' },
          ].map(stat => (
            <div key={stat.label}>
              <div className="font-heading text-4xl font-black" style={{ color: 'rgb(var(--accent))' }}>
                {stat.value}
              </div>
              <div className="text-[8px] tracking-[0.4em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
          <ArrowDown size={16} style={{ color: 'rgb(var(--accent) / 0.3)' }} />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default function HeroSection() {
  const { theme } = useTheme();
  const content = themeHeroContent[theme] || themeHeroContent['sacred-gold'];
  const variant = THEME_VARIANT[theme] || 'centered';

  switch (variant) {
    case 'left-aligned':
      return <LeftAlignedHero content={content} />;
    case 'split':
      return <SplitHero content={content} theme={theme} />;
    case 'minimal-typographic':
      return <MinimalTypographicHero content={content} theme={theme} />;
    case 'brutalist':
      return <BrutalistHero content={content} />;
    default:
      return <CenteredHero content={content} theme={theme} />;
  }
}
