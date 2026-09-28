'use client';

import { useState, useEffect, useRef, useMemo } from 'react';

// Static tick lines precomputed once (never re-rendered)
const cx = 130;
const cy = 122;
const r = 64;

const STATIC_TICKS = [];
for (let i = 0; i < 60; i++) {
  const ang = (i / 60) * 2 * Math.PI - Math.PI / 2;
  const isH = i % 5 === 0;
  const r1 = isH ? r - 11 : r - 6;
  const x1 = cx + r * Math.cos(ang);
  const y1 = cy + r * Math.sin(ang);
  const x2 = cx + r1 * Math.cos(ang);
  const y2 = cy + r1 * Math.sin(ang);

  STATIC_TICKS.push({
    id: `tick-${i}`,
    x1: x1.toFixed(2),
    y1: y1.toFixed(2),
    x2: x2.toFixed(2),
    y2: y2.toFixed(2),
    stroke: isH ? '#d4af37' : '#9a6040',
    strokeWidth: isH ? '2.2' : '1',
    opacity: isH ? '0.9' : '0.4',
  });
}

// 12 static hour gold dots
const STATIC_DOTS = [];
for (let j = 0; j < 12; j++) {
  const ang2 = (j / 12) * 2 * Math.PI - Math.PI / 2;
  const rd = r - 18;
  const dx = cx + rd * Math.cos(ang2);
  const dy = cy + rd * Math.sin(ang2);

  STATIC_DOTS.push({
    id: `dot-${j}`,
    cx: dx.toFixed(2),
    cy: dy.toFixed(2),
  });
}

