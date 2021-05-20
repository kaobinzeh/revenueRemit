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
const {protect, authorize} = require('../middlewares/auth');
const paymentRouter = require("./payment");

const router = express.Router();

router.use("/:customerId/payments", paymentRouter);

router
    .route('/')
    .get(advanceResults(Customer), getCustomers)
    .post(protect, authorize('admin', 'revenue officer'),  addCustomer);
    

router.route("/search").get(searchCustomer);

router
  .route("/:id")
  .get(getCustomer)
  .put(protect, authorize("admin", "revenue officer"), updateCustomer)
  .delete(protect, authorize("admin", "revenue officer"), deleteCustomer);


module.exports = router;