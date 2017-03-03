// Config Appp
var config = require('./config');
global.__base = __dirname + '/';

// Express init
var express = require('express');
var app = express();

// MongoDB init
require (config.app + '/helpers/db_connect.js');

// Body-parser init
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));  // parse application/x-www-form-urlencoded
app.use(bodyParser.json());  // parse application/json

// Cookie parser init 
var cookieParser = require('cookie-parser');
app.use(cookieParser());

// Session with MongoDB connect init 
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
app.use(session({
    secret: 'CRYDEsigN',     														// Замените на что нибудь
    resave: false,           														// Пересохранять даже если нету изменений
    saveUninitialized: true, 														// Сохранять пустые сессии
    store: new MongoStore({ mongooseConnection: require('mongoose').connection }) 	// Использовать монго хранилище
}));

// Pug engine init
app.set('views', config.app + '/views')
app.set('view engine', 'pug');

// Pyblic folder init
app.use(express.static('public'));

// Controllers init
var router = require(config.app + '/controllers/router');
app.use (router);

app.listen(config.port, function () {
  console.log ('Server: OK, port: 3000');
});
