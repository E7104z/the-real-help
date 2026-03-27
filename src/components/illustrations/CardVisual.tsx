import { Shield, FileText, Code, Cog, Building, Brain, CheckCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface CardVisualProps {
  category: string;
  height?: string;
}

const CATEGORY_STYLES: Record<string, { bg: string; highlight: string; Icon: LucideIcon }> = {
  'Certification':              { bg: '#1E3A8A', highlight: 'rgba(173,193,255,0.35)', Icon: Shield },
  'Compliance & Certification': { bg: '#1E3A8A', highlight: 'rgba(173,193,255,0.35)', Icon: Shield },
  'Medicaid / CDS':             { bg: '#065F46', highlight: 'rgba(167,243,208,0.35)', Icon: FileText },
  'App Development':            { bg: '#4C1D95', highlight: 'rgba(221,214,254,0.35)', Icon: Code },
  'Business Systems':           { bg: '#92400E', highlight: 'rgba(253,230,138,0.35)', Icon: Cog },
  'Government Contracting':     { bg: '#1E293B', highlight: 'rgba(203,213,225,0.35)', Icon: Building },
  'AI & Automation':            { bg: '#0E7490', highlight: 'rgba(165,243,252,0.35)', Icon: Brain },
};

const DEFAULT = { bg: '#1E3A8A', highlight: 'rgba(173,193,255,0.35)', Icon: CheckCircle };

export function CardVisual({ category, height = '9rem' }: CardVisualProps) {
  const { bg, highlight, Icon } = CATEGORY_STYLES[category] ?? DEFAULT;

  return (
    <div
      className="relative overflow-hidden flex items-end justify-end"
      style={{
        background: bg,
        height,
        backgroundImage:
          'radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)',
        backgroundSize: '18px 18px',
      }}
    >
      {/* Large watermark icon */}
      <Icon
        size={100}
        strokeWidth={0.7}
        style={{
          color: highlight,
          position: 'absolute',
          bottom: '-10px',
          right: '-10px',
        }}
      />
      {/* Category label */}
      <span
        className="absolute top-3 left-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider"
        style={{ background: 'rgba(0,0,0,0.30)', color: 'rgba(255,255,255,0.85)' }}
      >
        {category}
      </span>
    </div>
  );
}
