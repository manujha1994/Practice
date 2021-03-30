const express = require('express');
const controller = require('../controllers/controller');


const router = express.Router();

router
    .route('/ping')
    .get(controller.ping);

router
    .route('/CreateUser')
    .post(controller.CreateUser);
router
    .route('/CreateFlight')
    .post(controller.CreateFlight);
router
    .route('/CreateJourney')
    .post(controller.CreateJourney);
router
    .route('/GetAvailableSeats')
    .get(controller.GetAvailableSeats);

router
    .route('/BookASeat')
    .post(controller.BookASeat);

router
    .route('/BookMultipleSeat')
    .post(controller.BookMultipleSeat);

router
    .route('/GetBookingDetails')
    .get(controller.GetBookingDetails);

module.exports = router;