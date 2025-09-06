import mongoose from "mongoose";
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

export default mongoose.model('Voucher', VoucherSchema);
