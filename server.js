var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var routes = require('./routes');

var app = module.exports = express();


/**
 * Enviroment configuration
 */
app.set('port', process.NODE_PORT || 3000);
app.set('env', process.NODE_ENV || 'development');
app.set('view engine', '.pug');
app.set('views', './views');
app.disable('x-powered-by');
app.disable('case sensitive routing');
app.disable('strict routing');

if (app.get('env') === 'production') {
  app.enable('view cache');
} else {
  app.disable('view cache');
}


/**
 * Middleware configuration
 */
 app.use(express.static('frontend/public'));
 app.use(bodyParser.urlencoded({extended: true}));
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(session({
   secret: 'I like programming and live free',
   saveUninitialized: true,
   resave: false,
   cookie: {
     secure: true,
   },
 }));


 /**
  * Routes
  */
// MAIN


/**
 * App start
 */

app.listen(app.get('port'), function(err) {
   if (err) throw new Error(err);
   console.log('Server started at port ' + app.get('port'));
 });
