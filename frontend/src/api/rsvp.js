const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

/**
 * Gửi thông tin RSVP tới backend.
 * Ném lỗi kèm message + danh sách field lỗi (nếu có) để component xử lý hiển thị.
 */
export async function submitRsvp(data) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}/api/rsvp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
  } catch {
    throw new Error('Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng hoặc thử lại sau.');
  }

  let result;
  try {
    result = await response.json();
  } catch {
    throw new Error('Không thể lưu dữ liệu, vui lòng thử lại sau');
  }

  if (!response.ok) {
    const error = new Error(result.message || 'Đã có lỗi xảy ra');
    error.fieldErrors = result.errors || [];
    throw error;
  }

  return result;
}
