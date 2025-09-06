
import mongoose from "mongoose";
const CourtSchema = new mongoose.Schema({
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
  name: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
});

export default mongoose.model('Court', CourtSchema);
