const express = require('express');
const controller = require('../controllers/movieBooking');


const router = express.Router();

router
    .route('/ping')
    .get(controller.ping);

router
    .route('/createTheatre')
    .post(controller.createTheatre);

router
    .route('/createMovie')
    .post(controller.createMovie);

router
    .route('/getEmptySeats')
    .get(controller.getEmptySeats);

router
    .route('/bookSeat')
    .put(controller.bookASeat);

router
    .route('/bookMultipleSeats')
    .put(controller.bookMultipleSeats);

/*

router
    .route('/CreateJourney')
    .post(controller.CreateJourneyRecord);

router
    .route('/getSeatsData')
    .get(controller.getSeatsByJourneyAndBusId);

router
    .route('/createBusBooking')
    .post(controller.createBusBooking);*/

module.exports = router;