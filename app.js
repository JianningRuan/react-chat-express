const express = require('express');
const app = express();
const user = require('./Router/user');

app.use('/user', user);

const server = app.listen(9093, function () {
        const host = server.address().address;
        const port = server.address().port;
        console.log('App listening at http://%s:%s', host, port);
})