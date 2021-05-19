const express = require('express');
const {
  getTariff,
  getTariffs,
  createTariff,
  updateTariff,
  deleteTariff,
  searchTariff,
} = require("../controllers/tariff");
const advancedResults = require('../middlewares/advanceResults');
const Tariff = require('../models/Tariff');

const paymentRouter = require('./payment');
const {protect, authorize} = require('../middlewares/auth');
const router = express.Router();

router.use('/:tariffId/payments', paymentRouter);

router
  .route("/")
  .get(advancedResults(Tariff, "payment"), getTariffs)
  .post(protect, authorize("admin", "revenue officer"), createTariff);

router
  .route("/:id")
  .get(getTariff)
  .put(protect, authorize("admin", "revenue officer"), updateTariff)
  .delete(protect, authorize("admin", "revenue officer"), deleteTariff);

router.route("/search").post(searchTariff);

module.exports = router;