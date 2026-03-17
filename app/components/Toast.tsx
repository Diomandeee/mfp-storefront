'use client';

import { AnimatePresence, motion } from 'framer-motion';

export interface ToastMessage {
  title: string;
  detail: string;
}

export default function Toast({ toast }: { toast: ToastMessage | null }) {
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.98 }}
          transition={{ duration: 0.24, ease: 'easeOut' }}
          className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,24rem)] -translate-x-1/2 overflow-hidden rounded-[24px] px-5 py-4"
          style={{
            background: 'linear-gradient(135deg, rgb(var(--surface)), rgb(var(--bg-secondary)))',
            color: 'rgb(var(--text-primary))',
            border: '1px solid rgb(var(--accent) / 0.24)',
            boxShadow: '0 0 28px rgb(var(--accent) / 0.22), 0 18px 52px rgb(0 0 0 / 0.3)',
          }}
        >
          <div
            className="absolute inset-x-8 top-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgb(var(--accent)), transparent)' }}
          />
          <p
            className="text-[10px] tracking-[0.28em] uppercase font-heading"
            style={{ color: 'rgb(var(--accent))' }}
          >
            {toast.title}
          </p>
          <p className="mt-1 font-heading text-base" style={{ color: 'rgb(var(--text-primary))' }}>
            {toast.detail}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
