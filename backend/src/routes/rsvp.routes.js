import { Router } from 'express';
import { submitRsvp } from '../controllers/rsvp.controller.js';
import { rsvpValidationRules, handleValidationErrors } from '../middleware/validate.middleware.js';
import { rsvpRateLimiter } from '../middleware/rateLimiter.js';
import getSheetsClient from '../config/googleSheets.js'; // Nhập hàm lấy sheets client của bạn

const router = Router();

// Vị trí ô lưu lượt tim trên Google Sheets (Tab "Likes", ô A1)
const LIKES_RANGE = "'Likes'!A1";

// 1. POST /api/rsvp - Gửi form RSVP
router.post('/', rsvpRateLimiter, rsvpValidationRules, handleValidationErrors, submitRsvp);

// 2. GET /api/rsvp/likes - Lấy tổng số tim hiện tại từ Google Sheets
router.get('/likes', async (req, res) => {
  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: LIKES_RANGE,
    });

    const rows = response.data.values;
    let currentLikes = 511;

    if (rows && rows[0] && rows[0][0]) {
      const parsed = parseInt(rows[0][0], 10);
      if (!isNaN(parsed) && parsed >= 511) {
        currentLikes = parsed;
      }
    }

    return res.json({ count: currentLikes });
  } catch (err) {
    console.error('Lỗi khi đọc lượt tim từ Google Sheets:', err.message);
    // Nếu chưa tạo tab "Likes" hoặc bị lỗi, mặc định trả về 511 để Frontend không bị ngắt
    return res.json({ count: 511 });
  }
});

// 3. POST /api/rsvp/likes - Tăng thêm 1 tim vào Google Sheets
router.post('/likes', async (req, res) => {
  try {
    const sheets = getSheetsClient();

    // Lấy số tim hiện tại
    const getRes = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: LIKES_RANGE,
    });

    let currentLikes = 511;
    if (getRes.data.values && getRes.data.values[0] && getRes.data.values[0][0]) {
      const parsed = parseInt(getRes.data.values[0][0], 10);
      if (!isNaN(parsed)) currentLikes = parsed;
    }

    const newLikes = currentLikes + 1;

    // Ghi đề số tim mới vào ô A1
    await sheets.spreadsheets.values.update({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range: LIKES_RANGE,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[newLikes]],
      },
    });

    return res.json({ success: true, count: newLikes });
  } catch (err) {
    console.error('Lỗi khi cập nhật lượt tim:', err.message);
    return res.status(500).json({ error: 'Không thể lưu lượt tim' });
  }
});

export default router;