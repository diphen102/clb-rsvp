import React, { useState } from 'react';
import { Heart, Send, Check } from 'lucide-react';

export default function BottomToolbar() {
  const [likeCount, setLikeCount] = useState(128);
  const [floatingHearts, setFloatingHearts] = useState([]);
  const [copied, setCopied] = useState(false);

  function handleLike(e) {
    e.stopPropagation();
    setLikeCount((prev) => prev + 1);

    // Bắn chùm tim bay lên màn hình
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 40 - 20, // lệch trái phải
    };
    setFloatingHearts((prev) => [...prev.slice(-10), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);
  }

  function handleScrollToRsvp() {
    const el = document.getElementById('rsvp-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="bottom-toolbar-container">
      <div className="bottom-toolbar">
        {/* Nút Thả tim tương tác */}
        <button
          type="button"
          className="toolbar-like-btn"
          onClick={handleLike}
          title="Thả tim chúc mừng CLB"
        >
          <div className="like-icon-wrap">
            <Heart size={20} strokeWidth={2} className="heart-icon active" />
          </div>
          <span className="like-counter">{likeCount}</span>

          {/* Các trái tim bay lên khi click */}
          {floatingHearts.map((h) => (
            <span
              key={h.id}
              className="flying-heart"
              style={{ transform: `translateX(${h.left}px)` }}
            >
              ♥
            </span>
          ))}
        </button>

        {/* Nút Nhảy xuống form RSVP */}
        <button
          type="button"
          className="toolbar-rsvp-btn"
          onClick={handleScrollToRsvp}
        >
          <Send size={15} strokeWidth={2} />
          <span>Xác Nhận Tham Dự</span>
        </button>
      </div>
    </div>
  );
}
