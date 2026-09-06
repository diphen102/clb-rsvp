import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rsvpRoutes from './routes/rsvp.routes.js';

dotenv.config();

const app = express();
// Railway sẽ tự động cấp biến process.env.PORT
const PORT = process.env.PORT || 4000;

// Cấu hình CORS linh hoạt cho phép tất cả các domain Vercel và Localhost
app.use(cors({
  origin: function (origin, callback) {
    // Cho phép các request không có origin (như Postman hoặc Server-to-Server)
    if (!origin) return callback(null, true);

    // Cho phép tất cả các domain kết thúc bằng .vercel.app hoặc localhost
    if (
      origin.endsWith('.vercel.app') || 
      origin.startsWith('http://localhost')
    ) {
      return callback(null, true);
    }

    return callback(new Error('Blocked by CORS'));
  },
  credentials: true
}));

app.use(express.json());

// Root route - Giúp kiểm tra trực tiếp qua trình duyệt không bị lỗi "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Backend Server is running successfully!');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/rsvp', rsvpRoutes);

// Bắt buộc thêm '0.0.0.0' để Server lắng nghe các request từ mạng bên ngoài trên Railway/Render
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend đang chạy trên port ${PORT}`);
});