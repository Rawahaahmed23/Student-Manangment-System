const express = require('express')
const feesHandler = require('../controller/FeesHandler')
const router = express.Router()



router.route('/markpaid/:id').post(feesHandler.markpaid)
router.route('/markUnpaid/:id').post(feesHandler.Unpaid)



module.exports = router