const mongoose = require('mongoose');
// import mongoose from 'mongoose';

const PriceListSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    courtTypeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CourtType',
        required: false
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Number,
        enum: [1, 2, 3, 4, 5, 6, 7],
        required: true
    },
    startTime: {
        type: Number,
        required: true,
        min: 0,
        max: 23,
    },
    endTime: {
        type: Number,
        required: true,
        min: 1,
        max: 24,
    },
    status: {
        type: Boolean,
        default: true,
        required: true
    }
});

module.exports = mongoose.model('PriceList', PriceListSchema);