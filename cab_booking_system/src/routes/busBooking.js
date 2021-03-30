const express = require('express');
const controller = require('../controllers/busBooking');


const router = express.Router();

router
    .route('/ping')
    .get(controller.ping);

router
    .route('/createBus')
    .post(controller.createBus);

router
    .route('/CreateJourney')
    .post(controller.CreateJourneyRecord);

router
    .route('/getSeatsData')
    .get(controller.getSeatsByJourneyAndBusId);

router
    .route('/createBusBooking')
    .post(controller.createBusBooking);

/*router


router
    .route('/createExpense')
    .post(controller.createExpense);

router
    .route('/getExpenseById')
    .get(controller.getExpenseById);

router
    .route('/settleExpenseByUser')
    .post(controller.settleExpenseByUser);*/


/*router.route('/onboard_cab').post(controller.onBoardCab);
router.route('/fetch_cabs').get(controller.fetchCabs);
router.route('/allocate_cab').post(controller.allocateCab);
router.route('/deport_cab').post(controller.deportCab);*/

module.exports = router;