import { appendRsvpRow } from '../services/sheets.service.js';

export async function submitRsvp(req, res) {
  const { fullName, phone, email, attending, guestCount, term } = req.body;

  try {
    await appendRsvpRow({ fullName, phone, email, attending, guestCount, term });
    return res.status(201).json({ message: 'Xác nhận tham gia thành công' });
  } catch (err) {
    console.error('Lỗi khi ghi vào Google Sheets:', err.message);
    return res.status(502).json({ message: 'Không thể lưu dữ liệu, vui lòng thử lại sau' });
  }
}
