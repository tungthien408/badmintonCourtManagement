const mongoose = require('mongoose');

const PriceListSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    courtTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourtType',
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7],
        required: true
    }
});

module.exports = mongoose.model('PriceList', PriceListSchema);