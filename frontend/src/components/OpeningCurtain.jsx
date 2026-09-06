import React, { useState } from 'react';
import logo from '../assets/logo.jpg';
import { MailOpen, Sparkles } from 'lucide-react';

export default function OpeningCurtain({ onOpen }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  function handleOpen() {
    setIsOpen(true);
    if (onOpen) onOpen();
    setTimeout(() => {
      setIsDismissed(true);
    }, 1200);
  }

  if (isDismissed) return null;

  return (
    <div className={`opening-curtain-overlay ${isOpen ? 'is-open' : ''}`}>
      {/* Cánh cửa bên trái */}
      <div className="curtain-panel curtain-panel-left">
        <div className="curtain-pattern" />
      </div>

      {/* Cánh cửa bên phải */}
      <div className="curtain-panel curtain-panel-right">
        <div className="curtain-pattern" />
      </div>

      {/* Phong bì / Con dấu trung tâm */}
      <div className="curtain-center-content">
        <div className="curtain-envelope-card">
          <div className="curtain-seal-ring">
            <img src={logo} alt="Logo CLB Sinh Nhật Hồng" className="curtain-logo" />
          </div>

          <p className="curtain-eyebrow">Trân trọng kính mời</p>
          <h2 className="curtain-title">Lễ Kỷ Niệm 20 Năm</h2>
          <p className="curtain-club-name">CLB Sinh Nhật Hồng Tuổi 18 - HMCN</p>
          <div className="curtain-divider" />
          <p className="curtain-date">2006 - 2026</p>

          <button type="button" className="btn-open-curtain" onClick={handleOpen}>
            <MailOpen size={18} strokeWidth={1.8} />
            <span>Chạm để mở thiệp</span>
            <Sparkles size={16} strokeWidth={1.8} className="sparkle-icon" />
          </button>
        </div>
      </div>
    </div>
  );
}
