import mongoose from "mongoose";
const BookingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: true
    },
    courtId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Court',
        required: true
    },
    staffId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Human',
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'success', 'canceled'],
        default: 'pending'
    },
    bookingTime: {
        type: Date,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    }
});

export default mongoose.model('Booking', BookingSchema);
