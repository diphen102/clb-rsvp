import { useEffect, useRef, useState } from 'react';

/**
 * Trả về [ref, isVisible]. Gắn ref vào element cần theo dõi;
 * isVisible chuyển thành true khi element xuất hiện trong viewport,
 * dùng để trigger animation CSS (vd. thêm class "visible").
 */
export function useScrollReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el); // chỉ chạy 1 lần, tránh animation lặp lại khi cuộn qua lại
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}
