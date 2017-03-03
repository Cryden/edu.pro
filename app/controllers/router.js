// Route App

// Express init
var express = require('express');
var app = express.Router();

// Controllers init 
var controllers = require('./controllers');

// ROUTER

app.get  ('/', 			controllers.index.index);

// import
app.get  ('/import',	controllers.import.index);
app.post ('/import', 	controllers.import.import)

module.exports = app