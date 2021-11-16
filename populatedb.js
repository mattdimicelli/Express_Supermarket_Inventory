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
var async = require('async')
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

function itemCreate({name = null, department = null, description = null, pricePerUnit = null, pricePerPound = null, brand = null, cb = null}) {
  let itemdetail = {name, department };
  if (description !== null) itemdetail.description = description;
  if (pricePerUnit !== null) itemdetail.pricePerUnit = pricePerUnit;
  if (pricePerPound !== null) itemdetail.pricePerPound = pricePerPound;
  if (brand !== null) itemdetail.brand = brand;
  
  const item = new Item(itemdetail);
       
  item.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Item: ' + item);
    items.push(item);
    cb(null, item);
  });
}

function itemInstanceCreate({item = null, expiration = null, status = null, customer = null, dateOfSale = null, cb = null}) {
  let iteminstancedetail = {item, status};
  if (expiration !== null) iteminstancedetail.expiration = expiration;
  if (customer !== null) iteminstancedetail.customer = customer;
  if (dateOfSale !== null) iteminstancedetail.dateOfSale = dateOfSale;
  const iteminstance = new ItemInstance(iteminstancedetail);
       
  iteminstance.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log('New ItemInstance: ' + iteminstance);
    iteminstances.push(iteminstance);
    cb(null, iteminstance);
  }   );
}

function customerCreate({firstName = null, lastName = null, telephone = null, email = null, address = null, cb = null}) {
  let customerdetail = { firstName, lastName, telephone };
  if (email !== null) customerdetail.email = email;
  if (address !== null) customerdetail.address = address;
    
  const customer = new Customer(customerdetail);    
  customer.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Customer: ' + customer);
    customers.push(customer)
    cb(null, customer)
  }  );
}

function createItems(cb) {
  async.series([
    function(callback) {
      itemCreate({name: 'apple, gala', department: 'Produce', pricePerPound: 0.83, cb: callback});
    },
    function(callback) {
      itemCreate({name: 'grapes', department: 'Produce', description: null, pricePerUnit: null, pricePerPound: 1.28, brand: null, cb: callback});
    },
    function(callback) {
      itemCreate({name: "Reynolds Wrap, HEAVY DUTY", department: 'Paper Goods', description: '50 sq ft', pricePerUnit: 3.97, pricePerPound: null, brand: 'Reynolds', cb: callback});
    },
    function(callback) {
      itemCreate({name: 'Talenti Gelato, chocolate peanut butter cup', department: 'Frozen', description: null, pricePerUnit: 4.98, pricePerPound: null, brand: 'Talenti', cb: callback});
    },
    function(callback) {
      itemCreate({name: "Crunchy Breaded Fish Sticks", department: 'Frozen', description: null, pricePerUnit: 6.48, pricePerPound: null, brand: "Gorton's", cb: callback});
    },
    function(callback) {
      itemCreate({name: 'Lactaid 1% Calcium Fortified', department: 'Dairy', description: null, pricePerUnit: 3.89, pricePerPound: null, brand: 'Lactaid', cb: callback});
    }, 
    function(callback) {
      itemCreate({name: 'mussels', department: 'Meat and Seafood', description: 'wild caught', pricePerUnit: null, pricePerPound: 4.99, brand: null, cb: callback});
    },
    function(callback) {
      itemCreate({name: 'Colgate Total Advanced Whitening Toothpaste', department: 'Health and Beauty', description: '6.4oz', pricePerUnit: 3.98, pricePerPound: null, brand: 'Colgate', cb: callback});
    },
  ], 
  cb); //optional callback
}

function createItemInstances(cb) {
    async.parallel([
        function(callback) {
          itemInstanceCreate({item: items[0], status: 'In Stock', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[1], status: 'In Stock', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[2], status: 'Damaged', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[2], status: 'In Stock', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[2], status: 'In Stock', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[3], expiration: new Date().setMonth(11), status: 'In Stock', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[4], expiration: new Date().setFullYear(2022, 5), status: 'In Stock', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[5], expiration: new Date().setDate(29), status: 'In Stock', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[5], customer: customers[1], expiration: new Date().setDate(29), status: 'Reserved', cb: callback});
        },
        function(callback) {
          itemInstanceCreate({item: items[6], expiration: new Date().setDate(20), status: 'In Stock', cb: callback});
        }
        ],
        // optional callback
        cb);
}


function createCustomers(cb) {
    async.parallel([
        function(callback) {
          customerCreate({firstName: 'Tokyo', lastName: 'Sexwale', telephone: '333-333-3333', address: 'South Africa', cb: callback});
        },
        function(callback) {
          customerCreate({firstName: 'Beezow Doo-Doo', lastName: 'Zoppitybop-Bop-Bop', telephone: '666-666-6666', email: 'jeffreywilschke@yahoo.com', cb: callback});
        },
        ],
        // Optional callback
        cb);
}



async.series([
    createItems,
    createItemInstances,
    createCustomers,
],
// Optional callback
function(err, results) {
    if (err) {
        console.log('FINAL ERR: '+ err);
    }
    else {
        console.log('ItemInstances: '+ iteminstances);
        
    }
    // All done, disconnect from database
    mongoose.connection.close();
});



