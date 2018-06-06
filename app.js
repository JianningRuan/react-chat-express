const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

// 跨域设置请求头
app.all('*', function (req, res, next) {
    if (req.headers.origin === 'http://47.104.232.7:8080' || req.headers.origin === 'http://localhost:3000') {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, X-File-Name");
        res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
        res.header("Content-Type", "application/json;charset=utf-8");
        res.header("Access-Control-Allow-Credentials", "true");
        res.header("X-Powered-By",' 3.2.1');
        res.header('Cache-Control', 'no-store');
    }
    next();
});
/*app.all('*',function (req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});*/
/*app.use(cors({
    origin:['http://localhost:3000'],
    methods:['GET','POST'],
    alloweHeaders:['Content-Type', 'Authorization']
}));*/

// 链接数据库
const model = require('./model');
const Chat = model.getModel('chat');

// socket with express
const server = require('http').Server(app);


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
const io = require('socket.io').listen(server);
io.on('connection', (socket)=>{
    console.log('链接上了');
    socket.on('sendMsg', (data)=>{
        const {from, to, msg} = data;
        const chatId = [from, to].sort().join('_');
        Chat.create({chatId, from, to, msg}, function (err, doc) {
            io.emit('recvMsg', Object.assign({}, doc._doc));
        });
    })
});