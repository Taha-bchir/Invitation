'use client';

import { useState, useEffect } from 'react';

const INITIAL_BLESSINGS = [
  {
    id: 1,
    name: 'عائلة العريس',
    message: 'بارك الله لكما وبارك عليكما وجمع بينكما في خير وسعادة دائمة، ألف مبروك يا قرة أعيننا.',
    time: 'منذ يوم',
    likes: 18,
  },
  {
    id: 2,
    name: 'عائلة العروس',
    message: 'تهانينا القلبية للعروسين الغاليين، جعل الله دياركم عامرة بالمودة والرحمة والهناء.',
    time: 'منذ يومين',
    likes: 24,
  },
  {
    id: 3,
    name: 'أصدقاء العائلة',
    message: 'ألف مبروك للعروسين الكرام، رزقكما الله الذرية الصالحة وحياة ملؤها الحب والوفاق.',
    time: 'منذ ٣ أيام',
    likes: 15,
  },
];

export default function BlessingsWall() {
  const [blessings, setBlessings] = useState(INITIAL_BLESSINGS);
  const [newName, setNewName] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [likedIds, setLikedIds] = useState({});

  // Load any local blessings
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_blessings_wall');
      if (saved) {
        setBlessings(JSON.parse(saved));
      }
    } catch (e) {}
  }, []);

  const handleAddBlessing = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newMessage.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: newName.trim(),
      message: newMessage.trim(),
      time: 'الآن',
      likes: 1,
    };

    const updated = [newEntry, ...blessings];
    setBlessings(updated);
    setNewName('');
    setNewMessage('');

    try {
      localStorage.setItem('wedding_blessings_wall', JSON.stringify(updated));
    } catch (e) {}
  };

  const handleLike = (id) => {
    if (likedIds[id]) return; // already liked
    setLikedIds((prev) => ({ ...prev, [id]: true }));

    setBlessings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
  };

  return (
    <div className="blessings-wall-container" id="blessings-wall">
      {/* Form to leave a blessing */}
      <form onSubmit={handleAddBlessing} className="blessing-input-card">
        <h3 className="blessing-form-title">
          <span>✍️</span> اترك تهنئة ودعاء للعروسين
        </h3>

        <div className="blessing-inputs-row">
          <input
            type="text"
            placeholder="اسمك الكريم..."
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            required
            className="blessing-name-input"
          />

          <input
            type="text"
            placeholder="اكتب أرق الكلمات والتبريكات..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            required
            className="blessing-msg-input"
          />

          <button type="submit" className="blessing-submit-btn">
            نشر التهنئة 🌹
          </button>
        </div>
      </form>

      {/* Grid of blessing cards */}
      <div className="blessings-grid">
        {blessings.map((b) => (
          <div key={b.id} className="blessing-card">
            <div className="blessing-header">
              <div className="blessing-avatar">
                {b.name.charAt(0)}
              </div>
              <div className="blessing-author-info">
                <span className="blessing-author-name">{b.name}</span>
                <span className="blessing-time">{b.time}</span>
              </div>
            </div>

            <p className="blessing-text">« {b.message} »</p>

            <div className="blessing-footer">
              <button
                type="button"
                onClick={() => handleLike(b.id)}
                className={`blessing-like-btn ${likedIds[b.id] ? 'liked' : ''}`}
                title="تسجيل إعجاب"
              >
                <span>{likedIds[b.id] ? '❤️' : '🤍'}</span>
                <span>{b.likes}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
