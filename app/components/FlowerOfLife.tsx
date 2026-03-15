'use client';

export default function FlowerOfLife({ size = 300, className = '' }: { size?: number; className?: string }) {
  const r = size * 0.15;
  const cx = size / 2;
  const cy = size / 2;

  // Generate the 7-circle Flower of Life pattern
  const circles: Array<{ x: number; y: number }> = [
    { x: cx, y: cy }, // center
  ];

  // 6 surrounding circles
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    circles.push({
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    });
  }

  // 6 outer ring
  for (let i = 0; i < 6; i++) {
    const angle = (i * 60 * Math.PI) / 180;
    circles.push({
      x: cx + 2 * r * Math.cos(angle),
      y: cy + 2 * r * Math.sin(angle),
    });
  }

  // 6 between outer
  for (let i = 0; i < 6; i++) {
    const angle = ((i * 60 + 30) * Math.PI) / 180;
    circles.push({
      x: cx + r * Math.sqrt(3) * Math.cos(angle),
      y: cy + r * Math.sqrt(3) * Math.sin(angle),
    });
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="fol-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity="0.8" />
          <stop offset="50%" stopColor="rgb(var(--accent-bright))" stopOpacity="0.6" />
          <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity="0.4" />
        </linearGradient>
      </defs>
      {/* Outer boundary circle */}
      <circle
        cx={cx}
        cy={cy}
        r={r * 2.5}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="0.5"
        opacity="0.2"
      />
      <circle
        cx={cx}
        cy={cy}
        r={r * 2.7}
        fill="none"
        stroke="rgb(var(--accent))"
        strokeWidth="0.3"
        opacity="0.1"
      />
      {/* Flower circles */}
      {circles.map((c, i) => (
        <circle
          key={i}
          cx={c.x}
          cy={c.y}
          r={r}
          fill="none"
          stroke="url(#fol-gradient)"
          strokeWidth={i === 0 ? 1.2 : 0.8}
          opacity={i < 7 ? 0.7 : 0.35}
        />
      ))}
    </svg>
  );
}
