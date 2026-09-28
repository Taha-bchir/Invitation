'use client';

import { useState } from 'react';

export default function FloatingNav({ onOpenEnvelope, onOpenRsvp }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: 'دعوة زفاف | فلان بن فولان & فلانة بنت فولان',
      text: 'يتشرفان بدعوتكم لحضور حفل زفافهما المبارك 🌹',
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {}
    } else {
      // Fallback: Copy link
      try {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2400);
      } catch (err) {}
    }
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `🌹 دعوة زفاف فلان بن فولان & فلانة بنت فولان 🌹\nيتشرفان بدعوتكم لحضور حفل زفافهما المبارك.\nرابط الدعوة:\n${window.location.href}`
    );
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav className="floating-royal-dock" aria-label="الشريط السريع">
        <button
          onClick={onOpenEnvelope}
          className="dock-item"
          title="إعادة فتح الغلاف"
        >
          <span className="dock-icon">✉️</span>
          <span className="dock-text">الغلاف</span>
        </button>

        <button
          onClick={() => scrollTo('countdown')}
          className="dock-item"
          title="العد التنازلي"
        >
          <span className="dock-icon">⏳</span>
          <span className="dock-text">العداد</span>
        </button>

        <button
          onClick={() => scrollTo('programme')}
          className="dock-item"
          title="برنامج الحفل"
        >
          <span className="dock-icon">📜</span>
          <span className="dock-text">البرنامج</span>
        </button>

        <button
          onClick={onOpenRsvp}
          className="dock-item highlight"
          title="تأكيد الحضور"
        >
          <span className="dock-icon">✍️</span>
          <span className="dock-text">تأكيد الحضور</span>
        </button>

        <button
          onClick={() => scrollTo('blessings')}
          className="dock-item"
          title="دفتر التهاني"
        >
          <span className="dock-icon">💬</span>
          <span className="dock-text">التهاني</span>
        </button>

        <button
          onClick={handleShareWhatsApp}
          className="dock-item whatsapp"
          title="مشاركة عبر واتساب"
        >
          <span className="dock-icon">🟢</span>
          <span className="dock-text">واتساب</span>
        </button>

        <button
          onClick={handleShare}
          className="dock-item"
          title="مشاركة أو نسخ الرابط"
        >
          <span className="dock-icon">🔗</span>
          <span className="dock-text">مشاركة</span>
        </button>
      </nav>

      {/* Copy Toast */}
      {copied && (
        <div className="copy-toast">
          <span>✨ تم نسخ رابط الدعوة بنجاح!</span>
        </div>
      )}
    </>
  );
}
