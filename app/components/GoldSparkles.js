'use client';

import { useMemo } from 'react';

export default function GoldSparkles() {
  // Generate a fixed, lightweight set of 18 golden ambient particles once
  const sparkles = useMemo(() => {
    return Array.from({ length: 18 }).map((_, i) => ({
      id: `sparkle-${i}`,
      left: `${(i * 5.5 + Math.random() * 4).toFixed(1)}%`,
      size: `${(2.5 + (i % 3) * 1.5).toFixed(1)}px`,
      duration: `${(5 + (i % 5) * 1.8).toFixed(1)}s`,
      delay: `${((i * 0.7) % 6).toFixed(1)}s`,
      opacity: 0.4 + (i % 4) * 0.15,
    }));
  }, []);

  return (
    <div className="sparkles-container" aria-hidden="true">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="fixed-sparkle"
          style={{
            left: s.left,
            width: s.size,
            height: s.size,
            animationDuration: s.duration,
            animationDelay: s.delay,
            opacity: s.opacity,
          }}
        />
      ))}
    </div>
  );
}
