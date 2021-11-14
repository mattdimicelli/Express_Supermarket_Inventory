const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true,  }, //must be 1 category
    description: String,
    pricePerUnit: Number,
    pricePerPound: Number,
    brand: String,
    stock: [{type: Schema.Types.ObjectId, ref: 'ItemInstance'}],
});

// Virtual for item's URL
ItemSchema.virtual('url').get(function() {
    return '/inventory/item' + this._id;
});

// Virtual for number the item "in stock"


