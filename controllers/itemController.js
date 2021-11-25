import Item from '../models/Item.js';

export const index = function(req, res) {
    res.render('index', { title: 'Supermarket Inventory Management System' });
};

export const itemCreateGET = function(req, res, next) {

};

export const itemCreatePOST = function(req, res, next) {

};

export const itemDeleteGET = function(req, res, next) {

};

export const itemDeletePOST = function(req, res, next) {

};

export const itemUpdateGET = function(req, res, next) {

};

export const itemUpdatePOST = function(req, res, next) {

};

export const itemDetail = async function(req, res, next) {
    // should show the item details + the specifics of the stock
    
    try{
        const resultsArr = await Promise.all([
            Item.findById(req.params.id).exec(),
            ItemInstance.find({ 'item': req.params.id }).exec(),
        ]);
        const results = { item: resultsArr[0], itemInstance: resultsArr[1] };
        if (results.item === null) {  //no results
            const err = new Error('Item not found');
            err.status = 404;
            return next(err);
        }
        res.render('itemDetail', { 
            title: results.item.name, 
            item: results.item,
            itemInstances: results.itemInstances,
        });
    } catch(err) {
        next(err)
    }
};

export const itemList = async function(req, res, next) {
    try {
        const listItems = await Item.find({}).sort([['name', 'ascending']]);
        // same as .sort({title : 1})
        res.render('itemList', { title: 'Product Catalog', itemList: listItems });
    } catch(err) {
        next(err);
    };
};

export const bakery = function(req, res, next) {

};

export const bakingGoods = function(req, res, next) {

};

export const beverages = function(req, res, next) {

};

export const beerWine = function(req, res, next) {

};

export const canned = function(req, res, next) {

};

export const cleaning = function(req, res, next) {

};

export const dairy = function(req, res, next) {

};

export const deliPreparedFoods = function(req, res, next) {

};

export const floral = function(req, res, next) {

};

export const frontEnd = function(req, res, next) {

};

export const frozen = function(req, res, next) {

};

export const healthBeauty = function(req, res, next) {

};

export const meatSeafood = function(req, res, next) {

};

export const paper = function(req, res, next) {

};

export const produce = function(req, res, next) {

};
