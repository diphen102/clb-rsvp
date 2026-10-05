import React, { useState } from 'react';
import galleryImages from '../data/galleryImages.js';
import LightboxModal from './LightboxModal.jsx';
import { Sparkles, Heart, Eye } from 'lucide-react';

const FEATURED_MOMENTS = [
  {
    imageIndex: 33, // g27: Lễ kỷ niệm 19 năm CLB — tập thể lớn trong hội trường, banner "Happy Birthday 19"
    tag: 'Dấu ấn',
    title: 'Lễ Kỷ Niệm Truyền Thống',
    caption: 'Khoảnh khắc thắp nến và tiếp lửa nhiệt huyết tuổi 19',
    tilt: 'tilt-left',
    shape: 'arch-shape',
  },
  {
    imageIndex: 36, // g30: Ngày hội hiến máu tình nguyện — group ngoài trời, áo đoàn xanh + CLB trắng đỏ
    tag: 'Sứ mệnh',
    title: 'Mỗi Giọt Máu Trao Đi',
    caption: 'Là một lần nữa mang đến những hy vọng sống, thêm những cuộc đời được tiếp nối',
    tilt: 'tilt-right',
    shape: 'rounded-shape',
  },
  {
    imageIndex: 2, // g33: Ngày hội hiến máu 12/03/2015 — vintage banner group photo
    tag: 'Ký ức 2015',
    title: 'Ký Ức Một Thập Kỷ',
    caption: 'Ngày hội hiến máu 2015 tại Hội trường A1 — những ngọn lửa nhiệt huyết tiên phong thắp sáng hành trình nhân ái',
    tilt: 'tilt-left',
    shape: 'polaroid-shape',
  },
  {
    imageIndex: 37, // g31: Kết Nối Trái Tim Trẻ Thơ — ảnh với trẻ em tại mái ấm
    tag: 'Đồng hành',
    title: 'Kết Nối Trái Tim Trẻ Thơ',
    caption: 'Tay trao tay — từng nụ cười trẻ thơ là động lực để Giọt Hồng tiếp tục sứ mệnh yêu thương và đồng hành',
    tilt: 'tilt-right',
    shape: 'polaroid-shape',
  },
  {
    imageIndex: 34, // g28: Xuân Gắn Kết - Tết Sẻ Chia — ảnh group trước banner tại trường TH Lê Quang Bình
    tag: 'Thiện nguyện',
    title: 'Xuân Gắn Kết — Tết Sẻ Chia',
    caption: 'Hành trình mang hơi ấm của những trái tim giàu tình thương đến với các mệ các bà; đến với các em nhỏ ở điểm trường vùng cao',
    tilt: 'tilt-left',
    shape: 'rounded-shape',
  },
  {
    imageIndex: 38, // g29: Ngày hội hiến máu nhân đạo — group lớn ngoài trời, cầm bảng nhóm máu
    tag: 'Khởi đầu',
    title: 'Dấu Ấn Tuổi 18',
    caption: 'Từ những bước chân đầu tiên xây dựng lý tưởng, khát vọng bằng sự nhiệt huyết của tuổi trẻ',
    tilt: 'tilt-right',
    shape: 'arch-shape',
  },
  {
    imageIndex: 24, // g39: Ngày hội hiến máu 06/03/2019 — vintage outdoor, cầm banner ngoài cổng
    tag: 'Hành trình 2019',
    title: 'Ngày Hội Giọt Hồng Nhân Đạo',
    caption: 'Sắc cờ đỏ rực rỡ và nụ cười tình nguyện viên trước Hội trường A1 Đại học Khoa học Huế — hành trình chưa bao giờ dừng lại',
    tilt: 'tilt-left',
    shape: 'arch-shape',
  },
  {
    imageIndex: 39, // g05: Ngày hội hiến máu — group lớn ngoài trời, banner CLB Sinh Nhật Hồng Tuổi 18
    tag: 'Tự hào',
    title: 'Hành Trình Gần 20 Năm Cống Hiến',
    caption: 'Trở thành một cánh hoa rực rỡ, cùng nhau ghép nên bức ảnh kỷ niệm 20 năm — đánh dấu hành trình yêu thương và cống hiến trọn vẹn của Sinh Nhật Hồng.',
    tilt: 'tilt-right',
    shape: 'rounded-shape',
  },
];

export default function PhotoStory() {
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  const half = Math.ceil(galleryImages.length / 2);
  const row1 = galleryImages.slice(0, half);
  const row2 = galleryImages.slice(half);

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
              {[...row1, ...row1].map((img, idx) => {
                const originalIdx = idx % row1.length;
                return (
                  <div
                    key={`r1-${idx}`}
                    className="marquee-item film-frame"
                    onClick={() => openLightbox(originalIdx)}
                    title="Bấm để xem ảnh đầy đủ"
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    <div className="film-frame-number">{String(originalIdx + 1).padStart(2, '0')}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dải phim 2 — cuộn phải */}
        <div className="film-strip-band film-band-2">
          <div className="marquee-track-wrapper">
            <div className="marquee-track track-right">
              {[...row2, ...row2].map((img, idx) => {
                const originalIdx = half + (idx % row2.length);
                return (
                  <div
                    key={`r2-${idx}`}
                    className="marquee-item film-frame"
                    onClick={() => openLightbox(originalIdx)}
                    title="Bấm để xem ảnh đầy đủ"
                  >
                    <img src={img.src} alt={img.alt} loading="lazy" />
                    <div className="film-frame-number">{String(originalIdx + 1).padStart(2, '0')}</div>
                  </div>
                );
              })}
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
