// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 2000;
var mongoose = require('mongoose');
var passport = require('passport');
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var expressSession = require('express-Session');

var flash    = require('connect-flash');
var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ 
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
})); 

app.set('view engine', 'ejs'); // set up ejs for templating

	// required for passport
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressSession({ 
	secret: process.env.SESSION_SECRET || 'secret',
	resave: false,
	saveUninitialized: false
})); 

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port, function(req,res){
	console.log('http://127.0.0.1:'+ port + '/'); 
});
