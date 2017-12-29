const express = require('express');
const utils = require('utility'); //md5加密
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');//post的请求的中间件
const userRouter = require('./user');//express的中间件
const model = require('./model');
const Chat = model.getModel('chat');

const app = express();

//socket跟express配合
const server = require('http').Server(app);

const io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('user login');
    socket.on('sendmsg', function (data) {
        console.log(data);
        /*io.emit('recvmsg', data)*/
        const {from, to, msg} = data;
        const chatid = [from, to].sort().join('_');
        Chat.create({chatid, from, to, content: msg}, function (err, doc) {
            io.emit('recvmsg', Object.assign({}, doc._doc))
        })
    })
});

app.use(cookieParser());
app.use(bodyParser.json());
app.use('/user', userRouter); //user前缀 router为后缀

server.listen(803, function () {
    console.log('server start at localhost:803')
});