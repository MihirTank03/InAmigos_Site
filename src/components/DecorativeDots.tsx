import { forwardRef } from 'react';

interface DotConfig {
  size: number;
  color: string;
  delay?: number;
}

interface DecorativeDotsProps {
  dots?: DotConfig[];
  className?: string;
  animated?: boolean;
}

const defaultDots: DotConfig[] = [
  { size: 20, color: '#FF9A3D', delay: 0 },
  { size: 12, color: '#0066CC', delay: 0.1 },
  { size: 8, color: '#FFD60A', delay: 0.2 },
];

const DecorativeDots = forwardRef<HTMLDivElement, DecorativeDotsProps>(
  ({ dots = defaultDots, className = '', animated = true }, ref) => {
    return (
      <div ref={ref} className={`flex items-center gap-2 ${className}`}>
        {dots.map((dot, i) => (
          <span
            key={i}
            className={`dot ${animated ? 'animate-float' : ''}`}
            style={{
              width: dot.size,
              height: dot.size,
              backgroundColor: dot.color,
              animationDelay: `${dot.delay || i * 0.3}s`,
            }}
          />
        ))}
      </div>
    );
  }
);

DecorativeDots.displayName = 'DecorativeDots';

export default DecorativeDots;
