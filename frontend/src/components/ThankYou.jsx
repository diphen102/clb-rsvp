import React from 'react';
import { CircleCheck, Heart, RotateCcw } from 'lucide-react';
import logo from '../assets/logo.jpg';

export default function ThankYou({ onReset }) {
  return (
    <div className="cinelove-thankyou-card">
      <div className="thankyou-seal">
        <img src={logo} alt="Logo CLB" className="seal-img" />
      </div>

      <div className="thankyou-icon-circle">
        <CircleCheck size={36} strokeWidth={1.8} className="check-icon" />
      </div>

      <p className="thankyou-pretitle">Lời cảm ơn chân thành</p>
      <h2 className="thankyou-title">Đã Nhận Lời Hồi Đáp</h2>
      <div className="thankyou-divider">
        <Heart size={14} className="heart-icon" />
      </div>

      <p className="thankyou-message">
        CLB Sinh Nhật Hồng Tuổi 18 - HMCN đã ghi nhận phản hồi của quý anh chị và các bạn tình nguyện viên.
        Sự quan tâm và tình cảm gắn bó của bạn là động lực to lớn cho hành trình 20 năm tiếp theo của chúng tôi.
      </p>

      <div className="thankyou-quote">
        <p>"Một giọt máu cho đi - Một cuộc đời ở lại"</p>
      </div>

      {onReset && (
        <button type="button" className="btn-thankyou-reset" onClick={onReset}>
          <RotateCcw size={14} />
          <span>Gửi lại thông tin khác</span>
        </button>
      )}
    </div>
  );
}
