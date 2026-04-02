const express = require('express')
const feesHandler = require('../controller/FeesHandler')
const router = express.Router()



router.route('/markpaid/:id').put(feesHandler.markpaid)
router.route('/markunpaid/:id').put(feesHandler.Unpaid)

router.delete('/delete/:id/record', feesHandler.deleteFeeRecord);
router.get("/records/:id", feesHandler.getFeeRecords);



module.exports = router;