'use client';

import { useState } from 'react';
import Image from 'next/image';
import EnvelopeOverlay from './components/EnvelopeOverlay';
import RosePetals from './components/RosePetals';
import GoldSparkles from './components/GoldSparkles';
import HeartClock from './components/HeartClock';
import WeddingTimeline from './components/WeddingTimeline';
import RsvpModal from './components/RsvpModal';
import BlessingsWall from './components/BlessingsWall';
import MusicPlayer from './components/MusicPlayer';
import FloatingNav from './components/FloatingNav';
import ScrollReveal from './components/ScrollReveal';

// Target wedding date: July 12, 2026 15:30 (Celebration launch)
const WEDDING_DATE = '2026-07-12T15:30:00';

export default function Home() {
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);
  const [musicTrigger, setMusicTrigger] = useState(false);

  const handleEnvelopeOpen = () => {
    setMusicTrigger(true);
  };

  return (
    <main className="invitation-app">
      {/* ── OPENING ENVELOPE ANIMATION ── */}
      <EnvelopeOverlay
        onOpen={handleEnvelopeOpen}
        forceShow={showEnvelope}
        onClose={() => setShowEnvelope(false)}
      />

      {/* ── FLOATING AMBIENT MUSIC PLAYER ── */}
      <MusicPlayer autoPlayTrigger={musicTrigger} />

      {/* ── FLOATING ROYAL QUICK NAVIGATION DOCK ── */}
      <FloatingNav
        onOpenEnvelope={() => setShowEnvelope(true)}
        onOpenRsvp={() => setIsRsvpOpen(true)}
      />

      {/* ── INTERACTIVE RSVP MODAL ── */}
      <RsvpModal
        isOpen={isRsvpOpen}
        onClose={() => setIsRsvpOpen(false)}
      />

      {/* ── AMBIENT CANVAS ROSE PETALS (HIGH PERFORMANCE) ── */}
      <RosePetals />
      <GoldSparkles />

      {/* ══════════════════════════════════════════════
           1. HERO SECTION (BACKGROUND: IMAGE15_BG)
         ══════════════════════════════════════════════ */}
      <section className="section-with-bg hero-section" id="hero">
        <div className="section-bg-wrapper">
          <Image
            src="/images/image15_bg.jpg"
            alt="خلفية دعوة الزفاف"
            fill
            priority
            className="section-bg-image hero-zoom"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay hero-gradient" />
        </div>

        <div className="hero-content">
          <ScrollReveal>
            <div className="bismillah-badge">
              <span className="bismillah-text">بِسْمِ اللَّـهِ الرَّحْمَـٰنِ الرَّحِيمِ</span>
              <div className="bismillah-dua">
                « بَارَكَ اللَّـهُ لَهُمَا وَبَارَكَ عَلَيْهِمَا وَجَمَعَ بَيْنَهُمَا فِي خَيْرٍ »
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150}>
            <div className="ornament-divider">
              <span className="ornament-line" />
              <span className="ornament-diamond">✦ ✦ ✦</span>
              <span className="ornament-line" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <p className="hero-invite-prelude">تَتَشَرَّفُ عَائِلَتَا</p>

            <div className="families-container">
              <div className="family-card">
                <span className="family-title">السيد</span>
                <strong className="family-fullname">فلان</strong>
                <span className="family-title and-wife">والسيدة</span>
                <strong className="family-fullname">فلانة</strong>
              </div>

              <div className="families-and">وَ</div>

              <div className="family-card">
                <span className="family-title">السيد</span>
                <strong className="family-fullname">فلان</strong>
                <span className="family-title and-wife">والسيدة</span>
                <strong className="family-fullname">فلانة</strong>
              </div>
            </div>

            <p className="hero-invite-subtitle">
              بِدَعْوَتِكُمْ لِحُضُورِ حَفْلِ زِفَافِ نَجْلَيْهِمَا الأَعَزَّيْن
            </p>
          </ScrollReveal>

          <ScrollReveal delay={350}>
            <div className="couple-names-wrapper">
              <h1 className="couple-names">
                <span className="name-groom">فلان</span>
                <span className="ampersand">&amp;</span>
                <span className="name-bride">فلانة</span>
              </h1>
              <p className="couple-fullnames-subtitle">
                فلان بن فولان &amp; فلانة بنت فولان
              </p>
            </div>
            <div className="shimmer-divider" />
          </ScrollReveal>

          <ScrollReveal delay={450}>
            <div className="wedding-badge-highlight">
              <span className="badge-icon">💍</span>
              <span className="badge-text">١٢ — ١٦ يوليو ٢٠٢٦ | طبلبة — المهدية — قصر هلال</span>
            </div>
          </ScrollReveal>
        </div>

        <div className="scroll-indicator" aria-hidden="true">
          <span>اسحب للأسفل لاستكشاف تفاصيل الفرح</span>
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           2. QURAN VERSE SECTION (BACKGROUND: VERSE-BG)
         ══════════════════════════════════════════════ */}
      <section className="section-with-bg verse-section" id="verse">
        <div className="section-bg-wrapper">
          <Image
            src="/images/verse-bg.jpg"
            alt="خلفية الآية الكريمة"
            fill
            className="section-bg-image"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay verse-gradient" />
        </div>

        <div className="section-content-inner">
          <ScrollReveal>
            <div className="ornament-divider">
              <span className="ornament-line" />
              <span className="ornament-diamond">✦ ⚜️ ✦</span>
              <span className="ornament-line" />
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="verse-container">
              <div className="verse-frame-corner top-right" />
              <div className="verse-frame-corner top-left" />
              <div className="verse-frame-corner bottom-right" />
              <div className="verse-frame-corner bottom-left" />

              <p className="verse-text">
                ﴿ وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةً وَرَحْمَةً ۚ إِنَّ فِي ذَٰلِكَ لَآيَاتٍ لِّقَوْمٍ يَتَفَكَّرُونَ ﴾
              </p>
              <p className="verse-reference">سورة الروم — الآية ٢١</p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           3. THE COUPLE SECTION (BACKGROUND: COUPLE-BG)
         ══════════════════════════════════════════════ */}
      <section className="section-with-bg couple-section" id="couple">
        <div className="section-bg-wrapper">
          <Image
            src="/images/couple-bg.jpg"
            alt="خلفية العروسين"
            fill
            className="section-bg-image"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay couple-gradient" />
        </div>

        <div className="section-content-inner">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-pre-title">نَبْضُ الحَيَاة</span>
              <h2 className="section-title">العروسان الكريمان</h2>
              <div className="ornament-divider">
                <span className="ornament-line" />
                <span className="ornament-diamond">✦</span>
                <span className="ornament-line" />
              </div>
            </div>
          </ScrollReveal>

          <div className="couple-showcase">
            <ScrollReveal delay={200}>
              <div className="couple-photo-wrapper">
                <div className="couple-photo-halo" />
                <div className="couple-photo-frame">
                  <div className="couple-photo-inner">
                    <Image
                      src="/images/couple-portrait.jpg"
                      alt="صورة العروسين فلان وفلانة"
                      width={550}
                      height={550}
                      style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      priority
                    />
                    <div className="couple-photo-overlay" />
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <div className="couple-names-card">
              <ScrollReveal delay={300}>
                <div className="name-card groom">
                  <div className="card-ornament">⚜️</div>
                  <div className="label">العريس المصون</div>
                  <div className="name">فلان بن فولان</div>
                  <div className="family">نجل السيد فلان &amp; والسيدة فلانة</div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={400}>
                <div className="couple-connector">
                  <span className="ornament-line" />
                  <span className="connector-heart">❤</span>
                  <span className="ornament-line" />
                </div>
              </ScrollReveal>

              <ScrollReveal delay={500}>
                <div className="name-card bride">
                  <div className="card-ornament">⚜️</div>
                  <div className="label">العروس المصونة</div>
                  <div className="name">فلانة بنت فولان</div>
                  <div className="family">كريمة السيد فلان &amp; والسيدة فلانة</div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           4. COUNTDOWN & HEART CLOCK (BACKGROUND: IMAGE2_BG)
         ══════════════════════════════════════════════ */}
      <section className="section-with-bg countdown-section" id="countdown">
        <div className="section-bg-wrapper">
          <Image
            src="/images/image2_bg.jpg"
            alt="خلفية العداد"
            fill
            className="section-bg-image"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay countdown-gradient" />
        </div>

        <div className="section-content-inner countdown-container">
          <ScrollReveal>
            <div className="section-header light">
              <span className="section-pre-title">نَقْتَرِبُ مِنَ اللَّحْظَةِ الأَجْمَل</span>
              <h2 className="section-title">العد التنازلي للزفاف</h2>
              <p className="section-subtitle">لحظات تفصلنا عن جمع الأحباب في ليالي الأفراح</p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={250}>
            <HeartClock targetDate={WEDDING_DATE} />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           5. PROGRAMME & TIMELINE (BACKGROUND: IMAGE17_BG)
         ══════════════════════════════════════════════ */}
      <section className="section-with-bg programme-section" id="programme">
        <div className="section-bg-wrapper">
          <Image
            src="/images/image17_bg.jpg"
            alt="خلفية البرنامج"
            fill
            className="section-bg-image"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay programme-gradient" />
        </div>

        <div className="section-content-inner programme-container">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-pre-title">مَحَطَّاتُ البَهْجَة</span>
              <h2 className="section-title">برنامج ليالي الفرح</h2>
              <div className="ornament-divider">
                <span className="ornament-line" />
                <span className="ornament-diamond">✦ ✦ ✦</span>
                <span className="ornament-line" />
              </div>
              <p className="section-subtitle">
                نَسْتَقْبِلُكُمْ بِكُلِّ حُبٍّ فِي كَافَّةِ مَحَطَّاتِ زِفَافِنَا
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <WeddingTimeline />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           6. NOTES & ETIQUETTE (BACKGROUND: BLESSINGS-BG)
         ══════════════════════════════════════════════ */}
      <section className="section-with-bg notes-section" id="notes">
        <div className="section-bg-wrapper">
          <Image
            src="/images/blessings-bg.jpg"
            alt="خلفية الإرشادات"
            fill
            className="section-bg-image"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay notes-gradient" />
        </div>

        <div className="section-content-inner">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-pre-title">مُلَاحَظَاتٌ وَإِرْشَادَات</span>
              <h2 className="section-title">إرشادات تهم ضيوفنا الكرام</h2>
              <p className="section-subtitle">لتكون ليلتنا مفعمة بالراحة والأناقة والسرور</p>
            </div>
          </ScrollReveal>

          <div className="notes-grid">
            <ScrollReveal delay={150}>
              <div className="note-card">
                <span className="note-icon">👔</span>
                <h3>الزي والمظهر</h3>
                <p>حضوركم بأبهى حلة وأناقة رسمية يضفي على ليلتنا رونقاً وسحراً خاصاً.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <div className="note-card">
                <span className="note-icon">🌸</span>
                <h3>بهجة الحضور</h3>
                <p>حضوركم ومشاركتكم فرحتنا هي أغلى هدية نرجوها من قلوبكم العامرة بالمحبة.</p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={450}>
              <div className="note-card">
                <span className="note-icon">📸</span>
                <h3>التصوير والتوثيق</h3>
                <p>شاركونا لقطاتكم الجميلة وابتساماتكم لتبقى ذكرى خالدة في قلوبنا طوال العمر.</p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           7. RSVP CALLOUT (BACKGROUND: HERO-BACKGROUND)
         ══════════════════════════════════════════════ */}
      <section className="section-with-bg rsvp-callout-section" id="rsvp">
        <div className="section-bg-wrapper">
          <Image
            src="/images/hero-background.jpg"
            alt="خلفية تأكيد الحضور"
            fill
            className="section-bg-image"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay rsvp-gradient" />
        </div>

        <div className="section-content-inner">
          <ScrollReveal>
            <div className="rsvp-callout-card">
              <div className="rsvp-card-glow" />
              <div className="rsvp-card-icon">✉️</div>
              <h2 className="rsvp-card-title">تأكيد تشريفكم بالحضور</h2>
              <p className="rsvp-card-desc">
                حضوركم يكتمل به سرورنا وتبهج به قلوبنا، يرجى التكرم بتأكيد حضوركم الكريم ليتسنى لنا حسن استقبالكم وتنظيم ضيافتكم.
              </p>

              <button
                onClick={() => setIsRsvpOpen(true)}
                className="rsvp-launch-btn"
                id="rsvp-button"
              >
                <span>✍️ اضغط لتأكيد الحضور الكريم</span>
              </button>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           8. BLESSINGS & GUESTBOOK (BACKGROUND: WEDDING-FRAME)
         ══════════════════════════════════════════════ */}
      <section className="section-with-bg blessings-section" id="blessings">
        <div className="section-bg-wrapper">
          <Image
            src="/images/verse-bg.jpg"
            alt="خلفية سجل التهاني"
            fill
            className="section-bg-image"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay blessings-gradient" />
        </div>

        <div className="section-content-inner">
          <ScrollReveal>
            <div className="section-header">
              <span className="section-pre-title">كَلِمَاتٌ مِنَ القَلْب</span>
              <h2 className="section-title">سجل التهاني والتبريكات</h2>
              <p className="section-subtitle">
                شاركونا دعواتكم الصادقة وكلماتكم الطيبة لتبقى أثراً طيباً في مسيرتنا
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <BlessingsWall />
          </ScrollReveal>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
           9. ROYAL CLOSING FOOTER (BACKGROUND: IMAGE15_BG)
         ══════════════════════════════════════════════ */}
      <footer className="section-with-bg royal-footer" id="closing">
        <div className="section-bg-wrapper">
          <Image
            src="/images/image15_bg.jpg"
            alt="خلفية الخاتمة"
            fill
            className="section-bg-image"
            sizes="100vw"
            style={{ objectFit: 'cover' }}
          />
          <div className="section-overlay footer-gradient" />
        </div>

        <div className="section-content-inner footer-content">
          <ScrollReveal>
            <div className="footer-monogram">
              <Image
                src="/images/icon6.png"
                alt="شعار العروسين"
                width={105}
                height={105}
                className="footer-icon-img"
              />
            </div>

            <h3 className="footer-couple-names">فلان &amp; فلانة</h3>
            <p className="footer-tagline">
              نَسْعَدُ بِمُشَارَكَتِكُمْ هَذِهِ الفَرْحَةَ الغَالِيَة
            </p>

            <div className="ornament-divider">
              <span className="ornament-line" />
              <span className="ornament-diamond">✦ ❤ ✦</span>
              <span className="ornament-line" />
            </div>

            <p className="footer-prayer">
              اللَّهُمَّ بَارِكْ لَهُمَا وَبَارِكْ عَلَيْهِمَا وَاجْمَعْ بَيْنَهُمَا فِي خَيْرٍ وَعَافِيَة
            </p>

            <div className="footer-copyright">
              <span>جميع الحقوق محفوظة لحفل زفاف فلان وفلانة © ٢٠٢٦</span>
            </div>
          </ScrollReveal>
        </div>
      </footer>
    </main>
  );
}
