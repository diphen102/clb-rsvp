import React, { useState, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';

const API_URL = 'https://clb-rsvp-production.up.railway.app/api/likes'; // Thay bằng route API của bạn

export default function BottomToolbar() {
  const [likeCount, setLikeCount] = useState(511);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // 1. Tải số tim từ Server khi trang web load
  useEffect(() => {
    async function fetchLikes() {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();
        // Nếu số tim từ server > 511 thì lấy số lớn hơn, ngược lại giữ tối thiểu 511
        if (data.count && data.count > 511) {
          setLikeCount(data.count);
        }
      } catch (err) {
        console.error('Không thể tải lượt tim:', err);
      }
    }
    fetchLikes();
  }, []);

  // 2. Thả tim & Đồng bộ lên Server
  async function handleLike(e) {
    e.stopPropagation();
    
    // Tăng lượt tim ở giao diện trước cho mượt (Optimistic UI)
    setLikeCount((prev) => prev + 1);

    // Bắn chùm tim bay lên màn hình
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 40 - 20,
    };
    setFloatingHearts((prev) => [...prev.slice(-10), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    // Gửi request cộng tim lên Backend
    try {
      await fetch(API_URL, { method: 'POST' });
    } catch (err) {
      console.error('Không thể lưu lượt tim lên server:', err);
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