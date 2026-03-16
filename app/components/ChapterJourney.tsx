'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Star, Zap } from 'lucide-react';
import { CHAPTERS, CARDS, getCardsByChapter } from '../lib/card-manifest';
import { useTheme } from '../lib/theme-context';

export default function ChapterJourney() {
  const [expandedChapter, setExpandedChapter] = useState<number | null>(null);
  const { layout } = useTheme();

  const toggle = (num: number) => {
    setExpandedChapter(prev => (prev === num ? null : num));
  };

  return (
    <section id="chapters" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className={`section-header mb-16 ${layout === 'codex' ? 'text-left max-w-2xl mx-auto' : 'text-center'}`}>
        <p className="text-[10px] tracking-[0.4em] uppercase font-heading section-eyebrow mb-3" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
          The Path
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
          15 Chapters of Wisdom
        </h2>
        <p className={`text-sm ${layout === 'codex' ? '' : 'max-w-lg mx-auto'}`} style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
          Each chapter holds three cards forming a triptych: Concept, Challenge, and Transcendence. Walk the path from awakening to mastery.
        </p>
      </div>

      {/* Journey path */}
      <div className={layout === 'codex' ? 'max-w-2xl mx-auto' : 'max-w-4xl mx-auto'}>
        {CHAPTERS.map((chapter, i) => {
          const cards = getCardsByChapter(chapter.number);
          const isExpanded = expandedChapter === chapter.number;
          const totalPower = cards.reduce((sum, c) => sum + c.emotional_power, 0);

          return (
            <div key={chapter.number} className="relative">
              {/* Connecting line */}
              {i < CHAPTERS.length - 1 && (
                <div
                  className="absolute left-6 top-14 bottom-0 w-px"
                  style={{ background: `linear-gradient(to bottom, ${chapter.color}30, ${CHAPTERS[i + 1]?.color || chapter.color}10)` }}
                />
              )}

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                {/* Chapter header */}
                <button
                  onClick={() => toggle(chapter.number)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all text-left group"
                  style={{
                    background: isExpanded ? 'rgb(var(--surface))' : 'transparent',
                    border: isExpanded ? '1px solid rgb(var(--border) / 0.1)' : '1px solid transparent',
                  }}
                >
                  {/* Chapter number circle */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-heading relative z-10"
                    style={{
                      background: `${chapter.color}15`,
                      color: chapter.color,
                      border: `1px solid ${chapter.color}30`,
                    }}
                  >
                    {chapter.number}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-heading text-sm truncate" style={{ color: 'rgb(var(--text-primary))' }}>
                        {chapter.title}
                      </h3>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px]" style={{ color: chapter.color }}>
                        {chapter.theme}
                      </span>
                      <span className="text-[9px]" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                        {totalPower} total power
                      </span>
                    </div>
                  </div>

                  <motion.div
                    animate={{ rotate: isExpanded ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronRight size={16} style={{ color: 'rgb(var(--text-secondary) / 0.3)' }} />
                  </motion.div>
                </button>

                {/* Expanded cards */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 py-4 pl-16 pr-4">
                        {cards.map(card => (
                          <div
                            key={card.id}
                            className="p-4 rounded-xl"
                            style={{
                              background: 'rgb(var(--bg-secondary))',
                              border: '1px solid rgb(var(--border) / 0.08)',
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className="text-[9px] px-1.5 py-0.5 rounded-full font-bold tracking-wider"
                                style={{
                                  background: card.triptych_role === 'A' ? '#3B82F615' : card.triptych_role === 'B' ? '#EF444415' : '#8B5CF615',
                                  color: card.triptych_role === 'A' ? '#3B82F6' : card.triptych_role === 'B' ? '#EF4444' : '#8B5CF6',
                                }}
                              >
                                {card.triptych_role_name}
                              </span>
                              <span className="text-[8px]" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                                {card.id}
                              </span>
                            </div>
                            <h4 className="font-heading text-sm mb-2" style={{ color: 'rgb(var(--text-primary))' }}>
                              {card.name}
                            </h4>
                            <p className="text-[11px] leading-relaxed italic mb-3" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
                              &ldquo;{card.quote.slice(0, 80)}...&rdquo;
                            </p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1">
                                <Zap size={10} style={{ color: chapter.color }} />
                                <span className="text-[10px] font-bold" style={{ color: chapter.color }}>{card.emotional_power}</span>
                              </div>
                              <div className="flex gap-0.5">
                                {Array.from({ length: card.rarity_stars }).map((_, si) => (
                                  <Star key={si} size={8} fill={chapter.color} stroke={chapter.color} />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
