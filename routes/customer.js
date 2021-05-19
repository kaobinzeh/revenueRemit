const express = require('express');
const {
  getCustomers,
  addCustomer,
  getCustomer,
  deleteCustomer,
  updateCustomer,
  searchCustomer,
} = require("../controllers/customer");
const Customer = require('../models/Customer');
const advanceResults = require('../middlewares/advanceResults');

const paymentRouter = require('./payment')
const {protect, authorize} = require('../middlewares/auth')
const router = express.Router();

router.use('/:customerId/payments', paymentRouter);

router
    .route('/')
    .get(advanceResults(Customer, {select: 'name phone email', isActive: true }, getCustomers))
    .post(protect, authorize('admin', 'revenue officer'),  addCustomer);
    
router
  .route("/:id")
  .get(getCustomer)
  .put(protect, authorize("admin", "revenue officer"), updateCustomer)
  .delete(protect, authorize("admin", "revenue officer"), deleteCustomer);

router.route("/search").post(searchCustomer);

module.exports = router;