const mongoose = require('mongoose');

const VoucherSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    percentage: {
        type: Number,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    description: String
});

module.exports = mongoose.model('Voucher', VoucherSchema);