'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    quote: 'I drew The Mending on the worst day of my year. The reflection prompt made me sit with something I had been running from for months. That card changed how I process pain.',
    name: 'Amara K.',
    context: 'Drew Chapter 3: Healing Our Brokenness',
    card: 'MFP-009',
  },
  {
    quote: 'The triptych structure is brilliant. You start with a concept, get challenged, then the transcendence card hits you with something you were not ready to hear. Every chapter is a complete journey.',
    name: 'David R.',
    context: 'Completed all 15 chapter triptychs',
    card: 'Full Deck',
  },
  {
    quote: 'Tapped The Eternal with my phone and the NFC unlocked this guided reflection. My kids asked what I was doing and we ended up having the deepest conversation we have ever had.',
    name: 'Selene M.',
    context: 'Drew Chapter 15: Life is Longest',
    card: 'MFP-045',
  },
  {
    quote: 'I keep The Ascension on my desk. Four stars, epic rarity. Every morning I read the quote and remember that I have outgrown the boxes people built for me. It is that simple and that powerful.',
    name: 'Jamal T.',
    context: 'Drew Chapter 5: Transcendent Life',
    card: 'MFP-015',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <p className="text-[10px] tracking-[0.4em] uppercase font-heading mb-3" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
          Witnesses
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
          Cards That Found Their People
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl relative"
            style={{
              background: 'rgb(var(--surface))',
              border: '1px solid rgb(var(--border) / 0.08)',
            }}
          >
            <Quote
              size={20}
              className="mb-4"
              style={{ color: 'rgb(var(--accent) / 0.15)' }}
            />
            <p className="text-sm leading-relaxed mb-6 italic" style={{ color: 'rgb(var(--text-body) / 0.7)' }}>
              &ldquo;{t.quote}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-heading" style={{ color: 'rgb(var(--text-primary))' }}>
                  {t.name}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}>
                  {t.context}
                </p>
              </div>
              <span
                className="text-[9px] tracking-widest font-heading px-2 py-1 rounded"
                style={{
                  background: 'rgb(var(--accent) / 0.05)',
                  color: 'rgb(var(--accent) / 0.4)',
                }}
              >
                {t.card}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
