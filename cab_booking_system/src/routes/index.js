const express = require('express');
const router = express.Router();
const splitPay = require('./splitPay');
const busBooking = require('./busBooking');
const movieBooking = require('./movieBooking');

router.use('/project',splitPay);
router.use('/busBooking',busBooking);
router.use('/movieBooking',movieBooking);

module.exports = router;