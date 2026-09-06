import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Theo dõi 1 nhóm phần tử, tính scale + opacity cho từng phần tử dựa trên
 * khoảng cách từ tâm phần tử tới tâm viewport: càng gần giữa màn hình càng
 * to/rõ, càng ra rìa càng nhỏ/mờ. Tạo cảm giác "bay bổng" khi cuộn.
 *
 * Dùng 1 scroll listener dùng chung (throttle bằng rAF) cho cả nhóm,
 * thay vì mỗi phần tử tự chạy vòng lặp riêng - đỡ tốn hiệu năng hơn
 * khi gallery có nhiều ảnh.
 */
export function useScrollFloatGroup(count, { minScale = 0.8, maxScale = 1, minOpacity = 0.5 } = {}) {
  const refs = useRef([]);
  const [values, setValues] = useState(() => Array(count).fill({ scale: minScale, opacity: minOpacity }));
  const tickingRef = useRef(false);

  const measure = useCallback(() => {
    const vh = window.innerHeight;

    const next = refs.current.map((el) => {
      if (!el) return { scale: minScale, opacity: minOpacity };

      const rect = el.getBoundingClientRect();
      const elCenter = rect.top + rect.height / 2;
      const distance = Math.abs(vh / 2 - elCenter);
      const maxDistance = vh / 2 + rect.height / 2;
      const proximity = 1 - Math.min(distance / maxDistance, 1); // 0 = xa, 1 = ngay giữa màn hình

      return {
        scale: minScale + proximity * (maxScale - minScale),
        opacity: minOpacity + proximity * (1 - minOpacity),
      };
    });

    setValues(next);
    tickingRef.current = false;
  }, [minScale, maxScale, minOpacity]);

  useEffect(() => {
    function onScroll() {
      if (!tickingRef.current) {
        tickingRef.current = true;
        requestAnimationFrame(measure);
      }
    }

    measure(); // tính ngay khi mount, không cần đợi cuộn
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [measure]);

  return [refs, values];
}