export default function HeartClock({ targetDate = '2026-07-12T15:30:00' }) {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const hourHandRef = useRef(null);
  const minHandRef = useRef(null);
  const secHandRef = useRef(null);
  const containerRef = useRef(null);
  const isVisibleRef = useRef(true);

  // 1. Countdown update (only once per second, minimal overhead)
  useEffect(() => {
    const target = new Date(targetDate).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  // 2. Direct DOM transform for clock hands (zero React re-renders, 0 lag!)
  useEffect(() => {
    let animId;

    // IntersectionObserver so hands only animate when visible
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? false;
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    const tickHands = () => {
      if (isVisibleRef.current && !document.hidden) {
        const now = new Date();
        const ms = now.getMilliseconds();
        const s = now.getSeconds() + ms / 1000;
        const m = now.getMinutes() + s / 60;
        const h = (now.getHours() % 12) + m / 60;

        if (secHandRef.current) {
          secHandRef.current.setAttribute('transform', `rotate(${(s * 6).toFixed(1)} ${cx} ${cy})`);
        }
        if (minHandRef.current) {
          minHandRef.current.setAttribute('transform', `rotate(${(m * 6).toFixed(2)} ${cx} ${cy})`);
        }
        if (hourHandRef.current) {
          hourHandRef.current.setAttribute('transform', `rotate(${(h * 30).toFixed(2)} ${cx} ${cy})`);
        }
      }

      animId = requestAnimationFrame(tickHands);
    };

    animId = requestAnimationFrame(tickHands);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  // Generate Google Calendar and .ics download
  const handleAddToCalendar = () => {
    const title = encodeURIComponent('حفل زفاف فلان بن فولان و فلانة بنت فولان');
    const details = encodeURIComponent('يسعدنا ويشرفنا حضوركم ومشاركتنا فرحتنا بحفل زفاف فلان بن فولان و فلانة بنت فولان - بارك الله لهما وبارك عليهما وجمع بينهما في خير');
    const location = encodeURIComponent('فضاء الحبيب، طبلبة / فضاء موازين، قصر هلال');
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=20260712T143000Z/20260712T220000Z&details=${details}&location=${location}`;
    window.open(gCalUrl, '_blank');
  };

  const handleDownloadIcs = () => {
    const icsData = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wedding Invitation//AR',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH',
      'BEGIN:VEVENT',
      'SUMMARY:حفل زفاف فلان بن فولان و فلانة بنت فولان',
      'DESCRIPTION:يسعدنا ويشرفنا حضوركم حفل زفاف فلان بن فولان و فلانة بنت فولان',
      'LOCATION:فضاء الحبيب، طبلبة',
      'DTSTART:20260712T143000Z',
      'DTEND:20260712T220000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsData], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', 'wedding-invitation.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="heart-countdown-wrapper" ref={containerRef}>
      {/* Countdown Grid with ample breathing room so fonts never crop */}
      <div className="countdown-grid" id="countdown-grid">
        <div className="cd-unit">
          <div className="cd-box">
            <span className="cd-number">{timeLeft.days}</span>
          </div>
          <span className="cd-label">يوم</span>
        </div>

        <div className="cd-unit">
          <div className="cd-box">
            <span className="cd-number">{timeLeft.hours}</span>
          </div>
          <span className="cd-label">ساعة</span>
        </div>

        <div className="cd-unit">
          <div className="cd-box">
            <span className="cd-number">{timeLeft.minutes}</span>
          </div>
          <span className="cd-label">دقيقة</span>
        </div>

        <div className="cd-unit">
          <div className="cd-box">
            <span className="cd-number">{timeLeft.seconds}</span>
          </div>
          <span className="cd-label">ثانية</span>
        </div>
      </div>

      {/* SVG Heart Clock with hardware-accelerated direct transforms */}
      <div className="heart-clock-container">
        <div className="heart-clock-halo" />
        <svg
          className="heart-svg"
          viewBox="0 0 260 245"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Heart Outline with Gold Glow */}
          <path
            d="M130,218 C130,218 28,155 28,82 C28,50 54,26 82,26 C101,26 118,36 130,50 C142,36 159,26 178,26 C206,26 232,50 232,82 C232,155 130,218 130,218 Z"
            fill="rgba(42, 12, 22, 0.45)"
            stroke="url(#heartGoldGrad)"
            strokeWidth="2.5"
          />

          <defs>
            <linearGradient id="heartGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f3e098" />
              <stop offset="50%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#aa8222" />
            </linearGradient>
          </defs>

          {/* Clock Dial Ticks */}
          <g>
            {STATIC_TICKS.map((t) => (
              <line
                key={t.id}
                x1={t.x1}
                y1={t.y1}
                x2={t.x2}
                y2={t.y2}
                stroke={t.stroke}
                strokeWidth={t.strokeWidth}
                opacity={t.opacity}
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Hour Dots */}
          <g>
            {STATIC_DOTS.map((d) => (
              <circle
                key={d.id}
                cx={d.cx}
                cy={d.cy}
                r="2.5"
                fill="#c9a84c"
              />
            ))}
          </g>

          {/* Hour Hand */}
          <line
            ref={hourHandRef}
            x1="130"
            y1="122"
            x2="130"
            y2="92"
            stroke="#f5e6c0"
            strokeWidth="4.5"
            strokeLinecap="round"
          />

          {/* Minute Hand */}
          <line
            ref={minHandRef}
            x1="130"
            y1="122"
            x2="130"
            y2="76"
            stroke="#d4af37"
            strokeWidth="3"
            strokeLinecap="round"
          />

          {/* Second Hand */}
          <line
            ref={secHandRef}
            x1="130"
            y1="132"
            x2="130"
            y2="66"
            stroke="#e87088"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Center Hub */}
          <circle cx="130" cy="122" r="5.5" fill="#d4af37" />
          <circle cx="130" cy="122" r="2.5" fill="#2a0812" />
        </svg>

        <p className="clock-caption">نبضات القلوب تقترب من موعد الفرح</p>
      </div>

      {/* Calendar Actions */}
      <div className="calendar-actions">
        <button
          onClick={handleAddToCalendar}
          className="calendar-btn primary"
          title="إضافة لمفكرة Google"
        >
          <span className="cal-icon">📅</span>
          <span>إضافة إلى تقويم Google</span>
        </button>

        <button
          onClick={handleDownloadIcs}
          className="calendar-btn secondary"
          title="تحميل ملف التقويم للموبايل والآيفون"
        >
          <span className="cal-icon">📲</span>
          <span>حفظ الموعد (iCal / Apple)</span>
        </button>
      </div>
    </div>
  );
}
