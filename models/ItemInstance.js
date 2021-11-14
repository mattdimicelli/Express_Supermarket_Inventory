const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
    expiration: {type: Date},
    status: {type: String, enum: ['In Stock', 'Damaged', 'Sold', 'Reserved'], required: true},
    client: {type: Schema.Types.ObjectId, ref: 'Client'},
    dateOfSale: {type: Date},
});

ItemInstanceSchema.virtual('url').get(function() {
    return '/inventory/iteminstance/' + this._id;
});

module.exports = mongoose.model('ItemInstance', ItemInstanceSchema);