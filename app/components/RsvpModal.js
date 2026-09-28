'use client';

import { useState, useEffect } from 'react';

// Lightweight pure canvas confetti burst
function fireConfetti() {
  const canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.inset = '0';
  canvas.style.width = '100vw';
  canvas.style.height = '100vh';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '99999';
  document.body.appendChild(canvas);

  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#d4af37', '#f3e098', '#c9788d', '#e8a0b4', '#ffffff', '#e6c387'];

  for (let i = 0; i < 90; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10,
      opacity: 1,
    });
  }

  let animationFrame;
  const startTime = Date.now();

  function render() {
    const elapsed = Date.now() - startTime;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((p) => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.rotation += p.vRot;
      p.opacity = Math.max(0, 1 - elapsed / 2500);

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.4);
      ctx.restore();
    });

    if (elapsed < 2500) {
      animationFrame = requestAnimationFrame(render);
    } else {
      canvas.remove();
    }
  }

  render();
}

export default function RsvpModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    status: 'attending', // attending | declining
    guestsCount: '1',
    message: '',
  });

  const [submittedData, setSubmittedData] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  // Load existing RSVP from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_rsvp_response');
      if (saved) {
        const parsed = JSON.parse(saved);
        setSubmittedData(parsed);
      }
    } catch (e) {}
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    const dataToSave = {
      ...formData,
      timestamp: new Date().toISOString(),
    };

    try {
      localStorage.setItem('wedding_rsvp_response', JSON.stringify(dataToSave));
    } catch (e) {}

    setSubmittedData(dataToSave);
    setIsSuccess(true);
    fireConfetti();
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('wedding_rsvp_mortadha_mariam');
    } catch (e) {}
    setSubmittedData(null);
    setIsSuccess(false);
  };

  if (!isOpen) return null;

  return (
    <div className="rsvp-modal-backdrop" onClick={onClose}>
      <div
        className="rsvp-modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="rsvp-modal-close"
          aria-label="إغلاق النافذة"
        >
          ✕
        </button>

        <div className="rsvp-modal-header">
          <div className="rsvp-ornament">⚜️</div>
          <h2 className="rsvp-modal-title">تأكيد الحضور الكريم</h2>
          <p className="rsvp-modal-subtitle">
            حضوركم يزيد ليلتنا بهجة وسروراً — يرجى ملء بياناتكم الكريمة
          </p>
        </div>

        {submittedData && !isSuccess ? (
          <div className="rsvp-existing-card">
            <div className="rsvp-badge-icon">✨</div>
            <h3>شكراً لك، تم تسجيل ردك مسبقاً!</h3>
            <p className="rsvp-guest-name">
              الاسم: <strong>{submittedData.name}</strong>
            </p>
            <p className="rsvp-guest-status">
              الحالة:{' '}
              {submittedData.status === 'attending'
                ? '✅ أتشرف بالحضور'
                : '💌 معتذر بكل ود'}
            </p>
            {submittedData.status === 'attending' && (
              <p className="rsvp-guest-count">
                عدد الضيوف: {submittedData.guestsCount}
              </p>
            )}
            {submittedData.message && (
              <p className="rsvp-guest-message">
                « {submittedData.message} »
              </p>
            )}
            
            <div className="rsvp-existing-actions">
              <button onClick={handleReset} className="rsvp-btn-edit">
                تعديل البيانات
              </button>
              <button onClick={onClose} className="rsvp-btn-done">
                تم، إغلاق
              </button>
            </div>
          </div>
        ) : isSuccess ? (
          <div className="rsvp-success-card">
            <div className="success-seal">🌹</div>
            <h3>بارك الله فيكم!</h3>
            <p>
              {formData.status === 'attending'
                ? `أهلاً وسهلاً بكم يا ${formData.name}! نسعد بلقائكم ومشاركتنا أبهى لحظات العمر.`
                : `شكراً لك يا ${formData.name}، ودعواتكم الصادقة تصلنا بكل محبة.`}
            </p>
            <div className="success-divider" />
            <button onClick={onClose} className="rsvp-submit-btn">
              إغلاق النافذة
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rsvp-form">
            <div className="form-group">
              <label htmlFor="guest-name">الاسم الكريم *</label>
              <input
                id="guest-name"
                type="text"
                required
                placeholder="أدخل اسمك الكريم..."
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label htmlFor="guest-phone">رقم الهاتف أو الواتساب (اختياري)</label>
              <input
                id="guest-phone"
                type="tel"
                placeholder="00216..."
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>هل ستشرفوننا بالحضور؟ *</label>
              <div className="status-radio-group">
                <label
                  className={`radio-card ${
                    formData.status === 'attending' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="attending"
                    checked={formData.status === 'attending'}
                    onChange={() =>
                      setFormData({ ...formData, status: 'attending' })
                    }
                  />
                  <span className="radio-icon">🌹</span>
                  <span className="radio-text">نعم، أتشرف بالحضور</span>
                </label>

                <label
                  className={`radio-card ${
                    formData.status === 'declining' ? 'active' : ''
                  }`}
                >
                  <input
                    type="radio"
                    name="status"
                    value="declining"
                    checked={formData.status === 'declining'}
                    onChange={() =>
                      setFormData({ ...formData, status: 'declining' })
                    }
                  />
                  <span className="radio-icon">💌</span>
                  <span className="radio-text">للأسف أعتذر، ودعواتي معكما</span>
                </label>
              </div>
            </div>

            {formData.status === 'attending' && (
              <div className="form-group">
                <label htmlFor="guest-count">عدد الحاضرين</label>
                <select
                  id="guest-count"
                  value={formData.guestsCount}
                  onChange={(e) =>
                    setFormData({ ...formData, guestsCount: e.target.value })
                  }
                >
                  <option value="1">شخص واحد (أنا)</option>
                  <option value="2">شخصان (٢)</option>
                  <option value="3">٣ أشخاص</option>
                  <option value="4">٤ أشخاص أو عائلة</option>
                </select>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="guest-message">كلمة طيبة أو دعاء للعروسين (اختياري)</label>
              <textarea
                id="guest-message"
                rows={3}
                placeholder="أرسل تهنئتك القلبية للعروسين..."
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
              />
            </div>

            <button type="submit" className="rsvp-submit-btn">
              <span>تأكيد الإرسال ✉️</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
