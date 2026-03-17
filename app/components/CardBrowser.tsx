'use client';

import type { CSSProperties } from 'react';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { Filter, Search, Star, Zap } from 'lucide-react';
import { CARDS, CHAPTERS, getCardsByChapter } from '../lib/card-manifest';
import type { Card } from '../lib/card-manifest';
import { useTheme } from '../lib/theme-context';

const RARITY_COLORS: Record<Card['rarity'], string> = {
  Common: '#9CA3AF',
  Uncommon: '#34D399',
  Rare: '#60A5FA',
  Epic: '#A78BFA',
  Legendary: '#F59E0B',
};

const ROLE_LABELS: Record<Card['triptych_role'], string> = {
  A: 'Concept',
  B: 'Challenge',
  C: 'Transcendence',
};

const GALLERY_VARIANTS = [
  { width: '100%', marginLeft: '0%', marginTop: '0rem' },
  { width: '90%', marginLeft: '10%', marginTop: '1.25rem' },
  { width: '82%', marginLeft: '4%', marginTop: '0.5rem' },
  { width: '96%', marginLeft: '0%', marginTop: '1.75rem' },
  { width: '88%', marginLeft: '8%', marginTop: '0rem' },
];

function CardArtwork({
  card,
  alt,
  className = '',
  style,
  interactive = false,
}: {
  card: Card;
  alt?: string;
  className?: string;
  style?: CSSProperties;
  interactive?: boolean;
}) {
  const baseFilter = style?.filter || 'drop-shadow(0 18px 28px rgb(0 0 0 / 0.32))';
  const imageStyle = { ...style };
  delete imageStyle.filter;

  const image = (
    <img
      src={`/cards/${card.id}.png`}
      alt={alt || `${card.name} — ${card.chapter_title}`}
      loading="lazy"
      width={280}
      height={464}
      className={`block h-auto w-full ${className}`.trim()}
      style={interactive ? imageStyle : { filter: baseFilter, ...imageStyle }}
    />
  );

  if (!interactive) return image;

  return (
    <motion.div
      className="w-full"
      style={{ filter: baseFilter }}
      whileHover={{
        filter: [
          baseFilter,
          `${baseFilter} drop-shadow(0 0 18px ${card.theme_color}88) drop-shadow(0 0 46px ${card.theme_color}36)`,
          `${baseFilter} drop-shadow(0 0 14px ${card.theme_color}72) drop-shadow(0 0 30px ${card.theme_color}28)`,
        ],
      }}
      transition={{ duration: 0.55, times: [0, 0.45, 1], ease: 'easeOut' }}
    >
      {image}
    </motion.div>
  );
}

