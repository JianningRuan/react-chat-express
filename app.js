const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

/* const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/react-chat';
mongoose.connect(DB_URL, function (err, db) {
    console.log(err);
    console.log(db);
}); */

const user = require('./Router/user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', user);

const server = app.listen(9093, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening at http://', host, port);
});