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
    .route('/CreateHall')
    .post(controller.CreateHall);

router
    .route('/CreateShow')
    .post(controller.CreateShow);

router
    .route('/CreateSeats')
    .post(controller.CreateSeats);

router
    .route('/CreateTicket')
    .post(controller.CreateTicket);

router
    .route('/GetOccupiedSeat')
    .get(controller.GetOccupiedSeat);

router
    .route('/GetEmptySeat')
    .get(controller.GetEmptySeat);

module.exports = router;