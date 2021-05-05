const Customer = require('../models/Customer');
const asyncHandler = require('../middlewares/async');
var mongoose = require('mongoose');
const ErrorResponse = require('../utilities/errorResponse');

//Get all customer 
exports.getCustomers = asyncHandler( async(req, res, next) => {
    const constion = {"isActive":true};

    res.status(200).json(res.advanceResults)
});


//get customer by Id
exports.getCustomer = asyncHandler(async (req, res, next) => {
    
    var customer = await Customer.findById(req.params.Id);

    if(!customer){
        return next(
             new ErrorResponse(`Customer not found with id of ${req.params.id}`, 404) 
        );
    }

    res.status(200).json({success: true, data: customer});
})

//search for customer


//create or add a new customer
exports.addCustomer = asyncHandler(async (req, res, next) => {
    var customer = req.body;

    try {

        // if(req.user.role !== 'admin'){
        //      return next(
        //         new ErrorResponse(
        //             `The user with ID ${req.user.id} is not authorized to add customer`, 401
        //     ));
        // }

        const result = await Customer.create(customer);

        res.status(200).json({
            success: true, data: result
        })

    } catch (error) {
        
    } 
})

//update a customer
exports.updateCustomer = asyncHandler( async(req, res, next) => {
    let customer = await Customer.findById(req.params.Id);

    if(!customer){
        return next(
            new ErrorResponse(`Customer with id of ${req.params.Id} not found`, 400)
        );
    }

    if(req.user.role !== 'admin'){
        return next(
             new ErrorResponse(`User ${req.params.id} is not authorized to update customer`, 401)
        )
    }

    customer = await Customer.findOneAndUpdate(req.params.Id, req.body, {
        new: true,
    runValidators: true
    })
})

//delete a customer
exports.deleteCustomer = asyncHandler( async (req, res, next) => {
    var customer = await Customer.findById(req.params.Id);

    if(!customer){
        return next(new ErrorResponse(`Customer with id of ${req.params.Id} not found`, 400));
    }

    customer.isActive = false;
    var result = await Customer.findOneAndUpdate(req.params.Id, {"isActive": false}, {new: true, runValidators: true});

    res.status(200).json({success: true, data: {}});
   
})