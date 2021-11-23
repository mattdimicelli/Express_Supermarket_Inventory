import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ItemInstanceSchema = new Schema({
    item: {
        type: Schema.Types.ObjectId,
        ref: 'Item',
        required: [true, 'Must select an item'],
    },
    expiration: {
        type: Date,
    },
    status: {
        type: String,
        enum: ['Available', 'Damaged', 'Sold and Reserved'],
        required: [true, 'Must select a status']
    },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer'
    },
    dateOfSale: {
        type: Date,
    },
});

ItemInstanceSchema.virtual('url').get(function() {
    return '/inventory/iteminstance/' + this._id;
});

export default mongoose.model('ItemInstance', ItemInstanceSchema);