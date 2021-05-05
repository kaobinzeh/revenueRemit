const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: [true, 'Enter Customer Name'],
        unique: false        
    },
    phone: {
        type: String,
        required: [true, 'Enter your phone number'],
        maxlength: [15, 'Phone Number cannot be longer than 18 characters']
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please a valid email']
    },
    isActive:{
        type: Boolean,
        default: true
    },
    CreatedAt:{
        type:Date,
        default: Date.now
    },
    CreatedBy:{String}
});

CustomerSchema.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'customer',
    justOne: false
});

module.exports = mongoose.model('Customer', CustomerSchema);