const mongoose = require('mongoose');


const PaymentSchema = new mongoose.Schema({

    name: String,
    amount:{
        type: Number,
        required: [true, 'Please enter tariff price']
    },
    address: {
        type: String,
        required: [true, 'Please enter Address of shop/space you are paying for']
    },
    year: {
        type: Number,
        required: [true, 'Please Enter the year, you wish to pay for']    
    },
    createdAt: {
    type: Date,
    default: Date.now
    },
    customer: {
        type: mongoose.Schema.ObjectId,
        ref: 'Customer',
        required: true
    },
    tariff: {
        type: mongoose.Schema.ObjectId,
        ref: 'Tariff',
        require: true
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);