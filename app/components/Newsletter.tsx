'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Placeholder for actual submission
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setEmail('');
    }, 3000);
  };

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div
            className="w-14 h-14 rounded-2xl mx-auto mb-6 flex items-center justify-center"
            style={{
              background: 'rgb(var(--accent) / 0.08)',
              border: '1px solid rgb(var(--accent) / 0.1)',
            }}
          >
            <Mail size={22} style={{ color: 'rgb(var(--accent))' }} />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl mb-3" style={{ color: 'rgb(var(--text-primary))' }}>
            Receive the Oracle
          </h2>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.5)' }}>
            Weekly card draws, chapter reflections, and wisdom from the deck. No noise, only signal.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
              style={{
                background: 'rgb(var(--surface))',
                color: 'rgb(var(--text-primary))',
                border: '1px solid rgb(var(--border) / 0.15)',
              }}
            />
            <button
              type="submit"
              disabled={submitted}
              className="px-6 py-3 rounded-xl font-heading text-xs tracking-[0.15em] uppercase cursor-pointer transition-all flex items-center gap-2"
              style={{
                background: submitted ? 'rgb(var(--accent) / 0.2)' : 'rgb(var(--accent))',
                color: submitted ? 'rgb(var(--accent))' : 'rgb(var(--bg-primary))',
              }}
            >
              {submitted ? (
                <>
                  <Check size={14} />
                  Received
                </>
              ) : (
                <>
                  Draw
                  <ArrowRight size={14} />
                </>
              )}
            </button>
          </form>

          <p className="text-[10px] mt-4" style={{ color: 'rgb(var(--text-secondary) / 0.3)' }}>
            One email per week. Unsubscribe anytime. Your data stays sacred.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
