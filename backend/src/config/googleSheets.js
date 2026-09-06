import { google } from 'googleapis';

/**
 * Khởi tạo client Google Sheets, xác thực bằng Service Account.
 * GOOGLE_PRIVATE_KEY trong .env chứa \n dạng escape, cần replace lại
 * thành ký tự xuống dòng thật thì JWT mới parse được.
 */
function getSheetsClient() {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  return google.sheets({ version: 'v4', auth });
}

export default getSheetsClient;
