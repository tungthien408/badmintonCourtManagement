const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true
    },
    voucherId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Voucher',
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ['deposit', 'cash', 'bank'],
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'successful', 'cancelled'],
        default: 'pending'
    },
    timePayment: {
        type: Date,
        required: true
    },
    amountPaid: {
        type: Number,
        required: true
    },
    remain: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Payment', PaymentSchema);