const express = require('express');
const controller = require('../controllers/controller');
const validation = require('../validations/validations');
const validate = require('express-validation');


const router = express.Router();

router
    .route('/ping')
    .get(controller.ping);

router
    .route('/CreatePlayer')
    .post(controller.CreatePlayer);

router
    .route('/CreateTeam')
    .post(controller.CreateTeam);

router
    .route('/CreatePlayerTeamMapping')
    .post(controller.CreatePlayerTeamMapping);

router
    .route('/CreateMatch')
    .post(controller.CreateMatch);

router
    .route('/UpdateScore')
    .put(validate(validation.UpdateScore),controller.UpdateScore);

router
    .route('/GetCurrentScore')
    .get(controller.GetCurrentScore);

router
    .route('/GetPlayerStat')
    .get(controller.GetPlayerStat);

router
    .route('/GetNewsApiDetails')
    .get(controller.GetNewsApiDetails);

module.exports = router;