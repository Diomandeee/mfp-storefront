'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Zap, Search, Filter } from 'lucide-react';
import { CARDS, CHAPTERS, getCardsByChapter } from '../lib/card-manifest';
import type { Card } from '../lib/card-manifest';
import { useTheme } from '../lib/theme-context';

const RARITY_COLORS: Record<string, string> = {
  Common: '#9CA3AF',
  Uncommon: '#34D399',
  Rare: '#60A5FA',
  Epic: '#A78BFA',
  Legendary: '#F59E0B',
};

const ROLE_LABELS: Record<string, string> = {
  A: 'Concept',
  B: 'Challenge',
  C: 'Transcendence',
};

function RarityStars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={10}
          fill={i < count ? RARITY_COLORS[Object.keys(RARITY_COLORS)[Math.min(count - 1, 4)]] : 'transparent'}
          stroke={i < count ? RARITY_COLORS[Object.keys(RARITY_COLORS)[Math.min(count - 1, 4)]] : 'rgb(var(--text-secondary) / 0.2)'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function CardDetailModal({ card, onClose }: { card: Card; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgb(0 0 0 / 0.7)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 20 }}
        className="relative w-full max-w-lg rounded-2xl overflow-hidden"
        style={{
          background: 'rgb(var(--bg-secondary))',
          border: '1px solid rgb(var(--border) / 0.2)',
          boxShadow: `0 0 80px ${card.theme_color}20`,
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="h-1" style={{ background: card.theme_color }} />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full cursor-pointer z-10"
          style={{ background: 'rgb(var(--bg-primary) / 0.5)', color: 'rgb(var(--text-secondary))' }}
        >
          <X size={16} />
        </button>

        <div className="h-56 relative overflow-hidden" style={{ background: `linear-gradient(180deg, ${card.theme_color}20, rgb(var(--bg-secondary)))` }}>
          <img src={`/cards/${card.id}.png`} alt={card.name} className="w-full h-full object-contain" />
        </div>

        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] tracking-[0.2em] uppercase" style={{ color: card.theme_color }}>
                  {card.id}
                </span>
                <span
                  className="text-[9px] px-2 py-0.5 rounded-full tracking-wider uppercase"
                  style={{
                    background: `${RARITY_COLORS[card.rarity]}15`,
                    color: RARITY_COLORS[card.rarity],
                    border: `1px solid ${RARITY_COLORS[card.rarity]}30`,
                  }}
                >
                  {card.rarity}
                </span>
              </div>
              <h3 className="font-heading text-2xl" style={{ color: 'rgb(var(--text-primary))' }}>
                {card.name}
              </h3>
              <p className="text-xs mt-1" style={{ color: 'rgb(var(--text-secondary))' }}>
                Chapter {card.chapter}: {card.chapter_title}
              </p>
            </div>
            <RarityStars count={card.rarity_stars} />
          </div>

          <blockquote
            className="text-base leading-relaxed mb-6 pl-4 italic"
            style={{
              color: 'rgb(var(--text-primary))',
              borderLeft: `2px solid ${card.theme_color}`,
            }}
          >
            &ldquo;{card.quote}&rdquo;
          </blockquote>

          <div className="rounded-xl p-4 mb-6" style={{ background: 'rgb(var(--surface))' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-heading" style={{ color: 'rgb(var(--accent))' }}>
              Reflection Prompt
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-body))' }}>
              {card.reflection_prompt}
            </p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgb(var(--surface))' }}>
              <div className="text-lg font-heading" style={{ color: card.theme_color }}>{card.emotional_power}</div>
              <div className="text-[9px] tracking-wider uppercase mt-1" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>Power</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgb(var(--surface))' }}>
              <div className="text-lg font-heading" style={{ color: 'rgb(var(--accent))' }}>{card.wisdom_cost}</div>
              <div className="text-[9px] tracking-wider uppercase mt-1" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>Cost</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgb(var(--surface))' }}>
              <div className="text-lg font-heading" style={{ color: 'rgb(var(--text-primary))' }}>{card.type}</div>
              <div className="text-[9px] tracking-wider uppercase mt-1" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>Type</div>
            </div>
            <div className="text-center p-3 rounded-lg" style={{ background: 'rgb(var(--surface))' }}>
              <div className="text-lg font-heading" style={{ color: 'rgb(var(--text-primary))' }}>
                {ROLE_LABELS[card.triptych_role]}
              </div>
              <div className="text-[9px] tracking-wider uppercase mt-1" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>Role</div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ===== Layout-specific card renderers ===== */

function ClassicCard({ card, onClick }: { card: Card; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer card-oracle"
    >
      <img
        src={`/cards/${card.id}.png`}
        alt={`${card.name} — ${card.chapter_title}`}
        className="w-full h-auto rounded-lg"
        loading="lazy"
        style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.5))' }}
      />
    </motion.div>
  );
}

