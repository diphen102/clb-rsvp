import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Countdown from './components/Countdown.jsx';
import PhotoStory from './components/PhotoStory.jsx';
import RSVPForm from './components/RSVPForm.jsx';
import ThankYou from './components/ThankYou.jsx';
import OpeningCurtain from './components/OpeningCurtain.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import FloatingParticles from './components/FloatingParticles.jsx';
import BottomToolbar from './components/BottomToolbar.jsx';
import { eventConfig } from './config/eventConfig.js';
import heroImg from './assets/club-hero.jpg';
import { Heart, Calendar, MapPin, Sparkles, ChevronDown } from 'lucide-react';

export default function App() {
  const [submitted, setSubmitted] = useState(false);
  const [curtainOpened, setCurtainOpened] = useState(false);

  function handleCurtainOpen() {
    setCurtainOpened(true);
  }

  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div className="cinelove-page-wrapper">
      {/* Màn che mở thiệp 2 cánh toàn màn hình */}
      <OpeningCurtain onOpen={handleCurtainOpen} />

      {/* Đĩa nhạc xoay tròn ở góc phải trên */}
      <MusicPlayer autoPlayTrigger={curtainOpened} />

      {/* Cánh hoa & hạt tim rơi bồng bềnh */}
      <FloatingParticles />

      {/* Header điều hướng thanh lịch */}
      <Header />

      {/* Nội dung chính toàn trang responsive */}
      <main className="cinelove-main-container">
        {/* HERO SECTION: Split Editorial trên Desktop, Vertical trên Mobile */}
        <section className="cinelove-hero-section" id="hero-section">
          <div className="hero-grid-container">
            {/* Cột chữ / Thư ngỏ */}
            <div className="hero-text-column">
              <div className="hero-eyebrow-tag">
                <Sparkles size={13} strokeWidth={1.8} />
                <span>Thư Mời Kỷ Niệm 20 Năm</span>
              </div>

              <h1 className="hero-event-name">{eventConfig.eventName}</h1>

              <div className="hero-title-divider">
                <Heart size={14} className="heart-icon" />
              </div>

              <p className="hero-tagline">
                Hai thập kỷ nối dài nhịp đập yêu thương - Tri ân những trái tim tình nguyện không mệt mỏi
              </p>

              {/* Thẻ ngày giờ & địa điểm */}
              <div className="event-info-cards">
                <div className="event-info-item">
                  <div className="info-icon-box">
                    <Calendar size={18} strokeWidth={1.8} />
                  </div>
                  <div className="info-text-box">
                    <span className="info-label">Thời gian tổ chức</span>
                    <strong className="info-value">17:00 • Thứ bảy, 24.10.2026</strong>
                  </div>
                </div>

                <div className="event-info-item">
                  <div className="info-icon-box">
                    <MapPin size={18} strokeWidth={1.8} />
                  </div>
                  <div className="info-text-box">
                    <span className="info-label">Địa điểm trang trọng</span>
                    <strong className="info-value">Trường ĐH Khoa Học - ĐH Huế</strong>
                  </div>
                </div>
              </div>

              <div className="hero-action-buttons">
                <button
                  type="button"
                  className="btn-hero-rsvp"
                  onClick={() => scrollToSection('rsvp-section')}
                >
                  Xác Nhận Tham Dự
                </button>
                <button
                  type="button"
                  className="btn-hero-explore"
                  onClick={() => scrollToSection('photo-story-section')}
                >
                  <span>Xem Kỷ Niệm 20 Năm</span>
                  <ChevronDown size={16} />
                </button>
              </div>
            </div>

            {/* Cột ảnh: Cổng Vòm Hoàng Gia */}
            <div className="hero-visual-column">
              <div className="hero-arch-card">
                <div className="hero-arch-inner">
                  <img src={heroImg} alt="Kỷ niệm 20 năm CLB" className="hero-arch-img" />
                  <div className="hero-arch-overlay" />
                  <div className="hero-arch-badge">
                    <span>2006 - 2026</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COUNTDOWN SECTION */}
        <section className="cinelove-countdown-section" id="countdown-section">
          <Countdown />
        </section>

        {/* PHOTO STORY: Dải Marquee Vô Tận + Triển Lãm Khung Vòm */}
        <section id="photo-story-section">
          <PhotoStory />
        </section>

        {/* RSVP FORM: Phong Bì Thư Hồi Đáp */}
        <section className="cinelove-rsvp-section" id="rsvp-section">
          <div className="rsvp-container-box">
            {submitted ? (
              <ThankYou onReset={() => setSubmitted(false)} />
            ) : (
              <RSVPForm onSuccess={() => setSubmitted(true)} />
            )}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="cinelove-footer">
        <div className="footer-inner">
          <p className="footer-quote">"Một giọt máu cho đi - Một cuộc đời ở lại"</p>
          <p className="footer-copyright">
            CLB Sinh Nhật Hồng Tuổi 18 - HMCN • Trực thuộc Trường Đại học Khoa học - Đại học Huế
          </p>
        </div>
      </footer>

      {/* Thanh Toolbar Tương Tác Dưới Đáy (Mobile & Desktop) */}
      <BottomToolbar />
    </div>
  );
}
