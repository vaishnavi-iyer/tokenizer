const express = require('express');
const router = require('./routes.js');

const app = express();

// parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))

// parse application/json
app.use(express.json())

//import databse config
require('./database.js');

//import the routes
app.use('/', router);

module.exports = app;