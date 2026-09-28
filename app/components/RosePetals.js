'use client';

import { useEffect, useRef } from 'react';

export default function RosePetals() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive petal count: lighter on mobile for buttery 60fps
    const isMobile = width < 768;
    const PETAL_COUNT = isMobile ? 22 : 36;

    // Palette of realistic luxury velvet rose petals & gold leaf accents
    const PETAL_PALETTES = [
      { fill: '#9e1a38', shadow: '#590a1b', highlight: '#c43354' }, // Royal crimson
      { fill: '#ba2d4f', shadow: '#78152e', highlight: '#de4e71' }, // Velvet rose
      { fill: '#c94d6e', shadow: '#8a243e', highlight: '#f07897' }, // Soft blush
      { fill: '#731023', shadow: '#3d0511', highlight: '#991c34' }, // Deep burgundy
      { fill: '#d4af37', shadow: '#8a6b14', highlight: '#f5e39d' }, // Gold leaf sparkle
    ];

    class Petal {
      constructor(initial = false) {
        this.reset(initial);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : -30 - Math.random() * 50;
        this.size = (isMobile ? 12 : 16) + Math.random() * (isMobile ? 14 : 18);
        this.speedY = 1.2 + Math.random() * 1.8;
        this.speedX = -0.6 + Math.random() * 1.2;
        
        // 3D oscillation & tumbling
        this.angle = Math.random() * Math.PI * 2;
        this.angleSpeed = 0.015 + Math.random() * 0.03;
        this.flip = Math.random() * Math.PI * 2;
        this.flipSpeed = 0.02 + Math.random() * 0.04;
        this.swayAmplitude = 15 + Math.random() * 25;
        this.swaySpeed = 0.01 + Math.random() * 0.02;
        this.swayCounter = Math.random() * Math.PI * 2;

        this.palette = PETAL_PALETTES[Math.floor(Math.random() * PETAL_PALETTES.length)];
        this.opacity = 0.65 + Math.random() * 0.3;
      }

      update(windFactor = 0) {
        this.y += this.speedY;
        this.swayCounter += this.swaySpeed;
        this.x += Math.sin(this.swayCounter) * 0.8 + this.speedX + windFactor;

        this.angle += this.angleSpeed;
        this.flip += this.flipSpeed;

        // Reset if offscreen
        if (this.y > height + 40 || this.x < -60 || this.x > width + 60) {
          this.reset(false);
        }
      }

      draw(context) {
        context.save();
        context.translate(this.x, this.y);
        context.rotate(this.angle);

        // 3D flip simulation: scale vertically as petal tumbles in space
        const scaleY = Math.sin(this.flip);
        context.scale(1, Math.abs(scaleY) < 0.1 ? 0.1 : scaleY);

        context.globalAlpha = this.opacity;

        // Draw organic curved rose petal with realistic bezier curves
        const s = this.size;
        context.beginPath();
        context.moveTo(0, -s);
        // Left curve with natural petal fullness
        context.bezierCurveTo(-s * 0.9, -s * 0.7, -s * 0.8, s * 0.3, 0, s);
        // Right curve
        context.bezierCurveTo(s * 0.8, s * 0.3, s * 0.9, -s * 0.7, 0, -s);
        context.closePath();

        // Shading gradient from top to bottom
        const grad = context.createLinearGradient(0, -s, 0, s);
        if (scaleY > 0) {
          // Front face
          grad.addColorStop(0, this.palette.highlight);
          grad.addColorStop(0.5, this.palette.fill);
          grad.addColorStop(1, this.palette.shadow);
        } else {
          // Back face (slightly darker and richer)
          grad.addColorStop(0, this.palette.fill);
          grad.addColorStop(0.6, this.palette.shadow);
          grad.addColorStop(1, '#2b050d');
        }

        context.fillStyle = grad;
        context.shadowColor = 'rgba(0, 0, 0, 0.25)';
        context.shadowBlur = 4;
        context.shadowOffsetY = 2;
        context.fill();

        // Central soft vein for realism
        context.beginPath();
        context.moveTo(0, -s * 0.7);
        context.quadraticCurveTo(s * 0.1, 0, 0, s * 0.8);
        context.strokeStyle = 'rgba(255, 255, 255, 0.12)';
        context.lineWidth = 1;
        context.stroke();

        context.restore();
      }
    }

    // Initialize petals array
    const petals = [];
    for (let i = 0; i < PETAL_COUNT; i++) {
      petals.push(new Petal(true));
    }

    // Mouse breeze interaction
    let wind = 0;
    let targetWind = 0;

    const handleMouseMove = (e) => {
      const centerDelta = (e.clientX - width / 2) / (width / 2);
      targetWind = centerDelta * 0.8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle resize
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, { passive: true });

    // Render loop
    let lastTime = performance.now();
    const render = (time) => {
      // Pause if tab inactive
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth wind interpolation
      wind += (targetWind - wind) * 0.05;

      for (let i = 0; i < petals.length; i++) {
        petals[i].update(wind);
        petals[i].draw(ctx);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="canvas-rose-petals"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 3,
      }}
    />
  );
}
