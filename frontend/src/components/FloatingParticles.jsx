import React, { useMemo } from 'react';

export default function FloatingParticles() {
  // Tạo danh sách 16 hạt cánh hoa & đốm sáng lơ lửng rơi nhẹ nhàng
  const particles = useMemo(() => {
    return Array.from({ length: 16 }).map((_, i) => ({
      id: i,
      left: `${(i * 6.25 + Math.random() * 4).toFixed(1)}%`,
      delay: `${(Math.random() * 8).toFixed(2)}s`,
      duration: `${(7 + Math.random() * 6).toFixed(2)}s`,
      size: Math.random() > 0.5 ? 12 : 8,
      isHeart: i % 3 === 0,
      opacity: (0.35 + Math.random() * 0.4).toFixed(2),
    }));
  }, []);

  return (
    <div className="floating-particles-container" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className={`floating-particle ${p.isHeart ? 'particle-heart' : 'particle-petal'}`}
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
          }}
        />
      ))}
    </div>
  );
}
