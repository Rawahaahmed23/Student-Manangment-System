const express = require("express");
const router = express.Router();
const fees = require("../controller/feesvocher");


router.route("/voucher/all").get(fees.generateAllVouchers);
router.route("/voucher/:id").get( fees.generateSingleVoucher);

module.exports = router;