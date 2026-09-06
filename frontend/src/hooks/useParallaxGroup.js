import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Tính độ dịch chuyển (translateY) cho từng section theo vị trí cuộn,
 * tạo hiệu ứng parallax: ảnh nền trôi chậm hơn nội dung khi cuộn,
 * tạo cảm giác chiều sâu thay vì trang "phẳng".
 *
 * factor càng lớn thì ảnh trôi càng nhiều (rõ hiệu ứng hơn nhưng
 * cũng dễ lộ mép nếu ảnh không đủ cao hơn khung chứa).
 */
export function useParallaxGroup(count, factor = 0.15) {
  const refs = useRef([]);
  const [offsets, setOffsets] = useState(() => Array(count).fill(0));
  const tickingRef = useRef(false);

  const measure = useCallback(() => {
    const vh = window.innerHeight;
    const next = refs.current.map((el) => {
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      return (vh / 2 - elCenter) * factor;
    });
    setOffsets(next);
    tickingRef.current = false;
  }, [factor]);

  useEffect(() => {
    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(measure);
      }
    }
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure]);

  return [refs, offsets];
}
