import galleryImages from '../data/galleryImages.js';
import Reveal from './Reveal.jsx';
import { useScrollFloatGroup } from '../hooks/useScrollFloatGroup.js';

function Gallery() {
  const [refs, values] = useScrollFloatGroup(galleryImages.length, {
    minScale: 0.8,
    maxScale: 1,
    minOpacity: 0.45,
  });

  return (
    <section className="gallery">
      <Reveal>
        <h2 className="section-title">Khoảnh khắc của CLB</h2>
      </Reveal>

      <div className="gallery-grid">
        {galleryImages.map((img, index) => {
          const v = values[index] || { scale: 0.8, opacity: 0.45 };
          return (
            <div
              key={img.src}
              ref={(el) => (refs.current[index] = el)}
              className="gallery-item"
              style={{ transform: `scale(${v.scale})`, opacity: v.opacity }}
            >
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Gallery;
