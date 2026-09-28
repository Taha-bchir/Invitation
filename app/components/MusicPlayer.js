'use client';

import { useState, useEffect, useRef } from 'react';

export default function MusicPlayer({ autoPlayTrigger = false }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef(null);
  const isPlayingRef = useRef(false);
  const loopTimeoutRef = useRef(null);

  // Pentatonic romantic wedding arpeggio chords (C major / A minor pentatonic frequencies: joyful & serene)
  const notes = [
    261.63, 293.66, 329.63, 392.00, 440.00, // C4, D4, E4, G4, A4
    523.25, 587.33, 659.25, 783.99, 880.00, // C5, D5, E5, G5, A5
    1046.50, 1174.66, 1318.51               // C6, D6, E6
  ];

  // Romantic arpeggio sequence pattern
  const melodyPattern = [
    0, 2, 4, 7, 9, 7, 4, 2,
    1, 3, 5, 8, 10, 8, 5, 3,
    2, 4, 6, 9, 11, 9, 6, 4,
    3, 5, 7, 10, 12, 10, 7, 5
  ];

  const playChime = (freq, time, duration = 1.2) => {
    if (!audioCtxRef.current || isMuted) return;
    const ctx = audioCtxRef.current;
    
    // Main chime oscillator (sine)
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    // Subtle overtone (warm sparkle)
    const overtone = ctx.createOscillator();
    const overtoneGain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(freq * 2, time);

    // Warm envelope
    gainNode.gain.setValueAtTime(0, time);
    gainNode.gain.linearRampToValueAtTime(0.045, time + 0.04);
    gainNode.gain.exponentialRampToValueAtTime(0.0001, time + duration);

    overtoneGain.gain.setValueAtTime(0, time);
    overtoneGain.gain.linearRampToValueAtTime(0.015, time + 0.03);
    overtoneGain.gain.exponentialRampToValueAtTime(0.0001, time + duration * 0.7);

    osc.connect(gainNode);
    overtone.connect(overtoneGain);

    gainNode.connect(ctx.destination);
    overtoneGain.connect(ctx.destination);

    osc.start(time);
    overtone.start(time);

    osc.stop(time + duration);
    overtone.stop(time + duration);
  };

  const startMusicLoop = () => {
    if (!audioCtxRef.current) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioCtxRef.current = new AudioContext();
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }

    isPlayingRef.current = true;
    setIsPlaying(true);

    let step = 0;
    const playNext = () => {
      if (!isPlayingRef.current || !audioCtxRef.current) return;
      const ctx = audioCtxRef.current;
      const now = ctx.currentTime;
      const noteIdx = melodyPattern[step % melodyPattern.length];
      const freq = notes[noteIdx % notes.length];

      playChime(freq, now, 1.4);

      // Add gentle bass accompaniment every 4 beats
      if (step % 4 === 0) {
        const bassFreq = notes[noteIdx % 4] / 2;
        playChime(bassFreq, now, 2.2);
      }

      step++;
      loopTimeoutRef.current = setTimeout(playNext, 480); // gentle tempo ~ 125 bpm eighth notes
    };

    playNext();
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (loopTimeoutRef.current) {
      clearTimeout(loopTimeoutRef.current);
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusicLoop();
    }
  };

  // Trigger when envelope opens
  useEffect(() => {
    if (autoPlayTrigger && !isPlayingRef.current) {
      startMusicLoop();
    }
  }, [autoPlayTrigger]);

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="music-player-widget" id="music-player">
      <button
        onClick={toggleMusic}
        className={`music-player-btn ${isPlaying ? 'playing' : ''}`}
        aria-label={isPlaying ? 'إيقاف الموسيقى' : 'تشغيل الموسيقى'}
        title={isPlaying ? 'إيقاف النغمات' : 'تشغيل النغمات'}
      >
        <div className="music-disc">
          <span className="music-icon">{isPlaying ? '🎵' : '🔇'}</span>
        </div>
        
        <div className="music-info">
          <span className="music-title">نغمات الفرح</span>
          <span className="music-status">{isPlaying ? 'عزف رومانسي' : 'مكتوم'}</span>
        </div>

        <div className="music-bars" aria-hidden="true">
          <span className={`bar ${isPlaying ? 'animating' : ''}`} />
          <span className={`bar ${isPlaying ? 'animating' : ''}`} />
          <span className={`bar ${isPlaying ? 'animating' : ''}`} />
          <span className={`bar ${isPlaying ? 'animating' : ''}`} />
        </div>
      </button>
    </div>
  );
}