function CodexCard({ card, index, onClick }: { card: Card; index: number; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, delay: index * 0.02 }}
      onClick={onClick}
      className="cursor-pointer flex gap-6 py-5 group"
      style={{ borderBottom: '1px solid rgb(var(--border) / 0.08)' }}
    >
      {/* Number */}
      <div className="flex-shrink-0 w-10 text-right">
        <span
          className="font-heading text-sm tabular-nums"
          style={{ color: 'rgb(var(--accent) / 0.3)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* Image */}
      <div className="flex-shrink-0 w-20 h-28 rounded overflow-hidden">
        <img
          src={`/cards/${card.id}.png`}
          alt={card.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[9px] tracking-[0.15em] uppercase" style={{ color: card.theme_color }}>
            {card.id}
          </span>
          <span
            className="text-[8px] px-1.5 py-0.5 rounded-full tracking-wider"
            style={{ color: RARITY_COLORS[card.rarity], border: `1px solid ${RARITY_COLORS[card.rarity]}30` }}
          >
            {card.rarity}
          </span>
        </div>
        <h4 className="font-heading text-sm mb-1 transition-colors" style={{ color: 'rgb(var(--text-primary))' }}>
          {card.name}
        </h4>
        <p className="text-[11px] leading-relaxed italic" style={{ color: 'rgb(var(--text-body) / 0.5)' }}>
          &ldquo;{card.quote.slice(0, 100)}{card.quote.length > 100 ? '...' : ''}&rdquo;
        </p>
        <div className="flex items-center gap-4 mt-2">
          <span className="text-[9px] uppercase tracking-wider" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
            Ch. {card.chapter}
          </span>
          <span className="text-[9px]" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
            {ROLE_LABELS[card.triptych_role]}
          </span>
          <div className="flex gap-0.5">
            <Zap size={9} style={{ color: card.theme_color }} />
            <span className="text-[9px]" style={{ color: card.theme_color }}>{card.emotional_power}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function MinimalCard({ card, onClick }: { card: Card; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.4 }}
      onClick={onClick}
      className="cursor-pointer card-oracle"
    >
      <img
        src={`/cards/${card.id}.png`}
        alt={card.name}
        className="w-full h-auto"
        loading="lazy"
        style={{
          filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.4))',
          borderRadius: 'var(--border-radius-card, 12px)',
        }}
      />
    </motion.div>
  );
}

function GalleryCard({ card, onClick }: { card: Card; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="cursor-pointer card-item card-oracle relative group"
    >
      <img
        src={`/cards/${card.id}.png`}
        alt={card.name}
        className="w-full h-auto"
        loading="lazy"
        style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.3))' }}
      />
      {/* Name overlay on hover */}
      <div
        className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent 60%)' }}
      >
        <div>
          <p className="text-xs font-heading" style={{ color: '#fff' }}>{card.name}</p>
          <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.6)' }}>Ch. {card.chapter}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ===== Filter bar (hidden in minimal layout) ===== */

