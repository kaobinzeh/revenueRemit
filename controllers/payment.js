const Payment = require('../models/Payment');
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utilities/errorResponse');
const Customer = require('../models/Customer');
const Tariff = require('../models/Tariff');
const { request } = require('express');


exports.getPayments = asyncHandler(async (req, res, next) => {

    if(req.baseUrl.split('/')[3] === 'customer'){
        const payment = await Payment.find({
          customer: req.params.customerId,
        }).populate({
          path: "tariff",
          select: "name description price",
        });;

        res.status(200).json({
            success: true,
            count: payment.length,
            data: payment
        })
    }

    if (req.baseUrl.split("/")[3] === "tariff") {
        const payment = await Payment.find({
        tariff: req.params.tariffId,
        }).populate({
            path: "customer",
            select: "name phone email"
        });

        res.status(200).json({
        success: true,
        count: payment.length,
        data: payment,
        });
    }

    res.status(200).json(res.advancedResults);
})

exports.getPayment = asyncHandler(async (req, res, next) => {
    const payment = await Payment.findById(req.params.id);

    if(!payment){
        return next(
            new ErrorResponse(`Payment with id ${req.params.id} not found`, 400)
        );
    }

    res.status(200).json({ success: true, data: payment});
})

exports.createPayment = asyncHandler(async (req, res, next) => {

    if(!req.body.customerId){
        return next( new ErrorResponse('No customer Id provided',400));
    }

    const customer = await Customer.findById(req.body.customerId);
    
    if(!customer){
        return next(
            new ErrorResponse(`No customer with the id of ${req.body.customerId}`), 404
        );
    }   

    if (!req.body.tariffId) {
       return next(new ErrorResponse("No Tariff Id provided", 400));
    }

    const tariff = await Tariff.findById(req.body.tariffId);

    if(!tariff){
        return next(
          new ErrorResponse(`No Tariff with the id of ${req.body.tariffId}`),
          404
        );
    }

    req.body.customer = customer._id;
    req.body.tariff = tariff._id;
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

