const Tariff = require('../models/Tariff');
const ErrorResponse = require('../middlewares/error');
const asyncHandler = require('../middlewares/async');

exports.getTariffs = asyncHandler( async(req, res, next) => {
    res.status(200).json(res.advanceResults);
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
   
    if(req.user.role !== 'admin'){
        return next(
            new ErrorResponse(
            `The user with ID ${req.user.id} is not authorized to add customer`, 401
        ));
    }
   
    const tariff = await Tariff.Create(req.body);

    res.status(201).json({
        success: true,
        data: tariff
    });
});

exports.updateTariff = asyncHandler(async (req, res, next) => {
    let tariff = await Tariff.findById(req.params.Id);

    if(!tariff){
        return next( new ErrorResponse(`Tariff with Id ${req.params,Id} not found`, 404));
    }

    if(req.user.role !== 'admin'){
        return next(
            new ErrorResponse(
            `The user with ID ${req.user.id} is not authorized to add customer`, 401
        ));
    }

    tariff = await Tariff.findOneAndUpdate(req.params.id, req.body, {
        new: true,
    runValidators: true
    })

    res.status(200).json({ success: true, data: tariff });

});

exports.deleteTariff = asyncHandler(async (req, res, next) => {

    const tariff = await Tariff.findById(req.params.Id);

    if(!tariff){
        return next( new ErrorResponse(`Tariff with Id ${req.params,Id} not found`, 404));
    }

    if(req.user.role !== 'admin'){
        return next(
            new ErrorResponse(
            `The user with ID ${req.user.id} is not authorized to add customer`, 401
        ));
    }
   
    tariff.remove();

    res.status(200).json({ success: true, data: {}});

});



 