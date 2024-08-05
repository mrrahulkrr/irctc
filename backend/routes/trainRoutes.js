const express = require('express');
const { addTrain, getTrainAvailability, bookSeat } = require('../controllers/trainController');
// const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const adminMiddleware = require('../middlewares/adminMiddleware');
const apiKeyMiddleware = require('../middlewares/apiKeyMiddleware');
const router = express.Router();

router.post('/create', apiKeyMiddleware, authMiddleware, adminMiddleware, addTrain);
router.get('/availability', getTrainAvailability);
router.post('/:train_id/book', authMiddleware, bookSeat);

module.exports = router;
