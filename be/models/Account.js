const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
    humanId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Human',
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['owner', 'staff', 'customer'],
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Account', AccountSchema);