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

const HERO_STATS = [
  { value: '45', label: 'Cards' },
  { value: '15', label: 'Chapters' },
  { value: '05', label: 'Rarities' },
];

const EDITORIAL_NOTES: Record<string, string[]> = {
  ember: ['Firelit chapters', 'Ritual draw flow', 'Ancient voice, modern deck'],
  desert: ['Excavated truths', 'Fifteen stone-cut paths', 'Travel light, read deep'],
};

const SIGNAL_NOTES: Record<string, string[]> = {
  crystal: ['Prism scan active', 'Fragments align on draw', 'Refraction exposes motive'],
  arctic: ['Low-noise layout', 'Runic precision channel', 'Cold clarity over ornament'],
  cosmic: ['Nebula signal lock', 'Deck telemetry live', 'Forty-five transmissions inbound'],
};

type HeroVariant = 'ritual' | 'editorial' | 'signal' | 'manifest';

const THEME_VARIANT: Record<string, HeroVariant> = {
  'sacred-gold': 'ritual',
  'moonlit': 'ritual',
  'forest': 'ritual',
  'dawn': 'ritual',
  'ember': 'editorial',
  'desert': 'editorial',
  'crystal': 'signal',
  'arctic': 'signal',
  'cosmic': 'signal',
  'blood': 'manifest',
};

function HeroActions({
  align = 'start',
  primaryLabel = 'Begin Your Journey',
  secondaryLabel = 'Browse the Deck',
}: {
  align?: 'start' | 'center';
  primaryLabel?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className={`flex flex-col gap-4 sm:flex-row ${align === 'center' ? 'justify-center items-center' : 'items-start'}`}>
      <a
        href="#products"
        className="inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all btn-primary"
        style={{
          background: 'rgb(var(--accent))',
          color: 'rgb(var(--bg-primary))',
        }}
      >
        <Sparkles size={16} />
        {primaryLabel}
      </a>
      <a
        href="#cards"
        className="inline-flex items-center rounded-full px-7 py-3.5 font-heading text-sm tracking-[0.15em] uppercase no-underline transition-all"
        style={{
          border: '1px solid rgb(var(--accent) / 0.28)',
          color: 'rgb(var(--text-primary))',
        }}
      >
        {secondaryLabel}
      </a>
    </div>
  );
}

function ScrollCue() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.8 }}
      className="absolute bottom-8 left-1/2 -translate-x-1/2"
    >
      <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
        <ArrowDown size={16} style={{ color: 'rgb(var(--accent) / 0.35)' }} />
      </motion.div>
    </motion.div>
  );
}

function RitualHero({
  content,
  theme,
}: {
  content: typeof themeHeroContent['sacred-gold'];
  theme: string;
}) {
  const isDawn = theme === 'dawn';

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDawn
            ? 'radial-gradient(circle at 50% 20%, rgb(var(--accent) / 0.16), transparent 35%), linear-gradient(180deg, rgb(var(--bg-secondary)) 0%, rgb(var(--bg-primary)) 75%)'
            : 'radial-gradient(circle at 50% 30%, rgb(var(--accent) / 0.12), transparent 34%), radial-gradient(circle at 50% 100%, rgb(var(--accent) / 0.08), transparent 40%)',
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="animate-rotate-slow opacity-20">
          <FlowerOfLife size={560} />
        </div>
      </div>

      <div
        className="pointer-events-none absolute left-[12%] top-0 h-full w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgb(var(--accent) / 0.14), transparent)' }}
      />
      <div
        className="pointer-events-none absolute right-[12%] top-0 h-full w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgb(var(--accent) / 0.08), transparent)' }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mb-8 inline-flex items-center gap-3"
        >
          <div className="h-px w-12" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
          <span className="text-[10px] tracking-[0.45em] uppercase font-heading section-eyebrow" style={{ color: 'rgb(var(--accent) / 0.62)' }}>
            Oracle Card Game
          </span>
          <div className="h-px w-12" style={{ background: 'rgb(var(--accent) / 0.3)' }} />
        </motion.div>

        <h1
          className="font-heading text-4xl leading-tight sm:text-6xl md:text-7xl"
          style={{ color: 'rgb(var(--text-primary))' }}
        >
          {content.taglinePre}{' '}
          <span style={{ color: 'rgb(var(--accent-bright))' }}>{content.accent}</span>{' '}
          {content.taglinePost}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed"
          style={{ color: 'rgb(var(--text-body) / 0.8)' }}
        >
          {content.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.8 }}
          className="mt-10"
        >
          <HeroActions align="center" secondaryLabel="Explore the Deck" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 1 }}
          className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] px-6 py-5"
              style={{
                background: 'rgb(var(--bg-primary) / 0.55)',
                border: '1px solid rgb(var(--border) / 0.14)',
                backdropFilter: 'blur(14px)',
              }}
            >
              <div className="font-heading text-3xl" style={{ color: 'rgb(var(--accent))' }}>
                {stat.value}
              </div>
              <div className="mt-1 text-[10px] tracking-[0.28em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.48)' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  );
}

