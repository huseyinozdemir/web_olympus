import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    name: {
        type: String,
        required: [true, "Required name field!"],
    },
    surname: {
        type: String,
        required: [true, "Required surname field!"],
    },
    email: {
        type: String,
        required: [true, "Required email field!"],
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
        default: "",
    },
})

export default mongoose.model('Contact', ContactSchema);