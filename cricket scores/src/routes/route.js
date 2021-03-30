const express = require('express');
const controller = require('../controllers/controller');


const router = express.Router();

router
    .route('/ping')
    .get(controller.ping);

router
    .route('/CreatePlayer')
    .post(controller.CreatePlayer);

router
    .route('/CreateTeams')
    .post(controller.CreateTeams);

router
    .route('/CreateMatch')
    .post(controller.CreateMatch);

router
    .route('/UpdateScore')
    .put(controller.UpdateScore);

module.exports = router;