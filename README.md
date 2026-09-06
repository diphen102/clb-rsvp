# CLB RSVP - Trang xác nhận tham gia lễ kỷ niệm 20 năm

## Cấu trúc

```
clb-rsvp/
├── backend/              # Express API (deploy: Render)
│   ├── src/
│   │   ├── server.js     # entry point, đã chạy được (health check)
│   │   ├── routes/       # (bước sau) route /api/rsvp
│   │   ├── controllers/  # (bước sau) xử lý request
│   │   ├── services/     # (bước sau) ghi dữ liệu vào Google Sheets
│   │   ├── middleware/   # (bước sau) validate, rate limit
│   │   └── config/       # (bước sau) khởi tạo Google Sheets client
│   ├── package.json
│   └── .env.example
│
└── frontend/             # React + Vite (deploy: Vercel)
    ├── src/
    │   ├── main.jsx
    │   ├── App.jsx        # đã render được, chưa có form
    │   ├── components/    # (bước sau) RSVPForm.jsx, ThankYou.jsx
    │   ├── api/            # (bước sau) hàm gọi backend
    │   ├── assets/         # <-- đặt ảnh nền CLB vào đây (club-hero.jpg)
    │   └── styles/
    ├── package.json
    └── .env.example
```

## Chạy thử

**Backend:**
```
cd backend
cp .env.example .env
npm install
npm run dev
```
→ http://localhost:4000/health phải trả về `{ "status": "ok" }`

**Frontend:**
```
cd frontend
cp .env.example .env
npm install
npm run dev
```
→ http://localhost:5173

## Trạng thái hiện tại

- [x] Cấu trúc thư mục + package.json
- [x] Backend boot được, có health check endpoint
- [x] Frontend render được, có layout cơ bản (hero + content)
- [x] Endpoint `POST /api/rsvp` + validate (họ tên, SĐT, email, số lượng) + rate limit
- [x] Tích hợp Google Sheets API (service account) - cần bạn tự tạo Service Account để có credential thật
- [x] Form RSVP (frontend) + validate + hiển thị lỗi theo từng field
- [x] Trang cảm ơn sau submit
- [x] Ảnh nền hero (dùng ảnh CLB đã có)
- [x] Header với logo CLB
- [x] Redesign tối giản kiểu Swiss/spa cao cấp: 1 màu accent (đỏ trầm) trên nền
  trung tính, spacing scale 8px nhất quán, icon Lucide React thay cho mọi ký hiệu,
  bỏ shadow/trang trí rườm rà
- [ ] Deploy Vercel + Render

## ⚠️ Cần bạn cập nhật trước khi dùng thật

- `frontend/src/config/eventConfig.js` - **ngày giờ và địa điểm sự kiện đang là placeholder**,
  countdown sẽ đếm sai nếu không sửa. Sửa `eventDate` (định dạng ISO,
  vd `'2026-10-24T17:00:00+07:00'`), `venueName`, `venueAddress`.

## Thiết lập Google Sheets (để `/api/rsvp` ghi được thật)

1. Vào [Google Cloud Console](https://console.cloud.google.com) → tạo project mới (hoặc dùng project có sẵn).
2. Bật **Google Sheets API** (APIs & Services → Library).
3. Tạo **Service Account** (IAM & Admin → Service Accounts) → tạo key dạng JSON, tải về.
4. Từ file JSON, lấy `client_email` và `private_key`, điền vào `.env`:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = giá trị `client_email`
   - `GOOGLE_PRIVATE_KEY` = giá trị `private_key` (giữ nguyên `\n`, không xóa)
5. Tạo 1 Google Sheet mới, tạo tab tên `RSVP`, dòng đầu tiên là header (Timestamp, Họ tên, SĐT, Email, Số lượng).
6. Share Sheet đó cho email trong `client_email` ở bước 4, quyền **Editor**.
7. Lấy `GOOGLE_SHEET_ID` từ URL của Sheet (đoạn giữa `/d/` và `/edit`).

## Ghi chú

- `GOOGLE_SHEET_ID` trong `.env.example` đã điền sẵn theo Sheet bạn cung cấp. Nhớ tạo tab tên `RSVP`
  trong sheet đó (xem bước 5 ở trên) và share Editor cho email service account.
- Ảnh nền hero: `frontend/src/assets/club-hero.jpg` - hiện đang dùng ảnh chụp tập thể CLB (lễ 19 năm).
  Nếu có ảnh khác (không dính chữ "19 năm", hoặc ảnh riêng logo/backdrop 20 năm), gửi để thay.
- Logo: `frontend/src/assets/logo.jpg`.
- Gallery: `frontend/src/assets/gallery/` (26 ảnh gốc, đã resize/nén bằng ImageMagick).
  `frontend/src/data/galleryImages.js` khai báo toàn bộ 26 ảnh - nhưng hiện chỉ 9 ảnh
  (`PhotoStory.jsx`, lọc mỗi 3 ảnh lấy 1) được render thành section full-bleed để
  trang không quá dài. Muốn đổi ảnh nào lên section, hoặc đổi số lượng section,
  sửa logic filter trong `PhotoStory.jsx`.