function RarityStars({ count }: { count: number }) {
  const fills = Object.values(RARITY_COLORS);

  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, index) => {
        const filled = index < count;
        const color = fills[Math.min(count - 1, fills.length - 1)] || fills[0];

        return (
          <Star
            key={index}
            size={10}
            fill={filled ? color : 'transparent'}
            stroke={filled ? color : 'rgb(var(--text-secondary) / 0.18)'}
            strokeWidth={1.5}
          />
        );
      })}
    </div>
  );
}

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
  setSearchQuery: (value: string) => void;
  showFilters: boolean;
  setShowFilters: (value: boolean) => void;
  chapterFilter: number | null;
  setChapterFilter: (value: number | null) => void;
  rarityFilter: Card['rarity'] | null;
  setRarityFilter: (value: Card['rarity'] | null) => void;
  typeFilter: Card['type'] | null;
  setTypeFilter: (value: Card['type'] | null) => void;
  layout: string;
}) {
  if (layout === 'minimal') return null;

  const rarities: Card['rarity'][] = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const types: Card['type'][] = ['Wisdom', 'Reflection', 'Poem', 'Theme', 'Legendary'];

  return (
    <>
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className={`relative flex-1 ${layout === 'codex' ? 'max-w-3xl' : 'max-w-md'}`}>
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: 'rgb(var(--text-secondary) / 0.38)' }}
          />
          <input
            type="text"
            placeholder="Search by name, quote, or theme..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-full py-3 pl-10 pr-4 text-sm outline-none"
            style={{
              background: 'rgb(var(--surface))',
              color: 'rgb(var(--text-primary))',
              border: '1px solid rgb(var(--border) / 0.12)',
            }}
          />
        </div>
        <button
          type="button"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center justify-center gap-2 rounded-full px-4 py-3 text-[11px] tracking-[0.18em] uppercase"
          style={{
            background: showFilters ? 'rgb(var(--accent) / 0.12)' : 'rgb(var(--surface))',
            color: showFilters ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary))',
            border: '1px solid rgb(var(--border) / 0.12)',
          }}
        >
          <Filter size={14} />
          Filters
          {(chapterFilter !== null || rarityFilter || typeFilter) && (
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--accent))' }} />
          )}
        </button>
      </div>

      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <div
              className="mb-8 rounded-[24px] p-5 sm:p-6"
              style={{
                background: 'rgb(var(--surface))',
                border: '1px solid rgb(var(--border) / 0.12)',
              }}
            >
              <div className="mb-5">
                <p className="mb-2 text-[10px] tracking-[0.24em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.55)' }}>
                  Chapter
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setChapterFilter(null)}
                    className="rounded-full px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase"
                    style={{
                      background: chapterFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                      color: chapterFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.55)',
                      border: `1px solid ${chapterFilter === null ? 'rgb(var(--accent) / 0.24)' : 'rgb(var(--border) / 0.12)'}`,
                    }}
                  >
                    All
                  </button>
                  {CHAPTERS.map((chapter) => (
                    <button
                      key={chapter.number}
                      type="button"
                      onClick={() => setChapterFilter(chapter.number)}
                      className="rounded-full px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase"
                      style={{
                        background: chapterFilter === chapter.number ? `${chapter.color}18` : 'transparent',
                        color: chapterFilter === chapter.number ? chapter.color : 'rgb(var(--text-secondary) / 0.55)',
                        border: `1px solid ${chapterFilter === chapter.number ? `${chapter.color}30` : 'rgb(var(--border) / 0.12)'}`,
                      }}
                    >
                      {chapter.number}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <p className="mb-2 text-[10px] tracking-[0.24em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.55)' }}>
                  Rarity
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setRarityFilter(null)}
                    className="rounded-full px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase"
                    style={{
                      background: rarityFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                      color: rarityFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.55)',
                      border: `1px solid ${rarityFilter === null ? 'rgb(var(--accent) / 0.24)' : 'rgb(var(--border) / 0.12)'}`,
                    }}
                  >
                    All
                  </button>
                  {rarities.map((rarity) => (
                    <button
                      key={rarity}
                      type="button"
                      onClick={() => setRarityFilter(rarity)}
                      className="rounded-full px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase"
                      style={{
                        background: rarityFilter === rarity ? `${RARITY_COLORS[rarity]}18` : 'transparent',
                        color: rarityFilter === rarity ? RARITY_COLORS[rarity] : 'rgb(var(--text-secondary) / 0.55)',
                        border: `1px solid ${rarityFilter === rarity ? `${RARITY_COLORS[rarity]}30` : 'rgb(var(--border) / 0.12)'}`,
                      }}
                    >
                      {rarity}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-[10px] tracking-[0.24em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.55)' }}>
                  Card Type
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setTypeFilter(null)}
                    className="rounded-full px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase"
                    style={{
                      background: typeFilter === null ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                      color: typeFilter === null ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.55)',
                      border: `1px solid ${typeFilter === null ? 'rgb(var(--accent) / 0.24)' : 'rgb(var(--border) / 0.12)'}`,
                    }}
                  >
                    All
                  </button>
                  {types.map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setTypeFilter(type)}
                      className="rounded-full px-3 py-1.5 text-[10px] tracking-[0.18em] uppercase"
                      style={{
                        background: typeFilter === type ? 'rgb(var(--accent) / 0.15)' : 'transparent',
                        color: typeFilter === type ? 'rgb(var(--accent))' : 'rgb(var(--text-secondary) / 0.55)',
                        border: `1px solid ${typeFilter === type ? 'rgb(var(--accent) / 0.24)' : 'rgb(var(--border) / 0.12)'}`,
                      }}
                    >
                      {type}
                    </button>
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

function ClassicGrid({ cards, onSelect }: { cards: Card[]; onSelect: (card: Card) => void }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
      <AnimatePresence mode="popLayout">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            type="button"
            layout
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96 }}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.28 }}
            onClick={() => onSelect(card)}
            className="w-full bg-transparent p-0 text-left"
          >
            <CardArtwork card={card} interactive />
            <div className="mt-3 flex items-start justify-between gap-3">
              <div>
                <p className="font-heading text-base" style={{ color: 'rgb(var(--text-primary))' }}>
                  {card.name}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.48)' }}>
                  Chapter {card.chapter}
                </p>
              </div>
              <span className="pt-0.5 text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgb(var(--accent) / 0.65)' }}>
                {card.id.replace('MFP-', '')}
              </span>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

