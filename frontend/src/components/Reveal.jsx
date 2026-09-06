import { useScrollReveal } from '../hooks/useScrollReveal.js';

/**
 * Bọc bất kỳ nội dung nào để nó fade-up khi cuộn tới.
 * delay (ms) dùng để so le hiệu ứng giữa các item trong 1 grid.
 */
function Reveal({ children, delay = 0, className = '' }) {
  const [ref, isVisible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal ${isVisible ? 'reveal-visible' : ''} ${className}`}
      style={{ transitionDelay: isVisible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  );
}

export default Reveal;
