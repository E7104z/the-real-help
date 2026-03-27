type BenefitsTickerProps = { items: string[] };

export function BenefitsTicker({ items }: BenefitsTickerProps) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gap-16 whitespace-nowrap"
        style={{ animation: 'ticker 12s linear infinite' }}
        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'paused')}
        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.animationPlayState = 'running')}
      >
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-4 font-heading text-3xl sm:text-4xl font-bold text-brand-blue-500">
            <span className="text-brand-silver-300">·</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
