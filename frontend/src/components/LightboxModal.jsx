import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export default function LightboxModal({ image, total, currentIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!image) return null;

  return (
    <div className="lightbox-overlay" onClick={onClose}>
      <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="lightbox-close-btn" onClick={onClose} aria-label="Đóng">
          <X size={24} strokeWidth={1.8} />
        </button>

        {onPrev && (
          <button type="button" className="lightbox-nav-btn prev" onClick={onPrev} aria-label="Ảnh trước">
            <ChevronLeft size={28} strokeWidth={1.8} />
          </button>
        )}

        <div className="lightbox-image-wrap">
          <img src={image.src} alt={image.alt || 'Khoảnh khắc CLB'} className="lightbox-img" />
          <div className="lightbox-info">
            <p className="lightbox-caption">{image.caption || image.alt}</p>
            {total && <span className="lightbox-counter">{currentIndex + 1} / {total}</span>}
          </div>
        </div>

        {onNext && (
          <button type="button" className="lightbox-nav-btn next" onClick={onNext} aria-label="Ảnh kế tiếp">
            <ChevronRight size={28} strokeWidth={1.8} />
          </button>
        )}
      </div>
    </div>
  );
}
