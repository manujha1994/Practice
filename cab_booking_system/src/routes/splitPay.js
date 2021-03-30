const express = require('express');
const controller = require('../controllers/splitPay');


const router = express.Router();

router
    .route('/ping')
    .get(controller.ping);

router
    .route('/createUser')
    .post(controller.createUser);

router
    .route('/createExpense')
    .post(controller.createExpense);

router
    .route('/getExpenseById')
    .get(controller.getExpenseById);

router
    .route('/settleExpenseByUser')
    .post(controller.settleExpenseByUser);

module.exports = router;