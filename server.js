// app.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
// const config = require('./db');

// this doesn't make sense.
// users is all of the routes from user.js

const users = require('./routes/user'); 
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/auth";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
    .then(    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);
const app = express();
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// localhost:3000/api/users is 
// the PREFIX to EVERYTHING in router
app.use('/api/users', users);

app.get('/', function(req, res) {
    res.send('hello');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});