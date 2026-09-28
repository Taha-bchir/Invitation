'use client';

import { useState } from 'react';
import Image from 'next/image';

const TIMELINE_EVENTS = [
  {
    id: 1,
    date: '12 / 7 / 2026',
    dateLabel: 'الأحد، ١٢ يوليو ٢٠٢٦',
    event: 'مراسم العقد والقران',
    location: 'فضاء الحبيب، طبلبة',
    time: '3:30',
    ampm: 'PM',
    icon: '/images/icon1.png',
    lat: 35.632714,
    lng: 10.941811,
    desc: 'مراسم عقد القران المبارك وإعلان بدء ليالي الفرح',
  },
  {
    id: 2,
    date: '13 / 7 / 2026',
    dateLabel: 'الإثنين، ١٣ يوليو ٢٠٢٦',
    event: 'استقبال الضيوف والأحباب',
    location: 'منزل العريس، شارع الحبيب بورقيبة، طبلبة',
    time: '4:30',
    ampm: 'PM',
    icon: '/images/icon2.png',
    lat: 35.642004,
    lng: 10.966089,
    desc: 'لقاء العائلتين والأصدقاء في دار العريس الكريمة',
  },
  {
    id: 3,
    date: '14 / 7 / 2026',
    dateLabel: 'الثلاثاء، ١٤ يوليو ٢٠٢٦',
    event: 'جلسة التصوير التذكارية',
    location: 'برج الراس، المهدية',
    time: '5:00',
    ampm: 'PM',
    icon: '/images/icon3.png',
    lat: 35.508971,
    lng: 11.081458,
    desc: 'توثيق أجمل الذكريات بين نسمات البحر وعبق التاريخ',
  },
  {
    id: 4,
    date: '15 / 7 / 2026',
    dateLabel: 'الأربعاء، ١٥ يوليو ٢٠٢٦',
    event: 'مأدبة العشاء الفاخرة',
    location: 'منزل العريس، شارع الحبيب بورقيبة، طبلبة',
    time: '6:30',
    ampm: 'PM',
    icon: '/images/icon4.png',
    lat: 35.642004,
    lng: 10.966089,
    desc: 'تناول طعام العشاء احتفاءً بالعروسين وسط الأهل والأحباب',
  },
  {
    id: 5,
    date: '16 / 7 / 2026',
    dateLabel: 'الخميس، ١٦ يوليو ٢٠٢٦',
    event: 'حفل الأفراح والزفاف الكبير',
    location: 'فضاء موازين، قصر هلال',
    time: '8:00',
    ampm: 'PM',
    icon: '/images/icon5.png',
    lat: 35.658203,
    lng: 10.880335,
    desc: 'الليلة الكبرى والاحتفال بزفاف العروسين فلان وفلانة',
  },
];

export default function WeddingTimeline() {
  const [selectedEvent, setSelectedEvent] = useState(null);

  const handleOpenMap = (item) => {
    setSelectedEvent(item);
  };

  const handleCloseMap = () => {
    setSelectedEvent(null);
  };

  const handleOpenGoogleMaps = (item) => {
    if (!item) return;
    const url = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
    window.open(url, '_blank');
  };

  return (
    <div className="wedding-timeline-container">
      <div className="timeline-spine" aria-hidden="true" />

      <div className="timeline-items">
        {TIMELINE_EVENTS.map((item, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={item.id}
              className={`timeline-row ${isEven ? 'row-reverse' : ''}`}
            >
              {/* Event Content Card */}
              <div className="timeline-card">
                <div className="card-glass-glow" />
                
                <div className="card-header-badge">
                  <span className="card-date-badge">{item.date}</span>
                  <span className="card-time-badge">
                    {item.time} {item.ampm}
                  </span>
                </div>

                <h3 className="card-event-name">{item.event}</h3>
                <p className="card-event-desc">{item.desc}</p>

                <div className="card-location-row">
                  <span className="loc-pin">📍</span>
                  <span className="loc-text">{item.location}</span>
                </div>

                <div className="card-actions">
                  <button
                    onClick={() => handleOpenMap(item)}
                    className="timeline-loc-btn"
                    title={`عرض موقع ${item.event} على الخريطة`}
                  >
                    <Image
                      src="/images/localisation_icon.webp"
                      alt=""
                      width={18}
                      height={18}
                      className="loc-icon-img"
                    />
                    <span>الموقع والاتجاهات</span>
                  </button>
                </div>
              </div>

              {/* Timeline Center Node */}
              <div className="timeline-center-node">
                <div className="node-pulse" />
                <div className="node-icon-wrapper">
                  <Image
                    src={item.icon}
                    alt={item.event}
                    width={46}
                    height={46}
                    className="node-img"
                  />
                </div>
              </div>

              {/* Spacer on the opposite side for balanced desktop layout */}
              <div className="timeline-spacer" />
            </div>
          );
        })}
      </div>

      {/* Interactive Map Modal */}
      {selectedEvent && (
        <div className="map-modal-backdrop" onClick={handleCloseMap}>
          <div
            className="map-modal-sheet"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              onClick={handleCloseMap}
              className="map-close-btn"
              aria-label="إغلاق الخريطة"
            >
              ✕
            </button>

            <div className="map-sheet-handle" />

            <div className="map-header">
              <span className="map-badge">{selectedEvent.dateLabel}</span>
              <h3 className="map-title">{selectedEvent.event}</h3>
              <p className="map-address">{selectedEvent.location}</p>
            </div>

            {/* Embedded interactive map using OpenStreetMap iframe */}
            <div className="map-embed-wrapper">
              <iframe
                title={selectedEvent.location}
                width="100%"
                height="280"
                style={{ border: 0, borderRadius: '16px' }}
                loading="lazy"
                src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedEvent.lng - 0.008}%2C${selectedEvent.lat - 0.006}%2C${selectedEvent.lng + 0.008}%2C${selectedEvent.lat + 0.006}&layer=mapnik&marker=${selectedEvent.lat}%2C${selectedEvent.lng}`}
              />
            </div>

            <div className="map-buttons">
              <button
                onClick={() => handleOpenGoogleMaps(selectedEvent)}
                className="btn-open-google-maps"
              >
                <span>🗺️ افتح في تطبيق خرائط Google</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
