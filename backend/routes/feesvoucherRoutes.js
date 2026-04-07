const express = require("express");
const router = express.Router();
const fees = require("../controller/feesvocher");


router.route("/voucher/all").get(fees.generateAllVouchers);
router.route("/voucher/:id").get( fees.generateSingleVoucher);
router.route("/voucher/month/:id").post( fees.generateVouchersByMonthYear);

module.exports = router;