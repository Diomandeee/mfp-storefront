'use client';

import { motion } from 'framer-motion';
import { Smartphone, Nfc, Scan, Sparkles, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: Nfc,
    title: 'Physical Card',
    description: 'Each of the 45 oracle cards contains an NTAG215 NFC chip embedded in premium card stock.',
  },
  {
    icon: Smartphone,
    title: 'Tap to Reveal',
    description: 'Hold your phone to any card. The NFC chip activates a digital experience unique to that card.',
  },
  {
    icon: Scan,
    title: 'QR Fallback',
    description: 'No NFC? Every card also carries a QR code linking to the same digital wisdom portal.',
  },
  {
    icon: Sparkles,
    title: 'Digital Expansion',
    description: 'Access extended reflections, guided meditations, and chapter-specific rituals. Physical meets digital.',
  },
];

export default function NFCBridge() {
  return (
    <section id="nfc" className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[10px] tracking-[0.4em] uppercase font-heading mb-3" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
            Technology
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
            The NFC Bridge
          </h2>
          <p className="text-sm max-w-lg mx-auto" style={{ color: 'rgb(var(--text-body) / 0.6)' }}>
            Where ancient wisdom meets modern technology. Every physical card is a portal to something deeper.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative p-6 rounded-2xl"
                style={{
                  background: 'rgb(var(--surface))',
                  border: '1px solid rgb(var(--border) / 0.08)',
                }}
              >
                {/* Step number */}
                <span
                  className="absolute top-4 right-4 text-[9px] tracking-widest font-heading"
                  style={{ color: 'rgb(var(--accent) / 0.2)' }}
                >
                  0{i + 1}
                </span>

                <div
                  className="w-12 h-12 rounded-xl mb-4 flex items-center justify-center"
                  style={{
                    background: 'rgb(var(--accent) / 0.08)',
                    border: '1px solid rgb(var(--accent) / 0.1)',
                  }}
                >
                  <Icon size={20} style={{ color: 'rgb(var(--accent))' }} />
                </div>

                <h3 className="font-heading text-base mb-2" style={{ color: 'rgb(var(--text-primary))' }}>
                  {step.title}
                </h3>
                <p className="text-xs leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.5)' }}>
                  {step.description}
                </p>

                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight size={14} style={{ color: 'rgb(var(--accent) / 0.15)' }} />
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Specs bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-2xl flex flex-wrap justify-center gap-8 sm:gap-16"
          style={{
            background: 'rgb(var(--surface))',
            border: '1px solid rgb(var(--border) / 0.08)',
          }}
        >
          {[
            { label: 'Card Size', value: '70 x 120mm' },
            { label: 'NFC Chip', value: 'NTAG215' },
            { label: 'Card Stock', value: '280-350gsm' },
            { label: 'Editions', value: '4 Variants' },
          ].map(spec => (
            <div key={spec.label} className="text-center">
              <div className="font-heading text-sm" style={{ color: 'rgb(var(--text-primary))' }}>
                {spec.value}
              </div>
              <div className="text-[9px] tracking-[0.2em] uppercase mt-1" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
                {spec.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
