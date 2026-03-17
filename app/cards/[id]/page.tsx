import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Star, Zap, ArrowLeft } from 'lucide-react';
import { CARDS } from '../../lib/card-manifest';

type CardPageProps = {
  params: Promise<{ id: string }>;
};

const RARITY_COLORS: Record<(typeof CARDS)[number]['rarity'], string> = {
  Common: '#9CA3AF',
  Uncommon: '#34D399',
  Rare: '#60A5FA',
  Epic: '#A78BFA',
  Legendary: '#F59E0B',
};

function getCardById(id: string) {
  return CARDS.find((card) => card.id.toUpperCase() === id.toUpperCase());
}

export async function generateStaticParams() {
  return CARDS.map((card) => ({ id: card.id }));
}

export async function generateMetadata({ params }: CardPageProps): Promise<Metadata> {
  const { id } = await params;
  const card = getCardById(id);

  if (!card) {
    return {
      title: 'Card Not Found | Meaning Full Power',
    };
  }

  return {
    title: `${card.name} | Meaning Full Power`,
    description: card.quote,
  };
}

export default async function CardDetailPage({ params }: CardPageProps) {
  const { id } = await params;
  const card = getCardById(id);

  if (!card) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <Link
        href="/#cards"
        className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[11px] tracking-[0.18em] uppercase font-heading no-underline"
        style={{
          background: 'rgb(var(--surface))',
          color: 'rgb(var(--text-primary))',
          border: '1px solid rgb(var(--border) / 0.14)',
        }}
      >
        <ArrowLeft size={14} />
        Back To Deck
      </Link>

      <section
        className="overflow-hidden rounded-[32px] p-6 sm:p-8 lg:p-10"
        style={{
          background: 'linear-gradient(145deg, rgb(var(--bg-secondary)), rgb(var(--bg-primary)))',
          border: '1px solid rgb(var(--border) / 0.14)',
          boxShadow: `0 24px 90px ${card.theme_color}1f`,
        }}
      >
        <div className="grid gap-10 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)] lg:gap-14">
          <div className="mx-auto w-full max-w-[360px]">
            <Image
              src={`/cards/${card.id}.webp`}
              alt={`${card.name} — ${card.chapter_title}`}
              width={360}
              height={596}
              priority
              className="block h-auto w-full"
              style={{
                filter: `drop-shadow(0 28px 44px rgb(0 0 0 / 0.34)) drop-shadow(0 0 24px ${card.theme_color}2f)`,
              }}
            />
          </div>

          <div className="min-w-0">
            <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="text-[10px] tracking-[0.22em] uppercase" style={{ color: card.theme_color }}>
                    {card.id}
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[9px] tracking-[0.18em] uppercase"
                    style={{
                      background: `${RARITY_COLORS[card.rarity]}18`,
                      color: RARITY_COLORS[card.rarity],
                      border: `1px solid ${RARITY_COLORS[card.rarity]}26`,
                    }}
                  >
                    {card.rarity}
                  </span>
                  <span className="text-[10px] tracking-[0.18em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.55)' }}>
                    {card.triptych_role_name}
                  </span>
                </div>
                <h1 className="font-heading text-3xl sm:text-4xl" style={{ color: 'rgb(var(--text-primary))' }}>
                  {card.name}
                </h1>
                <p className="mt-3 text-sm sm:text-base" style={{ color: 'rgb(var(--text-body) / 0.72)' }}>
                  Chapter {card.chapter}: {card.chapter_title}
                </p>
                <p className="mt-2 text-[11px] tracking-[0.18em] uppercase" style={{ color: card.theme_color }}>
                  {card.theme_icon} {card.theme}
                </p>
              </div>

              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, index) => {
                  const filled = index < card.rarity_stars;
                  return (
                    <Star
                      key={index}
                      size={14}
                      fill={filled ? RARITY_COLORS[card.rarity] : 'transparent'}
                      stroke={filled ? RARITY_COLORS[card.rarity] : 'rgb(var(--text-secondary) / 0.18)'}
                      strokeWidth={1.5}
                    />
                  );
                })}
              </div>
            </div>

            <blockquote
              className="mb-6 border-l-2 pl-4 text-base italic leading-relaxed sm:text-lg"
              style={{
                color: 'rgb(var(--text-primary))',
                borderColor: card.theme_color,
              }}
            >
              &ldquo;{card.quote}&rdquo;
            </blockquote>

            <div
              className="mb-6 rounded-[24px] p-5 sm:p-6"
              style={{
                background: 'rgb(var(--surface))',
                border: '1px solid rgb(var(--border) / 0.12)',
              }}
            >
              <p className="mb-2 text-[10px] tracking-[0.24em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.6)' }}>
                Reflection Prompt
              </p>
              <p className="text-sm leading-relaxed sm:text-base" style={{ color: 'rgb(var(--text-body))' }}>
                {card.reflection_prompt}
              </p>
            </div>

            <div className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl p-4" style={{ background: 'rgb(var(--surface))' }}>
                <div className="text-xl font-heading" style={{ color: card.theme_color }}>
                  {card.emotional_power}
                </div>
                <div className="mt-1 text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.45)' }}>
                  Emotional Power
                </div>
              </div>
              <div className="rounded-2xl p-4" style={{ background: 'rgb(var(--surface))' }}>
                <div className="flex items-center gap-2 text-xl font-heading" style={{ color: 'rgb(var(--accent))' }}>
                  <Zap size={16} />
                  {card.wisdom_cost}
                </div>
                <div className="mt-1 text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.45)' }}>
                  Wisdom Cost
                </div>
              </div>
              <div className="rounded-2xl p-4" style={{ background: 'rgb(var(--surface))' }}>
                <div className="text-xl font-heading" style={{ color: 'rgb(var(--text-primary))' }}>
                  {card.type}
                </div>
                <div className="mt-1 text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.45)' }}>
                  Card Type
                </div>
              </div>
              <div className="rounded-2xl p-4" style={{ background: 'rgb(var(--surface))' }}>
                <div className="text-xl font-heading" style={{ color: 'rgb(var(--text-primary))' }}>
                  {card.triptych_role}
                </div>
                <div className="mt-1 text-[9px] tracking-[0.2em] uppercase" style={{ color: 'rgb(var(--text-secondary) / 0.45)' }}>
                  Triptych Role
                </div>
              </div>
            </div>

            <div
              className="rounded-[24px] p-5 sm:p-6"
              style={{
                background: 'rgb(var(--surface))',
                border: '1px solid rgb(var(--border) / 0.12)',
              }}
            >
              <p className="mb-2 text-[10px] tracking-[0.24em] uppercase font-heading" style={{ color: 'rgb(var(--accent) / 0.6)' }}>
                Chapter Context
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'rgb(var(--text-body) / 0.78)' }}>
                {card.chapter_title} explores <span style={{ color: card.theme_color }}>{card.theme}</span> through the{' '}
                {card.triptych_role_name.toLowerCase()} lens. This card&apos;s art direction is: {card.art_direction}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
