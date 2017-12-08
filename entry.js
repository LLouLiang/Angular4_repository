// object document mapper with mongodb
// bcryptjs is dependencies
// cors module we can make request from the front end even from different port
// passport-jwt allow us to create json web token
// body parser parse the incoming request so we can grap the data from the form or something
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./databaseConfig/mongodb');

// database connection
mongoose.connect(config.database);
// node js handle errors
mongoose.connection.on('connected', () => {
    console.log("connected to database " + config.database);
});
mongoose.connection.on('error',( err ) => {
    console.error(err.message);
});

const APP = express();
const SERVER_PORT = 4000;

// Cors middleware
// Cross-Origin Resource Sharing (CORS). 
// Invocations of the XMLHttpRequest or Fetch APIs in a cross-site manner
APP.use(cors());

// set static client side files folder
// be careful the __dirname should get two lower dushes.
APP.use(express.static(path.join(__dirname,'client')));

// Server Routes
const signin = require('./routes/signin');
const signup = require('./routes/signup');

// Body parser
APP.use(bodyParser.json());

// Passport Middleware
APP.use(passport.initialize());
APP.use(passport.session());
require('./databaseConfig/passport')(passport);


APP.use('/signin',signin);
APP.use('/signup',signup);

APP.get('',(req,res,next) => { });


APP.listen(SERVER_PORT,() => {
    console.log("server runs on port "+SERVER_PORT);
});
