import { useEffect, useRef, useState } from 'react';

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
}

const StatItem = ({ value, label, suffix = '' }: StatProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = value / steps;
    const stepDuration = duration / steps;

    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [isVisible, value]);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-secondary mb-2">
        {count.toLocaleString('pt-BR')}
        {suffix}
      </div>
      <div className="text-sm md:text-base text-primary-foreground/90 font-medium">
        {label}
      </div>
    </div>
  );
};

interface StatsCounterProps {
  stats: readonly StatProps[];
}

const StatsCounter = ({ stats }: StatsCounterProps) => {
  return (
    <div className="grid grid-cols-3 gap-8 md:gap-12 mt-12">
      {stats.map((stat, index) => (
        <StatItem key={index} {...stat} />
      ))}
    </div>
  );
};

export default StatsCounter;