function CodexGrid({ cards, onSelect }: { cards: Card[]; onSelect: (card: Card) => void }) {
  return (
    <div className="mx-auto max-w-5xl">
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => (
          <motion.button
            key={card.id}
            type="button"
            layout
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.26, delay: index * 0.015 }}
            onClick={() => onSelect(card)}
            className="grid w-full gap-5 border-0 bg-transparent py-6 text-left sm:grid-cols-[120px_minmax(0,1fr)]"
            style={{ borderBottom: '1px solid rgb(var(--border) / 0.08)' }}
          >
            <div className="w-full max-w-[120px]">
              <CardArtwork card={card} alt={card.name} interactive />
            </div>
            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-2">
                <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: 'rgb(var(--accent) / 0.65)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-[10px] tracking-[0.16em] uppercase" style={{ color: card.theme_color }}>
                  {card.id}
                </span>
                <span
                  className="rounded-full px-2 py-0.5 text-[9px] tracking-[0.16em] uppercase"
                  style={{
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
              <p className="mt-1 text-sm" style={{ color: 'rgb(var(--text-body) / 0.72)' }}>
                Chapter {card.chapter}: {card.chapter_title}
              </p>
              <p className="mt-4 max-w-2xl text-sm italic leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.68)' }}>
                &ldquo;{card.quote}&rdquo;
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] uppercase tracking-[0.16em]">
                <span style={{ color: 'rgb(var(--text-secondary) / 0.46)' }}>{ROLE_LABELS[card.triptych_role]}</span>
                <span style={{ color: 'rgb(var(--text-secondary) / 0.46)' }}>{card.type}</span>
                <span className="flex items-center gap-1" style={{ color: card.theme_color }}>
                  <Zap size={10} />
                  {card.emotional_power}
                </span>
              </div>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

function MinimalGrid({ cards, onSelect }: { cards: Card[]; onSelect: (card: Card) => void }) {
  return (
    <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-10 gap-y-14 lg:grid-cols-3">
      <AnimatePresence mode="popLayout">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            type="button"
            layout
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98 }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            onClick={() => onSelect(card)}
            className="w-full bg-transparent p-0 text-center"
          >
            <CardArtwork card={card} interactive />
            <div className="mt-4">
              <p className="font-heading text-lg" style={{ color: 'rgb(var(--text-primary))' }}>
                {card.name}
              </p>
              <p className="mt-1 text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
                Chapter {card.chapter} • {ROLE_LABELS[card.triptych_role]}
              </p>
            </div>
          </motion.button>
        ))}
      </AnimatePresence>
    </div>
  );
}

function GalleryGrid({ cards, onSelect }: { cards: Card[]; onSelect: (card: Card) => void }) {
  return (
    <div className="mx-auto max-w-7xl columns-1 sm:columns-2 xl:columns-3 2xl:columns-4" style={{ columnGap: '1.25rem' }}>
      <AnimatePresence mode="popLayout">
        {cards.map((card, index) => {
          const placement = GALLERY_VARIANTS[index % GALLERY_VARIANTS.length];

          return (
            <motion.button
              key={card.id}
              type="button"
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.24 }}
              onClick={() => onSelect(card)}
              className="group mb-5 block break-inside-avoid bg-transparent p-0 text-left"
              style={placement}
            >
              <div className="relative">
                <CardArtwork
                  card={card}
                  interactive
                  className="transition-transform duration-500 group-hover:scale-[1.02]"
                  style={{ filter: 'drop-shadow(0 22px 34px rgb(0 0 0 / 0.34))' }}
                />
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(180deg, transparent 38%, rgb(0 0 0 / 0.82) 100%)' }}
                />
                <div className="absolute inset-x-0 bottom-0 translate-y-2 px-4 pb-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-heading text-lg text-white">{card.name}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.18em]" style={{ color: 'rgb(255 255 255 / 0.7)' }}>
                    Chapter {card.chapter} • {ROLE_LABELS[card.triptych_role]}
                  </p>
                </div>
              </div>
            </motion.button>
          );
        })}
      </AnimatePresence>
    </div>
  );
}

