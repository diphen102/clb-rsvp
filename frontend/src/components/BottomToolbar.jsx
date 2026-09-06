import React, { useState, useEffect } from 'react';
import { Heart, Send } from 'lucide-react';

const API_LIKES_URL = 'https://clb-rsvp-production.up.railway.app/api/rsvp/likes';

export default function BottomToolbar() {
  const [likeCount, setLikeCount] = useState(511);
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Lấy lượt tim từ Google Sheets khi F5 hoặc mở trang
  useEffect(() => {
    let isMounted = true;
    async function fetchLikes() {
      try {
        const res = await fetch(API_LIKES_URL);
        const data = await res.json();
        // Nếu lấy được số tim và số đó >= 511 thì cập nhật
        if (isMounted && data.count && Number(data.count) >= 511) {
          setLikeCount(Number(data.count));
        }
      } catch (err) {
        console.error('Không thể lấy lượt tim từ Google Sheets:', err);
      }
    }
    fetchLikes();
    return () => { isMounted = false; };
  }, []);

  // Xử lý bấm thả tim
  async function handleLike(e) {
    e.stopPropagation();

    // 1. Tăng giao diện ngay lập tức
    setLikeCount((prev) => prev + 1);

    // 2. Hiệu ứng tim bay
    const newHeart = {
      id: Date.now() + Math.random(),
      left: Math.random() * 40 - 20,
    };
    setFloatingHearts((prev) => [...prev.slice(-10), newHeart]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1500);

    // 3. Gửi POST request lên Backend để tăng 1 tim trong Google Sheets
    try {
      const res = await fetch(API_LIKES_URL, { method: 'POST' });
      const data = await res.json();
      // Đồng bộ lại con số chính xác từ Google Sheets trả về
      if (data.count) {
        setLikeCount(Number(data.count));
      }
    } catch (err) {
      console.error('Lỗi khi gửi tim lên server:', err);
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