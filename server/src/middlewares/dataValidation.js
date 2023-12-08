const { body, param, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array().map(err => err.msg) });
  }
  next();
};

module.exports = {

  user: [
    body('fullname')
      .exists().withMessage('Fullname is required')
      .trim()
      .notEmpty().withMessage('Fullname cannot be empty'),
    body('username')
      .exists().withMessage('Username is required')
      .trim()
      .notEmpty().withMessage('Username cannot be empty')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail()
      .custom(value => {
        if (value.includes('.com.com')) {
          throw new Error('Username should not contain ".com.com"');
        }
        return true;
      }),
    body('password')
      .exists().withMessage('Password is required')
      .trim()
      .notEmpty().withMessage('Password cannot be empty'),

    handleValidationErrors
  ],
  userLogin: [
    body('username')
      .exists().withMessage('Username is required')
      .trim()
      .notEmpty().withMessage('Username cannot be empty')
      .isEmail().withMessage('Invalid email format')
      .normalizeEmail()
      .custom(value => {
        if (value.includes('.com.com')) {
          throw new Error('Username should not contain ".com.com"');
        }
        return true;
      }),
    body('password')
      .exists().withMessage('Password is required')
      .trim()
      .notEmpty().withMessage('Password cannot be empty'),

    handleValidationErrors
  ],
  reservation: [
    body('reservationId')
      .exists().withMessage('Reservation ID is required')
      .trim()
      .notEmpty().withMessage('Reservation ID cannot be empty'),

    body('roomNumber')
      .exists().withMessage('Room number is required')
      .trim()
      .notEmpty().withMessage('Room number cannot be empty'),

    body('reservationDates')
      .isArray().withMessage('Reservation dates should be an array')
      .notEmpty().withMessage('Reservation dates cannot be empty')
      .custom(dates => {
        if (!dates.every(date => typeof date === 'number')) {
          throw new Error('Invalid date format');
        }
        return true;
      }),

    handleValidationErrors
  ],
  availableRooms: [
    body('selectedDates')
      .isArray().withMessage('Reservation dates should be an array')
      .notEmpty().withMessage('Reservation dates cannot be empty')
      .custom(dates => {
        if (!dates.every(date => typeof date === 'number')) {
          throw new Error('Invalid date format');
        }
        return true;
      }),
    
    body('type')
      .exists().withMessage('type is required')
      .trim()
      .notEmpty().withMessage('Type cannot be empty')
      .isIn([ 'Single', 'Double', 'Quadruple' ]).withMessage('Invalid room type. Must be single room, double room, quadruple room'),

    handleValidationErrors
  ],
  room: [
    body('roomNumber')
      .exists().withMessage('RoomNumber is required')
      .trim()
      .notEmpty().withMessage('RoomNumber cannot be empty'),

    body('type')
      .exists().withMessage('type is required')
      .trim()
      .notEmpty().withMessage('Type cannot be empty')
      .isIn([ 'Single', 'Double', 'Quadruple' ]).withMessage('Invalid room type'),

    body('description')
      .exists().withMessage('Description is required')
      .trim()
      .notEmpty().withMessage('Description cannot be empty'),

    body('price')
      .exists().withMessage('Price is required')
      .trim()
      .notEmpty().withMessage('Price cannot be empty'),

    handleValidationErrors

  ],
  reservation: [
    body('selectedDates')
      .isArray().withMessage('Reservation dates should be an array')
      .notEmpty().withMessage('Reservation dates cannot be empty')
      .custom(dates => {
        if (!dates.every(date => typeof date === 'number')) {
          throw new Error('Invalid date format');
        }
        return true;
      }),

    handleValidationErrors

  ],
}