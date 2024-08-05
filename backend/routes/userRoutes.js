// backend/routes/userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// const adminMiddleware = require('../middlewares/adminMiddleware');
// const { authMiddleware } = require('../middlewares/authMiddleware');
// const { getUserDetails } = require('../controllers/userController');

router.post('/signup', userController.signup);
router.post('/login', userController.login);
// router.post('/book/:train_id', authMiddleware, bookSeat);
// router.get('/me', authMiddleware, userController.getUserDetails);

module.exports = router;
