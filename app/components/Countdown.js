'use client';

import { useState, useEffect } from 'react';

export default function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    function calcTimeLeft() {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target - now;

      if (diff <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      }

      return {
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
    }

    setTimeLeft(calcTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const items = [
    { value: timeLeft.seconds, label: 'ثانية' },
    { value: timeLeft.minutes, label: 'دقيقة' },
    { value: timeLeft.hours, label: 'ساعة' },
    { value: timeLeft.days, label: 'يوم' },
  ];

  return (
    <div className="countdown-grid" id="countdown-timer">
      {items.map((item, i) => (
        <div key={i} className="countdown-item">
          <div className="countdown-number">
            {String(item.value).padStart(2, '0')}
          </div>
          <div className="countdown-label">{item.label}</div>
        </div>
      ))}
    </div>
  );
}
