const asyncHandler = require('../middlewares/async');
const ErrorResponse = require('../middlewares/error');
const User = require('../models/User');

exports.getUsers = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

exports.getUser = asyncHandler(async (req, res, next) => {
    
    const user = await User.findOne(req.param.id);

    if(!user){
        return next( new ErrorResponse(`User with Id ${req.param.id} was not found`, 404))
    }

    res.status(200).json({ success:true, data:user});
})

exports.updateUser = asyncHandler(async(req, res, next) => {
 
    const user = await User.findOne(req.param.id);

    if (!user) {
        return next(
            new ErrorResponse(`User with Id ${req.param.id} was not found`, 404)
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

    user =  await User.findOneAndUpdate(req.param.id, req.body,{ new : true,
        runValidators : true
     })
})

exports.deleteUser = asyncHandler(async (req, res, next) => {
      
    const user = await User.findOne(req.param.id);

    if (!user) {
      return next(
        new ErrorResponse(`User with Id ${req.param.id} was not found`, 404)
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

    user.remove();
})