function TriptychGrid({ cards, onSelect }: { cards: Card[]; onSelect: (card: Card) => void }) {
  const visibleIds = new Set(cards.map((card) => card.id));

  return (
    <div className="space-y-14">
      {CHAPTERS.map((chapter) => {
        const chapterCards = getCardsByChapter(chapter.number).filter((card) => visibleIds.has(card.id));

        if (chapterCards.length === 0) return null;

        return (
          <section key={chapter.number} className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
            <div className="lg:pt-8">
              <div className="mb-3 flex items-center gap-3">
                <span
                  className="rounded-full px-3 py-1 text-[10px] tracking-[0.22em] uppercase font-heading"
                  style={{
                    background: `${chapter.color}18`,
                    color: chapter.color,
                    border: `1px solid ${chapter.color}30`,
                  }}
                >
                  Chapter {chapter.number}
                </span>
                <div className="h-px flex-1" style={{ background: `${chapter.color}28` }} />
              </div>
              <h3 className="font-heading text-xl" style={{ color: 'rgb(var(--text-primary))' }}>
                {chapter.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.68)' }}>
                {chapter.theme}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 md:grid-cols-3">
              {chapterCards.map((card) => (
                <motion.button
                  key={card.id}
                  type="button"
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.28 }}
                  onClick={() => onSelect(card)}
                  className="w-full bg-transparent p-0 text-left"
                >
                  <p
                    className="mb-3 text-[10px] tracking-[0.2em] uppercase"
                    style={{ color: card.theme_color }}
                  >
                    {ROLE_LABELS[card.triptych_role]}
                  </p>
                  <CardArtwork card={card} alt={card.name} interactive />
                  <div className="mt-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-heading text-base" style={{ color: 'rgb(var(--text-primary))' }}>
                        {card.name}
                      </p>
                      <p className="mt-1 text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.5)' }}>
                        {card.type}
                      </p>
                    </div>
                    <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.42)' }}>
                      {card.id.replace('MFP-', '')}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function CardBrowser() {
  const { layout } = useTheme();
  const router = useRouter();
  const [chapterFilter, setChapterFilter] = useState<number | null>(null);
  const [rarityFilter, setRarityFilter] = useState<Card['rarity'] | null>(null);
  const [typeFilter, setTypeFilter] = useState<Card['type'] | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCards = useMemo(() => {
    let cards = [...CARDS];

    if (chapterFilter !== null) cards = cards.filter((card) => card.chapter === chapterFilter);
    if (rarityFilter) cards = cards.filter((card) => card.rarity === rarityFilter);
    if (typeFilter) cards = cards.filter((card) => card.type === typeFilter);

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      cards = cards.filter((card) =>
        card.name.toLowerCase().includes(query) ||
        card.quote.toLowerCase().includes(query) ||
        card.theme.toLowerCase().includes(query),
      );
    }

    return cards;
  }, [chapterFilter, rarityFilter, typeFilter, searchQuery]);

  const headerAlignment =
    layout === 'codex' || layout === 'triptych'
      ? 'mx-auto max-w-5xl text-left'
      : layout === 'gallery'
        ? 'mx-auto max-w-6xl text-left'
        : 'text-center';

  const headings = {
    classic: {
      eyebrow: 'Collection',
      title: 'Oracle Deck',
      description: 'Forty-five complete card renders arranged as a clean browseable deck.',
    },
    codex: {
      eyebrow: 'Index',
      title: 'Card Index',
      description: 'A manuscript-style list with every card logged as a numbered entry.',
    },
    minimal: {
      eyebrow: 'Deck',
      title: 'Oracle Deck',
      description: '',
    },
    gallery: {
      eyebrow: 'Gallery',
      title: 'Card Wall',
      description: 'A loose visual archive of the deck with hover-only identity reveal.',
    },
    triptych: {
      eyebrow: 'Triptychs',
      title: 'Chapter Groups',
      description: 'Fifteen chapter triptychs arranged as Concept, Challenge, and Transcendence.',
    },
  }[layout];

  return (
    <section id="cards" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className={`mb-12 ${headerAlignment}`}>
        <p className="mb-3 text-[10px] tracking-[0.4em] uppercase font-heading section-eyebrow" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
          {headings.eyebrow}
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl" style={{ color: 'rgb(var(--text-primary))' }}>
          {headings.title}
        </h2>
        {layout !== 'minimal' && (
          <p className={`mt-4 text-sm leading-relaxed ${layout === 'codex' || layout === 'triptych' ? 'max-w-3xl' : 'mx-auto max-w-2xl'}`} style={{ color: 'rgb(var(--text-body) / 0.66)' }}>
            {headings.description}
          </p>
        )}
      </div>

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

      {layout !== 'minimal' && (
        <p className={`mb-8 text-xs ${layout === 'codex' || layout === 'triptych' ? 'mx-auto max-w-5xl' : ''}`} style={{ color: 'rgb(var(--text-secondary) / 0.42)' }}>
          {filteredCards.length} of 45 cards
        </p>
      )}

      {(() => {
        const LayoutComponent = {
          classic: ClassicGrid,
          codex: CodexGrid,
          minimal: MinimalGrid,
          gallery: GalleryGrid,
          triptych: TriptychGrid,
        }[layout] || ClassicGrid;
        return <LayoutComponent cards={filteredCards} onSelect={(card) => router.push(`/cards/${card.id}`)} />;
      })()}

      {filteredCards.length === 0 && (
        <div className="py-16 text-center">
          <p className="font-heading text-sm" style={{ color: 'rgb(var(--text-secondary) / 0.45)' }}>
            No cards match your search. The oracle has nothing to reveal.
          </p>
        </div>
      )}

    </section>
  );
}