function EditorialHero({
  content,
  theme,
}: {
  content: typeof themeHeroContent['sacred-gold'];
  theme: string;
}) {
  const notes = EDITORIAL_NOTES[theme] || EDITORIAL_NOTES.ember;

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(135deg, rgb(var(--bg-primary)) 0%, rgb(var(--bg-secondary)) 42%, rgb(var(--bg-tertiary)) 100%)',
        }}
      />
      <div
        className="absolute inset-y-0 left-[58%] hidden w-px lg:block"
        style={{ background: 'linear-gradient(180deg, transparent, rgb(var(--accent) / 0.18), transparent)' }}
      />
      <div className="absolute -right-12 top-16 pointer-events-none text-[15rem] font-heading leading-none opacity-[0.05]" style={{ color: 'rgb(var(--accent))' }}>
        15
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-16 lg:grid-cols-[minmax(0,1.1fr)_360px] lg:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-8 inline-block text-[10px] tracking-[0.45em] uppercase font-heading section-eyebrow"
            style={{ color: 'rgb(var(--accent) / 0.58)' }}
          >
            Oracle Card Game
          </motion.span>

          <h1
            className="font-heading text-5xl leading-none sm:text-7xl md:text-8xl"
            style={{ color: 'rgb(var(--text-primary))' }}
          >
            <span className="block">{content.taglinePre}</span>
            <span className="block" style={{ color: 'rgb(var(--accent-bright))' }}>
              {content.accent}
            </span>
            <span className="block">{content.taglinePost}</span>
          </h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.75 }}
            className="mt-8 h-px w-44 origin-left"
            style={{ background: 'rgb(var(--accent) / 0.34)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.75, delay: 0.9 }}
            className="mt-8 max-w-xl text-lg leading-relaxed"
            style={{ color: 'rgb(var(--text-body) / 0.78)' }}
          >
            {content.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.05 }}
            className="mt-10"
          >
            <HeroActions align="start" primaryLabel="Enter the Chapter" secondaryLabel="Read the Index" />
          </motion.div>
        </div>

        <motion.aside
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="space-y-5"
        >
          <div
            className="rounded-[28px] p-6"
            style={{
              background: 'rgb(var(--bg-primary) / 0.5)',
              border: '1px solid rgb(var(--border) / 0.14)',
            }}
          >
            <p className="mb-3 text-[10px] tracking-[0.28em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.62)' }}>
              Deck Structure
            </p>
            <div className="space-y-4">
              {HERO_STATS.map((stat) => (
                <div key={stat.label} className="flex items-end justify-between">
                  <span className="text-sm" style={{ color: 'rgb(var(--text-body) / 0.72)' }}>
                    {stat.label}
                  </span>
                  <span className="font-heading text-3xl" style={{ color: 'rgb(var(--accent))' }}>
                    {stat.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className="rounded-[28px] p-6"
            style={{
              background: 'rgb(var(--surface))',
              border: '1px solid rgb(var(--border) / 0.12)',
            }}
          >
            <p className="mb-4 text-[10px] tracking-[0.28em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.62)' }}>
              Field Notes
            </p>
            <div className="space-y-3">
              {notes.map((note, index) => (
                <div key={note} className="flex gap-3">
                  <span className="pt-0.5 text-[10px] tracking-[0.2em] uppercase" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.76)' }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.aside>
      </div>

      <ScrollCue />
    </section>
  );
}

function SignalHero({
  content,
  theme,
}: {
  content: typeof themeHeroContent['sacred-gold'];
  theme: string;
}) {
  const notes = SIGNAL_NOTES[theme] || SIGNAL_NOTES.crystal;
  const accentGlow = theme === 'arctic' ? 'rgb(var(--accent) / 0.08)' : 'rgb(var(--accent) / 0.14)';

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 80% 20%, ${accentGlow}, transparent 28%), linear-gradient(180deg, rgb(var(--bg-primary)) 0%, rgb(var(--bg-secondary)) 100%)`,
        }}
      />

      <div className="absolute left-6 top-6 hidden text-[11rem] font-heading leading-none opacity-[0.05] lg:block" style={{ color: 'rgb(var(--accent))' }}>
        45
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(340px,420px)] lg:items-center">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mb-6 inline-flex rounded-full px-4 py-2 text-[10px] tracking-[0.35em] uppercase font-heading"
            style={{
              color: 'rgb(var(--accent) / 0.72)',
              border: '1px solid rgb(var(--accent) / 0.2)',
            }}
          >
            Signal Deck
          </motion.span>

          <h1
            className="font-heading text-4xl leading-[0.96] sm:text-6xl md:text-7xl"
            style={{ color: 'rgb(var(--text-primary))' }}
          >
            {content.taglinePre}
            <br />
            <span style={{ color: 'rgb(var(--accent-bright))' }}>{content.accent}</span>
            <br />
            {content.taglinePost}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: 'rgb(var(--text-body) / 0.78)' }}
          >
            {content.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.78 }}
            className="mt-9"
          >
            <HeroActions align="start" primaryLabel="Open Channel" secondaryLabel="Scan the Deck" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="grid gap-4 sm:grid-cols-2"
        >
          <div
            className="rounded-[28px] p-5 sm:col-span-2"
            style={{
              background: 'rgb(var(--bg-primary) / 0.58)',
              border: '1px solid rgb(var(--border) / 0.15)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[10px] tracking-[0.28em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.64)' }}>
                Signal Map
              </span>
              <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.45)' }}>
                Live
              </span>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="opacity-70">
                <FlowerOfLife size={220} />
              </div>
            </div>
          </div>

          {HERO_STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[24px] p-5"
              style={{
                background: 'rgb(var(--surface))',
                border: '1px solid rgb(var(--border) / 0.12)',
              }}
            >
              <p className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.45)' }}>
                {stat.label}
              </p>
              <p className="mt-3 font-heading text-4xl" style={{ color: 'rgb(var(--accent))' }}>
                {stat.value}
              </p>
            </div>
          ))}

          <div
            className="rounded-[24px] p-5 sm:col-span-2"
            style={{
              background: 'rgb(var(--surface))',
              border: '1px solid rgb(var(--border) / 0.12)',
            }}
          >
            <p className="mb-3 text-[10px] tracking-[0.28em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.64)' }}>
              System Notes
            </p>
            <div className="space-y-2">
              {notes.map((note) => (
                <div key={note} className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--accent))' }} />
                  <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.76)' }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <ScrollCue />
    </section>
  );
}

function ManifestHero({ content }: { content: typeof themeHeroContent['sacred-gold'] }) {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden px-4 py-24 sm:px-6 lg:px-8">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-[38%]" style={{ background: 'rgb(var(--bg-primary))' }} />
        <div className="absolute inset-y-0 right-0 w-[62%]" style={{ background: 'rgb(var(--bg-secondary))' }} />
        <div className="absolute bottom-0 left-0 right-0 h-1" style={{ background: 'rgb(var(--accent))' }} />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 lg:grid-cols-[260px_minmax(0,1fr)] lg:items-end">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="border-b pb-6 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-8"
          style={{ borderColor: 'rgb(var(--accent) / 0.24)' }}
        >
          <div className="text-[10px] tracking-[0.45em] uppercase font-heading" style={{ color: 'rgb(var(--accent))' }}>
            Oracle Card Game
          </div>
          <div className="mt-6 font-heading text-[7rem] leading-none sm:text-[9rem]" style={{ color: 'rgb(var(--accent))' }}>
            45
          </div>
          <div className="mt-2 space-y-3">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-[9px] tracking-[0.35em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.42)' }}>
                  {stat.label}
                </div>
                <div className="font-heading text-2xl" style={{ color: 'rgb(var(--text-primary))' }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div>
          <h1
            className="font-heading text-5xl uppercase leading-[0.9] sm:text-7xl md:text-[7rem]"
            style={{
              color: 'rgb(var(--text-primary))',
              letterSpacing: '-0.03em',
            }}
          >
            {content.taglinePre}
            <br />
            <span style={{ color: 'rgb(var(--accent))' }}>{content.accent}</span>
            <br />
            {content.taglinePost}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.58 }}
            className="mt-8 max-w-xl text-base leading-relaxed"
            style={{ color: 'rgb(var(--text-body) / 0.78)' }}
          >
            {content.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-10 flex flex-col gap-4 sm:flex-row"
          >
            <a
              href="#products"
              className="inline-flex items-center justify-center border-2 px-8 py-3.5 font-heading text-sm tracking-[0.18em] uppercase no-underline transition-all"
              style={{
                borderColor: 'rgb(var(--accent))',
                color: 'rgb(var(--accent))',
              }}
            >
              Enter
            </a>
            <a
              href="#cards"
              className="inline-flex items-center justify-center border-b-2 px-2 py-3.5 font-heading text-sm tracking-[0.18em] uppercase no-underline transition-all"
              style={{
                borderColor: 'rgb(var(--accent) / 0.4)',
                color: 'rgb(var(--text-primary))',
              }}
            >
              Browse
            </a>
          </motion.div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

export default function HeroSection() {
  const { theme } = useTheme();
  const content = themeHeroContent[theme] || themeHeroContent['sacred-gold'];
  const variant = THEME_VARIANT[theme] || 'ritual';

  switch (variant) {
    case 'editorial':
      return <EditorialHero content={content} theme={theme} />;
    case 'signal':
      return <SignalHero content={content} theme={theme} />;
    case 'manifest':
      return <ManifestHero content={content} />;
    default:
      return <RitualHero content={content} theme={theme} />;
  }
}
