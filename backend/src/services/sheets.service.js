import getSheetsClient from '../config/googleSheets.js';

const SHEET_RANGE = 'RSVP!A:F'; // tab tên "RSVP", cột A-F: timestamp, họ tên, SĐT, email, tham dự, số lượng

/**
 * Ghi 1 dòng RSVP mới vào cuối sheet.
 * @param {{fullName: string, phone: string, email: string, attending: 'yes'|'no', guestCount: number}} data
 */
export async function appendRsvpRow(data) {
  const sheets = getSheetsClient();
  const spreadsheetId = process.env.GOOGLE_SHEET_ID;

  const timestamp = new Date().toISOString();
  const attendingLabel = data.attending === 'yes' ? 'Tham dự' : 'Không tham dự';
  const guestCount = data.attending === 'yes' ? data.guestCount : 0;

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: SHEET_RANGE,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    requestBody: {
      values: [[timestamp, data.fullName, data.phone, data.email, attendingLabel, guestCount]],
    },
  });
}
