import mongoose from "mongoose";
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

export default mongoose.model('Account', AccountSchema);
