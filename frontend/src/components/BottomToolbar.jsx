import React, { useState, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';

const API_LIKES_URL = 'https://clb-rsvp-production.up.railway.app/api/likes';

export default function BottomToolbar() {
  const [likeCount, setLikeCount] = useState(511);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // 1. Lấy tổng số tim thực tế từ Google Sheets khi trang load (F5)
  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await fetch(API_LIKES_URL);
        const data = await res.json();
        if (data.count && data.count >= 511) {
          setLikeCount(data.count);
        }
      } catch (err) {
        console.error('Không thể lấy lượt tim từ server:', err);
      }
    }
    fetchLikes();
  }, []);

  // 2. Thả tim: Tăng tức thì trên UI và gửi request cộng tim lên Server
  async function handleLike(e) {
    e.stopPropagation();

    // Tăng UI trước giúp thao tác mượt mà
    setLikeCount((prev) => prev + 1);

    // Hiệu ứng tim bay
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 40 - 20,
    };
    setFloatingHearts((prev) => [...prev.slice(-10), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    // Đồng bộ cộng tim lên Google Sheets
    try {
      await fetch(API_LIKES_URL, { method: 'POST' });
    } catch (err) {
      console.error('Lỗi lưu lượt tim:', err);
    }
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