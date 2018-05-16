const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// socket with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

const user = require('./Router/user');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', user);

server.listen(9093, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening at http://', host, port);
});

// socket
io.on('connection', (socket)=>{
    console.log('链接上了');
    socket.on('aa', (data)=>{
        console.log(data);
        io.emit('se', data);
    })
});