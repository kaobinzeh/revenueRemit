const Tariff = require("../models/Tariff");
const ErrorResponse = require("../utilities/errorResponse");
const asyncHandler = require("../middlewares/async");

exports.getTariffs = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getTariff = asyncHandler(async (req, res, next) => {
  const tariff = await Tariff.findById(req.params.id);

  if (!tariff) {
    return next(
      new ErrorResponse(`Tariff not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({ success: true, data: tariff });
});

exports.createTariff = asyncHandler(async (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return next(
        new ErrorResponse(
          `The user with ID ${req.user.id} is not authorized to add customer`,
          401
        )
      );
    }

    const tariff = await Tariff.create(req.body);

    res.status(201).json({
      success: true,
      data: tariff,
    });
  } catch (err) {
    return next(new ErrorResponse(err.message, 500));
  }
});

exports.updateTariff = asyncHandler(async (req, res, next) => {
  let tariff = await Tariff.findById(req.params.id);

  if (!tariff) {
    return next(
      new ErrorResponse(`Tariff with Id ${req.params.id} not found`, 404)
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} is not authorized to add customer`,
        401
      )
    );
  }

  tariff = await Tariff.findOneAndUpdate({ _id: req.params.id}, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, data: tariff });
});

exports.deleteTariff = asyncHandler(async (req, res, next) => {
  const tariff = await Tariff.findById(req.params.id);

  if (!tariff) {
    return next(
      new ErrorResponse(`Tariff with Id ${(req.params, id)} not found`, 404)
    );
  }

  if (req.user.role !== "admin") {
    return next(
      new ErrorResponse(
        `The user with ID ${req.user.id} is not authorized to add customer`,
        401
      )
    );
  }

  tariff.remove();

  res.status(200).json({ success: true, data: {} });
});

exports.searchTariff = asyncHandler(async (req, res, next) => {
  const searchParam = req.query.searchParam;

  if (!searchParam) {
    return next(new ErrorResponse("Search param cannot be empty", 400));
  }

  var tariff = await Tariff.find({
    name: { $regex: searchParam, $options: "i" },
  }).select("_id name price");
  if (!tariff) {
    return next(new ErrorResponse(`tariff not found`, 404));
  }

  res.status(200).json({ success: true, data: tariff });
});
