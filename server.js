var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var compression = require('compression');
var routes = require('./routes');

var app = module.exports = express();

var mongoDbUrl = process.MONGODB_URL || 'mongodb://localhost/finance';
var connection = mongoose.createConnection(mongoDbUrl);

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
 app.use(compression());
 app.use(express.static('frontend/public'));
 app.use(bodyParser.urlencoded({extended: false}));
 app.use(bodyParser.json());
 app.use(cookieParser());
 app.use(session({
   resave: false, // don't save session if unmodified
   saveUninitialized: false, // don't create session until something stored
   secret: 'aha, secret for every',
   store: new MongoStore({
     url: mongoDbUrl,
   }),
 }));


 /**
  * Routes
  */
// MAIN
var db = routes.db(connection);
var checkLogin = routes.checkLogin;
var finance = routes.finance;
var profile = routes.profile;


app.post('/api/auth', db, routes.auth);
app.post('/api/logout', checkLogin, routes.logout);
app.get('/api/profile', checkLogin, db, profile.getProfile);
app.put('/api/profile', checkLogin, db, profile.updateProfile);
app.get('/api/finance', checkLogin, db, finance.getCollection);
app.post('/api/finance', checkLogin, db, finance.createModel);
app.delete('/api/finance/:id', checkLogin, db, finance.deleteModel);

/**
 * App start
 */

app.listen(app.get('port'), function(err) {
   if (err) throw new Error(err);
   console.log('Server started at port ' + app.get('port'));
 });
