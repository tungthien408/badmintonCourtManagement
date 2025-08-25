const mongoose = require('mongoose');

const CourtTypeSchema = new mongoose.Schema({
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    name: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('CourtType', CourtTypeSchema);