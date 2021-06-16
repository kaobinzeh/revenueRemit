const express = require('express');
const {getPayment, getPayments, createPayment, updatePayment, deletePayment} = require('../controllers/payment');
const advancedResults = require('../middlewares/advanceResults');
const Payment = require('../models/Payment');

const router = express.Router({ mergeParams: true });

const {protect, authorize} = require('../middlewares/auth')

router
  .route("/")
  .get(advancedResults(Payment, { path: "customer tariff" }), getPayments)
  .post(protect, authorize("admin", "revenue officer"), createPayment);

router
  .route("/:id")
  .get(getPayment)
  .put(protect, authorize("admin", "revenue officer"), updatePayment)
  .delete(protect, authorize("admin", "revenue officer"), deletePayment);

router
  .route("/year/:id")
  .get(advancedResults(Payment, { path: "customer tariff" }), getPayments);
  
module.exports = router;
