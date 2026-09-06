import React from 'react';
import { useCountdown } from '../hooks/useCountdown.js';
import { eventConfig } from '../config/eventConfig.js';
import { Clock } from 'lucide-react';

const UNITS = [
  { key: 'days', label: 'Ngày' },
  { key: 'hours', label: 'Giờ' },
  { key: 'minutes', label: 'Phút' },
  { key: 'seconds', label: 'Giây' },
];

export default function Countdown() {
  const timeLeft = useCountdown(eventConfig.eventDate);
  const isPast = timeLeft.total <= 0;

  if (isPast) {
    return (
      <div className="cinelove-countdown-box">
        <p className="countdown-ended">Sự kiện đã diễn ra - Cảm ơn bạn đã luôn đồng hành cùng CLB Sinh Nhật Hồng!</p>
      </div>
    );
  }

  return (
    <div className="cinelove-countdown-box">
      <div className="countdown-header-tag">
        <Clock size={14} strokeWidth={2} />
        <span>Thời gian đếm ngược</span>
      </div>

      <div className="countdown-tiles">
        {UNITS.map((unit, idx) => (
          <React.Fragment key={unit.key}>
            <div className="countdown-tile">
              <div className="countdown-number-circle">
                <span className="tile-number">{String(timeLeft[unit.key]).padStart(2, '0')}</span>
              </div>
              <span className="tile-label">{unit.label}</span>
            </div>
            {idx < UNITS.length - 1 && <span className="tile-separator" aria-hidden="true">:</span>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
