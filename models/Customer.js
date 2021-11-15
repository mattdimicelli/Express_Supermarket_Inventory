const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    firstName: {
        type: String,
        required: [true, 'Must fill in first name'],
        minLength: [1, 'First name must be at least one character long'],
        trim: true,
        set: n => n[0].toUpperCase() + n.slice(1),
    },
    lastName: {
        type: String,
        required: [true, 'Must fill in last name'],
        trim: true,
        minLength: [1, 'Last name must be at least one character long'],
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
        minLength: [1, 'Email must be at least one character long'],
    },
    address: {
        type: String,
        trim: true,
        minLength: [1, 'Address must be at least one character long'],
    },
});

CustomerSchema.virtual('url').get(function(){
    return '/customers/' + this._id;
});

module.exports = mongoose.model('Customer', CustomerSchema);