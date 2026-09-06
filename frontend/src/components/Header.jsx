import React from 'react';
import logo from '../assets/logo.jpg';

export default function Header() {
  function scrollToSection(id) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <header className="cinelove-header">
      <div className="header-inner-container">
        <div className="header-brand" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <img src={logo} alt="Logo CLB" className="header-logo" />
          <div className="header-titles">
            <span className="header-main-title">Sinh Nhật Hồng - HMCN</span>
            <span className="header-sub-title">20 Năm Trao Giọt Máu Hồng</span>
          </div>
        </div>

        {/* Menu điều hướng trên Desktop */}
        <nav className="desktop-nav">
          <button type="button" onClick={() => scrollToSection('countdown-section')} className="nav-link">
            Đếm ngược
          </button>
          <button type="button" onClick={() => scrollToSection('photo-story-section')} className="nav-link">
            Khoảnh khắc
          </button>
          <button type="button" onClick={() => scrollToSection('rsvp-section')} className="nav-link nav-cta">
            Xác nhận tham dự
          </button>
        </nav>
      </div>
    </header>
  );
}
