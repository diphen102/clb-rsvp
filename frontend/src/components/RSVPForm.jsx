import React, { useState } from 'react';
import { User, Phone, Mail, Users, Send, MapPin, Calendar, Heart } from 'lucide-react';
import { submitRsvp } from '../api/rsvp.js';
import logo from '../assets/logo.jpg';

const INITIAL_FORM = {
  fullName: '',
  phone: '',
  email: '',
  attending: 'yes',
  guestCount: 1,
};

export default function RSVPForm({ onSuccess }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  }

  function validate() {
    const errors = {};
    const name = form.fullName.trim();
    if (!name) {
      errors.fullName = 'Vui lòng nhập họ và tên';
    } else if (name.length > 100) {
      errors.fullName = 'Họ tên tối đa 100 ký tự';
    }

    const phone = form.phone.trim();
    const phoneRegex = /^(0|\+84)[0-9]{9,10}$/;
    if (!phone) {
      errors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!phoneRegex.test(phone)) {
      errors.phone = 'Số điện thoại không hợp lệ (VD: 0912345678)';
    }

    const email = form.email.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      errors.email = 'Vui lòng nhập địa chỉ email';
    } else if (!emailRegex.test(email)) {
      errors.email = 'Địa chỉ email không hợp lệ';
    }

    if (form.attending === 'yes') {
      const count = Number(form.guestCount);
      if (!count || count < 1 || count > 10) {
        errors.guestCount = 'Số lượng người tham dự từ 1 đến 10';
      }
    }

    return errors;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitError('');

    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const payload = {
        fullName: form.fullName.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        attending: form.attending,
        ...(form.attending === 'yes' ? { guestCount: Number(form.guestCount) } : {}),
      };

      await submitRsvp(payload);
      onSuccess();
    } catch (err) {
      setSubmitError(err.message);
      const errorsByField = {};
      (err.fieldErrors || []).forEach((fe) => {
        errorsByField[fe.field] = fe.message;
      });
      setFieldErrors(errorsByField);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="cinelove-rsvp-envelope">
      {/* Con dấu sáp đỏ phong bì */}
      <div className="envelope-seal">
        <img src={logo} alt="Con dấu CLB" className="seal-logo" />
        <span className="seal-year">20</span>
      </div>

      <div className="envelope-split-layout">
        {/* Cột trái: Lời tri ân & Thông tin sự kiện (Nổi bật trên Desktop) */}
        <div className="envelope-greeting-column">
          <p className="envelope-pretitle">Thư hồi đáp tham dự</p>
          <h2 className="envelope-title">Xác Nhận Tham Dự</h2>
          <div className="envelope-divider" />
          <p className="envelope-subtitle">
            Sự hiện diện của quý anh chị, các bạn tình nguyện viên và quý đại biểu là niềm vinh hạnh to lớn cho Lễ kỷ niệm 20 năm thành lập CLB.
          </p>

          <div className="envelope-event-highlights">
            <div className="highlight-row">
              <Calendar size={16} />
              <span>Thứ bảy, 24.10.2026 • 17:00</span>
            </div>
            <div className="highlight-row">
              <MapPin size={16} />
              <span>Hội trường Trường ĐH Khoa Học - ĐH Huế</span>
            </div>
          </div>

          <div className="envelope-warm-quote">
            <Heart size={14} className="quote-heart" />
            <span>"Một giọt máu cho đi — Một cuộc đời ở lại"</span>
          </div>
        </div>

        {/* Cột phải: Form nhập liệu */}
        <div className="envelope-form-column">
          <form className="envelope-form" onSubmit={handleSubmit} noValidate>
            <div className="envelope-field">
              <label htmlFor="fullName">Họ và tên quý khách</label>
              <div className={`envelope-input-wrap ${fieldErrors.fullName ? 'has-error' : ''}`}>
                <User size={17} strokeWidth={1.75} />
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder=""
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              {fieldErrors.fullName && <span className="envelope-error">{fieldErrors.fullName}</span>}
            </div>

            <div className="envelope-form-row">
              <div className="envelope-field flex-1">
                <label htmlFor="phone">Số điện thoại</label>
                <div className={`envelope-input-wrap ${fieldErrors.phone ? 'has-error' : ''}`}>
                  <Phone size={17} strokeWidth={1.75} />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder=""
                    value={form.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
                {fieldErrors.phone && <span className="envelope-error">{fieldErrors.phone}</span>}
              </div>

              <div className="envelope-field flex-1">
                <label htmlFor="email">Địa chỉ Email</label>
                <div className={`envelope-input-wrap ${fieldErrors.email ? 'has-error' : ''}`}>
                  <Mail size={17} strokeWidth={1.75} />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder=""
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                {fieldErrors.email && <span className="envelope-error">{fieldErrors.email}</span>}
              </div>
            </div>

            <div className="envelope-field">
              <label>Bạn sẽ tham dự cùng chúng tôi chứ?</label>
              <div className="envelope-radio-group">
                <label className={`envelope-radio-card ${form.attending === 'yes' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="attending"
                    value="yes"
                    checked={form.attending === 'yes'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <span className="radio-text">Có, tôi sẽ tham dự</span>
                    <span className="radio-sub">Rất hân hạnh được đồng hành</span>
                  </div>
                </label>

                <label className={`envelope-radio-card ${form.attending === 'no' ? 'selected' : ''}`}>
                  <input
                    type="radio"
                    name="attending"
                    value="no"
                    checked={form.attending === 'no'}
                    onChange={handleChange}
                  />
                  <div className="radio-content">
                    <span className="radio-text">Tôi bận, rất tiếc</span>
                    <span className="radio-sub">Hẹn gặp dịp kỷ niệm sau</span>
                  </div>
                </label>
              </div>
            </div>

            {form.attending === 'yes' && (
              <div className="envelope-field">
                <label htmlFor="guestCount">Số lượng người tham dự (bao gồm bạn)</label>
                <div className={`envelope-input-wrap ${fieldErrors.guestCount ? 'has-error' : ''}`}>
                  <Users size={17} strokeWidth={1.75} />
                  <input
                    id="guestCount"
                    name="guestCount"
                    type="number"
                    min="1"
                    max="10"
                    value={form.guestCount}
                    onChange={handleChange}
                    required
                  />
                </div>
                {fieldErrors.guestCount && (
                  <span className="envelope-error">{fieldErrors.guestCount}</span>
                )}
              </div>
            )}

            {submitError && <p className="envelope-general-error">{submitError}</p>}

            <button type="submit" disabled={isSubmitting} className="btn-envelope-submit">
              <Send size={16} strokeWidth={1.8} />
              <span>{isSubmitting ? 'Đang gửi hồi đáp...' : 'Gửi Lời Hồi Đáp'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
