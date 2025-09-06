import mongoose from 'mongoose';

const HumanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
        match: /^0(2|3|5|7|8|9)[0-9]{8}$/,
        unique: true
    },
    email: {
        type: String,
        required: false,
        match: /.+\@.+\..+/,
        unique: true,
        sparse: true
    }
});

const Human = mongoose.model('Human', HumanSchema);

export default Human;
