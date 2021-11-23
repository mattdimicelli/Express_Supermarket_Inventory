import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Must fill in first name'],
        trim: true,
        set: n => n[0].toUpperCase() + n.slice(1),
    },
    lastName: {
        type: String,
        required: [true, 'Must fill in last name'],
        trim: true,
        set: n => n[0].toUpperCase() + n.slice(1),
    },
    telephone: {
        type: String,
        required: [true, 'Must provide phone number'],
        match: [/^[2-9]\d{2}-\d{3}-\d{4}$/, 'Must be in following format: 555-555-5555'],
    },
    email: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        trim: true,
    },
});

CustomerSchema.virtual('url').get(function(){
    return '/customers/' + this._id;
});

export default mongoose.model('Customer', CustomerSchema);