import express from 'express';
const router = express.Router();

// Require Controller Modules
import * as itemController from '../controllers/itemController.js';
import * as itemInstanceController from '../controllers/itemInstanceController.js';

// ITEM ROUTES
// GET Inventory Home Page
router.get('/', itemController.index);

// GET request to CREATE an item
router.get('/item/create', itemController.itemCreateGET);

// POST request to CREATE an item
router.post('/item/create', itemController.itemCreatePOST);

// GET request to DELETE an item
router.get('/item/:id/delete', itemController.itemDeleteGET);

// POST request to DELETE an item 
router.post('/item/:id/delete', itemController.itemDeletePOST);

// GET request to UPDATE an item 
router.get('/item/:id/update', itemController.itemUpdateGET);

// POST request to UPDATE an item 
router.get('/item/:id/update', itemController.itemUpdatePOST);

// GET request for one item (READ)
router.get('/item/:id', itemController.itemDetail);

// GET request for a list of all items (READ)
router.get('/items', itemController.itemList);

// GET requests for a list of items per department
router.get('/bakery', itemController.bakery);
router.get('/baking', itemController.bakingGoods);
router.get('/beverages', itemController.beverages);
router.get('/beer-wine', itemController.beerWine);
router.get('/canned', itemController.canned);
router.get('/cleaning', itemController.cleaning);
router.get('/dairy', itemController.dairy);
router.get('/deli-prepared-foods', itemController.deliPreparedFoods);
router.get('/floral', itemController.floral);
router.get('/front-end', itemController.frontEnd);
router.get('/frozen', itemController.frozen);
router.get('/health-beauty', itemController.healthBeauty);
router.get('/meat-seafood', itemController.meatSeafood);
router.get('/paper', itemController.paper);
router.get('/produce', itemController.produce);

// ITEM INSTANCE ROUTES

// GET request to CREATE an item instance
router.get('/item-instance/create', itemInstanceController.itemInstanceCreateGET);

// POST request to CREATE an item instance
router.post('/item-instance/create', itemInstanceController.itemInstanceCreatePOST);

// GET request to DELETE an item instance
router.get('/item-instance/:id/delete', itemInstanceController.itemInstanceDeleteGET);

// POST request to DELETE an item instance 
router.post('/item-instance/:id/delete', itemInstanceController.itemInstanceDeletePOST);

// GET request to UPDATE an item instance 
router.get('/item-instance/:id/update', itemInstanceController.itemInstanceUpdateGET);

// POST request to UPDATE an item instance 
router.get('/item-instance/:id/update', itemInstanceController.itemInstanceUpdatePOST);

// GET request for one item instance (READ)
router.get('/item-instance/:id', itemInstanceController.itemInstanceDetail);

// GET request for a list of all item instances (READ)
router.get('/item-instance', itemInstanceController.itemInstanceList);

export default router;