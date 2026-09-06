import { body, validationResult } from 'express-validator';

export const rsvpValidationRules = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Họ tên không được để trống')
    .isLength({ max: 100 })
    .withMessage('Họ tên quá dài'),

  body('phone')
    .trim()
    .matches(/^(0|\+84)[0-9]{9,10}$/)
    .withMessage('Số điện thoại không hợp lệ'),

  body('email').trim().isEmail().withMessage('Email không hợp lệ').normalizeEmail(),

  body('attending')
    .isIn(['yes', 'no'])
    .withMessage('Vui lòng chọn có tham dự hay không'),

  body('guestCount')
    .if(body('attending').equals('yes'))
    .isInt({ min: 1, max: 10 })
    .withMessage('Số lượng người tham dự phải từ 1 đến 10'),
];

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: 'Dữ liệu không hợp lệ',
      errors: errors.array().map((e) => ({ field: e.path, message: e.msg })),
    });
  }
  next();
}
