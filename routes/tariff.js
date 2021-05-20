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
const {protect, authorize} = require('../middlewares/auth');
const paymentRouter = require('./payment');

const router = express.Router();

router.use("/:tariffId/payments", paymentRouter);

router
  .route("/")
  .get(advancedResults(Tariff), getTariffs)
  .post(protect, authorize("admin", "revenue officer"), createTariff);
  
  router.route("/search").get(searchTariff);

router
  .route("/:id")
  .get(getTariff)
  .put(protect, authorize("admin", "revenue officer"), updateTariff)
  .delete(protect, authorize("admin", "revenue officer"), deleteTariff);

module.exports = router;