#! /usr/bin/env node

console.log('This script populates some test items, iteminstances, and customers to the database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true');

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/

const Item = require('./models/Item');
const ItemInstance = require('./models/ItemInstance');
const Customer = require('./models/Customer');



var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const items = []
const iteminstances = []
const customers = []

function itemCreate({name = null, department = null, description = null, pricePerUnit = null, pricePerPound = null, brand = null}) {
  let itemdetail = {name, department };
  if (description !== null) itemdetail.description = description;
  if (pricePerUnit !== null) itemdetail.pricePerUnit = pricePerUnit;
  if (pricePerPound !== null) itemdetail.pricePerPound = pricePerPound;
  if (brand !== null) itemdetail.brand = brand;
  
  const item = new Item(itemdetail);
  
  return new Promise((resolve, reject) => {
    item.save()
      .then(savedItem => {
        console.log('New Item: ' + savedItem);
        items.push(savedItem);
        resolve();
      })
      .catch(err => reject(err))
  });
}

function itemInstanceCreate({item = null, expiration = null, status = null, customer = null, dateOfSale = null }) {
  let iteminstancedetail = {item, status};
  if (expiration !== null) iteminstancedetail.expiration = expiration;
  if (customer !== null) iteminstancedetail.customer = customer;
  if (dateOfSale !== null) iteminstancedetail.dateOfSale = dateOfSale;
  const iteminstance = new ItemInstance(iteminstancedetail);
  
  return new Promise((resolve, reject) => {
    iteminstance.save()
    .then(savedItemInstance => {
      console.log('New ItemInstance: ' + iteminstance);
      iteminstances.push(iteminstance);
      resolve();
    })
    .catch(err => reject(err))
  });
}

function customerCreate({firstName = null, lastName = null, telephone = null, email = null, address = null}) {
  let customerdetail = { firstName, lastName, telephone };
  if (email !== null) customerdetail.email = email;
  if (address !== null) customerdetail.address = address;
    
  const customer = new Customer(customerdetail);    
  return new Promise((resolve, reject) => {
    customer.save()
    .then(savedCustomer => {
      console.log('New Customer: ' + customer);
      customers.push(customer);
      resolve();
    })
    .catch(err => reject(err));
  });
}

function createItems() {
    return new Promise((resolve, reject) => {
      itemCreate({name: 'apple, gala', department: 'Produce', pricePerPound: 0.83, })
      .then(() => itemCreate({name: 'grapes', department: 'Produce', description: null, pricePerUnit: null, pricePerPound: 1.28, brand: null}))
      .then(() => itemCreate({name: "Reynolds Wrap, HEAVY DUTY", department: 'Paper Goods', description: '50 sq ft', pricePerUnit: 3.97, pricePerPound: null, brand: 'Reynolds'}))
      .then(() => itemCreate({name: 'Talenti Gelato, chocolate peanut butter cup', department: 'Frozen', description: null, pricePerUnit: 4.98, pricePerPound: null, brand: 'Talenti',}))
      .then(() => itemCreate({name: "Crunchy Breaded Fish Sticks", department: 'Frozen', description: null, pricePerUnit: 6.48, pricePerPound: null, brand: "Gorton's",}))
      .then(() => itemCreate({name: 'Lactaid 1% Calcium Fortified', department: 'Dairy', description: null, pricePerUnit: 3.89, pricePerPound: null, brand: 'Lactaid',}))
      .then(() => itemCreate({name: 'mussels', department: 'Meat and Seafood', description: 'wild caught', pricePerUnit: null, pricePerPound: 4.99, brand: null,}))
      .then(() => itemCreate({name: 'Colgate Total Advanced Whitening Toothpaste', department: 'Health and Beauty', description: '6.4oz', pricePerUnit: 3.98, pricePerPound: null, brand: 'Colgate',}))
      .then(() => resolve())

      .catch(err => reject(err))
    });
}

function createItemInstances() {
  return Promise.all([
    itemInstanceCreate({item: items[0], status: 'In Stock' }),
    itemInstanceCreate({item: items[1], status: 'In Stock' }),
    itemInstanceCreate({item: items[2], status: 'Damaged' }),
    itemInstanceCreate({item: items[2], status: 'In Stock' }),
    itemInstanceCreate({item: items[2], status: 'In Stock' }),
    itemInstanceCreate({item: items[3], expiration: new Date().setMonth(11), status: 'In Stock' }),
    itemInstanceCreate({item: items[4], expiration: new Date().setFullYear(2022, 5), status: 'In Stock' }),
    itemInstanceCreate({item: items[5], expiration: new Date().setDate(29), status: 'In Stock' }),
    itemInstanceCreate({item: items[5], customer: customers[1], expiration: new Date().setDate(29), status: 'Reserved' }),
    itemInstanceCreate({item: items[6], expiration: new Date().setDate(20), status: 'In Stock' }),
  ]);
}

function createCustomers() {
  return Promise.all([
    customerCreate({firstName: 'Tokyo', lastName: 'Sexwale', telephone: '333-333-3333', address: 'South Africa'}),
    customerCreate({firstName: 'Beezow Doo-Doo', lastName: 'Zoppitybop-Bop-Bop', telephone: '666-666-6666', email: 'jeffreywilschke@yahoo.com'}),
  ]);
}

createItems()
.then(() => createItemInstances())
.then(() => createCustomers())
.then(() => {
  console.log('ItemInstances: ' + iteminstances);
})
.catch(err => console.error('FINAL ERROR: ' + err))
.finally(() => mongoose.connection.close());

  



