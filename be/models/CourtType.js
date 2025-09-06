import mongoose from "mongoose";
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

export default mongoose.model('CourtType', CourtTypeSchema);
