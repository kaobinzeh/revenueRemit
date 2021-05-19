const ErrorResponse = require('../utilities/errorResponse');
const asyncHandler = require('../middlewares/async');
const User = require('../models/User');


exports.Register = asyncHandler(async (req, res, next) => {
    const {name,email, role, password} = req.body;

    const user = await User.create({name, email, role, password});

    sendTokenResponse(user, 200, res);
});

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if(!email || !password){
        return next(new ErrorResponse('Please Provide an email and password', 400));        
    }

    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorResponse('Invalid credentials', 401));
    }

    const isMatch = await user.matchPassword(password);    
    if(!isMatch){
        return next(new ErrorResponse("Invalid credentials", 401));
    }

    sendTokenResponse(user, 200, res);
});

exports.forgotPassword = asyncHandler(async (req, res, next) => {
    const user =  await User.findOne({ email: req.body.email});

    if(!user){
        return next(new ErrorResponse(`No User with email address ${req.body.email}`, 404));
    }

    const resetToken = user.getResetPasswordToken();

    await user.save();

    res.status(200).json({success: true, data: user})

});

const sendTokenResponse = (user, statusCode, res) => {   

    console.log(user);
    const token = user.getSignedJwtToken()

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000 ),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    res.status(statusCode)
        .cookie('token', token, options)
        .json({
            success: true,
            token
        });
}

