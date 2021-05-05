const express = require('express');
const {getCustomers, addCustomer, getCustomer, deleteCustomer, updateCustomer} = require('../controllers/customer');
const Customer = require('../models/Customer');
const advanceResults = require('../middlewares/advanceResults');

const paymentRouter = require('./payment')

const router = express.Router();

router.use('/:customerId/payments', paymentRouter);

router
    .route('/')
    .get(advanceResults(Customer, {select: 'name phone email', isActive: true }, getCustomers))
    .post(addCustomer);
    
router
    .route('/:id')
    .get(getCustomer)
    .put(updateCustomer)
    .delete(deleteCustomer);

module.exports = router;