function FilterBar({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  chapterFilter,
  setChapterFilter,
  rarityFilter,
  setRarityFilter,
  typeFilter,
  setTypeFilter,
  layout,
}: {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
  showFilters: boolean;
  setShowFilters: (v: boolean) => void;
  chapterFilter: number | null;
  setChapterFilter: (v: number | null) => void;
  rarityFilter: string | null;
  setRarityFilter: (v: string | null) => void;
  typeFilter: string | null;
  setTypeFilter: (v: string | null) => void;
  layout: string;
}) {
  // Minimal layout hides filters
  if (layout === 'minimal') return null;

  const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const types = ['Wisdom', 'Reflection', 'Poem', 'Theme', 'Legendary'];

  return (
    <>
      <div className="mb-8 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <div className="relative flex-1 max-w-md">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgb(var(--text-secondary) / 0.4)' }} />
          <input
            type="text"
            placeholder="Search by name, quote, or theme..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm outline-none"
            style={{
              background: 'rgb(var(--surface))',
              color: 'rgb(var(--text-primary))',
              border: '1px solid rgb(var(--border) / 0.1)',
            }}
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs cursor-pointer tracking-wider uppercase"
          style={{
            background: showFilters ? 'rgb(var(--accent) / 0.1)' : 'rgb(var(--surface))',
            color: 'rgb(var(--text-secondary))',
            border: '1px solid rgb(var(--border) / 0.1)',
          }}
        >
          <Filter size={14} />
          Filters
          {(chapterFilter !== null || rarityFilter || typeFilter) && (
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'rgb(var(--accent))' }} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="rounded-xl p-6" style={{ background: 'rgb(var(--surface))', border: '1px solid rgb(var(--border) / 0.1)' }}>
              <div className="mb-4">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>Chapter</p>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setChapterFilter(null)} className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer" style={{ background: chapterFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent', color: chapterFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)', border: `1px solid ${chapterFilter === null ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border) / 0.1)'}` }}>All</button>
                  {CHAPTERS.map(ch => (
                    <button key={ch.number} onClick={() => setChapterFilter(ch.number)} className="px-3 py-1 rounded-lg text-[10px] tracking-wider cursor-pointer" style={{ background: chapterFilter === ch.number ? `${ch.color}20` : 'transparent', color: chapterFilter === ch.number ? ch.color : 'rgb(var(--text-secondary) / 0.5)', border: `1px solid ${chapterFilter === ch.number ? `${ch.color}30` : 'rgb(var(--border) / 0.1)'}` }}>{ch.number}</button>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>Rarity</p>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setRarityFilter(null)} className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer" style={{ background: rarityFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent', color: rarityFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)', border: `1px solid ${rarityFilter === null ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border) / 0.1)'}` }}>All</button>
                  {rarities.map(r => (
                    <button key={r} onClick={() => setRarityFilter(r)} className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer" style={{ background: rarityFilter === r ? `${RARITY_COLORS[r]}15` : 'transparent', color: rarityFilter === r ? RARITY_COLORS[r] : 'rgb(var(--text-secondary) / 0.5)', border: `1px solid ${rarityFilter === r ? `${RARITY_COLORS[r]}30` : 'rgb(var(--border) / 0.1)'}` }}>{r}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>Card Type</p>
                <div className="flex flex-wrap gap-1.5">
                  <button onClick={() => setTypeFilter(null)} className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer" style={{ background: typeFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent', color: typeFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)', border: `1px solid ${typeFilter === null ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border) / 0.1)'}` }}>All</button>
                  {types.map(t => (
                    <button key={t} onClick={() => setTypeFilter(t)} className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer" style={{ background: typeFilter === t ? 'rgb(var(--accent) / 0.15)' : 'transparent', color: typeFilter === t ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)', border: `1px solid ${typeFilter === t ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border) / 0.1)'}` }}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ===== Layout-specific grid renderers ===== */

function ClassicGrid({ cards, onSelect }: { cards: Card[]; onSelect: (c: Card) => void }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <AnimatePresence mode="popLayout">
        {cards.map(card => (
          <ClassicCard key={card.id} card={card} onClick={() => onSelect(card)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function CodexGrid({ cards, onSelect }: { cards: Card[]; onSelect: (c: Card) => void }) {
  return (
    <div className="max-w-3xl mx-auto section-content">
      <AnimatePresence mode="popLayout">
        {cards.map((card, i) => (
          <CodexCard key={card.id} card={card} index={i} onClick={() => onSelect(card)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function MinimalGrid({ cards, onSelect }: { cards: Card[]; onSelect: (c: Card) => void }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
      <AnimatePresence mode="popLayout">
        {cards.map(card => (
          <MinimalCard key={card.id} card={card} onClick={() => onSelect(card)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function GalleryGrid({ cards, onSelect }: { cards: Card[]; onSelect: (c: Card) => void }) {
  return (
    <div className="card-grid">
      <AnimatePresence mode="popLayout">
        {cards.map(card => (
          <GalleryCard key={card.id} card={card} onClick={() => onSelect(card)} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function TriptychGrid({ cards, onSelect }: { cards: Card[]; onSelect: (c: Card) => void }) {
  // Group by chapter
  const chapters = CHAPTERS.filter(ch => cards.some(c => c.chapter === ch.number));

  return (
    <div className="space-y-12">
      {chapters.map(chapter => {
        const chapterCards = cards.filter(c => c.chapter === chapter.number);
        return (
          <div key={chapter.number}>
            {/* Chapter header */}
            <div className="flex items-center gap-3 mb-4">
              <span
                className="text-[10px] tracking-[0.2em] uppercase font-heading px-2.5 py-1 rounded"
                style={{
                  background: `${chapter.color}15`,
                  color: chapter.color,
                  border: `1px solid ${chapter.color}25`,
                }}
              >
                Chapter {chapter.number}
              </span>
              <span className="font-heading text-sm" style={{ color: 'rgb(var(--text-primary))' }}>
                {chapter.title}
              </span>
              <div className="flex-1 h-px" style={{ background: `${chapter.color}15` }} />
            </div>

            {/* Triptych row: always 3 columns */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <AnimatePresence mode="popLayout">
                {chapterCards.map(card => (
                  <motion.div
                    key={card.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => onSelect(card)}
                    className="cursor-pointer card-oracle"
                  >
                    <img
                      src={`/cards/${card.id}.png`}
                      alt={card.name}
                      className="w-full h-auto rounded-lg"
                      loading="lazy"
                      style={{ filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}
                    />
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-[9px] font-heading" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
                        {card.triptych_role_name}
                      </span>
                      <span className="text-[8px]" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                        {card.id}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ===== Main Component ===== */

export default function CardBrowser() {
  const { layout } = useTheme();
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [chapterFilter, setChapterFilter] = useState<number | null>(null);
  const [rarityFilter, setRarityFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let cards = [...CARDS];
    if (chapterFilter !== null) cards = cards.filter(c => c.chapter === chapterFilter);
    if (rarityFilter) cards = cards.filter(c => c.rarity === rarityFilter);
    if (typeFilter) cards = cards.filter(c => c.type === typeFilter);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cards = cards.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.quote.toLowerCase().includes(q) ||
        c.theme.toLowerCase().includes(q)
      );
    }
    return cards;
  }, [chapterFilter, rarityFilter, typeFilter, searchQuery]);

  // Section header varies per layout
  const headerAlignment = layout === 'codex' ? 'text-left max-w-3xl mx-auto' : 'text-center';

  return (
    <section id="cards" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className={`section-header mb-12 ${headerAlignment}`}>
        <p className="text-[10px] tracking-[0.4em] uppercase font-heading section-eyebrow mb-3" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
          {layout === 'codex' ? 'Index' : layout === 'gallery' ? 'Gallery' : 'The Collection'}
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
          {layout === 'codex' ? 'Card Index' : layout === 'triptych' ? 'Oracle Triptychs' : 'Oracle Deck'}
        </h2>
        {layout !== 'minimal' && (
          <p className={`text-sm ${layout === 'codex' ? '' : 'max-w-md mx-auto'}`} style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
            {layout === 'codex'
              ? 'A manuscript index of forty-five oracle entries, numbered and catalogued.'
              : layout === 'triptych'
              ? 'Each chapter presents three cards: Concept, Challenge, and Transcendence.'
              : 'Forty-five cards of wisdom, challenge, and transcendence. Each one a mirror for the soul.'
            }
          </p>
        )}
      </div>

      {/* Filters (hidden in minimal) */}
      <FilterBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        chapterFilter={chapterFilter}
        setChapterFilter={setChapterFilter}
        rarityFilter={rarityFilter}
        setRarityFilter={setRarityFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        layout={layout}
      />

      {/* Results count (hidden in minimal) */}
      {layout !== 'minimal' && (
        <p className={`text-xs mb-6 ${layout === 'codex' ? 'max-w-3xl mx-auto' : ''}`} style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}>
          {filtered.length} of 45 cards
        </p>
      )}

      {/* Card grid — renders differently per layout */}
      {layout === 'codex' ? (
        <CodexGrid cards={filtered} onSelect={setSelectedCard} />
      ) : layout === 'minimal' ? (
        <MinimalGrid cards={filtered} onSelect={setSelectedCard} />
      ) : layout === 'gallery' ? (
        <GalleryGrid cards={filtered} onSelect={setSelectedCard} />
      ) : layout === 'triptych' ? (
        <TriptychGrid cards={filtered} onSelect={setSelectedCard} />
      ) : (
        <ClassicGrid cards={filtered} onSelect={setSelectedCard} />
      )}

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-heading text-sm" style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}>
            No cards match your search. The oracle has nothing to reveal.
          </p>
        </div>
      )}

      <AnimatePresence>
        {selectedCard && (
          <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
