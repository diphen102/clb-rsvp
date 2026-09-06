import rateLimit from 'express-rate-limit';

// Giới hạn 5 lần submit / 15 phút / IP - đủ chặn spam mà không ảnh hưởng người dùng thật
export const rsvpRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { message: 'Bạn đã gửi quá nhiều lần, vui lòng thử lại sau.' },
  standardHeaders: true,
  legacyHeaders: false,
});
