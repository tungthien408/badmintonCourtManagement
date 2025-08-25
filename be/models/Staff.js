const mongoose = require('mongoose');

const StaffSchema = new mongoose.Schema({
    humanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Human',
        required: true
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    }
});

module.exports = mongoose.model('Staff', StaffSchema);