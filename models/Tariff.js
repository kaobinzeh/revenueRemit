const mongoose = require('mongoose');

const TariffSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: [true, 'Please add a tariff name']
    },
    description: { type: String },
    price: {
        type: Number,
        require: [true, 'Please enter price for tariff']
    },
    createdAt: {
    type: Date,
    default: Date.now
  }

});

TariffSchema.virtual('payments', {
    ref: 'Payment',
    localField: '_id',
    foreignField: 'tariff',
    justOne: false
});

module.exports = mongoose.model('Tariff', TariffSchema);