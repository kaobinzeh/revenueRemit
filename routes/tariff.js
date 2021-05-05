const express = require('express');
const {getTariff, getTariffs, createTariff, updateTariff, deleteTariff} = require('../controllers/tariff');
const advancedResults = require('../middlewares/advanceResults');
const Tariff = require('../models/Tariff');

const paymentRouter = require('./payment');

const router = express.Router();

router.use('/:tariffId/payments', paymentRouter);

router
    .route('/')
    .get(advancedResults(Tariff, 'payment'), getTariffs)
    .post(createTariff);

router
    .route('/:id')
    .get(getTariff)
    .put(updateTariff)
    .delete(deleteTariff);

module.exports = router;