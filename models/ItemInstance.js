const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'Must select an item'],
    },
    expiration: {
        type: Date,
        min: [Date.now(), 'Expiration date cannot be prior to today']
    },
    status: {
        type: String,
        enum: ['In Stock', 'Damaged', 'Sold', 'Reserved'],
        required: [true, 'Must select a status']
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    dateOfSale: {
        type: Date,
        min: [Date.now(), 'Expiration date cannot be prior to today']
    },
});

ItemInstanceSchema.virtual('url').get(function() {
    return '/inventory/iteminstance/' + this._id;
});

module.exports = mongoose.model('ItemInstance', ItemInstanceSchema);