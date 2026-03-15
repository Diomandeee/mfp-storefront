'use client';

import FlowerOfLife from './FlowerOfLife';

export default function Footer() {
  return (
    <footer className="py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background geometry */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
        <FlowerOfLife size={400} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Top divider */}
        <div className="h-px mb-12" style={{ background: 'linear-gradient(to right, transparent, rgb(var(--border) / 0.15), transparent)' }} />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-heading text-sm tracking-[0.15em] uppercase mb-4" style={{ color: 'rgb(var(--text-primary))' }}>
              Meaning Full Power
            </h3>
            <p className="text-xs leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.4)' }}>
              45 oracle cards. 15 chapters of wisdom. NFC-enabled. A journey from concept through challenge to transcendence.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase mb-4 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
              Navigate
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Oracle Deck', href: '#cards' },
                { label: 'Products', href: '#products' },
                { label: 'Chapter Journey', href: '#chapters' },
                { label: 'The Triptych', href: '#triptych' },
                { label: 'NFC Bridge', href: '#nfc' },
              ].map(link => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-xs no-underline transition-opacity hover:opacity-100"
                    style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase mb-4 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
              Products
            </h4>
            <ul className="space-y-2">
              {[
                'Booster Pack',
                'Chapter Pack',
                'Oracle Deck',
                'Display Box',
              ].map(product => (
                <li key={product}>
                  <a
                    href="#products"
                    className="text-xs no-underline transition-opacity hover:opacity-100"
                    style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}
                  >
                    {product}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Social */}
          <div>
            <h4 className="text-[10px] tracking-[0.3em] uppercase mb-4 font-heading" style={{ color: 'rgb(var(--accent) / 0.5)' }}>
              Connect
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Instagram', href: '#' },
                { label: 'Twitter / X', href: '#' },
                { label: 'TikTok', href: '#' },
                { label: 'Contact', href: 'mailto:hello@meaningfullpower.com' },
              ].map(link => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs no-underline transition-opacity hover:opacity-100"
                    style={{ color: 'rgb(var(--text-secondary) / 0.4)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="h-px mb-6" style={{ background: 'linear-gradient(to right, transparent, rgb(var(--border) / 0.08), transparent)' }} />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px]" style={{ color: 'rgb(var(--text-secondary) / 0.25)' }}>
            &copy; {new Date().getFullYear()} Meaning Full Power. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map(link => (
              <a
                key={link}
                href="#"
                className="text-[10px] no-underline transition-opacity hover:opacity-100"
                style={{ color: 'rgb(var(--text-secondary) / 0.25)' }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
