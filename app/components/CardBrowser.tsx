'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Zap, Search, Filter } from 'lucide-react';
import { CARDS, CHAPTERS } from '../lib/card-manifest';
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
        {/* Top accent bar */}
        <div className="h-1" style={{ background: card.theme_color }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full cursor-pointer z-10"
          style={{ background: 'rgb(var(--bg-primary) / 0.5)', color: 'rgb(var(--text-secondary))' }}
        >
          <X size={16} />
        </button>

        <div className="p-8">
          {/* Header */}
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

          {/* Quote */}
          <blockquote
            className="text-base leading-relaxed mb-6 pl-4 italic"
            style={{
              color: 'rgb(var(--text-primary))',
              borderLeft: `2px solid ${card.theme_color}`,
            }}
          >
            &ldquo;{card.quote}&rdquo;
          </blockquote>

          {/* Reflection */}
          <div className="rounded-xl p-4 mb-6" style={{ background: 'rgb(var(--surface))' }}>
            <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-heading" style={{ color: 'rgb(var(--accent))' }}>
              Reflection Prompt
            </p>
            <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-body))' }}>
              {card.reflection_prompt}
            </p>
          </div>

          {/* Stats grid */}
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

function OracleCard({ card, onClick }: { card: Card; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="card-oracle rounded-xl overflow-hidden cursor-pointer"
      style={{
        background: 'rgb(var(--surface))',
        border: '1px solid rgb(var(--border) / 0.1)',
      }}
    >
      {/* Card top accent */}
      <div className="h-0.5" style={{ background: card.theme_color }} />

      {/* Card art placeholder */}
      <div
        className="h-32 relative flex items-center justify-center"
        style={{
          background: `linear-gradient(135deg, ${card.theme_color}10, ${card.theme_color}05)`,
        }}
      >
        <span className="text-3xl opacity-30">{card.theme_icon}</span>
        {/* ID badge */}
        <span
          className="absolute top-2 left-2 text-[8px] tracking-widest uppercase px-1.5 py-0.5 rounded"
          style={{ background: 'rgb(var(--bg-primary) / 0.6)', color: 'rgb(var(--text-secondary) / 0.5)' }}
        >
          {card.id}
        </span>
        {/* Triptych role badge */}
        <span
          className="absolute top-2 right-2 text-[9px] tracking-wider uppercase px-1.5 py-0.5 rounded-full font-bold"
          style={{
            background: card.triptych_role === 'A' ? '#3B82F620' : card.triptych_role === 'B' ? '#EF444420' : '#8B5CF620',
            color: card.triptych_role === 'A' ? '#3B82F6' : card.triptych_role === 'B' ? '#EF4444' : '#8B5CF6',
            border: `1px solid ${card.triptych_role === 'A' ? '#3B82F630' : card.triptych_role === 'B' ? '#EF444430' : '#8B5CF630'}`,
          }}
        >
          {card.triptych_role}
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-1">
          <h4 className="font-heading text-sm" style={{ color: 'rgb(var(--text-primary))' }}>
            {card.name}
          </h4>
          <RarityStars count={card.rarity_stars} />
        </div>

        <p className="text-[10px] mb-3" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
          Ch. {card.chapter} - {card.theme}
        </p>

        {/* Stats bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Zap size={10} style={{ color: card.theme_color }} />
            <span className="text-[10px] font-bold" style={{ color: card.theme_color }}>
              {card.emotional_power}
            </span>
          </div>
          <span
            className="text-[8px] px-1.5 py-0.5 rounded-full tracking-wider uppercase"
            style={{
              background: `${RARITY_COLORS[card.rarity]}10`,
              color: RARITY_COLORS[card.rarity],
            }}
          >
            {card.rarity}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

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

  const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const types = ['Wisdom', 'Reflection', 'Poem', 'Theme', 'Legendary'];

  const gridClass = layout === 'gallery'
    ? 'card-grid'
    : layout === 'triptych'
    ? 'grid grid-cols-1 sm:grid-cols-3 gap-4'
    : layout === 'minimal'
    ? 'grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto'
    : layout === 'codex'
    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto'
    : 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4';

  return (
    <section id="cards" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section header */}
      <div className="text-center mb-12">
        <p className="text-[10px] tracking-[0.4em] uppercase font-heading mb-3" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
          The Collection
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
          Oracle Deck
        </h2>
        <p className="text-sm max-w-md mx-auto" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
          Forty-five cards of wisdom, challenge, and transcendence. Each one a mirror for the soul.
        </p>
      </div>

      {/* Search and filter bar */}
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
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'rgb(var(--accent))' }}
            />
          )}
        </button>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-8"
          >
            <div className="rounded-xl p-6" style={{ background: 'rgb(var(--surface))', border: '1px solid rgb(var(--border) / 0.1)' }}>
              {/* Chapter filter */}
              <div className="mb-4">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
                  Chapter
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setChapterFilter(null)}
                    className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer"
                    style={{
                      background: chapterFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                      color: chapterFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)',
                      border: `1px solid ${chapterFilter === null ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border) / 0.1)'}`,
                    }}
                  >
                    All
                  </button>
                  {CHAPTERS.map(ch => (
                    <button
                      key={ch.number}
                      onClick={() => setChapterFilter(ch.number)}
                      className="px-3 py-1 rounded-lg text-[10px] tracking-wider cursor-pointer"
                      style={{
                        background: chapterFilter === ch.number ? `${ch.color}20` : 'transparent',
                        color: chapterFilter === ch.number ? ch.color : 'rgb(var(--text-secondary) / 0.5)',
                        border: `1px solid ${chapterFilter === ch.number ? `${ch.color}30` : 'rgb(var(--border) / 0.1)'}`,
                      }}
                    >
                      {ch.number}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rarity filter */}
              <div className="mb-4">
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
                  Rarity
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setRarityFilter(null)}
                    className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer"
                    style={{
                      background: rarityFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                      color: rarityFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)',
                      border: `1px solid ${rarityFilter === null ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border) / 0.1)'}`,
                    }}
                  >
                    All
                  </button>
                  {rarities.map(r => (
                    <button
                      key={r}
                      onClick={() => setRarityFilter(r)}
                      className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer"
                      style={{
                        background: rarityFilter === r ? `${RARITY_COLORS[r]}15` : 'transparent',
                        color: rarityFilter === r ? RARITY_COLORS[r] : 'rgb(var(--text-secondary) / 0.5)',
                        border: `1px solid ${rarityFilter === r ? `${RARITY_COLORS[r]}30` : 'rgb(var(--border) / 0.1)'}`,
                      }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Type filter */}
              <div>
                <p className="text-[10px] tracking-[0.2em] uppercase mb-2 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
                  Card Type
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <button
                    onClick={() => setTypeFilter(null)}
                    className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer"
                    style={{
                      background: typeFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                      color: typeFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)',
                      border: `1px solid ${typeFilter === null ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border) / 0.1)'}`,
                    }}
                  >
                    All
                  </button>
                  {types.map(t => (
                    <button
                      key={t}
                      onClick={() => setTypeFilter(t)}
                      className="px-3 py-1 rounded-lg text-[10px] tracking-wider uppercase cursor-pointer"
                      style={{
                        background: typeFilter === t ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                        color: typeFilter === t ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.5)',
                        border: `1px solid ${typeFilter === t ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--border) / 0.1)'}`,
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results count */}
      <p className="text-xs mb-6" style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}>
        {filtered.length} of 45 cards
      </p>

      {/* Card grid */}
      <div className={gridClass}>
        <AnimatePresence mode="popLayout">
          {filtered.map(card => (
            <div key={card.id} className={layout === 'gallery' ? 'card-item' : ''}>
              <OracleCard card={card} onClick={() => setSelectedCard(card)} />
            </div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <p className="font-heading text-sm" style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}>
            No cards match your search. The oracle has nothing to reveal.
          </p>
        </div>
      )}

      {/* Card detail modal */}
      <AnimatePresence>
        {selectedCard && (
          <CardDetailModal card={selectedCard} onClose={() => setSelectedCard(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
