import React, { useState } from 'react';
import galleryImages from '../data/galleryImages.js';
import LightboxModal from './LightboxModal.jsx';
import { Sparkles, Heart, Eye } from 'lucide-react';

const FEATURED_MOMENTS = [
  {
    imageIndex: 26, // gallery-27: Lễ kỷ niệm 18 tuổi
    tag: 'Dấu ấn',
    title: 'Lễ Kỷ Niệm Truyền Thống',
    caption: 'Khoảnh khắc thắp nến và tiếp lửa nhiệt huyết tuổi 19',
    tilt: 'tilt-left',
    shape: 'arch-shape',
  },
  {
    imageIndex: 29, // gallery-30: Ngày hội Hiến máu
    tag: 'Sứ mệnh',
    title: 'Mỗi Giọt Máu Trao Đi',
    caption: 'Là một lần nữa mang đến những hy vọng sống, thêm những cuộc đời được tiếp nối',
    tilt: 'tilt-right',
    shape: 'rounded-shape',
  },
  {
    imageIndex: 27, // gallery-28: Xuân gắn kết
    tag: 'Thiện nguyện',
    title: 'Xuân Gắn Kết - Tết Sẻ Chia',
    caption: 'Hành trình mang hơi ấm của những trái tim giàu tình thương đến với các mệ các bà; đến với các em nhỏ ở điểm trường vùng cao',
    tilt: 'tilt-left',
    shape: 'arch-shape',
  },
  {
    imageIndex: 30, // gallery-31: Trẻ thơ
    tag: 'Đồng hành',
    title: 'Kết Nối Trái Tim Trẻ Thơ',
    caption: 'Đồng hành là sự gắn bó lâu dài để trao đi những hơi ấm, vun đắp, tiếp nối sẻ chia, mang đến những ý nghĩa mới',
    tilt: 'tilt-right',
    shape: 'polaroid-shape',
  },
  {
    imageIndex: 28, // gallery-29: Trao quà
    tag: 'Yêu thương',
    title: 'Nụ Cười Trẻ Thơ',
    caption: 'Những phần quà nghĩa tình dành tặng các em nhỏ thân thương',
    tilt: 'tilt-left',
    shape: 'rounded-shape',
  },
  {
    imageIndex: 0, // gallery-01
    tag: 'Khởi đầu',
    title: 'Dấu Ấn Tuổi 18',
    caption: 'Từ những bước chân đầu tiên xây dựng lý tưởng, khát vọng bằng sự nhiệt huyết của tuổi trẻ',
    tilt: 'tilt-right',
    shape: 'arch-shape',
  },
  {
    imageIndex: 4, // gallery-05
    tag: 'Gắn kết',
    title: 'Mái Nhà Chung Giọt Hồng',
    caption: 'Mái nhà chung giọt hồng - Nơi những con tim hòa vào nhịp đập chung của sự yêu thương cùng nhau viết tiếp những hành trình mới',
    tilt: 'tilt-left',
    shape: 'polaroid-shape',
  },
  {
    imageIndex: 11, // gallery-12
    tag: 'Tự hào',
    title: 'Tiếp Nối Ngọn Lửa 20 Năm',
    caption: 'Hai thập kỉ cống hiến, lan tỏa tinh thần nhân văn CLB đã và đang tiếp tục thắp sáng ngọn lửa nhiệt huyết cho những thế hệ sau',
    tilt: 'tilt-right',
    shape: 'arch-shape',
  },
];

export default function PhotoStory() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const row1 = galleryImages.slice(0, 16);
  const row2 = galleryImages.slice(16);

  function openLightbox(idx) {
    setSelectedImageIndex(idx);
  }

  function closeLightbox() {
    setSelectedImageIndex(null);
  }

  function handlePrev() {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  }

  function handleNext() {
    setSelectedImageIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  }

  return (
    <div className="photo-story-cinelove-section">
      <div className="cinelove-section-header">
        <span className="cinelove-subheading">Kỷ Niệm &amp; Khoảnh Khắc</span>
        <h2 className="cinelove-heading">Hành Trình 20 Năm Yêu Thương</h2>
        <div className="cinelove-header-divider">
          <Heart size={14} className="divider-icon" />
        </div>
        <p className="cinelove-desc">
          Trao đi từng giọt máu, nhận lại những nụ cười. Mỗi hành trình là một mảnh ghép kí ức để viết nên câu chuyện 20 năm hình thành và phát triển rực rỡ của 
          CLB Sinh nhật hồng tuổi 18 – Hiến máu cứu người
        </p>
      </div>

      {/* Cuộn Phim Ký Ức — Film Strip */}
      <div className="film-strip-section">
        {/* Header */}
        <div className="film-strip-header">
          <Sparkles size={16} strokeWidth={1.8} className="film-header-icon" />
          <span className="film-header-label">Cuộn phim ký ức</span>
          <span className="film-header-count">khoảnh khắc đáng nhớ</span>
        </div>

        {/* Dải phim 1 — cuộn trái */}
        <div className="film-strip-band">
          <div className="marquee-track-wrapper">
            <div className="marquee-track track-left">
              {[...row1, ...row1].map((img, idx) => (
                <div
                  key={`r1-${idx}`}
                  className="marquee-item film-frame"
                  onClick={() => openLightbox(idx % row1.length)}
                  title="Bấm để xem ảnh đầy đủ"
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="film-frame-number">{String((idx % row1.length) + 1).padStart(2, '0')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dải phim 2 — cuộn phải */}
        <div className="film-strip-band film-band-2">
          <div className="marquee-track-wrapper">
            <div className="marquee-track track-right">
              {[...row2, ...row2].map((img, idx) => (
                <div
                  key={`r2-${idx}`}
                  className="marquee-item film-frame"
                  onClick={() => openLightbox(16 + (idx % row2.length))}
                  title="Bấm để xem ảnh đầy đủ"
                >
                  <img src={img.src} alt={img.alt} loading="lazy" />
                  <div className="film-frame-number">{String(16 + (idx % row2.length) + 1).padStart(2, '0')}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Lưới Ảnh Khung Vòm & Polaroid: 4 Cột Trên Desktop, 1 Cột Trên Mobile */}
      <div className="floating-arch-container">
        <h3 className="arch-grid-subheading">Dấu Ấn Kỷ Niệm Tiêu Biểu</h3>
        <div className="floating-arch-grid">
          {FEATURED_MOMENTS.map((item, i) => {
            const img = galleryImages[item.imageIndex] || galleryImages[0];
            return (
              <div
                key={i}
                className={`floating-moment-card ${item.tilt} ${item.shape}`}
                onClick={() => openLightbox(item.imageIndex)}
                title="Bấm để xem chi tiết ảnh"
              >
                <div className="moment-card-inner">
                  <div className="moment-image-wrapper">
                    <img src={img.src} alt={item.title} loading="lazy" className="moment-img" />
                    <div className="moment-overlay" />
                    <span className="moment-view-hint">
                      <Eye size={16} />
                    </span>
                  </div>
                  <div className="moment-caption-box">
                    <span className="moment-tag">{item.tag}</span>
                    <h4 className="moment-title">{item.title}</h4>
                    <p className="moment-desc">{item.caption}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && (
        <LightboxModal
          image={galleryImages[selectedImageIndex]}
          total={galleryImages.length}
          currentIndex={selectedImageIndex}
          onClose={closeLightbox}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </div>
  );
}
