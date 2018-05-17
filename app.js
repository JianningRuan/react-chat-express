const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

const model = require('./model');
const Chat = model.getModel('chat');

// socket with express
const server = require('http').Server(app);
const io = require('socket.io')(server);

const user = require('./Router/user');
const chat = require('./Router/chat');

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', user);
app.use('/chat', chat);

server.listen(9093, function () {
    const host = server.address().address;
    const port = server.address().port;
    console.log('App listening at http://', host, port);
});

// socket
io.on('connection', (socket)=>{
    console.log('链接上了');
    socket.on('sendMsg', (data)=>{
        console.log(data);
        const {from, to, msg} = data;
        const chatId = [from, to].sort().join('_');
        Chat.create({chatId, from, to, msg}, function (err, doc) {
            io.emit('recvMsg', Object.assign({}, doc._doc));
        });
    })
});