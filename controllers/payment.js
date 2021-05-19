const Payment = require('../models/Payment');
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utilities/errorResponse');
const Customer = require('../models/Customer');
const Tariff = require('../models/Tariff');


exports.getPayments = asyncHandler(async (req, res, next) => {
    res.status(200).json(res.advancedResults);
})

exports.getPayment = asyncHandler(async (req, res, next) => {
    const payment = await Payment.findById(req.params.Id);

    if(!payment){
        return next(
            new ErrorResponse(`Payment with id ${req.params.Id} not found`, 400)
        );
    }

    res.status(200).json({ success: true, data: payment});
})

exports.createPayment = asyncHandler(async (req, res, next) => {

    const customer = await Customer.findById(req.body.customerId);
    
    if(!customer){
        return next(
            new ErrorResponse(`No customer with the id of ${req.body.customerId}`), 404
        );
    }

    const tariff = await Tariff.findById(req.body.tariffId);

    if(!tariff){
        return next(
            new ErrorResponse(`No Tariff with the id of ${req.body.tariffId}`), 404
        );
    }

    // if (req.user.role !== 'admin') {
    //     return next(
    //     new ErrorResponse(
    //         `User ${req.user.id} is not authorized to add payment ${bootcamp._id}`,
    //         401
    //     ));
    // }

    req.body.customer = customer._Id;
    req.body.tariff = tariff._Id;
    req.body.amount = tariff.price;
    
    const payment = await Payment.create(req.body);

    res.status(200).json({
        success: true,
        data: payment
    });
})

exports.updatePayment = asyncHandler(async (req, res, next) => {
    let payment = await Payment.findById(req.params.id);

    if(!payment){
        return next(
          new ErrorResponse(`No customer with the id of ${req.params.id}`, 404)
        );
    }

     // if (req.user.role !== 'admin') {
    //     return next(
    //     new ErrorResponse(
    //         `User ${req.user.id} is not authorized to update payment`,
    //         401
    //     ));
    // }

    payment = await Payment.findByIdAndUpdate(req.params.id, req.    body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        success: true,
        data: course
    });
})

exports.deletePayment = asyncHandler(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id);

    if(!payment){
        return next(
          new ErrorResponse(`No customer with the id of ${req.params.id}`, 404)
        );
    }

    // if (req.user.role !== 'admin') {
    //     return next(
    //     new ErrorResponse(
    //         `User ${req.user.id} is not authorized to delete payment`,
    //         401
    //     ));
    // }

    payment.remove();

    res.status(200).json({
        success: true,
        data: {}
  });

});

