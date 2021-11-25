import mongoose from 'mongoose';
import ItemInstance from './ItemInstance.js';

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        set: n => n[0].toUpperCase() + n.slice(1) 
    },
    department: {
        type: String,
        required: true,
        enum: [
            'Produce', 'Meat and Seafood', 'Beer and Wine', 'Health and Beauty',
            'Deli/Prepared Foods', 'Front End', 'Floral', 'Cafe', 'Bakery',
            'Frozen', 'Dairy', 'Beverages', 'Canned/Jarred Goods', 'Baking Goods',
            'Cleaning', 'Paper Goods'
        ],
    },     
    description: {
        type: String,
        trim: true,
    },
    pricePerUnit: {
        type: Number,
        match: [/^\d+(.\d{1,2})?$/, 'Must be in following format: 1.12, without dollar sign']
    }, 
    pricePerPound: {
        type: Number,
        match: [/^\d+(.\d{1,2})?$/, 'Must be in following format: 1.12, without dollar sign']
    },
    brand: {
        type: String,
        trim: true, minLength: 1,
        set: n => n[0].toUpperCase() + n.slice(1),
    },
});

// Virtual for item's URL
ItemSchema.virtual('url').get(function() {
    return '/inventory/item' + this._id;
});

// Virtual for inventory of the item in question
ItemSchema.virtual('stock', {
    ref: 'ItemInstance',
    localField: '_id',
    foreignField: 'item',
});

// Virtual for number the number of the item instanes "in stock" (eg. available to be sold)
// This is the virtual that I'm having trouble writing
ItemSchema.virtual('numberAvailable', {
    ref: 'ItemInstance',
    localField: '_id',
    foreignField: 'item',
    options: {
        match: {
            status: 'Available',
        },
    },
    count: true,
});

ItemSchema.virtual('departmentURL').get(function() {
    let ending;
    switch(this.department) {
        case 'Meat and Seafood':
            ending = 'meat-seafood';
            break;
        case 'Beer and Wine':
            ending = 'beer-wine';
            break;
        case 'Health and Beauty':
            ending = 'health-beauty';
            break;
        case 'Deli/Prepared Foods':
            ending = 'deli-prepared-foods';
            break;
        case 'Front End':
            ending = 'front-end';
            break;
        case 'Canned/Jarred Goods':
            ending = 'canned';
            break;
        case 'Baking Goods':
            ending = 'baking';
            break;
        case 'Paper Goods':
            ending = 'paper';
            break;
        default: 
            ending = this.department.toLowerCase();
            break;
    }
    return '/inventory/' + ending;
});


export default mongoose.model('Item', ItemSchema);

