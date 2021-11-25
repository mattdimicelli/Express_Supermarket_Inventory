import express from 'express';
import * as customerController from '../controllers/customerController.js';
const router = express.Router();

// GET request for list of customers (READ)
router.get('/', customerController.customerList);

// GET request for details of specific customer (READ)
router.get('/customer/:id', customerController.customerDetail);

// GET request for CREATE customer
router.get('/customer/create', customerController.customerCreateGET);

// POST request for CREATE customer
router.post('/customer/create', customerController.customerCreatePOST);

// GET request for UPDATE customer
router.get('/customer/:id/update', customerController.customerUpdateGET);

// POST request for UPDATE customer
router.post('/customer/:id/update', customerController.customerUpdatePOST);

// GET request for DELETE customer
router.get('/customer/:id/delete', customerController.customerDeleteGET);

// POST request for DELETE customer
router.post('/customer/:id/delete', customerController.customerDeletePOST);

export default router;