const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: /^0(2|3|5|7|8|9)[0-9]{8}$/
    },
    address: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Branch', BranchSchema);