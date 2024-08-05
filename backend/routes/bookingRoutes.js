const express = require('express');
const { getBookingDetails, bookSeat } = require('../controllers/bookingController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/:booking_id', authMiddleware, getBookingDetails);
router.post('/book', authMiddleware, bookSeat);

module.exports = router;
