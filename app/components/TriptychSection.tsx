'use client';

import { motion } from 'framer-motion';
import { Lightbulb, Swords, Sun } from 'lucide-react';
import { CARDS } from '../lib/card-manifest';

// Example cards: Chapter 1 (Passion) triptych
const exampleCards = CARDS.filter(c => c.chapter === 1);

const roleConfig = [
  {
    role: 'A',
    label: 'Concept',
    sublabel: 'The Seed of Understanding',
    description: 'Every chapter begins here. The Concept card introduces the core wisdom, the raw idea waiting to be explored. It asks: "What is this truth?"',
    icon: Lightbulb,
    color: '#3B82F6',
  },
  {
    role: 'B',
    label: 'Challenge',
    sublabel: 'The Trial of Growth',
    description: 'Growth requires friction. The Challenge card confronts you with the hard questions, the obstacles that stand between understanding and embodiment.',
    icon: Swords,
    color: '#EF4444',
  },
  {
    role: 'C',
    label: 'Transcendence',
    sublabel: 'The Arrival Beyond',
    description: 'Here, concept and challenge merge into something greater. The Transcendence card reveals what lies on the other side of the struggle. Poetry, not answers.',
    icon: Sun,
    color: '#8B5CF6',
  },
];

export default function TriptychSection() {
  return (
    <section id="triptych" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="section-header text-center mb-16">
        <p className="text-[10px] tracking-[0.4em] uppercase font-heading section-eyebrow mb-3" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
          The Structure
        </p>
        <h2 className="font-heading text-3xl sm:text-4xl mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
          The Sacred Triptych
        </h2>
        <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
          Every chapter unfolds in three acts. Concept plants the seed. Challenge tests the root. Transcendence bears the fruit.
        </p>
      </div>

      {/* Three columns explaining A/B/C */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {roleConfig.map((role, i) => {
          const card = exampleCards.find(c => c.triptych_role === role.role);
          const Icon = role.icon;

          return (
            <motion.div
              key={role.role}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center"
            >
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center"
                style={{
                  background: `${role.color}10`,
                  border: `1px solid ${role.color}20`,
                }}
              >
                <Icon size={24} style={{ color: role.color }} />
              </div>

              {/* Role label */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <span
                  className="text-[10px] font-bold tracking-[0.3em] uppercase px-2 py-0.5 rounded-full"
                  style={{ background: `${role.color}15`, color: role.color }}
                >
                  {role.role}
                </span>
                <h3 className="font-heading text-xl" style={{ color: 'rgb(var(--text-primary))' }}>
                  {role.label}
                </h3>
              </div>

              <p className="text-[10px] tracking-[0.15em] uppercase mb-4" style={{ color: `${role.color}90` }}>
                {role.sublabel}
              </p>

              <p className="text-sm leading-relaxed mb-6" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
                {role.description}
              </p>

              {/* Example card */}
              {card && (
                <div
                  className="p-4 rounded-xl text-left"
                  style={{
                    background: 'rgb(var(--surface))',
                    border: `1px solid ${role.color}15`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[8px] tracking-widest" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                      {card.id}
                    </span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full" style={{ background: `${role.color}10`, color: role.color }}>
                      {card.rarity}
                    </span>
                  </div>
                  <h4 className="font-heading text-sm mb-2" style={{ color: 'rgb(var(--text-primary))' }}>
                    {card.name}
                  </h4>
                  <p className="text-xs italic leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.5)' }}>
                    &ldquo;{card.quote}&rdquo;
                  </p>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Flow diagram */}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        {roleConfig.map((role, i) => (
          <div key={role.role} className="flex items-center gap-2 sm:gap-4">
            <div
              className="px-4 py-2 rounded-lg font-heading text-sm"
              style={{
                background: `${role.color}10`,
                color: role.color,
                border: `1px solid ${role.color}20`,
              }}
            >
              {role.label}
            </div>
            {i < 2 && (
              <div className="text-xs" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                &rarr;
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
