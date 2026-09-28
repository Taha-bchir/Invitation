'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

export default function EnvelopeOverlay({ onOpen, forceShow = false, onClose }) {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [rippleActive, setRippleActive] = useState(false);

  // If forceShow becomes true, reset state so envelope is visible again
  useEffect(() => {
    if (forceShow) {
      setIsDismissed(false);
      setIsOpen(false);
      setImagesLoaded(true);
      document.body.style.overflow = 'hidden';
    }
  }, [forceShow]);

  // Track image loading with automatic fallback timer
  const [loadCount, setLoadCount] = useState(0);
  const totalImages = 3;

  const handleImageLoad = useCallback(() => {
    setLoadCount((prev) => {
      const next = prev + 1;
      if (next >= totalImages) {
        setTimeout(() => setImagesLoaded(true), 200);
      }
      return next;
    });
  }, []);

  // Safety fallback: if images take long or are cached, show immediately
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1200);
    return () => clearTimeout(fallbackTimer);
  }, []);

  // Lock body scroll while envelope is shown
  useEffect(() => {
    if (!isDismissed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDismissed]);

  const handleSealClick = useCallback(() => {
    if (isOpen) return; // Prevent double click
    setRippleActive(true);
    setIsOpen(true);

    if (onOpen) {
      onOpen();
    }

    // Faster, smoother unlock: 1.2s instead of 2.2s so user never feels a frozen/lagging screen!
    setTimeout(() => {
      document.body.style.overflow = '';
    }, 1100);

    setTimeout(() => {
      setIsDismissed(true);
      if (onClose) onClose();
    }, 1350);
  }, [isOpen, onOpen, onClose]);

  if (isDismissed && !forceShow) return null;

  return (
    <div
      className={`envelope-overlay ${isDismissed ? 'dismissed' : ''}`}
      id="envelope-overlay"
    >
      {/* Loader */}
      <div
        className="envelope-loader"
        style={{
          opacity: imagesLoaded ? 0 : 1,
          pointerEvents: imagesLoaded ? 'none' : 'auto',
        }}
      >
        <div className="envelope-loader-content">
          <div className="envelope-loader-ring" />
          <div className="envelope-loader-text">الدعوة قيد التحضير</div>
        </div>
      </div>

      {/* Invitation Envelope */}
      <div
        className={`envelope-wrapper ${imagesLoaded ? 'loaded' : ''} ${
          isOpen ? 'open' : ''
        }`}
      >
        {/* Card behind panels (wedding content teaser) */}
        <div className="envelope-card">
          <div className="envelope-card-inner">
            <div className="envelope-card-ornament">✦ ✦ ✦</div>
            <p className="envelope-card-bismillah">بسم الله الرحمن الرحيم</p>
            <div className="envelope-card-divider" />
            <h2 className="envelope-card-names">فلان &amp; فلانة</h2>
            <p className="envelope-card-subtitle">
              يتشرفان بدعوتكم لحضور حفل زفافهما المبارك
            </p>
            <div className="envelope-card-divider" />
            <div className="envelope-card-ornament">✦ ✦ ✦</div>
          </div>
        </div>

        {/* Left Panel */}
        <Image
          src="/images/envelope-left.jpg"
          alt=""
          width={600}
          height={1200}
          className="envelope-panel envelope-panel-left"
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          priority
          aria-hidden="true"
        />

        {/* Right Panel */}
        <Image
          src="/images/envelope-right.jpg"
          alt=""
          width={600}
          height={1200}
          className="envelope-panel envelope-panel-right"
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          priority
          aria-hidden="true"
        />

        {/* Gold ring behind seal */}
        <div
          className="envelope-gold-ring"
          style={{ display: imagesLoaded ? 'block' : 'none' }}
        />

        {/* Ripple Shockwave Effect */}
        {rippleActive && <div className="seal-ripple-wave" />}

        {/* Sparkles around seal */}
        {imagesLoaded && !isOpen && (
          <>
            <span className="envelope-sparkle s1" aria-hidden="true">✦</span>
            <span className="envelope-sparkle s2" aria-hidden="true">✦</span>
            <span className="envelope-sparkle s3" aria-hidden="true">✦</span>
            <span className="envelope-sparkle s4" aria-hidden="true">✦</span>
          </>
        )}

        {/* Seal */}
        <Image
          src="/images/seal.webp"
          alt="اضغط لفتح الدعوة"
          width={95}
          height={95}
          className={`envelope-seal ${isOpen ? 'seal-opening' : ''}`}
          onClick={handleSealClick}
          onLoad={handleImageLoad}
          onError={handleImageLoad}
          priority
        />

        {/* Seal Text Ring - Clean Arabic without distortion */}
        <div className="envelope-seal-text" aria-hidden="true">
          <svg viewBox="0 0 200 200">
            <defs>
              <path
                id="envelopeCirclePath"
                d="M100,100 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0"
              />
            </defs>
            <text direction="rtl" textAnchor="middle">
              <textPath
                href="#envelopeCirclePath"
                startOffset="50%"
              >
                اضغط لفتح الدعوة
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
