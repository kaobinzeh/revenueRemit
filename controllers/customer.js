const Customer = require('../models/Customer');
const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../utilities/errorResponse');

//Get all customer 
exports.getCustomers = asyncHandler( async(req, res, next) => {
    const constion = {"isActive":true};

    res.status(200).json(res.advancedResults);
});


//get customer by Id
exports.getCustomer = asyncHandler(async (req, res, next) => {
    
    var customer = await Customer.findById(req.params.id);

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

        const result = await Customer.create(customer);

        res.status(200).json({
            success: true, data: result
        })

    } catch (error) {
        
    } 
})

//update a customer
exports.updateCustomer = asyncHandler( async(req, res, next) => {
    let customer = await Customer.findById(req.params.id);

    if(!customer){
        return next(
            new ErrorResponse(`Customer with id of ${req.params.id} not found`, 400)
        );
    }

    customer = await Customer.findOneAndUpdate({ _id : req.params.id}, req.body, {
        new: true,
    runValidators: true
    })

    res.status(200).json({ success: true, data: customer });
})

//delete a customer
exports.deleteCustomer = asyncHandler( async (req, res, next) => {
    var customer = await Customer.findById(req.params.id);

    if(!customer){
        return next(new ErrorResponse(`Customer with id of ${req.params.id} not found`, 400));
    }

    customer.isActive = false;
    var result = await Customer.findOneAndUpdate(req.params.id, {"isActive": false}, {new: true, runValidators: true});

    res.status(200).json({success: true, data: {}});
   
})

exports.searchCustomer = asyncHandler(async (req, res, next) => {
    const searchParam = req.query.searchParam;
    
    if(!searchParam){
        return next(new ErrorResponse('Search param cannot be empty', 400));
    }
    
    var customer = await Customer.find({
      name: { $regex: searchParam, $options: "i" },
    }).select("_id name phone email");

    if(!customer){
        return next(
            new ErrorResponse(
            `Customer not found`,
            404
            )
        );
    }

    res.status(200).json({success: true, data: customer});
})

exports.uploadRecords = asyncHandler(async (req, res, next) => {
    

})