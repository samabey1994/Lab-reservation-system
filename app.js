//main server entry point
//bring all the modules we want
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');// allows to request to api from a different domain name.
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

//connect to database
mongoose.connect(config.database);

//on connection
mongoose.connection.on('connected', () => {
  console.log('connected to the database '+config.database);
});

//on error
mongoose.connection.on('error', (err) => {
  console.log('database error: '+err);
});

// initializing app variables
const app = express();

const users = require('./routes/users');
const labs = require('./routes/labs');

//port number
const port = 3000;


//CORS middleware,making this public so any domain can use this
app.use(cors());

//Set static folder
app.use(express.static(path.join(__dirname, 'public')));


//body parser middleware
app.use(bodyParser.json());

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

app.use('/users', users);
app.use('/labs', labs);

//index rout, rout to the home page
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
}) ;

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});
// starts server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
