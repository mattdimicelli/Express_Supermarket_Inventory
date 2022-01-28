# Readme
# NodeJS Supermarket Inventory Application 

## Overview

--INCOMPLETE PROJECT--

A supermarket inventory application that supports all of the CRUD methods, so that
the user can create, read, update or delete any item, customer, etc.  The items
can support myriad fields such as item name, department, description, price per 
unit, price per pound, etc.  The same goes for each customer and item instance 
(eg. stock).

I initiated this project after completing my first-ever Express application 
(following along with a tutorial), so this was my first *original* Express app.

### Challenge

The full design requirements from The Odin Project to build an Inventory application
are detailed [here](https://www.theodinproject.com/paths/full-stack-javascript/courses/nodejs/lessons/inventory-application)


### Links

- [Repo](https://github.com/mattdimicelli/grocery-store)

## My process

### Built with

- Node.js
- Express app made with express-generator
- MongoDB
- Mongoose
- EJS
- Morgan http request logger middleware
- http-errors for creating http errors in Express
- debug module, which decorates console.error()
- cookie-parser middleware


### What I learned


- I took the time to sketch out the models and their fields on paper.  I had
learned that due to the complexity of these applications that it is important to 
do so before coding.
- I practiced generating a boilerplate/skeleton for the app using the 
express-generator.
- How to set up a collection on the MongoDB website, as well as set up the schemas
and models.  
- In a previous tutorial about Express, I was provided with a file populatedb.js,
which can be seen [here](https://raw.githubusercontent.com/hamishwillee/express-locallibrary-tutorial/master/populatedb.js).  This file was used in the tutorial to populate the database
with some sample data.  I adapted this file for my own database/models, rewriting
the code which originally used the async module (available on npm) for 
functions such as async.parellel() and async.series() so that 
it would instead rely on the JS-native async/await syntax and Promise.all().
On previous commits of this project I even wrote it using promise-chaining, just
for practice.  These exercises were my way of ensuring that I understood the code
100%.  
- I wrote each of the components of the MVC paradigm.  For the views, I learned
the utility of using partials for code-reuse and used them for that reason.
- The challenge that I was working on when I stopped this project was the design 
requirement of each item having a "number-in-stock" (in the language of my 
project, that would be how many ItemInstances of each Item are there).  I started
to write a "virtual property" called "stock" in my Item model, but then I made 
my life more complicated by realizing that I also wanted a "numberAvailable", 
since some of the stock could be damaged, or already sold and put on hold for a 
customer, and that it would be useful to actually know how much of the stock 
was "available".  This was where I got stuck, because I determined that I would
need to learn much more Mongoose syntax in order to solve the problem.  Wanting to
work on some other projects instead, this is where I left this project paused.