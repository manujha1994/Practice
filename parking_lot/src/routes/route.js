const express = require('express');
const controller = require('../controllers/controller');

const router = express.Router();

router
    .route('/ping')
    .get(controller.ping);

router
    .route('/CreateParking')
    .post(controller.CreateParking);

router
    .route('/FindEmptySlot')
    .get(controller.FindEmptySlot);

router
    .route('/FindOccupiedSlot')
    .get(controller.FindOccupiedSlot);

router
    .route('/BookASlot')
    .put(controller.BookASlot);

router
    .route('/UnParkVehicle')
    .put(controller.UnParkVehicle);

module.exports = router;