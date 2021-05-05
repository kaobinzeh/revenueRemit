const express = require('express');
const {getPayment, getPayments, createPayment, updatePayment, deletePayment} = require('../controllers/payment');
const advancedResults = require('../middlewares/advanceResults');
const Payment = require('../models/Payment');

const router = express.Router({mergeParams: true});

router
    .route('/')
    .get(advancedResults(Payment,{ path: 'customer tariff'}),getPayments)
    .post(createPayment);

router
    .route('/:id')
    .get(getPayment)
    .put(updatePayment)
    .delete(deletePayment);

module.exports = router;
