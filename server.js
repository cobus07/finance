var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var SessionStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var routes = require('./routes');

var app = module.exports = express();

var sessStoreUrl = 'mongodb://localhost/finance';

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
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(session({
   resave: false, // don't save session if unmodified
   saveUninitialized: false, // don't create session until something stored
   secret: 'aha, secret for every',
   store: new SessionStore({
     url: sessStoreUrl,
   }),
 }));


 /**
  * Routes
  */
// MAIN
app.post('/api/auth', routes.auth);
app.post('/api/logout', routes.logout);


/**
 * App start
 */

app.listen(app.get('port'), function(err) {
   if (err) throw new Error(err);
   console.log('Server started at port ' + app.get('port'));
 });
